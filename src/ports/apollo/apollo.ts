import { onError } from "@apollo/client/link/error";
import { fromPromise } from "@apollo/client/link/utils";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

import doRefreshToken from "./refresh-token";

let isRefreshing = false;
let pendingRequests: any[] = [];

const getTokens = () => {
  const tokens = localStorage.getItem("authentication");

  try {
    return JSON.parse(tokens || "{}");
  } catch (error) {
    return "{}";
  }
};

const resolvePendingRequests = () => {
  pendingRequests.map((callback) => callback());
  pendingRequests = [];
};

const authLink = setContext((_, { headers }) => {
  const { accessToken } = getTokens();

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `${accessToken}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  let forward$;
  const { refreshToken } = getTokens();

  if (graphQLErrors) {
    for (const error of graphQLErrors) {
      const isTokenExpired =
        error?.extensions?.code === "UNAUTHENTICATED" && refreshToken;

      if (isTokenExpired) {
        if (!isRefreshing) {
          forward$ = fromPromise(
            doRefreshToken(apolloClient, refreshToken)
              .then((tokens) => {
                localStorage.setItem("authentication", JSON.stringify(tokens));

                resolvePendingRequests();

                const oldHeaders = operation.getContext().headers;

                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: tokens.accessToken
                      ? `${tokens.accessToken}`
                      : "",
                  },
                });
              })
              .catch(() => {
                pendingRequests = [];

                localStorage.removeItem("authentication");

                return;
              })
              .finally(() => {
                isRefreshing = false;
              })
          ).filter((value) => Boolean(value));
        }

        forward$ = fromPromise(
          new Promise<void>((resolve) => {
            pendingRequests.push(() => resolve());
          })
        );

        return forward$.flatMap(() => forward(operation));
      }
    }
  }

  return forward$ ? forward(operation) : undefined;
});

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_SERVICE_HOST,
});

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([errorLink, authLink, httpLink]),
});

export default apolloClient;
