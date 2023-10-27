import React from "react";
import { createRoot } from "react-dom/client";
import { createRouter } from "./routing/router-factory";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const mount = ({
    mountPoint,
    initialPathname,
    routingStrategy,
}) => {
    const router = createRouter({ strategy: routingStrategy, initialPathname });
    const root = createRoot(mountPoint);
    root.render(
        <Provider store={store}>
            <App router={router} />
        </Provider>
    );

    return () => queueMicrotask(() => root.unmount());
};

var localRoot = document.getElementById('_user-dev-root');

if (localRoot) {
    mount({
        mountPoint: localRoot,
        routingStrategy: 'browser',
    });
}

export { mount };
