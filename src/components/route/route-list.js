/**
 * Created by debal on 03.03.2016.
 */
var React = require('react');
var _ = require('underscore');
var LeafletRouting = require('leaflet-routing-machine');

var Actions = require('../../actions/routes');

var RouteItem = require('./route-item');

var RouteList = React.createClass({
    contextTypes: {
        store: React.PropTypes.object.isRequired
    },

    componentWillMount: function()
    {
       //var t = LeafletRouting.Control
    },

    renderEntertainments: function ()
    {
        var entertainments = this.props.items;
        if (entertainments)
        {
            return entertainments.map(
                ent => {
                    return (
                        <RouteItem key={"ri-" + ent.id} info={ent}/>
                    );
                }
            );
        } else return null;
    },

    clearRouteList: function()
    {
        this.context.store.dispatch(Actions.clearRouteList());
    },

    saveRouteList: function()
    {
        this.context.store.dispatch(Actions.saveRouteList({
            description: '',
            entertainments: this.props.items
        }));
    },

    renderSaveButton: function(){
        //Рисуем кнопку если пользователь авторизован и если ещё не сохранили маршрут
        return /*this.context.store.getState().User.isAuthorized && */_.isEmpty(this.props.saved)
            ? (<button id="saveBtn "className="btn btn-success squaredBorders" onClick={this.saveRouteList}>
                    {!this.props.isSaving ? "Сохранить" : "Сохраняем..."}
                </button>)
            : null;
    },

    renderClearButton: function(){
        //Рисуем кнопку если список не пустой
        return this.props.items.length > 0
            ? <button id="clrBtn" className="btn btn-danger squaredBorders" onClick={this.clearRouteList}>Очистить</button>
            : null;
    },

    renderErrorMessage: function()
    {
        return !_.isEmpty(this.props.error)
            ? <div> {this.props.error.reason} </div>
            : null;
    },

    renderSaveMessage: function()
    {
        return !_.isEmpty(this.props.saved)
            ? <div> Маршрут успешно сохранён! </div>
            : null;
    },

    render: function() {
        if (this.props.items.length <= 0) return null;
        return (
            <div id="routeList">
                {this.renderSaveMessage()}
                {this.renderEntertainments()}
                {this.renderClearButton()}
                {this.renderErrorMessage()}
                {this.renderSaveButton()}
            </div>
        );
    }
});

RouteList.propTypes = {
    items: React.PropTypes.array.isRequired,
    isSaving: React.PropTypes.bool.isRequired,
    saved: React.PropTypes.object.isRequired,
    error: React.PropTypes.object.isRequired
};

module.exports = RouteList;