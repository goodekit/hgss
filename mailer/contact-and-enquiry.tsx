import { ASSET_DIR } from 'hgss-dir'
import { Html, Head, Preview, Body, Container, Heading, Text, Section, Img, Tailwind } from '@react-email/components'
import { transl } from 'lib/util'

type ContactAndEnquiryEmailProps = {
  name    : string
  message : string
  year    : number
  siteName: string
  appName : string
}

export default function ContactAndEnquiryEmail({ appName, name, message, year, siteName }: ContactAndEnquiryEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{transl('smtp.contact_and_enquiry.subject', { name })}</Preview>
      <Tailwind>
        <Body className={'min-w-[700px] h-[700px] bg-transparent text-[#999] m-20 items-center align-middle font-sans'}>
          <Container className={'max-w-[600px] my-10 mx-auto bg-[#0D0E0E] border border-[#1D2020] rounded-lg p-10 shadow-lg'}>
            <Heading className={'font-sans text-2xl my-10'}>{appName}&nbsp;{transl('smtp.contact_and_enquiry.title')}</Heading>

            <Text className={'text-md'}>From: {name}</Text>
            <Text>{message}</Text>

            <Section className={'flex justify-center mt-8'}>
              <Img src={ASSET_DIR.MONO} width={'100'} alt="HGSS Logo" />
            </Section>
          </Container>

          <Text className={'text-center text-xs text-[#999] mt-10'}>
            &copy; {year} {siteName}. {transl('legal.copyright_notice')}
          </Text>
        </Body>
      </Tailwind>
    </Html>
  )
}
