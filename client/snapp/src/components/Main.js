import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeScreen from './HomeScreen';
import HoursScreen from './HoursScreen';
import RulesScreen from './RulesScreen';
import ShuttlesScreen from './ShuttlesScreen';
import ContactScreen from './ContactScreen';

/**
 * Main app content component
 */
class Main extends Component {
    render() {
        return (
            <main className="Page">
                <Switch>
                    <Route exact path='/' component={HomeScreen}/>
                    <Route path='/hours' component={HoursScreen}/>
                    <Route path='/rules' component={RulesScreen}/>
                    <Route path='/shuttles' component={ShuttlesScreen}/>
                    <Route path='/contact' component={ContactScreen}/>
                </Switch>
            </main>
        );
    }
}

export default Main;
