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

    componentWillMount: function () {
        if (this.props.store.getState().User.isAuthorized) {
            fetch(Properties.API.ENTERTAINMENTS + "/medias?id=" + this.props.entertainment.id, {
                mode: "same-origin",
                credentials: "same-origin"
            })
                .then(response => response.json())
                .then(json => {
                    this.setState({
                        isShown: true,
                        numLikes: json.left.likesNumberTotal,
                        medias: json.middle,
                        liked: this.props.liked
                    });
                });
        } else {
            fetch(Properties.API.ROOT + "/entertainments/" + this.props.entertainment.id)
                .then(response => response.json())
                .then(json => {
                    this.setState({
                        isShown: true,
                        numLikes: json.likesNumberTotal,
                        liked: this.props.liked
                    });
                });
        }
    },
    renderImages: function () {
        if (typeof this.state.medias !== "undefined") {
            var temp = this.state.medias;
            return temp.map (
                ent => {
                    if (ent.type == "image")
                    return (
                        <a href={ent.link} target="_blank">
                            <img src={ent.thumbnail} alt=""/>
                        </a>
                    )
                }).slice(0,12);
        }
        return null;
    },

    getInitialState: function () {
        //var liked = this.props.store.getState().User.likedEntIds.indexOf(this.props.entertainment.id) >= 0;
        //var num = Math.floor(Math.random()*(20-5+1))+5;
        var numLikes = 0;
        return {isShown: false, numLikes, liked: this.props.liked}
    },

    likeEnt: function () {
        if (!this.props.store.getState().User.isAuthorized) return;
        this.props.store.dispatch(UserActions.likeEntAndSave(this.props.entertainment.id, this.state.liked));
        this.setState({
            isShown: true,
            numLikes: !this.state.liked ? this.state.numLikes + 1 : this.state.numLikes - 1,
            liked: !this.state.liked
        });
    },

    addToRouteList: function () {
        //TODO: вынести на уровень props
        var routeContext = this.props.store.getState().Routes.context;
        const Contexts = Properties.ROUTE.CONTEXTS;

        if ([Contexts.EDIT, Contexts.CREATE].every(x => x != routeContext.current)) {
            this.props.store.dispatch(Actions.setContext(Contexts.CREATE, {}));
        }

        // currentRoute - нужен для перерисовывания маршрута на карте
        // TODO: костыль? подумать
        var currentRoute = this.props.store.getState().Routes.items;
        this.props.store.dispatch(Actions.addRouteItemAndRenderPath(this.props.entertainment, currentRoute));
    },

    renderAddToRouteListButton: function () {
        var currentRoute = this.props.store.getState().Routes.items;

        // Проверяем, есть ли такое заведение в списке или иcчерпан ли лимит маршрута
        return (currentRoute.some(ent => ent.id === this.props.entertainment.id)
        || currentRoute.length >= Properties.ROUTE.LIST.MAX_NUMBER)
            ? null
            : <button onClick={this.addToRouteList} className="btn btn-primary squaredBorders">Добавить к
            маршруту</button>;
    },

    render: function () {
        var colorStyle = classNames({
            'fa fa-2x fa-heart standart-coursor liked': this.state.liked,
            'fa fa-2x fa-heart standart-coursor': !this.state.liked
        });
        if (!this.state.isShown) return (
            <div className="pop-up"></div>
        );
        return (
            <div className="pop-up">
                <div className="imageHolder">
                    {this.renderImages()}
                </div>
                <b>{this.props.entertainment.type}</b><br/>
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
    liked: React.PropTypes.bool.isRequired,
    // ! Передаём как props потому что к моменту создания this.context теряется!
    store: React.PropTypes.object.isRequired
};

module.exports = EntertainmentInfo;