import React from "react"
import { Link } from "react-router-dom"
import styles from "./Card.module.css"

const Card = ({ issue }) => {
  return (
    <Link to={`/issue/${issue.id}`}>
      <div
        className={`${styles.card}`}
        style={{
          borderBottom:
            (issue.status === "completed"
              ? "#2bcb5e"
              : issue.status === "critical"
              ? "#af5d68"
              : "#cba02b") + " 2px solid",
        }}>
        <div
          className={styles.top}
          style={{
            color:
              issue.status === "completed"
                ? "#2bcb5e"
                : issue.status === "critical"
                ? "#af5d68"
                : "#cba02b",
          }}>
          <p>{issue.subject}</p>
          <p className={`${styles.status}`}>{issue.status}</p>
        </div>
        <div className={styles.bottom}>
          <p>{issue.customerId}</p>
          <p>{issue.created}</p>
        </div>
      </div>
    </Link>
  )
}

export default Card
