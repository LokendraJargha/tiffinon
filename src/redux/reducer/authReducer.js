const initialState = {
  isAuthenticate: false,
  user: {},
  roles: [],
  modules: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "AUTHENTICATE":
      return { ...state, isAuthenticate: action.payload };
    case "USER":
      return { ...state, user: action.payload };
    case "ROLES":
      return { ...state, roles: action.payload };
    case "MODULES":
      return { ...state, modules: action.payload };
    default:
      return state;
  }
}
