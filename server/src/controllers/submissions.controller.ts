import { Request, Response, NextFunction } from "express";
import { promises as fs } from "fs";
import path from "path";

export const createSubmission = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payload = req.body;
    if (payload == null || typeof payload !== "object") {
      return res.status(400).json({
        status: "error",
        message: "Invalid request body",
      });
    }

    try {
      const { default: prisma } = await import("../utils/prisma");
      const created = await prisma.submission.create({
        data: {
          data: payload as unknown as object,
        },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return res.status(201).json({
        status: "success",
        data: created,
      });
    } catch {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const record = {
        id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        data: payload,
      };
      const dataDir = path.resolve(process.cwd(), "server", "data");
      const filePath = path.join(dataDir, "submissions.jsonl");
      await fs.mkdir(dataDir, { recursive: true });
      await fs.appendFile(filePath, JSON.stringify(record) + "\n", "utf8");
      return res.status(201).json({
        status: "success",
        data: {
          id: record.id,
          createdAt: record.createdAt,
          updatedAt: record.updatedAt,
        },
        fallback: "file",
      });
    }
  } catch (err) {
    next(err);
  }
};

export const listSubmissions = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    try {
      const { default: prisma } = await import("../utils/prisma");
      const items = await prisma.submission.findMany({
        orderBy: { createdAt: "desc" },
        select: { id: true, createdAt: true, updatedAt: true },
        take: 50,
      });
      return res.json({ status: "success", data: items });
    } catch {
      const dataDir = path.resolve(process.cwd(), "server", "data");
      const filePath = path.join(dataDir, "submissions.jsonl");
      let result: Array<{ id: string; createdAt: string; updatedAt: string }> =
        [];
      try {
        const content = await fs.readFile(filePath, "utf8");
        const lines = content.trim().split("\n");
        for (let i = lines.length - 1; i >= 0 && result.length < 50; i--) {
          const obj = JSON.parse(lines[i]);
          result.push({
            id: obj.id,
            createdAt: obj.createdAt,
            updatedAt: obj.updatedAt,
          });
        }
      } catch {
        result = [];
      }
      return res.json({ status: "success", data: result });
    }
  } catch (err) {
    next(err);
  }
};

export const getSubmissionById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const idParam = Array.isArray(id) ? id[0] : id;
    try {
      const { default: prisma } = await import("../utils/prisma");
      const item = await prisma.submission.findUnique({
        where: { id: idParam },
      });
      if (!item) {
        return res.status(404).json({ status: "error", message: "Not found" });
      }
      return res.json({ status: "success", data: item });
    } catch {
      const dataDir = path.resolve(process.cwd(), "server", "data");
      const filePath = path.join(dataDir, "submissions.jsonl");
      let content = "";
      try {
        content = await fs.readFile(filePath, "utf8");
      } catch {
        content = "";
      }
      if (content) {
        const lines = content.trim().split("\n");
        for (let i = lines.length - 1; i >= 0; i--) {
          const obj = JSON.parse(lines[i]);
          if (obj.id === idParam) {
            return res.json({ status: "success", data: obj });
          }
        }
      }
      return res.status(404).json({ status: "error", message: "Not found" });
    }
  } catch (err) {
    next(err);
  }
};
