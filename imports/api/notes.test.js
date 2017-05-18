import {Meteor} from 'meteor/meteor';
import expect from 'expect';

import {Notes} from './notes';

if (Meteor.isServer) {
  describe('notes', function (){
    const noteOne ={
      _id: 'testNoteid1',
      title:'Test1',
      body: 'Body test 1',
      updatedAt: 0,
      userId : 'testUserid1'
    };
    const noteTwo ={
      _id: 'testNoteid2',
      title:'Test2',
      body: 'Body test 2',
      updatedAt: 0,
      userId : 'testUserid2'
    };

    beforeEach(function(){
      Notes.remove({});
      Notes.insert(noteOne);
      Notes.insert(noteTwo);
    });

    it('should insert new note', function(){
      const userId= 'testid';
      const _id = Meteor.server.method_handlers['notes.insert'].apply({userId});
      expect(Notes.findOne({_id, userId})).toExist();
    });

    it('should not insert note if not authenticated', function(){
      expect(()=>{
        Meteor.server.method_handlers['notes.insert']();
      }).toThrow();
    });

    it('should remove note', function(){
      Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId}, [noteOne._id]);
      expect(Notes.findOne({_id: noteOne._id})).toNotExist()
    });

    it('should not remove note if not authenticated', function(){
      expect(()=>{
        Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);
      }).toThrow();
    });

    it('should not remove note if invalid _id', function(){
      expect(()=>{
        Meteor.server.method_handlers['notes.remove'].apply({userId:noteOne.userId});
      }).toThrow();
    });

    it('should update note', function(){
      const title = 'Update title';
      Meteor.server.method_handlers['notes.update'].apply({userId: noteOne.userId}, [noteOne._id, {title}]);
      const note = Notes.findOne(noteOne._id);
      expect(note.updatedAt).toBeGreaterThan(0);
      expect(note).toInclude({
        title,
        body: noteOne.body
      })
    });

    it('should throw error if extra updates', function(){
      expect(()=>{
        Meteor.server.method_handlers['notes.update'].apply({userId: noteOne.userId}, [noteOne._id, {name:'Benoit'}]);
      }).toThrow();
    });

    it('should not update note if user was not creator', function (){
      const title = 'Update title';
      Meteor.server.method_handlers['notes.update'].apply({userId: 'testId'}, [noteOne._id, {title}]);
      const note = Notes.findOne(noteOne._id);
      expect(note).toInclude(noteOne)
    });
    it('should not update note if not authenticated', function(){
      expect(()=>{
        Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id]);
      }).toThrow();
    });

    it('should not update note if invalid _id', function(){
      expect(()=>{
        Meteor.server.method_handlers['notes.update'].apply({userId:noteOne.userId});
      }).toThrow();
    });

    it('should return a user note', function(){
      const res =Meteor.server.publish_handlers.notes.apply({userId: noteOne.userId});
      const notes = res.fetch();

      expect(notes.length).toBe(1);
      expect(notes[0]).toEqual(noteOne);
    });
    it('should return zero notes', function(){
      const res =Meteor.server.publish_handlers.notes.apply({userId: 'testuser'});
      const notes = res.fetch();

      expect(notes.length).toBe(0);
    });
  });
}
