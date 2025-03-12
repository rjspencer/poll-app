import React, { ComponentProps } from 'react';
import { Button as KendoButton } from '@progress/kendo-react-buttons';
import '@themebuilder-css';

type ButtonProps = ComponentProps<typeof KendoButton>;

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  ...props
}) => {
  return (
    <KendoButton {...props} onClick={onClick}>
      {children}
    </KendoButton>
  );
};

export default Button;
