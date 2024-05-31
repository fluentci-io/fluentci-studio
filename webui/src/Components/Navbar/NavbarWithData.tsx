import { FC } from "react";
import Navbar from "./Navbar";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const NavbarWithData: FC = () => {
  const [user] = useAuthState(auth);

  const onSignOut = async () => {
    localStorage.setItem("logout", "true");
    localStorage.removeItem("idToken");
    await signOut(auth);
    window.location.href = "https://fluentci.io";
  };

  return <Navbar user={user} onSignOut={onSignOut} />;
};

export default NavbarWithData;
