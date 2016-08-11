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
        let content = null;
        switch (view) {
            case 'login': content = <Login />; break;
            case 'list': content = <HabbitList />; break;
            case 'new': content = <NewHabbitForm />; break;
            case 'habbit': content = <Habbit />; break;
            case 'cat-list': content = <CategoryList />; break;
            case 'cat': content = <Category />; break;
            // case 'new-cat': content = <NewCatForm />; break;
        }

        return (
            <div>
                {content}
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
