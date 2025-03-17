import { ComponentProps, FC, useId } from 'react';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Label } from '@progress/kendo-react-labels';
import '@themebuilder-css';

type DropdownProps = ComponentProps<typeof DropDownList> & {
  name: string;
  options: Array<{ label: string; value: string }>;
  label: string;
  placeholder?: string;
};

export const Dropdown: FC<DropdownProps> = ({
  name,
  options,
  label,
  placeholder = 'Select an option',
  ...props
}) => {
  const id = useId();

  return (
    <fieldset className="flex flex-col gap-2">
      <Label editorId={id}>{label}</Label>
      <DropDownList
        {...props}
        id={id}
        name={name}
        data={options}
        textField="label"
        dataItemKey="value"
        defaultItem={{ label: placeholder, value: '' }}
      />
    </fieldset>
  );
};
