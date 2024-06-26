import { FC } from "react";
import { EllipsisVertical } from "@styled-icons/fa-solid";
import { StatefulPopover } from "baseui/popover";
import { StatefulMenu } from "baseui/menu";
import { Breadcrumbs } from "baseui/breadcrumbs";
import styles, { Link, Container, RunButton, PopoverButton } from "./styles";
import { Spinner } from "baseui/spinner";

export type HeaderProps = {
  id: string;
  onRun: (id: string) => void;
  menu?: string[];
  breadcrumbs?: { title: string; link?: string }[];
  showRunButton?: boolean;
  loading?: boolean;
};

const Header: FC<HeaderProps> = (props) => {
  const { id, breadcrumbs, onRun, menu, showRunButton } = props;
  return (
    <Container>
      <Breadcrumbs
        overrides={{
          Root: {
            style: {
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
            },
          },
          ListItem: {
            style: ({ $theme }) => ({
              fontFamily: $theme.primaryFontFamily,
            }),
          },
        }}
      >
        {breadcrumbs?.map(({ title, link }, index) => {
          if (link) {
            return (
              <Link key={index} to={link} style={{ color: "#ffffffb0" }}>
                {title}
              </Link>
            );
          }
          return <span key={index}>{title}</span>;
        })}
      </Breadcrumbs>
      {!!menu?.length && (
        <StatefulPopover
          placement="bottomRight"
          content={({ close }) => (
            <StatefulMenu
              items={menu.map((label) => ({ label }))}
              onItemSelect={() => {
                close();
              }}
              overrides={styles.StatefulMenu}
            />
          )}
        >
          <PopoverButton onClick={(e) => e.stopPropagation()}>
            <EllipsisVertical size={20} />
          </PopoverButton>
        </StatefulPopover>
      )}
      {showRunButton && (
        <>
          {!props.loading && (
            <RunButton onClick={() => onRun(id)}>Run</RunButton>
          )}
          {props.loading && (
            <RunButton disabled>
              <Spinner
                $size={"15px"}
                $borderWidth={"3px"}
                style={{
                  borderRightColor: "#ffffff22",
                  borderLeftColor: "#ffffff22",
                  borderTopColor: "#ffffff22",
                  borderBottomColor: "#000",
                }}
              />
            </RunButton>
          )}
        </>
      )}
    </Container>
  );
};

Header.defaultProps = {
  menu: [],
  breadcrumbs: [
    {
      title: "Projects",
      link: "/",
    },
  ],
};

export default Header;
