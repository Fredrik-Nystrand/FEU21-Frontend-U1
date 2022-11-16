import { useState } from "react"
import { useLoginCustomerMutation, useAddCustomerMutation } from "../../features/api/apiSlice"
import { useDispatch } from "react-redux"
import { setUser } from "../../features/login/userSlice"
import styles from "./LoginForm.module.css"
import Loader from "../Loader/Loader"

const LoginForm = ({ visible, setVisible }) => {
  const dispatch = useDispatch()
  const [loginCustomer, { isLoading: loginLoading }] = useLoginCustomerMutation()
  const [addCustomer, { isLoading: registerLoading }] = useAddCustomerMutation()
  const [register, setRegister] = useState(false)
  const [registerFormData, setRegisterFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    confirmPassword: "",
  })
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  })
  const [submitError, setSubmitError] = useState()

  const resetForm = () => {
    setLoginFormData({
      email: "",
      password: "",
    })
    setRegisterFormData({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      confirmPassword: "",
    })
  }

  const submitLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await loginCustomer(loginFormData)
      if (res.data) {
        dispatch(setUser(res.data))
        resetForm()
        setVisible(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const submitRegister = async (e) => {
    e.preventDefault()

    if (registerFormData.confirmPassword !== loginFormData.password) {
      setSubmitError("Passwords do not match")
      return
    } else {
      setSubmitError()
    }

    const newUser = {
      ...registerFormData,
      ...loginFormData,
    }

    try {
      const res = await addCustomer(newUser)
      if (res.data) {
        dispatch(setUser(res.data))
        resetForm()
        setVisible(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {(loginLoading || registerLoading) && <Loader />}
      {visible && (
        <div className={`${styles.wrapper}`}>
          <h3>{register ? "Register Customer" : "Login Customer"}</h3>
          <form onSubmit={register ? submitRegister : submitLogin} className={`${styles.form}`}>
            {register && (
              <div className={`${styles.formGroup}`}>
                <label>Firstname</label>
                <input
                  value={registerFormData.firstName}
                  onChange={(e) =>
                    setRegisterFormData((state) => ({ ...state, firstName: e.target.value }))
                  }
                  type="text"
                  className={`${styles.formInput}`}
                />
              </div>
            )}
            {register && (
              <div className={`${styles.formGroup}`}>
                <label>Lastname</label>
                <input
                  value={registerFormData.lastName}
                  onChange={(e) =>
                    setRegisterFormData((state) => ({ ...state, lastName: e.target.value }))
                  }
                  type="text"
                  className={`${styles.formInput}`}
                />
              </div>
            )}
            {register && (
              <div className={`${styles.formGroup}`}>
                <label>Phone</label>
                <input
                  value={registerFormData.phoneNumber}
                  onChange={(e) =>
                    setRegisterFormData((state) => ({ ...state, phoneNumber: e.target.value }))
                  }
                  type="text"
                  className={`${styles.formInput}`}
                />
              </div>
            )}
            <div className={`${styles.formGroup}`}>
              <label>Email</label>
              <input
                value={loginFormData.email}
                onChange={(e) => setLoginFormData((state) => ({ ...state, email: e.target.value }))}
                type="text"
                className={`${styles.formInput}`}
              />
            </div>
            <div className={`${styles.formGroup}`}>
              <label>Password</label>
              <input
                value={loginFormData.password}
                onChange={(e) =>
                  setLoginFormData((state) => ({ ...state, password: e.target.value }))
                }
                type="password"
                className={`${styles.formInput}`}
              />
            </div>
            {register && (
              <div className={`${styles.formGroup}`}>
                <label>Confirm Password</label>
                <input
                  value={registerFormData.confirmPassword}
                  onChange={(e) =>
                    setRegisterFormData((state) => ({ ...state, confirmPassword: e.target.value }))
                  }
                  type="password"
                  className={`${styles.formInput}`}
                />
              </div>
            )}
            {submitError && <p className="text-center text-warning">{submitError}</p>}
            <p className={`${styles.prompt} text-center`}>
              {register ? "Already a customer? " : "No account? "}
              <span className={`${styles.link}`} onClick={() => setRegister(!register)}>
                {register ? "Login here!" : "Register here!"}
              </span>
            </p>
            <button type="submit" className={`btn btn-primary`}>
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default LoginForm
