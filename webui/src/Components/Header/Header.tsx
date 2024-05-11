import { FC } from "react";
import { EllipsisVertical } from "@styled-icons/fa-solid";
import { StatefulPopover } from "baseui/popover";
import { StatefulMenu } from "baseui/menu";
import { Breadcrumbs } from "baseui/breadcrumbs";
import styles, { Link, Container, RunButton, PopoverButton } from "./styles";

export type HeaderProps = {
  id: string;
  onRun: (id: string) => void;
  menu?: string[];
  breadcrumbs?: { title: string; link?: string }[];
};

const Header: FC<HeaderProps> = (props) => {
  const { id, breadcrumbs, onRun, menu } = props;
  return (
    <Container>
      <Breadcrumbs
        overrides={{
          Root: {
            style: {
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            },
          },
          ListItem: {
            style: ({ $theme }) => ({
              fontFamily: $theme.primaryFontFamily,
            }),
          },
        }}
      >
        {breadcrumbs?.map(({ title, link }) => (
          <>
            {link && (
              <Link to={link} style={{ color: "#ffffffa8" }}>
                {title}
              </Link>
            )}
            {!link && <span>{title}</span>}
          </>
        ))}
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
      <RunButton onClick={() => onRun(id)}>Run</RunButton>
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
