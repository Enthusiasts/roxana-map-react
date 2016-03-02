/**
 * Created by debal on 02.03.2016.
 */
var Actions = require('../actions/entertainments');
var Properties = require('../const/properties');

// TODO: Object.assign
function entertainments(state = {
    isFetching: false,
    cafe: [],
    restaurant: [],
    bar: [],
    club: []
}, action)
{
    switch(action.type)
    {
        case Actions.REQUEST_ENTERTAINMENTS:
            return {
                isFetching: true,
                cafe: state.cafe,
                restaurant: state.restaurant,
                bar: state.bar,
                club: state.club
            };
        case Actions.RECEIVE_ENTERTAINMENTS:
            switch (action.payload.entertainmentsType) {
                case Properties.ENTERTAINMENT_TYPE.CAFE:
                    return {
                        isFetching: false,
                        cafe: action.payload.entertainments,
                        restaurant: state.restaurant,
                        bar: state.bar,
                        club: state.club
                    };
                case Properties.ENTERTAINMENT_TYPE.RESTAURANT:
                    return {
                        isFetching: false,
                        cafe: state.cafe,
                        restaurant: action.payload.entertainments,
                        bar: state.bar,
                        club: state.club
                    };
                case Properties.ENTERTAINMENT_TYPE.BAR:
                    return {
                        isFetching: false,
                        cafe: state.cafe,
                        restaurant: state.restaurant,
                        bar: action.payload.entertainments,
                        club: state.club
                    };
                case Properties.ENTERTAINMENT_TYPE.CLUB:
                    return {
                        isFetching: false,
                        cafe: state.cafe,
                        restaurant: state.restaurant,
                        bar: state.bar,
                        club: action.payload.entertainments
                    };
                default:
                    return state;
            }
    }
}