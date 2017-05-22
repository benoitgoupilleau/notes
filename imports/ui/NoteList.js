import React from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import {Session} from 'meteor/session';

import {Notes} from '../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';

export class NoteList extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      search:''
    }
  }
  displayEmptyOrSearch(){
    if(this.props.notes.length===0){
      return <NoteListEmptyItem/>
    }else{
      return (
        <div className="item-list__search">
          <input className="item-list__searchtext" onChange={this.handleSearch.bind(this)} value={this.state.search} placeholder="Search notes"/>
        </div>)
    }
  }
  handleSearch(e){
    const search = e.target.value;
    this.setState({search})
  }
  render(){
    return (
    <div className="item-list">
      <NoteListHeader/>
      {this.displayEmptyOrSearch()}
      {this.props.notes.map((note)=>{
        if (note.title.toLowerCase().includes(this.state.search.toLowerCase()) || note.body.toLowerCase().includes(this.state.search.toLowerCase())) {
          return <NoteListItem key={note._id} note={note}/>
        }
        })}
    </div>
  )}
};

NoteList.propTypes ={
  notes: PropTypes.array.isRequired
};

export default createContainer(()=>{
  const selectedNoteId = Session.get('selectedNoteId')
  Meteor.subscribe('notes');
  return{
    notes: Notes.find({}, {sort: {updatedAt:-1}}).fetch().map((note)=>{
      return {
        ...note,
        selected: note._id=== selectedNoteId
      }
    })
  }
}, NoteList);
