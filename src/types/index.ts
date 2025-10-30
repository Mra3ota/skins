import type { Timestamp } from 'firebase/firestore'

export type UserRole = 'creator' | 'reviewer' | 'admin'

export interface UserDoc {
  uid: string
  email: string
  username: string
  role: UserRole
  avatarData?: string | null
  createdAt: Timestamp
  avgCreatorRating?: number
  skinCount?: number
  banned: boolean
}

export interface SkinDoc {
  skinId: string
  authorId: string
  authorUsername: string
  name: string
  description: string
  previewData: string
  originalData: string
  tags: string[]
  createdAt: Timestamp
  updatedAt: Timestamp
  averageRating: number
  ratingCount: number
  views: number
}

export interface RatingDoc {
  score: number
  userId: string
  userUsername: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

