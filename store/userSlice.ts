import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  displayName: string;
  email: string;
  photoUrl: string;
};

export interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
    },
    logout: (state, _) => {
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
