// AdminLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import {Dialog} from "primereact/dialog"
import {Button} from "primereact/button"

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);

    if (username === "ccclub" && password === "ccclub@2024") {
        navigate("/admin-dashboard");
    } else {
      if (username !== "ccclub") {
        setErrorMessage("OOPS !!!, Username is wrong Try Again");
      } else if (password !== "ccclub@2024") {
        setErrorMessage("OOPS !!!, Password is wrong Try Again");
      }
      setDialogVisible(true);  // Show the dialog if credentials are wrong
    }
  };

  const handleClose = () => {
    setDialogVisible(false);
  };

  return (
    <>
      <Header />
      <Sidebar visible={visible} position="right" onHide={() => setVisible(false)}>
        <div className="flex flex-col gap-7 items-center">
          <Link to="/" onClick={() => setVisible(false)}>Home</Link>
          <Link to="/events" onClick={() => setVisible(false)}>Events</Link>
          <Link to="/execom" onClick={() => setVisible(false)}>Execom</Link>
          <Link to="/contacts" onClick={() => setVisible(false)}>Contact</Link>
        </div>
      </Sidebar>

      <Dialog
        header="Error"
        visible={dialogVisible}
        style={{ width: '50vw' }}
        onHide={handleClose}
        footer={
          <Button label="Close" icon="pi pi-times" onClick={handleClose} />
        }
      >
        <p>{errorMessage}</p>
      </Dialog>


      {/* Gradient background container */}
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-500 to-white">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 w-full"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
