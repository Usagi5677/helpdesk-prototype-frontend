import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

function createApolloClient(uri: string | undefined) {
  const httpLink = createHttpLink({
    uri,
    credentials: "same-origin",
  });

  const wsLink = new WebSocketLink({
    uri: `ws://${uri?.split("//")[1]}` ?? "ws://localhost:4000/grapql",
    options: {
      reconnect: true,
    },
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
    httpLink
  );

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("helpdesk_token");
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(splitLink),
    cache: new InMemoryCache(),
  });
}

export const apolloClient = createApolloClient(process.env.REACT_APP_API_URL);
