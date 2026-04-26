import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from '@/shared/components/ErrorBoundary';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { ToastProvider } from '@/shared/components/Toast';
import { HelmetProvider } from 'react-helmet-async';
import AppRouter from '@/app/router/AppRouter';

const App = () => (
  <HelmetProvider>
    <BrowserRouter>
      <ToastProvider>
        <ThemeProvider>
          <ErrorBoundary>
            <AppRouter />
          </ErrorBoundary>
        </ThemeProvider>
      </ToastProvider>
    </BrowserRouter>
  </HelmetProvider>
);

export default App;





