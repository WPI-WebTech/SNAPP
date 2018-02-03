import React, { Component } from 'react';

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

    render() {
        return (
            <div className="Page-content">
                <div className="Request-form">
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
                    <button className="Request-button">Request Ride</button>
                </div>
            </div>
        );
    }
}

export default HomeScreen;
