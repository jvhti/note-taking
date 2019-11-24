import React from 'react';
import {connect} from "react-redux";
import {closeModal} from "./Actions";

class ModalManager extends React.Component{
    isModalOpen(){
        return !(this.props.modal === null);
    }

    closeModal(){
        if(!this.isModalOpen()) return;

        this.props.closeModalDispatcher();
    }

    render(){
        if(!this.isModalOpen()) return null;

        return this.props.modal;
    }
}

const mapStateToProps = (state) => {
    return {
        modal: state.modal
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeModalDispatcher: (modal) => dispatch(closeModal(modal))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalManager);