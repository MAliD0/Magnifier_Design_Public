import styles from "./contact-form.module.css";

type ContactFormNavigationProps = {
  isFirst: boolean;
  isLast: boolean;
  onPrevious: () => void;
  onNext: () => void;
};

export function ContactFormNavigation({
  isFirst,
  isLast,
  onPrevious,
  onNext,
}: ContactFormNavigationProps) {
  return (
    <div className={styles.stepNavigation}>
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirst}
        className={styles.stepButton}
      >
        ← Previous
      </button>

      <button
        type="button"
        onClick={onNext}
        className={styles.stepButton}
      >
        {isLast ? "Done" : "Next →"}
      </button>
    </div>
  );
}
