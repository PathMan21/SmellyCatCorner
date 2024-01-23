import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ModifierFriend = () => {
    const { id } = useParams();
    const [ami, setAmi] = useState({});
    const [modifications, setModifications] = useState({}); // État pour suivre les modifications des champs

    useEffect(() => {
        // Récupérez les détails du friend depuis l'API en utilisant l'ID
        const fetchFriendDetails = async () => {
            try {
                const response = await fetch(`https://friends-v1ol.onrender.com/friends/${id}`);
                if (!response.ok) {
                    throw new Error('Échec de la récupération des détails du friend');
                }
                const friendDetails = await response.json();
                setAmi(friendDetails);
                setModifications(friendDetails);
            } catch (error) {
                console.error('Erreur lors de la récupération des détails du friend :', error);
            }
        };

        fetchFriendDetails();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setModifications({ ...friend, [name]: value });
    };

    const handleUpdateFriend = async () => {
        try {
            const response = await fetch(`https://friends-v1ol.onrender.com/friends/${id}`, {
                method: 'PUT', // Utilisez PUT
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(friend),
            });
            if (!response.ok) {
                throw new Error('Échec de la mise à jour du friend');
            }
            // Redirection de l'utilisateur après une mise à jour réussie du friend
            document.location = `/Details/${id}`;
        } catch (error) {
            console.error('Erreur lors de la mise à jour du friend :', error);
        }
    };

    return (
        <div>
            <h2>Modifier Friend</h2>
            <form onSubmit={handleUpdateFriend}>
                <div>
                    <label>Nom</label>
                    <input
                        type="text"
                        name="name"
                        value={friend.name || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit">Mettre à jour</button>
            </form>
        </div>
    );
};

export default ModifierFriend;
