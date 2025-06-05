"use client";
import { useLoader } from "@/app/_context/LoaderContext";

export default function Loader() {
  const { loading } = useLoader();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white p-4 rounded shadow text-blue-600 font-bold">
        Carregando...
      </div>
    </div>
  );
}
