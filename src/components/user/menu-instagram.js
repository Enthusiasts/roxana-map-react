/**
 * Created by debal on 27.02.2016.
 */
var React = require('react');
var Actions = require('../../actions/user');

var UserInfo = require('./info-instagram');
var AuthInstagram = require('./auth-instagram');

var UserMenu = React.createClass({
    contextTypes: {
        store: React.PropTypes.object.isRequired
    },

    propTypes: {
        isAuthorized: React.PropTypes.bool.isRequired,
        userInfo: React.PropTypes.object.isRequired
    },

    componentDidMount: function () {
        this.context.store.dispatch(Actions.fetchUserData());
    },

    render: function () {
        if (this.props.isAuthorized) {
            var profile = this.props.userInfo;
            return (
                <UserInfo
                    profileUrl={profile.url}
                    profileImage={profile.image}
                    profileLogin={profile.login}
                    profileName={profile.name}
                    profilePhotosCount={profile.photosCount}
                    profileFollowersCount={profile.followersCount}
                />
            );
        }
        else return <AuthInstagram/>
    }
});

module.exports = UserMenu;
