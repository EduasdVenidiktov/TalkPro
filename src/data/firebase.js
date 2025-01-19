import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
import { getDatabase, ref, get, child } from 'firebase/database'
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
  where,
  addDoc,
  deleteDoc,
  query,
} from 'firebase/firestore'
import { toast } from 'react-hot-toast'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
export const db = getFirestore(app)

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export { database, ref, get, child }

export const addUserToFirestore = async (user, name) => {
  try {
    const userRef = doc(db, 'users', user.uid)
    await setDoc(userRef, {
      name: name,
      email: user.email,
      createdAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error adding user to Firestore:', error)
    throw error
  }
}

export const handleToggleFavorite = async (
  userId,
  teacherData,
  onToggleFavorite
) => {
  try {
    const userRef = doc(db, 'users', userId)
    const favoriteCardsCollectionRef = collection(userRef, 'favoriteCards')

    const q = query(
      favoriteCardsCollectionRef,
      where('id', '==', teacherData.id)
    )
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      for (const docSnapshot of querySnapshot.docs) {
        await deleteDoc(docSnapshot.ref)
      }

      toast.error('Removed from favorites!', {
        className: 'toastError',
        duration: 1500,
      })

      if (onToggleFavorite) {
        onToggleFavorite(teacherData)
      }
    } else {
      await addDoc(favoriteCardsCollectionRef, teacherData)

      toast.success('Added to favorites!', {
        className: 'toastSuccess',
        duration: 1000,
      })
    }
  } catch {}
}

export const getFavoriteCards = async (userId) => {
  if (!userId) {
    console.error('User ID is not provided.')
    return []
  }
  try {
    const userRef = doc(db, 'users', userId)
    const favoriteCardsCollectionRef = collection(userRef, 'favoriteCards')

    const querySnapshot = await getDocs(favoriteCardsCollectionRef)

    const favoriteCards = []
    querySnapshot.forEach((doc) => {
      favoriteCards.push(doc.data())
    })

    return favoriteCards
  } catch (error) {
    console.error('Error getting favorite cards:', error)
    return []
  }
}

export const getTeachersData = async () => {
  const dbRef = ref(database, '/teachers')
  try {
    const snapshot = await get(dbRef)
    if (snapshot.exists()) {
      const teachersArray = Object.values(snapshot.val())
      return teachersArray
    } else {
      return []
    }
  } catch (error) {
    console.error('Помилка при отриманні даних:', error)
    return []
  }
}
