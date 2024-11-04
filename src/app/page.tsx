import Cta from "@/app/components/cta/form";
import Carousel from "@/app/components/content/carouseled_content/carousel";

export default function Home() {
  return (
      <main className="h-full text-white">
        <div className="container mx-auto px-4 font-sans">
            <section id="home" className="pt-[100px]">
              <h1 className="text-xl text-center leading-[50px]">
                  Hello! My name is <br /><span className="font-bold text-5xl">Kacper Januszewski</span> <br />and I&apos;m a <br /><span className="font-medium text-4xl">Web Developer</span>
              </h1>
            </section>
            <div className="pt-[200px] pb-[200px]">
                <div id="work" className="flex flex-wrap h-fit bg-black pt-[400px] gap-x-20 justify-center">
                    <Carousel filename={'CodeItems.json'}/>
                    <p className='text-center w-[448px] mx-auto '>My work consists of multiple RESTful API projects in .NET as well as using code-first approach. I have also set-up a simple multi-service web app using docker</p>
                </div>
                <div className="flex flex-wrap h-fit pt-[400px] gap-x-20 justify-center pb-[400px]">
                    <p className='text-center w-[448px] mx-auto'>Aesthetic experience is something that I take very seriously. I have finished a filmmaking highschool where I learned photography and design, both of which are proving useful even after I changed my industry career path.</p>
                    <Carousel filename={'PhotoItems.json'}/>
                </div>
            </div>
                <section id="contact" className="text-center text-xl">
                    <Cta />
                </section>
        </div>
      </main>
  );
}
