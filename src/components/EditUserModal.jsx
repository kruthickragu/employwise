import { motion, AnimatePresence } from 'framer-motion'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { updateUser } from '../features/users/usersSlice'
import { useState } from 'react'

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
})

const SuccessNotification = ({ message, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1001] flex items-center justify-center"
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl max-w-md w-full mx-4 text-center"
      >
        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
          Success!
        </h3>
        <p className="text-gray-300 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-purple-500/30 text-white transition-all"
        >
          Continue
        </button>
      </motion.div>
    </motion.div>
  )
}

const EditUserModal = ({ user, onClose }) => {
  const dispatch = useDispatch()
  const [showSuccess, setShowSuccess] = useState(false)

  if (!user) return null

  const handleSuccessClose = () => {
    setShowSuccess(false)
    onClose()
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-xl flex items-center justify-center p-4 z-[999]"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl w-full max-w-md p-8 shadow-2xl relative z-[1000]"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 -z-10" />
          
          <motion.h2
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8"
          >
            Edit Profile
          </motion.h2>
          
          <Formik
            initialValues={{
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              try {
                await dispatch(updateUser({ id: user.id, ...values })).unwrap()
                setShowSuccess(true)
              } catch (error) {
                // Handle error state here if needed
              }
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-6">
                {['first_name', 'last_name', 'email'].map((field) => (
                  <motion.div
                    key={field}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      {field.replace('_', ' ').toUpperCase()}
                    </label>
                    <Field
                      name={field}
                      className={`w-full px-5 py-3.5 bg-white/5 rounded-xl border ${
                        errors[field] && touched[field] 
                          ? 'border-pink-500/50' 
                          : 'border-white/10'
                      } focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 text-gray-100 placeholder-gray-400 transition-all`}
                    />
                    {errors[field] && touched[field] && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-pink-400/80 text-sm mt-2"
                      >
                        {errors[field]}
                      </motion.div>
                    )}
                  </motion.div>
                ))}

                <div className="flex justify-end gap-3 mt-8">
                  <motion.button
                    type="button"
                    onClick={onClose}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 transition-all"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 rounded-xl font-medium text-white disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden"
                  >
                    <span className="relative z-10">
                      {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </span>
                    <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-20 transition-opacity" />
                  </motion.button>
                </div>
              </Form>
            )}
          </Formik>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showSuccess && (
          <SuccessNotification 
            message="User updated successfully!"
            onClose={handleSuccessClose}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default EditUserModal