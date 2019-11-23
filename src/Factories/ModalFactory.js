import Modal from '../Modal';
import React from 'react';
import PubSub from "pubsub-js";

export default class ModalFactory {

    setTitle(title){
        this._title = title;
        return this;
    }

    setDescription(description){
        if(typeof description === "String")
            this._description = new Array(description.split('\\n'));
        else
            this._description = description;

        return this;
    }

    addOption(name, event, classes, styles){
        if(typeof this._options === 'undefined') this._options = new Array();

        this._options.push(<button key={this._options.length + 1} className={"modal__options__option " + (classes || "")} onClick={(ev) => {event(ev); PubSub.publish("CloseModal");}} style={styles || {}}>{name}</button>);

        return this;
    }

    applyStyle(property, value){
        if(typeof this._style === 'undefined') this._style = new Array();

        this._style[property] = value;

        return this;
    }

    setMinWidth(minWidth){
        return this.applyStyle('minWidth', minWidth);
    }

    build(){
        const title = <h4>{this._title}</h4>;
        const description = this._description.map((p, i) => <p key={i}>{p}</p>);
        const options = this._options;
        return <Modal title={title} description={description} options={options} style={this._style}/>;
    }
}