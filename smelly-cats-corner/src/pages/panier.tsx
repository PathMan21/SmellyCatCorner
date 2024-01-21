import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Page1 from '../pages/page1';
import Admin from '../pages/admin';
import Friends from '../pages/Friends';
import GestionFriends from '../pages/GestionFriends';

import {
  IonButton,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonItem,
  IonList,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonToolbar
} from '@ionic/react';
import Menu from '../components/menu';

interface Item {
    title: string;
    prix: string;
    img: string;
}

function Panier() {

    const [ panier, setPanier] = useState([]);

    // Utilisation de useEffect pour charger les données du stockage local au montage du composant
    useEffect(() => {
      const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
      setPanier(storedCartItems);
    }, []);


    return (
      <IonPage>
        <IonContent>
         <Menu/>
                {panier.map((item, index) => (
                    <IonCard key={index}>
                        <IonCardTitle>{item.title}</IonCardTitle>
                        <IonCardSubtitle>{item.prix}</IonCardSubtitle>
                    </IonCard>
                ))}
         
        </IonContent>
      </IonPage>
    );
  };


export default Panier;