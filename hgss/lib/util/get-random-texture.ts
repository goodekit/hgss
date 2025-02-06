const textureClasses = [
    'texture-bg',
    'texture-2-bg',
    'texture-3-bg',
    'texture-4-bg',
    'texture-5-bg',
    'texture-6-bg',
    'texture-7-bg',
    'texture-8-bg'
  ]

  export const getRandomTextureClass = () => {
    return textureClasses[Math.floor(Math.random() * textureClasses.length)]
  }
