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
            (issue.status.status === "completed"
              ? "var(--clr-primary)"
              : issue.status.status === "critical"
              ? "var(--clr-error)"
              : "var(--clr-warning)") + " 2px solid",
        }}>
        <div
          className={styles.top}
          style={{
            color:
              issue.status.status === "completed"
                ? "var(--clr-primary)"
                : issue.status.status === "critical"
                ? "var(--clr-error)"
                : "var(--clr-warning)",
          }}>
          <p>{issue.subject}</p>
          <p className={`${styles.status}`}>{issue.status.status}</p>
        </div>
        <div className={styles.bottom}>
          <p>{`${issue.customer.firstName} ${issue.customer.lastName}`}</p>
          <p>{issue.created.split("T")[0]}</p>
        </div>
      </div>
    </Link>
  )
}

export default Card
