import React, { Component } from 'react';
import { eveningShuttle, gatewayShuttle, summerGatewayShuttle} from "../data/shuttleSchedules";

/**
 * Screen that displays shuttle hours
 */
class ShuttlesScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            desktopLayout: true,
        };
        this.checkScreenSize = this.checkScreenSize.bind(this);
    }

    componentDidMount() {
        // listen for changes to screen size
        this.checkScreenSize();
        window.addEventListener("resize", this.checkScreenSize);
    }

    componentWillUnmount() {
        // stop listening for changes to screen size
        window.removeEventListener("resize", this.checkScreenSize);
    }

    // Set page layout to desktop or mobile depending on screen width
    checkScreenSize() {
        this.setState({ desktopLayout: window.innerWidth > 800 });
    }

    // Helper method to render table for given shuttle schedule
    renderTable(schedule) {

        let table = [];
        let body = [];

        // display table in desktop or mobile layout depending on screen width
        if (this.state.desktopLayout) {
            let header = (
                <div key={'header'} className="Shuttle-table-row">
                    {schedule.stops.map((stop) => <div key={stop} className="Shuttle-table-heading">{stop}</div>)}
                </div>
            );
            table.push(header);
            schedule.times.forEach((timeRow, i) => {
                let r = (
                    <div key={i} className="Shuttle-table-row">
                        {timeRow.map((time, j) => <div key={i + '-' + j} className="Shuttle-table-time">{time}</div>)}
                    </div>
                );
                body.push(r);
            });
        } else {
            schedule.times.forEach((timeRow, i) => {
                let r = (
                    <div key={i} className="Shuttle-table-col">
                        {timeRow.map((time, j) => {
                            if (time !== '') {
                                return <div key={i + '-' + j} className="Shuttle-table-time">{schedule.stops[j] + ": " + time}</div>;
                            } else {
                                return null;
                            }
                        })}
                    </div>
                );
                body.push(r);
            });
        }

        table.push(body);
        return <div className="Shuttle-table">{table}</div>;
    }

    render() {
        return (
            <div className="Page-content">
                <h1 className="Shuttle-heading">Evening Shuttle</h1>
                {this.renderTable(eveningShuttle)}
                <h1 className="Shuttle-heading">Gateway Shuttle</h1>
                {this.renderTable(gatewayShuttle)}
                <h1 className="Shuttle-heading">Summer Gateway Shuttle</h1>
                {this.renderTable(summerGatewayShuttle)}
            </div>
        );
    }
}

export default ShuttlesScreen;
