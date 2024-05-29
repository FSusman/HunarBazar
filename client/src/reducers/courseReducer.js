import { createSlice } from "@reduxjs/toolkit";
import courseService from "../services/course";

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
  },
  reducers: {
    setCourses(state, action) {
      return action.payload;
    },
  },
});

export const { setCourses } = coursesSlice.actions;

export const fetchCourses = () => {
  return async (dispatch) => {
    const courses = await courseService.getCourses();
    dispatch(setCourses(courses));
  };
};

export default coursesSlice.reducer;
