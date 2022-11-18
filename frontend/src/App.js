import logo from "./logo.svg";
import "./App.css";
import NavigationBar from "./components/common/NavigationBar";
import Login from "./components/Login";
import ToastContextProvider from "./contexts/ToastContext";
import UserContextProvider from "./contexts/UserContext";
import Toast from "./components/common/Toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/DashBoard";

function App() {
  return (
    <UserContextProvider>
      <ToastContextProvider>
        <div className="App">
          {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
          {/* <Login /> */}
          <Router>
            <Routes>
              <Route>
                <Route exact path="/login" element={<Login />} />
                <Route path="/" element={<Dashboard />} />
              </Route>
            </Routes>
          </Router>
          <Toast />
        </div>
      </ToastContextProvider>
    </UserContextProvider>
  );
}

export default App;
