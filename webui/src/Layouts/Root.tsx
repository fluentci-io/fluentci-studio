import { Outlet, useNavigate } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import ApolloProvider from "../Providers/ApolloProvider";
import CurrentUserLayout from "./CurrentUser";

const PUBLISHABLE_KEY =
  import.meta.env.VITE_APP_CLERK_PUBLISHABLE_KEY ||
  "pk_live_Y2xlcmsuZmx1ZW50Y2kuaW8k";

export default function RootLayout() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
      proxyUrl="https://fluentci.io/__clerk"
    >
      <ApolloProvider>
        <CurrentUserLayout>
          <main>
            <Outlet />
          </main>
        </CurrentUserLayout>
      </ApolloProvider>
    </ClerkProvider>
  );
}
