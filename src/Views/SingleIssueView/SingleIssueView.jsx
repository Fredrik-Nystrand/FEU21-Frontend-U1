import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { HiChevronDown, HiChevronLeft } from "react-icons/hi"
import {
  useGetIssueQuery,
  useGetStatusesQuery,
  useUpdateIssueMutation,
  useAddCommentMutation,
} from "../../features/api/apiSlice"
import styles from "./SingleIssueView.module.css"
import Dropdown from "../../Components/Dropdown/Dropdown"
import { useSelector } from "react-redux"
import Loader from "../../Components/Loader/Loader"

const SingleIssueView = () => {
  const { id } = useParams()
  const { data, isLoading: issueLoading } = useGetIssueQuery(id)
  const { data: statuses, isLoading: isStatusesLoading } = useGetStatusesQuery()
  const [updateIssue, { isLoading: updateIssueLoading }] = useUpdateIssueMutation()
  const [addComment, { isLoading: addCommentLoading }] = useAddCommentMutation()
  const navigate = useNavigate()
  const [dropDownOpen, setDropDownOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState()
  const [newComment, setNewComment] = useState("")
  const user = useSelector((state) => state.user)

  useEffect(() => {
    if (selectedStatus) {
      updateIssue({
        id: data.id,
        subject: data.subject,
        description: data.description,
        statusId: selectedStatus.id,
        customerId: data.customer.id,
      })
    }
  }, [selectedStatus, data?.id, data?.subject, data?.description, data?.customer?.id, updateIssue])

  const addNewComment = (e) => {
    e.preventDefault()
    console.log({ comment: newComment, customerId: user.id, issueId: data.id })
    addComment({ comment: newComment, customerId: user.id, issueId: data.id })
    setNewComment("")
  }

  return (
    <>
      {(issueLoading || isStatusesLoading || updateIssueLoading || addCommentLoading) && <Loader />}
      {!issueLoading && (
        <div className={`container content`}>
          <div
            className={`${styles.wrapper}`}
            style={{
              borderTop:
                (data.status.status === "completed"
                  ? "var(--clr-primary)"
                  : data.status.status === "critical"
                  ? "var(--clr-error)"
                  : "var(--clr-warning)") + " 3px solid",
            }}>
            <div className={styles.header}>
              <div
                onClick={() => navigate("/")}
                className={`${styles.container} ${styles.back}`}
                style={{
                  color:
                    data.status.status === "completed"
                      ? "var(--clr-primary)"
                      : data.status.status === "critical"
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
                      data.status.status === "completed"
                        ? "var(--clr-primary)"
                        : data.status.status === "critical"
                        ? "var(--clr-error)"
                        : "var(--clr-warning)",
                  }}>
                  <h2>{data.subject}</h2>

                  <div
                    className={`${styles.status} ${dropDownOpen ? styles.dropdownOpen : ""}`}
                    onClick={() => setDropDownOpen((state) => !state)}>
                    <h4>{data.status.status}</h4>
                    {user.id && (
                      <>
                        <HiChevronDown />
                        <Dropdown
                          visible={dropDownOpen}
                          options={isStatusesLoading ? [] : statuses}
                          selected={setSelectedStatus}
                        />
                      </>
                    )}
                  </div>
                </div>
                <div className={`${styles.bottom}`}>
                  <p>{`${data.customer.firstName} ${data.customer.lastName}`}</p>
                  <p>{data.created.split("T")[0]}</p>
                </div>
              </div>
            </div>
            <h4 className="mt-2">Description</h4>
            <div className={`${styles.container}`}>{data.description}</div>

            {data.comments.length > 0 && <h4 className="mt-2">Comments</h4>}
            {data.comments.map((comment) => (
              <div className={`${styles.container}`} key={comment.id}>
                <div className={`${styles.top}`}>{comment.comment}</div>
                <div className={`${styles.bottom} mt-1`}>
                  <span>Skapad av: {comment.customerName}</span>
                  <span>{comment.created.split("T")[0]}</span>
                </div>
              </div>
            ))}
            {user.id && <h4 className="mt-2">Add comment</h4>}
            {user.id ? (
              <form onSubmit={addNewComment} className="d-flex flex-column gap-half">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className={`${styles.textarea}`}
                />
                <button type="submit" className={`btn btn-primary`}>
                  Submit
                </button>
              </form>
            ) : (
              <h4 className="mt-2">Login to post comments...</h4>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default SingleIssueView
