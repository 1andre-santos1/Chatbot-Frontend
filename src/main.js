import React from 'react';
import PaginaInicial from './FrontOffice/PaginaInicial'
import ListaVagas from './FrontOffice/ListaVagas'
import BackOffice_ListaVagas from './BackOffice/BackOffice_ListaVagas'
import Login from './BackOffice/Login'

import { Switch, Route } from "react-router-dom";

const Main = () => (
    <Switch>
      <Route exact path="/" component={PaginaInicial} />
      <Route path="/jobs" component={ListaVagas} /> 
      <Route path="/backOffice/jobs" component={BackOffice_ListaVagas} render={() => <BackOffice_ListaVagas/>}/>  
      <Route path="/login" component={Login} />  
    </Switch>
  );
  export default Main;
