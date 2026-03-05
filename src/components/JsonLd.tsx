import React from "react";
import stringify from "json-stable-stringify-without-jsonify";

interface JsonLdProps {
  data: Record<string, unknown>;
}

export const JsonLd = ({ data }: JsonLdProps) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: stringify(data) }}
    />
  );
};
