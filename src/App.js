// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AnimatePresence } from 'framer-motion'
import Login from './pages/Login'
import Users from './pages/Users'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </>
  )
}

export default App