import React, { Component } from 'react';

/**
 * Screen that displays SNAP's hours of operation
 */
class HoursScreen extends Component {
    render() {
        return (
            <div className="Page-content">
                <div className="Hours-content">
                    <h1 className="Hours-heading">A-Term</h1>
                    <p className="Hours">Sunday-Saturday: 6PM-4PM</p>
                    <h1 className="Hours-heading">B-Term</h1>
                    <p className="Hours">Sunday-Saturday: 4PM-4PM</p>
                    <h1 className="Hours-heading">C-Term</h1>
                    <p className="Hours">Sunday-Saturday: 4PM-4PM</p>
                    <h1 className="Hours-heading">D-Term</h1>
                    <p className="Hours">Sunday-Saturday: 6PM-4PM</p>
                    <h1 className="Hours-heading">E-Term</h1>
                    <p className="Hours">No hours of operation</p>
                </div>
            </div>
        );
    }
}

export default HoursScreen;
