import React, { Component } from 'react';
import './App.css';
import MsgList from './components/MsgList';

import PageVisibility from 'react-page-visibility';

import { connect } from 'react-redux';


class App extends Component{
	state = {
		visibility: true,
    };

    handleVisibilityChange = isVisible => {
		this.setState({ visibility: isVisible });
		console.log('isvisible app.js', isVisible)

		// this.props.toggleVisibility(isVisible)
	}
	render() {
		return (
			<div className="App">
			<PageVisibility onChange={this.handleVisibilityChange}>
				<MsgList visibility={this.state.visibility}/>
				{/* <MsgList/> */}
			</PageVisibility>
			
			</div>
		  );
	}

}

// const mapStateToProps = (state) => {
// 	// console.log('state', state)
// 	return {
// 		visibility: state.visibility
// 	}
// }

// const mapDispatchToProps = (dispatch) => {
// 	console.log('widocznosc zmieniona')
// 	return {
// 		toggleVisibility: (visibility) => { dispatch({type: 'TOGGLE_VISIBILITY', visibility: visibility}) },

// 	}
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default App;
