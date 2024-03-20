import  "./index.css";
import Home from "./Home/JSX";
import Call from "./Call/Jsx";
import Host from "./Host/Jsx";
import Join from "./Join/Jsx";
import Layout from "./Layout/Jsx";
import Schedule from "./Schedule";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const Router = createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[
          {
            path:"/",
            element:<Home/>
          },
          {
            path:"/host",
            element:<Host/>
          },
          {
            path:"/join/:channelid",
            element:<Join/>
          },
          {
            path:"/schedule",
            element:<Schedule/>
          }
    ]
  },
  {
    path:"/call/:channel/:uid",
    element:<Call/>
    }
])

function App() {
  
  return <RouterProvider router={Router} />
}

export default App
