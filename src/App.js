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

  onDayClick = (e, day) => {
    return(
      <div key = {day}>
      <a href ='#' onClick={(e)=> (this.showModal(e, day))}>
        {day}
      </a>
    </div>
    );
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


        <Calendar style = {style} width = '302px'
          onDayClick={(e, day) => this.onDayClick(e, day)}/>
        
      </div>
    );
  }
}

export default App;
