import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90vw;
  min-width: 1055px;
  margin: 0 auto;
  margin-top: 60px;

  @media (min-width: 1400px) {
    width: 85vw;
  }
`;

export const Title = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: 500;
  flex: 1;
  font-family: "Lexend";
  color: #fff;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 50px;
`;

export const RunButton = styled.button`
  font-family: "Lexend";
  height: 40px;
  background-color: #24ffb5;
  color: #000;
  border: none;
  font-weight: 600;
  width: 150px;
  cursor: pointer;
  &:hover {
    background-color: #18d193;
  }
`;

export const PopoverButton = styled.button`
  width: 40px;
  height: 40px;
  cursor: pointer;
  background-color: initial;
  border: none;
  color: #fff;
  margin-right: 10px;
`;

export const PictureWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  // background-color: #33909933;
  border-radius: 8px;
  margin-right: 15px;
`;

export const Picture = styled.img`
  height: 34px;
  width: 34px;
`;

export const ProjectWrapper = styled.div`
  color: #fff;
  background-color: #10072c;
  height: 80px;
  border: 1px solid #ffffff1f;
  border-radius: 6px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  &:hover {
    border: 1px solid #06ffe27d;
  }
`;

export const Path = styled.div`
  font-size: 12.5px;
  color: #06ffe0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  margin-bottom: 10px;
`;

export default {
  Tab: {
    Tab: {
      style: ({
        $isActive,
        $theme,
      }: {
        $isActive: string;
        $theme: { primaryFontFamily: string };
      }) => ({
        backgroundColor: "#0f0124 !important",
        color: $isActive ? "#24ffb5" : "#fff",
        fontFamily: $theme.primaryFontFamily,
        fontSize: "16px",
        ":hover": {
          color: "#24ffb5",
          backgroundColor: "#0f0124",
        },
      }),
    },
  },
  Tabs: {
    TabHighlight: {
      style: {
        backgroundColor: "#24ffb5",
      },
    },
    TabBorder: {
      style: {
        height: "0px",
      },
    },
  },
  StatefulMenu: {
    Option: {
      props: {
        overrides: {
          ListItem: {
            style: ({ $theme }: { $theme: { primaryFontFamily: string } }) => ({
              fontFamily: $theme.primaryFontFamily,
            }),
          },
        },
      },
    },
    List: {
      style: {
        border: "1px solid rgb(71 5 94 / 29%)",
      },
    },
  },
};
