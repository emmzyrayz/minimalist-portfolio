import { AboutC } from "@/components/about/page";
import { Contact } from "@/components/contact/page";
import { Experience } from "@/components/experi/page";
import { Footer } from "@/components/footer/page";
import { Navbar } from "@/components/navbar/page";
import { Projects } from "@/components/projects/page";
import { Show } from "@/components/show/page";
import { Skills } from "@/components/skills/page";
import { Testimonial } from "@/components/testimonial/page";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Show />
      <Skills />
      <Experience />
      <AboutC />
      <Projects />
      <Testimonial />
      <Contact />
      <Footer />
    </div>
  )
}
