import {IonButtons, IonContent, IonHeader, IonImg, IonMenuButton, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import Menu from '../components/menu';
import React from "react";

const Home: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  return (
    <IonPage>
      <IonContent fullscreen>
        <Menu/>
          <IonImg className="friends-title-img" src='https://friends-v1ol.onrender.com/img/friends.webp'></IonImg>
      </IonContent>
    </IonPage>
  );
};

export default Home;
