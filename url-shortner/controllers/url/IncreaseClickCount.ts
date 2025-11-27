import type { Request, Response } from "express";
import DbClient from "../../prisma/DbClient";

export const increaseClickCount = async (req: Request, res: Response) => {
  try {
    const { shortCode } = req.params;

    if (!shortCode) {
      return res.status(400).json({ error: "shortCode is required" });
    }

    const urlEntry = await DbClient.url.findUnique({
      where: { short: shortCode },
    });
    if (!urlEntry) {
      return res.status(404).json({ error: "URL not found" });
    }

    const updatedURLEntry = await DbClient.url.update({
      where: { short: shortCode },
      data: { clickCount: urlEntry.clickCount + 1 },
    });

    return res.status(200).json(updatedURLEntry);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
