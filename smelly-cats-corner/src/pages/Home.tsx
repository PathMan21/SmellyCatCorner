import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import Friends from '/pages/Friends';
import { IonButton } from '@ionic/react';

const Home: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

    const redirigerVersFriends = () => {
        // Utilisez la méthode push de history pour rediriger vers la page Friends
        document.location = '/Friends';
    }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>SmellyCatsCorner</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name={name} />

          <IonButton onClick={redirigerVersFriends}>Friends</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
