/**
 * Created by Vlad on 03.03.2016.
 */
var React = require('react');
var classNames = require('classnames');
var Properties = require('../../const/properties');

var NavKnownElem = require('./nav-known-elem');
var RouteTrace = require('../route/route-container');


var NavKnown = React.createClass({
    getInitialState: function() {
        return {i1: false, i2: false, i3: false, i4: false}
    },
    onclick1: function(){
        if (!this.state.i1) this.setState({i1: true })
        else this.setState({i1:false})
    },
    onclick2: function(){
        if (!this.state.i2) this.setState({i2: true })
        else this.setState({i2:false})
    },
    onclick3: function(){
        if (!this.state.i3) this.setState({i3: true })
        else this.setState({i3:false})
    },
    onclick4: function(){
        if (!this.state.i4) this.setState({i4: true })
        else this.setState({i4:false})
    },

    render: function(){

        var classi1 = classNames({
            'fa fa-rub chosen': this.state.i1,
            'fa fa-rub': !this.state.i1
        });
        var classi2 = classNames({
            'fa fa-rub chosen': this.state.i2,
            'fa fa-rub': !this.state.i2
        });
        var classi3 = classNames({
            'fa fa-rub chosen': this.state.i3,
            'fa fa-rub': !this.state.i3
        });
        var classi4 = classNames({
            'fa fa-rub chosen': this.state.i4,
            'fa fa-rub': !this.state.i4
        });

        return (
            <div id="knownMenuList">
                <div className="form-group has-feedback ">
                    <input type="text" className="form-control squaredBorders" placeholder="Выберите место" />
                    <i className="glyphicon glyphicon-search form-control-feedback"/>
                </div>
                <div className="container-fluid typeFilter">
                    <ul className="pure-menu-list col-xs-12 col-sm-6">
                        <li className="pure-menu-heading"><b>Заведения</b></li>
                        <NavKnownElem type={Properties.ENTERTAINMENT.TYPE.CAFE} />
                        <NavKnownElem type={Properties.ENTERTAINMENT.TYPE.BAR} />
                        <NavKnownElem type={Properties.ENTERTAINMENT.TYPE.RESTAURANT} />
                        <NavKnownElem type={Properties.ENTERTAINMENT.TYPE.CLUB}/>
                    </ul>
                    <div className="col-xs-12 col-sm-6 cpFilter">
                        <b>Стоимость</b>
                        <div id="priceRange">
                            <i onClick={this.onclick1} className={classi1}/> &nbsp;
                            <i onClick={this.onclick2} className={classi2}/> &nbsp;
                            <i onClick={this.onclick3} className={classi3}/> &nbsp;
                            <i onClick={this.onclick4} className={classi4}/>
                        </div>
                    </div>
                </div>
                <RouteTrace/>
            </div>
        )
    }
});

module.exports = NavKnown;