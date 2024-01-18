import {IonContent, IonHeader, IonPage, IonToolbar, IonImg, IonButton} from '@ionic/react';
import { useParams } from 'react-router';


import React, { useState, useEffect } from 'react';
import { IonCol, IonGrid, IonRow } from '@ionic/react';

interface GestionFriends {
    id: number;
    title: string;
    question: string;
    response: string;
}



const GestionFriends: React.FC = () => {

    const [friends, setFriends] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://friends-v1ol.onrender.com/friends");

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData = await response.json();
                setFriends(jsonData);
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
                    <IonImg className="friends-title" src='https://friends-v1ol.onrender.com/img/friends.webp'></IonImg>
                    <IonButton className="homeButton" href="/Home">Home</IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
            </IonContent>
        </IonPage>
    );
};

export default GestionFriends;
