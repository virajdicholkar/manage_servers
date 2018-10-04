import {combineReducers} from 'redux'
import { reducer as formReducer } from "redux-form";

import servers from "./server";
const rootReducers=combineReducers({
    form: formReducer,
    servers:servers
});
export default rootReducers