import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Details.css';

const retour = () => {
    document.location = `/Friends`;
}
const Details = () => {
    const { id } = useParams();
    const [friendDetails, setFriendDetails] = useState(null);

    const removeFriend = async () => {
        try {
            const response = await fetch(`https://friends-v1ol.onrender.com/friends/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Échec de la suppression du friend');
            }

            // Redirection de l'utilisateur vers la liste des friends après la suppression
            document.location = '/Friends';
        } catch (error) {
            console.error('Erreur lors de la suppression du friend :', error);
        }
    };

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
        <div>
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
                    <button className="friend-button" onClick={removeFriend}>Supprimer ce friend</button>

                </div>
            ) : (
                <p>Friend non trouvé</p>
            )}
        </div>
    );
};

export default Details;
