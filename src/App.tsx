import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import Navigation from '@/components/Navigation';
import { ROUTES } from '@/constants/routes.constant';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex">
          <Navigation />
          <main className="flex-1 ml-16">
            <Suspense fallback={<div className="p-6">Loading...</div>}>
              <Routes>
                {ROUTES.map(({ path, component: Component }) => (
                  <Route key={path} path={path} element={<Component />} />
                ))}
              </Routes>
            </Suspense>
          </main>
        </div>
        <Toaster position="top-right" />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
export default App;
