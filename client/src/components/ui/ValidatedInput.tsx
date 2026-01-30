import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle2, type LucideIcon } from "lucide-react";

interface ValidatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: LucideIcon;
  error?: string | null;
  required?: boolean;
}

export const ValidatedInput: React.FC<ValidatedInputProps> = ({
  label,
  icon: Icon,
  value,
  onChange,
  className = "",
  required = false,
  error: externalError,
  onBlur,
  ...props
}) => {
  const [touched, setTouched] = useState(false);

  const val = (value as string) || "";
  const isFilled = val.trim().length > 0;

  // Error logic:
  // 1. External error provided -> Show it.
  // 2. Required, Touched, and Empty -> Show "Required field".
  const showError = externalError || (required && touched && !isFilled);
  const errorMessage =
    externalError ||
    (required && touched && !isFilled ? "Required field" : null);

  // Valid logic:
  // Not showing error AND filled.
  const isValid = !showError && isFilled;

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-slate-400" />
          </div>
        )}
        <input
          {...props}
          value={value}
          onChange={(e) => {
            setTouched(true);
            onChange?.(e);
          }}
          onBlur={(e) => {
            setTouched(true);
            onBlur?.(e);
          }}
          className={`
            block w-full ${Icon ? "pl-10" : "pl-3"} pr-10 py-3 rounded-xl border-2 transition-colors duration-200
            focus:outline-none focus:ring-0
            ${
              isValid
                ? "border-green-500 bg-green-50 text-green-900"
                : showError
                  ? "border-red-300 bg-red-50 text-red-900 focus:border-red-500"
                  : "border-slate-200 focus:border-blue-500 hover:border-blue-300"
            }
          `}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {isValid ? (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          ) : showError ? (
            <AlertTriangle className="h-5 w-5 text-red-500" />
          ) : null}
        </div>
      </div>

      {/* 
         Height fixed to avoid layout shift, but Step 3 uses h-6.
         If we don't want fixed height always taking space, we can remove h-6 container 
         and just let AnimatePresence handle it, but Step 3 had a container.
         I'll keep it to match Step 3 "exactly" if possible, or make it better.
         Step 3: <div className="h-6">...</div>
      */}
      <div className="min-h-[1.5rem]">
        <AnimatePresence>
          {showError && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-red-600 flex items-center gap-1"
            >
              <AlertTriangle className="w-3 h-3" />
              {errorMessage}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
