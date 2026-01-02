import { projects, skills, messages, type Project, type InsertProject, type Skill, type InsertSkill, type Message, type InsertMessage } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getSkills(): Promise<Skill[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  
  // Seed/Admin methods
  createProject(project: InsertProject): Promise<Project>;
  createSkill(skill: InsertSkill): Promise<Skill>;
}

export class DatabaseStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db.insert(messages).values(insertMessage).returning();
    return message;
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db.insert(projects).values(insertProject).returning();
    return project;
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const [skill] = await db.insert(skills).values(insertSkill).returning();
    return skill;
  }
}

export const storage = new DatabaseStorage();
