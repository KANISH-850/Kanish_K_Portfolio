import MotionWrap from "./motion-wrap";

export function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container max-w-3xl mx-auto text-center">
        <MotionWrap>
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-6">
            A Glimpse <span className="bg-gradient-to-r from-[#030303] to-[#575956] bg-clip-text text-transparent">Into My World</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            I'm an AI enthusiast with a deep passion for building intelligent systems. My journey is fueled by a fascination with Machine Learning, Natural Language Processing, and the endless possibilities of AI-driven automation. I thrive on solving complex problems and turning innovative ideas into reality.
          </p>
        </MotionWrap>
      </div>
    </section>
  );
}
