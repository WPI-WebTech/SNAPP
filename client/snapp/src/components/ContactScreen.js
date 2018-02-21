import React, { Component } from 'react';

/**
 * Screen that displays SNAP's contact info
 */
class ContactScreen extends Component {
    render() {
        return (
            <div className="Page-content">
                <p>SNAP call line: 508-831-6111</p>
                <div className="Contact-info">
                    <p className="Contact-line">Lt. Karen Bueno, WPI Police</p>
                    <p className="Contact-line">SNAP Liaison</p>
                    <p className="Contact-line">508-831-5433</p>
                    <p className="Contact-line">kbueno@wpi.edu</p>
                </div>
                <p>For more information, click the link below:</p>
                <a href="https://www.wpi.edu/student-experience/resources/safety/campus-transportation/student-night-assistance-patrol" target="_blank">
                    https://www.wpi.edu/student-experience/resources/safety/campus-transportation/student-night-assistance-patrol
                </a>
            </div>
        );
    }
}

export default ContactScreen;
