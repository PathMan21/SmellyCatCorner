import { IonContent, IonHeader, IonPage, IonToolbar, IonImg } from '@ionic/react';
import { useParams } from 'react-router';
import './Friends.css';

import React, { useState, useEffect } from 'react';
import { IonCol, IonGrid, IonRow } from '@ionic/react';

interface Friends {
    id: number;
    title: string;
    question: string;
    response: string;
}



const Friends: React.FC = () => {

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
    const details = (id) => {
        // Utilisez la méthode push de history pour rediriger vers la page des détails des Friends
        document.location = `/Details/${id}`;
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonImg className="friends-title" src='https://friends-v1ol.onrender.com/img/friends.webp'></IonImg>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonGrid className='containerFriend'>
                    <IonRow>
                        {/* Mapping des données friends et affichage */}
                        {friends.map((friend, index) => (
                            <IonCol key={index} className='itemFriend'>
                                <h2>{friend.name}</h2>
                                <p><img className="img-friend" src={friend.photoPath}></img></p>
                                <p><span className="sex">{(friend.sex == "male") ? "\u2642" : "\u2640"}</span></p>
                                <p>{friend.birthDate}</p>
                                <p>{friend.actorName}</p>
                                <p>{friend.hairColor}</p>
                                <button onClick={() => details(friend.id)}>Voir plus de détails</button>
                            </IonCol>
                        ))}
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Friends;
