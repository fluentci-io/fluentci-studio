import { FC } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

export type HeaderWithDataProps = {
  title?: string;
};

const HeaderWithData: FC<HeaderWithDataProps> = (props) => {
  const navigate = useNavigate();
  const onRun = (id: string) => {
    console.log(">>", id);
    navigate(`/run/${id}`);
  };

  return <Header {...props} id="1" onRun={onRun} />;
};

export default HeaderWithData;
