import { GLOBAL } from 'hgss'

export const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer>
      <div className="p-5 flex-center special-elite flex md:text-xl text-xs">
        {currentYear} &copy; {GLOBAL.APP_NAME}. All rights reserved
      </div>
    </footer>
  )
}
