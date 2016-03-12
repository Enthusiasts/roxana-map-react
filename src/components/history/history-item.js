/**
 * Created by debalid on 09.03.2016.
 */
var React = require('react');
var _ = require('underscore');

var Actions = require('../../actions/history');

var HistoryItem = React.createClass({
    componentWillMount: function()
    {
        this.context.store.dispatch(Actions.fetchRouteSummary(this.props.route));
    },

    componentWillUpdate: function()
    {
        this.context.store.dispatch(Actions.fetchRouteSummary(this.props.route));
    },

    shouldComponentUpdate: function()
    {
        return !this.props.route.first || !this.props.route.last;
    },

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
        var first = this.props.route.first ? this.props.route.first.title : '...';
        var last = this.props.route.last ? this.props.route.last.title : '...';
        console.log("sd");
        return(
            <div className="historyItem">
                <button onClick={this.deleteRoute} className="pure-button squaredBorders"><i className="fa fa-times"/></button>
                <button onClick={this.editRoute } className="pure-button squaredBorders"><i className="fa fa-pencil"/></button>
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