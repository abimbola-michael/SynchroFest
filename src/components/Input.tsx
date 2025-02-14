import React from "react";

export default function Input({
  title,
  placeholder,
  initialValue = "",
  onChange,
}: {
  title?: string;
  placeholder?: string;
  initialValue?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2 items-start">
      {title && <h2 className="text-lg">{title}</h2>}
      <input
        className="flex-1 text-sm line-clamp-1 text-nowrap outline-none border-none bg-transparent"
        placeholder={placeholder}
        value={value}
        onChange={(e) => updateValue(e.target.value)}
      />
    </div>
  );
}
