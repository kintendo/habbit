'use strict';

const React = require('react');
const {Component, PropTypes} = React;
const {connect} = require('react-redux');
const HabbitListItem = require('./HabbitListItem');
const actions = require('../lib/actions');
const habbitService = require('../services/habbitService');
const categoryService = require('../services/categoryService');
const moment = require('moment');
const assign = require('object-assign');

class HabbitList extends Component {

    constructor(props) {
        super(props);
        this.handleViewHabbit = this.handleViewHabbit.bind(this);
        this.handleCompleteHabbit = this.handleCompleteHabbit.bind(this);
        this.buildHabbitList = this.buildHabbitList.bind(this);
    }

    componentDidMount() {
        habbitService.getHabbits( (habbits) => {
            this.props.setHabbits(habbits);
        });
        categoryService.getCats( (cats) => {
            this.props.setCats(cats);
        })
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

    buildHabbitList (habbits = []) {
        return habbits.map( (habbit, i) => {
            return (
                <HabbitListItem
                    {...habbit}
                    key={i}
                    onViewHabbit={this.handleViewHabbit.bind(this, habbit)}
                    onCompleteHabbit={this.handleCompleteHabbit.bind(this, habbit)}
                />
            );
        });
    }

    render(){

        const {habbits, cats} = this.props;
        let remainingHabbits = [...habbits];

        return (
            <div>
                <ul className='habbit-list'>
                {cats.map( (cat) => {
                    const filteredHabbits = remainingHabbits.filter( (habbit) => habbit.category === cat.name );
                    remainingHabbits = remainingHabbits.filter( (habbit) => habbit.category !== cat.name );
                    return (
                        <li key={cat.name}>
                            <p className='cat-header'>{cat.name}</p>
                            {this.buildHabbitList(filteredHabbits)}
                        </li>
                    );
                })}
                {remainingHabbits.length ?
                    <li>
                        <p className='cat-header'>Uncategorized</p>
                        {this.buildHabbitList(remainingHabbits)}
                    </li>
                : null }
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {catData, habbitData} = state;
    return {
        cats: catData.cats,
        habbits: habbitData.habbits
    };
}

HabbitList.propTypes = {
    cats: PropTypes.array,
    habbits: PropTypes.array,
    changeView: PropTypes.func,
    setCats: PropTypes.func,
    setCurrentHabbit: PropTypes.func,
    setHabbits: PropTypes.func,
    updateSingleHabbit: PropTypes.func
};
HabbitList.defaultProps = {
    cats: [],
    habbits: []
};
module.exports = connect(mapStateToProps, actions)(HabbitList);
