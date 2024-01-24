import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const retour = () => {
    document.location = `/GestionFriends`;
}
const ModifierFriend = () => {
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
        <div>
            {friendDetails ? (
                <div className="details-container">
                    <div className="friend-name">{friendDetails.name}</div>
                    <img src={friendDetails.photoPath} alt={`Photo de ${friendDetails.name}`} className="friend-photo" /><br />
                    <button className="friend-button" onClick={retour}>Retourner à la page de gestion des Friends</button>

                </div>
            ) : (
                <p>Friend non trouvé</p>
            )}
        </div>
    );
};

export default ModifierFriend;
