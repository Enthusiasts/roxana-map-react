/**
 * Created by Vlad on 08.04.2016.
 */
var React = require('react');
var ReactRedux = require('react-redux');
var SearchLine = require('./search-line');

const mapStateToProps = (state) =>
{

    return {
        searchEnt: state.Entertainments.searchEnt
    }
};
const SearchLineContainer = ReactRedux.connect(mapStateToProps)(SearchLine);
module.exports = SearchLineContainer;