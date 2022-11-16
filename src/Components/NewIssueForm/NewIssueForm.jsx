import { useState } from "react"
import styles from "./NewIssueForm.module.css"
import { useAddIssueMutation } from "../../features/api/apiSlice"
import Loader from "../Loader/Loader"

const NewIssueForm = ({ visible, setVisible, customerId }) => {
  const [addIssue, { isLoading }] = useAddIssueMutation()
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
  })

  const submitNewIssue = (e) => {
    e.preventDefault()

    if (formData.subject === "" || formData.description === "") return

    addIssue({ ...formData, customerId })
    setFormData({ subject: "", description: "" })
    setVisible(false)
  }
  return (
    <>
      {isLoading && <Loader />}
      {visible && (
        <div className={`${styles.wrapper}`}>
          <h3>New Issue</h3>
          <form onSubmit={submitNewIssue} className={`${styles.form}`}>
            <div className={`${styles.formGroup}`}>
              <label>Subject</label>
              <input
                value={formData.subject}
                onChange={(e) => setFormData((state) => ({ ...state, subject: e.target.value }))}
                className={`${styles.formInput}`}
                type="text"
              />
            </div>
            <div className={`${styles.formGroup}`}>
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((state) => ({ ...state, description: e.target.value }))
                }
                className={`${styles.textarea}`}
              />
            </div>
            <button type="submit" className={`btn btn-primary`}>
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default NewIssueForm
