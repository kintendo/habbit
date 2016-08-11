'use strict';

const React = require('react');
const {Component, PropTypes} = React;
const {connect} = require('react-redux');
const actions = require('../lib/actions');

class Category extends Component {

    constructor(props) {
        super(props);
    }

    render(){

        const {cat, changeView} = this.props;

        // TODO: make cats sortable

        return (
            <div>
                <div>
                    <button onClick={changeView.bind(this, 'cat-list')}>Back</button>
                </div>
                <div>
                    <span>{cat.name}</span>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {catData} = state;
    return {
        cat: catData.currentCat
    };
}

Category.propTypes = {
    cat: PropTypes.object,
    changeView: PropTypes.func
};
Category.defaultProps = {
    cat: {}
};
module.exports = connect(mapStateToProps, actions)(Category);
