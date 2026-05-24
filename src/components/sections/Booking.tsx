"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useLocale } from "@/context/LocaleProvider";
import { useToast } from "@/context/ToastProvider";
import { useServices } from "@/hooks/useServices";
import { createReservation } from "@/lib/actions/booking";
import {
  getAvailableTimeSlots,
  getTodayLocal,
  isPastDate,
  isPastDateTime,
} from "@/lib/booking";
import { bookingTimeSlots } from "@/lib/data";
import { fadeUp, inView, springFast, stagger } from "@/lib/motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message: string;
};

const minDate = getTodayLocal();

function formatDisplayTime(value: string) {
  return bookingTimeSlots.find((s) => s.value === value)?.label ?? value;
}

export function Booking() {
  const { t, locale } = useLocale();
  const b = t.booking;
  const toast = useToast();
  const { services: dbServices } = useServices();

  const serviceOptions = useMemo(() => {
    if (dbServices.length > 0) {
      return dbServices.map((s) => ({ id: s.id, title: s.title }));
    }
    return t.services.items.map((s) => ({ id: s.id, title: s.title }));
  }, [dbServices, t.services.items]);

  const initial: FormState = {
    name: "",
    email: "",
    phone: "",
    service: serviceOptions[0]?.id ?? "",
    date: "",
    time: "09:00",
    message: "",
  };

  const [form, setForm] = useState<FormState>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [dateError, setDateError] = useState("");
  const [slotTick, setSlotTick] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!form.service && serviceOptions[0]) {
      setForm((f) => ({ ...f, service: serviceOptions[0].id }));
    }
  }, [serviceOptions, form.service]);

  const isToday = form.date === minDate;

  const availableTimeSlots = useMemo(
    () => getAvailableTimeSlots(form.date),
    [form.date, slotTick],
  );

  useEffect(() => {
    if (!isToday) return;
    const id = window.setInterval(() => setSlotTick((n) => n + 1), 60_000);
    return () => window.clearInterval(id);
  }, [isToday]);

  useEffect(() => {
    if (!form.date) return;
    const slots = getAvailableTimeSlots(form.date);
    setForm((f) => {
      if (slots.length === 0) return f.time ? { ...f, time: "" } : f;
      if (!slots.some((s) => s.value === f.time)) return { ...f, time: slots[0].value };
      return f;
    });
  }, [form.date, slotTick]);

  const formatDisplayDate = (value: string) => {
    if (!value) return "";
    try {
      return new Intl.DateTimeFormat(locale === "es" ? "es" : "en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(`${value}T12:00:00`));
    } catch {
      return value;
    }
  };

  const handleDateChange = (date: string) => {
    if (date && isPastDate(date)) {
      setDateError(b.errors.pastDate);
      return;
    }
    setDateError("");
    const slots = getAvailableTimeSlots(date);
    const nextTime = slots.some((s) => s.value === form.time)
      ? form.time
      : (slots[0]?.value ?? "");
    setForm({ ...form, date, time: nextTime });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isPastDate(form.date)) {
      setDateError(b.errors.pastDatePick);
      return;
    }
    if (isPastDateTime(form.date, form.time)) {
      setDateError(b.errors.pastTime);
      return;
    }
    if (availableTimeSlots.length === 0) {
      setDateError(b.errors.noSlotsToday);
      return;
    }
    setDateError("");
    setIsSubmitting(true);

    const result = await createReservation({
      client_name: form.name,
      email: form.email,
      phone: form.phone,
      service: form.service,
      booking_date: form.date,
      booking_time: form.time,
      message: form.message,
    });

    setIsSubmitting(false);

    if (!result.success) {
      toast.error(result.error ?? b.toastError);
      return;
    }

    toast.success(b.toastSuccess);
    window.open(result.whatsappUrl, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  const fieldClass =
    "w-full min-h-[48px] rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 text-sm text-[#f7efe8] outline-none transition placeholder:text-[#6a5c60] focus:border-[#e8b4bc]/40 focus:ring-1 focus:ring-[#e8b4bc]/20";
  const fieldErrorClass =
    "border-[#e8b4bc]/50 focus:border-[#e8b4bc]/60 focus:ring-[#e8b4bc]/30";

  const successName = form.name || (locale === "es" ? "bella" : "beautiful");

  return (
    <section id="booking" className="section-pad border-y border-white/[0.04]">
      <div className="mx-auto w-full min-w-0 max-w-3xl">
        <SectionHeader label={b.label} title={b.title} description={b.description} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.35 }}
          className="glass-panel-strong relative mt-10 overflow-hidden rounded-2xl p-5 sm:mt-14 sm:rounded-[2rem] sm:p-10"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#e8b4bc]/15 blur-[80px]"
          />

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="relative py-12 text-center sm:py-16"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={springFast}
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#e8b4bc]/30 bg-[#e8b4bc]/10 sm:h-20 sm:w-20"
                  aria-hidden
                >
                  <svg
                    className="h-8 w-8 text-[#e8b4bc] sm:h-10 sm:w-10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h3 className="mt-6 font-[family-name:var(--font-cormorant)] text-2xl text-[#f7efe8] sm:mt-8 sm:text-3xl">
                  {b.successTitle}
                </h3>
                <p className="mt-3 px-2 text-sm leading-relaxed text-[#a89a9e] sm:mt-4 sm:text-base">
                  {b.successBody.replace("{name}", successName)}{" "}
                  <span className="text-[#e8d8dc]">{formatDisplayDate(form.date)}</span>{" "}
                  {locale === "es" ? "a las" : "at"}{" "}
                  <span className="text-[#e8d8dc]">{formatDisplayTime(form.time)}</span>.
                </p>
                <Button
                  variant="outline"
                  className="mt-6 w-full sm:mt-8 sm:w-auto"
                  onClick={() => {
                    setSubmitted(false);
                    setForm(initial);
                    setDateError("");
                  }}
                >
                  {b.bookAnother}
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                variants={stagger}
                initial="hidden"
                animate="show"
                onSubmit={onSubmit}
                className="relative min-w-0 space-y-4 sm:space-y-5"
              >
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  <motion.div variants={fadeUp}>
                    <label className="mb-2 block text-[10px] tracking-[0.2em] uppercase text-[#8a7a7e]">
                      {b.fields.name}
                    </label>
                    <input
                      required
                      autoComplete="name"
                      className={fieldClass}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={b.placeholders.name}
                    />
                  </motion.div>
                  <motion.div variants={fadeUp}>
                    <label className="mb-2 block text-[10px] tracking-[0.2em] uppercase text-[#8a7a7e]">
                      {b.fields.email}
                    </label>
                    <input
                      required
                      type="email"
                      autoComplete="email"
                      className={fieldClass}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder={b.placeholders.email}
                    />
                  </motion.div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  <motion.div variants={fadeUp}>
                    <label className="mb-2 block text-[10px] tracking-[0.2em] uppercase text-[#8a7a7e]">
                      {b.fields.phone}
                    </label>
                    <input
                      required
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      className={fieldClass}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder={b.placeholders.phone}
                    />
                  </motion.div>
                  <motion.div variants={fadeUp}>
                    <label className="mb-2 block text-[10px] tracking-[0.2em] uppercase text-[#8a7a7e]">
                      {b.fields.service}
                    </label>
                    <select
                      required
                      className={`${fieldClass} appearance-none`}
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt.id} value={opt.id} className="bg-[#1a1014]">
                          {opt.title}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                </div>

                <div className="grid min-w-0 gap-4 sm:grid-cols-2 sm:gap-5">
                  <motion.div variants={fadeUp} className="min-w-0">
                    <label className="mb-2 block text-[10px] tracking-[0.2em] uppercase text-[#8a7a7e]">
                      {b.fields.date}
                    </label>
                    <input
                      required
                      type="date"
                      className={`${fieldClass} max-w-full min-w-0 px-3 sm:px-4 ${dateError ? fieldErrorClass : ""}`}
                      value={form.date}
                      min={minDate}
                      onChange={(e) => handleDateChange(e.target.value)}
                      onBlur={(e) => handleDateChange(e.target.value)}
                    />
                    {dateError ? (
                      <p className="mt-2 break-words text-xs text-[#e8b4bc]" role="alert">
                        {dateError}
                      </p>
                    ) : (
                      <p className="mt-2 break-words text-[10px] leading-relaxed text-[#6a5c60]">
                        <span className="block sm:inline">
                          {b.dateHintFrom} {minDate}
                        </span>
                        <span className="hidden sm:inline"> · </span>
                        <span className="block sm:inline">{b.pastDatesBlocked}</span>
                      </p>
                    )}
                  </motion.div>
                  <motion.div variants={fadeUp} className="min-w-0">
                    <label className="mb-2 block text-[10px] tracking-[0.2em] uppercase text-[#8a7a7e]">
                      {b.fields.time}
                    </label>
                    <select
                      required
                      disabled={!form.date || availableTimeSlots.length === 0}
                      className={`${fieldClass} appearance-none disabled:cursor-not-allowed disabled:opacity-50`}
                      value={form.time}
                      onFocus={() => setSlotTick((n) => n + 1)}
                      onChange={(e) => {
                        setDateError("");
                        setForm({ ...form, time: e.target.value });
                      }}
                    >
                      {!form.date ? (
                        <option value="" className="bg-[#1a1014]">
                          {b.selectDateFirst}
                        </option>
                      ) : availableTimeSlots.length === 0 ? (
                        <option value="" className="bg-[#1a1014]">
                          {b.noTimesToday}
                        </option>
                      ) : (
                        availableTimeSlots.map((slot) => (
                          <option key={slot.value} value={slot.value} className="bg-[#1a1014]">
                            {slot.label}
                          </option>
                        ))
                      )}
                    </select>
                    {form.date && isToday && availableTimeSlots.length > 0 ? (
                      <p className="mt-2 text-[10px] text-[#6a5c60]">{b.todayTimesHint}</p>
                    ) : null}
                  </motion.div>
                </div>

                <motion.div variants={fadeUp}>
                  <label className="mb-2 block text-[10px] tracking-[0.2em] uppercase text-[#8a7a7e]">
                    {b.fields.message}
                  </label>
                  <textarea
                    rows={4}
                    className={`${fieldClass} min-h-[120px] resize-none`}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={b.placeholders.message}
                  />
                </motion.div>

                <motion.div variants={fadeUp} className="pt-1 sm:pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full min-h-[48px] sm:w-auto"
                  >
                    {isSubmitting ? b.submitting : b.submit}
                  </Button>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
