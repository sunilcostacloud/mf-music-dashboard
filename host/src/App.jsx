import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { routes } from "./routing/routes";

const browserRouter = createBrowserRouter(routes);

const App = () => {
  return <RouterProvider router={browserRouter} />
}

export default App