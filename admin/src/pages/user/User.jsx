import {
  CalendarToday, Check, Clear, FilterNone, FilterNoneSharp,
  LocationSearching,
  MailOutline, MicNone,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import {Link, useLocation} from "react-router-dom";
import "./user.css";
import {useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import app from "../../firebase";
import {addProduct, updateProduct} from "../../redux/apiCalls";

export default function User() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);

  const user = useSelector((state) =>
      state.user.users.find((user) => user._id === userId)
  );

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleUpdate = function () {


  }

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
       {/* <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>*/}
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
           {/* <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="userShowImg"
            />*/}
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.firstName} {user.lastName}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">Username: {user.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">Joined at: {user.createdAt}</span>
            </div>
            <div className="userShowInfo">
              {user.isAdmin ? (
                  <Check className="userShowIcon" />
              ) : (
                  <Clear className="userShowIcon" />
              )}
              <span className="userShowInfoTitle">Is admin: {user.isAdmin ? "yes" : "no"}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            {/*<div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+1 123 456 67</span>
            </div>*/}
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
          {/*  <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">New York | USA</span>
            </div>*/}
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={user.username}
                  defaultValue={user.username}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder={user.firstName}
                  defaultValue={user.firstName}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Last Name</label>
                <input
                    type="text"
                    placeholder={user.lastName}
                    defaultValue={user.lastName}
                    className="userUpdateInput"
                    onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={user.email}
                  defaultValue={user.email}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Is admin</label>
                <select onChange={handleChange}>
                  <option value={true} selected={user.isAdmin}>yes</option>
                  <option value={false} selected={!user.isAdmin}>no</option>
                </select>
              </div>
            </div>
            <div className="userUpdateRight">
             {/* <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>*/}

            </div>
          </form>

        </div>
      </div>
      <div className="userUpdateButtonContainer">
        <button className="userUpdateButton" onClick={handleUpdate}>Update</button>
      </div>

    </div>
  );
}
