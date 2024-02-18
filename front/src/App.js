import { Suspense } from 'react';
import AppRoutes from './routes/AppRoutes';
import Loader from './ui/loader/Loader';

function App() {
  return (
    <div className="container">
      <Suspense fallback={<Loader />}>
        <AppRoutes />
      </Suspense>
    </div>
  );
}

export default App;
