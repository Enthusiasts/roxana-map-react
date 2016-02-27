/**
 * Created by debal on 27.02.2016.
 */
var React = require('react');

var UserInfo = React.createClass({

    render: function()
    {
        return (
            <div className="container">
                <div className="row">
                    <div className="span4 well">
                        <div className="row">
                            <div className="span1">
                                <a href={this.props.profileUrl} className="thumbnail">
                                    <img src={this.props.profileImage} alt="" />
                                </a>
                            </div>
                            <div className="span3">
                                <p>{this.props.profileLogin}</p>
                                <p><strong>{this.props.profileName}</strong></p>
                                <span className="label label-success">{this.props.profilePhotosCount} фото</span>
                                <span className="label label-primary">{this.props.profileFollowersCount} подписчиков</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = UserInfo;