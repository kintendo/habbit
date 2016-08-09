'use strict';

const React = require('react');
const {connect} = require('react-redux');
const {facebookLogin} = require('../resources/authService');
const actions = require('../actions/actions');
const userService = require('../resources/userService');
const habbitService = require('../resources/habbitService');
const catService = require('../resources/categoryService');

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.initializeUser = this.initializeUser.bind(this);
        this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
    }

    initializeUser(uid) {
        // Store UID for future use throughout app
        this.props.setUserId(uid);

        // Initialize services
        userService.initUser(uid);
        habbitService.initHabbits(uid);
        catService.initCats(uid);
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
module.exports = connect(mapStateToProps, actions)(Login);
