'use strict';

const React = require('react');
const {Component, PropTypes} = React;
const moment = require('moment');

class HabbitListItem extends Component {

    render (){
        const {name, category, last_completed, onCompleteHabbit, onViewHabbit} = this.props;

        return (
            <div>
                <span onClick={onCompleteHabbit}>✅</span>
                <div onClick={onViewHabbit}>
                    <span>{name}</span> <br />
                    <span>{category}</span> <br />
                    <span>Last Completed: {moment(last_completed).fromNow()}</span>
                </div>
            </div>
        );
    }
}

HabbitListItem.propTypes = {
    category: PropTypes.string,
    last_completed: PropTypes.string,
    name: PropTypes.string,
    onCompleteHabbit: PropTypes.func,
    onViewHabbit: PropTypes.func,
};
HabbitListItem.defaultProps = {
    name: '',
    onViewHabbit: () => {},
    onCompleteHabbit: () => {}
};
module.exports = HabbitListItem;
