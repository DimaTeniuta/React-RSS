import React, { FC } from 'react';
import { SelectData } from 'types/formTypes';
import classes from './Select.module.scss';

interface SelectProps {
  options: SelectData[];
  title: string;
  label: string;
  defaultValue: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  ref?: React.ForwardedRef<HTMLSelectElement>;
  error: string;
}

export const Select: FC<SelectProps> = React.forwardRef((props, ref) => {
  return (
    <label className={classes.wrap} htmlFor={props.label}>
      {props.title}
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
      <p className={classes.error}>{props.error}</p>
    </label>
  );
});
