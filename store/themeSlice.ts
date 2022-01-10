import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatusBar } from "react-native";

export interface ThemeState {
  mode: "DARK" | "LIGHT";
}

const initialState: ThemeState = {
  mode: "LIGHT",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state, _) => {
      if (state.mode === "LIGHT") {
        StatusBar.setBarStyle("dark-content");
        state.mode = "DARK";
      } else if (state.mode === "DARK") {
        StatusBar.setBarStyle("light-content");
        state.mode = "LIGHT";
      }
    },
    setDark: (state, action: PayloadAction<{ value: boolean }>) => {
      console.log(action);
      state.mode = action.payload.value ? "LIGHT" : "DARK";
    },
  },
});

export const { toggleTheme, setDark } = themeSlice.actions;

export default themeSlice.reducer;
