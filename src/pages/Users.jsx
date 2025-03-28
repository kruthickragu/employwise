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
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 to-indigo-900 py-12 md:py-16 px-4"
    >

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="text-center mb-8 md:mb-16"
        >
         <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 mb-4 md:mb-6 leading-[1.2] tracking-wide pb-2">
  User Management
</h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="mx-auto w-48 md:w-64 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full origin-center transform"
          />
        </motion.div>

        {status === 'loading' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-[2rem] p-6 md:p-8 shadow-xl md:shadow-3xl border border-white/10 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-shimmer" />
                <div className="space-y-4 relative z-10">
                  <div className="h-5 md:h-6 bg-white/10 rounded-full w-3/4 mb-3 md:mb-4" />
                  <div className="h-3 md:h-4 bg-white/10 rounded-full w-1/2 mb-3 md:mb-4" />
                  <div className="h-3 md:h-4 bg-white/10 rounded-full w-2/3" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12"
            >
              {data.map((user) => (
                <motion.div
                  key={user.id}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0 }}
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
              className="flex justify-center px-4"
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