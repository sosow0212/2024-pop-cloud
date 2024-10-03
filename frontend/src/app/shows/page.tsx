/*eslint-disable*/

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import EventCard from "@/components/common/list-card/index";

interface ShowData {
  showId: number;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  images: string[];
  publicTag: string;
  showType: string;
  visitedCount: number;
  likedCount: number;
}

const formatDate = (date: Date): string => date.toISOString().split("T")[0];

const getCurrentDateRange = (): { startDate: string; endDate: string } => {
  const today = new Date();
  const sixMonthsLater = new Date(
    today.getFullYear(),
    today.getMonth() + 6,
    today.getDate(),
  );

  return {
    startDate: formatDate(today),
    endDate: formatDate(sixMonthsLater),
  };
};

export default function PopupListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [shows, setShows] = useState<ShowData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const params = new URLSearchParams(searchParams);
        const dateRange = getCurrentDateRange();

        // Set default values if not present
        if (!params.get("startDate"))
          params.set("startDate", dateRange.startDate);
        if (!params.get("endDate")) params.set("endDate", dateRange.endDate);
        if (!params.get("showType")) params.set("showType", "popups");
        if (!params.get("pageSize")) params.set("pageSize", "10");

        // Handle array parameters
        const publicTags = searchParams.getAll("publicTags");
        const country = searchParams.getAll("country");

        if (publicTags.length > 0) {
          params.delete("publicTags");
          publicTags.forEach((tag) => params.append("publicTags", tag));
        }

        if (country.length > 0) {
          params.delete("country");
          country.forEach((c) => params.append("country", c));
        }

        // Update URL with all parameters
        router.push(`?${params.toString()}`, { scroll: false });

        const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/shows`);
        url.search = params.toString();

        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (Array.isArray(data)) {
          setShows(data);
        } else {
          throw new Error("Unexpected data format received");
        }
      } catch (err) {
        setError("Failed to load popup stores. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchShows();
  }, [searchParams, router]);

  const handleLikeChange = (id: number, isLiked: boolean) => {
    console.log(`Show ${id} like status changed to: ${isLiked}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grow p-4">
      <h1 className="mb-4 text-24-700">팝업 스토어 목록</h1>
      {shows.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shows.map((show) => (
            <EventCard
              key={show.showId}
              event={{
                ...show,
                images: show.images,
              }}
              onLikeChange={(isLiked) => handleLikeChange(show.showId, isLiked)}
            />
          ))}
        </div>
      ) : (
        <div>현재 표시할 팝업 스토어가 없습니다.</div>
      )}
    </div>
  );
}
