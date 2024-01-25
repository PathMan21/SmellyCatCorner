import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

import Home from './pages/Home';
import Panier from "./pages/panier";
import Friends from './pages/Friends';
import Details from './pages/Details';
import Admin from './pages/admin';
import Menu from './components/menu';
import './pages/Details.css';
import AddFriend from './pages/AddFriend';
import GestionFriends from './pages/GestionFriends';
import ModifierFriend from "./pages/ModifierFriend";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import modifierFriend from "./pages/ModifierFriend";

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          
          <IonRouterOutlet id="main" className="scroll">
            <Route path="/" exact={true}>
              <Redirect to="/home" />
              <Menu/>
            </Route>
            <Route path="/home" exact={true}>
              <Home />
              <Menu/>
            </Route>
            <Route path="/friends" exact={true}>
              <Friends />
              <Menu/>
            </Route>
            <Route path="/panier" exact={true}>
              <Panier/>
              <Menu/>
            </Route>
            <Route path="/admin" exact={true}>
              <Admin/>
              <Menu/>
            </Route>
            <Route path="/panier" exact={true}>
              <Panier/>
            </Route>
            <Route path="/admin" exact={true}>
              <Admin/>
              <Menu/>
            </Route>
            <Route path="/Details/:id" component={Details} />
            <Details />
            <Route path="/ModifierFriend/:id" component={ModifierFriend} />
            <ModifierFriend />
            <Route path="/AddFriend" exact={true}>
              <AddFriend />
            </Route>
            <Route path="/GestionFriends" exact={true}>
              <GestionFriends />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
