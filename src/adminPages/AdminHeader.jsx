import { Link } from "react-router-dom";
import Logo from "../assets/coding club dp copy 2.svg";


const AdminHeader = ({ setVisible }) => {

  
  
  return (
    <div className="header-container flex h-20 xl:h-28 items-center px-6 xl:px-14">
      <img src={Logo} className="h-full mr-auto" alt="logo"></img>
      <button className="sm:hidden" onClick={() => setVisible(true)}>
        <span className="pi pi-bars"></span>
      </button>
      <div className="hidden sm:flex text-xs md:gap-4 lg:text-base lg:gap-6 xl:gap-11">
        <Link to="/admin-dashboard" className="hover:underline underline-offset-4">
          Home
        </Link>
        <Link to="/admin-events" className="hover:underline underline-offset-4">
          Events
        </Link>

        <Link to="/admin-events" className="hover:underline underline-offset-4">
          NewsLetter
        </Link>

        <Link to="/execom" className="hover:underline underline-offset-4">
          Execom
        </Link>
        
        <Link to="/contacts" className="hover:underline underline-offset-4">
          Contact
        </Link>

        <Link to="/" className="hover:underline underline-offset-4">
          Home
        </Link>


      </div>
    </div>
  );
};

export default AdminHeader;
