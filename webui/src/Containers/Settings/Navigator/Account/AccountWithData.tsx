import { FC } from "react";
import Account from "./Account";

const AccountWithData: FC = () => {
  return (
    <Account
      email={""} // firebase
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // username={(user as any)?.reloadUserInfo?.screenName}
      // displayName={user?.displayName || ""}
      username=""
      displayName=""
    />
  );
};

export default AccountWithData;
