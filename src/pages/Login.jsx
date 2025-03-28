import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { login } from "../features/auth/authSlice";
import { useEffect, useState } from "react";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, status, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (token) navigate("/users");
  }, [token, navigate]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 to-indigo-900">
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(150)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 0.8, 0],
              opacity: [0, 0.4, 0],
              y: [0, -100],
              x: [0, (Math.random() - 0.5) * 100],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bg-gradient-to-r from-purple-400/50 to-pink-400/50 rounded-full blur-[1px]"
            style={{
              width: `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ scale: 0, x: "-30%", y: "-30%" }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute w-[800px] h-[800px] bg-gradient-radial from-purple-500/20 to-transparent blur-3xl"
        />
        <motion.div
          initial={{ scale: 0, x: "70%", y: "60%" }}
          animate={{ scale: 1, rotate: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute w-[600px] h-[600px] bg-gradient-radial from-pink-500/20 to-transparent blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 min-h-screen flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ y: 50, rotateX: -15, opacity: 0 }}
          animate={{ y: 0, rotateX: 0, opacity: 1 }}
          transition={{ duration: 1.5, type: "spring" }}
          className="w-full max-w-md bg-white/5 backdrop-blur-3xl rounded-[3rem] shadow-4xl border border-white/10 overflow-hidden relative"
        >
          <div className="absolute inset-0 rounded-[3rem] overflow-hidden">
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"
            />
          </div>

          <div className="p-10 space-y-10 relative z-10">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-4">
                Welcome
              </h1>
              <p className="text-lg text-gray-300 font-light tracking-wider">
                Enter the gateway to possibilities
              </p>
            </motion.div>

            <Formik
              initialValues={{
                email: "eve.holt@reqres.in",
                password: "cityslicka",
              }}
              validationSchema={LoginSchema}
              onSubmit={(values) => dispatch(login(values))}
            >
              {({ errors, touched }) => (
                <Form className="space-y-8">
                  {/* Email Input */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="relative"
                  >
                    <Field
                      name="email"
                      type="email"
                      className="w-full px-6 py-5 bg-white/5 rounded-2xl border-2 border-white/10 focus:border-purple-400/50 focus:ring-4 focus:ring-purple-400/20 text-white placeholder-transparent peer"
                      placeholder=" "
                    />
                    <label className="absolute left-6 -top-7 text-sm text-purple-300 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-5">
                      Email Address
                    </label>
                    {errors.email && touched.email && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute right-4 top-5 text-pink-400/80 text-sm"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Password Input */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="relative"
                  >
                    <Field
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="w-full px-6 py-5 bg-white/5 rounded-2xl border-2 border-white/10 focus:border-purple-400/50 focus:ring-4 focus:ring-purple-400/20 text-white placeholder-transparent peer"
                      placeholder=" "
                    />
                    <label className="absolute left-6 -top-6 text-sm text-purple-300 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-5">
                      Password
                    </label>
                    {errors.password && touched.password && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute right-4 top-5 text-pink-400/80 text-sm"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </motion.div>
                    )}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute ${
                        errors.password && touched.password
                          ? "right-12"
                          : "right-4"
                      } top-5 text-purple-300 hover:text-purple-400 transition-colors`}
                    >
                      {showPassword ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="relative"
                  >
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full py-6 px-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl font-semibold text-white hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-500 overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {status === "loading" ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Authenticating...
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                              />
                            </svg>
                            Access Portal
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: [0, 1, 0], opacity: [0, 0.5, 0] }}
                            transition={{
                              duration: 0.6,
                              delay: i * 0.05,
                              repeat: Infinity,
                              repeatDelay: 2,
                            }}
                            className="absolute bg-white rounded-full"
                            style={{
                              width: "4px",
                              height: "4px",
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                            }}
                          />
                        ))}
                      </div>
                    </button>
                  </motion.div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center text-pink-400/80 flex items-center justify-center gap-2"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {error}
                    </motion.div>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
