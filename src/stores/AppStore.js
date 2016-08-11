const {createStore, combineReducers, applyMiddleware, compose} = require('redux');
const thunk = require('redux-thunk').default;
const userReducer = require('./reducers/UserReducer');
const viewReducer = require('./reducers/ViewReducer');
const habbitReducer = require('./reducers/HabbitReducer');
const categoryReducer = require('./reducers/CategoryReducer');

const AppReducer = combineReducers({
    userData: userReducer,
    viewData: viewReducer,
    habbitData: habbitReducer,
    catData: categoryReducer
});

const AppStore = createStore(
    AppReducer,
    compose(
        applyMiddleware(thunk),
        window && window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

module.exports = AppStore;
