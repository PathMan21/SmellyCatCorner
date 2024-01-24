import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
} from '@ionic/react';
import { IonCol, IonGrid, IonRow } from '@ionic/react';
import '../theme/page.css';

interface Pizza {
  id: number;
  title: string;
  img: string;
  prix: number;
  description: string;
  quantity: number;
}

const Page1: React.FC = () => {
const [pizza, setPizza] = useState([]);
const [panier, setPanier] = useState([]);



  const dataStorage = async (titleParam: string, prixParam: number, imgParam: string, indexParam: number, quantityParam: number, descriptionParam: string) => {
    const item = {
      title: titleParam,
      prix: prixParam,
      img: imgParam,
      id: indexParam,
      quantity: quantityParam,
      description: descriptionParam
  };
    console.log('Commande effectuée pour :', titleParam, 'au prix de :', prixParam, 'avec l"image :', imgParam, "index : ", indexParam, "quantity : ", quantityParam);

    

    const updatePanier = [...panier, item];
    setPanier(updatePanier);

  sessionStorage.setItem('cart', JSON.stringify(updatePanier));
  
};


    

    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/shop");

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setPizza(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      
    };

    fetchData(); // Appel de la fonction fetchData() à l'intérieur de useEffect

  }, []); // Tableau de dépendances vide pour un effet se produisant une seule fois au montage

  return (

    <IonContent>
    <div className='contentStyle'>
    <div className='containerFriend'>
        {pizza.map((entree: Pizza, index: number) => (
            <IonCard key={index} className='itemFriend'>
              <img className='itemFriend-img' src={entree.img}></img>
              <h2>{entree.title}</h2>
              <p className='itemFriend-description'>{entree.description}</p>
              <p>{entree.prix} €</p>
              <button onClick={() => dataStorage(entree.title, entree.prix, entree.img, entree.id, entree.quantity, entree.description)}>Commander</button>
            </IonCard>
            ))}
        </div>
      </div>
      </IonContent>

  )
}

export default Page1;
