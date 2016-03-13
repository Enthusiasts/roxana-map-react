/**
 * Created by debal on 01.03.2016.
 */
//Spring
module.exports = {
    // Roxana Web Api settings
    API: {
        ROOT: "http://ec2-52-18-236-104.eu-west-1.compute.amazonaws.com/spring/"
    },

    // Map settings
    MAP: {
        CENTER: [55.75, 37.61],
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