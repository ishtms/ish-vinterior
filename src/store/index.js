import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from '../reducers';
import { INITIAL_STATE } from '../utility/constants';

export default createStore(reducers, INITIAL_STATE, applyMiddleware(thunk));

