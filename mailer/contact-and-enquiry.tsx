import { ASSET_DIR } from 'hgss-dir'
import { Html, Head, Preview, Body, Container, Heading, Text, Section, Img, Tailwind } from '@react-email/components'
import { transl } from 'lib/util'

type ContactAndEnquiryEmailProps = {
  name       : string
  message    : string
  year       : number
  currentDate: string
  siteName   : string
  appName    : string
}

export default function ContactAndEnquiryEmail({ appName, name, message, currentDate, year, siteName }: ContactAndEnquiryEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{transl('smtp.contact_and_enquiry.subject', { name })}</Preview>
      <Tailwind>
        <Body className={'min-w-[320px] w-auto bg-transparent items-center align-middle text-white font-sans'}>
          <Section className={'bg-transparent flex justify-center py-6'}>
            <Img src={ASSET_DIR.LOGO_PRODUCTION_PNG} width={'120'} alt="HGSS Logo" />
          </Section>
          <Container className={'max-w-[600px] mx-auto bg-[#0D0E0E]'}>
            <Section className={'bg-[#999] h-[2px] w-full'} />
            <Section className={'px-8 py-10 text-white'}>
              <Heading className={'font-sans text-2xl my-10'}>
                {appName}&nbsp;{transl('smtp.contact_and_enquiry.title')}
              </Heading>
              <Text className={'font-bold text-md text-base mb-1'}>
                From: {name} (Customer) &nbsp;|&nbsp; {currentDate}
              </Text>
              <Text className={'mb-6 whitespace-pre-line'}>{message}</Text>
            </Section>
          </Container>

          <Section className={'text-center text-xs text-[#999] pb-4 mt-10'}>
            &copy; {year} {siteName}. {transl('legal.copyright_notice')}
          </Section>
        </Body>
      </Tailwind>
    </Html>
  )
}
