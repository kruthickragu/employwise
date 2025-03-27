import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { logout } from '../features/auth/authSlice'
import LogoutConfirmation from './LogoutConfirmation'

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    if (!token) {
      navigate('/login', { state: { from: location }, replace: true })
    }
  }, [token, navigate, location])

  const handleLogout = () => {
    setShowLogoutConfirm(false)
    dispatch(logout())
    navigate('/login', { replace: true })
  }

  return token ? (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 to-indigo-900">
      {/* Animated background elements */}
      <AnimatePresence>
        {isMounted && [...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1, 0.5, 1],
              opacity: [0, 0.1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "linear"
            }}
            className="absolute border-2 border-white/5 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
            }}
          />
        ))}
      </AnimatePresence>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="fixed w-full bg-white/5 backdrop-blur-xl z-20 shadow-2xl border-b border-white/10"
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-6 py-2 rounded-xl
                     text-purple-300 hover:text-white border border-purple-500/30 hover:border-purple-500/50
                     transition-all duration-200 relative overflow-hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">Logout</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 hover:opacity-100 transition-opacity" />
          </motion.button>
        </div>
      </motion.nav>

      <div className="relative z-10 pt-20">
        {children}
      </div>

      <LogoutConfirmation
        isOpen={showLogoutConfirm}
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </div>
  ) : null
}

export default ProtectedRoute