/**
 * Created by debalid on 19.03.2016.
 */
var React = require('react');
var ReactRedux = require('react-redux');

var MenuInstagram = require('./menu-instagram');

const mapStateToProps = (state) =>
{
    return {
        isAuthorized: state.User.isAuthorized,
        userInfo: state.User.userInfo
    };
};

const MenuInstagramContainer = ReactRedux.connect(mapStateToProps)(MenuInstagram);

module.exports = MenuInstagramContainer;