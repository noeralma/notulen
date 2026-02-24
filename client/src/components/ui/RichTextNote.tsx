import React, { useEffect, useMemo, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";

interface RichTextNoteProps {
  id: string;
  label?: string;
  value: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  icon?: LucideIcon;
}

export const RichTextNote: React.FC<RichTextNoteProps> = ({
  id,
  label,
  value,
  onChange,
  className = "",
  placeholder = "Tambahkan catatan...",
  icon: Icon,
}) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!editorRef.current) return;
    if (editorRef.current.innerHTML === value) return;
    editorRef.current.innerHTML = value || "";
  }, [value]);

  const [alignMode, setAlignMode] = useState<"left" | "center" | "right">(
    "left",
  );

  const applyFormat = (
    command:
      | "bold"
      | "italic"
      | "underline"
      | "insertUnorderedList"
      | "insertOrderedList"
      | "justifyLeft"
      | "justifyCenter"
      | "justifyRight",
  ) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    try {
      document.execCommand(command, false);
    } catch {
      // ignore
    }
  };

  const handleInput = () => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    onChange?.(html);
  };

  const isEmpty = useMemo(() => {
    if (!value) return true;
    const text = value
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/&nbsp;/gi, " ")
      .replace(/<[^>]*>/g, "")
      .trim();
    return text.length === 0;
  }, [value]);

  const cycleAlignment = () => {
    const nextMode =
      alignMode === "left"
        ? "center"
        : alignMode === "center"
          ? "right"
          : "left";
    const command =
      nextMode === "left"
        ? "justifyLeft"
        : nextMode === "center"
          ? "justifyCenter"
          : "justifyRight";
    applyFormat(command);
    setAlignMode(nextMode);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}
      <div
        className={`rounded-xl border-2 bg-white transition-colors duration-200 ${
          isFocused
            ? "border-blue-500 shadow-sm"
            : "border-slate-200 hover:border-blue-300"
        }`}
      >
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-200 bg-slate-50 rounded-t-[10px]">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            {Icon && <Icon className="w-4 h-4 text-slate-400" />}
            <span>Catatan</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => applyFormat("bold")}
              className="px-1.5 py-0.5 text-xs font-semibold rounded hover:bg-slate-200 text-slate-700"
            >
              B
            </button>
            <button
              type="button"
              onClick={() => applyFormat("italic")}
              className="px-1.5 py-0.5 text-xs rounded hover:bg-slate-200 text-slate-700 italic"
            >
              I
            </button>
            <button
              type="button"
              onClick={() => applyFormat("underline")}
              className="px-1.5 py-0.5 text-xs rounded hover:bg-slate-200 text-slate-700 underline"
            >
              U
            </button>
            <span className="mx-1 h-4 w-px bg-slate-300" />
            <button
              type="button"
              onClick={() => applyFormat("insertUnorderedList")}
              className="px-1.5 py-0.5 text-xs rounded hover:bg-slate-200 text-slate-700"
            >
              •
            </button>
            <button
              type="button"
              onClick={() => applyFormat("insertOrderedList")}
              className="px-1.5 py-0.5 text-[11px] rounded hover:bg-slate-200 text-slate-700"
            >
              1.
            </button>
            <span className="mx-1 h-4 w-px bg-slate-300" />
            <button
              type="button"
              onClick={cycleAlignment}
              className="px-1.5 py-0.5 text-[11px] rounded hover:bg-slate-200 text-slate-700"
            >
              {alignMode === "left" ? "L" : alignMode === "center" ? "C" : "R"}
            </button>
          </div>
        </div>
        <div className="relative">
          <div
            id={id}
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="min-h-[80px] max-h-[260px] overflow-y-auto px-3 py-2 text-sm text-slate-800 focus:outline-none whitespace-pre-wrap"
          />
          {isEmpty && !isFocused && (
            <div className="pointer-events-none absolute inset-x-3 top-2 text-xs text-slate-400">
              {placeholder}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
