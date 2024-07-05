import Home from "./Containers/Home";
import Run from "./Containers/Run";
import Project from "./Containers/Project";
import Auth from "./Containers/Auth";
import AccessTokens from "./Containers/Settings/AccessTokens";
import Billing from "./Containers/Settings/Billing";
import Settings from "./Containers/Settings";
import { useEffect } from "react";
import { useGetMeLazyQuery } from "./Hooks/GraphQL";
import { useRecoilState } from "recoil";
import { AuthState } from "./Containers/Auth/AuthState";
import LinkProject from "./Containers/LinkProject";
import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import RootLayout from "./Layouts/Root";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

const createRouter = location.host ? createBrowserRouter : createHashRouter;

const router = createRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/auth/sso-callback",
        element: <AuthenticateWithRedirectCallback />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/settings/account",
        element: <Settings />,
      },
      {
        path: "/settings/billing",
        element: <Billing />,
      },
      {
        path: "/settings/tokens",
        element: <AccessTokens />,
      },
      {
        path: "/run/:id",
        element: <Run />,
      },
      {
        path: "/project/:id",
        element: <Project />,
      },
      {
        path: "/link-project/:id",
        element: <LinkProject />,
      },
      {
        path: "/:id",
        element: <Home />,
      },
    ],
  },
]);

function App() {
  /*
  const [user, loading] = useAuthState(auth);
  const [getMe] = useGetMeLazyQuery();
  const setMe = useRecoilState(AuthState)[1];

  useEffect(() => {
    if (loading || !user) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getMe().then((response: any) => setMe(response?.data?.me));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);
  */

  return <RouterProvider router={router} />;
}

export default App;
