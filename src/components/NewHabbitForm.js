'use strict';

const React = require('react');
const moment = require('moment');
const habbitService = require('../resources/habbitService');

class NewHabbitForm extends React.Component {

    constructor (props) {
        super(props);
        this.createNewHabbit = this.createNewHabbit.bind(this);
    }

    createNewHabbit () {
        const newHabbit = {
            name: this.nameInput.value,
            category: this.categoryInput.value,
            description: this.descriptionInput.value,
            last_completed: moment().format()
        };
        habbitService.createNewHabbit(newHabbit);
    }

    render (){

        return (
            <div>
                <div>
                    <span>Name</span><input ref={(c) => this.nameInput = c}/>
                </div>
                <div>
                    <span>Category</span><input ref={(c) => this.categoryInput = c}/>
                </div>
                <div>
                    <span>Description</span><textarea ref={(c)=> this.descriptionInput = c}/>
                </div>
                <button onClick={this.createNewHabbit}>Add Habbit</button>
            </div>
        );
    }
}

NewHabbitForm.propTypes = {
};
NewHabbitForm.defaultProps = {
};
module.exports = NewHabbitForm;
