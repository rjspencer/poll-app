import { ComponentProps, FC, ReactNode, useId } from "react";

type InputProps = ComponentProps<"input"> & {
  label: ReactNode;
};

const Input: FC<InputProps> = ({ label, ...props }) => {
  const id = useId();

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id}>{label}</label>
      <input id={id} className="px-3 py-2" {...props} />
    </div>
  );
};

export default Input;
