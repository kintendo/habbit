'use strict';

const React = require('react');
const {connect} = require('react-redux');
const assign = require('object-assign');
const HabbitListItem = require('./HabbitListItem');

// Services
const habbitService = require('../resources/habbitService');

function mapStateToProps(state) {
    const {habbitData} = state;
    return {
        habbits: habbitData.habbits
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setHabbits: (habbits) => {
            dispatch({type: 'SET_HABBITS', habbits});
        }
    }
}

class HabbitList extends React.Component {

    componentDidMount() {
        const hp = habbitService.getHabbits();
        if (hp) {
            hp.then( (snapshot) => {
                const habbitsObj = snapshot.val();
                const keys = Object.keys(habbitsObj);
                const habbits = keys.map( (key) => {
                    return assign({}, habbitsObj[key], {key});
                });
                this.props.setHabbits(habbits);
            });
        }
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

HabbitList.propTypes = {
    habbits: React.PropTypes.array
};
HabbitList.defaultProps = {
    habbits: []
};
module.exports = connect(mapStateToProps, mapDispatchToProps)(HabbitList);
