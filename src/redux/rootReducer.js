import {combineReducers} from 'redux';
import ListContainerReducer from './reducers/ListContainerReducer';


const rootReducer = combineReducers({
    app: ListContainerReducer
});

export default rootReducer