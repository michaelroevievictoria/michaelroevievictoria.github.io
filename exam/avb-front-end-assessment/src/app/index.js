import React from "react";

import "app/App.css";
import logo from "app/logo.svg";
import Header from "components/Header";
import CommentModal from "components/CommentModal";
import CommentList from 'components/CommentList';
import TopCommenters from 'components/TopCommenters';

function App() {
  return (
    <>
      <Header />
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <TopCommenters />  {/*Render TopCommenters component */}
      <CommentModal />

      <CommentList /> {/* Render CommentList component */}

    </>
  );
}

export default App;
