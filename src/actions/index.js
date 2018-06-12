import { 
    LOAD_ITEMS,
    ADD_TO_CART,
    VIEW_CART_ITEMS,
    REMOVE_ITEM,
    COMPLETED_TUTORIAL 
} from '../utility/constants';
import axios from 'axios';

export const loadItems = () => async dispatch => {
    dispatch({ type: LOAD_ITEMS, loading: true, payload: { data: [] } })
    let response = await axios.get('http://demo8465751.mockable.io/products')
    dispatch({ type: LOAD_ITEMS, payload: response, loading: false });
};

export const addToCart = payload => ({
    type: ADD_TO_CART,
    payload
}) 

export const viewCart = () => ({
    type: VIEW_CART_ITEMS,
})

export const completedTutorial = () => ({
    type: COMPLETED_TUTORIAL
})

export const removeItem = (payload) => ({
    type: REMOVE_ITEM,
    payload
})