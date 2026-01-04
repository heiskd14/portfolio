import { motion } from "framer-motion";
import profilePic from "@assets/MATRIC-320_1767402764655.jpg";

export function About() {
  return (
    <section id="about" className="py-24 bg-secondary/30 overflow-visible">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/3 flex justify-center"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <img 
                src={profilePic} 
                alt="King David" 
                className="relative rounded-2xl w-full max-w-sm object-cover shadow-2xl"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-2/3 space-y-6"
          >
            <h2 className="text-3xl font-bold font-display">About Me</h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                I am a Computer Engineering student with a strong focus on software and web development. 
                I build practical, project-driven applications with clean, maintainable code and a problem-solving mindset.
              </p>
              <p>
                I have experience developing frontend web applications, responsive user interfaces, and CBT/quiz-based systems, 
                as well as implementing basic backend logic and APIs. I enjoy working with modern JavaScript concepts, 
                structuring scalable projects, and improving performance and usability.
              </p>
              <div>
                <p className="font-semibold text-foreground mb-2">I can develop:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Frontend applications and dynamic web interfaces</li>
                  <li>Responsive websites</li>
                  <li>CBT and educational web systems</li>
                  <li>Basic backend APIs and application logic</li>
                </ul>
              </div>
              <p>
                I am continuously learning and seeking opportunities to grow through real-world projects and collaborations.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
