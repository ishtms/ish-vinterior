import { ADD_TO_CART, REMOVE_ITEM } from '../utility/constants';

export default (state = [], { payload, type }) => {
    switch(type) {
        case ADD_TO_CART:
            return [...state, payload]
        case REMOVE_ITEM: 
            let StateCopy = [...state];
            let filteredState = StateCopy.filter((curr) => curr.beer !== payload.beer);
            return filteredState;
        default: 
            return state;
    }
}