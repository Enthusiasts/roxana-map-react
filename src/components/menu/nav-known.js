/**
 * Created by Vlad on 03.03.2016.
 */
var React = require('react');
var classNames = require('classnames');
var Properties = require('../../const/properties');
var Actions = require('../../actions/routes');
var Filters = require('../../actions/filters');
var Entertainments = require('../../actions/entertainments');
var LikeCluster = require('./RouteFilters/like-cluster');
var CheckinCluster = require('./RouteFilters/checkin-cluster');
var SearchLine = require('./MenuComponents/search-line');

var NavKnownElem = require('./nav-known-elem');
var RouteTrace = require('../route/route-container');


var NavKnown = React.createClass({
    contextTypes: {
        store: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
        return {showFiltesrs: false, cost: []}
    },

    setCost (rub) {
        return function(){
            var temp = this.state.cost;

            if (!this.state.cost.includes(rub)) {
                temp.push(rub);
            }
            else {
                temp = temp.filter(x=> x != rub);
            }

            this.setState({cost: temp});
            this.context.store.dispatch(Entertainments.showClusterType(Properties.CLUSTER.TYPE.COST,true, temp));
        }.bind(this)
    },


    offerRouteList: function () {
        //После добавления контекст автоматически перейдёт в режим создания
        this.context.store.dispatch(Actions.offerRouteList());
    },

    addFilters: function () {
        this.setState({showFiltesrs: !this.state.showFiltesrs});
    },

    handleChange: function (event) {
        this.context.store.dispatch(Filters.setCountPoints(Number(event.target.value)));
    },

    checkBoxHandler: function (name) {
        return (event) => {
            this.context.store.dispatch(Filters.setCheckBoxValue(name, event.target.checked));
        }


    },

    render: function () {

        var classi1 = classNames({
            'fa fa-rub chosen': this.state.cost.includes(1),
            'fa fa-rub': !this.state.cost.includes(1)
        });
        var classi2 = classNames({
            'fa fa-rub chosen': this.state.cost.includes(2),
            'fa fa-rub': !this.state.cost.includes(2)
        });
        var classi3 = classNames({
            'fa fa-rub chosen': this.state.cost.includes(3),
            'fa fa-rub': !this.state.cost.includes(3)
        });
        var classi4 = classNames({
            'fa fa-rub chosen': this.state.cost.includes(4),
            'fa fa-rub': !this.state.cost.includes(4)
        });
        var showFilters = classNames({
            'show': this.state.showFiltesrs,
            'hide': !this.state.showFiltesrs
        });

        return (
            <div id="knownMenuList">
                <SearchLine/>
                <div className="container-fluid typeFilter">
                    <div className="col-xs-12 col-sm-6">
                        <ul className="pure-menu-list">
                            <li className="pure-menu-heading"><b>Заведения</b></li>
                            <NavKnownElem type={Properties.ENTERTAINMENT.TYPE.CAFE}/>
                            <NavKnownElem type={Properties.ENTERTAINMENT.TYPE.BAR}/>
                            <NavKnownElem type={Properties.ENTERTAINMENT.TYPE.RESTAURANT}/>
                            <NavKnownElem type={Properties.ENTERTAINMENT.TYPE.CLUB}/>
                            <li className="pure-menu-item" style={{borderTop: 1 +"px solid white"}}>
                                <a id="addFilters" className="pure-menu-link"  onClick={this.addFilters}>Настроить</a></li>
                        </ul>

                        <div id="filterScope" className={showFilters}>
                            <ul className="pure-menu-list">
                                <li>
                                    <small>Число завдений</small> <br/>
                                    <input style={{width: 50 + "px"}} min="2" max={Properties.ROUTE.LIST.MAX_NUMBER} placeholder="2" type="number" onChange={this.handleChange}/>
                                </li>
                                <li>
                                    <small>Likes:</small>
                                    &nbsp;
                                    <input type="checkbox" onClick={this.checkBoxHandler('useLikes')}/>
                                </li>
                                <li>
                                    <small>Стоимость:</small>
                                    &nbsp;
                                    <input type="checkbox" onClick={this.checkBoxHandler('useCost')}/>
                                </li>
                                <li>
                                    <small>Ближайщие:</small>
                                    &nbsp;
                                    <input type="checkbox" onClick={this.checkBoxHandler('useNear')}/>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6 cpFilter">
                        <div className="range cost">
                            <b>Стоимость</b> <br/>
                            <i onClick={this.setCost(1)} className={classi1} title="Менее 700"/> &nbsp;
                            <i onClick={this.setCost(2)} className={classi2} title="700-1500"/> &nbsp;
                            <i onClick={this.setCost(3)} className={classi3} title="1500-2500"/> &nbsp;
                            <i onClick={this.setCost(4)} className={classi4} title="Более 2500"/>
                        </div>
                        <LikeCluster/>
                        <CheckinCluster/>
                        <button id="buildRoute" className="btn btn-danger squaredBorders" onClick={this.offerRouteList}>
                            Построить маршрут
                        </button>
                    </div>
                </div>

                <RouteTrace/>


            </div>

        )
    }
});

module.exports = NavKnown;
