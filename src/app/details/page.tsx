"use client";

import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from "react";
import CloudDownloadIcon from "../../../public/images/cloud-download.svg";
import EnvelopeIcon from "../../../public/images/envelope.svg";

interface FormProps {
  name: string;
  email: string;
  about: string;
  avatar: string;
}

export default function Details() {
  const router = useRouter();
  const [errors, setErrors] = useState<Partial<FormProps>>({});
  const [isOpen, setIsOpen] = useState(false);
  const [tempUrl, setTempUrl] = useState("");
  const [isValidImage, setIsValidImage] = useState(true);
  const [state, setState] = useState<FormProps>({
    name: "",
    email: "",
    about: "",
    avatar: "",
  });

  // Load saved state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("formState");
    if (savedState) {
      setState(JSON.parse(savedState));
    }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem("formState", JSON.stringify(state));
  }, [state]);

  // Clear errors after 3 seconds
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        setErrors({});
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormProps> = {};

    if (!state.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!state.email) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(state.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!state.about.trim()) {
      newErrors.about = "About the project is required";
    }

    if (!state.avatar) {
      newErrors.avatar = "Profile photo is required";
    } else if (!state.avatar.startsWith("http")) {
      newErrors.avatar =
        "Please enter a valid image URL (must start with http:// or https://)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageError = () => {
    setIsValidImage(false);
    setErrors((prev) => ({
      ...prev,
      avatar: "Failed to load image. Please check the URL.",
    }));
  };

  const handleImageLoad = () => {
    setIsValidImage(true);
    setErrors((prev) => ({ ...prev, avatar: undefined }));
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      router.push("/");
    }
  };

  const handleAvatarSubmit = () => {
    if (!tempUrl) {
      setErrors((prev) => ({
        ...prev,
        avatar: "Please enter an image URL",
      }));
      return;
    }

    if (!tempUrl.startsWith("http://") && !tempUrl.startsWith("https://")) {
      setErrors((prev) => ({
        ...prev,
        avatar:
          "Please enter a valid image URL (must start with http:// or https://)",
      }));
      return;
    }

    if (isValidImage) {
      setState((prev) => ({ ...prev, avatar: tempUrl }));
      setIsOpen(false);
    }
  };

  const openAvatarDialog = () => {
    setTempUrl(state.avatar);
    setIsOpen(true);
  };

  return (
    <main className="max-xl:px-5 pb-12 md:pb-24">
      <div className="max-w-[700px] w-full mx-auto p-12 rounded-[40px] border border-[#0E464F] bg-[#041E23]">
        <div className="flex flex-col gap-3 mb-8">
          <div className="flex max-md:flex-col justify-between gap-3">
            <h1 className="text-[32px] font-normal text-white jeju">
              Attendee Details{" "}
            </h1>
            <p className="text-base font-normal leading-6 text-foreground font-roboto">
              Step 2/3
            </p>
          </div>

          <div className="h-1 w-full rounded-[5px] bg-[#0E464F]">
            <div className="w-3/4 h-1 rounded-[5px] bg-[#24A0B5]"></div>
          </div>
        </div>

        <div className="flex flex-col space-y-8 p-6 rounded-[32px] bg-[#08252B] border border-[#0E464F]">
          <div
            onClick={openAvatarDialog}
            className="flex flex-col gap-8 p-6 rounded-2xl border border-[#07373F] bg-[#052228] cursor-pointer"
          >
            <label
              htmlFor="avatar"
              className="font-roboto text-base font-normal leading-6 text-foreground"
            >
              Upload Profile Photo
            </label>
            <div className="flex items-center justify-center bg-black/20">
              {state.avatar ? (
                <div className="relative w-full h-[240px] rounded-[32px] overflow-hidden">
                  <Image
                    src={state.avatar}
                    alt="Profile Preview"
                    fill
                    style={{ objectFit: "cover" }}
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-6 gap-4 rounded-[32px] bg-[#0E464F] text-foreground min-h-[240px]">
                  <Image
                    width={32}
                    height={32}
                    src={CloudDownloadIcon}
                    alt="Cloud Icon"
                    aria-label="Logo of a Cloud"
                    className="w-8 h-8 border-[#0E464F]"
                  />
                  <p className="max-w-[192px] text-center text-foreground text-base font-normal leading-6 font-roboto">
                    Drag & drop or click to upload
                  </p>
                </div>
              )}
            </div>
            {errors.avatar && (
              <span className="text-sm text-red-600 tracking-wide">
                {errors.avatar}
              </span>
            )}
          </div>

          <div className="h-1 bg-[#07373F] w-full"></div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="font-roboto text-base font-normal leading-6 text-foreground"
              >
                Enter your name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={state.name}
                onChange={handleChange}
                className="w-full bg-transparent p-3 rounded-xl border border-[#07373F] font-roboto text-base font-normal leading-6 text-foreground"
                placeholder=""
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby="name-error"
                aria-label="Name"
              />
              {errors.name && (
                <span
                  id="name-error"
                  className="text-sm text-red-600 tracking-wide"
                >
                  {errors.name}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="font-roboto text-base font-normal leading-6 text-foreground"
              >
                Enter your email *
              </label>
              <div className="relative">
                <Image
                  width={24}
                  height={24}
                  src={EnvelopeIcon}
                  alt="Email Icon"
                  className="absolute top-3 left-3 w-6 h-6 border-[#0E464F]"
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={state.email}
                  onChange={handleChange}
                  placeholder="hello@avioflagos.io"
                  className="w-full bg-transparent py-3 pl-11 pr-3 rounded-xl border border-[#07373F] font-roboto text-base font-normal leading-6 text-foreground"
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby="email-error"
                  aria-label="Email"
                />
              </div>
              {errors.email && (
                <span
                  id="email-error"
                  className="text-sm text-red-600 tracking-wide"
                >
                  {errors.email}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="about"
                className="font-roboto text-base font-normal leading-6 text-foreground"
              >
                About the project
              </label>
              <textarea
                id="about"
                name="about"
                value={state.about}
                onChange={handleChange}
                placeholder="Textarea"
                className="bg-transparent p-3 rounded-xl border border-[#07373F] font-roboto text-base font-normal leading-6 text-foreground min-h-[127px]"
                aria-required="true"
                aria-invalid={!!errors.about}
                aria-describedby="about-error"
                aria-label="About the project"
              ></textarea>
              {errors.about && (
                <span
                  id="about-error"
                  className="text-sm text-red-600 tracking-wide"
                >
                  {errors.about}
                </span>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => router.push("/")}
                className="py-3 px-6 rounded-lg font-normal text-base text-[#24A0B5] leading-6 border border-[#24A0B5] bg-[#041E23] w-full jeju"
              >
                Back
              </button>
              <button
                type="submit"
                className="py-3 px-6 rounded-lg font-normal text-base text-white leading-6 border border-[#24A0B5] bg-[#24A0B5] w-full jeju"
              >
                Get My Free Ticket
              </button>
            </div>
          </form>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#041E23] border border-[#0E464F] p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white mb-4"
                  >
                    Enter Image URL
                  </Dialog.Title>
                  <div className="mt-2">
                    <input
                      type="url"
                      value={tempUrl}
                      onChange={(e) => setTempUrl(e.target.value)}
                      className="w-full bg-transparent p-3 rounded-xl border border-[#07373F] font-roboto text-base font-normal leading-6 text-foreground"
                      placeholder="https://example.com/image.jpg"
                    />
                    {!isValidImage && (
                      <p className="text-red-500 text-sm mt-2">
                        Please enter a valid image URL
                      </p>
                    )}
                  </div>

                  {tempUrl && (
                    <div className="mt-4">
                      <Image
                        src={tempUrl}
                        alt="Preview"
                        width={200}
                        height={200}
                        className="rounded-lg mx-auto"
                        onError={handleImageError}
                        onLoad={handleImageLoad}
                      />
                    </div>
                  )}

                  <div className="mt-4 flex gap-4">
                    <button
                      type="button"
                      className="py-3 px-6 rounded-lg font-normal text-base text-[#24A0B5] leading-6 border border-[#24A0B5] bg-[#041E23] w-full jeju"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="py-3 px-6 rounded-lg font-normal text-base text-white leading-6 border border-[#24A0B5] bg-[#24A0B5] w-full jeju"
                      onClick={handleAvatarSubmit}
                      disabled={!isValidImage || !tempUrl}
                    >
                      Confirm
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </main>
  );
}
