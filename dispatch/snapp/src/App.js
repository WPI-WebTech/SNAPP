import React from 'react';
import Columns from 'react-columns';
import ReactDOM from 'react-dom';
import './App.css';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

//App --> Format: Main should include a title portion and a grid with the rides 
// 	New Requests:each ride will have From, To, No. Passengers, Accommodations, Time In
//	In Progress: From, To, No. Passengers, Accommodations, Time In, Van No.



class App extends React.Component {

	constructor(props) {
		super(props);

		const { classes } = props;
	}

	render() {
	return (
    		<div className="root">
     			<Grid container spacing={24}>
        			<Grid item xs={12} sm={6}>
          			<Paper className="column-header new-request">New Requests</Paper>
				<Grid container spacing={12}>
					<Grid item xs={2}>
						<Paper className="table-header" style={{"backgroundColor":"#E6E6E6"}}>From</Paper>
					</Grid>
					<Grid item xs={2}>
						<Paper className="table-header" style={{"backgroundColor":"#E6E6E6"}}>To</Paper>
					</Grid>
					<Grid item xs={3}>
						<Paper className="table-header" style={{"backgroundColor":"#E6E6E6"}}>No. Passengers</Paper>
					</Grid>
					<Grid item xs={3}>
						<Paper className="table-header" style={{"backgroundColor":"#E6E6E6"}}>Accom.s</Paper>
					</Grid>
					<Grid item xs={2}>
						<Paper className="table-header" style={{"backgroundColor":"#E6E6E6"}}>Time In</Paper>
					</Grid>
				</Grid>
        			</Grid>
        			<Grid item xs={12} sm={6}>
          			<Paper className="column-header in-progress">In Progress</Paper>
				<Grid container spacing={12}>
					<Grid item xs={2}>
						<Paper className="table-header" style={{"backgroundColor":"#E6E6E6"}}>From</Paper>
					</Grid>
					<Grid item xs={2}>
						<Paper className="table-header" style={{"backgroundColor":"#E6E6E6"}}>To</Paper>
					</Grid>
					<Grid item xs={2}>
						<Paper className="table-header" style={{"backgroundColor":"#E6E6E6"}}>No. Passengers</Paper>
					</Grid>
					<Grid item xs={2}>
						<Paper className="table-header" style={{"backgroundColor":"#E6E6E6"}}>Accom.s</Paper>
					</Grid>
					<Grid item xs={2}>
						<Paper className="table-header" style={{"backgroundColor":"#E6E6E6"}}>Time In</Paper>
					</Grid>
					<Grid item xs={2}>
						<Paper className="table-header" style={{"backgroundColor":"#E6E6E6"}}>Van No.</Paper>
					</Grid>
				</Grid>
        			</Grid>
      			</Grid>
    		</div>
		);
	};
}

export default App;
