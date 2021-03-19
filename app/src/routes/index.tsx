import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Trips from '../pages/Trips';
import Travelers from '../pages/Travelers';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />

        <Route path="/trips" component={Trips} />
        <Route path="/travelers" component={Travelers} />
    </Switch>
);

export default Routes;
