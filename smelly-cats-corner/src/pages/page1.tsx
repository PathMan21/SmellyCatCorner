import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonCard,
  IonButton,
} from '@ionic/react';
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
  const [pizza, setPizza] = useState<Pizza[]>([]);
  const [panier, setPanier] = useState<Pizza[]>([]);

  const dataStorage = (titleParam: string, prixParam: number, imgParam: string, indexParam: number, quantityParam: number, descriptionParam: string) => {
    const item: Pizza = {
      title: titleParam,
      prix: prixParam,
      img: imgParam,
      id: indexParam,
      quantity: quantityParam,
      description: descriptionParam,
    };

    console.log('Commande effectuée pour :', titleParam, 'au prix de :', prixParam, 'avec l"image :', imgParam, 'index : ', indexParam, 'quantity : ', quantityParam);

    const updatePanier = [...panier, item];
    setPanier(updatePanier);

    sessionStorage.setItem('cart', JSON.stringify(updatePanier));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/shop');

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const jsonData: Pizza[] = await response.json();
        setPizza(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <IonContent>
      <div className="contentStyle">
        <div className="containerFriend">
          {pizza.map((entree: Pizza) => (
            <IonCard key={entree.id} className="itemFriend">
              <img className="itemFriend-img" src={entree.img} alt={entree.title} />
              <h2>{entree.title}</h2>
              <p className="itemFriend-description">{entree.description}</p>
              <p>{entree.prix} €</p>
              <IonButton onClick={() => dataStorage(entree.title, entree.prix, entree.img, entree.id, entree.quantity, entree.description)}>
                Commander
              </IonButton>
            </IonCard>
          ))}
        </div>
      </div>
    </IonContent>
  );
};

export default Page1;
