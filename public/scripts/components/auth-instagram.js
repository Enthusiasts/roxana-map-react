/**
 * Created by debal on 25.02.2016.
 */
var React = require('react');

var AuthInstagram = React.createClass({
    getInitialState: function()
    {
        return ({
            isPopouted: false
        });
    },

    popoutOpen: function()
    {
        //Открываем попаут. Окно будет сохранено в состоянии компонента.
        var popout = window
            .open(
                "https://api.instagram.com/oauth/authorize/?" +
                "client_id=" + "93fb6da36d2b40fc859a3c700935c636" +
                "&redirect_uri=" + encodeURIComponent("http://127.0.0.1:8080/") +
                "&response_type=code",
                "Sign In",
                "width=400,height=400"
            );

        //Каждую секунду проверяем, не закрылось ли окно с аутентификацией.
        const intervalId = setInterval(function()
        {
            if (!this.state.popout)
            {
                clearInterval(this.state.intervalId);
                console.log("lost popout...")
            }
            else if (this.state.popout.closed)
            {
                clearInterval(this.state.intervalId);
                console.log("closing");
                this.setState({
                    isPopouted: false
                });
            }
        }.bind(this), 1000);

        //Переводим компонент в состояние ожидания закрытия попаута.
        this.setState({
            isPopouted: true,
            popout: popout,
            intervalId: intervalId
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

module.exports = AuthInstagram;