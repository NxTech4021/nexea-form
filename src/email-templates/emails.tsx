import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface EmailProps {
  name: string;
  verificationLink: string;
}

const EbaEmailTemplate: React.FC<EmailProps> = ({
  verificationLink = 'http://localhost:3000/blabla',
}) => {
  return (
    <Html lang='en'>
      <Head />
      <Tailwind>
        <Body style={main}>
          <Container style={container}>
            <Img
              alt='Plaid'
              height='40'
              src={`https://eba.nexea.co/nexealogo.png`}
              style={logo}
              width='40'
            />
            <Text style={tertiary}>Hi and Welcome!</Text>
            <Text style={{ ...secondary, fontSize: 18 }}>
              Thank you for completing the first step. Your assessment link is
              ready!
            </Text>

            <Section className='mt-[32px] mb-[32px] text-center'>
              <Button
                className='rounded bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline'
                href={verificationLink}
              >
                Start Assessment
              </Button>
            </Section>

            <Text style={paragraph}>Not expecting this email?</Text>
            <Text style={paragraph}>
              Contact{' '}
              <Link href='mailto:login@plaid.com' style={link}>
                someone@nexea.co
              </Link>{' '}
              if you did not request this code.
            </Text>
          </Container>
          <Text style={footer}>Securely powered by nexea.</Text>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EbaEmailTemplate;

const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #eee',
  borderRadius: '5px',
  boxShadow: '0 5px 10px rgba(20,50,70,.2)',
  margin: '0 auto',
  marginTop: '20px',
  maxWidth: '360px',
  padding: '68px 0 130px',
};

const logo = {
  margin: '0 auto',
};

const tertiary = {
  color: '#0a85ea',
  fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
  fontSize: '11px',
  fontWeight: 700,
  height: '16px',
  letterSpacing: '0',
  lineHeight: '16px',
  margin: '16px 8px 8px 8px',
  textAlign: 'center' as const,
  textTransform: 'uppercase' as const,
};

const secondary = {
  color: '#000',
  display: 'inline-block',
  fontFamily: 'HelveticaNeue-Medium,Helvetica,Arial,sans-serif',
  fontSize: '20px',
  fontWeight: 500,
  lineHeight: '24px',
  marginBottom: '0',
  marginTop: '0',
  textAlign: 'center' as const,
};

const paragraph = {
  color: '#444',
  fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
  fontSize: '15px',
  letterSpacing: '0',
  lineHeight: '23px',
  margin: '0',
  padding: '0 40px',
  textAlign: 'center' as const,
};

const link = {
  color: '#444',
  textDecoration: 'underline',
};

const footer = {
  color: '#000',
  fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
  fontSize: '12px',
  fontWeight: 800,
  letterSpacing: '0',
  lineHeight: '23px',
  margin: '0',
  marginTop: '20px',
  textAlign: 'center' as const,
  textTransform: 'uppercase' as const,
};
