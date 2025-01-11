// import { createContext, useContext, useState, useEffect } from 'react';
// import { db } from '/src/data/firebase.js';
// import { collection, query, onSnapshot } from 'firebase/firestore';
// import { addFavoriteCard, removeFavoriteCard } from '/src/data/firebase.js';

// const FavoriteContext = createContext();

// export const FavoriteProvider = ({ children }) => {
//   const [favoriteCards, setFavoriteCards] = useState([]);

//   useEffect(() => {
//     const fetchFavoriteCards = async () => {
//       // Логіка отримання улюблених карток з Firestore
//       const user = /* отримати користувача з AuthContext */;
//       const favoritesCollection = collection(db, 'users', user.uid, 'favorites');
//       const q = query(favoritesCollection);

//       const unsubscribe = onSnapshot(q, (snapshot) => {
//         const data = snapshot.docs.map((doc) => doc.data());
//         setFavoriteCards(data);
//       });

//       return () => unsubscribe();
//     };

//     fetchFavoriteCards();
//   }, []);

//  addFavoriteCard()

//   removeFavoriteCard()

//   return (
//     <FavoriteContext.Provider value={{ favoriteCards, addToFavorites, removeFromFavorites }}>
//       {children}
//     </FavoriteContext.Provider>
//   );
// };

// export const useFavorites = () => {
//   return useContext(FavoriteContext);
// };
