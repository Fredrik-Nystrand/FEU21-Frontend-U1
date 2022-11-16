import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { Header } from "./Components/Header/Header"
import IssuesView from "./Views/IssuesView/IssuesView"
import SingleIssueView from "./Views/SingleIssueView/SingleIssueView"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<IssuesView />} />
          <Route path="/issue/:id" element={<SingleIssueView />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
