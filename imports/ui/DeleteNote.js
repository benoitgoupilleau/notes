import React from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import Modal from 'react-modal';
import {browserHistory} from 'react-router';
import PropTypes from 'prop-types';


export class DeleteNote extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isOpen: false,
      error: ''
    }
  }
  handleRemoval(){
    this.props.call('notes.remove', this.props.noteId);
    this.props.browserHistory.push('/dashboard');
    this.handleModalClose();
  }
  handleModalClose(){
    this.setState({
      isOpen: false,
      error:''
    });
  }
  render(){
    return (
      <div>
        <button className="button button--secondary" onClick={()=>this.setState({isOpen: true})}>Delete</button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Delete note"
          onAfterOpen={()=>this.refs.cancel.focus()}
          onRequestClose={this.handleModalClose.bind(this)}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal">
          <h3 className="boxed-view--modal__title">Are you sure you want to delete this note?</h3>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <div className="">
            <button className="button button--secondary boxed-view--modal__button" onClick={this.handleRemoval.bind(this)}>Delete</button>
            <button ref="cancel" type="button" className="button" onClick={this.handleModalClose.bind(this)}>Cancel</button>
          </div>
        </Modal>
      </div>
    )
  }
}

DeleteNote.propTypes={
  noteId: PropTypes.string.isRequired,
  call: PropTypes.func,
  browserHistory: PropTypes.object
}

export default createContainer(()=>{
  return {
    call: Meteor.call,
    browserHistory
  }
}, DeleteNote)
