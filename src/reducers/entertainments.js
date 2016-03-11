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
    /*console.log("Ents reduced");
    console.log(state);*/
    switch(action.type)
    {
        case Actions.REQUEST_ENTERTAINMENTS:
            return Object.assign({}, state, {isFetching: true});

        /*case Actions.ADD_PARTICULAR_ENTERTAINMENTS:

            //Очень страшный по перформансу костыль
            // TODO: Бейте меня палками пока не уберу это!!!

            var what = state.Entertainments;
            var from = _.indexBy([].concat(state.cafe, state.restaurant, state.bar, state.club), 'id');

            var toAdd = what.filter(x => from[x.id]);

            return state;*/

        case Actions.RECEIVE_ENTERTAINMENTS:
            switch (action.payload.entertainmentsType) {
                case Properties.ENTERTAINMENT.TYPE.CAFE:
                    return Object.assign({}, state, {isFetching: false, cafe: action.payload.entertainments});

                case Properties.ENTERTAINMENT.TYPE.RESTAURANT:
                    return Object.assign({}, state, {isFetching: false, restaurant: action.payload.entertainments});

                case Properties.ENTERTAINMENT.TYPE.BAR:
                    return Object.assign({}, state, {isFetching: false, bar: action.payload.entertainments});

                case Properties.ENTERTAINMENT.TYPE.CLUB:
                    return Object.assign({}, state, {isFetching: false, club: action.payload.entertainments});

                default:
                    return state;
            }
        case Actions.ERROR_ENTERTAINMENTS:
        default:
            return state;
    }
}

module.exports = entertainments;