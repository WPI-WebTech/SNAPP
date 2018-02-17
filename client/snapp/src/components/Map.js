import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/**
 * Google Maps component, should only be used within MapContainer
 */
class Map extends Component {

    componentDidMount() {
        this.loadMap();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
    }

    // load map once Google Maps api is ready
    loadMap() {
        if (this.props && this.props.google) {
            // google is available
            const {google} = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            let zoom = 13;
            let lat = 42.273238;
            let lng = -71.808337;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign({}, {
                center: center,
                zoom: zoom
            });
            this.map = new maps.Map(node, mapConfig);

            // add 1 mile radius to map
            const mileRadius = new maps.Circle({
                strokeColor: '#00FF00',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#00FF00',
                fillOpacity: 0.1,
                map: this.map,
                center: center,
                radius: 1609.34, // 1609.34 meters = 1 mile
                clickable: false,
            });
        }
    }

    render() {
        const style = {
            width: '100%',
            height: '300px'
        };
        return (
            <div style={style} ref='map'>
                Loading...
            </div>
        )
    }
}

export default Map;