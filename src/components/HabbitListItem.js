'use strict';

// Libraries
const React = require('react');
const {Component, PropTypes} = React;
const moment = require('moment');

// Config
const propTypes = {
    name: PropTypes.string,
    last_completed: PropTypes.string
};
const defaultProps = {
    name: '',
    onViewHabbit: () => {}
};

// Definition
class HabbitListItem extends Component {

    render (){
        const {name, last_completed, onViewHabbit} = this.props;

        return (
            <div>
                <input type='checkbox' />
                <div onClick={onViewHabbit}>
                    <span>{name}</span>
                    <span>Last Completed: {moment(last_completed).format()}</span>
                </div>
            </div>
        );
    }
}

HabbitListItem.propTypes = propTypes;
HabbitListItem.defaultProps = defaultProps;
module.exports = HabbitListItem;
