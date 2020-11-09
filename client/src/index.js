import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import store from "./store";
import { Provider } from "react-redux";

(function (i, s, o, g, r, b, a, m) {
  i["knowuserObject"] = r;
  (i[r] =
    i[r] ||
    function () {
      (i[r].q = i[r].q || []).push(arguments);
    }),
    (i[r].l = 1 * new Date());
  (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m);
  sessionStorage.setItem("ku_scriptId", b);
})(
  window,
  document,
  "script",
  "http://127.0.0.1:5500/dist/main.bundle.js",
  "ga",
  "2ae5f33c-1194-4362-b0c3-a2c72232aa28"
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// serviceWorker.unregister();
