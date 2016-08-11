'use strict';

const React = require('react');
const {Component, PropTypes} = React;
const {connect} = require('react-redux');
const actions = require('../lib/actions');
const categoryService = require('../services/categoryService');
const sortable = require('sortablejs');

class CategoryList extends Component {

    constructor(props) {
        super(props);
        this.handleViewCat = this.handleViewCat.bind(this);
        this.saveCatOrder = this.saveCatOrder.bind(this);
    }

    componentDidMount() {
        categoryService.getCats( (cats) => {
            this.props.setCats(cats);
            this.sortableCats = sortable.create(document.getElementById('cats'));
        });
    }

    saveCatOrder() {
        const catArray = this.sortableCats.toArray();
        categoryService.updateCatOrder(catArray, () => {
            this.props.changeView('list');
        });
    }

    handleViewCat(cat) {
        this.props.setCurrentCat(cat);
        this.props.changeView('cat');
    }

    render(){

        const {cats} = this.props;

        return (
            <div>
                <ul id="cats">
                {cats.map( (cat) => {
                    return (
                        <li key={cat.name} data-id={cat.name} onClick={this.handleViewCat.bind(this, cat)}>{cat.name}</li>
                    );
                })}
                </ul>
                <button onClick={this.saveCatOrder}>Save Order</button>
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
