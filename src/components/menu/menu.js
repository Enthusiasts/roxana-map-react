/**
 * Created by Vlad on 26.02.2016.
 */

var React = require('react');
var MenuElem = require('./menu-elem');
var UserInstagram = require('../user/user-instagram');

var Menu = React.createClass({
    render: function(){
        return  (
            <div id="menu">

                <div className="pure-menu">
                    <a className="pure-menu-heading" href="#"><img src="style/image/logo.png" alt=""/></a>

                    <form>
                        <input id="search-form" type="search"  placeholder="Поиск" />
                    </form>

                    <ul className="pure-menu-list">
                        <MenuElem bname="Кафе"/>
                        <MenuElem bname="Бар"/>
                        <MenuElem bname="Антикафе"/>
                        <MenuElem bname="Фастфуд"/>
                    </ul>
                </div>
                <UserInstagram />
            </div>
        );
    }
});

module.exports = Menu;