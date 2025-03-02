import Header from './components/header_section'
import Hero from './components/hero_section/hero'
import Footer from "./components/footer_section/footer";
export default function Home() {
  return (
      <div className="bg-[url('/assets/paper.jpg')] min-h-100vw">
          <main className="mx-10 md:mx-[17vw] md:pt-24">
              <div className="mb-16 md:mx-[3vw]">
                  <Header />
              </div>
              <div>
                  <Hero />
              </div>
              <div>
                <Footer />
              </div>
          </main>
      </div>
  );
}
