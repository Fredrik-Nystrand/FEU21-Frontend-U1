import { useEffect } from "react"
import Card from "../Card/Card"
import styles from "./List.module.css"
import { useGetIssuesQuery } from "../../features/api/apiSlice"

const List = () => {
  const { data, error, isError, isLoading } = useGetIssuesQuery()

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <p>{error.error}</p>}
      <div className={`${styles.wrapper}`}>
        <h2>Current Issues</h2>
        {!isLoading && data?.map((issue) => <Card key={issue.id} issue={issue} />)}
      </div>
    </>
  )
}

export default List
