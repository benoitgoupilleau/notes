import React from 'react';
import {Accounts} from 'meteor/accounts-base';
import PropTypes from 'prop-types';
import {createContainer} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';

export const PrivateHeader =(props)=>{
  const navImageSrc = props.isNavOpen ? '/images/x.svg' : '/images/bars.svg';
  return(
    <div className="title-bar">
      <div className="title-bar__content">
        <img className="header__nav-toggle" src={navImageSrc} onClick={props.handleNavToggle}/>
        <h1 className="title-bar__title">{props.title}</h1>
        <button onClick={()=>props.handleLogout()} className="button button--link-text">Logout</button>
      </div>
    </div>
  )
};

/***** Arguments *****/
PrivateHeader.propTypes={
  title:PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleNavToggle: PropTypes.func.isRequired,
  isNavOpen: PropTypes.bool.isRequired
};

export default createContainer(()=>{
  return {
    handleLogout: ()=> Accounts.logout(),
    handleNavToggle: ()=>Session.set('isNavOpen', !Session.get('isNavOpen')),
    isNavOpen: Session.get('isNavOpen')
  }
}, PrivateHeader)
