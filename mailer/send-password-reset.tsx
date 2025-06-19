import { ASSET_DIR } from 'hgss-dir'
import { Html, Head, Preview, Body, Container, Heading, Text, Link, Section, Button, Img, Tailwind } from '@react-email/components'
import { formatText, transl } from 'lib'

type ResetPasswordEmailProps = {
  resetLink: string
  year     : number
  siteName : string
}

export default function ResetPasswordEmail({ resetLink, year, siteName }: ResetPasswordEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{transl('smtp.reset_password.subject')}</Preview>
      <Tailwind>
        <Body className={'min-w-[700px] h-[700px] bg-transparent text-[#999] m-20 items-center align-middle font-sans'}>
          <Container className={'max-w-[600px] my-10 mx-auto bg-[#0D0E0E] border border-[#1D2020] rounded-lg p-10 md:20 shadow-lg'}>
            <Heading className={'font-sans text-2xl my-10'}>{transl('smtp.reset_password.title')}</Heading>
            <Text>{transl('smtp.reset_password.body_1')}</Text>

            <Section className={'text-center my-4'}>
              <Button href={resetLink} className="bg-[#A697CD] text-[#050505] py-3 px-6 font-bold rounded text-base no-underline">
                {formatText(transl('smtp.reset_password.button'), 'uppercase')}
              </Button>
            </Section>

            <Text>{transl('smtp.reset_password.body_1')}</Text>
            <Section className={'bg-[#1D2020] text-center text-xs my-2 py-2 px-4 rounded'}>
              <Link href={resetLink} className={'text-tape break-all'}>
                {resetLink}
              </Link>
            </Section>

            <Text>{transl('smtp.reset_password.body_2')}</Text>

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
