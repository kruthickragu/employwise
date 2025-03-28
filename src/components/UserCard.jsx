import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { deleteUser } from '../features/users/usersSlice'
import { StarIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import { toast } from 'react-hot-toast'

const DeleteConfirmation = ({ onConfirm, onCancel }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-lg z-[1000] flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl max-w-md w-full mx-4"
      >
        <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">Confirm Delete</h3>
        <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6">Are you sure you want to delete this user?</p>
        <div className="flex justify-end gap-3 md:gap-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onCancel}
            className="px-4 md:px-6 py-2 text-sm md:text-base rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 transition-colors"
          >
            Cancel
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onConfirm}
            className="px-4 md:px-6 py-2 text-sm md:text-base rounded-lg bg-gradient-to-r from-red-500 to-pink-500 hover:shadow-red-500/30 text-white transition-all"
          >
            Delete
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

const UserCard = ({ user, onEdit }) => {
  const dispatch = useDispatch()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleDelete = async () => {
    try {
      await dispatch(deleteUser(user.id)).unwrap()
      toast.success('User deleted successfully', {
        className: 'bg-white/5 backdrop-blur-lg border border-white/10 text-gray-100',
        icon: '✅'
      })
    } catch (error) {
      toast.error('Failed to delete user', {
        className: 'bg-red-500/20 backdrop-blur-lg border border-red-500/30 text-red-300'
      })
    } finally {
      setShowDeleteConfirm(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group bg-white/5 backdrop-blur-2xl rounded-3xl md:rounded-[2rem] shadow-xl md:shadow-2xl overflow-hidden 
                 border border-white/10 hover:border-white/30 transition-all duration-300 ease-out"
    >
      <div className="p-6 md:p-8 relative z-10">
        {/* Profile header */}
        <div className="flex items-center mb-6 md:mb-8">
          <motion.div whileHover={{ scale: 1.05 }} className="relative mr-3 md:mr-5">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-xl opacity-20" />
            <div className="relative bg-gradient-to-br from-purple-900 to-pink-900 p-0.5 md:p-1 rounded-full">
              <img 
                src={user.avatar} 
                alt={`${user.first_name} ${user.last_name}`} 
                className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white/20 shadow-xl"
              />
            </div>
          </motion.div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 md:mb-2">
              <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                {user.first_name} {user.last_name}
              </h3>
              <StarIcon className="w-4 h-4 md:w-5 md:h-5 text-yellow-400/80" />
            </div>
            <p className="text-xs md:text-sm text-gray-300 font-mono tracking-wide opacity-80 truncate">
              {user.email}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit(user)}
            className="py-3 md:py-4 px-4 md:px-6 bg-white/5 backdrop-blur-sm rounded-xl 
                     text-purple-300 hover:text-white border border-purple-500/30 
                     flex items-center justify-center gap-2 transition-all duration-200 text-sm md:text-base"
          >
            <PencilSquareIcon className="w-4 h-4 md:w-5 md:h-5" />
            <span className="font-semibold tracking-wide">Edit Profile</span>
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDeleteConfirm(true)}
            className="py-3 md:py-4 px-4 md:px-6 bg-white/5 backdrop-blur-sm rounded-xl 
                     text-red-300 hover:text-white border border-red-500/30 
                     flex items-center justify-center gap-2 transition-all duration-200 text-sm md:text-base"
          >
            <TrashIcon className="w-4 h-4 md:w-5 md:h-5" />
            <span className="font-semibold tracking-wide">Delete</span>
          </motion.button>
        </div>


      </div>

      <AnimatePresence>
        {showDeleteConfirm && (
          <DeleteConfirmation
            onConfirm={handleDelete}
            onCancel={() => setShowDeleteConfirm(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default UserCard