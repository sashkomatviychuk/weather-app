import React from 'react';
import Modal from 'react-responsive-modal';

import Button from 'components/buttons/Button';

export default function SelectCityModal(props) {
    return (
        <Modal open={props.isOpen} showCloseIcon={false} onClose={props.onClose}>
            <div className="modal-content">
                <h3>Add new city:</h3>
                <div className="row-fluid">
                    <form action="">
                        <div className="form-group">
                            <select
                                className="form-control"
                                id="sel1"
                                onChange={props.onCityChange}
                            >
                                {props.options}
                            </select>
                        </div>
                        <div className="form-group">
                            <Button
                                onClick={props.onCityAdd}
                                className="button button-submit"
                            >
                                Add
                            </Button>
                            <Button
                                onClick={props.onClose}
                                className="button button-cancel"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
}