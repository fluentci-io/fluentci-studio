import { FC, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Navigation } from "baseui/side-navigation";
import { PackageIcon } from "@styled-icons/feather";
import { CodeCurly } from "@styled-icons/boxicons-regular";
import { PlayCircle } from "@styled-icons/bootstrap";

const Container = styled.div`
  background-color: #0f0124;
  height: 100vh;
  width: 350px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  &:hover * {
    color: inherit !important;
  }
`;

const Header = styled.div`
  height: 100px;
`;

const RunButton = styled.button`
  background-color: transparent;
  color: transparent;
  cursor: pointer;
  border: none;
  transition: color 0.2s;
`;

export type SideNavigationProps = {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
};

const SideNavigation: FC<SideNavigationProps> = (props) => {
  const { setCurrentTab, currentTab } = props;
  const [activeItemId, setActiveItemId] = useState(`#${currentTab}`);

  useEffect(() => {
    setActiveItemId(`#${currentTab}`);
  }, [currentTab]);

  return (
    <Container>
      <Header></Header>
      <Navigation
        items={[
          {
            title: (
              <Row>
                <PackageIcon size={24} />
                <div style={{ marginLeft: 15, flex: 1 }}>Deno Pipeline</div>
                <RunButton>
                  <PlayCircle size={20} />
                </RunButton>
              </Row>
            ),
            itemId: "#jobs",
            subNav: [
              {
                title: (
                  <Row>
                    <CodeCurly size={20} />
                    <div style={{ marginLeft: 15, flex: 1 }}>Build</div>
                    <RunButton onClick={() => {}}>
                      <PlayCircle size={20} />
                    </RunButton>
                  </Row>
                ),
                itemId: "#build",
              },
              {
                title: (
                  <Row>
                    <CodeCurly size={20} />
                    <div style={{ marginLeft: 15, flex: 1 }}>Deploy</div>
                    <RunButton>
                      <PlayCircle size={20} />
                    </RunButton>
                  </Row>
                ),
                itemId: "#deploy",
              },
            ],
          },
        ]}
        activeItemId={activeItemId}
        onChange={({ item }) => {
          setActiveItemId(item.itemId!);
          setCurrentTab(item.itemId!.replace("#", ""));
        }}
        overrides={{
          NavItem: {
            style: ({ $active, $theme }) => {
              if (!$active)
                return {
                  fontFamily: $theme.primaryFontFamily,
                  color: "#fff",
                  ":hover": {
                    color: "#24ffb5",
                  },
                };
              return {
                fontFamily: $theme.primaryFontFamily,
                backgroundImage: "#fff",
                borderLeftColor: "#24ffb5",
                color: "#24ffb5",
                backgroundColor: "#004f547a",
                ":hover": {
                  color: "#24ffb5",
                },
              };
            },
          },
        }}
      />
    </Container>
  );
};

export default SideNavigation;
