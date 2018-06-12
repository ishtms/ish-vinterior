import { LOAD_ITEMS } from '../utility/constants';

export default (state = { data: [] }, { type, loading, payload }) => {
    switch(type) {
        case LOAD_ITEMS:
            return {
                loading,
                payload
            }
        default:
            return state;
    }
}