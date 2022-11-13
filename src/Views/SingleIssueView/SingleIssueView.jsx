import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { HiChevronDown, HiChevronLeft } from "react-icons/hi"
import styles from "./SingleIssueView.module.css"
import fakeIssues from "../../fakeIssues.json"
import fakeComments from "../../fakeComments.json"
import Dropdown from "../../Components/Dropdown/Dropdown"

const SingleIssueView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [issue, setIssue] = useState()
  const [comments, setComments] = useState([])
  const [dropDownOpen, setDropDownOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState()

  const getData = (id) => {
    setIssue(...fakeIssues.filter((issue) => issue.id === parseInt(id)))
    setComments(fakeComments.filter((comment) => comment.issueId == parseInt(id)))
  }

  useEffect(() => {
    getData(id)
  }, [id])

  useEffect(() => {
    setSelectedStatus(issue?.status)
  }, [issue])

  useEffect(() => {
    if (selectedStatus) {
      setIssue((state) => ({ ...state, status: selectedStatus }))
    }
  }, [selectedStatus])

  return (
    <div className={`container content`}>
      <div
        className={`${styles.wrapper}`}
        style={{
          borderTop:
            (issue?.status === "completed"
              ? "var(--clr-primary)"
              : issue?.status === "critical"
              ? "var(--clr-error)"
              : "var(--clr-warning)") + " 3px solid",
        }}>
        <div className={styles.header}>
          <div
            onClick={() => navigate("/")}
            className={`${styles.container} ${styles.back}`}
            style={{
              color:
                issue?.status === "completed"
                  ? "var(--clr-primary)"
                  : issue?.status === "critical"
                  ? "var(--clr-error)"
                  : "var(--clr-warning)",
            }}>
            <HiChevronLeft />
          </div>
          <div className={`${styles.container} ${styles.metaData}`}>
            <div
              className={`${styles.top}`}
              style={{
                color:
                  issue?.status === "completed"
                    ? "var(--clr-primary)"
                    : issue?.status === "critical"
                    ? "var(--clr-error)"
                    : "var(--clr-warning)",
              }}>
              <h2>{issue?.subject}</h2>

              <div
                className={`${styles.status} ${dropDownOpen ? styles.dropdownOpen : ""}`}
                onClick={() => setDropDownOpen((state) => !state)}>
                <h4>{issue?.status}</h4>
                <HiChevronDown />
                <Dropdown
                  visible={dropDownOpen}
                  options={["active", "completed", "critical"]}
                  selected={setSelectedStatus}
                />
              </div>
            </div>
            <div className={`${styles.bottom}`}>
              <p>{issue?.customerId}</p>
              <p>{issue?.created}</p>
            </div>
          </div>
        </div>
        <h4 className="mt-2">Description</h4>
        <div className={`${styles.container}`}>{issue?.description}</div>

        {comments?.length > 0 && <h4 className="mt-2">Comments</h4>}
        {comments.map((comment) => (
          <div className={`${styles.container}`} key={comment.id}>
            <div className={`${styles.top}`}>{comment.comment}</div>
            <div className={`${styles.bottom} mt-1`}>
              <span>Skapad av: {comment.customerId}</span>
              <span>{comment.created}</span>
            </div>
          </div>
        ))}
        <h4 className="mt-2">Add comment</h4>
        <textarea className={`${styles.textarea}`} />
        <button className={`btn btn-primary`}>Submit</button>
      </div>
    </div>
  )
}

export default SingleIssueView
