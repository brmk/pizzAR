import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Meteor } from 'meteor/meteor';

export default class ConfirmModal extends Component {
  componentDidMount() {
    $('#' + this.state.id).modal('show');
  }
  componentWillUnmount() {
    $('#' + this.state.id).modal('hide');
  }
  constructor(props) {
    super(props);
    this.state = {
      id: Meteor.uuid()
    }
  }
  onCancel() {

  }
  render() {
    const { onConfirm, onCancel = this.onCancel, title, text, confirmText = 'Yes', cancelText = 'No' } = this.props;
    const { id } = this.state;
    return (
      <div>
        <div id={id} className="modal">
            <div className="modal-header">
                <a href="#" onClick={onCancel} data-dismiss="modal" aria-hidden="true" className="close">×</a>
                 <h3>{title}</h3>
            </div>
            <div className="modal-body">
                <p>{text}</p>
            </div>
            <div className="modal-footer">
              <a href="#" onClick={onConfirm} className="btn danger">{confirmText}</a>
              <a href="#" data-dismiss="modal" onClick={onCancel} aria-hidden="true" className="btn secondary">{cancelText}</a>
            </div>
        </div>
      </div>
    );
  }
};

ConfirmModal.propTypes = {
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  title: PropTypes.string,
  text: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string
}
