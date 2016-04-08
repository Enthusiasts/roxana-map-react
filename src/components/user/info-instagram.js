/**
 * Created by debal on 27.02.2016.
 */
var React = require('react');

var UserInfo = React.createClass({

    render: function()
    {
        return (
            <div className="authPanel">
                    <div className="authPanelImg">
                        <a href={this.props.profileUrl} target="_blank">
                            <img src={this.props.profileImage} alt="" className="img-circle" />
                        </a>
                    </div>
                    <div className="authPanelInfo">
                        <p>{this.props.profileLogin}</p>
                        <p><strong>{this.props.profileName}</strong></p>
                        <div className="spanInfo">
                            <span className="label label-success squaredBorders">{this.props.profilePhotosCount} фото</span> <br/>
                            <span className="label label-primary squaredBorders">{this.props.profileFollowersCount} подписчиков</span>
                        </div>

                        <a href="/logout" className="btn btn-danger squaredBorders">Выход</a>
                    </div>
            </div>
        );
    }
});

module.exports = UserInfo;