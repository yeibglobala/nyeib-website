import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[var(--bg-deep)] text-[var(--fg-main)]">
      <h2 className="text-4xl font-bold font-serif">404 - Page Not Found</h2>
      <p className="text-[var(--fg-muted)] mt-2 font-sans">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-2.5 rounded-full bg-[#f88404] text-white font-semibold text-sm hover:bg-[#ff9626] transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}
