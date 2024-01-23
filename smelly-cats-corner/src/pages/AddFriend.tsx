import React, { useState } from 'react';
import { Camera, CameraResultType } from '@capacitor/camera';

import './AddFriend.css';


const AddFriend = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [friend, setFriend] = useState({
        id: Math.random().toString(36).substr(2, 9),
        name: "",
        sex: "",
        birthDate: "",
        hairColor: "",
        actorName: "",
        photoPath: "",
        video: "",
        description: ""

    });
// Fonction pour prendre une photo
    const takePhoto = async () => {
        try {
            const image = await Camera.getPhoto({
                quality: 100,
                allowEditing: false,
                resultType: CameraResultType.Base64
            });

            // image.baseString64 contiendra le chemin de l'image que vous pouvez utiliser comme src d'une balise img
            const imageUrl = image.base64String;

            // Vous pouvez maintenant attribuer imageUrl à la source d'une balise img ou effectuer d'autres actions avec l'image capturée
        } catch (error) {
            console.error('Erreur lors de la capture de l\'image:', error);
        }
    };

    const handleChange = (e) => {
        console.log("*******************");
        setFriend({ ...friend, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async () => {

        try {
            console.log("-------------------");
            console.log(JSON.stringify(friend));
            let response = await fetch('https://friends-v1ol.onrender.com/friends', {
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
            setSuccessMessage("Votre friend a été ajouté avec succès !");
        } catch (error) {
            console.error("Erreur lors de l'ajout d'un ami: ", error);
        }
    };

    return (
        <div className="form-container">
            <label>Id du friend :
            <input
                type="string"
                name="id"
                value={friend.id}
                onChange={handleChange}
                placeholder="Id"
            /></label>

            <label>Nom du friend :
            <input
                type="text"
                name="name"
                value={friend.name}
                onChange={handleChange}
                placeholder="Nom"
            /></label>

            <label>Sexe du friend:
                <select
                name="sex"
                value={friend.sex}
                onChange={handleChange}
            >
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select></label>

            <label>Date de naissance du friend:
            <input
                type="date"
                name="birthDate"
                value={friend.birthDate}
                onChange={handleChange}
            /></label>
            <label>Couleur de cheveux du friend:
            <input
                type="text"
                name="hairColor"
                value={friend.hairColor}
                onChange={handleChange}
                placeholder="Couleur de cheveux"
            /></label>
            <label>Nom de l'acteur:
            <input
                type="text"
                name="actorName"
                value={friend.actorName}
                onChange={handleChange}
                placeholder="Nom de l'acteur"
            /></label>

            <label>Photo du friend:</label>
            <div className="photo-input center-button-container">
                <input
                    type="text"
                    name="photoPath"
                    value={friend.photoPath}
                    onChange={handleChange}
                    placeholder="Photo"
                />
                <button className="add-button" type="button" onClick={takePhoto}>
                    Prendre une photo
                </button>
            </div>

            <label>Video du friend:
            <input
                type="text"
                name="video"
                value={friend.video}
                onChange={handleChange}
                placeholder="Video"
            /></label>

            <label>Description du friend:
            <input
                type="text"
                name="description"
                value={friend.description}
                onChange={handleChange}
                placeholder="Description"
            /></label>

            <div className="center-button-container">
            <button className="add-button" onClick={handleFormSubmit}>Ajouter un ami</button>
            </div>

            {/* Affichez le message de succès */}
            {successMessage && (
                <div className="success-message">
                    {successMessage}
                </div>
            )}
        </div>
    );
};


export default AddFriend;
