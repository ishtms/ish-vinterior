import { VIEW_CART_ITEMS } from '../utility/constants';

export default (state = [], { type }) => {
    switch (type) {
        case VIEW_CART_ITEMS:
            return state.cart;
        default:
            return state;
    }
}