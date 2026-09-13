import { Globe, Image } from "lucide-react";
import { type Dispatch, type FC, type SetStateAction } from "react";
import type { LanguageType, ToneType } from "../types";
import { LANGUAGES } from "../constants";
import { ToneSelector } from "./ToneSelector";

interface IExtraDetailsSectionProps {
  error: string | null;
  language: string;
  selectedTone: ToneType;
  generateImage: boolean;
  setTone: Dispatch<SetStateAction<ToneType>>;
  setLanguage: Dispatch<SetStateAction<LanguageType>>;
  setGenerateImage: Dispatch<SetStateAction<boolean>>;
}

export const ExtraDetailsSection: FC<IExtraDetailsSectionProps> = ({
  error,
  language,
  selectedTone,
  generateImage,
  setLanguage,
  setTone,
  setGenerateImage,
}) => {
  return (
    <section className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-900  text-white text-xs">3</span>
        Настройки
      </h3>

      <label
        className={`group flex items-center justify-between rounded-xl border-2 px-4 py-3 cursor-pointer transition-all duration-200 ${
          generateImage
            ? "border-purple-400 bg-purple-50/70"
            : "border-gray-100 bg-white hover:border-purple-200 hover:bg-purple-50/30"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${
              generateImage
                ? "bg-purple-100 text-purple-600"
                : "bg-gray-100 text-gray-400 group-hover:bg-purple-100 group-hover:text-purple-500"
            }`}
          >
            <Image className="w-4 h-4" />
          </div>

          <span className={`text-sm font-medium transition-colors ${generateImage ? "text-purple-700" : "text-gray-700"}`}>
            Сгенерировать картинку
          </span>
        </div>

        <input type="checkbox" checked={generateImage} onChange={(e) => setGenerateImage(e.target.checked)} className="sr-only" />

        <div className={`relative w-10 h-5 rounded-full transition-colors ${generateImage ? "bg-purple-500" : "bg-gray-200"}`}>
          <div
            className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
              generateImage ? "translate-x-5" : "translate-x-0.5"
            }`}
          />
        </div>
      </label>

      <ToneSelector selectedTone={selectedTone} setTone={setTone} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-4 mt-4">
        <div className="relative group">
          <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Язык</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Globe className="h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageType)}
              className="block w-full pl-9 pr-8 py-3 bg-white border-2 border-gray-100 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all appearance-none cursor-pointer"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm ml-1 animate-pulse">{error}</p>}
    </section>
  );
};
