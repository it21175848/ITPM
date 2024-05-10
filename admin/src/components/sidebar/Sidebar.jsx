import "./sidebar.css";
import {
  LineStyle,
  StoreMallDirectoryOutlined,
  People,
  MapOutlined,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userRedux"; // Assuming you have an action to logout the user
import LogoutIcon from '@mui/icons-material/Logout';

export default function Sidebar() {

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action to clear user authentication
    // Redirect the user to the login page or homepage
    window.location.href = "/login"; // Example: Redirect to login page
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Sales
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/shoplist" className="link">
              <li className="sidebarListItem">
                <StoreMallDirectoryOutlined className="sidebarIcon" />
                Shops
              </li>
            </Link>
            
            <Link to="/ownerlist" className="link">
              <li className="sidebarListItem">
                <People className="sidebarIcon" />
                Owners
              </li>
            </Link>
            <Link to="/parkings" className="link">
              <li className="sidebarListItem">
                <DirectionsCarIcon className="sidebarIcon" />
                Parkings
              </li>
            </Link>
            <Link to="/shoplist" className="link">
              <li className="sidebarListItem">
                <MapOutlined className="sidebarIcon" />
                Mall Maps
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            
            <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>

        <Button 
        style={{
              marginTop: "20px",
              width: "100%",
              backgroundColor: "#f50057",
              color: "white",
              fontWeight: "bold",
            }}
        className="logoutButton" startIcon={<LogoutIcon />} onClick={handleLogout}>Logout</Button> {/* Apply CSS class to Button component */}

      </div>
    </div>
  );
}

