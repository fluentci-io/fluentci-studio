import { FC, useState } from "react";
import { User } from "@styled-icons/boxicons-regular";
import { Github } from "@styled-icons/bootstrap";
import { StatefulPopover } from "baseui/popover";
import { useNavigate } from "react-router-dom";
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
} from "./styles";

const Navbar: FC = () => {
  const [activeKey, setActiveKey] = useState({ current: 0 });
  const navigate = useNavigate();
  const onSignOut = () => {};

  return (
    <div style={{ margin: "0 auto" }}>
      <NavbarContainer>
        <div style={{ flex: 1 }}></div>
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
          <StatefulPopover
            content={({ close }) => (
              <PopoverMenu>
                <UserDetails>
                  <Avatar
                    src={"https://avatars.githubusercontent.com/u/15877106?v=4"}
                    alt="avatar"
                    size={88}
                  />
                  <Name>Tsiry Sandratraina</Name>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 5,
                    }}
                  >
                    <Github size={15} color="#6b7280" />
                    <Username>tsirysndr</Username>
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
              {true && (
                <NoAvatar>
                  <User size={21} />
                </NoAvatar>
              )}
              {false && (
                <Avatar
                  src={"https://avatars.githubusercontent.com/u/15877106?v=4"}
                  alt="avatar"
                />
              )}
            </button>
          </StatefulPopover>
        </div>
      </NavbarContainer>
    </div>
  );
};

export default Navbar;
