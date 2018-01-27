import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 * Main app header component
 */
class Header extends Component {
    render() {
        return (
            <header>
                <nav>
                    <ul>
                        <li><Link to='/'>Request a Ride</Link></li>
                        <li><Link to='/request-status'>Request Status</Link></li>
                        <li><Link to='/hours'>Hours</Link></li>
                        <li><Link to='/rules'>Rules and Regulations</Link></li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;
