import { motion } from "framer-motion";
import { useSkills } from "@/hooks/use-portfolio";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export function Skills() {
  const { data: skills, isLoading } = useSkills();

  const categories = [
    { id: "Frontend", label: "Frontend Development" },
    { id: "Backend", label: "Backend Architecture" },
    { id: "Tools", label: "Tools & DevOps" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (isLoading) {
    return (
      <section id="skills" className="py-20 md:py-32 bg-secondary/20">
        <div className="container mx-auto px-4">
          <SectionHeading title="My Expertise" subtitle="Loading skills..." />
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const groupedSkills = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>) || {};

  return (
    <section id="skills" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Technical Skills" 
          subtitle="The technologies and tools I use to bring ideas to life."
        />

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categories.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-card border border-border/50 rounded-2xl p-8 hover:border-primary/50 transition-colors duration-300 shadow-lg shadow-black/20"
            >
              <h3 className="text-xl font-bold font-display mb-6 text-foreground/90">
                {category.label}
              </h3>
              
              <motion.div 
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2"
              >
                {groupedSkills[category.id]?.map((skill) => (
                  <motion.div key={skill.id} variants={item}>
                    <Badge 
                      variant="secondary" 
                      className="px-3 py-1.5 text-sm bg-secondary/50 hover:bg-primary/20 hover:text-primary transition-colors border-transparent"
                    >
                      {skill.name}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
