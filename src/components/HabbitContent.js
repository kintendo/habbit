'use strict';

const React = require('react');

const HabbitList = require('./HabbitList');
const NewHabbitForm = require('./NewHabbitForm');
const Login = require('./Login');


class HabbitContent extends React.Component {

    render (){

        const {view} = this.props;

        return (
            <div>
                {view === 'login' ? <Login /> : null}
                {view === 'list' ? <HabbitList /> : null}
                {view === 'new' ? <NewHabbitForm /> : null}
            </div>
        );
    }
}

HabbitContent.propTypes = {
    view: React.PropTypes.string
};
HabbitContent.defaultProps = {
    view: 'login'
};
module.exports = HabbitContent;
