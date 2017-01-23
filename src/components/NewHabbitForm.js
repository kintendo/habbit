'use strict';

const React = require('react');
const {Component, PropTypes} = React;
const {connect} = require('react-redux');
const moment = require('moment');
const actions = require('../lib/actions');
const habbitService = require('../services/habbitService');
const Autocomplete = require('react-autocomplete');

class NewHabbitForm extends Component {

    constructor (props) {
        super(props);

        this.state = {
            catInput: ''
        };

        this.createNewHabbit = this.createNewHabbit.bind(this);
    }

    createNewHabbit () {
        const newHabbit = {
            name: this.nameInput.value,
            category: this.state.catInput,
            description: this.descriptionInput.value,
            last_completed: moment().format()
        };
        habbitService.createNewHabbit(newHabbit, (err) => {
            if (!err) {
                this.props.changeView('list');
            }
        });
    }

    render (){

        const {cats} = this.props;
        const {catInput} = this.state;
        const _cats = cats.filter( ({name}) => name.indexOf(catInput) !== -1 );

        return (
            <div>
                <div>
                    <span>Name: </span><input ref={(c) => this.nameInput = c}/>
                </div>
                <div>
                    <span>Category: </span>
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
                <div>
                    <span>Description: </span><textarea ref={(c)=> this.descriptionInput = c}/>
                </div>
                <button onClick={this.createNewHabbit}>Add Habbit</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {cats: state.catData.cats};
}
NewHabbitForm.propTypes = {
    cats: PropTypes.array,
    changeView: PropTypes.func
};
NewHabbitForm.defaultProps = {
};
module.exports = connect(mapStateToProps, actions)(NewHabbitForm);
