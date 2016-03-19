/**
 * Created by debalid on 09.03.2016.
 */
var React = require('react');
var _ = require('underscore');

var Actions = require('../../actions/history');

var HistoryItem = React.createClass({

    watchRoute: function()
    {
        this.context.store.dispatch(Actions.watchRoute(this.props.route.id));
    },

    editRoute: function()
    {
        this.context.store.dispatch(Actions.editRoute(this.props.route.id));
    },

    deleteRoute: function()
    {
        this.context.store.dispatch(Actions.deleteRouteAndUpdateHistory(this.props.route.id));
    },

    render: function()
    {
        var first = this.props.route.first.title;
        var last = this.props.route.last.title;
        return(
            <div className="historyItem">
                <i onClick={this.deleteRoute} className="fa fa-times"/>
                <i onClick={this.editRoute } className="fa fa-pencil"/>
                <div onClick={this.watchRoute}><b>{first}</b><br/></div>
                <div onClick={this.watchRoute} className="fa fa-arrow-down arrowIcon"><br/></div>
                <div onClick={this.watchRoute}><b>{last}</b></div>
            </div>
        );
    }
});

HistoryItem.contextTypes = {
    store: React.PropTypes.object.isRequired
};

HistoryItem.propTypes = {
    route: React.PropTypes.object.isRequired
};

module.exports = HistoryItem;