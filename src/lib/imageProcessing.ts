export async function processAvatarImage(file: File): Promise<string> {
  if (file.size > 100000) throw new Error('Avatar must be under 100KB')

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.src = e.target?.result as string
      img.onload = () => {
        const size = 128
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0, size, size)
        const base64 = canvas.toDataURL('image/webp', 0.85)
        if (base64.length > 50000) reject(new Error('Processed avatar too large'))
        else resolve(base64)
      }
      img.onerror = () => reject(new Error('Failed to load image'))
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

