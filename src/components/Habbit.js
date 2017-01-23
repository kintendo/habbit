'use strict';

const React = require('react');
const {Component, PropTypes} = React;
const {connect} = require('react-redux');
const assign = require('object-assign');
const actions = require('../lib/actions');
const moment = require('moment');
const {updateHabbit} = require('../services/habbitService');
const Autocomplete = require('react-autocomplete');

class Habbit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editMode: false,
            catInput: props.habbit.category
        };

        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.updateHabbit = this.updateHabbit.bind(this);
    }

    updateHabbit() {
        const {habbit, setCurrentHabbit} = this.props;
        const newHabbit = assign({}, habbit, {
            name: this.nameInputRef.value,
            category: this.state.catInput,
            description: this.descInputRef.value
        });
        updateHabbit(newHabbit, (err) => {
            if (!err) {
                setCurrentHabbit(newHabbit);
                this.toggleEditMode(false);
            }
        });
    }

    toggleEditMode(mode) {
        this.setState({editMode: mode});
    }

    render() {
        const {habbit, changeView, cats} = this.props;
        const {editMode, catInput} = this.state;

        const _cats = cats.filter( ({name}) => name.indexOf(catInput) !== -1 );

        return (
            <div>
                <div>
                    <button onClick={changeView.bind(this, 'list')}>Back</button>
                    {editMode ?
                        <button onClick={this.toggleEditMode.bind(this, false)}>X</button> :
                        <button onClick={this.toggleEditMode.bind(this, true)}>Edit</button>
                    }
                </div>
                {editMode ?
                    <div>
                        <div><label>Name: </label><input ref={(c) => this.nameInputRef = c} defaultValue={habbit.name}/></div>
                        <div><label>Description: </label><input ref={(c) => this.descInputRef = c} defaultValue={habbit.description}/></div>
                        <div><label>Category: </label>
                            <Autocomplete
                                value={catInput}
                                items={_cats}
                                getItemValue={(item) => item.name}
                                onChange={(event, value) => this.setState({ catInput: value })}
                                onSelect={value => this.setState({ catInput: value })}
                                renderItem={ (item, isHighlighted) => (
                                    <div key={item.abbr}>{item.name}</div>
                                )}
                            />
                        </div>
                        <button onClick={this.updateHabbit}>Save Changes</button>
                    </div> :
                    <div>
                        <span>{habbit.name}</span>
                        <ul>
                            {habbit.history && Object.keys(habbit.history).map( (key) => {
                                return (
                                    <li>{moment(key).format('MMMM Do, YYYY @ h:mm:ss a')}</li>
                                );
                            })}
                        </ul>
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {habbitData, catData} = state;
    return {
        habbit: habbitData.currentHabbit,
        cats: catData.cats
    };
}
Habbit.propTypes = {
    cats: PropTypes.array,
    habbit: PropTypes.object,
    changeView: PropTypes.func,
    setCurrentHabbit: PropTypes.func
};
Habbit.defaultProps = {
    view: 'login'
};
module.exports = connect(mapStateToProps, actions)(Habbit);
