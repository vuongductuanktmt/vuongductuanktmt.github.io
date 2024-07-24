import { ThemeProvider } from "@material-tailwind/react";
import Home from "@pages/Home.tsx";
import { setupStore } from "@store/store.ts";
import "@styles/index.css";
import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Login from "./pages/Login";

const router = createHashRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

const store = setupStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#8665D3",
            borderRadius: 2,
            colorBgContainer: "#f6ffed",
          },
        }}
      >
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ConfigProvider>
    </ThemeProvider>
  </React.StrictMode>
);
