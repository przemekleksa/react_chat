import React, { Component } from "react";
import './PopUp.scss'
export default class PopUp extends Component {
	state = ({
		username: ''
	})
  handleClick = () => {
   this.props.toggle();
  };
  changeName = (event) => {
	//   console.log(event.target.value)
	localStorage.setItem('username', this.state.username)
  }
  myChangeHandler = (event) => {
	// console.log(event.target.value)
	this.setState({
		'username': event.target.value
	})
  }

render() {
  return (
   <div className="modal">
     <div className="modal_content">
		 <div className="container">
			<div><span></span><span className="close" onClick={this.handleClick} id='close'>&times;   </span></div>
			<p>Enter your username</p>
			<form onSubmit={this.changeName}>
				<input type="text" name='username' onChange={this.myChangeHandler}/>
				<input type='submit' value='Accept' className='submit'/>
			</form>
		 </div>
   
    </div>
   </div>
  );
 }
}