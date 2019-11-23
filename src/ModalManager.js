import React from 'react';
import PubSub from "pubsub-js";

export default class ModalManager extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            modal: null
        };
    }

    isModalOpen(){
        return !(this.state.modal === null);
    }

    closeModal(){
        if(!this.isModalOpen()) return;

        this.setState({...this.state, modal: null});
    }

    openModal(modal){
        this.setState({...this.state, modal});
        this.forceUpdate();
    }

    componentDidMount(){
        this.openModalSubscription = PubSub.subscribe("OpenModal", (message, modal) => {
            if(message !== "OpenModal") return;

            this.openModal(modal);
        });
        this.closeModalSubscription = PubSub.subscribe("CloseModal", (message, modal) => {
            if(message !== "CloseModal") return;

            this.closeModal();
        });
    }

    componentWillUnmount() {
        if(this.openModalSubscription)
            PubSub.unsubscribe(this.openModalSubscription);

        if(this.closeModalSubscription)
            PubSub.unsubscribe(this.closeModalSubscription);
    }

    render(){
        if(!this.isModalOpen()) return null;

        return this.state.modal;
    }
}
