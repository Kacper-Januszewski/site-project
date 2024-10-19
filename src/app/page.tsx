import Cta from "@/app/components/cta/form";
import Content_box from "@/app/components/content/content_box";
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
                <div id="work" className="h-[1000px] bg-black pt-[400px]"><Carousel />{/*also could be Content_box*/}</div>
            </div>
                <section id="contact" className="text-center text-xl">
                    <Cta />
                </section>
        </div>
      </main>
  );
}
