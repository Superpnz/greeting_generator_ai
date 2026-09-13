import { useState } from "react";
import { OccasionType, ToneType, type LanguageType } from "./types";
import { generateGreeting } from "./services/geminiService";
import { generateGreetingImage } from "./services/imageService";
import { Header } from "./components/Header";
import { AppTitle } from "./components/AppTitle";
import { OccasionButton } from "./components/OccasionButton";
import { Cake, Snowflake, Sparkles } from "lucide-react";
import { UserDetailsSection } from "./components/UserDetailsSection";
import { ExtraDetailsSection } from "./components/ExtraDetailsSection";
import { GenerateButton } from "./components/GenerateButton";
import { ResultSection } from "./components/ResultSection";

function App() {
  const [occasion, setOccasion] = useState<OccasionType>(OccasionType.BIRTHDAY);
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [interests, setInterests] = useState<string>("");
  const [tone, setTone] = useState<ToneType>(ToneType.FRIENDLY);
  const [language, setLanguage] = useState<LanguageType>("Русский");
  const [generateImage, setGenerateImage] = useState<boolean>(true);

  const [generatedText, setGeneratedText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async (): Promise<void> => {
    if (!name.trim()) {
      setError("Пожалуйста, введите имя!");
      return;
    }

    setError(null);
    setLoading(true);
    setGeneratedText("");
    setGeneratedImage(null);

    try {
      const result = await generateGreeting(occasion, name, age, interests, tone, language);

      setGeneratedText(result);

      if (generateImage) {
        const image = await generateGreetingImage(occasion, tone, interests);

        setGeneratedImage(image);
      }
    } catch (error: any) {
      setError(error.message || "Произошла ошибка");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf5ff]">
      <Header />

      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100">
              <span className="text-lg">!</span>
            </div>

            <div>
              <p className="font-semibold">Не удалось сгенерировать поздравление</p>
              <p className="mt-1 text-sm text-red-600">{error}</p>
            </div>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <AppTitle />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5 sm:space-y-10 space-y-8">
              <section className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-900 text-white text-xs">
                      1
                    </span>
                    Выберите праздник
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <OccasionButton
                    label={OccasionType.BIRTHDAY}
                    icon={Cake}
                    selected={occasion === OccasionType.BIRTHDAY}
                    onClick={() => setOccasion(OccasionType.BIRTHDAY)}
                  />
                  <OccasionButton
                    label={OccasionType.NEW_YEAR}
                    icon={Snowflake}
                    selected={occasion === OccasionType.NEW_YEAR}
                    onClick={() => setOccasion(OccasionType.NEW_YEAR)}
                  />
                </div>
              </section>

              <UserDetailsSection
                name={name}
                age={age}
                error={error}
                interests={interests}
                setName={setName}
                setAge={setAge}
                setError={setError}
                setInterests={setInterests}
              />

              <ExtraDetailsSection
                error={error}
                language={language}
                selectedTone={tone}
                generateImage={generateImage}
                setTone={setTone}
                setLanguage={setLanguage}
                setGenerateImage={setGenerateImage}
              />

              <GenerateButton isLoading={loading} onClick={handleGenerate}>
                <Sparkles className={`w-5 h-5 ${loading ? "animate-spin" : "group-hover:animate-pulse"}`} />
                {loading ? "Сочиняем..." : "Сгенерировать"}
              </GenerateButton>
            </div>

            <div className="lg:col-span-7 h-full">
              <ResultSection content={generatedText} image={generatedImage} isLoading={loading} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
