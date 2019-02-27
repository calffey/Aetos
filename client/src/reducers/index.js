import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import MetricReducer from './MetricReducer'

export default combineReducers({
  auth: AuthReducer,
  metric: MetricReducer
});
