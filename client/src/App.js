import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import TodoList from "./components/TodoList";
import AuthForm from "./components/AuthForm";

const App = () => {
  const { authData, logout } = useAuth();

  return (
    <div className="app">
      <header>
        <nav>
          <Link to="/">Home</Link>
          {authData.token ? (
            <>
              <Link to="/todos">Todos</Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/login" element={<AuthForm isLogin={true} />} />
          <Route path="/register" element={<AuthForm isLogin={false} />} />
          <Route path="/todos" element={<TodoList />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
