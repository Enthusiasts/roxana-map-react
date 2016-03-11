/**
 * Created by debalid on 09.03.2016.
 */
var React = require('React');
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
        return(
            <div className="historyItem">
                <button onClick={this.deleteRoute} className="pure-button squaredBorders"><i className="fa fa-times"/></button>
                <button onClick={this.editRoute } className="pure-button squaredBorders"><i className="fa fa-pencil"/></button>
                <div onClick={this.watchRoute}><b>Начало маршрута</b><br/></div>
                <div onClick={this.watchRoute} className="fa fa-arrow-down arrowIcon"><br/></div>
                <div onClick={this.watchRoute}><b>Конец маршрута</b></div>
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