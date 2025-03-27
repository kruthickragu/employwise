import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserCard from '../components/UserCard'
import Pagination from '../components/Pagination'
import { fetchUsers } from '../features/users/usersSlice'
import EditUserModal from '../components/EditUserModal'

const Users = () => {
  const dispatch = useDispatch()
  const { data, totalPages, status } = useSelector((state) => state.users)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    dispatch(fetchUsers(currentPage))
  }, [dispatch, currentPage])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 to-indigo-900 py-16 px-4"
    >
      {/* Quantum Particle Field */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(200)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 0.6, 0],
              opacity: [0, 0.4, 0],
              y: [0, -150],
              x: [0, (Math.random() - 0.5) * 80]
            }}
            transition={{
              duration: 8 + Math.random() * 5,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="absolute bg-gradient-to-r from-purple-400/40 to-pink-400/40 rounded-full blur-[1px]"
            style={{
              width: `${Math.random() * 6 + 3}px`,
              height: `${Math.random() * 6 + 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Celestial Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ scale: 0, x: '-30%', y: '-30%' }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[1000px] h-[1000px] bg-gradient-radial from-purple-500/15 to-transparent blur-3xl"
        />
        <motion.div
          initial={{ scale: 0, x: '70%', y: '60%' }}
          animate={{ scale: 1, rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[800px] h-[800px] bg-gradient-radial from-pink-500/15 to-transparent blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Animated Header Section */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 mb-6 leading-tight">
            User Management
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="mx-auto w-64 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full origin-center transform"
          />
        </motion.div>

        {status === 'loading' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-8 shadow-3xl border border-white/10 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-shimmer" />
                <div className="space-y-4 relative z-10">
                  <div className="h-6 bg-white/10 rounded-full w-3/4 mb-4" />
                  <div className="h-4 bg-white/10 rounded-full w-1/2 mb-4" />
                  <div className="h-4 bg-white/10 rounded-full w-2/3" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            >
              {data.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <UserCard
                    user={user}
                    onEdit={setSelectedUser}
                  />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center"
            >
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </motion.div>
          </>
        )}
      </div>

      <EditUserModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </motion.div>
  )
}

export default Users
