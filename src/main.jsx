import React from "react";
import ReactDOM from "react-dom/client";
import App from "../src/routes/App";
import "./index.css";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import HotelList from "./components/HotelList/HotelList";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/search",
        element: <HotelList />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
