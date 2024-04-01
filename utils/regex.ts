export function validateEscapedText(text: string) {
  // Escape special characters to avoid regex confusion

  // This line replaces characters that have special meanings in regular expressions
  // with a backslash followed by the character itself. This ensures they are treated
  // literally in the search.

  // Examples of escaped characters: "*", "[", "]", ".", "+" etc.
  return text.replace(/[\_\*\[\]\(\)\~\`\>\#\+\-\=\|\{\}\.]/g, "\\$&");
}
