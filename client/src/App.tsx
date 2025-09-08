import { Layout } from "./components/Layout"; 
import { Technologies } from "./components/sections/Technologies";
import { Hero } from "./components/sections/Hero";
import { Features } from "./components/sections/Features";

function App() {
  return (
    <Layout title="OrbiTube">
      <Hero />
      <Features />
      <Technologies />
    </Layout>
  );
}

export default App;