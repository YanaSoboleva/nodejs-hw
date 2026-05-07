import pino from "pino-http";

export const logger = pino({
  transport: process.env.NODE_ENV !== "production" 
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          levelFirst: true,
          translateTime: "SYS:standard",
        },
      } 
    : undefined, // У продакшн використовуємо стандартний швидкий JSON формат
});

