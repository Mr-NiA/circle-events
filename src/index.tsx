import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { InitApp } from "./app";

const root = createRoot(document.getElementById("root")!);

root.render(
  <BrowserRouter>
    <InitApp />
  </BrowserRouter>,
);
