import { IncomingMessage, ServerResponse } from "http";
import DbClient from "../prisma/DbClient";
import { io } from "../index";

export const newNotification = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  try {
    const { title, content } = req.body;

    const notification = await DbClient.notification.create({
      data: { title, content },
    });

    io.emit("notification", notification);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Notification created successfully",
        notification,
      }),
    );
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        error: "Internal Server Error",
      }),
    );
  }
};
