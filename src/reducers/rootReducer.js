const initState = {
	msgNum: 0,
	seen: false,
	username: localStorage.getItem('username'),
	message: '',
	msgs: 'try this',
	
	// visibility: 'no',
}

const rootReducer = (state = initState, action) => {
	if (action.type === 'TOGGLE_SEEN') {
		return {
			...state,
			seen: action.seen
		}
	}
	if (action.type === 'ADD_MESSAGE') {
		return {
			...state,
			message: action.msg 
		}
	}
	if (action.type === 'SET_USERNAME') {
		return {
			...state,
			username: action.username
		}
	}

	// if (action.type = 'ADD_MESSAGES') {
	// 	if(state.oldMsgs === '' || state.oldMsgs === undefined) {
	// 		return{
	// 			...state,
	// 			oldMsgs: action.messages
	// 		}
	// 	}
	// 	if (state.msgs.length === 1){
	// 		let newMsgs = state.oldMsgs.unshift(action.messages[0])
	// 		// let n = state.msgs.unshift(action.messages[0])
	// 		console.log(newMsgs)
	// 		return {
	// 			...state,
	// 			msgs: action.messages
	// 		}
			
	// 	}
	// 	if (state.msgs.length > 1){
	// 		// let Msgs = state.msgs.unshift(action.messages[0])
	// 		return {
	// 			...state,
	// 			msgs: action.messages,
	// 			// msgs: state.oldMsgs,
	// 		}
	// 	}
	// }

	if (action.type = 'ADD_MESSAGES') {
		return {
			...state,
			msgs: action.messages
		}
	}
	
	if (action.type = 'TOGGLE_VISIBILITY') {
		return {
			...state,
			visibility: action.visibility
		}
	}
	return state
}

export default rootReducer