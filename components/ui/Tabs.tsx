"use client";

import { useState } from "react";

export default function Tabs({
  tabs,
}: {
  tabs: { label: string; content: React.ReactNode }[];
}) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div role="tablist" aria-label="Tabs" className="flex gap-2 border-b border-ink-600">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            role="tab"
            aria-selected={active === i}
            aria-controls={`panel-${i}`}
            id={`tab-${i}`}
            onClick={() => setActive(i)}
            className={`border-b-2 px-4 py-2.5 text-sm font-semibold uppercase tracking-wide focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-500 ${
              active === i
                ? "border-lime-500 text-lime-400"
                : "border-transparent text-mist-400 hover:text-mist-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, i) => (
        <div
          key={tab.label}
          role="tabpanel"
          id={`panel-${i}`}
          aria-labelledby={`tab-${i}`}
          hidden={active !== i}
          className="pt-6"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
