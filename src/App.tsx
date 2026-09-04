import { useState } from "react";
import { OccasionType, ToneType, type LanguageType } from "./types";
import { LANGUAGES } from "./constants";
import { generateGreeting } from "./services/geminiService";
import { Header } from "./components/Header";
import { AppTitle } from "./components/AppTitle";
import { OccasionButton } from "./components/OccasionButton";
import { Cake, Snowflake } from "lucide-react";
import { UserDetailsSection } from "./components/UserDetailsSection";

function App() {
  const [occasion, setOccasion] = useState<OccasionType>(OccasionType.BIRTHDAY);
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [interests, setInterests] = useState<string>("");
  const [tone, setTone] = useState<ToneType>(ToneType.FRIENDLY);
  const [language, setLanguage] = useState<LanguageType>("Русский");

  const [generatedText, setGeneratedText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (): Promise<void> => {
    if (!name.trim()) {
      setError("Пожалуйства введите имя!");
      return;
    }

    setError(null);
    setLoading(true);
    setGeneratedText("");

    try {
      const result = await generateGreeting(occasion, name, age, interests, tone, language);

      setGeneratedText(result);
    } catch (error: any) {
      setError(error.message || "Произошла ошибка");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf5ff]">
      <Header />

      {error}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <AppTitle />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5 space-y-10">
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
            </div>

            <div className="lg:col-span-7 h-full">2</div>
          </div>

          <br />
          {Object.values(ToneType).map((tone) => (
            <button key={tone} onClick={() => setTone(tone)}>
              {tone}
            </button>
          ))}
          <br />
          <select value={language} onChange={(e) => setLanguage(e.target.value as LanguageType)}>
            {LANGUAGES.map((lang) => (
              <option value={lang} key={lang}>
                {lang}
              </option>
            ))}
          </select>

          <hr />

          <button onClick={handleGenerate} disabled={loading}>
            СОЗДАТЬ МАГИЮ
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
