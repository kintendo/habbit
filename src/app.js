'use strict';

const React = require('react');
const {connect} = require('react-redux');

// Services
const {getSession} = require('./resources/authService');
const userService = require('./resources/userService');
const habbitService = require('./resources/habbitService');
const catService = require('./resources/categoryService');

// Components
const HabbitContent = require('./components/HabbitContent');

// Config
function mapStateToProps(state) {
    const {viewData} = state;
    return {
        view: viewData.view
    };
}

function mapDispatchToProps(dispatch) {
    return {
        changeView: (view) => {
            dispatch({type: 'CHANGE_VIEW', view});
        },
        setUserId: (uid) => {
            dispatch({type: 'SET_USER_ID', uid});
        }
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.initializeUser = this.initializeUser.bind(this);
    }

    initializeUser(uid) {
        // Store UID for future use throughout app
        this.props.setUserId(uid);

        // Initialize services
        userService.initUser(uid);
        habbitService.initHabbits(uid);
        catService.initCats(uid);
    }

    componentDidMount() {
        const ap = getSession( ({uid}) => {
            if (uid) {
                this.initializeUser(uid);
                this.props.changeView('list');
            }
        });
    }

    render() {
        const {view, changeView} = this.props;

        return (
            <div>
                Hello world.

                <button onClick={changeView.bind(this, 'new')}>Add Habbit</button>
                <HabbitContent view={view} />
            </div>
        );
    }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(App);
