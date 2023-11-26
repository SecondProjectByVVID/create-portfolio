import { Suspense } from 'react'
import AppRoutes from './routes/AppRoutes'

function App () {
  return (
    <div className="container">
      <Suspense >
        <AppRoutes/>
      </Suspense>
    </div>
  )
}

export default App
