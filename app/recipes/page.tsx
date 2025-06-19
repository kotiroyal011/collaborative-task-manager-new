"use client";

import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type Meal = {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  [key: string]: any;
};

export default function RecipesPage() {
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["recipes", search],
    queryFn: async () => {
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
      const res = await fetch(url);
      const json = await res.json();
      return json.meals as Meal[] | null;
    },
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">🍽️ Recipes</h1>

      <Input
        placeholder="Search recipes by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      {isLoading && <p>Loading recipes...</p>}
      {isError && <p>Failed to load recipes.</p>}

      {data?.length === 0 && <p>No recipes found.</p>}

      {data && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2">Meal</th>
                <th className="text-left px-4 py-2">Ingredients</th>
                <th className="text-left px-4 py-2">Instructions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((meal) => (
                <tr key={meal.idMeal} className="border-t">
                  <td className="px-4 py-2 font-medium">{meal.strMeal}</td>
                  <td className="px-4 py-2">
                    {[...Array(10)]
                      .map((_, i) => meal[`strIngredient${i + 1}`])
                      .filter((ing) => ing && ing.trim())
                      .join(", ")}
                  </td>
                  <td className="px-4 py-2 line-clamp-3">
                    {meal.strInstructions}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
