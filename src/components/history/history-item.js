/**
 * Created by debalid on 09.03.2016.
 */
var React = require('React');

var HistoryItem = React.createClass({
    render: function()
    {
        return(
            <div>
                {this.props.route.description}
            </div>
        );
    }
});

HistoryItem.propTypes = {
    route: React.PropTypes.object.isRequired
};

module.exports = HistoryItem;