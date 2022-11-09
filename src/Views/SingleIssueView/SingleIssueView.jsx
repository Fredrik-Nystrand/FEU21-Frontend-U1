import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import styles from "./SingleIssueView.module.css"
import fakeIssues from "../../fakeIssues.json"

const SingleIssueView = () => {
  const { id } = useParams()
  const [issue, setIssue] = useState()

  const getData = (id) => {
    setIssue(...fakeIssues.filter((issue) => issue.id === +id))
  }

  useEffect(() => {
    getData(id)
  }, [id])

  return (
    <div className={`container content`}>
      <div className={`${styles.wrapper}`}>{issue?.subject}</div>
    </div>
  )
}

export default SingleIssueView
