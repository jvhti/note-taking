import React from "react";
import "./scss/Modal.scss";

function Modal({ title, description, options, style }) {
    return(
        <div className="modal" role="dialog" style={style}>
            <div className="modal__header">{title}</div>
            <div className="modal__body">{description}</div>
            <div className="modal__options">{options}</div>
        </div>
    );
}

export default Modal;