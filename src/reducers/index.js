import { combineReducers } from 'redux';
import ItemReducer from './ItemReducer';
import CartReducer from './CartReducer';
import ViewCartReducer from './ViewCart';
import TutorialReducer from './TutorialReducer';

export default combineReducers({
    items: ItemReducer,
    cart: CartReducer,
    cart_items: ViewCartReducer,
    tutorialFinished: TutorialReducer,
});