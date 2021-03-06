/**
 * Created by Vlad on 26.02.2016.
 */

var React = require('react');
var classNames = require('classnames');
var NavUnknown = require('./nav-unknown');
var NavKnown = require('./nav-known');

var MenuElem = React.createClass({
    getInitialState: function(){
      return {unSelected: true}
    },

    onclick1: function(){
      this.setState({unSelected: true })
    },

    onclick2: function(){
        this.setState({unSelected: false})
    },

    submenu: function(){
        if (this.state.unSelected) return <NavKnown/>
        else return <NavUnknown/>

    },

    render: function(){
        var unKnownClass = classNames({
            'active': !this.state.unSelected,
            'disactive': this.state.unSelected
        });
        var knownClass = classNames({
            'active': this.state.unSelected,
            'disactive': !this.state.unSelected
        });
        return  (
            <div id="navTabs">
                <ul id="tabList" className="nav nav-tabs">
                    <li role="presentation" className={knownClass}><a onClick = {this.onclick1}><b>Маршруты</b></a></li>
                    <li role="presentation" className={unKnownClass}><a onClick = {this.onclick2}><b>Личный кабинет</b></a></li>
                </ul>
                {this.submenu()}
            </div>


        );
    }

});

module.exports = MenuElem;