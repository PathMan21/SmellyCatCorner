import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import Friends from '/pages/Friends';
import { IonButton } from '@ionic/react';
import Menu from '../components/menu';

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
<<<<<<< HEAD
          <Menu></Menu>
          <IonButton onClick={redirigerVersQuizz}>Quizz</IonButton>
=======

          <IonButton onClick={redirigerVersFriends}>Friends</IonButton>
>>>>>>> 0cec817b7c144bb1f38e34d2ec531a5a635a2149
      </IonContent>
    </IonPage>
  );
};

export default Home;
