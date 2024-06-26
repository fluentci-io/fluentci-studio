import { HashRouter, BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Containers/Home";
import Run from "./Containers/Run";
import Project from "./Containers/Project";
import Auth from "./Containers/Auth";
import AccessTokens from "./Containers/Settings/AccessTokens";
import Billing from "./Containers/Settings/Billing";
import Settings from "./Containers/Settings";
import { useEffect } from "react";
import { useGetMeLazyQuery } from "./Hooks/GraphQL";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { useRecoilState } from "recoil";
import { AuthState } from "./Containers/Auth/AuthState";
import LinkProject from "./Containers/LinkProject";

function App() {
  const Router = location.host ? BrowserRouter : HashRouter;
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

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/account" element={<Settings />} />
          <Route path="/settings/billing" element={<Billing />} />
          <Route path="/settings/tokens" element={<AccessTokens />} />
          <Route path="/run/:id" element={<Run />} />
          <Route path="/project/:id" element={<Project />} />
          <Route path="/link-project/:id" element={<LinkProject />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
