/**
 * Created by aolSvt on 03.03.2016.
 */
var React = require('react');
var Actions = require('../../actions/routes');

// Немного изменил - теперь сюда передаётся объект entertainment полностью
var EntertainmentInfo = React.createClass({
    // К моменту создания контекст теряется!
    /*contextTypes: {
        store: React.PropTypes.object.isRequired
    },*/

    addToRouteList: function ()
    {
        this.props.store.dispatch(Actions.addRouteItem(this.props.entertainment));
    },

    render: function()
    {
        return (
            <span>
                <b>Название: </b>{this.props.entertainment.title} <br />
                <b>Район: </b>{this.props.entertainment.zoneTitle} <br />
                <b>Средняя стоимость: </b>{this.props.entertainment.cost} <br />
                <b><button onClick={this.addToRouteList}>Добавить к маршруту</button></b>
            </span>
        )
    }
});

EntertainmentInfo.propTypes = {
    entertainment: React.PropTypes.object.isRequired,

    // ! Передаём как props потому что к моменту создания this.context теряется!
    store: React.PropTypes.object.isRequired
};

module.exports = EntertainmentInfo;