import {
  ApolloClient,
  ApolloProvider as DefaultApolloProvider,
  createHttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { FC, ReactNode, useEffect } from "react";
import { timer } from "rxjs";
import { useAuth } from "@clerk/clerk-react";

const uri = (
  import.meta.env.VITE_APP_API_URL ||
  (!location.host.endsWith(":5173")
    ? `http://${location.host || "127.0.0.1:6076"}/graphql`
    : "http://127.0.0.1:6076/graphql")
).replace("http://app.fluentci.io", "https://api.fluentci.io");

const link = createHttpLink({
  uri,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
      if (message.includes("claim timestamp check failed")) {
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      }
    });
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authLink, errorLink, link]),
});

interface ApolloProviderProps {
  children: ReactNode;
}

const ApolloProvider: FC<ApolloProviderProps> = ({ children }) => {
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isSignedIn || !getToken) {
      return;
    }

    const source = timer(0, 1500);
    const subscription = source.subscribe(() => {
      getToken().then((token) => {
        localStorage.setItem("token", token!);
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [isSignedIn, getToken]);

  return (
    <DefaultApolloProvider client={client}>{children}</DefaultApolloProvider>
  );
};

export default ApolloProvider;
