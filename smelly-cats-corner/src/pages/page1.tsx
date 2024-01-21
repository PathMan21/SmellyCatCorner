import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton
} from '@ionic/react';
import { IonCol, IonGrid, IonRow } from '@ionic/react';
import '../theme/page.css';

interface Pizza {
  id: number;
  title: string;
  img: string;
  prix: string;
  description: string;
}

const Page1: React.FC = () => {
const [pizza, setPizza] = useState([]);

// Pour aller chercher les pizzas dans le back


  const [panier, setPanier] = useState([]);



  const dataStorage = async (titleParam: string, prixParam: string, imgParam: string) => {
    const item = {
      title: titleParam,
      prix: prixParam,
      img: imgParam
  };
    console.log('Commande effectuée pour :', titleParam, 'au prix de :', prixParam, 'avec l"image :', imgParam);

    const updatePanier = [...panier, item];
    setPanier(updatePanier);


  localStorage.setItem('cart', JSON.stringify(panier));
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

      <IonContent className="ion-padding">
      <h2></h2>
        <IonGrid className='containerPizza'>
          <IonRow>
            {pizza.map((entree: Pizza, index: number) => (
            <IonCol key={index} className='itemPizza'>
              <img src={entree.img}></img>
              <h2>{entree.title}</h2>
              <p>{entree.description}</p>
              <p>{entree.prix}</p>
              <button onClick={() => dataStorage(entree.title, entree.prix, entree.img)}>Commander</button>
            </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>

  );
};

export default Page1;
