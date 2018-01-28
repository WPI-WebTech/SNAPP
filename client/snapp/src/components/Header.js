import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Drawer, MenuItem } from 'material-ui';

/**
 * Main app header component
 */
class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            drawerOpen: false,
        };
    }

    toggleDrawer() {
        this.setState({
            drawerOpen: !this.state.drawerOpen,
        });
    }

    render() {
        return (
            <AppBar title="SNAPP" onLeftIconButtonClick={this.toggleDrawer.bind(this)}>
                <Drawer
                    docked={false}
                    open={this.state.drawerOpen}
                    onRequestChange={(open) => this.setState({drawerOpen: open})}>
                    <MenuItem onClick={this.toggleDrawer.bind(this)}>
                        Close
                    </MenuItem>
                    <MenuItem
                        containerElement={<Link className="NavLink" to='/' />}
                        onClick={this.toggleDrawer.bind(this)}>
                        Home
                    </MenuItem>
                    <MenuItem
                        containerElement={<Link className="NavLink" to='/request-status' />}
                        onClick={this.toggleDrawer.bind(this)}>
                        Request Status
                    </MenuItem>
                    <MenuItem
                        containerElement={<Link className="NavLink" to='/hours' />}
                        onClick={this.toggleDrawer.bind(this)}>
                        Hours
                    </MenuItem>
                    <MenuItem
                        containerElement={<Link className="NavLink" to='/rules' />}
                        onClick={this.toggleDrawer.bind(this)}>
                        Rules and Regulations
                    </MenuItem>
                </Drawer>
            </AppBar>

        );
    }
}

export default Header;
