/**
 * Created by aolSvt on 03.03.2016.
 */
var React = require('react');
var Actions = require('../../actions/routes');
var Properties = require('../../const/properties');

// Немного изменил - теперь сюда передаётся объект entertainment полностью
var EntertainmentInfo = React.createClass({
    // К моменту создания контекст теряется!
    /*contextTypes: {
        store: React.PropTypes.object.isRequired
    },*/

    addToRouteList: function ()
    {
        //TODO: вынести на уровень props
        var routeContext = this.props.store.getState().Routes.context;
        const Contexts = Properties.ROUTE.CONTEXTS;

        if ([Contexts.EDIT, Contexts.CREATE].every(x => x != routeContext.current))
        {
            this.props.store.dispatch(Actions.setContext(Contexts.CREATE, {}));
        }

        // currentRoute - нужен для перерисовывания маршрута на карте
        // TODO: костыль? подумать
        var currentRoute = this.props.store.getState().Routes.items;
        this.props.store.dispatch(Actions.addRouteItemAndRenderPath(this.props.entertainment, currentRoute));
    },

    renderAddToRouteListButton: function ()
    {
        var currentRoute = this.props.store.getState().Routes.items;

        // Проверяем, есть ли такое заведение в списке или иcчерпан ли лимит маршрута
        return (currentRoute.some(ent => ent.id === this.props.entertainment.id)
                || currentRoute.length >= Properties.ROUTE.LIST.MAX_NUMBER)
            ? null
            : <button onClick={this.addToRouteList} className="btn btn-primary squaredBorders">Добавить к маршруту</button>;
    },

    render: function()
    {
        return (
            <div className="pop-up">
                <b>Название: </b>{this.props.entertainment.title} <br />
                <b>Район: </b>{this.props.entertainment.zoneTitle} <br />
                <b>Средняя стоимость: </b>{this.props.entertainment.cost} <br />
                {this.renderAddToRouteListButton()}
            </div>
        )
    }
});

EntertainmentInfo.propTypes = {
    entertainment: React.PropTypes.object.isRequired,

    // ! Передаём как props потому что к моменту создания this.context теряется!
    store: React.PropTypes.object.isRequired
};

module.exports = EntertainmentInfo;