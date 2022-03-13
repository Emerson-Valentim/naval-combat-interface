import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import apolloClient from "./ports/apollo/apollo";
import { UserContextProvider } from "./context/user/User";
import { FullscreenLoadingContextProvider } from "./context/loading/Loading";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <ChakraProvider>
        <UserContextProvider>
          <FullscreenLoadingContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </FullscreenLoadingContextProvider>
        </UserContextProvider>
      </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
