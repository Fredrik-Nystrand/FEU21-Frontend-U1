import { useEffect, useState } from "react"
import styles from "./Header.module.css"
import { AiFillLock } from "react-icons/ai"
import LoginForm from "../LoginForm/LoginForm"
import { useDispatch } from "react-redux"
import { setUser, logoutUser } from "../../features/login/userSlice"
import { useSelector } from "react-redux"

export const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"))

    if (savedUser?.id) {
      dispatch(setUser(savedUser))
    }
  }, [])

  return (
    <div className={styles.headerWrapper}>
      <div className={`${styles.header} container`}>
        <h1>IssuesTracker</h1>
        <div className={`${styles.headerOptions}`}>
          {user?.id && <div className={`btn btn-primary`}>Add new issue</div>}
          {user?.id ? (
            <div className={`${styles.avatarWrapper}`}>
              <div
                className={`${styles.avatar}`}
                title="Logout"
                onClick={() => dispatch(logoutUser())}>
                {`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`}
              </div>
            </div>
          ) : (
            <div className={`${styles.avatarWrapper}`}>
              <div
                className={`${styles.avatar}`}
                title="Login"
                onClick={() => setShowLogin((state) => !state)}>
                <AiFillLock />
              </div>
              <LoginForm visible={showLogin} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
