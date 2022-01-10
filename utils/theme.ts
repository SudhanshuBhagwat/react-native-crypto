import { BLACK, BLUE, CREAM, WHITE } from "./colors";

type ThemeType = {
  background: string;
  accentColor: string;
};

type CurrentTheme = "DARK" | "LIGHT";

const Theme: Record<CurrentTheme, ThemeType> = {
  DARK: {
    background: BLUE,
    accentColor: CREAM,
  },
  LIGHT: {
    background: WHITE,
    accentColor: BLACK,
  },
};

export default Theme;
