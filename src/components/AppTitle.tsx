import { type FC } from "react";

export const AppTitle: FC = () => {
  return (
    <div className="mb-10 sm:mb-16">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
        Создайте <span className="text-purple-600">уникальное </span> <br className="hidden sm:block" /> поздравление
      </h2>
      <p>Выберите праздник, введите имя и магия начнётся! Наш агент создаст персональное пожелание за секунды.</p>
    </div>
  );
};
