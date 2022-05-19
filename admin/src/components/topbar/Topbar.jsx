import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import {logout} from "../../redux/apiCalls";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import {GetMere} from "../../web3/web3Init";

export default function Topbar() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch({
      type: 'USER_LOGOUT'
    });
    logout(dispatch);
  }

  const prod = () => {
    console.log("waiting...");
    GetMere().then((msg) =>{
      console.log("here");
      console.log(msg);
    });
  }


  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">webshop admin</span>
          <Button onClick={prod}>Whatever</Button>
        </div>
        <div className="topRight">
          {/*<div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>*/}
          <Link to={"/"}>
            <Button onClick={handleLogout}>
              Log out
            </Button>
          </Link>

         {/* <div>
            <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
          </div>*/}

        </div>
      </div>
    </div>
  );
}
