"use client";

export default function Settings() {
  return (
    <section className="settings-page">
      <button
        type="button"
        onClick={() => document.documentElement.classList.toggle("swap-colors")}
      >
        Change color
      </button>
    </section>
  );
}
