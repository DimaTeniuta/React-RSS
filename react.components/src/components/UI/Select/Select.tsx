import React, { FC } from 'react';
import { SelectData } from 'types/formTypes';
import { Label } from '../Label/Label';
import classes from './Select.module.scss';

interface SelectProps {
  label: string;
  title: string;
  options: SelectData[];
  defaultValue: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  ref?: React.ForwardedRef<HTMLSelectElement>;
  error?: string;
}

export const Select: FC<SelectProps> = React.forwardRef((props, ref) => {
  return (
    <Label label={props.label} title={props.title} error={props.error}>
      <select
        {...props}
        className={props.className ?? classes.select}
        ref={ref}
        data-testid="select"
      >
        <option value={props.defaultValue} disabled>
          {props.defaultValue}
        </option>
        {props.options.map((el) => (
          <option key={el.value} value={el.value}>
            {el.name}
          </option>
        ))}
      </select>
    </Label>
  );
});
