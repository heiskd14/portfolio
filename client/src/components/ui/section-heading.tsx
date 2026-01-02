import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({ title, subtitle, align = "center" }: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
          {title} <span className="text-primary">.</span>
        </h2>
        {subtitle && (
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {subtitle}
          </p>
        )}
        <div className={`mt-4 h-1.5 w-20 bg-primary rounded-full ${align === "center" ? "mx-auto" : ""}`} />
      </motion.div>
    </div>
  );
}
