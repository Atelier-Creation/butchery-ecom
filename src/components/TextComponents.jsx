import React from "react";
import { useLang } from "../context/LanguageContext";

// 🔠 Generic text component
const Text = ({ as: Tag = "span", en, ta, className = "", ...props }) => {
  const { lang } = useLang() || { lang: "en" };
  const langClass = lang === "ta" ? "font-tamil" : "english-font";

  // Pick the right text with fallback
  const content =
    lang === "en"
      ? en || ta || "" // prefer en, fallback to ta
      : ta || en || ""; // prefer ta, fallback to en

  return (
    <Tag className={`${className} ${langClass}`} {...props}>
      {content}
    </Tag>
  );
};

// ✅ Specific components
export const H1 = (props) => <Text as="h1" {...props} />;
export const H2 = (props) => <Text as="h2" {...props} />;
export const H3 = (props) => <Text as="h3" {...props} />;
export const H4 = (props) => <Text as="h4" {...props} />;
export const H5 = (props) => <Text as="h5" {...props} />;
export const H6 = (props) => <Text as="h6" {...props} />;
export const P = (props) => <Text as="p" {...props} />;
export const A = (props) => <Text as="a" {...props} />;
export const Button = (props) => <Text as="button" {...props} />;
