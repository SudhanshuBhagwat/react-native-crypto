import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatusBar } from "react-native";

export interface ThemeState {
  mode: "DARK" | "LIGHT";
}

const initialState: ThemeState = {
  mode: "DARK",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state, _) => {
      if (state.mode === "LIGHT") {
        StatusBar.setBarStyle("dark-content");
      } else {
        StatusBar.setBarStyle("light-content");
      }
      state.mode = state.mode === "LIGHT" ? "DARK" : "LIGHT";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
