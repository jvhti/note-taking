import React from 'react';
import './App.scss';
import SideNavigation from "./SideNavigation";
import NoteMain from "./NoteMain";
import {library} from '@fortawesome/fontawesome-svg-core';
import {faEdit, faEllipsisH, faFileAlt, faGlasses} from '@fortawesome/free-solid-svg-icons';
import ModalFactory from "./Factories/ModalFactory";
import ModalManager from "./ModalManager";
import PubSub from "pubsub-js";

library.add(faFileAlt);
library.add(faEllipsisH);
library.add(faGlasses);
library.add(faEdit);

function App() {

    const deleteModal = new ModalFactory()
        .setTitle("Deletion Confirmation")
        .setDescription(["Are you sure that you want to delete the 'NOTE TITLE' note?"])
        .addOption('Yes', () => {alert('Yes');}, 'modal__options__option--block')
        .addOption('No', () => {alert('No');}, 'modal__options__option--block')
        .build();

    setTimeout(() => {PubSub.publish('OpenModal', deleteModal);}, 1000);

  return (
    <div className="App">
        <SideNavigation/>
        <NoteMain/>
        <ModalManager/>
    </div>
  );
}

export default App;
