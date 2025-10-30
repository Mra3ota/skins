import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '@/lib/auth'
import { processAvatarImage } from '@/lib/imageProcessing'
import type { UserRole } from '@/types'

export default function RegisterForm(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [username,setUsername]=useState('')
  const [role,setRole]=useState<UserRole>('creator')
  const [avatarFile,setAvatarFile]=useState<File|null>(null)
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState<string|undefined>()
  const navigate=useNavigate()

  const submit=async(e:React.FormEvent)=>{
    e.preventDefault()
    setError(undefined)
    if(username.length<3||username.length>20){setError('Username must be 3-20 chars');return}
    if(password.length<8){setError('Password must be at least 8 chars');return}
    setLoading(true)
    try{
      let avatarData: string|undefined
      if(avatarFile){ avatarData = await processAvatarImage(avatarFile) }
      await registerUser(email,password,username,role,avatarData)
      navigate('/')
    }catch(err:any){ setError(err?.message||'Registration failed') }
    finally{ setLoading(false) }
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div>
        <label className="block text-sm text-gray-300 mb-2">Email</label>
        <input className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm text-gray-300 mb-2">Username</label>
        <input className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white" value={username} onChange={e=>setUsername(e.target.value)} minLength={3} maxLength={20} required />
      </div>
      <div>
        <label className="block text-sm text-gray-300 mb-2">Password</label>
        <input className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white" type="password" value={password} onChange={e=>setPassword(e.target.value)} minLength={8} required />
      </div>
      <div>
        <label className="block text-sm text-gray-300 mb-2">Role</label>
        <div className="flex gap-3">
          {(['creator','reviewer'] as UserRole[]).map(r=> (
            <label key={r} className={`px-5 py-3 rounded-full cursor-pointer border ${role===r? 'border-purple-500 bg-purple-500/10' : 'border-white/10 bg-white/5'}`}>
              <input className="sr-only" type="radio" name="role" checked={role===r} onChange={()=>setRole(r)} />
              <span className="capitalize">{r}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm text-gray-300 mb-2">Avatar (optional)</label>
        <input type="file" accept="image/png,image/jpeg" onChange={(e)=>setAvatarFile(e.target.files?.[0]??null)} />
        <p className="text-xs text-gray-500 mt-1">Max 100KB</p>
      </div>
      {error && <div className="text-sm text-red-400">{error}</div>}
      <button disabled={loading} className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white disabled:opacity-50">
        {loading? 'Creating...' : 'Create Account'}
      </button>
    </form>
  )
}

