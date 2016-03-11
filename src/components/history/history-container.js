/**
 * Created by debal on 11.03.2016.
 */
var React = require('react');
var ReactRedux = require('react-redux');

var HistoryList = require('./history-list');

const mapStateToProps = (state) =>
{
    return {
        isAuthorized: true,
        items: state.History.savedRoutes
    };
};

const HistoryContainer = ReactRedux.connect(mapStateToProps)(HistoryList);

module.exports = HistoryContainer;