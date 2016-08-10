'use strict';

const React = require('react');
const {Component, PropTypes} = React;
const {connect} = require('react-redux');
const actions = require('./lib/actions');
const {initServices} = require('./lib/init');
const {getSession} = require('./resources/authService');
const HabbitContent = require('./components/HabbitContent');
const Nav = require('./components/Nav');

class App extends Component {
    constructor(props) {
        super(props);
        this.initializeUser = this.initializeUser.bind(this);
    }

    initializeUser(uid) {
        this.props.setUserId(uid);
        initServices(uid);
    }

    componentDidMount() {
        getSession( ({uid}) => {
            if (uid) {
                this.initializeUser(uid);
                this.props.changeView('list');
            }
        });
    }

    render() {
        const {view, uid} = this.props;

        return (
            <div>
                {uid ? <Nav /> : null}
                <HabbitContent view={view} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {viewData, userData} = state;
    return {
        view: viewData.view,
        uid: userData.uid
    };
}
App.propTypes = {
    // state
    uid: PropTypes.string,
    view: PropTypes.string,
    // actions
    changeView: PropTypes.func,
    setUserId: PropTypes.func
};
module.exports = connect(mapStateToProps, actions)(App);
