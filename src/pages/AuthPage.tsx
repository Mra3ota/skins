import LoginForm from '@/components/auth/LoginForm'
import RegisterForm from '@/components/auth/RegisterForm'
import { useState } from 'react'

export default function AuthPage(){
  const [tab,setTab]=useState<'login'|'register'>('login')
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-light gradient-text mb-8">Вход / Регистрация</h2>
      <div className="card-surface rounded-3xl p-8">
        <div className="flex gap-3 mb-8">
          <button onClick={()=>setTab('login')} className={`px-6 py-2 rounded-full border ${tab==='login'?'border-purple-500 bg-purple-500/10':'border-white/10 bg-white/5'}`}>Вход</button>
          <button onClick={()=>setTab('register')} className={`px-6 py-2 rounded-full border ${tab==='register'?'border-purple-500 bg-purple-500/10':'border-white/10 bg-white/5'}`}>Регистрация</button>
        </div>
        {tab==='login'? <LoginForm/> : <RegisterForm/>}
      </div>
    </div>
  )
}

