import React from 'react';
import { Link, Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import Page from './components/Page'

export default () => {
  let LinkStyle = {
    display: 'block'
  }
  return (
    <div>
      <Link style={LinkStyle} to="/">Home</Link>
      <Link style={LinkStyle} to="/page1">Page 1</Link>
      <Link style={LinkStyle} to="/page2">Page 2</Link>
      <Switch>
        <Route exact path="/" component={Home}/>  
        <Route path="/page1" render={() => 
          <Page text="page1" />
        }/>
        <Route path="/page2" render={() =>
          <Page text="page2" />
        }/>
      </Switch>
    </div>
  );
}
