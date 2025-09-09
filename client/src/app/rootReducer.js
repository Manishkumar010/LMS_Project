import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import { authAPi } from "@/features/api/authApi";
import { courseAPI } from "@/features/api/courseApi";

const rootRedcuer = combineReducers({
    [authAPi.reducerPath]:authAPi.reducer,
    [courseAPI.reducerPath]:courseAPI.reducer,
    auth:authReducer
});

export default rootRedcuer;