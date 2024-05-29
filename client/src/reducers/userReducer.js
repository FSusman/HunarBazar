import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const fetchUser = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    const localUser = JSON.parse(localStorage.getItem("user"));
    
    const user = users.find((user) => user.username === localUser.username);
    dispatch(setUser(user));
  };
};

export default userSlice.reducer;
