import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import apolloClient from "./ports/apollo/apollo";
import { UserContextProvider } from "./context/User";
import { SocketContextProvider } from "./context/Socket";
import { RefetchContextProvider } from "./context/Refetch";
import { FullscreenLoadingContextProvider } from "./context/Loading";

ReactDOM.render(
  <React.StrictMode>
    <RefetchContextProvider>
      <ApolloProvider client={apolloClient}>
        <UserContextProvider>
          <SocketContextProvider>
            <ChakraProvider>
              <FullscreenLoadingContextProvider>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </FullscreenLoadingContextProvider>
            </ChakraProvider>
          </SocketContextProvider>
        </UserContextProvider>
      </ApolloProvider>
    </RefetchContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
