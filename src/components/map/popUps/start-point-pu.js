/**
 * Created by Vlad on 17.03.2016.
 */

var React = require('react');
var RouteActions = require('../../../actions/routes');

var StartPointPU = React.createClass({
    propTypes: {
        store: React.PropTypes.object.isRequired,
        latitude: React.PropTypes.number.isRequired,
        longitude: React.PropTypes.number.isRequired
    },


    onButtonClick: function(){
        this.props.store.dispatch(RouteActions.offerRouteList(this.props.latitude, this.props.longitude, ["Бары"]));
    },
    render: function(){
        return (
            <div className="pop-up-default">
                <div>
                    <span>Начать маршрут отсюда?</span>
                </div>
                <button onClick={this.onButtonClick} className="btn btn-primary squaredBorders">Go!</button>
            </div>
        );
    }
});



module.exports = StartPointPU;