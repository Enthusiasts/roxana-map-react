/**
 * Created by debalid on 09.03.2016.
 */
var React = require('react');

var Actions = require('../../actions/history');

var HistoryItem = require('./history-item');

var HistoryList = React.createClass({
    componentWillMount: function () {
        this.requestItems();
        setInterval(() => {
            this.requestItems();
        }, 5000);
    },

    requestItems: function () {
        var userId = this.context.store.getState().User.userInfo.id;
        if (userId) this.context.store.dispatch(Actions.fetchUserHistory(userId))
    },

    renderItems: function () {
        var items = this.props.items;
        return items
            ? items.map(route => <HistoryItem key={"hi" + route.id} route={route}/>)
            : null;
    },

    render: function () {
        return this.props.isAuthorized && this.props.items.length > 0
            ? (
            <div className="historyList">
                {this.renderItems()}
            </div>
        )
            : null;
    }
});

HistoryList.contextTypes = {
    store: React.PropTypes.object.isRequired
};

HistoryList.propTypes = {
    isAuthorized: React.PropTypes.bool.isRequired,
    items: React.PropTypes.array.isRequired
};

module.exports = HistoryList;