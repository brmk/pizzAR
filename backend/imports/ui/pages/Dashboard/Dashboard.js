import React from 'react';
import { PropTypes } from 'prop-types';
import {FlowRouter} from "meteor/kadira:flow-router"

const Dashboard = props => {

  const {handleLogout, users, loading, handleCall} = props;

  if(loading){
    return <div className="text-center"><h3>Loading...</h3></div>
  }

  return(
    <div className="container">
    	<div className="row">
        <div className="text-right">
          <button className="btn" onClick={handleLogout}>Logout</button>
        </div>
        <ul className="list-group">
          {users.map((user)=>{
            return (
              <li className="list-group-item online-user" key={user._id} onClick={()=>{handleCall(user._id)}}>
                <span>{user.profile.firstName} {user.profile.lastName}</span>
              </li>
            )
          })}
        </ul>
    	</div>
    </div>
  )
}

export default Dashboard;