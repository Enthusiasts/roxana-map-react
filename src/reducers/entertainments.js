/**
 * Created by debal on 02.03.2016.
 */
var Actions = require('../actions/entertainments');
var Properties = require('../const/properties');

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
            return Object.assign({}, state, {isFetching: true});
            /*{
                isFetching: true,
                cafe: state.cafe,
                restaurant: state.restaurant,
                bar: state.bar,
                club: state.club
            };*/
        case Actions.RECEIVE_ENTERTAINMENTS:
            switch (action.payload.entertainmentsType) {
                case Properties.ENTERTAINMENT_TYPE.CAFE:
                    return Object.assign({}, state, {isFetching: false, cafe: action.payload.entertainments});
                    /*return {
                        isFetching: false,
                        cafe: action.payload.entertainments,
                        restaurant: state.restaurant,
                        bar: state.bar,
                        club: state.club
                    };*/
                case Properties.ENTERTAINMENT_TYPE.RESTAURANT:
                    return Object.assign({}, state, {isFetching: false, restaurant: action.payload.entertainments});
                    /*return {
                        isFetching: false,
                        cafe: state.cafe,
                        restaurant: action.payload.entertainments,
                        bar: state.bar,
                        club: state.club
                    };*/
                case Properties.ENTERTAINMENT_TYPE.BAR:
                    return Object.assign({}, state, {isFetching: false, bar: action.payload.entertainments});
                    /*return {
                        isFetching: false,
                        cafe: state.cafe,
                        restaurant: state.restaurant,
                        bar: action.payload.entertainments,
                        club: state.club
                    };*/
                case Properties.ENTERTAINMENT_TYPE.CLUB:
                    return Object.assign({}, state, {isFetching: false, club: action.payload.entertainments});
                    /*return {
                        isFetching: false,
                        cafe: state.cafe,
                        restaurant: state.restaurant,
                        bar: state.bar,
                        club: action.payload.entertainments
                    };*/
                default:
                    return state;
            }
        case Actions.ERROR_ENTERTAINMENTS:
        default:
            return state;
    }
}

module.exports = {
    entertainments
};