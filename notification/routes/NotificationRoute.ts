import { newNotification } from "../controllers/NewNotification.js";

const NotificationRoute = {
  POST: {
    "/new": newNotification,
  },
};

export default NotificationRoute;
