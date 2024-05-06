import { FC } from "react";
import { EllipsisVertical } from "@styled-icons/fa-solid";
import { StatefulPopover } from "baseui/popover";
import { StatefulMenu } from "baseui/menu";
import { Breadcrumbs } from "baseui/breadcrumbs";
import styles, { Link, Container, RunButton, PopoverButton } from "./styles";

export type HeaderProps = {
  id: string;
  title?: string;
  onRun: (id: string) => void;
  menu?: string[];
};

const Header: FC<HeaderProps> = (props) => {
  const { id, title, onRun, menu } = props;
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
        <Link to="/" style={{ color: "#ffffffa8" }}>
          Demo
        </Link>
        {title && <span>{title}</span>}
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
};

export default Header;
