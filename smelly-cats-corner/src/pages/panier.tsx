import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonButton,
  IonButtons,
  IonMenu,
  IonToolbar,
  IonPage,
  IonCard,
} from '@ionic/react';

import Menu from '../components/menu';
import "../theme/shop-style.css";

interface storedCartItems {
  id: number;
  title: string;
  prix: number;
  img: string;
  quantity: number;
}

function Panier() {
  const itemNew = sessionStorage.getItem('cart');
  const storedCartItems = itemNew ? JSON.parse(itemNew) : [];

  const [prixHistory, setPrixHistory] = useState<number[]>([]);
  const [cart, setCart] = useState(storedCartItems);

  useEffect(() => {
    const itemNew = sessionStorage.getItem('cart');
    const storedCartItems = itemNew ? JSON.parse(itemNew) : [];
    setPrixHistory(storedCartItems.map(item => item.prix));

    setCart(storedCartItems);
  }, []);

  const handleQuantity = (index: number) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;

    // Ajouter le prix actuel à l'historique des prix
    setPrixHistory([...prixHistory, updatedCart[index].prix]);

    // Mettre à jour le prix de l'article
    updatedCart[index].prix += prixHistory[0];

    setCart(updatedCart);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    console.log(prixHistory[0]);
    console.log(prixHistory);

  }

  const handleDecrease = (index: number) => {

    const updatedCart = [...cart];

    if (updatedCart[index].quantity <= 1) {

    }
    else {


    updatedCart[index].quantity -= 1;
    setPrixHistory([...prixHistory, updatedCart[index].prix]);

    updatedCart[index].prix -= prixHistory[0];

    setCart(updatedCart);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    console.log(prixHistory[0]);
    console.log(prixHistory);
  }

  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton className="button-style" slot="start" href="/Home"><img src='../src/img/cart.png' alt="cart"/></IonButton>
        </IonToolbar>
      </IonHeader>
    <IonContent>
      <div className='contentStyle'>
        <div className='containerFriend'>
          {storedCartItems ? (
            storedCartItems.map((item, index) => (
              <IonCard key={index} className='itemFriend'>
                <h2>{item.title}</h2>
                <p>Prix: {item.prix}</p>
                <img className="itemFriend-img" src={item.img} alt={item.title} />
                <p>Quantité : {item.quantity}</p>
                <IonButton onClick={() => handleQuantity(index)}><strong>+</strong></IonButton>
                <IonButton onClick={() => handleDecrease(index)}><strong>-</strong></IonButton>
              </IonCard>
            ))
          ) : (
            <p>Vous n'avez pas encore fait d'achats</p>
          )}
        </div>
      </div>
    </IonContent>
    </IonPage>
  );
}

export default Panier;
