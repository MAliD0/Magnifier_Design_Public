"use client";

import { ProgressBar } from "@/components/ui/progress-bar";

import { ContactFieldRenderer } from "./contact-field-renderer";
import { ContactFieldShell } from "./fields";
import { ContactFormNavigation } from "./contact-form-navigation";
import styles from "./contact-form.module.css";
import { useContactForm } from "./use-contact-form";

export function ContactForm() {
  const form = useContactForm();
  const isContactDetailsStep =
    form.activeStep.id === "contact-details";

  function handleNext() {
    if (form.activeIndex === form.totalSteps - 1) {
      form.completeActiveStep();
      return;
    }

    form.goNext();
  }

  return (
    <section
      className={styles.section}
      data-site-section="contact"
    >
      <div
        className={styles.container}
        data-field-count={form.activeFields.length}
      >
        <div className={styles.progress}>
          <ProgressBar
            currentIndex={form.activeIndex}
            totalItems={form.totalSteps}
            completedIndices={form.completedStepIndices}
            ariaLabel="Project inquiry progress"
            startLabel={
              String(form.activeIndex + 1).padStart(2, "0") +
              " / " +
              String(form.totalSteps).padStart(2, "0")
            }
            endLabel={
              String(form.completedCount).padStart(2, "0") +
              " / " +
              String(form.totalFields).padStart(2, "0") +
              " filled"
            }
          />
        </div>

        <div className={styles.workspace}>
          <div
            className={styles.fieldGroup}
            data-field-count={
              isContactDetailsStep
                ? 1
                : form.activeFields.length
            }
          >
            {isContactDetailsStep ? (
              <ContactFieldShell compact>
                <div className={styles.contactDetailsGrid}>
                  {form.activeFields.map((field) => (
                    <ContactFieldRenderer
                      key={field.id}
                      field={field}
                      value={form.values[field.id]}
                      error={form.errors[field.id]}
                      onChange={(value) =>
                        form.updateValue(field.id, value)
                      }
                      onComplete={() =>
                        form.completeField(field.id)
                      }
                      embedded
                    />
                  ))}
                </div>
              </ContactFieldShell>
            ) : (
              form.activeFields.map((field) => (
                <ContactFieldRenderer
                  key={field.id}
                  field={field}
                  value={form.values[field.id]}
                  error={form.errors[field.id]}
                  onChange={(value) =>
                    form.updateValue(field.id, value)
                  }
                  onComplete={handleNext}
                />
              ))
            )}
          </div>

          <ContactFormNavigation
            isFirst={form.activeIndex === 0}
            isLast={form.activeIndex === form.totalSteps - 1}
            onPrevious={form.goPrevious}
            onNext={handleNext}
          />
        </div>
      </div>
    </section>
  );
}
