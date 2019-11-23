import React from 'react';
import './App.scss';
import SideNavigation from "./SideNavigation";
import NoteMain from "./NoteMain";
import {library} from '@fortawesome/fontawesome-svg-core';
import {faEdit, faEllipsisH, faFileAlt, faGlasses} from '@fortawesome/free-solid-svg-icons';
import ModalManager from "./ModalManager";
import {Provider} from "react-redux";
import Store from "./Store";

library.add(faFileAlt);
library.add(faEllipsisH);
library.add(faGlasses);
library.add(faEdit);

function App() {

  return (
      <Provider store={Store}>
        <div className="App">
            <SideNavigation/>
            <NoteMain/>
            <ModalManager/>
        </div>
      </Provider>
  );
}

export default App;
