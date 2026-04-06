export function Footer() {
  return (
    <footer className="w-full bg-[var(--color-surface-elevation-1)] py-8 mt-auto border-t border-gray-200">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="font-serif text-2xl font-bold text-[var(--color-accent)]">Rentique</div>
        <p className="text-sm text-text-secondary">© 2026 Rentique, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}
