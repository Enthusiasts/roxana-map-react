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
        return {menuOpen: false}
    },
    swipedRight: function(){
        console.log("I work")
        this.setState({menuOpen: true})
    },
    swipedLeft: function(){
        this.setState({menuOpen: false})
    },
    linkClick: function(){
        if (!this.state.menuOpen){this.setState({menuOpen: true})}
        else {this.setState({menuOpen: false})}

    },
    render: function()
    {
        var classname = classNames({
            'active': this.state.menuOpen,
            '': !this.state.menuOpen
        });
        var linkClass = classNames({
            'menu-link active': this.state.menuOpen,
            'menu-link': !this.state.menuOpen
        });
        return (
            <Swipable onSwipedRight={this.swipedRight} onSwipedLeft={this.swipedLeft}>
                <div className="heighted">
                    <div className="header">
                        <img src="style/image/logo.svg" alt=""/><span id="headerSpan"><b>ay To Go!</b></span>
                    </div>
                    <a href="#menu" id="menuLink" className={linkClass} onClick={this.linkClick}>
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