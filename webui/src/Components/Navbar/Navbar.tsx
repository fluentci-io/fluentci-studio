import { FC, useState } from "react";
import { User } from "@styled-icons/boxicons-regular";
import { Github } from "@styled-icons/bootstrap";
import { StatefulPopover } from "baseui/popover";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  NavbarContainer,
  Menu,
  NoAvatar,
  PopoverMenu,
  Name,
  Username,
  UserDetails,
  Ul,
  Li,
  SignIn,
  SignInLink,
} from "./styles";
import Logo from "../../assets/fluentci-logo.png";
import { Discord } from "@styled-icons/bootstrap";

export type NavbarProps = {
  user?: {
    displayName?: string | null;
    photoURL?: string | null;
    username?: string | null;
    reloadUserInfo?: {
      screenName?: string | null;
    };
  } | null;
  onSignOut: () => Promise<void>;
  showAccountMenu?: boolean;
  showSignInButton?: boolean;
};

const Navbar: FC<NavbarProps> = ({
  user,
  onSignOut,
  showAccountMenu,
  showSignInButton,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_activeKey, setActiveKey] = useState({ current: 0 });
  const navigate = useNavigate();

  return (
    <div style={{ margin: "0 auto" }}>
      <NavbarContainer>
        <div
          style={{
            flex: 1,
          }}
        >
          <Link to="/" style={{ color: "#fff", fontWeight: "600" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <img src={Logo} alt="logo" style={{ height: 50 }} />
              <div style={{ fontSize: 18 }}>Fluent CI</div>
            </div>
          </Link>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Menu
            href="https://github.com/fluentci-io/fluentci_feedback/issues/new/choose"
            target="_blank"
          >
            Feedback
          </Menu>
          <Menu href="https://docs.fluentci.io" target="_blank">
            Docs
          </Menu>
          <Menu href="https://discord.gg/H7M28d9dRk" target="_blank">
            <Discord size={21} />
          </Menu>
          {showAccountMenu && (
            <StatefulPopover
              content={({ close }) => (
                <PopoverMenu>
                  <UserDetails>
                    <Avatar src={user?.photoURL || ""} alt="avatar" size={88} />
                    <Name>{user?.displayName}</Name>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 5,
                      }}
                    >
                      <Github size={15} color="#6b7280" />
                      <Username>
                        {user?.username || user?.reloadUserInfo?.screenName}
                      </Username>
                    </div>
                  </UserDetails>
                  <Ul>
                    <Li
                      onClick={() => {
                        close();
                        navigate("/");
                      }}
                    >
                      <div>Projects</div>
                    </Li>
                    <Li
                      onClick={() => {
                        close();
                        setActiveKey({ current: 2 });
                        navigate("/settings/tokens");
                      }}
                    >
                      <div>Access Tokens</div>
                    </Li>
                    <Li
                      onClick={() => {
                        onSignOut();
                        close();
                      }}
                    >
                      <div>Sign out</div>
                    </Li>
                  </Ul>
                </PopoverMenu>
              )}
              placement="bottom"
              overrides={{
                Body: {
                  style: {
                    backgroundColor: "initial",
                    border: "1px solid #21054aed",
                  },
                },
              }}
            >
              <button style={{ border: "none", backgroundColor: "initial" }}>
                {!user?.photoURL && (
                  <NoAvatar>
                    <User size={21} />
                  </NoAvatar>
                )}
                {user?.photoURL && <Avatar src={user.photoURL} alt="avatar" />}
              </button>
            </StatefulPopover>
          )}
          {!showAccountMenu && showSignInButton && (
            <SignIn>
              <SignInLink href="/auth">Sign In with GitHub</SignInLink>
            </SignIn>
          )}
        </div>
      </NavbarContainer>
    </div>
  );
};

export default Navbar;
