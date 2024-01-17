import React, { useState, useEffect } from 'react';
import { IonContent, IonInput, IonItem, IonList, IonToolbar, IonTitle, IonButton, IonCol, IonGrid } from '@ionic/react';
import "../theme/admin-style.css";
import SHOP from "../../db.json";

interface ShopData {
    id: string;
    title: string;
    prix: string;
    description: string;
    img: string;
}

interface formValue {
    title: string;
    prix: string;
    description: string;
    img: string;
}

function Admin() {
    const [boutonChangement, setBoutonChangement] = useState("Ajouter");
    const [donnees, setDonnees] = useState<ShopData[]>([]);
    const [value, setValue] = useState<formValue>({
        title: "",
        prix: "",
        description: "",
        img: ""
    });

    useEffect(() => {
        setDonnees(SHOP.shop);
    }, []);

    const handleDelete = async (id: string) => {
        // Suppression côté client
        const newArray = donnees.filter(item => item.id !== id);
        setDonnees(newArray);

        // Suppression côté serveur (si nécessaire)
        try {
            const response = await fetch(`http://localhost:3000/shop/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete data');
            }
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    }

    const handleInput = (event: CustomEvent, fieldName: keyof formValue) => {
        const newValue = { ...value, [fieldName]: event.detail.value ?? '' };
        setValue(newValue);
        
      };

    const handleSubmit = async () => {

        try {
        let response = await fetch('http://localhost:3000/shop', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(value),
        });
                         
        //effet bouton
        setBoutonChangement("Item ajouté !");
        setTimeout(() => {
        setBoutonChangement("Ajouter");

        }, 1000);

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

            <IonButton id="boutonAjout" onClick={handleSubmit}>{boutonChangement}</IonButton>
        </IonList>

        <IonToolbar>
            <IonTitle>Suppression</IonTitle>
            
        </IonToolbar>


        <IonGrid className='containerPizza'>
        {
            SHOP.shop.map( (shopEntree) => {
            return(
                <IonCol className='itemPizza'>
                <img src={shopEntree.img}></img>
                <h2>{shopEntree.title}</h2>
                <p>{shopEntree.description}</p>
                <p>{shopEntree.prix}</p>
                <button onClick={() => handleDelete(shopEntree.id)}>Delete</button>
                </IonCol>
                
                )
            })
        }

    </IonGrid>

      </IonContent>
      )
};

export default Admin;