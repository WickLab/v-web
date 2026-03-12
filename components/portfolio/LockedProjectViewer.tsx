"use client";

import { PropsWithChildren, useEffect, useState } from "react";

export default function LockedProjectViewer({ children }: PropsWithChildren) {
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    document.body.classList.add("locked-viewer-active");

    const originalPrint = window.print;

    const preventDefault = (event: Event) => {
      event.preventDefault();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      const blockedCombo =
        key === "f12" ||
        (event.ctrlKey && ["p", "s", "u", "c", "x"].includes(key)) ||
        (event.metaKey && ["p", "s", "u", "c", "x"].includes(key)) ||
        ((event.ctrlKey || event.metaKey) &&
          event.shiftKey &&
          ["i", "j", "c", "s"].includes(key));

      if (blockedCombo) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const onVisibilityChange = () => {
      setBlocked(document.visibilityState !== "visible");
    };

    window.print = () => undefined;

    document.addEventListener("contextmenu", preventDefault);
    document.addEventListener("dragstart", preventDefault);
    document.addEventListener("selectstart", preventDefault);
    document.addEventListener("copy", preventDefault);
    document.addEventListener("cut", preventDefault);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.print = originalPrint;
      document.body.classList.remove("locked-viewer-active");
      document.removeEventListener("contextmenu", preventDefault);
      document.removeEventListener("dragstart", preventDefault);
      document.removeEventListener("selectstart", preventDefault);
      document.removeEventListener("copy", preventDefault);
      document.removeEventListener("cut", preventDefault);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <div className="locked-viewer" data-private="true">
      <div className="locked-watermark" aria-hidden="true">
        Confidential Project Viewer · Restricted Access
      </div>

      <div className={`locked-content ${blocked ? "locked-content--blurred" : ""}`}>
        {children}
      </div>

      {blocked && (
        <div className="locked-overlay" role="status" aria-live="polite">
          Viewer hidden while the window is inactive.
        </div>
      )}
    </div>
  );
}