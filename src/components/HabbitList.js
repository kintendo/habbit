'use strict';

const React = require('react');
const {Component, PropTypes} = React;
const {connect} = require('react-redux');
const HabbitListItem = require('./HabbitListItem');
const actions = require('../lib/actions');
const habbitService = require('../services/habbitService');
const moment = require('moment');
const assign = require('object-assign');

class HabbitList extends Component {

    componentDidMount() {
        habbitService.getHabbits( (habbits) => {
            this.props.setHabbits(habbits);
        });
    }

    handleViewHabbit (habbit) {
        this.props.setCurrentHabbit(habbit);
        this.props.changeView('habbit');
    }

    handleCompleteHabbit (habbit) {
        const newHabbit = assign({}, habbit, {
            last_completed: moment().format(),
            history: assign({}, habbit.history, {[habbit.last_completed]: true})
        });
        habbitService.updateHabbit(newHabbit, (err) => {
            if (!err) {
                this.props.updateSingleHabbit(newHabbit);
            }
        });
    }

    render(){

        const {habbits} = this.props;
        // TODO: group by cat
        // TODO: sort by cat

        return (
            <div>
                {habbits.map( (habbit) => {
                    return (
                        <HabbitListItem
                            {...habbit}
                            onViewHabbit={this.handleViewHabbit.bind(this, habbit)}
                            onCompleteHabbit={this.handleCompleteHabbit.bind(this, habbit)}
                        />
                    );
                })}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {habbitData} = state;
    return {
        habbits: habbitData.habbits
    };
}

HabbitList.propTypes = {
    habbits: PropTypes.array,
    changeView: PropTypes.func,
    setCurrentHabbit: PropTypes.func,
    setHabbits: PropTypes.func,
    updateSingleHabbit: PropTypes.func
};
HabbitList.defaultProps = {
    habbits: []
};
module.exports = connect(mapStateToProps, actions)(HabbitList);
