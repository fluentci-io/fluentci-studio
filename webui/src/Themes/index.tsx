import { createTheme } from "baseui";

const primitives = {
  primaryFontFamily: "Lexend",
  colors: {
    buttonPrimaryFill: "#460cf1",
    buttonPrimaryText: "#FFFFFF",
    buttonPrimaryHover: "#460cf1",
    breadcrumbsText: "#FFFFFF",
    breadcrumbsSeparatorFill: "#FFFFFF",
    linkText: "#FFFFFF",
    linkVisited: "#FFFFFF",
    linkHover: "#460cf1 !important",
  },
  grid: {
    columns: [4, 8, 12],
    gutters: [16, 36, 36],
    margins: [16, 36, 64],
    gaps: 0,
    maxWidth: 1280,
  },
};

export const theme = createTheme(primitives);
