import React from "react";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import NavBarPanel from "./NavBarPanel";
import store from "../store/store.js";

function RootLayout() {
    return (
        <>
            <Provider store={store}>
                <NavBarPanel />
                <main>
                    <Outlet />
                </main>
            </Provider>
        </>
    );
}

export default RootLayout;