'use strict';

const React = require('react');
const {Component, PropTypes} = React;
const {connect} = require('react-redux');
const {facebookLogin} = require('../resources/authService');
const {initServices} = require('../lib/init');
const actions = require('../lib/actions');
const userService = require('../resources/userService');

class Login extends Component {

    constructor(props) {
        super(props);
        this.initializeUser = this.initializeUser.bind(this);
        this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
    }

    initializeUser(uid) {
        this.props.setUserId(uid);
        initServices(uid);
    }

    handleFacebookLogin() {
        facebookLogin( (user) => {
            this.initializeUser(user.uid);
            userService.setUserInfo(user);
            this.props.changeView('list');
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.handleFacebookLogin}>Login</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {userData} = state;
    return {
        uid: userData.uid
    };
}
Login.propTypes = {
    setUserId: PropTypes.func,
    changeView: PropTypes.func
}
module.exports = connect(mapStateToProps, actions)(Login);
