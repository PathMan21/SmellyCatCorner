import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonImg, IonButton, IonContent } from '@ionic/react';

import { useParams } from 'react-router-dom';
import './Details.css';

const retour = () => {
    document.location = `/Friends`;
}
const Details = () => {
    const { id } = useParams();
    const [friendDetails, setFriendDetails] = useState(null);


    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`https://friends-v1ol.onrender.com/friends/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch friend details');
                }
                const friend = await response.json();
                setFriendDetails(friend);
            } catch (error) {
                console.error('Error fetching friend details:', error);
            }
        };


        fetchDetails();
    }, [id]);

    return (
        <IonPage>
        <IonHeader>
                <IonToolbar>
                    <IonImg className="friends-title" src='https://friends-v1ol.onrender.com/img/friends.webp'></IonImg>
                    <IonButton className="homeButton" href="/Friends">Revenir</IonButton>
                </IonToolbar>
            </IonHeader>
        <IonContent>
            {friendDetails ? (
                <div className="details-container">
                    <div className="friend-name">{friendDetails.name}</div>
                    <img src={friendDetails.photoPath} alt={`Photo de ${friendDetails.name}`} className="friend-photo" /><br />
                    <div className="friend-actor-name">({friendDetails.actorName})</div>
                    <div className="friend-birthDate"><i>{friendDetails.birthDate}</i></div>
                    <div className="friend-sex">{(friendDetails.sex === "male") ? "♂" : "♀"}</div>
                    <div className="friend-hairColor">Couleur de cheveux : {friendDetails.hairColor}</div>
                    <div className="friend-description"> {friendDetails.description}</div>
                    <div className="friend-video"><a target="_new" href={friendDetails.video}>Vidéo</a></div>
                    <button className="friend-button" onClick={retour}>Retourner à la page des friends</button>
                </div>
            ) : (
                <p>Friend non trouvé</p>
            )}
        </IonContent>
        </IonPage>
    );
};

export default Details;
