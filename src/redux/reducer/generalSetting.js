const initialState = {
	sidebarShow: 'responsive'
}

export default function(state=initialState, action){
	switch(action.type){
		case 'Menu_TOGGLE':
			return {...state, sidebarShow: action.payload};
		default:
			return state;
	}
}