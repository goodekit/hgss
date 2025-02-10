'use client'

import { Fragment, FC } from 'react'

interface GenerateAvatarProps {
    name     : string
    createdAt: Date
}

const GenerateAvatar: FC<GenerateAvatarProps> = ({ name, createdAt }) => {

  const getAvatarUrl = () => {
    const encodedName = encodeURIComponent(name || 'Anonymous')
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodedName}-${createdAt}`
  }

  return (
    <Fragment>
      <img src={getAvatarUrl()} alt="Generated Avatar" className="w-full h-full object-cover" />
    </Fragment>
  )
}

export default GenerateAvatar
