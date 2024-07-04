import { FC, useEffect } from "react";
import Navbar from "./Navbar";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { AuthState } from "../../Containers/Auth/AuthState";

const NavbarWithData: FC = () => {
  const me = useRecoilValue(AuthState);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const onSignOut = async () => {
    localStorage.setItem("logout", "true");
    localStorage.removeItem("idToken");
    await signOut(auth);
    window.location.href = "https://fluentci.io";
  };

  useEffect(() => {
    if (loading) {
      return;
    }

    if (localStorage.getItem("logout") === "true") {
      localStorage.removeItem("logout");
      return;
    }

    if (!user && location.host === "app.fluentci.io") {
      if (
        location.pathname.startsWith("/settings") ||
        location.pathname.startsWith("/link-project")
      ) {
        navigate("/auth");
        return;
      }
    }

    user &&
      user.getIdToken().then((token) => localStorage.setItem("idToken", token));
  }, [user, loading, navigate]);

  return (
    <Navbar
      user={user}
      onSignOut={onSignOut}
      showAccountMenu={!!me}
      showSignInButton={
        import.meta.env.VITE_APP_API_URL?.includes("api.fluentci.io") ||
        location.hostname === "app.fluentci.io"
      }
    />
  );
};

export default NavbarWithData;
