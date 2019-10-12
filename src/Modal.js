import React from "react";
import "./scss/Modal.scss";

function Modal() {
    return(
        <div className="modal" role="dialog">
            <div className="modal__header">
                <h4>Title of the modal</h4>
            </div>
            <div className="modal__body">
                <p>Basic description lorem ipsum description lorem ipsum description lorem ipsum description lorem ipsum</p>
            </div>
            <div className="modal__options">
                <button className="modal__options__option modal__options__option--block">Ok</button>
            </div>
        </div>
    );
}

export default Modal;