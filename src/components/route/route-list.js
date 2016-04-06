/**
 * Created by debal on 03.03.2016.
 */
var React = require('react');
var _ = require('underscore');

var Properties = require('../../const/properties');
var Actions = require('../../actions/routes');

const Contexts = Properties.ROUTE.CONTEXTS;

var RouteItem = require('./route-item');

var RouteList = React.createClass({
    // Это - контекст компонента как в реакте
    contextTypes: {
        store: React.PropTypes.object.isRequired
    },

    // Это - наш собственный контекст компонента, отраюжающий юзер-экспириенс
    // Например - создание маршрута ИЛИ просмотр ИЛИ его редактирование
    // Влияет на состав отображаемых кнопок!
    inContext: function () {
        var args = Array.prototype.slice.call(arguments);
        return args.some(x => x == this.props.context.current);
    },

    renderEntertainments: function () {
        var entertainments = this.props.items;
        if (entertainments) {
            return entertainments.map(
                ent => {
                    return (
                        <RouteItem
                            key={"ri-" + ent.id}
                            info={ent}
                            onMoveUp={this.moveItem(true, ent.id)}
                            onMoveDown={this.moveItem(false, ent.id)}
                            onDelete={this.deleteItem(ent.id)}
                            showEditButtons={this.inContext(Contexts.CREATE, Contexts.EDIT)}
                        />
                    );
                }
            );
        } else return null;
    },

    moveItem: function (up, id) {
        return () => this.context.store.dispatch(Actions.moveItemAndRenderPath(this.props.items, up, id));
    },

    deleteItem: function (id) {
        return () => this.context.store.dispatch(Actions.removeItemAndRenderPath(this.props.items, id));
    },

    clearRouteList: function () {
        //После очищения контекст автоматически перейдёт в режим создания
        this.context.store.dispatch(Actions.clearRouteListAndSetCreateContext());
    },

    saveRouteList: function () {
        var userId = this.context.store.getState().User.userInfo.id;
        if (this.inContext(Contexts.CREATE)) {
            // После того как сохранили, контекст автоматически перейдёт в режим редактирования
            this.context.store.dispatch(Actions.saveRouteListAndSetEditContext({
                userId,
                description: '',
                entertainments: this.props.items
            }));
        }
        else if (this.inContext(Contexts.EDIT)) {
            //console.log(this.context.store.getState());
            this.context.store.dispatch(Actions.updateRouteListAndSetEditContext(
                this.props.context.extra.routeId, {
                    userId,
                    description: '',
                    entertainments: this.props.items
                }
            ));
        }
    },

    renderSaveButton: function()
    {
        //Рисуем кнопку если пользователь авторизован и если ещё не сохранили маршрут
        return this.props.isAuthorized && this.inContext(Contexts.CREATE, Contexts.EDIT)
            ? (<button id="saveBtn" className="btn btn-success squaredBorders" onClick={this.saveRouteList}>
            {!this.props.context.extra.isSaving ? "Сохранить" : "Сохраняем..."}
        </button>)
            : null;
    },

    renderClearButton: function () {
        //Рисуем кнопку если список не пустой
        return this.props.items.length > 0
            ? <button id="clrBtn" className="btn btn-danger squaredBorders" onClick={this.clearRouteList}>
            Очистить</button>
            : null;
    },

    renderErrorMessage: function()
    {
        return !_.isEmpty(this.props.error)
            ? <div className="successSave"> {this.props.error.reason} </div>
            : null;
    },

    renderSaveMessage: function () {
        return !_.isEmpty(this.props.message)
            ? <div className="successSave"><b>{this.props.message.content}</b></div>
            : null;
    },

    render: function () {
        if (this.props.items.length <= 0) return null;
        const contextLabel = () => {
            if (this.props.context.current == Properties.ROUTE.CONTEXTS.CREATE) return 'Создание';
            if (this.props.context.current == Properties.ROUTE.CONTEXTS.EDIT) return 'Редактирование';
            if (this.props.context.current == Properties.ROUTE.CONTEXTS.WATCH) return 'Просмотр';
            return '';
        };
        return (
            <div id="routeList">
                <small style={{color: 'white'}}>{contextLabel()}</small>
                {this.renderSaveMessage()}
                {this.renderErrorMessage()}
                {this.renderEntertainments()}
                {this.renderClearButton()}
                {this.renderSaveButton()}
            </div>
        );
    }
});

RouteList.propTypes = {
    items: React.PropTypes.array.isRequired,
    isAuthorized: React.PropTypes.bool.isRequired,
    context: React.PropTypes.object.isRequired,
    error: React.PropTypes.object.isRequired,
    message: React.PropTypes.object.isRequired,
    userLocation: React.PropTypes.object.isRequired
};

module.exports = RouteList;