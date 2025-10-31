'use client';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  const pct = Math.max(0, Math.min(100, Math.round(progress)));

  return (
    <div className="w-full h-2 bg-[var(--border-color)] rounded-full overflow-hidden">
      <div
        className="
          h-full rounded-full transition-all duration-500 ease-out
          /* NÂNG CẤP: Thêm shadow nhẹ cho thanh progress */
          shadow-lg
        "
        style={{
          width: `${pct}%`,
          backgroundColor: 'var(--accent-color)',
          boxShadow: `0 2px 8px 0 var(--accent-color)`,
        }}
      />
    </div>
  );
};