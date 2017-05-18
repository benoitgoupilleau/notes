import React from 'react';
import {Accounts} from 'meteor/accounts-base';
import PropTypes from 'prop-types';
import {createContainer} from 'meteor/react-meteor-data';

export const PrivateHeader =(props)=>{
  return(
    <div className="title-bar">
      <div className="title-bar__content">
        <h1 className="title-bar__title">{props.title}</h1>
        <button onClick={()=>props.handleLogout()} className="button button--link-text">Logout</button>
      </div>
    </div>
  )
};

/***** Arguments *****/
PrivateHeader.propTypes={
  title:PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired
};

export default createContainer(()=>{
  return {
    handleLogout: ()=> Accounts.logout()
  }
}, PrivateHeader)
