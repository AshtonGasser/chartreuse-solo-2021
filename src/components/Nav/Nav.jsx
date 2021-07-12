import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {useSelector} from 'react-redux';
//import ingredient from '../../redux/reducers/ingredient.reducer';
import Ingredients from "../Ingredients/Ingredients"

function Nav() {
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Dashboard';
  }

  return (
    <div className="nav">
      <Link to="/home">
        <h3 className="nav-title">_Chartreuse</h3>
      </Link>
      <div>
        <Link className="navLink" to={loginLinkData.path}>
          {loginLinkData.text}
        </Link>
        <Link to="/allcocktails" className="navLink">
          All
        </Link>
        <Link to="/cocktails" className="navLink">
          Create Cocktail
        </Link>
        <Link to="/ingredients" className="navLink">
          Ingredients
        </Link>
        <Link className="navLink" to="/about">
          About
        </Link>
        {user.id && (
          <>
            <Link className="navLink" to="/info">
              Info 
            </Link>
            <LogOutButton className="navLink" />
          </>
        )}

       
        
      </div>
    </div>
  );
}

export default Nav;
