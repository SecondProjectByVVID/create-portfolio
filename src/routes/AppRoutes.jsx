import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const Login = lazy(() => import('./../pages/Login'))
const Main = lazy(() => import('./../pages/Main'))
const NotFound = lazy(() => import('./../pages/NotFound/NotFound'))

const AppRoutes = () => {
  const elements = useRoutes([
    {
      path: '/',
      element: <Main />
    },
    {
      path: '/login',
      element: <Login/>
    },
    {
      path: '*',
      element: <NotFound/>
    }
  ])
  return elements
}

export default AppRoutes
