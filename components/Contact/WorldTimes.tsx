"use client";

import { useEffect, useState } from "react";

type Zone = {
  city: string;
  tz: string;
};

const zones: Zone[] = [
  { city: "Cupertino", tz: "America/Los_Angeles" },
  { city: "Paris", tz: "Europe/Paris" },
  { city: "London", tz: "Europe/London" },
  { city: "Berlin", tz: "Europe/Berlin" },
  { city: "Colombo", tz: "Asia/Colombo" },
  { city: "Tokyo", tz: "Asia/Tokyo" },
  { city: "Brisbane", tz: "Australia/Brisbane" },
  { city: "Melbourne", tz: "Australia/Melbourne" } 
];

export default function WorldTimes() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const getTime = (tz: string) =>
    new Intl.DateTimeFormat("en-AU", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: tz
    }).format(now);

  const getOffset = (tz: string) => {
    const local = new Date(
      now.toLocaleString("en-US", { timeZone: tz })
    ).getTime();

    const mel = new Date(
      now.toLocaleString("en-US", { timeZone: "Australia/Melbourne" })
    ).getTime();

    const diff = Math.round((local - mel) / 3600000);

    if (diff === 0) return "Local";
    return diff > 0 ? `+${diff}h` : `${diff}h`;
  };

  const getDayShift = (tz: string) => {
    const melDay = new Date(
      now.toLocaleString("en-US", { timeZone: "Australia/Melbourne" })
    ).getDate();

    const otherDay = new Date(
      now.toLocaleString("en-US", { timeZone: tz })
    ).getDate();

    if (otherDay > melDay) return "+1 day";
    if (otherDay < melDay) return "-1 day";
    return "";
  };

  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-white/50">
        Global Time Zones
      </p>

      <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
        {zones.map((z) => (
          <div
            key={z.city}
            className="flex items-center justify-between text-white/80"
          >
            <span>{z.city}</span>

            <div className="flex items-center gap-3">
              <span className="text-white/60 text-xs">
                {getOffset(z.tz)}
              </span>

              <span className="font-mono text-blue-400">
                {getTime(z.tz)}
              </span>

              <span className="text-xs text-white/50">
                {getDayShift(z.tz)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}