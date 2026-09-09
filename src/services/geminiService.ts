import { GoogleGenAI } from "@google/genai";
import { OccasionType, ToneType, type LanguageType } from "../types";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
export const generateGreeting = async (
  occasion: OccasionType,
  name: string,
  age: string,
  interests: string,
  tone: ToneType,
  language: LanguageType,
): Promise<string> => {
  try {
    const prompt = `Напиши уникальное поздравление на языке ${language}.
    
    Повод: ${occasion},
    Для кого: ${name},
    Возраст: ${age ? age : "Не указан"},
    Интерессы / хобби: ${interests ? interests : "Не указаны"},
    Тон: ${tone}

    Инструкция по стилю (адаптируй под культурный контекст языка ${language}): 
    - Официальный: Сдержанный, уважительный.
    - Дружеский: Тёплый, неформальный.
    - Юмористический: Весёлый, забавный, с шуткой.
    - Романтический: Нежный, любящий, чувственный.
    - Трогательный: Душевный, эмоциональный.
    - 18+: Дерзко, пошло, с перчинкой, сарказмом или взрослой шуткой (контент 18+).

    Общие требования:
    - Обязательно учитывай возраст и интересы человека.
    - Длина: От 3 до 7 предложений.
    - Использую 2 - 4 подходящие по смыслу эмодзи.
    - Форматирование: Просто текст, без markdown заголовков.
    - Язык ответа СТРОГО: ${language}.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        temperature: tone === ToneType.ADULT ? 0.9 : 0.8,
      },
    });

    console.log("[generateGreeting]", response.text);
    if (response.text) {
      return response.text;
    } else {
      throw new Error("Не удалось сгенерировать текст.");
    }
  } catch (error) {
    console.error("Gemini text API error", error);
    throw new Error("Ошибка генерации", {
      cause: error,
    });
  }
};
