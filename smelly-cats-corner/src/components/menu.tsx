import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Page1 from '../pages/page1';
import Admin from '../pages/admin';
import Friends from '../pages/Friends';
import GestionFriends from '../pages/GestionFriends';

import {
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import "../theme/menu.css";

function Menu() {




  return (
    <Router>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
          <IonTitle className="titreToolbar" slot="start"><h2>Menu</h2></IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
        <Link className="menuItem" to="/pages/page1">Carte</Link><br></br>
        <Link className="menuItem" to="/pages/admin">Admin</Link><br/>
        <Link className="menuItem" to="/pages/Friends">Friends</Link><br/>
          <Link className="menuItem" to="/pages/GestionFriends">Gestion</Link><br/>
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle className="titreToolbar" slot="start"><h2>Smelly Cat's Corner</h2></IonTitle>
            <IonButton className="button-style" slot="end" href="/panier"><img src='../src/img/cart.png'/></IonButton>
          </IonToolbar>
        </IonHeader>
        <Switch>
          <Route exact path="/pages/page1" component={Page1}/>
          <Route exact path="/pages/Friends" component={Friends}/>
          <Route exact path="/pages/admin" component={Admin} />
          <Route exact path="/pages/GestionFriends" component={GestionFriends} />
        </Switch>
      </IonPage>
    </Router>
  );
}

export default Menu;