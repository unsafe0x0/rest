import type { Request, Response } from "express";
import DbClient from "../../prisma/DbClient";

export const updateURL = async (req: Request, res: Response) => {
  try {
    const id = req.userId as string;

    if (!id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { newOriginalURL, shortCode } = req.body;
    if (!newOriginalURL || !shortCode) {
      return res
        .status(400)
        .json({ error: "newOriginalURL and shortCode are required" });
    }

    const urlEntry = await DbClient.url.findUnique({
      where: { short: shortCode },
    });

    if (!urlEntry) {
      return res.status(404).json({ error: "URL not found" });
    }

    if (urlEntry.userId !== id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const updatedURLEntry = await DbClient.url.update({
      where: { short: shortCode },
      data: { original: newOriginalURL },
    });

    return res.status(200).json(updatedURLEntry);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
