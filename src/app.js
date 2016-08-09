'use strict';

const React = require('react');
const {Component, PropTypes} = React;
const {connect} = require('react-redux');
const actions = require('./lib/actions');
const {initServices} = require('./lib/init');
const {getSession} = require('./resources/authService');
const HabbitContent = require('./components/HabbitContent');

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
        const {view, changeView} = this.props;

        return (
            <div>
                <button onClick={changeView.bind(this, 'new')}>Add Habbit</button>
                <HabbitContent view={view} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {viewData} = state;
    return {
        view: viewData.view
    };
}
App.propTypes = {
    view: PropTypes.string,
    changeView: PropTypes.func,
    setUserId: PropTypes.func
};
module.exports = connect(mapStateToProps, actions)(App);
