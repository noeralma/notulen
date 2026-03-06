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
    } catch (dbError) {
      console.warn(
        "Database create failed, falling back to file system",
        dbError,
      );
      const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const record = {
        id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        data: payload,
      };

      // Try multiple possible paths for the data directory
      const possiblePaths = [
        path.resolve(process.cwd(), "data"),
        path.resolve(process.cwd(), "server", "data"),
        path.resolve(__dirname, "../../data"),
        path.resolve(__dirname, "../../../data"),
      ];

      // Try to write to the first path that works or create the first one
      let written = false;
      for (const dir of possiblePaths) {
        try {
          await fs.mkdir(dir, { recursive: true });
          const filePath = path.join(dir, "submissions.jsonl");
          await fs.appendFile(filePath, JSON.stringify(record) + "\n", "utf8");
          written = true;
          break;
        } catch (err) {
          console.warn(`Failed to write to ${dir}:`, err);
          continue;
        }
      }

      if (!written) {
        throw new Error("Failed to save submission to any fallback location");
      }

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
    } catch (dbError) {
      console.warn(
        "Database list failed, falling back to file system",
        dbError,
      );

      // Try multiple possible paths for the data directory
      const possiblePaths = [
        path.resolve(process.cwd(), "data"),
        path.resolve(process.cwd(), "server", "data"),
        path.resolve(__dirname, "../../data"),
        path.resolve(__dirname, "../../../data"),
      ];

      let result: Array<{ id: string; createdAt: string; updatedAt: string }> =
        [];

      for (const dir of possiblePaths) {
        const filePath = path.join(dir, "submissions.jsonl");
        try {
          const content = await fs.readFile(filePath, "utf8");
          const lines = content.trim().split("\n");
          for (let i = lines.length - 1; i >= 0 && result.length < 50; i--) {
            try {
              const obj = JSON.parse(lines[i]);
              result.push({
                id: obj.id,
                createdAt: obj.createdAt,
                updatedAt: obj.updatedAt,
              });
            } catch (e) {
              // Skip invalid JSON lines
            }
          }
          // If we found a file and read it, stop looking
          if (content) break;
        } catch {
          continue;
        }
      }

      return res.json({ status: "success", data: result });
    }
  } catch (err) {
    next(err);
  }
};

export const listJadwalSubmissions = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    try {
      const { default: prisma } = await import("../utils/prisma");
      const items = await prisma.submission.findMany({
        orderBy: { createdAt: "desc" },
        take: 50,
      });
      const mapped = items
        .map((item) => {
          const data = item.data as unknown as {
            type?: string;
            name?: string;
            year?: number;
            month?: number;
          };
          if (!data || data.type !== "jadwal") {
            return null;
          }
          return {
            id: item.id,
            name: typeof data.name === "string" ? data.name : null,
            year: typeof data.year === "number" ? data.year : null,
            month: typeof data.month === "number" ? data.month : null,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          };
        })
        .filter(
          (
            v,
          ): v is {
            id: string;
            name: string | null;
            year: number | null;
            month: number | null;
            createdAt: Date;
            updatedAt: Date;
          } => v !== null,
        );
      return res.json({ status: "success", data: mapped });
    } catch (dbError) {
      console.warn(
        "Database listJadwal failed, falling back to file system",
        dbError,
      );

      // Try multiple possible paths for the data directory
      const possiblePaths = [
        path.resolve(process.cwd(), "data"),
        path.resolve(process.cwd(), "server", "data"),
        path.resolve(__dirname, "../../data"),
        path.resolve(__dirname, "../../../data"),
      ];

      let result: Array<{
        id: string;
        name: string | null;
        year: number | null;
        month: number | null;
        createdAt: string;
        updatedAt: string;
      }> = [];

      for (const dir of possiblePaths) {
        const filePath = path.join(dir, "submissions.jsonl");
        try {
          const content = await fs.readFile(filePath, "utf8");
          const lines = content.trim().split("\n");
          for (let i = lines.length - 1; i >= 0 && result.length < 50; i--) {
            try {
              const obj = JSON.parse(lines[i]) as {
                id: string;
                createdAt: string;
                updatedAt: string;
                data?: {
                  type?: string;
                  name?: string;
                  year?: number;
                  month?: number;
                };
              };
              if (!obj.data || obj.data.type !== "jadwal") {
                continue;
              }
              result.push({
                id: obj.id,
                name:
                  obj.data.name && typeof obj.data.name === "string"
                    ? obj.data.name
                    : null,
                year: typeof obj.data.year === "number" ? obj.data.year : null,
                month:
                  typeof obj.data.month === "number" ? obj.data.month : null,
                createdAt: obj.createdAt,
                updatedAt: obj.updatedAt,
              });
            } catch (e) {
              // Skip invalid lines
            }
          }
          if (content) break;
        } catch {
          continue;
        }
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

    // Try fetching from DB first
    try {
      const { default: prisma } = await import("../utils/prisma");
      const item = await prisma.submission.findUnique({
        where: { id: idParam },
      });
      if (item) {
        return res.json({ status: "success", data: item });
      }
    } catch (error) {
      // Continue to fallback if DB fails
      console.warn("Database fetch failed, falling back to file system");
    }

    // Fallback to file system if not found in DB or DB error
    // Try multiple possible paths for the data directory
    const possiblePaths = [
      path.resolve(process.cwd(), "data"),
      path.resolve(process.cwd(), "server", "data"),
      path.resolve(__dirname, "../../data"),
      path.resolve(__dirname, "../../../data"),
    ];

    let content = "";
    for (const dir of possiblePaths) {
      const filePath = path.join(dir, "submissions.jsonl");
      try {
        content = await fs.readFile(filePath, "utf8");
        if (content) break;
      } catch {
        continue;
      }
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
  } catch (err) {
    next(err);
  }
};
