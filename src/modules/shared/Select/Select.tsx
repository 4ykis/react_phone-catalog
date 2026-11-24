import { KeyboardEvent, useEffect, useId, useRef, useState } from 'react';
import classNames from 'classnames';
import { Icon } from '../Icon';
import styles from './Select.module.scss';

interface Option {
  value: string;
  label: string;
}

interface Props {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  className?: string;
}

export const Select = ({
  label,
  value,
  options,
  onChange,
  className,
}: Props) => {
  const id = useId();
  const listId = `${id}-list`;
  const rootRef = useRef<HTMLDivElement>(null);

  const selectedIndex = Math.max(
    options.findIndex(option => option.value === value),
    0,
  );
  const selected = options[selectedIndex];

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(selectedIndex);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const open = () => {
    setActiveIndex(selectedIndex);
    setIsOpen(true);
  };

  const choose = (index: number) => {
    onChange(options[index].value);
    setIsOpen(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();

        if (!isOpen) {
          open();
        } else {
          setActiveIndex(i => Math.min(i + 1, options.length - 1));
        }

        break;

      case 'ArrowUp':
        event.preventDefault();

        if (!isOpen) {
          open();
        } else {
          setActiveIndex(i => Math.max(i - 1, 0));
        }

        break;

      case 'Home':
        if (isOpen) {
          event.preventDefault();
          setActiveIndex(0);
        }

        break;

      case 'End':
        if (isOpen) {
          event.preventDefault();
          setActiveIndex(options.length - 1);
        }

        break;

      case 'Enter':
      case ' ':
        event.preventDefault();

        if (isOpen) {
          choose(activeIndex);
        } else {
          open();
        }

        break;

      case 'Escape':
        setIsOpen(false);
        break;

      case 'Tab':
        setIsOpen(false);
        break;
    }
  };

  return (
    <div ref={rootRef} className={classNames(styles.select, className)}>
      <span id={`${id}-label`} className={classNames(styles.label, 'text-txt')}>
        {label}
      </span>

      <div className={styles.wrapper}>
        <button
          type="button"
          className={classNames(styles.field, 'text-body', {
            [styles.open]: isOpen,
          })}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listId}
          aria-labelledby={`${id}-label`}
          aria-activedescendant={isOpen ? `${id}-${activeIndex}` : undefined}
          onClick={() => (isOpen ? setIsOpen(false) : open())}
          onKeyDown={handleKeyDown}
        >
          {selected?.label}
        </button>

        <Icon name="arrow-down" className={styles.icon} />

        {isOpen && (
          <ul
            id={listId}
            role="listbox"
            aria-labelledby={`${id}-label`}
            className={styles.list}
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                id={`${id}-${index}`}
                role="option"
                aria-selected={option.value === value}
                className={classNames(styles.option, 'text-body', {
                  [styles.active]: index === activeIndex,
                  [styles.selected]: option.value === value,
                })}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseDown={event => event.preventDefault()}
                onClick={() => choose(index)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
