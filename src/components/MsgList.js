import React, { Component } from 'react'
import ReconnectingWebSocket from 'reconnecting-websocket';
import PageVisibility from 'react-page-visibility';

import './MsgList.scss'
import PopUp from './PopUp';
import { connect } from 'react-redux';

const client = new ReconnectingWebSocket('ws://st-chat.shas.tel')
let messages

export class MsgList extends Component {
	
	// state = ({
	// 	// msgNum: 0,
	// 	seen: false,
	// 	// username: localStorage.getItem('username'),
	// })

	
	componentDidMount() {
		console.log(localStorage.getItem('username'))
		console.log(this.props)
		if(this.props.username === null) {
			this.props.setUsername('Guest')
		}

		// if (localStorage.getItem('username') === null){
		// 	localStorage.setItem('username', 'Guest')
		// 	this.setState({
		// 		username: localStorage.getItem('username'),
		// 	})
		// }
		// console.log(localStorage.getItem('username'))
		client.onopen = () => {
			console.log('websocket client connected')
		}

		
		client.addEventListener('message', function(event){
			let mgs = document.getElementById('m')
			mgs.innerHTML = JSON.parse(event.data).map((m, i) => {
				let date = new Date(m.time),
				hours = date.getHours(),
				minutes = date.getMinutes()
				if (hours < 10) {hours = '0' + hours}
				if (minutes < 10) {minutes = '0' + minutes}
				return `<p class='ms'><span id='msg'>${m.message}</span></p><p><span>${m.from}</span> <span id='time'>${hours}:${minutes}</span> </p>`
			}).join('') + mgs.innerHTML
			messages = JSON.parse(event.data)
			// this.props.addMessages(messages)
			// console.log(messages)
		})
		
		setTimeout(() => {
			this.setState({
				// msgNum: document.getElementsByClassName('ms').length,
				msgs: messages
			})
			// this.setState({
			// 	// msgNum: document.getElementsByClassName('ms').length,
			// 	msgs: messages
			// })
			// console.log(messages.length)
			// this.props.addMessages(messages)
			console.log(messages)
			this.props.addMessages(messages)
		},1000)
		// this.event()
		
		client.onclose = (e) => {
			console.log('websocket client disconnected', e.code, e.reason)
		}
		if(this.props.username === null) {
			this.props.wasSeen(true)
		}
		// console.log('msglist visibility',this.props.visibility)
		// console.log(this.props.msgNum)
	}

	componentDidUpdate(prevProps) {
		if(this.props.visibility) {
			document.title = 'React Chat App';
		}
		
		console.log('msglist componentDidUpdate visibility',this.props.visibility)
		// setTimeout(() => {
		// 	let prevId
		// 	console.log(this.props.visibility, messages[0].id, prevId)
		// 	// console.log(this.state)
		// 	if(this.props.msgs === undefined) {
		// 		prevId = {id: 0}
		// 	} else {
		// 		prevId = this.props.msgs[0].id
		// 	}
		// 	console.log(prevId)
		// 	if(messages[0] === undefined) {
		// 		messages[0] = {id: 0}
		// 	}
		// 	// if(messages[0].id !== prevId) {
		// 	// 	console.log(messages[0].id, prevId, this.props.msgs)
		// 	// 	// let newTitle = 'New messages';
		// 	// 	console.log(this.props.msgs)
		// 	// 	if(!this.props.visibility) {
		// 	// 		document.title = 'New message';
		// 	// 	} 
		// 	// }	
		// 	// if(this.props.oldMsgs[1].id !== prevId && this.props.msgs.length === 1) {
		// 	// 	console.log(messages[0].id, prevId, this.props.msgs)
		// 	// 	// let newTitle = 'New messages';
		// 	// 	console.log(this.props.msgs)
		// 	// 	if(!this.props.visibility) {
		// 	// 		document.title = 'New message';
		// 	// 	} 
		// 	// }	
		// 	// this.setState({
		// 	// 	// msgNum: document.getElementsByClassName('ms').length,
		// 	// 	msgs: messages
		// 	// })

		// 	this.props.addMessages(messages)
		// },1000)
		setTimeout(() => {
			let prevId
			if(this.state.msgs === undefined) {
				prevId = {id: 0}
			} else {
				if(this.state.msgs[0] !== undefined)
				prevId = this.state.msgs[0].id
			}
			if(messages[0] === undefined) {
				messages[0] = {id: 0}
			}
			if(messages[0].id !== prevId) {
				console.log(messages[0].id, prevId)
				// let newTitle = 'New messages';
				if(!this.props.visibility) {
					document.title = 'New messages';
				} 
				
				
				
				// setInterval(() => {
				// 	document.title = 'messages';
				// },500)
				
			}
			// console.log(this.props.visibility)
			this.setState({
				// msgNum: document.getElementsByClassName('ms').length,
				msgs: messages
			})
			// console.log(messages.length)
			
		},1000)
		
		// setInterval(() => {
		// 	console.log(this.props.visibility)
		// },300)
	}

