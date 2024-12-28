import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import routes from './routes/routes';
const Routes=createBrowserRouter(routes)
function App() {

  return (
    <>

    <RouterProvider router={Routes}/>

    </>
  )
}




export default App