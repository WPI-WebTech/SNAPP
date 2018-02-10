import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestRide, cancelRide } from "../actions/RideActions";
import { rideStatus } from "../constants";

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
    requestRide() {
        const { fromAddress, toAddress, numPassengers, accommodations } = this.state;
        const numRiders = parseInt(numPassengers, 10);
        if (fromAddress && toAddress && numRiders > 0 && numRiders < 6) {
            this.props.requestRide({ fromAddress, toAddress, numPassengers: numRiders, accommodations});
        }
    }

    // render page content depending on ride status state
    renderPageContent() {
        switch(this.props.rideStatus) {
            case rideStatus.DEFAULT:
                return (
                    <div className="Request-form">
                        <p className="Request-title">Request a Ride</p>
                        <div className="Form-row">
                            <label className="Form-label">From</label>
                            <input
                                className="Form-text-input"
                                type="text" placeholder="Address"
                                value={this.state.fromAddress}
                                onChange={(event) => this.setState({ fromAddress: event.target.value })} />
                        </div>
                        <div className="Form-row">
                            <label className="Form-label">To</label>
                            <input
                                className="Form-text-input"
                                type="text" placeholder="Address"
                                value={this.state.toAddress}
                                onChange={(event) => this.setState({ toAddress: event.target.value })} />
                        </div>
                        <div className="Form-row">
                            <label className="Form-label">No. Passengers</label>
                            <input
                                className="Form-num-input"
                                type="number" min={1} max={5}
                                value={this.state.numPassengers}
                                onChange={(event) => this.setState({ numPassengers: event.target.value })} />
                        </div>
                        <div className="Form-row">
                            <label className="Form-label">Accommodations</label>
                            <input
                                className="Form-text-input"
                                type="text" placeholder="Baggage, etc."
                                value={this.state.accommodations}
                                onChange={(event) => this.setState({ accommodations: event.target.value })} />
                        </div>
                        <button className="Request-button" onClick={this.requestRide.bind(this)}>Request Ride</button>
                    </div>
                );
            case rideStatus.REQUESTED:
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
                        <button className="Request-button" onClick={this.props.cancelRide}>Cancel Ride</button>
                    </div>
                );
            default:
                return null;
        }
    }

    render() {
        return (
            <div className="Page-content">
                {this.renderPageContent()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        rideStatus: state.ride.rideStatus,
    };
};

export default connect(mapStateToProps, { requestRide, cancelRide })(HomeScreen);