'use client'

import Image from 'next/image'
import { useState } from 'react'

type Props = {
  logo: string
  name: string
  size: number
}

function isUrl(s: string): boolean {
  return s.startsWith('http') || s.startsWith('/')
}

export default function FirmLogo({ logo, name, size }: Props) {
  const [imgError, setImgError] = useState(false)

  if (isUrl(logo) && !imgError) {
    return (
      <Image
        src={logo}
        alt={`${name} logo`}
        width={size}
        height={size}
        style={{ borderRadius: 'inherit', objectFit: 'contain' }}
        onError={() => setImgError(true)}
        unoptimized
      />
    )
  }

  const initials = isUrl(logo)
    ? name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : logo

  return <span>{initials}</span>
}
