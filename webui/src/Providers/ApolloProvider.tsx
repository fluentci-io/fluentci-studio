import {
  ApolloClient,
  ApolloProvider as DefaultApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { FC, ReactNode } from "react";

const uri =
  import.meta.env.VITE_APP_API_URL ||
  (!location.host.endsWith(":5173")
    ? `http://${location.host || '127.0.0.1:6076'}/graphql`
    : "http://127.0.0.1:6076/graphql");

const link = createHttpLink({
  uri,
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

interface ApolloProviderProps {
  children: ReactNode;
}

const ApolloProvider: FC<ApolloProviderProps> = ({ children }) => {
  return (
    <DefaultApolloProvider client={client}>{children}</DefaultApolloProvider>
  );
};

export default ApolloProvider;
