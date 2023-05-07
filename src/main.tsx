import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

// const queryClient = new QueryClient({
//     defaultOptions: {
//         queries: {
//             retry: 1,
//             cacheTime: 300_000, //5min
//             staleTime: 5 * 1000, //10sec
//             refetchOnWindowFocus: false,
//             refetchOnReconnect: true
//         }
//     }
// });

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <App />
            <ReactQueryDevtools />
        </QueryClientProvider>
    </BrowserRouter>
);
