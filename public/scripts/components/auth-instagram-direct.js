/**
 * Created by debal on 25.02.2016.
 */
var React = require('react');
var $ = require('jquery');

var AuthInstagramDirect = React.createClass({
    getInitialState: function()
    {
        return ({
            isPopouted: false
        });
    },

    componentDidMount: function()
    {
        //TODO: check local storage
    },

    popoutOpen: function()
    {
        //Открываем попаут. Окно будет сохранено в состоянии компонента.
        var popout = window
            .open(
                "https://api.instagram.com/oauth/authorize/?" +
                "client_id=" + "93fb6da36d2b40fc859a3c700935c636" +
                "&redirect_uri=" + encodeURIComponent("http://127.0.0.1:8100/") +
                "&response_type=token",
                "Sign In",
                "width=400,height=400"
            );

        //Каждую секунду проверяем, не закрылось ли окно с аутентификацией.
        const intervalId = setInterval(function()
        {
            if (!this.state.popout)
            {
                clearInterval(this.state.intervalId);
                console.log("lost popout...");
            }
            else
            {
                if (this.state.popout.location.hostname == window.location.hostname
                        && this.state.popout.location.port == window.location.port
                        && this.state.popout.location.pathname == "/")
                {
                    console.log("redirected back");

                    var token = /access_token=([^&]+)/.exec(this.state.popout.location.hash)[1];
                    console.log(token);

                    this.getuserinfo(token);

                    this.state.popout.close();
                }
                if (this.state.popout.closed)
                {
                    clearInterval(this.state.intervalId);
                    console.log("closing");

                    this.setState({
                        isPopouted: false
                    });
                }
            }
        }.bind(this), 1000);

        //Переводим компонент в состояние ожидания закрытия попаута.
        this.setState({
            isPopouted: true,
            popout: popout,
            intervalId: intervalId
        });
    },

    getuserinfo: function (token)
    {
        $.ajax({
                url: "https://api.instagram.com/v1/users/self",
                type: "GET",
                data: {
                    client_id: "93fb6da36d2b40fc859a3c700935c636",
                    access_token: token
                },
                dataType: "jsonp",
                success: function(data) {
                    console.log(data);
                },
                error: function() {
                    console.log("auth failed :(");
                }
            });

    },

    render: function()
    {
        if (!this.state.isPopouted)
        {
            return (

                <div className="authButton">
                    <a onClick= {this.popoutOpen} className="pure-button">
                        <i className="fa fa-instagram"> </i>
                        <spam>&nbsp;&nbsp; Войти</spam>
                    </a>
                </div>
            );
        }
        else
        {
            return (
                <div className="authButton">
                    <a className="pure-button">
                        <i className="fa fa-cog"> </i>
                        <spam>&nbsp;&nbsp; Подождите...</spam>
                    </a>
                </div>
            );
        }
    }
});

module.exports = AuthInstagramDirect;
