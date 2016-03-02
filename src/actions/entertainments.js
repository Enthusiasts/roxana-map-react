/**
 * Created by debal on 02.03.2016.
 */
var Actions = require('../const/actions');

const getEntertainmentsOfType = function (entertainmentsType)
{
    return {
        type: Actions.GET_ENTERTAINMENTS_OF_TYPE,
        payload: {
            entertainmentsType
        }
    };
};

module.exports.getEntertainmentsOfType = getEntertainmentsOfType;