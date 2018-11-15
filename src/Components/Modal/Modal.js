import React from 'react';
import ReactDOM from 'react-dom';

// gray background
const backdropStyle = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 50
    
}

const modalStyle = {
    backgroundColor: '#fff',
    borderRadius: 5,
    maxWidth: 500,
    minHeight: 300,
    margin: '0 auto',
    padding: 30,
    position: 'relative'
};

const footerStyle = {
    position: 'absolute',
    bottom: 20
};

const secondfooterStyle = {
  position: 'absolute',
  bottom : 1,
  left: 450

}


const modalRoot = document.getElementById('modal-root');

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }

    handleSubmit(event) {
      alert('Text field value is: ' + this.state.value);
    }
  
    onClose = (e) => { //close component by using 'stopPropagation'
        e.stopPropagation ();
        this.props.onClose && this.props.onClose(e);
    }

    onKeyUp = (e) => { // Lookout for ESC key (27) and Enter key (13)
        if (e.which === 27 && 13 && this.props.show) {
            this.onClose(e);
        }
    }

    componentDidMount() {
        document.addEventListener('keyup', this.onKeyUp);
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        document.removeEventListener('keyup', this.onKeyUp);
        modalRoot.removeChild(this.el);
    }

    onSave = (e) => { //same as onClose method
       e.stopPropagation ();
        this.props.onClose && this.props.onClose(e);
    }

    render() {
        var modalUI = (
            <div style={backdropStyle}>
                <div style={modalStyle}>
                <tr className ='modal.header' position crelative ></tr>
                  <td colSpan='10'>
                    Enter Your Event
                  </td>
                  
                    <input 
                      type='text'
                      value={this.state.value} 
                      onChange={this.handleChange} />
                    
                  
                    {this.props.children}
                    <div style={footerStyle}>
                        <button onClick={(e) => { this.onClose(e)}}> 
                            Close
                        </button>
                        <div style={secondfooterStyle}>
                        <button onClick={(e) => { this.onSave(e)}}>
                            Save
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        );
        if (!this.props.show) {
            return null;
        }
        return ReactDOM.createPortal ( //portal method to do our popup in front of calendar
            modalUI,
            this.el,
        );
    }
}