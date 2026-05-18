import { createContext, useContext, useState, useCallback } from 'react'
import DownloadModal from '../components/DownloadModal'

const DownloadModalContext = createContext(null)

export function DownloadModalProvider({ children }) {
  const [open, setOpen] = useState(false)
  const openModal = useCallback(() => setOpen(true), [])
  const closeModal = useCallback(() => setOpen(false), [])

  return (
    <DownloadModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <DownloadModal open={open} onClose={closeModal} />
    </DownloadModalContext.Provider>
  )
}

export function useDownloadModal() {
  const ctx = useContext(DownloadModalContext)
  if (!ctx) throw new Error('useDownloadModal must be used inside DownloadModalProvider')
  return ctx
}
