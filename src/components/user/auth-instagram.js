/**
 * Created by debal on 18.03.2016.
 */
var React = require('react');

var Properties = require('../../const/properties');

var AuthInstagramSpring = React.createClass({

    render: function () {
        return (
            <div>
                <a href={Properties.API.LOGIN + "/instagram"}>
                    <button className="pure-button pure-button-primary">
                        <i className="fa fa-instagram"/> &nbsp;Войти через Instagram
                    </button>
                </a>
            </div>
        );
    }
});

module.exports = AuthInstagramSpring;