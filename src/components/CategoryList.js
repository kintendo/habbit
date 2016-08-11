'use strict';

const React = require('react');
const {Component, PropTypes} = React;
const {connect} = require('react-redux');
const actions = require('../lib/actions');
const categoryService = require('../services/categoryService');

class CategoryList extends Component {

    constructor(props) {
        super(props);
        this.handleViewCat = this.handleViewCat.bind(this);
    }

    componentDidMount() {
        categoryService.getCats( (cats) => {
            this.props.setCats(cats);
        });
    }

    handleViewCat(cat) {
        this.props.setCurrentCat(cat);
        this.props.changeView('cat');
    }

    render(){

        const {cats} = this.props;

        // TODO: make cats sortable
        // TODO: add category
        // TODO: delete category

        return (
            <div>
                <ul>
                {cats.map( (cat) => {
                    return (
                        <li onClick={this.handleViewCat.bind(this, cat)}>{cat.name}</li>
                    );
                })}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {catData} = state;
    return {
        cats: catData.cats
    };
}

CategoryList.propTypes = {
    cats: PropTypes.array,
    changeView: PropTypes.func,
    setCurrentCat: PropTypes.func,
    setCats: PropTypes.func,
};
CategoryList.defaultProps = {
    cats: []
};
module.exports = connect(mapStateToProps, actions)(CategoryList);
