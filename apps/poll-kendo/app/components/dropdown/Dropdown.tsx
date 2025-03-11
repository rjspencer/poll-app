import { useId } from "react";

interface DropdownProps {
  name: string;
  options: Array<{ label: string; value: string }>;
  label: string;
  placeholder?: string;
}

export const Dropdown = ({
  name,
  options,
  label,
  placeholder = "Select an option",
}: DropdownProps) => {
  const id = useId();

  return (
    <fieldset className="flex flex-col gap-2">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        name={name}
        className="w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </fieldset>
  );
};

export default Dropdown;