	updateState(){
		// this.setState({
		// 	msgNum: 1000
		// })
	}
	
	onButtonClicked = (event) => {
		event.preventDefault();
		console.log(this.props)
		client.send(JSON.stringify({
			from: this.props.username,
			// message: 1
			message: this.props.message
		}))
		document.getElementById('form').reset()
		// this.changeTitle()
		this.props.addMessage('')
	}
	// changeTitle() {
	// 	let title = document.title
	// 	let newTitle = 'you have new messages';
	// 	document.title = newTitle;
	// }
	myChangeHandler = (event) => {
		// console.log(event.target.name)
		let nam = event.target.name;
		let val = event.target.value;
		// this.setState({[nam]: val});
		this.props.addMessage(val)
		// this.props.addMessage({
		// 	from: this.props.username,
		// 	message: val,
		// 	time: new Date('January 1, 1970'),
		// 	id: 345
		// })
		
  	}

	togglePop = () => {
		// this.setState({
		//  seen: !this.props.seen,
		// });
		// console.log(this.props.seen)
		this.props.wasSeen(!this.props.seen)
	   };

	render() {
		
		return (
			<div>
			<PageVisibility onChange={this.handleVisibilityChange}>
               
            </PageVisibility>
				<div className="name">
				
					<h1>Hello {this.props.username}</h1>
					<div className="btn" onClick={this.togglePop}>
						<button id='change-name'>Change name</button>
					</div>
					
				</div>
				{this.props.seen ? <PopUp toggle={this.togglePop} /> : null}
			<form onSubmit={this.onButtonClicked} id='form' autoComplete="off">
				
				{/* <p>Enter your name:</p>
				<input
					type='text'
					name='from'
					onChange={this.myChangeHandler}
				/>
				<p>Enter your message:</p> */}
				<input
					id='message'
					type='text'
					name='message'
					onChange={this.myChangeHandler}
				/>
				<button
					type='submit' value='' className='submit'
				> <i className="fas fa-paper-plane"></i>
				</button>
			</form>
			{/* <button onClick={() => {this.showNotifications()}}>send message</button> */}
			{/* <p>{this.state.msgNum}</p> */}
				<div id='m'>

				</div>

			</div>
		)
	}
}

const mapStateToProps = (state) => {
	// console.log('state', state)
	return {
		msgNum: state.msgNum,
		seen: state.seen,
		username: state.username,
		msgs: state.msgs,
		message: state.message,
		oldMsgs: state.oldMsgs
		// visibility: state.visibility
	}
}

const mapDispatchToProps = (dispatch) => {
	// console.log(this.props.seen)
	return {
		wasSeen: (seen) => { dispatch({type: 'TOGGLE_SEEN', seen: seen}) },
		addMessage: (msg) => { dispatch({type: 'ADD_MESSAGE', msg: msg}) },
		setUsername: (username) => { dispatch({type: 'SET_USERNAME', username: username})},
		addMessages: (messages) => { dispatch({type: 'ADD_MESSAGES', messages: messages})}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MsgList)
