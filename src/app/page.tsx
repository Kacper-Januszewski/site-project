import Header from './components/header_section'
import Hero from './components/hero_section/hero'
import Footer from "./components/footer_section/footer";
export default function Home() {
  return (
      <main className="mx-10 mt-10 mb-1 md:mx-[17vw] md:mt-20 md:mb-1">
          <div className="mb-16 md:mx-[3vw]">
              <Header />
          </div>
          <div>
              <Hero />
              {/*<div>*/}
              {/*    My work*/}
              {/*    <div>*/}
              {/*        Github <br />*/}
              {/*        Live sites <br />*/}
              {/*        Aesthetic <br />*/}
              {/*    </div>*/}
              {/*</div>*/}
              {/*<div>*/}
              {/*    Contact me*/}
              {/*    <div>*/}
              {/*        LinkedIn <br />*/}
              {/*        Github <br />*/}
              {/*        Email <br />*/}
              {/*    </div>*/}
              {/*</div>*/}
          </div>
          <div>
            <Footer />
          </div>
      </main>
  );
}
