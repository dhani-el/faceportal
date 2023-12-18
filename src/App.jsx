import  "./index.css";
import Home from "./Home/JSX";
import Call from "./Call/Jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/call",
    element:<Call/>
  }
])

function App() {
  
  return <RouterProvider router={Router} />
}

export default App
