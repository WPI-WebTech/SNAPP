import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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

    toggleDrawer = () => {
        this.setState({
            drawerOpen: !this.state.drawerOpen,
        });
    }

    // set header title based on route pathname
    mapPathnameToTitle = () => {
        switch (this.props.pathname) {
            case '/request-status':
                return 'Request Status';
            case '/rules':
                return 'Rules and Regulations';
            case '/hours':
                return 'Hours';
            default:
                return 'SNAPP';
        }
    }

    render() {
        return (
            <AppBar title={this.mapPathnameToTitle()} onLeftIconButtonClick={this.toggleDrawer}>
                <Drawer
                    docked={false}
                    open={this.state.drawerOpen}
                    onRequestChange={(open) => this.setState({drawerOpen: open})}>
                    <MenuItem
                        containerElement={<Link className="NavLink" to='/' />}
                        onClick={this.toggleDrawer}>
                        Home
                    </MenuItem>
                    <MenuItem
                        containerElement={<Link className="NavLink" to='/hours' />}
                        onClick={this.toggleDrawer}>
                        Hours
                    </MenuItem>
                    <MenuItem
                        containerElement={<Link className="NavLink" to='/rules' />}
                        onClick={this.toggleDrawer}>
                        Rules and Regulations
                    </MenuItem>
                </Drawer>
            </AppBar>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        pathname: state.router.location.pathname,
    };
};

export default connect(mapStateToProps, {})(Header);
