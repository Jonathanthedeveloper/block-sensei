import Providers from "./providers";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}

export default App;
