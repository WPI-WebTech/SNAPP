import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestRide, cancelRide } from "../actions/RideActions";
import actionType  from "../constants";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MapContainer from './MapContainer.js';

/**
 * Screen with map and form where users can request rides
 */
class HomeScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fromAddress: '',
            toAddress: '',
            numPassengers: 1,
            accommodations: '',
        }
    }

    // validate user input and request a ride
    requestRide = () => {
        const { fromAddress, toAddress, numPassengers, accommodations } = this.state;
        const numRiders = parseInt(numPassengers, 10);
        if (fromAddress && toAddress && numRiders > 0 && numRiders < 6) {
            this.props.requestRide({ fromAddress, toAddress, numPassengers: numRiders, accommodations });
        }
    };

    // render page content depending on ride status state
    renderPageContent() {
        switch (this.props.rideStatus) {
            case actionType.CANCELLED:
            case actionType.DEFAULT:
                return (
                    <div className="Request-form">
                        <p className="Request-title">Request a Ride</p>
                        <div className="Form-row">
                            <TextField
                                id="pickup"
                                fullWidth={true}
                                className="Form-text-input"
                                type="text"
                                placeholder="Pickup address"
                                value={this.state.fromAddress}
                                onChange={(event) => this.setState({ fromAddress: event.target.value })} />
                        </div>
                        <div className="Form-row">
                            <TextField
                                id="dropoff"
                                fullWidth={true}
                                className="Form-text-input"
                                type="text"
                                placeholder="Drop off address"
                                value={this.state.toAddress}
                                onChange={(event) => this.setState({ toAddress: event.target.value })} />
                        </div>
                        <div className="Form-row">
                            <TextField
                                id="num-of-pass"
                                floatingLabelText="Number of passengers"
                                fullWidth={true}
                                className="Form-num-input"
                                type="number"
                                min={1}
                                max={5}
                                value={this.state.numPassengers}
                                onChange={(event) => this.setState({ numPassengers: event.target.value })} />
                        </div>
                        <div className="Form-row">
                            <TextField
                                id="accomodations"
                                fullWidth={true}
                                className="Form-text-input"
                                type="text"
                                placeholder="Accomodations (baggage, etc.)"
                                value={this.state.accommodations}
                                onChange={(event) => this.setState({ accommodations: event.target.value })} />
                        </div>
                        <RaisedButton
                            className="Request-button"
                            secondary={true}
                            label="Request Ride"
                            onClick={() => this.requestRide()} />
                    </div>
                );
            case actionType.REQUESTED:
                return (
                    <div className="Request-form">
                        <p className="Request-title">Your ride has been requested</p>
                        <div className="Form-row">
                            <label className="Form-label">From:</label>
                            <label className="Ride-data">{this.state.fromAddress}</label>
                        </div>
                        <div className="Form-row">
                            <label className="Form-label">To:</label>
                            <label className="Ride-data">{this.state.toAddress}</label>
                        </div>
                        <div className="Form-row">
                            <label className="Form-label">No. Passengers:</label>
                            <label className="Ride-data">{this.state.numPassengers}</label>
                        </div>
                        <div className="Form-row">
                            <label className="Form-label">Accommodations:</label>
                            <label className="Ride-data">{this.state.accommodations}</label>
                        </div>
                        <RaisedButton
                            label="Cancel Ride"
                            className="Request-button"
                            onClick={_ => this.props.cancelRide(this.props.rideId)} />
                    </div>
                );
            default:
                return null;
        }
    }

    render() {
        return (
            <div className="Page-content">
                <MapContainer />
                {this.renderPageContent()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        rideStatus: state.ride.status,
        rideId: state.ride.id
    };
};

export default connect(mapStateToProps, { requestRide, cancelRide })(HomeScreen);
