import Card from "../Card/Card"
import styles from "./List.module.css"
import { useGetIssuesQuery } from "../../features/api/apiSlice"
import Loader from "../Loader/Loader"

const List = () => {
  const { data, error, isError, isLoading } = useGetIssuesQuery()

  return (
    <>
      {isLoading && <Loader />}
      {isError && <p>{error.error}</p>}
      <div className={`${styles.wrapper}`}>
        <h2>Current Issues</h2>
        {!isLoading && data?.map((issue) => <Card key={issue.id} issue={issue} />)}
      </div>
    </>
  )
}

export default List
