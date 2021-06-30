import React from 'react';
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import Button from '@material-ui/core/Button';
function UserDashboard() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const history = useHistory();
  const user = useSelector((store) => store.user);
  
  const handleNav = (ingredients) => {
    switch(history.push){
      case "/ingredients" :
      return history.push("/ingredients")
      case "create cocktail":
        return history.push('/cocktails')
        default:
          return history.push("/")
    }
  };
  return (
    <>
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
    </div>
  {/* <button onClick = {handleNav}>ingredients</button> */}
  <div>

  </div>
  </>
  );
}

// this allows us to use <App /> in index.js
export default UserDashboard

