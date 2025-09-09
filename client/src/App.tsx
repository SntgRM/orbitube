import { Layout } from "./components/Layout"; 
import { About } from "./components/sections/About";
import { Hero } from "./components/sections/Hero";
import { Features } from "./components/sections/Features";

function App() {
  return (
    <Layout title="OrbiTube">
      <Hero />
      <Features />
      <About />
    </Layout>
  );
}

export default App;