import React from 'react';
import './App.scss';
import SideNavigation from "./SideNavigation";
import NoteEditor from "./NoteEditor";
import {library} from '@fortawesome/fontawesome-svg-core';
import {faEllipsisH, faFileAlt, faGlasses} from '@fortawesome/free-solid-svg-icons';

library.add(faFileAlt);
library.add(faEllipsisH);
library.add(faGlasses);

function App() {
  return (
    <div className="App">
        <SideNavigation/>
        <NoteEditor/>
    </div>
  );
}

export default App;
