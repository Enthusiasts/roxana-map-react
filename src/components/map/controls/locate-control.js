/**
 * Created by debalid on 17.03.2016.
 */
const ReactLeaflet = require('react-leaflet');
const Leaflet = require('leaflet');
const LeafletLocateControl = require('leaflet.locatecontrol');

const MapControl = ReactLeaflet.MapControl;

class LocateControl extends MapControl
{
    componentWillMount()
    {
        this.leafletElement = Leaflet.control.locate({
            position: 'topright',
            follow: 'false'
        });
    }
}

module.exports = LocateControl;