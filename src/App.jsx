import { Route, Routes } from "react-router-dom"
import Layout from "@layout/Layout"
import Home from "@pages/Home"
import routes from "@routes/routes"
import 'animate.css';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />
            {
              routes.map( (route,i)=> <Route key={i} {...route} /> )
            }
        </Route>
      </Routes>
    </>
  )
}

export default App
