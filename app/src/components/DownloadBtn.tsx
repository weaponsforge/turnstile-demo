import { toast } from 'react-toastify'
import useTurnstile from '../hooks/useTurnstile'

const DownloadButton = ({ fileId }: { fileId: string }) => {
  const handleTurnstileSuccess = async (token: string) => {
    toast.info(`Downloading ${fileId}...`)

    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, fileId }),
      })

      if (!res.ok) {
        toast.error('Verification failed')
        return
      }

      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${fileId}.pdf`
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      toast.error('Error downloading file')
    }
  }

  const { containerRef, execute } = useTurnstile({
    siteKey: 'your-site-key-here',
    onSuccess: handleTurnstileSuccess,
  })

  return (
    <div style={{ marginBottom: '1rem' }}>
      <button onClick={execute}>Download {fileId}</button>
      <div ref={containerRef} style={{ display: 'none' }} />
    </div>
  )
}

export default DownloadButton
