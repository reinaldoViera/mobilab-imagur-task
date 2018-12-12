import React from 'react';
import { Route } from "react-router-dom";
import Home from './Home';
import Album from './Album';

export default function Routes() {
  return (
    <div>
        <Route exact path='/' component={Home}/>
        <Route path='/album/:id' component={Album}/>
    </div>
  )
}
