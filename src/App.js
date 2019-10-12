import React from 'react';
import './App.scss';
import SideNavigation from "./SideNavigation";
import NoteMain from "./NoteMain";
import Modal from "./Modal";
import {library} from '@fortawesome/fontawesome-svg-core';
import {faEdit, faEllipsisH, faFileAlt, faGlasses} from '@fortawesome/free-solid-svg-icons';

library.add(faFileAlt);
library.add(faEllipsisH);
library.add(faGlasses);
library.add(faEdit);

function App() {
  return (
    <div className="App">
        <SideNavigation/>
        <NoteMain/>
        <Modal/>
    </div>
  );
}

export default App;
