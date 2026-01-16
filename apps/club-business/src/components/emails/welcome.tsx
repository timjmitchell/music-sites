import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Link,
  Preview,
  Section,
  Img,
} from "@react-email/components";

interface WelcomeEmailProps {
  downloadUrl?: string;
}

export function WelcomeEmail({ downloadUrl }: WelcomeEmailProps) {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <style>
          {`
            @font-face {
              font-family: 'Mimosa';
              src: url('https://pub-5c42135ba19f42c8bf2be18a72dda052.r2.dev/fonts/Mimosa-Bold.woff2') format('woff2');
              font-weight: 700;
              font-style: normal;
            }
          `}
        </style>
      </Head>
      <Preview>Thanks for joining the Club Business mailing list</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={section}>
            <Img
              src="https://pub-5c42135ba19f42c8bf2be18a72dda052.r2.dev/logo-red-white-blue-trans.png"
              alt="Club Business"
              width={160}
              style={logo}
            />
            <Text style={heading}>Welcome to the Club</Text>
            <Text style={paragraph}>
              Thanks for signing up. You&apos;ll be the first to know about new
              music, rumors, and business.
            </Text>
            {downloadUrl && (
              <>
                <Text style={paragraph}>
                  Here&apos;s your exclusive download:
                </Text>
                <Link href={downloadUrl} style={button}>
                  Download Now
                </Link>
              </>
            )}
            <Text style={footer}>— The Management</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Colors from site palette
const colors = {
  background: "#340C0C", // oxblood-900
  card: "#511313", // oxblood-800
  iris: "#895CD7", // iris-500 (primary purple)
  irisLight: "#DCCFF3", // iris-200
  plum: "#74446C", // plum-700
  text: "#F2F2F2",
  muted: "#8A8A8A",
};

const body = {
  backgroundColor: colors.background,
  fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "560px",
};

const section = {
  backgroundColor: colors.card,
  borderRadius: "8px",
  padding: "32px",
};

const logo = {
  margin: "0 0 24px",
};

const heading = {
  color: colors.irisLight,
  fontSize: "32px",
  fontWeight: "700",
  fontFamily: 'Mimosa, Georgia, serif',
  margin: "0 0 16px",
};

const paragraph = {
  color: colors.text,
  fontSize: "16px",
  lineHeight: "26px",
  margin: "0 0 16px",
};

const button = {
  backgroundColor: colors.iris,
  borderRadius: "6px",
  color: "#ffffff",
  display: "inline-block",
  fontSize: "14px",
  fontWeight: "600",
  padding: "14px 28px",
  textDecoration: "none",
  margin: "8px 0 24px",
};

const footer = {
  color: colors.muted,
  fontSize: "14px",
  margin: "24px 0 0",
  borderTop: `1px solid ${colors.plum}`,
  paddingTop: "16px",
};

export default WelcomeEmail;
