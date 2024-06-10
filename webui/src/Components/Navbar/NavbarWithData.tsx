import { FC, useEffect } from "react";
import Navbar from "./Navbar";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const NavbarWithData: FC = () => {
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

    if (!user) {
      navigate("/auth");
      return;
    }

    user.getIdToken().then((token) => localStorage.setItem("idToken", token));
  }, [user, loading, navigate]);

  return <Navbar user={user} onSignOut={onSignOut} />;
};

export default NavbarWithData;
