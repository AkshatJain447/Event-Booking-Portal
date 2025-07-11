import React from "react";
import ReactDOM from "react-dom/client";
import App from "../src/routes/App";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import HotelList from "./components/HotelList/HotelList";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Contact from "./components/Contact/Contact";
import BookHotel from "./components/BookHotel/BookHotel";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";

const router = createBrowserRouter([
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
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/bookhotel/:id",
        element: <BookHotel />,
      },
      {
        path: "/userdashboard",
        element: <UserDashboard />,
      },
      {
        path: "/admindashboard",
        element: <AdminDashboard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
