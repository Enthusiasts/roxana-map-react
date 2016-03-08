/**
 * Created by debal on 25.02.2016.
 */
var React = require('react');
var Swipable = require('react-swipeable');
var classNames = require('classnames');

var Menu = require('./menu/menu');
var MapContainer = require('./map/map-container');

var RoxanaApp = React.createClass({
    getInitialState: function(){
        return {swiped: false}
    },
    swipedRight: function(){
        console.log("I work")
        this.setState({swiped: true})
    },
    swipedLeft: function(){
        this.setState({swiped: false})
    },
    render: function()
    {
        var classname = classNames({
            'active': this.state.swiped,
            '': !this.state.swiped
        });
        return (
            <Swipable onSwipedRight={this.swipedRight} onSwipedLeft={this.swipedLeft}>
                <div className="heighted">
                    <div className="header">
                        <img src="style/image/logo.svg" alt=""/><span><b>ay To Go!</b></span>
                    </div>
                    <a href="#menu" id="menuLink" className="menu-link">
                        <span></span>
                    </a>
                    <Menu propClass={classname}/>
                    <MapContainer />
                </div>
            </Swipable>
        )
    }
});

module.exports = RoxanaApp;