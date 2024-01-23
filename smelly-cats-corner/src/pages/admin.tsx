import React, { useState, useEffect } from 'react';
import { IonContent, IonInput, IonItem, IonList, IonToolbar, IonTitle, IonButton, IonCol, IonGrid } from '@ionic/react';
import "../theme/admin-style.css";
import SHOP from "../../db.json";
import Menu from '../components/menu';

interface ShopData {
    id: string;
    title: string;
    prix: number;
    description: string;
    img: string;
    quantity: number;
}

interface formValue {
    title: string;
    prix: number;
    description: string;
    img: string;
    quantity: number;
}

function Admin() {
    const [boutonChangement, setBoutonChangement] = useState("Ajouter");
    const [donnees, setDonnees] = useState<ShopData[]>([]);
    const [value, setValue] = useState<formValue>({
        title: "",
        prix: 0,
        description: "",
        img: "",
        quantity: 1
    });
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

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
    
            // Réinitialiser l'état selectedItemId à null après la suppression
            setSelectedItemId(null);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    }
    
    const handleEdit = (id: string) => {
        setSelectedItemId(id);
    
        const selectedItem = donnees.find(item => item.id === id);
        if (selectedItem) {
            setValue({
                title: selectedItem.title,
                prix: selectedItem.prix,
                description: selectedItem.description,
                img: selectedItem.img,
                quantity: selectedItem.quantity,
            });
        }
    };
    
    const handleUpdate = async () => {
        const updatedArray = donnees.map(item => {
            if (item.id === selectedItemId) {
                return { ...item, ...value };
            } else {
                return item;
            }
        });

        setDonnees(updatedArray);

        try {
            const response = await fetch(`http://localhost:3000/shop/${selectedItemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(value),
            });

            if (!response.ok) {
                throw new Error('Failed to update data');
            }
        } catch (error) {
            console.error('Error updating data:', error);
        }

        setValue({
            title: "",
            prix: 0,
            description: "",
            img: "",
            quantity: 1
        });

        setSelectedItemId(null);
    };

    const handleInput = (event: CustomEvent, fieldName: keyof formValue) => {
        let newValue: formValue;

        if (fieldName === 'prix') {
            const parsedValue = parseFloat(event.detail.value ?? '0');

            if (!isNaN(parsedValue)) {
                newValue = { ...value, [fieldName]: parsedValue };
            } else {
                newValue = { ...value, [fieldName]: 0 };
            }
        } else {
            newValue = { ...value, [fieldName]: event.detail.value ?? '' };
        }

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

            setBoutonChangement("Item ajouté !");
            setTimeout(() => {
                setBoutonChangement("Ajouter");
            }, 1000);

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
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
                    <IonInput id="title" label="Produit" placeholder="Collection de DVD Friends" onIonChange={(e) => handleInput(e, 'title')}></IonInput>
                </IonItem>

                <IonItem>
                    <IonInput id="prix" label="Prix" type='number' placeholder="13.99 $" onIonChange={(e) => handleInput(e, 'prix')}></IonInput>
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
                <IonTitle>Gestion des items</IonTitle>
            </IonToolbar>

            {donnees.map((shopEntree) => (
                <div className='modification' key={shopEntree.id}>
                    <button className="boutonSupprim" onClick={() => handleDelete(shopEntree.id)}>X</button>
                    {shopEntree.title}
                    <button className="boutonModif" onClick={() => handleEdit(shopEntree.id)}>Modifier</button>

                </div>
            ))}

            {selectedItemId && (
                <IonList>
                    <IonItem>
                        <IonInput id="title" label="Produit" placeholder="Collection de DVD Friends" value={value.title} onIonChange={(e) => handleInput(e, 'title')}></IonInput>
                    </IonItem>

                    <IonItem>
                        <IonInput id="prix" label="Prix" type='number' placeholder="13.99 $" value={value.prix} onIonChange={(e) => handleInput(e, 'prix')}></IonInput>
                    </IonItem>

                    <IonItem>
                        <IonInput id="descriptions" label="descriptions" placeholder="Dans la collection friends.." value={value.description} onIonChange={(e) => handleInput(e, 'description')}></IonInput>
                    </IonItem>

                    <IonItem>
                        <IonInput id="image" label="Image" placeholder="https://...." value={value.img} onIonChange={(e) => handleInput(e, 'img')}></IonInput>
                    </IonItem>

                    <IonButton id="boutonModifier" onClick={handleUpdate}>Modifier</IonButton>
                </IonList>
            )}
        </IonContent>
    );
};

export default Admin;
