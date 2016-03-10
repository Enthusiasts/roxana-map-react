/**
 * Created by debalid on 09.03.2016.
 */
var React = require('react');

var HistoryItem = require('./history-item');

var HistoryList = React.createClass({
    renderItems: function()
    {
        var items = this.props.items;
        return items
            ? items.map(route => <HistoryItem route={route}/>)
            : null;
    },

    render: function()
    {
        //когда будет контейнер перенеси туда этот className
        return (
            <div className="historyList">
                <HistoryItem/>
            </div>
        );
    }
});

//HistoryList.propTypes = {
//    isAuthorized: React.PropTypes.boolean.isRequired,
//    items: React.PropTypes.array.isRequired
//};

module.exports = HistoryList;