import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ModifierFriend.css';

const retour = () => {
    document.location = `/GestionFriends`;
}
const ModifierFriend = () => {
    const { id } = useParams();
    const [friendDetails, setFriendDetails] = useState({
        name: "",
        sex: "",
        birthDate: "",
        hairColor: "",
        actorName: "",
        photoPath: "",
        video: "",
        description: ""
    });


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

    const handleChange = (e) => {
        setFriendDetails({ ...friendDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://friends-v1ol.onrender.com/friends/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(friendDetails),
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP! statut: ${response.status}`);
            }

            const updatedFriend = await response.json();
            console.log('Friend mis à jour:', updatedFriend);
            document.location = '/GestionFriends';

        } catch (error) {
            console.error("Erreur lors de la modification de l'ami:", error);
        }
    };

    return (
        <div className="form-edit-container">
            {friendDetails && (
                <form onSubmit={handleSubmit} className="form-edit">
                    <label htmlFor="name">Nom:</label>
                    <input
                        type="text"
                        name="name"
                        value={friendDetails.name}
                        onChange={handleChange}
                    />
                    <label htmlFor="sex">Sexe:</label>
                    <select name="sex" value={friendDetails.sex} onChange={handleChange}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>

                    <label htmlFor="birthDate">Date de naissance:</label>
                    <input
                        type="date"
                        name="birthDate"
                        value={friendDetails.birthDate}
                        onChange={handleChange}
                    />

                    <label htmlFor="hairColor">Couleur des cheveux:</label>
                    <input
                        type="text"
                        name="hairColor"
                        value={friendDetails.hairColor}
                        onChange={handleChange}
                    />

                    <label htmlFor="actorName">Nom de l'acteur:</label>
                    <input
                        type="text"
                        name="actorName"
                        value={friendDetails.actorName}
                        onChange={handleChange}
                    />

                    <label htmlFor="photoPath">Chemin de la photo:</label>
                    <input
                        type="text"
                        name="photoPath"
                        value={friendDetails.photoPath}
                        onChange={handleChange}
                    />

                    <label htmlFor="video">Lien vidéo:</label>
                    <input
                        type="text"
                        name="video"
                        value={friendDetails.video}
                        onChange={handleChange}
                    />

                    <label htmlFor="description">Description:</label>
                    <textarea
                        name="description"
                        value={friendDetails.description}
                        onChange={handleChange}
                    ></textarea>

                    <div className="button-container">
                        <button type="submit">Mettre à jour</button>
                        <button className="friend-button" onClick={retour}>Retourner à la page des friends</button>
                    </div>

                </form>
            )}
        </div>
    );
};

export default ModifierFriend;
