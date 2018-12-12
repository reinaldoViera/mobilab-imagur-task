import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from './pages/Routes';
import { Provider } from 'react-redux';
import store from './redux';
import MyAppBar from './component/AppBar';
import { withStyles } from '@material-ui/core';


const styles = theme => ({
  layout: {
    width: 'auto',
    paddingTop: theme.mixins.toolbar.minHeight + 15,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }
});
class App extends Component {
  render() {
    const { classes} = this.props;
    return (
      <Provider store={store}>
        <Router>
          <div>
            <MyAppBar />
            <main>
              <div className={classes.layout}>
                <Routes />
              </div>
            </main>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default withStyles(styles)(App);
