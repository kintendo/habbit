'use strict';

const React = require('react');
const {Component, PropTypes} = React;
const {connect} = require('react-redux');
const actions = require('../lib/actions');

class Nav extends Component {

    render() {
        const {changeView} = this.props;

        return (
            <div>
                <button onClick={changeView.bind(this, 'list')}>Habbits</button>
                <button onClick={changeView.bind(this, 'cat-list')}>Categories</button>
                <button onClick={changeView.bind(this, 'new')}>New Habbit</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}
Nav.propTypes = {
    changeView: PropTypes.func
}
module.exports = connect(mapStateToProps, actions)(Nav);
