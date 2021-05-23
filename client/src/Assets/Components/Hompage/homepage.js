import React, {Component, useEffect, useState} from 'react';
import MenuAppBar from '../Navbar/navbar';
import LandingPage from '../LandingPage/landingpage';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import SignIn from '../SignIn/signin';
import SignUp from '../SignIn/signup';
import UpdateDetails from "../UpdateDetails/updateDetails";
import RequestResources from "../RequestResources/requestresource";
import isAuthorised from "../../Functions/functions";
import Profile from "../RequestResources/profile";


export default function HomePage(){

    const [userLogged,setUserLogged] = useState(null);
    const [Loading,update_loading] = useState(false);

    const updateUser = (user)=>{
       // alert(user.role)
      setUserLogged(user);
    }

    useEffect(()=>{
        update_loading(true);
        if(!userLogged )isAuthorised().then((user)=>{
          setUserLogged(user);
          update_loading (false);
        })
        else{update_loading(false);}
        
    },[userLogged])

  
    
    return(Loading?<div>Loading ...</div>:
        <div>
           
            
            <Router>
            <MenuAppBar updateUserFun = {updateUser} userLogged = {userLogged}></MenuAppBar>
                <Switch>

                    <Route
                        path='/signIn'
                        render={(props) => (
                        <SignIn updateUserFun = {updateUser} userLogged = {userLogged}  {...props}/>
                        )}
                    />
                    <Route
                        path='/signUp'
                        render={(props) => (
                        <SignUp  updateUserFun = {updateUser} userLogged = {userLogged} {...props} />
                        )}
                    />
                     <Route
                        path='/updateDetails'
                        render={(props) => (
                        <UpdateDetails  userLogged = {userLogged}  {...props} />
                        )}
                    />
                    <Route
                        path='/requestResources'
                        render={(props) => (
                        <RequestResources   userLogged = {userLogged} {...props} />
                        )}
                    />
                    <Route
                        path='/profile'
                        render={(props) => (
                        <Profile   userLogged = {userLogged} {...props} />
                        )}
                    />
                     <Route
                        path='/'
                        render={(props) => (
                        <LandingPage   userLogged = {userLogged} {...props} />
                        )}
                    />
                </Switch>
            </Router>
            
        </div>
    )
}