import React from 'react';
import{BrowserRouter, Switch, Route} from 'react-router-dom'
import Main from './paginas/Main';
import ServiceDetail from './paginas/ServiceDetail'
import Atendimento from './paginas/Atendimento'

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/services/:id" component={ServiceDetail} />
            <Route path="/atendimento" component={Atendimento} />
            <Route path="/atendimento/:id" component={Atendimento} />
        </Switch>
    </BrowserRouter>
)
export default Routes;

