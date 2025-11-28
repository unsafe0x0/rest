import type { Request, Response } from "express";
import DbClient from "../prisma/DbClient";
import { generateShortCode } from "../utils/ShortCode";

export const createURL = async (req: Request, res: Response) => {
  try {
    const id = req.userId as string;

    if (!id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { originalURL } = req.body;
    if (!originalURL) {
      return res.status(400).json({ error: "originalURL is required" });
    }

    const shortCode = generateShortCode();

    const newURL = await DbClient.url.create({
      data: {
        original: originalURL,
        short: shortCode,
        userId: id,
      },
    });

    return res.status(201).json(newURL);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
