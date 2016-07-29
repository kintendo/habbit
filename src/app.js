'use strict';

const React = require('react');
const {facebookLogin} = require('./resources/authService');
const userService = require('./resources/userService');

// sub components

// list of categories
    // search bar to search through habbits
    // list of habbits under each category
    // habbit
        // name
        // list of tags
        // completion history
        // category

// nav
    // view habbits
    // view categories
    // view tags
    // view settings


class App extends React.Component {

    handleFacebookLogin () {
        const facebookLoginPromise = facebookLogin();
        facebookLoginPromise.then( (result) => {
            console.log(result);
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // TODO: use token to access friends list
            var user = result.user;
            const fbUser = user.providerData[0];
            userService.initUser(user.uid);
            userService.setUserInfo({facebook_id: fbUser.uid, email: fbUser.email, photo: fbUser.photoURL});
        });
    }

    render (){
        return (
            <div>
                Hello world.
                <button onClick={this.handleFacebookLogin}>Facebook Login</button>
            </div>
        );
    }
}

module.exports = App;
