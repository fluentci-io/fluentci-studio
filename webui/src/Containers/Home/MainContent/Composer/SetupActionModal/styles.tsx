import styled from "@emotion/styled";

type Theme = { $theme: { primaryFontFamily: string }; $isActive: boolean };
export const Button = styled.button`
  height: 40px;
  background-color: #24ffb5;
  color: #000;
  border: none;
  font-weight: 600;
  width: 100%;
  cursor: pointer;
  font-family: "Lexend";
  &:hover {
    background-color: #18d193;
  }
`;

export default {
  Tab: {
    Tab: {
      style: ({ $isActive, $theme }: Theme) => ({
        backgroundColor: "#0f0124",
        color: $isActive ? "#24ffb5" : "#fff",
        fontFamily: $theme.primaryFontFamily,
        fontSize: "16px",
        ":hover": {
          color: "#24ffb5",
          backgroundColor: "#0f0124",
        },
      }),
    },
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
  Modal: {
    Dialog: {
      style: ({ $theme }: Theme) => ({
        backgroundColor: "#0f0124",
        color: "#fff",
        fontFamily: $theme.primaryFontFamily,
      }),
    },
    Close: {
      style: {
        color: "#fff",
      },
    },
  },
};
