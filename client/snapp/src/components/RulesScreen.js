import React, { Component } from 'react';

/**
 * Screen that displays SNAP's rules and regulations
 */
class RulesScreen extends Component {
    render() {
        return (
            <div className="Page-content">
                <ul>
                    <li className="Info-bullet">Transports must fall under a limit of a one mile radius.</li>
                    <li className="Info-bullet">Transports will be provided from off-campus housing, to campus and from campus, to off-campus housing.</li>
                    <li className="Info-bullet">Transports will be provided to Price Chopper grocery store at Park Avenue on Thursdays and Sundays from 4 to 5 p.m.</li>
                    <li className="Info-bullet">Transports are not used for rides to shopping centers, restaurants, bars, or any other commercial locations.</li>
                    <li className="Info-bullet">Transports may be provided to WPI students traveling to and from Union Station for traveling purposes only.</li>
                    <li className="Info-bullet">Transports are not allowed by law to transport any forms of drugs or alcohol. SNAP drivers are authorized to view any enclosed packages and/or containers.</li>
                </ul>
            </div>
        );
    }
}

export default RulesScreen;
