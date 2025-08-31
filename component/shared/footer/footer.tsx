import { GLOBAL } from 'hgss'
import { transl } from 'lib'

export const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer>
      <div className={"p-5 flex-center special-elite flex md:text-xl text-xs"}>
        {currentYear} &copy; {GLOBAL.APP_NAME}. {transl('legal.copyright_notice')}
      </div>
    </footer>
  )
}
