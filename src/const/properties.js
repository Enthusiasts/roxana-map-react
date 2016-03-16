/**
 * Created by debal on 01.03.2016.
 */
//Spring
const baseUri = "http://127.0.0.1:3000";

module.exports = {
    // Roxana Web Api settings
    API: {
        ROOT: baseUri + "/spring/",
        ROUTES: baseUri + "/routes/"
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
        TYPE:{
            CAFE: 'CAFE',
            RESTAURANT: 'RESTAURANT',
            BAR: 'BAR',
            CLUB: 'CLUB',
            translate: function(ofType){
                switch (ofType) {
                    case this.CAFE:
                        return "Кафе";
                    case this.RESTAURANT:
                        return "Ресторан";
                    case this.BAR:
                        return "Бары";
                    case this.CLUB:
                        return "Клуб";
                }
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
    }
};