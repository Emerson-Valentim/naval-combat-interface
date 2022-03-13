import { ApolloClient, gql } from "@apollo/client";

const REFRESH_TOKEN_MUTATION = gql`
  mutation refresh($input: RefreshTokenInput!) {
    refresh(input: $input) {
      accessToken
      refreshToken
    }
  }
`;

const doRefreshToken = (
  client: ApolloClient<any>,
  refreshToken: string
): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  return client
    .mutate({
      mutation: REFRESH_TOKEN_MUTATION,
      variables: {
        input: {
          refreshToken,
        },
      },
    })
    .then((response) => {
      const tokens = response.data.refresh;

      return tokens;
    });
};

export default doRefreshToken;
