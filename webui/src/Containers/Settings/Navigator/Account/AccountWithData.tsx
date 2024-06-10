import { FC } from "react";
import Account from "./Account";
import { auth } from "../../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const AccountWithData: FC = () => {
  const [user] = useAuthState(auth);

  return (
    <Account
      email={user?.email || ""}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      username={(user as any)?.reloadUserInfo?.screenName}
      displayName={user?.displayName || ""}
    />
  );
};

export default AccountWithData;
