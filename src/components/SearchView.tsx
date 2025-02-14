import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

export default function SearchView({
  showSearch = false,
  placeholder,
  initialValue = "",
  onChange,
}: {
  showSearch?: boolean;
  placeholder?: string;
  initialValue?: string;
  onChange?: (value: string) => void;
}) {
  const [show, setShow] = useState<boolean>(showSearch);
  const [value, setValue] = useState<string>(initialValue);
  function updateValue(value: string) {
    setValue(value);
    onChange?.(value);
  }

  if (show) {
    return (
      <div className="relative w-full h-[40px]">
        <div className="absolute top-0 right-0 flex flex-row item-center gap-2 rounded-sm px-4 py-2">
          <input
            className="flex-1 text-sm line-clamp-1 text-nowrap outline-none border-none bg-transparent"
            placeholder={placeholder}
            value={value}
            onChange={(e) => updateValue(e.target.value)}
          />
          <IoMdClose
            className="text-lg font-bold text-white"
            onClick={() => setShow(false)}
          />
        </div>
      </div>
    );
  }
  return <FaSearch className="text-lg" onClick={() => setShow(true)} />;
}
