import React from 'react';
import './App.scss';
import SideNavigation from "./SideNavigation";
import NoteMain from "./NoteMain";
import {library} from '@fortawesome/fontawesome-svg-core';
import {faEdit, faEllipsisH, faFileAlt, faGlasses} from '@fortawesome/free-solid-svg-icons';
import ModalManager from "./ModalManager";

library.add(faFileAlt);
library.add(faEllipsisH);
library.add(faGlasses);
library.add(faEdit);

function App() {

  return (
    <div className="App">
        <SideNavigation/>
        <NoteMain/>
        <ModalManager/>
    </div>
  );
}

export default App;
