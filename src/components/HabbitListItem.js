'use strict';

const React = require('react');
const {Component, PropTypes} = React;
const moment = require('moment');

class HabbitListItem extends Component {

    render (){
        const {name, last_completed, onCompleteHabbit, onViewHabbit} = this.props;

        return (
            <div className='habbit'>
                <span onClick={onCompleteHabbit}>✅</span>
                <span onClick={onViewHabbit}>
                    <span> - {name} - </span>
                    <span>Last Completed: {moment(last_completed).fromNow()}</span>
                </span>
            </div>
        );
    }
}

HabbitListItem.propTypes = {
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
