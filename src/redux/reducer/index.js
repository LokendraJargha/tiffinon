import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import generalSetting from "./generalSetting";
import gridReducer from "./gridReducer";
import commonReducer from "./commonReducer";

export default combineReducers({
  auth: authReducer,
  setting: generalSetting,
  grid: gridReducer,
  common: commonReducer,
});
