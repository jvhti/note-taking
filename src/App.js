import React from 'react';
import './App.scss';
import SideNavigation from "./SideNavigation";
import NoteEditor from "./NoteEditor";
import {library} from '@fortawesome/fontawesome-svg-core';
import {faEllipsisH, faFileAlt} from '@fortawesome/free-solid-svg-icons';

library.add(faFileAlt);
library.add(faEllipsisH);

function App() {
  return (
    <div className="App">
        <SideNavigation/>
        <NoteEditor/>
    </div>
  );
}

export default App;
