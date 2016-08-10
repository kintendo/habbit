'use strict';

const React = require('react');
const {Component, PropTypes} = React;
const {connect} = require('react-redux');
const HabbitListItem = require('./HabbitListItem');
const actions = require('../lib/actions');
const habbitService = require('../resources/habbitService');

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

    render(){

        const {habbits} = this.props;

        // TODO: onViewHabbit
        // TODO: onCompleteHabbit

        return (
            <div>
                {habbits.map( (habbit) => {
                    return (
                        <HabbitListItem
                            {...habbit}
                            onViewHabbit={this.handleViewHabbit.bind(this, habbit)}
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
    setHabbits: PropTypes.func,
    habbits: PropTypes.array,
    setCurrentHabbit: PropTypes.func,
    changeView: PropTypes.func
};
HabbitList.defaultProps = {
    habbits: []
};
module.exports = connect(mapStateToProps, actions)(HabbitList);
