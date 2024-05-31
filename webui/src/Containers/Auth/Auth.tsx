import { FC, useEffect } from "react";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Auth: FC = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      user.getIdToken().then((token) => {
        localStorage.setItem("idToken", token);
        navigate("/");
      });

      return;
    }
    const githubProvider = new GithubAuthProvider();
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        if (result?.user) {
          result.user.getIdToken().then((token) => {
            localStorage.setItem("idToken", token);
            navigate("/");
          });
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user, loading, navigate]);

  return <></>;
};

export default Auth;
