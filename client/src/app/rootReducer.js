import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import { authAPi } from "@/features/api/authApi";

const rootRedcuer = combineReducers({
    [authAPi.reducerPath]:authAPi.reducer,
    auth:authReducer
});

export default rootRedcuer;