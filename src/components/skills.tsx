import MotionWrap from "./motion-wrap";

const skills = [
  { name: "Python" },
  { name: "TensorFlow" },
  { name: "PyTorch" },
  { name: "HuggingFace" },
  { name: "Scikit-learn" },
  { name: "n8n" },
  { name: "NumPy" },
  { name: "Pandas" },
];

const duplicatedSkills = [...skills, ...skills];

export function Skills() {
  return (
    <section className="py-12 bg-white">
      <div className="container">
        <MotionWrap>
          <h3 className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">
            Technologies I Work With
          </h3>
          <div className="relative overflow-hidden">
            <div className="flex animate-[scroll_40s_linear_infinite] gap-x-8 md:gap-x-12">
              {duplicatedSkills.map((skill, index) => (
                <div key={`${skill.name}-${index}`} className="flex-shrink-0 flex items-center gap-3" title={skill.name}>
                  <span className="text-lg font-medium text-foreground/80">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </MotionWrap>
      </div>
    </section>
  );
}
