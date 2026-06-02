import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col max-h-screen">
        {/* <Header /> */}
        <main className="flex-1">
          <AppRoutes />
        </main>
        {/* <Footer /> */}
      </div>

      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: '12px',
            padding: '12px 16px',
          },
        }}
      />
    </BrowserRouter>
  );
}
