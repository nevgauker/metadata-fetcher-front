"use client"
import Image from "next/image";
import FetchRow from "@/components/fetch-row";
import { Button } from "@/components/ui/button"

import { useState } from "react";
import { fetchMetadata, Metadata } from "@/actions/fetch-metadata";

import ResultCard from "@/components/result-card";
import ProgressLoader from "@/components/progress-indicator";

export default function Home() {

  const [rows, setRows] = useState<{ selectValue: string; inputValue: string }[]>([
    { selectValue: "https://", inputValue: "" },
    { selectValue: "https://", inputValue: "" },
    { selectValue: "https://", inputValue: "" },
  ]);
  const [error, setError] = useState(false)
  const [results, setRsults] = useState<Metadata[]>([])
  const [loading, setLoading] = useState(false)

  const addRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      { selectValue: "https://", inputValue: "" },
    ]);
  };

  const updateRow = (index: number, updatedRow: { selectValue: string; inputValue: string }) => {
    setRows((prevRows) =>
      prevRows.map((row, i) => (i === index ? updatedRow : row))
    );
  };

  const renderRows = () => {
    return rows.map((row, index) => (
      <FetchRow
        key={index}
        selectValue={row.selectValue}
        inputValue={row.inputValue}
        onChange={(updatedRow) => updateRow(index, updatedRow)}
      />
    ));
  };

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };


  const handleFetchMetadata = async () => {
    setError(false)
    setLoading(true)
    const urls = rows.map((row) => row.selectValue + row.inputValue);
    // Validate input length and URL format
    for (const url of urls) {
      const inputValue = url.replace(/https?:\/\//, ""); // Remove the protocol for length check
      if (inputValue.length <= 2) {
        setError(true)
        setLoading(false)
        return;
      }
      if (!validateUrl(url)) {
        setError(true)
        setLoading(false)
        return;
      }
    }

    try {
      const metadata = await fetchMetadata(urls);
      console.log("Fetched metadata:", metadata);
      setRsults(metadata)
      setLoading(false)

      // Handle the fetched metadata (e.g., display it to the user)
    } catch (error) {
      setLoading(false)
      alert("Failed to fetch metadata. Please try again later.");
    }
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl">Fetch Metadata From Urls</h1>
      {loading ? <ProgressLoader /> : <>
        <h2 className="text-xl underline py-4">Urls</h2>
        <div className="flex flex-col space-y-4 border-b-2">
          {renderRows()}
          {error && <p className="text-red-700 text-sm">Pleas write valid urls</p>}
          <Button className="text-lg" variant="outline" onClick={addRow}>+</Button>
        </div>
        <div className="flex justify-center items-center py-4">
          <Button className="py-4" variant="outline" onClick={handleFetchMetadata}>Fetch Metadata</Button>
        </div>
        {results.length > 0 && <h2 className="text-xl underline py-4">Results</h2>}
        <div className="grid grid-cols-1 md:grid-cols-3 space-x-1 space-y-1">
          {results.map((result) => <ResultCard key={result.url} url={result.url} description={result.description} image={result.image} error={result.error} />)}
        </div>
      </>
      }
    </main>
  );
}


function Body() {


}