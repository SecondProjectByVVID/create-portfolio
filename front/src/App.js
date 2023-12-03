import { Suspense } from 'react';
import AppRoutes from './routes/AppRoutes';
import Loader from './ui/Loader/Loader';
import AuthProvider from './hooks/useAuth';

function App() {
  return (
    <div className="container">
      <Suspense fallback={<Loader />}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Suspense>
    </div>
  );
}

export default App;
