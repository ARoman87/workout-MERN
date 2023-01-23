import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './App.css'
import { WorkoutContextProvider } from './context/WorkoutContext'
import { AuthContextProvider } from './context/AuthContext'
import {disableReactDevTools} from "@fvilers/disable-react-devtools"

if (process.env.NODE_ENV === "production") disableReactDevTools()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
    <WorkoutContextProvider>
      <App />
    </WorkoutContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
