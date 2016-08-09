'use strict';

const React = require('react');
const {connect} = require('react-redux');

// Services
const {facebookLogin} = require('../resources/authService');
const userService = require('../resources/userService');
const habbitService = require('../resources/habbitService');
const catService = require('../resources/categoryService');

// Config
function mapStateToProps(state) {
    const {userData} = state;
    return {
        uid: userData.uid
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setUserId: (uid) => {
            dispatch({type: 'SET_USER_ID', uid});
        },
        changeView: (view) => {
            dispatch({type: 'CHANGE_VIEW', view});
        }
    }
}

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
        const facebookLoginPromise = facebookLogin();
        facebookLoginPromise.then( ({credential, user}) => {
            // TODO: use token to access & store friends list
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            // var token = credential.accessToken;
            this.initializeUser(user.uid);

            const fbUser = user.providerData[0];
            userService.setUserInfo({facebook_id: fbUser.uid, email: fbUser.email, photo: fbUser.photoURL});
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

module.exports = connect(mapStateToProps, mapDispatchToProps)(Login);
