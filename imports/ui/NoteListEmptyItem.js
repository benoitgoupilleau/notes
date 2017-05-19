import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

export default NoteListEmptyItem = (props)=>{
  return (
    <div>
      <h5>No existing notes</h5>
      <p>Create a note to get started</p>
    </div>
  )
};
