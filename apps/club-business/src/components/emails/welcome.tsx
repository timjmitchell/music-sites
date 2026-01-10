import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Link,
  Preview,
  Section,
} from "@react-email/components";

interface WelcomeEmailProps {
  downloadUrl?: string;
}

export function WelcomeEmail({ downloadUrl }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Thanks for joining the Club Business mailing list</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={section}>
            <Text style={heading}>Welcome to Club Business</Text>
            <Text style={paragraph}>
              Thanks for signing up. You&apos;ll be the first to know about new
              releases, shows, and exclusive content.
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
            <Text style={footer}>— Club Business</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  backgroundColor: "#0a0a0a",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "560px",
};

const section = {
  backgroundColor: "#171717",
  borderRadius: "8px",
  padding: "32px",
};

const heading = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0 0 16px",
};

const paragraph = {
  color: "#a3a3a3",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 16px",
};

const button = {
  backgroundColor: "#ffffff",
  borderRadius: "6px",
  color: "#0a0a0a",
  display: "inline-block",
  fontSize: "14px",
  fontWeight: "600",
  padding: "12px 24px",
  textDecoration: "none",
  margin: "8px 0 24px",
};

const footer = {
  color: "#525252",
  fontSize: "14px",
  margin: "24px 0 0",
};

export default WelcomeEmail;
