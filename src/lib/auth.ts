import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth'
import { auth, db } from './firebase'
import { collection, doc, getDocs, query, setDoc, Timestamp, where } from 'firebase/firestore'
import type { UserRole } from '@/types'

export async function checkUsernameAvailable(username: string): Promise<boolean> {
  const q = query(collection(db, 'users'), where('username', '==', username))
  const snap = await getDocs(q)
  return snap.empty
}

export async function registerUser(email: string, password: string, username: string, role: UserRole, avatarData?: string){
  const available = await checkUsernameAvailable(username)
  if (!available) throw new Error('Username already taken')

  const cred = await createUserWithEmailAndPassword(auth, email, password)
  const uid = cred.user.uid

  await setDoc(doc(db, 'users', uid), {
    username,
    email,
    role,
    avatarData: avatarData || null,
    createdAt: Timestamp.now(),
    avgCreatorRating: 0,
    skinCount: 0,
    banned: false,
  })

  return cred.user
}

export async function signIn(email: string, password: string){
  return signInWithEmailAndPassword(auth, email, password)
}

export async function signOut(){
  return firebaseSignOut(auth)
}

