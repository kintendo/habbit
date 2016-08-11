'use strict';

const React = require('react');
const HabbitList = require('./HabbitList');
const NewHabbitForm = require('./NewHabbitForm');
const Login = require('./Login');
const Habbit = require('./Habbit');
const CategoryList = require('./CategoryList');
const Category = require('./Category');
// const NewCatForm = require('./NewCatForm');

class HabbitContent extends React.Component {

    render (){

        const {view} = this.props;

        return (
            <div>
                {view === 'login' ? <Login /> : null}
                {view === 'list' ? <HabbitList /> : null}
                {view === 'new' ? <NewHabbitForm /> : null}
                {view === 'habbit' ? <Habbit /> : null}
                {view === 'cat-list' ? <CategoryList /> : null}
                {view === 'cat' ? <Category /> : null}
                {/*{view === 'new-cat' ? <NewCatForm /> : null}*/}
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
