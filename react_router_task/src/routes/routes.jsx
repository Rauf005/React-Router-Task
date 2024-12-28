import Books from '../pages/User/Books/Books'
import BooksDetail from "../pages/User/Books Detail/BooksDetail"
import AdminRoot from '../pages/Admin/AdminRoot'
import UserRoot from '../pages/User/UserRoot'
import AddBook from "../pages/Admin/AddBook/AddBook"
import Dashboard from "../pages/Admin/Dashboard/Dashboard"
import EditBook from "../pages/Admin/EditBook/EditBook"
import Basket from '../pages/User/Basket/Basket'
import Favorites from "../pages/User/Favorites/Favorites"
import NotFound from"../pages/User/NotFound/NotFound"
import Home from '../pages/User/Home/Home'
const routes =[
    {
        path: "/",
        element: <UserRoot />,
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path: "/books",
                element: <Books />,
            },
            {
                path: "/books/:id",
                element: <BooksDetail />,
            },
            {
                path: "/basket",
                element: <Basket />
            },
            {
                path: "/favorites",
                element: <Favorites />
            },
            {
                path: "*",
                element: <NotFound />
            }
]}, {
    path:"/admin",
    element:<AdminRoot/>,
    children:[
   {
    path:"",
    element:<Dashboard/>
   },
   {
    path:"addbook",
    element:<AddBook/>
   },
   {
    path:"editbook",
    element:<EditBook/>
   }
    ]
}
]

export default routes