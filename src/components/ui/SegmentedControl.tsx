import styles from "./SegmentedControl.module.css";

interface SegmentedControlProps<T extends string> {
  legend: string;
  /** Radio group name; must be unique per control on the page. */
  name: string;
  value: T;
  options: ReadonlyArray<{ value: T; label: string; detail?: string }>;
  onChange: (value: T) => void;
}

/** Radio group drawn as equal-width tiles. */
export function SegmentedControl<T extends string>({
  legend,
  name,
  value,
  options,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <fieldset>
      <legend>{legend}</legend>
      <div className={styles.group}>
        {options.map((option) => (
          <label key={option.value} className={styles.option}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={option.value === value}
              onChange={() => onChange(option.value)}
            />
            {option.label}
            {option.detail && <small>{option.detail}</small>}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
