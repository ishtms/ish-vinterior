import { COMPLETED_TUTORIAL } from '../utility/constants';

export default (state = false, { type }) => {
    switch(type) {
        case COMPLETED_TUTORIAL:
            return true;
        default: 
            return state;
    }
}