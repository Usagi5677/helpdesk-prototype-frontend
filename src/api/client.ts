import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { onError } from "@apollo/client/link/error";

function createApolloClient(uri: string | undefined) {
  const httpLink = createHttpLink({
    uri,
    credentials: "same-origin",
  });

  const token = localStorage.getItem("helpdesk_token");
  const wsLink = new WebSocketLink({
    uri: process.env.REACT_APP_WEBSOCKET_URL ?? "ws://localhost:4000/graphql",
    options: {
      reconnect: true,
      connectionParams: {
        authToken: token ? `Bearer ${token}` : "",
      },
    },
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("helpdesk_token");
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    errorLink.concat(authLink.concat(httpLink)) // Add the error link here
  );

  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });
}

export const apolloClient = createApolloClient(process.env.REACT_APP_API_URL);
