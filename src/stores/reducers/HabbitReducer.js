const assign = require('object-assign');
const initialState = {
    habbits: [],
    currentHabbit: {}
};

function habbitReducer (state = initialState, action = {}) {
    switch (action.type) {
    case 'SET_HABBITS':
        return assign({}, state, {
            habbits: action.habbits
        });
    case 'SET_CURRENT_HABBIT':
        return assign({}, state, {
            currentHabbit: action.habbit
        });
    case 'UPDATE_SINGLE_HABBIT':
        return assign({}, state, {
            habbits: state.habbits.map( (habbit) => {
                return (habbit.key === action.habbit.key) ? action.habbit : habbit;
            })
        });
    default:
        return state;
    }
}

module.exports = habbitReducer;
