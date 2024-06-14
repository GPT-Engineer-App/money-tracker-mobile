import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import TodoList from "./pages/TodoList.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route path="/todolist" element={<TodoList />} />
      </Routes>
    </Router>
  );
}

export default App;
