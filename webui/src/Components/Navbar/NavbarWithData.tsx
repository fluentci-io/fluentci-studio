import { FC } from "react";
import Navbar from "./Navbar";

const NavbarWithData: FC = () => {
  const user = {
    displayName: "Tsiry Sandratraina",
    photoURL: "https://avatars.githubusercontent.com/u/15877106?v=4",
    username: "tsirysndr",
  };
  return <Navbar user={user} />;
};

export default NavbarWithData;
