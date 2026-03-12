"use client";

import { useEffect } from "react";

type VisitRecord = {
  at: string;
  timezone: string;
  language: string;
  userAgent: string;
  geolocation?: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
};

export default function VisitTracker() {
  useEffect(() => {
    const baseRecord: VisitRecord = {
      at: new Date().toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      userAgent: navigator.userAgent
    };

    const saveRecord = (record: VisitRecord) => {
      const key = "visit_records";
      const existing = localStorage.getItem(key);
      const visits: VisitRecord[] = existing ? JSON.parse(existing) : [];
      visits.push(record);
      localStorage.setItem(key, JSON.stringify(visits.slice(-25)));
      // Useful for quick inspection in browser devtools
      console.info("[VisitTracker] visit captured", record);
    };

    if (!navigator.geolocation) {
      saveRecord(baseRecord);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        saveRecord({
          ...baseRecord,
          geolocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          }
        });
      },
      () => {
        saveRecord(baseRecord);
      },
      { timeout: 5000 }
    );
  }, []);

  return null;
}