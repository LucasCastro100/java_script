import { Container } from "./components/container/container";
import { Section } from "./components/container/section";
import { Site } from "./components/container/site";

export default function Home() {
  return (
    <Site>
      <Container>
        <Section>
          <h1>Welcome to the Home Page</h1>
        </Section>
      </Container>
    </Site>
  )
}