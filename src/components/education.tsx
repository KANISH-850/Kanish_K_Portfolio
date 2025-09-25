import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, School, Award } from "lucide-react";
import MotionWrap from "./motion-wrap";

export function Education() {
  return (
    <section id="education" className="py-20 md:py-28">
      <div className="container">
        <MotionWrap>
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">
              My <span className="bg-gradient-to-r from-[#030303] to-[#575956] bg-clip-text text-transparent">Education</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              My academic journey and foundation in computer science.
            </p>
          </div>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-1 gap-8">
            <Card className="shadow-lg">
              <CardContent className="p-8 flex items-start gap-6">
                <div className="bg-accent/10 p-4 rounded-lg">
                  <GraduationCap className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">B.E. Computer Science Engineering</h3>
                  <p className="text-muted-foreground mt-1">Bannari Amman Institute of Technology (BITSathy)</p>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardContent className="p-8 flex items-start gap-6">
                <div className="bg-accent/10 p-4 rounded-lg">
                  <School className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Schooling</h3>
                  <p className="text-muted-foreground mt-1">Your School Name, City</p>
                </div>
              </CardContent>
            </Card>
             <Card className="shadow-lg">
              <CardContent className="p-8 flex items-start gap-6">
                <div className="bg-accent/10 p-4 rounded-lg">
                  <Award className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Online Certificates</h3>
                  <p className="text-muted-foreground mt-1">List your online certifications here.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </MotionWrap>
      </div>
    </section>
  );
}
