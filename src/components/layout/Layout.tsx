import { ReactNode } from 'react'
import Header from './Header'

export default function Layout({children}:{children:ReactNode}){
  return (
    <div className="min-h-screen bg-[color:var(--bg-primary)]">
      <Header/>
      <main className="pt-20">{children}</main>
    </div>
  )
}

