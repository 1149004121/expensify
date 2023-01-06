import ConfirmModal from '../../components/ConfirmModal';
import React from 'react';
import { shallow } from 'enzyme';

let deleteItem, reserveItem;

beforeEach(() => {
  deleteItem = jest.fn();
  reserveItem = jest.fn();
})

test('should hide ConfirmModal', () => {
  const wrapper = shallow(<ConfirmModal
    deleteItem={deleteItem}
    reserveItem={reserveItem}
    option={undefined}
  />);
  expect(wrapper).toMatchSnapshot();
});

test('should show ConfirmModal', () => {
  const wrapper = shallow(<ConfirmModal
    deleteItem={deleteItem}
    reserveItem={reserveItem}
    option={true}
  />);
  expect(wrapper).toMatchSnapshot();
});



