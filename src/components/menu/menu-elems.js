/**
 * Created by Vlad on 26.02.2016.
 */

var React = require('react');

var MenuElem = React.createClass({
    render: function(){
        return  (
            //<div id="navTabs">
            //    <ul className="nav nav-tabs">
            //        <li role="presentation" className="active"><a href="#">Я не знаю,что ищю</a></li>
            //        <li role="presentation" className=""><a href="#">Я знаю,что ищю</a></li>
            //    </ul>
            //</div>
            <div className="pure-menu custom-restricted-menu">

                <ul className="pure-menu-list">
                    <li className="pure-menu-heading">Кнопоки Фомича</li>
                    <li className="pure-menu-item"><a href="#" className="pure-menu-link">Кафе</a></li>
                    <li className="pure-menu-item"><a href="#" className="pure-menu-link">Ресторан</a></li>
                    <li className="pure-menu-item"><a href="#" className="pure-menu-link">Бар</a></li>
                    <li className="pure-menu-item"><a href="#" className="pure-menu-link">Клуб</a></li>
                </ul>
            </div>
        );
    }

});

module.exports = MenuElem;