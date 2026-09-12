import { OccasionType, ToneType, type LanguageType } from "../types";

const WORKER_URL = "https://greeting-generator-worker.maksim9431.workers.dev";

export const generateGreeting = async (
  occasion: OccasionType,
  name: string,
  age: string,
  interests: string,
  tone: ToneType,
  language: LanguageType,
): Promise<string> => {
  try {
    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "text",
        occasion,
        name,
        age,
        interests,
        tone,
        language,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Ошибка генерации");
    }

    if (!data.text) {
      throw new Error("Не удалось получить текст поздравления");
    }

    console.log("[generateGreeting]", data.text);

    return data.text;
  } catch (error) {
    console.error("Text generation error:", error);

    throw new Error(error instanceof Error ? error.message : "Ошибка генерации", {
      cause: error,
    });
  }
};
