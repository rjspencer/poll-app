import { ComponentProps, FC, ReactNode, useId } from 'react';
import { Label } from '@progress/kendo-react-labels';
import { TextBox } from '@progress/kendo-react-inputs';
// import '@themebuilder-css';
import styles from './Input.module.css';

type InputProps = ComponentProps<typeof TextBox> & {
  label: ReactNode;
};

export const Input: FC<InputProps> = ({ label, ...props }) => {
  const id = useId();

  return (
    <div className={styles.container}>
      <Label editorId={id}>{label}</Label>
      <TextBox id={id} {...props} />
    </div>
  );
};
