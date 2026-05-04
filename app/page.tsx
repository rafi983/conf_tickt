"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import backgroundDesktop from "../assets/images/background-desktop.png";
import backgroundMobile from "../assets/images/background-mobile.png";
import backgroundTablet from "../assets/images/background-tablet.png";
import iconGithub from "../assets/images/icon-github.svg";
import iconInfo from "../assets/images/icon-info.svg";
import iconUpload from "../assets/images/icon-upload.svg";
import logoFull from "../assets/images/logo-full.svg";
import logoMark from "../assets/images/logo-mark.svg";
import patternCircle from "../assets/images/pattern-circle.svg";
import patternLines from "../assets/images/pattern-lines.svg";
import patternSquigglyBottomDesktop from "../assets/images/pattern-squiggly-line-bottom-desktop.svg";
import patternSquigglyBottomMobile from "../assets/images/pattern-squiggly-line-bottom-mobile-tablet.svg";
import patternSquigglyTop from "../assets/images/pattern-squiggly-line-top.svg";
import patternTicket from "../assets/images/pattern-ticket.svg";

type FormState = {
  fullName: string;
  email: string;
  github: string;
  avatar: File | null;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

type TicketData = {
  fullName: string;
  email: string;
  github: string;
  avatarUrl: string;
  ticketNumber: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_AVATAR_SIZE = 500 * 1024;

export default function Home() {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    github: "",
    avatar: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string>("");
  const [ticket, setTicket] = useState<TicketData | null>(null);

  useEffect(() => {
    return () => {
      if (avatarPreviewUrl) {
        URL.revokeObjectURL(avatarPreviewUrl);
      }
    };
  }, [avatarPreviewUrl]);

  const handleFieldChange = (
    field: Exclude<keyof FormState, "avatar">,
    value: string,
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      setErrors((current) => ({
        ...current,
        avatar: "Please upload a JPG or PNG image.",
      }));
      return;
    }

    if (file.size > MAX_AVATAR_SIZE) {
      setErrors((current) => ({
        ...current,
        avatar: "File too large. Please upload a photo under 500KB.",
      }));
      return;
    }

    const newPreviewUrl = URL.createObjectURL(file);
    if (avatarPreviewUrl) {
      URL.revokeObjectURL(avatarPreviewUrl);
    }

    setAvatarPreviewUrl(newPreviewUrl);
    setForm((current) => ({ ...current, avatar: file }));
    setErrors((current) => ({ ...current, avatar: undefined }));
  };

  const validateForm = () => {
    const nextErrors: FormErrors = {};

    if (!form.avatar) {
      nextErrors.avatar = "Please upload an avatar.";
    }
    if (!form.fullName.trim()) {
      nextErrors.fullName = "Please enter your full name.";
    }
    if (!form.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!EMAIL_PATTERN.test(form.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!form.github.trim()) {
      nextErrors.github = "Please enter your GitHub username.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const normalizedGithub = form.github.trim().startsWith("@")
      ? form.github.trim()
      : `@${form.github.trim()}`;

    setTicket({
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      github: normalizedGithub,
      avatarUrl: avatarPreviewUrl,
      ticketNumber: `${Math.floor(10000 + Math.random() * 90000)}`,
    });
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-8 md:px-10 md:py-10">
      <Image
        src={backgroundMobile}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover md:hidden"
      />
      <Image
        src={backgroundTablet}
        alt=""
        fill
        priority
        sizes="100vw"
        className="hidden object-cover md:block lg:hidden"
      />
      <Image
        src={backgroundDesktop}
        alt=""
        fill
        priority
        sizes="100vw"
        className="hidden object-cover lg:block"
      />

      <Image
        src={patternLines}
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 w-full max-w-[1200px] -translate-x-1/2 opacity-70"
      />
      <Image
        src={patternSquigglyTop}
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-14 right-0 w-28 md:w-52"
      />
      <Image
        src={patternSquigglyBottomMobile}
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 w-72 md:hidden"
      />
      <Image
        src={patternSquigglyBottomDesktop}
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 hidden w-[720px] md:block"
      />
      <Image
        src={patternCircle}
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-[44%] right-[6%] hidden w-40 md:block"
      />

      <section className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <Image src={logoFull} alt="Coding Conf" className="mb-8 mt-2 w-40 md:mb-10" priority />

        {!ticket ? (
          <>
            <h1 className="max-w-xl text-3xl leading-tight font-extrabold text-[var(--neutral-0)] md:text-5xl md:leading-[1.05]">
              Your Journey to Coding Conf 2025 Starts Here!
            </h1>
            <p className="mt-4 mb-8 text-lg text-[var(--neutral-300)] md:mb-10">
              Secure your spot at next year&apos;s biggest coding conference.
            </p>

            <form
              className="w-full max-w-[460px] space-y-5 text-left"
              onSubmit={handleSubmit}
              noValidate
            >
              <div>
                <label
                  htmlFor="avatar"
                  className="mb-2 block text-xl font-medium text-[var(--neutral-0)]"
                >
                  Upload Avatar
                </label>
                <label
                  htmlFor="avatar"
                  className={`group flex min-h-[126px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed bg-[rgba(255,255,255,0.08)] p-4 transition ${
                    errors.avatar
                      ? "border-[var(--orange-700)]"
                      : "border-[rgba(255,255,255,0.35)] hover:border-[var(--neutral-0)]"
                  }`}
                >
                  {avatarPreviewUrl ? (
                    <Image
                      src={avatarPreviewUrl}
                      alt="Selected avatar preview"
                      width={48}
                      height={48}
                      unoptimized
                      className="mb-3 h-12 w-12 rounded-xl object-cover"
                    />
                  ) : (
                    <span className="mb-3 rounded-xl border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.08)] p-2">
                      <Image src={iconUpload} alt="" aria-hidden width={24} height={24} />
                    </span>
                  )}
                  <span className="text-center text-base text-[var(--neutral-300)]">
                    Drag and drop or click to upload
                  </span>
                  <input
                    id="avatar"
                    name="avatar"
                    type="file"
                    accept="image/png, image/jpeg"
                    className="sr-only"
                    onChange={handleAvatarChange}
                    aria-invalid={Boolean(errors.avatar)}
                    aria-describedby="avatar-helper"
                  />
                </label>
                <p
                  id="avatar-helper"
                  className={`mt-2 flex items-center gap-2 text-xs ${
                    errors.avatar ? "text-[var(--orange-500)]" : "text-[var(--neutral-300)]"
                  }`}
                  role={errors.avatar ? "alert" : undefined}
                >
                  <Image src={iconInfo} alt="" aria-hidden width={14} height={14} />
                  {errors.avatar ?? "Upload your photo (JPG or PNG, max size: 500KB)."}
                </p>
              </div>

              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-xl font-medium text-[var(--neutral-0)]"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  value={form.fullName}
                  onChange={(event) => handleFieldChange("fullName", event.target.value)}
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.35)] bg-[rgba(255,255,255,0.08)] px-4 py-3 text-lg text-[var(--neutral-0)] outline-none transition placeholder:text-[var(--neutral-500)] hover:border-[var(--neutral-0)] focus:border-[var(--orange-500)]"
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? "fullName-error" : undefined}
                />
                {errors.fullName ? (
                  <p id="fullName-error" className="mt-2 text-sm text-[var(--orange-500)]" role="alert">
                    {errors.fullName}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xl font-medium text-[var(--neutral-0)]"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(event) => handleFieldChange("email", event.target.value)}
                  placeholder="example@email.com"
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.35)] bg-[rgba(255,255,255,0.08)] px-4 py-3 text-lg text-[var(--neutral-0)] outline-none transition placeholder:text-[var(--neutral-500)] hover:border-[var(--neutral-0)] focus:border-[var(--orange-500)]"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email ? (
                  <p id="email-error" className="mt-2 text-sm text-[var(--orange-500)]" role="alert">
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="github"
                  className="mb-2 block text-xl font-medium text-[var(--neutral-0)]"
                >
                  GitHub Username
                </label>
                <input
                  id="github"
                  value={form.github}
                  onChange={(event) => handleFieldChange("github", event.target.value)}
                  placeholder="@yourusername"
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.35)] bg-[rgba(255,255,255,0.08)] px-4 py-3 text-lg text-[var(--neutral-0)] outline-none transition placeholder:text-[var(--neutral-500)] hover:border-[var(--neutral-0)] focus:border-[var(--orange-500)]"
                  aria-invalid={Boolean(errors.github)}
                  aria-describedby={errors.github ? "github-error" : undefined}
                />
                {errors.github ? (
                  <p id="github-error" className="mt-2 text-sm text-[var(--orange-500)]" role="alert">
                    {errors.github}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-xl bg-[var(--orange-500)] px-6 py-4 text-lg font-extrabold text-[var(--neutral-900)] transition hover:bg-[var(--orange-700)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--neutral-0)]"
              >
                Generate My Ticket
              </button>
            </form>
          </>
        ) : (
          <>
            <h1 className="max-w-[760px] text-3xl leading-tight font-extrabold text-[var(--neutral-0)] md:text-6xl md:leading-[1.05]">
              Congrats, {" "}
              <span className="bg-gradient-to-r from-[var(--orange-500)] to-[var(--neutral-0)] bg-clip-text text-transparent">
                {ticket.fullName}
              </span>
              ! Your ticket is ready.
            </h1>
            <p className="mt-6 max-w-[520px] text-lg text-[var(--neutral-300)] md:text-2xl">
              We&apos;ve emailed your ticket to{" "}
              <span className="text-[var(--orange-500)]">{ticket.email}</span> and will send
              updates in the run up to the event.
            </p>

            <div className="relative mt-14 w-full max-w-[600px]">
              <Image src={patternTicket} alt="" className="h-auto w-full" priority />
              <div className="absolute inset-0 grid grid-cols-[1fr_auto] p-5 text-[var(--neutral-0)] md:p-7">
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <Image src={logoMark} alt="" aria-hidden className="h-8 w-8 md:h-10 md:w-10" />
                    <div>
                      <p className="text-2xl leading-none font-bold md:text-[2rem]">Coding Conf</p>
                      <p className="mt-2 text-sm text-[var(--neutral-300)] md:text-base">
                        Jan 31, 2025 / Austin, TX
                      </p>
                    </div>
                  </div>

                  <div className="mt-10 flex items-center gap-4">
                    <Image
                      src={ticket.avatarUrl}
                      alt={`${ticket.fullName} avatar`}
                      width={80}
                      height={80}
                      unoptimized
                      className="h-11 w-11 rounded-lg object-cover md:h-20 md:w-20"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-lg font-bold md:text-3xl">{ticket.fullName}</p>
                      <p className="mt-1 flex items-center gap-2 text-sm text-[var(--neutral-300)] md:text-lg">
                        <Image src={iconGithub} alt="" aria-hidden className="h-4 w-4 md:h-5 md:w-5" />
                        {ticket.github}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="my-auto -mr-1 rotate-90 text-sm tracking-widest text-[var(--neutral-500)] md:text-xl">
                  #{ticket.ticketNumber}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setTicket(null)}
              className="mt-10 rounded-xl border border-[rgba(255,255,255,0.35)] bg-[rgba(255,255,255,0.08)] px-5 py-3 text-base font-semibold text-[var(--neutral-0)] transition hover:border-[var(--neutral-0)]"
            >
              Generate another ticket
            </button>
          </>
        )}
      </section>
    </main>
  );
}
