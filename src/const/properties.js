/**
 * Created by debal on 01.03.2016.
 */
//Spring
module.exports = {
    // Roxana Web Api settings
    API_ROOT: "http://127.0.0.1:8100/",

    // Map settings
    MAP_CENTER: [55.75, 37.61],
    MAP_ZOOM: 11,

    // Entertainments types
    ENTERTAINMENT_TYPE: {
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
};