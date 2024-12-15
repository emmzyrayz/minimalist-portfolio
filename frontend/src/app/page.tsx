'use client'
import React from "react";
import { AboutC } from "@/components/about/page";
import { Contact } from "@/components/contact/page";
import { Experience } from "@/components/experi/page";
import { Projects } from "@/components/projects/page";
import { Show } from "@/components/show/page";
import { Skills } from "@/components/skills/page";
import { Testimonial } from "@/components/testimonial/page";

export default function Home() {


  return (
    <>
      <Show />
      <Skills />
      <Experience />
      <AboutC />
      <Projects />
      <Testimonial />
      <Contact />
    </>
  );
}
