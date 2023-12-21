import { useEffect } from 'react'

declare global {
  interface Window {
    adsbygoogle?: any[]
  }
}

const Adsense = () => {
  const client = 'ca-pub-1582102024302535'
  const slot = '8042682870'

  useEffect(() => {
    window.adsbygoogle && window.adsbygoogle.push({})
  }, [])

  return (
    <ins
      className='adsbygoogle'
      style={{
        display: 'block',
        maxWidth: '100%',
      }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format='horizontal'
      data-full-width-responsive='false'
    />
  )
}

export default Adsense
