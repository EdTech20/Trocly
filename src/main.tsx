import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { app, analytics } from './firebase.ts';


createRoot(document.getElementById("root")!).render(<App />);
