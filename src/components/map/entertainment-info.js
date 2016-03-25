/**
 * Created by aolSvt on 03.03.2016.
 */
var React = require('react');
var Actions = require('../../actions/routes');
var UserActions = require('../../actions/user');
var Properties = require('../../const/properties');
var classNames = require('classnames');

// Немного изменил - теперь сюда передаётся объект entertainment полностью
var EntertainmentInfo = React.createClass({
    // К моменту создания контекст теряется!
    /*contextTypes: {
        store: React.PropTypes.object.isRequired
    },*/
    getInitialState: function() {
        var like = false;
        if (this.props.store.getState().User.likedEntIds.indexOf(this.props.entertainment.id)>0){
            like = true;
        }
        var num = Math.floor(Math.random()*(20-5+1))+5;
        return {numLikes: num, liked: like}
    },
    likeEnt: function(){
        if (!this.props.store.getState().User.isAuthorized) return;
        if (!this.state.liked){
            this.props.store.dispatch(UserActions.likeEnt(this.props.entertainment.id));
            var i = this.state.numLikes+1;
            this.setState({numLikes: i});
            this.setState({liked: true});
        }
        else {
            var i = this.state.numLikes-1;
            this.setState({numLikes: i});
            this.setState({liked: false})
        }
    },
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
        var colorStyle = classNames({
            'fa fa-2x fa-heart standart-coursor liked': this.state.liked,
            'fa fa-2x fa-heart standart-coursor': !this.state.liked
        })
        return (
            <div className="pop-up">
                {this.props.entertainment.type}<br/>
                <b>Название: </b>{this.props.entertainment.title} <br/>
                <b>Район: </b>{this.props.entertainment.zoneTitle} <br/>
                <b>Средняя стоимость: </b>{this.props.entertainment.cost} <br/>
                <i><b>{this.state.numLikes}</b></i>
                <i onClick={this.likeEnt} className={colorStyle}/>
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