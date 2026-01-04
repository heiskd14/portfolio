import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Projects
  app.get(api.projects.list.path, async (_req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  // Skills
  app.get(api.skills.list.path, async (_req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  // Contact
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      const message = await storage.createMessage(input);

      if (resend) {
        try {
          await resend.emails.send({
            from: "Portfolio <onboarding@resend.dev>",
            to: "okeyodekingdavid@gmail.com",
            subject: `New Message from ${input.name}`,
            text: `Name: ${input.name}\nEmail: ${input.email}\n\nMessage:\n${input.message}`,
          });
        } catch (emailErr) {
          console.error("Failed to send email:", emailErr);
        }
      }

      res.json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Seed Data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    const projects = [
      {
        title: "CBT Exam System",
        description: "A comprehensive computer-based testing platform for educational institutions.",
        imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80",
        projectUrl: "",
        repoUrl: "https://github.com/heiskd14/cbt-exam",
        tags: ["React", "PostgreSQL", "Node.js"],
      },
      {
        title: "Recipe App API",
        description: "A robust backend API for managing and sharing culinary recipes.",
        imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
        projectUrl: "",
        repoUrl: "https://github.com/heiskd14/recipe-app-api",
        tags: ["TypeScript", "Express", "Drizzle"],
      },
      {
        title: "Interactive Carousel",
        description: "A highly performant and accessible UI component for showcasing content.",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        projectUrl: "",
        repoUrl: "https://github.com/heiskd14/Carousel",
        tags: ["React", "Framer Motion", "Tailwind"],
      },
      {
        title: "YouTube Website Clone",
        description: "A pixel-perfect replica of the YouTube interface with video playback features.",
        imageUrl: "https://images.unsplash.com/photo-1527219525722-da9527aa694d?w=800&q=80",
        projectUrl: "",
        repoUrl: "https://github.com/heiskd14/youtubewebsite",
        tags: ["React", "YouTube API", "CSS"],
      },
      {
        title: "Jamb CBT Exam",
        description: "Specialized examination platform tailored for JAMB preparation and simulation.",
        imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80",
        projectUrl: "",
        repoUrl: "https://github.com/heiskd14/Jambcbt-exam",
        tags: ["React", "Node.js", "Education"],
      },
      {
        title: "Personal Portfolio",
        description: "A modern developer portfolio website showcasing my projects and skills.",
        imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80",
        projectUrl: "",
        repoUrl: "https://github.com/heiskd14/portfolio",
        tags: ["React", "Tailwind", "Express", "Drizzle"],
      }
    ];

    for (const project of projects) {
      await storage.createProject(project);
    }
  }

  const existingSkills = await storage.getSkills();
  if (existingSkills.length === 0) {
    const skills = [
      { name: "React", category: "Frontend", proficiency: 90 },
      { name: "TypeScript", category: "Frontend", proficiency: 85 },
      { name: "Tailwind CSS", category: "Frontend", proficiency: 95 },
      { name: "Node.js", category: "Backend", proficiency: 80 },
      { name: "PostgreSQL", category: "Backend", proficiency: 75 },
      { name: "Python", category: "Backend", proficiency: 70 },
      { name: "Git", category: "Tools", proficiency: 85 },
      { name: "Docker", category: "Tools", proficiency: 65 },
      { name: "AWS", category: "Tools", proficiency: 60 },
    ];
    for (const skill of skills) {
      await storage.createSkill(skill);
    }
  }
}
