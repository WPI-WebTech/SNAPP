import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeScreen from './HomeScreen';
import StatusScreen from './StatusScreen';
import HoursScreen from './HoursScreen';
import RulesScreen from './RulesScreen';

/**
 * Main app content component
 */
class Main extends Component {
    render() {
        return (
            <main className="Page">
                <Switch>
                    <Route exact path='/' component={HomeScreen}/>
                    <Route path='/request-status' component={StatusScreen}/>
                    <Route path='/hours' component={HoursScreen}/>
                    <Route path='/rules' component={RulesScreen}/>
                </Switch>
            </main>
        );
    }
}

export default Main;
