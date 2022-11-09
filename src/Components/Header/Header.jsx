import React from "react"
import styles from "./Header.module.css"

export const Header = () => {
  return (
    <div className={styles.headerWrapper}>
      <div className={`${styles.header} container`}>
        <h1>IssuesTracker</h1>
        <div className={`${styles.headerOptions}`}>
          <div className={`btn btn-primary`}>Add new issue</div>
          <div className={`${styles.avatar}`}>FN</div>
        </div>
      </div>
    </div>
  )
}
