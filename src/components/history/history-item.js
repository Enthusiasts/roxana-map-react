/**
 * Created by debalid on 09.03.2016.
 */
var React = require('React');

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

    render: function()
    {
        return(
            <div className="historyItem">
                <button className="pure-button squaredBorders"><i className="fa fa-times"/></button>
                <div><b>Начало маршрута</b><br/></div>
                <div className="fa fa-arrow-down arrowIcon"><br/></div>
                <div><b>Конец маршрута</b></div>
                <button onClick={this.watchRoute}>watch</button>
                <button onClick={this.editRoute}>edit</button>
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