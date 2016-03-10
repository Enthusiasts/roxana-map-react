/**
 * Created by debalid on 09.03.2016.
 */
var React = require('React');

var HistoryItem = React.createClass({
    render: function()
    {
        return(
            <div className="historyItem">
                <button className="pure-button squaredBorders"><i className="fa fa-times"/></button>
                <div><b>Начало маршрута</b><br/></div>
                <div className="fa fa-arrow-down arrowIcon"><br/></div>
                <div><b>Конец маршрута</b></div>


            </div>
        );
    }
});

HistoryItem.propTypes = {
    route: React.PropTypes.object.isRequired
};

module.exports = HistoryItem;