import { configureStore } from "@reduxjs/toolkit";
import rootRedcuer from "./rootReducer";
import { authAPi } from "@/features/api/authApi";
import { courseAPI } from "@/features/api/courseApi";

export const appStore = configureStore({
    reducer:rootRedcuer,
    middleware:(defaultMiddleware) => defaultMiddleware().concat(authAPi.middleware, courseAPI.middleware)
})

const initializeApp = async ()=>{
    await appStore.dispatch(authAPi.endpoints.loadUser.initiate({},{forceRefetch:true}))
}
initializeApp()