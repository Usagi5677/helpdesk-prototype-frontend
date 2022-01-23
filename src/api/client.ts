import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

function createApolloClient(uri: string | undefined) {
  const httpLink = createHttpLink({
    uri,
    credentials: "same-origin",
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

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

export const apolloClient = createApolloClient(process.env.REACT_APP_API_URL);
