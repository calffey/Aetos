import { combineReducers } from "redux";
import ApiReducer from "./ApiReducer";
import MetricReducer from "./MetricReducer";
import AuthReducer from "./AuthReducer";

export default combineReducers({
  auth: AuthReducer,
  api: ApiReducer,
  metric: MetricReducer
});
