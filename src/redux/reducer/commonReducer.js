const initialState ={
	publishers: [],
	feeds: [],
}

export default function(state=initialState,action){
	switch(action.type){
		case 'PUBLISHERS':
			return {...state, publishers:action.payload};
			break;
		case 'FEEDS':
			return {...state, feeds: action.payload};
			break;
		default:
			return state;
			break;
	}
}