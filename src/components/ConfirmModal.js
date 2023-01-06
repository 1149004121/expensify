import React from 'react';
import Modal from 'react-modal';

export default class ConfirmModal extends React.Component {
  render() {
    return (
      <Modal
        isOpen={!!this.props.option}
        className="modal">
        <h3>Are you sure you want to delete?</h3>
        <div className='choices'>
          <button onClick={this.props.deleteItem} className="confirm">Yes</button>
          <button onClick={this.props.reserveItem} className="reserve">No</button>
        </div>
      </Modal>
    )
  }
}