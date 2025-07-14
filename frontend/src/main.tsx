import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { Toaster } from '@/components/ui/sonner'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster position="top-right" richColors />
    </Provider>
  </StrictMode>
)