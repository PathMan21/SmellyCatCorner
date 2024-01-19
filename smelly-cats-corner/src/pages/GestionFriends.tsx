import React, { useState } from 'react';
import './GestionFriends.css';

const GestionFriends = () => {
    const [friend, setFriend] = useState({
        id: Math.random().toString(36).substr(2, 9),
        name: "test",
        sex: "male",
        birthDate: "1990-12-04",
        hairColor: "test",
        actorName: "test",
        photoPath: "test",
        video: "tst",
        description: "test"
    });

    const handleChange = (e) => {
        console.log("*******************");
        setFriend({ ...friend, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async () => {

        try {
            console.log("-------------------");
            console.log(JSON.stringify(friend));
            let response = await fetch('http://friends-v1ol.onrender.com/friends', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(friend),
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP! statut: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);
            console.log("Votre friend a été ajouté avec succès !");
        } catch (error) {
            console.error("Erreur lors de l'ajout d'un ami: ", error);
        }
    };

    return (
        <div className="form-container">
            <input
                type="string"
                name="id"
                value={friend.id}
                onChange={handleChange}
                placeholder="Id"
            />
            <input
                type="text"
                name="name"
                value={friend.name}
                onChange={handleChange}
                placeholder="Nom"
            />
            <select
                name="sex"
                value={friend.sex}
                onChange={handleChange}
            >
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <input
                type="date"
                name="birthDate"
                value={friend.birthDate}
                onChange={handleChange}
            />
            <input
                type="text"
                name="hairColor"
                value={friend.hairColor}
                onChange={handleChange}
                placeholder="Couleur de cheveux"
            />
            <input
                type="text"
                name="actorName"
                value={friend.actorName}
                onChange={handleChange}
                placeholder="Nom de l'acteur"
            />
            <input
                type="text"
                name="photoPath"
                value={friend.photoPath}
                onChange={handleChange}
                placeholder="Photo"
            />
            <input
                type="text"
                name="video"
                value={friend.video}
                onChange={handleChange}
                placeholder="Video"
            />
            <input
                type="text"
                name="description"
                value={friend.description}
                onChange={handleChange}
                placeholder="Description"
            />
            <button className="add-button" onClick={handleFormSubmit}>Ajouter un ami</button>
        </div>
    );
};

export default GestionFriends;
