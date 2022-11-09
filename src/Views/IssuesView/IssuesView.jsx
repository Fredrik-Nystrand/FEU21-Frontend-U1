import React from "react"
import List from "../../Components/List/List"
import styles from "./IssuesView.module.css"

const IssuesView = ({ data }) => {
  return (
    <div className={`container content`}>
      <List data={data} />
    </div>
  )
}

export default IssuesView
