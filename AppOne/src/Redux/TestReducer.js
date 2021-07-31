
import {TEST_ACTION} from '../Redux/TestActions';

const initialState = {
    socket:null
};

export const TestReducer = (state = initialState, action) => {

    switch(action.type){
        case TEST_ACTION:
            console.log(action.payload);
            return{
                ...state,
                socket: action.payload
            }
    }


    return state; 
}
 