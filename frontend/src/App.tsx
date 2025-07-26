import "./App.css";
import { Chat } from "./pages/chat/chat";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { Login } from "./pages/login";
import { AuthProvider } from "./context/AuthContext";
import { Selection } from "./pages/selection";
import { Records } from "./pages/records";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="w-full h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          <AuthProvider>
            <Routes>
              <Route path="/chat" element={<Chat />} />
              <Route path="/" element={<Login />} />
              <Route path="/selection" element={<Selection />} />
              <Route path="/dashboard" element={<div>Dashboard</div>} />
              <Route path="/records" element={<Records />} />
            </Routes>
          </AuthProvider>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
