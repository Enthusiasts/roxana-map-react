/**
 * Created by debal on 27.02.2016.
 */
var React = require('react');
var $ = require('jquery');
var Actions = require('../../actions/user');
var Properies = require('../../const/properties');

var UserInfo = require('./info-instagram');
var AuthInstagram = require('./auth-instagram-spring');

const url = Properies.API.ROOT;

var UserMenu = React.createClass({
    contextTypes: {
        store: React.PropTypes.object.isRequired
    },

    /*getInitialState: function()
    {
        return {
            isAuthenticated: false
        };
    },*/

    componentDidMount: function()
    {
        this.fetchUserData();
    },

    fetchUserData: function()
    {
        console.log("fetching");
        $.ajax({
            url: url + "user",
            dataType: "json",
            success: function(data){
                var useful = data.userAuthentication.details.data;
                //console.log(useful);
                /*this.setState({
                    isAuthenticated: true,
                    profile: {
                        url: "https://instagram.com/" + useful.username,
                        image: useful.profile_picture,
                        login: useful.username,
                        name: useful.full_name,
                        photosCount: useful.counts.media,
                        followersCount: useful.counts.followed_by
                    }
                });*/
                var profile = {
                    url: "https://instagram.com/" + useful.username,
                    image: useful.profile_picture,
                    login: useful.username,
                    name: useful.full_name,
                    photosCount: useful.counts.media,
                    followersCount: useful.counts.followed_by
                };
                console.log(profile);

                this.context.store.dispatch(Actions.setAuthorized(true));

                this.context.store.dispatch(Actions.setUserInfo(profile));
            }.bind(this),

            error: function () {
                console.log("failed");
                /*this.setState({
                    isAuthenticated: false
                });*/
                this.context.store.dispatch(Actions.setAuthorized(false));
            }.bind(this)
        })
    },

    render: function()
    {
        if (this.context.store.getState().User.isAuthorized)
        {
            var profile = this.context.store.getState().User.userInfo;
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
        else return <AuthInstagram authCallback={this.fetchUserData}/>
    }
});

module.exports = UserMenu;
