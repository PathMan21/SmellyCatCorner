import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import Quizz from './Quizz';
import { IonButton } from '@ionic/react';
import Menu from '../components/menu';

const Home: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

    const redirigerVersQuizz = () => {
        // Utilisez la méthode push de history pour rediriger vers la page Quizz
        document.location = '/Quizz';
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
          <Menu></Menu>
          <IonButton onClick={redirigerVersQuizz}>Quizz</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
