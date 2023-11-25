import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const Login = lazy(() => import('../pages/Login/Login'))

const AppRoutes = () => {
  const elements = useRoutes([
    {
      path: '/login',
      element: <Login/>
    }
  ])
  return elements
}

export default AppRoutes
