"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import TickerCard from "../(components)/TickerCard";

export function WatchList() {
  const { data: session, status } = useSession();
  const [watchList, setWatchList] = useState([]);

  const fetchUserWatchlist = async (email) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/watchlist/get-watchlist`,
        { email: email }
      );

      setWatchList(response.data.watchlist);
      console.log(response.data.watchlist);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      fetchUserWatchlist(session?.user?.email);
    }
  }, [session]);

  if (status !== "authenticated") {
    return <p>Please log in</p>;
  }

  return (
    <div className="text-white bold">
      <p> {session.user.email} </p>
      <div id="page" className="flex flex-col">
        <div id="watchlist-sidebar">
          <span>{JSON.stringify(watchList)}</span>
          <input className="ml-4" />
          <button type="button" className="ml-4 border">
            Update watchlist
          </button>
        </div>
        <div id="watchlist-main">
          {watchList.map((ticker) => (
            <TickerCard ticker={ticker} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WatchList;
