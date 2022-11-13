import React from "react"
import styles from "./Dropdown.module.css"

const Dropdown = ({ visible, options, selected, className }) => {
  let uId = 0

  return (
    <>
      {visible && (
        <div className={`${className} ${styles.wrapper}`}>
          {options?.map((option) => (
            <div className={`${styles.option}`} key={uId++} onClick={() => selected(option)}>
              {option}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Dropdown
