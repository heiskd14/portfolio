import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

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
    await storage.createProject({
      title: "E-Commerce Platform",
      description: "A full-featured online store with cart, checkout, and admin dashboard.",
      imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
      projectUrl: "https://demo-store.com",
      repoUrl: "https://github.com/username/store",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    });
    await storage.createProject({
      title: "Task Management App",
      description: "Collaborative task manager with real-time updates and team features.",
      imageUrl: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=800&q=80",
      projectUrl: "https://task-app.com",
      repoUrl: "https://github.com/username/tasks",
      tags: ["TypeScript", "Socket.io", "Express"],
    });
    await storage.createProject({
      title: "Weather Dashboard",
      description: "Real-time weather data visualization using global APIs.",
      imageUrl: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80",
      projectUrl: "https://weather-dash.com",
      repoUrl: "https://github.com/username/weather",
      tags: ["React", "D3.js", "OpenWeatherMap"],
    });
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
