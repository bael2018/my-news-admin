import { Redirect, Route, Switch } from "react-router"
import Auth from "../../pages/Auth"
import Content from "../../pages/Content"

const Routes = ({user}) => {

    return (
        user ? (
            <Switch>
                <Route component={Content} path='/'/>
                <Redirect to='/'/>
            </Switch>
        ) : (
            <Switch>
                <Route component={Auth} path='/auth'/>
                <Redirect to='/auth'/>
            </Switch>
        )
    )
}

export default Routes