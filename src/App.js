import React, { Component } from 'react';
import './App.css';

import Calendar from './Components/Calendar/';
import Modal from './Components/Modal/Modal';


const style = {
  position: 'relative',
  margin: '50px auto'
}

class App extends Component {
  
  state = {
    show: false
  }
  showModal=() => {
    this.setState({
      ...this.state,
      show: !this.state.show
    });
  }

  render() {
    return (
      <div className="App">
      <input type='button'
        onClick={this.showModal}
        value='Show Modal'/>
        
        <Modal
          onClose={this.showModal}
          show={this.state.show}>
        </Modal>

        <Calendar style = {style} width = '302px'/>
        
      </div>
    );
  }
}

export default App;
