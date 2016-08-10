'use strict';

const React = require('react');
const {Component, PropTypes} = React;
const {connect} = require('react-redux');
const assign = require('object-assign');
const actions = require('../lib/actions');
const moment = require('moment');
const {updateHabbit} = require('../services/habbitService');

class Habbit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editMode: false
        };

        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.updateHabbit = this.updateHabbit.bind(this);
    }

    updateHabbit() {
        const {habbit, setCurrentHabbit} = this.props;
        const newHabbit = assign({}, habbit, {
            name: this.inputRef.value
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
        const {habbit, changeView} = this.props;
        const {editMode} = this.state;

        // TODO: add history

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
                        <input ref={(c) => this.inputRef = c} defaultValue={habbit.name}/>
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
    const {habbitData} = state;
    return {
        habbit: habbitData.currentHabbit
    };
}
Habbit.propTypes = {
    habbit: PropTypes.object,
    changeView: PropTypes.func,
    setCurrentHabbit: PropTypes.func
};
Habbit.defaultProps = {
    view: 'login'
};
module.exports = connect(mapStateToProps, actions)(Habbit);
