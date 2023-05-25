import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import routes from "./router";

function App() {
  const router = createBrowserRouter(routes);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
