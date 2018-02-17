import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from './Map';

/**
 * Main component to display Google Maps
 */
class MapContainer extends Component {
    render() {
        if (!this.props.loaded) {
            return <div>Loading Map...</div>
        }
        return (
            <Map google={this.props.google}>
                
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDb7pzdnEJJlClx4-enDHkTJR81yDg3HVs'
})(MapContainer);