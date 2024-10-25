export const handleEscapeKey = (onClose) => (e) => {
  if (e.key === 'Escape') {
    onClose()
  }
}

export const handleBackdropClick = (onClose) => (e) => {
  if (e.target === e.currentTarget) {
    onClose()
  }
}
