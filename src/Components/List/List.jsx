import React from "react"
import Card from "../Card/Card"
import styles from "./List.module.css"

const List = ({ data }) => {
  return (
    <div className={`${styles.wrapper}`}>
      <h2>Current Issues</h2>
      {data.map((issue) => (
        <Card key={issue.id} issue={issue} />
      ))}
    </div>
  )
}

export default List
