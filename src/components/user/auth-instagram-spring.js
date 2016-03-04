/**
 * Created by debal on 25.02.2016.
 */
var React = require('react');
var $ = require('jquery');

var Properties = require('../../const/properties');

const url = Properties.API.ROOT;

var AuthInstagramSpring = React.createClass({
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
                url + "login/instagram?target=" + encodeURIComponent(url),
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
                    console.log(this.state.popout.location.search);

                    // TODO: write custom event!!!
                    //this.props.authCallback();
                    $('#authcallback').click();

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

    render: function()
    {
        if (!this.state.isPopouted)
        {
            return (
                <div>
                    <button onClick= {this.popoutOpen} className="pure-button pure-button-primary">
                        <i className="fa fa-instagram" /> &nbsp;Войти
                    </button>
                    <input id="authcallback" type="hidden" onClick={this.props.authCallback}/>
                </div>
            );
        }
        else
        {
            return (
                <div>
                    <button className="pure-button pure-button-primary">
                        <i className="fa fa-cog animated rotateIn"></i>
                        &nbsp;Подождите...
                    </button>
                    <input id="authcallback" type="hidden" onClick={this.props.authCallback}/>
                </div>

            );
        }
    }
});

module.exports = AuthInstagramSpring;