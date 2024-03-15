import  "./index.css";
import Home from "./Home/JSX";
import Call from "./Call/Jsx";
import Host from "./Host/Jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/call/:channel/:uid",
    element:<Call/>
  },
  {
    path:"/host",
    element:<Host/>
  }
])

function App() {
  
  return <RouterProvider router={Router} />
}

export default App
