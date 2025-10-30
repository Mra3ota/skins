import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn } from '@/lib/auth'

export default function LoginForm(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState<string|undefined>()
  const navigate=useNavigate()

  const submit=async(e:React.FormEvent)=>{
    e.preventDefault()
    setError(undefined)
    setLoading(true)
    try{
      await signIn(email,password)
      navigate('/')
    }catch(err:any){ setError(err?.message||'Login failed') }
    finally{ setLoading(false) }
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div>
        <label className="block text-sm text-gray-300 mb-2">Email</label>
        <input className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm text-gray-300 mb-2">Password</label>
        <input className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
      </div>
      {error && <div className="text-sm text-red-400">{error}</div>}
      <button disabled={loading} className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white disabled:opacity-50">
        {loading? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  )
}

