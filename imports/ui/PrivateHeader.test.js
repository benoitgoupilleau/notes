import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';

import {PrivateHeader} from './PrivateHeader';

if (Meteor.isClient) {
  describe('PrivateHeader', function(){
    it('should set button text to logout', function(){
      const wrapper = mount(<PrivateHeader title="Test title" handleLogout={()=>{}}/>);

      const buttonText = wrapper.find('button').text();
      expect(buttonText).toBe('Logout');
    });

    it('should use title provided', function(){
      const wrapper = mount(<PrivateHeader title="Test title" handleLogout={()=>{}}/>);
      const tittleText = wrapper.find('h1').text();
      expect(tittleText).toBe('Test title');
    });

    it('should call handleLogout on click', function(){
      const spy= expect.createSpy();
      const wrapper = mount(<PrivateHeader title="Title" handleLogout={spy}/>);

      wrapper.find('button').simulate('click');
      expect(spy).toHaveBeenCalled();
    });
  });
}
