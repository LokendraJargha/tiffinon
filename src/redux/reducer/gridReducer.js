const initalState = {
  init: false,
  selectedGridIds: [],
  gridData: [],
};

export default function (state = initalState, action) {
  switch (action.type) {
    case "INIT_GRID":
      return { ...state, init: action.payload };
      break;
    case "SET_SELECTED_GRID_IDS":
      return { ...state, selectedGridIds: action.payload };
      break;
    case "SETGRIDDATA":
      return { ...state, gridData: action.payload };
      break;
    default:
      return state;
      break;
  }
}
