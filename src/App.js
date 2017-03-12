import React, { Component } from 'react';
import { PostsContainer } from './components/postsContainer'
import { PostsContainerData } from './App';
import { MessageFormContainer } from './components/messageFormContainer';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <h1>sup?</h1>
          <PostsContainer />
          <MessageFormContainer />
      </div>
    );
  }
}

export default App;
