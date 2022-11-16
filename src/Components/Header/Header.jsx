import { useEffect, useState } from "react"
import { AiFillLock } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { setUser, logoutUser } from "../../features/login/userSlice"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import LoginForm from "../LoginForm/LoginForm"
import NewIssueForm from "../NewIssueForm/NewIssueForm"
import styles from "./Header.module.css"

export const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const [showLogin, setShowLogin] = useState(false)
  const [showNewIssueForm, setShowNewIssueForm] = useState(false)

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"))

    if (savedUser?.id) {
      dispatch(setUser(savedUser))
    }
  }, [dispatch])

  return (
    <div className={styles.headerWrapper}>
      <div className={`${styles.header} container`}>
        <h1 onClick={() => navigate("/")}>IssuesTracker</h1>
        <div className={`${styles.headerOptions}`}>
          {user?.id && (
            <div className={`${styles.newIssueWrapper}`}>
              <div
                className={`btn btn-primary`}
                onClick={() => setShowNewIssueForm((state) => !state)}>
                Add new issue
              </div>
              <NewIssueForm
                customerId={user.id}
                visible={showNewIssueForm}
                setVisible={(data) => setShowNewIssueForm(data)}
              />
            </div>
          )}
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
              <LoginForm visible={showLogin} setVisible={(data) => setShowLogin(data)} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
