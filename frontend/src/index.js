import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import { Provider } from "react-redux";
import store from "./store/store";
import CommunityScreen from "./screens/CommunityScreen";
import CreateNewPostScreen from "./screens/CreateNewPostScreen";
import PostDetailsScreen from "./screens/PostDetailsScreen";
import ProfilePage from "./screens/ProfilePage";
import ErrorScreen from "./screens/ErrorScreen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorScreen />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignupScreen />} />
      <Route path="/communities/:id" element={<CommunityScreen />} />
      <Route
        path="/communities/:id/posts/:postid"
        element={<PostDetailsScreen />}
      />
      <Route path="/users/:id" element={<ProfilePage />} />
      <Route path="/communities/:id/submit" element={<CreateNewPostScreen />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
