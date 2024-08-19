"use client"
import Image from "next/image";
import FetchRow from "@/components/fetch-row";
import { Button } from "@/components/ui/button"

import { useState } from "react";
import { fetchMetadata } from "@/actions/fetch-metadata";

export default function Home() {

  const [rows, setRows] = useState<{ selectValue: string; inputValue: string }[]>([
    { selectValue: "https://", inputValue: "" },
    { selectValue: "https://", inputValue: "" },
    { selectValue: "https://", inputValue: "" },
  ]);

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
    const urls = rows.map((row) => row.selectValue + row.inputValue);

    // Validate input length and URL format
    for (const url of urls) {
      const inputValue = url.replace(/https?:\/\//, ""); // Remove the protocol for length check
      if (inputValue.length <= 2) {
        alert(`The input value '${inputValue}' is too short. It must be longer than 2 characters.`);
        return;
      }

      if (!validateUrl(url)) {
        alert(`The URL '${url}' is not valid.`);
        return;
      }
    }

    try {
      const metadata = await fetchMetadata(urls);
      console.log("Fetched metadata:", metadata);
      // Handle the fetched metadata (e.g., display it to the user)
    } catch (error) {
      alert("Failed to fetch metadata. Please try again later.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col space-y-4">
        {renderRows()}
        <Button className="text-lg" variant="outline" onClick={addRow}>+</Button>
      </div>
      <div className="flex justify-center items-center">
        <Button variant="outline" onClick={handleFetchMetadata}>Fetch Metadata</Button>
      </div>
    </main>
  );
}
