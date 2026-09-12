import type { OccasionType, ToneType } from "../types";

const WORKER_URL = "https://greeting-generator-worker.maksim9431.workers.dev";

export const generateGreetingImage = async (occasion: OccasionType, tone: ToneType, interests?: string): Promise<string> => {
  const response = await fetch(WORKER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "image",
      occasion,
      tone,
      interests,
    }),
  });

  if (!response.ok) {
    throw new Error("Ошибка генерации изображения");
  }

  const blob = await response.blob();

  return URL.createObjectURL(blob);
};
