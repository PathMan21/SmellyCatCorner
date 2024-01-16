import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Quizz.css';

import React, { useState, useEffect } from 'react';
import { IonCol, IonGrid, IonRow } from '@ionic/react';

interface Quizz {
    id: number;
    title: string;
    question: string;
    response: string;
}



const Quizz: React.FC = () => {

        const [quizz, setQuizz] = useState([]);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch("http://localhost:3000/quizz");

                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    const jsonData = await response.json();
                    setQuizz(jsonData);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }

            };

            fetchData(); // Appel de la fonction fetchData() à l'intérieur de useEffect

        }, []); // Tableau de dépendances vide pour un effet se produisant une seule fois au montage

    const { name } = useParams<{ name: string; }>();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Quizz</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonGrid className='containerQuizz'>
                    <IonRow>
                        {/* Mapping des données pizza et affichage */}
                        {quizz.map((entree: Quizz, index: number) => (
                            <IonCol key={index} className='itemQuizz'>
                                <h2>{entree.title}</h2>
                                <p>{entree.question}</p>
                                <p>{entree.response}</p>
                                <button>Voir la réponse</button>
                            </IonCol>
                        ))}
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Quizz;
