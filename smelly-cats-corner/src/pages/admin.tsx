import React, { useState } from 'react';
import { IonContent, IonInput, IonItem, IonList, IonToolbar, IonTitle, IonButton } from '@ionic/react';
import "../theme/admin-style.css";

interface formValue {
    title: string;
    prix: string;
    description: string;
    img: string;
  }
  

function Admin() {

    const [value, setValue] = useState<formValue>({
        title: "",
        prix: "",
        description: "",
        img: ""

    });


    const handleInput = (event: CustomEvent, fieldName: keyof formValue) => {
        const newValue = { ...value, [fieldName]: event.detail.value ?? '' };
        setValue(newValue);
        
      };

    const handleSubmit = async () => {
        console.log("valeur de l'input : " + value);

        try {
        
        let response = await fetch('http://localhost:3000/shop', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(value),
        });
                            
        if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
        }
        catch (error) {
            console.error('Error fetching data:', error);


        }


    }


    return (
        <IonContent>

            <IonToolbar>
            <IonTitle>Shop Friends</IonTitle>
            </IonToolbar>

            <IonList>
            <IonItem>
                <IonInput id="title" label="Produit" placeholder="Collection de DVD Friends"  onIonChange={(e) => handleInput(e, 'title')}></IonInput>
            </IonItem>

            <IonItem>
                <IonInput id="prix" label="Prix" placeholder="13.99 $" onIonChange={(e) => handleInput(e, 'prix')}></IonInput>
            </IonItem>

            <IonItem>
                <IonInput id="descriptions" label="descriptions" placeholder="Dans la collection friends.." onIonChange={(e) => handleInput(e, 'description')}></IonInput>
            </IonItem>

            
            <IonItem>
                <IonInput id="image" label="Image" placeholder="https://...." onIonChange={(e) => handleInput(e, 'img')}></IonInput>
            </IonItem>

            <IonButton onClick={handleSubmit}>Ajouter</IonButton>
        </IonList>
      </IonContent>
      )
};

export default Admin;