import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(

    <React.StrictMode>

        <App />

        <Toaster

            position="top-right"

            reverseOrder={false}

            gutter={12}

            containerStyle={{

                top: 24,

                right: 24,

            }}

            toastOptions={{

                duration: 3000,

                style: {

                    background: "var(--surface)",

                    color: "var(--text)",

                    border: "1px solid var(--border)",

                    borderRadius: "18px",

                    padding: "16px 18px",

                    boxShadow: "var(--shadow-lg)",

                    fontSize: "0.95rem",

                },

                success: {

                    iconTheme: {

                        primary: "#22c55e",

                        secondary: "#ffffff",

                    },

                },

                error: {

                    iconTheme: {

                        primary: "#ef4444",

                        secondary: "#ffffff",

                    },

                },

            }}

        />

    </React.StrictMode>

);