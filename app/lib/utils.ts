import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { type SQL, sql } from "drizzle-orm";
import { PgColumn } from "drizzle-orm/pg-core";

import { DateTime } from "luxon";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getISOFormatDateQuery(dateTimeColumn: PgColumn): SQL<string> {
  return sql<string>`to_char(${dateTimeColumn}, 'YYYY-MM-DD"T"HH24:MI:SS"Z"')`;
}

export function relativeTime(date: string) {
  const datetime = DateTime.fromISO(date);
  return datetime.toRelative();
}

export function seo({
  title,
  description,
  keywords,
  image,
}: {
  title: string;
  description?: string;
  image?: string;
  keywords?: string;
}) {
  const tags = [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "author", content: "Noah Trần" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:creator", content: "@not_sh1ro" },
    { name: "twitter:site", content: "@not_sh1ro" },
    { name: "og:type", content: "website" },
    { name: "og:site_name", content: title },
    { name: "og:title", content: title },
    { name: "og:description", content: description },
    { name: "og:url", content: "https://carbon-daily.vercel.app" },
    { name: "og:locale", content: "en_US" },
    ...(image
      ? [
          { name: "twitter:image", content: image },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "og:image", content: image },
        ]
      : []),
  ];

  return tags;
}
