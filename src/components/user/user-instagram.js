/**
 * Created by debal on 27.02.2016.
 */
var React = require('react');
var $ = require('jquery');

var UserInfo = require('./info-instagram');
var AuthInstagram = require('./auth-instagram-spring');
var Properies = require('../../const/properties');

const url = Properies.API.ROOT;

var UserMenu = React.createClass({
    getInitialState: function()
    {
        return {
            isAuthenticated: false
        };
    },

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
                console.log(useful);
                this.setState({
                    isAuthenticated: true,
                    profile: {
                        url: "https://instagram.com/" + useful.username,
                        image: useful.profile_picture,
                        login: useful.username,
                        name: useful.full_name,
                        photosCount: useful.counts.media,
                        followersCount: useful.counts.followed_by
                    }
                });
            }.bind(this),
            error: function () {
                console.log("failed");
                this.setState({
                    isAuthenticated: false
                });
            }.bind(this)
        })
    },

    render: function()
    {
        if (this.state.isAuthenticated)
        {
            return (
                <UserInfo
                    profileUrl={this.state.profile.url}
                    profileImage={this.state.profile.image}
                    profileLogin={this.state.profile.login}
                    profileName={this.state.profile.name}
                    profilePhotosCount={this.state.profile.photosCount}
                    profileFollowersCount={this.state.profile.followersCount}
                />
            );
        }
        else return <AuthInstagram authCallback={this.fetchUserData}/>
    }
});

module.exports = UserMenu;
