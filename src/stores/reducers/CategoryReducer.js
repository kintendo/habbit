const assign = require('object-assign');
const initialState = {
    cats: [],
    currentCat: {}
};

function categoryReducer (state = initialState, action = {}) {
    switch (action.type) {
    case 'SET_CATS':
        return assign({}, state, {
            cats: action.cats
        });
    case 'SET_CURRENT_CAT':
        return assign({}, state, {
            currentCat: action.cat
        });
    default:
        return state;
    }
}

module.exports = categoryReducer;
