import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import type { User as FirebaseUser } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import type { UserDoc } from '@/types'

interface AuthContextType {
  currentUser: (UserDoc & { uid: string }) | null
  firebaseUser: FirebaseUser | null
  loading: boolean
  refetchUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  firebaseUser: null,
  loading: true,
  refetchUser: async () => {},
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: ReactNode }){
  const [currentUser, setCurrentUser] = useState<(UserDoc & { uid: string }) | null>(null)
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchUserData = async (uid: string) => {
    const snap = await getDoc(doc(db, 'users', uid))
    if (snap.exists()) {
      return { uid, ...(snap.data() as any) } as UserDoc & { uid: string }
    }
    return null
  }

  const refetchUser = async () => {
    if (firebaseUser) {
      const data = await fetchUserData(firebaseUser.uid)
      setCurrentUser(data)
    }
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user)
      if (user) {
        const data = await fetchUserData(user.uid)
        setCurrentUser(data)
      } else {
        setCurrentUser(null)
      }
      setLoading(false)
    })
    return unsub
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, firebaseUser, loading, refetchUser }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

