// utils/dateFormatter.js

export function formatDate(dateInput) {
  try {
    const date = new Date(dateInput);

    // Intl.DateTimeFormat gives you clean formatting
    return new Intl.DateTimeFormat("en-US", {
      month: "long",   // Full month name (e.g., November)
      day: "numeric",  // Day of the month (e.g., 12)
      year: "numeric", // Year (e.g., 2025)
    }).format(date);
  } catch (error) {
    console.error("Invalid date:", error);
    return "";
  }
}
