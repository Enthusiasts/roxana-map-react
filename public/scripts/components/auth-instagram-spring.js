/**
 * Created by debal on 25.02.2016.
 */
var React = require('react');
var $ = require('jquery');

var AuthInstagramSpring = React.createClass({
    getInitialState: function()
    {
        return ({
            isPopouted: false
        });
    },

    componentDidMount: function()
    {
        $.ajax({
            url: "http://127.0.0.1:8100/user",
            dataType: "json"
        })
            .done(function (data) {
                console.log(data);
            })
            .fail(function(){
                console.log("failed");
            });
    },

    popoutOpen: function()
    {
        //Открываем попаут. Окно будет сохранено в состоянии компонента.
        var popout = window
            .open(
                "http://127.0.0.1:8100/login/instagram",
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
                var code;
                var state;
                if (this.state.popout.location.hostname == window.location.hostname
                        && this.state.popout.location.port == window.location.port
                        && this.state.popout.location.pathname == "/")
                {
                    console.log("redirected back");
                    console.log(this.state.popout.location.search);

                    //this.authorize(code, state);

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

    fetchUserInfo: function()
    {
        $.ajax({
                url: "http://127.0.0.1:8100/user",
                method: "GET",
                dataType: "json",
                success: function(data)
                {
                    //Yay!
                }
            })
    },

    render: function()
    {
        if (!this.state.isPopouted)
        {
            return (
                <div>
                    <a onClick= {this.popoutOpen} className="btn btn-block btn-social btn-instagram">
                        <span className="fa fa-instagram" /> Войти
                    </a>
                </div>
            );
        }
        else
        {
            return (
                <div>
                    <a className="btn btn-block btn-social btn-instagram">
                        <span className="glyphicon glyphicon-refresh glyphicon-refresh-animate" /> Подождите...
                    </a>
                </div>
            );
        }
    }
});

module.exports = AuthInstagramSpring;