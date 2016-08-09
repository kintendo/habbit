'use strict';

const React = require('react');
const {connect} = require('react-redux');
const HabbitListItem = require('./HabbitListItem');
const actions = require('../actions/actions');
const habbitService = require('../resources/habbitService');

class HabbitList extends React.Component {

    componentDidMount() {
        habbitService.getHabbits( (habbits) => {
            this.props.setHabbits(habbits);
        });
    }

    render(){

        const {habbits} = this.props;

        return (
            <div>
                {habbits.map( (habbit) => {
                    return (
                        <HabbitListItem {...habbit}/>
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
    habbits: React.PropTypes.array
};
HabbitList.defaultProps = {
    habbits: []
};
module.exports = connect(mapStateToProps, actions)(HabbitList);
