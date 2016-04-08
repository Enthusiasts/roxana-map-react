/**
 * Created by debal on 01.03.2016.
 */
var _ = require('underscore');

//Spring
const baseUri = window.location.protocol + "//" + window.location.host;
const entTypePairs = [['CAFE', "Кафе"], ['RESTAURANT', "Рестораны"], ['BAR', "Бары"], ['CLUB', "Клубы"], ['CHEAT', 'Чит']];
const entTypePairsFirst = entTypePairs.map(x => x[0]);
const entTypePairsLast = entTypePairs.map(x => x[1]);

module.exports = {
    // Roxana Web Api settings
    API: {
        ROOT: baseUri + "/spring/",
        ROUTES: baseUri + "/routes/",
        LOGIN: baseUri + "/login",
        USER: baseUri + "/user"
    },

    // Map settings
    MAP: {
        CENTER: {
            LATITUDE: 55.75,
            LONGITUDE: 37.61
        },
        ZOOM: 11
    },

    // Entertainments types
    ENTERTAINMENT: {
        TYPE: {
            ..._.object(entTypePairsFirst, entTypePairsFirst),
            EN2RU: _.object(entTypePairsFirst, entTypePairsLast),
            RU2EN: _.object(entTypePairsLast, entTypePairsFirst),
            ALL_EN: entTypePairsFirst,
            ALL_RU: entTypePairsLast,
            translate: function (ofType) {
                //console.warn('Translate is deprecated since we got fancy underscore :)');
                return this.EN2RU[ofType];
                //console.log(this);
            }
        }
    },

    //Route setting
    ROUTE: {
        LIST: {
            MAX_NUMBER: 7
        },
        CONTEXTS: {
            CREATE: 'CREATE',
            EDIT: 'EDIT',
            WATCH: 'WATCH'
        }
    },

    CLUSTER: {
        TYPE: {
            COST: 'cost',
            LIKE: 'like',
            CHECKIN: 'checkin'
        },
        min: function (clusterType) {
            switch (clusterType) {
                case this.TYPE.COST:
                default:
                    return 1
            }
        },
        max: function (clusterType) {
            switch (clusterType) {
                case this.TYPE.COST:
                    return 4;
                default:
                    return 4
            }
        }
    },
    FOCUS: {
        ZOOM: 16
    }
};