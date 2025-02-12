"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import CloudDownloadIcon from "../../../public/images/cloud-download.svg";
import EnvelopeIcon from "../../../public/images/envelope.svg";

interface FormProps {
  name: string;
  email: string;
  request: string;
  avatar: string;
}

const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function Details() {
  const router = useRouter();
  const [errors, setErrors] = useState<Partial<FormProps>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [state, setState] = useState<FormProps>({
    name: "",
    email: "",
    request: "",
    avatar: "",
  });

  useEffect(() => {
    try {
      const savedState = localStorage.getItem("formState");
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        setState(parsedState);
        if (parsedState.avatar) {
          setPreviewUrl(parsedState.avatar);
        }
      }
    } catch (error) {
      console.error("Error loading saved state:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("formState", JSON.stringify(state));
    } catch (error) {
      console.error("Error saving state:", error);
    }
  }, [state]);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormProps> = {};

    if (!state.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!state.email) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!state.request.trim()) {
      newErrors.request = "Specific request is required";
    }

    if (!previewUrl) {
      newErrors.avatar = "Profile photo is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setErrors((prev) => ({ ...prev, avatar: undefined }));

    if (!selectedFile.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        avatar: "Please upload an image file",
      }));
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setErrors((prev) => ({
        ...prev,
        avatar: "File size should be less than 10MB",
      }));
      return;
    }

    const localPreviewUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(localPreviewUrl);
    setFile(selectedFile);
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    if (!CLOUDINARY_UPLOAD_PRESET || !CLOUDINARY_CLOUD_NAME) {
      throw new Error("Cloudinary configuration is missing");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Upload failed");
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        if (file) {
          setIsUploading(true);
          const cloudinaryUrl = await uploadToCloudinary(file);
          setState((prev) => ({ ...prev, avatar: cloudinaryUrl }));
          setPreviewUrl(cloudinaryUrl);
        }

        localStorage.removeItem("formState");
        router.push("/checkout");
      } catch (error) {
        console.error("Submission error:", error);
        setErrors((prev) => ({
          ...prev,
          submit: "Failed to submit form. Please try again.",
        }));
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  return (
    <main className="max-xl:px-5 pb-12 md:pb-24">
      <div className="max-w-[700px] w-full mx-auto p-12 rounded-[40px] border border-[#0E464F] bg-[#041E23]">
        <div className="flex flex-col gap-3 mb-8">
          <div className="flex max-md:flex-col justify-between gap-3">
            <h1
              className="text-[32px] font-normal text-white jeju"
              aria-label="Checkout Step 2 of 3"
            >
              Attendee Details
            </h1>
            <p className="text-base font-normal leading-6 text-foreground font-roboto">
              Step 2/3
            </p>
          </div>
          <div className="h-1 w-full rounded-[5px] bg-[#0E464F]">
            <div className="w-[57%] h-1 rounded-[5px] bg-[#24A0B5]"></div>
          </div>
        </div>

        <div className="flex flex-col space-y-8 p-6 rounded-[32px] bg-[#08252B] border border-[#0E464F]">
          <div className="flex flex-col gap-8 p-6 rounded-2xl border border-[#07373F] bg-[#052228]">
            <label
              htmlFor="fileInput"
              className="font-roboto text-base font-normal leading-6 text-foreground"
            >
              Upload Profile Photo
            </label>
            <div className="relative w-full h-[240px]">
              <div className="absolute inset-0 h-[200px] bg-black/20 top-1/2 transform -translate-y-1/2 w-full"></div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="fileInput"
                disabled={isUploading}
                aria-label="Upload Profile Photo"
                data-testid="file-input"
              />
              <label
                htmlFor="fileInput"
                className={`cursor-pointer block mx-auto max-w-[240px] ${
                  isUploading ? "opacity-50" : ""
                }`}
              >
                <div className="relative h-[240px] rounded-[32px] border-4 border-[#24A0B5]/50 bg-[#0E464F] overflow-hidden">
                  {previewUrl && (
                    <Image
                      src={previewUrl}
                      alt="Profile Preview"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  )}
                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-center p-6 gap-4 transition-opacity duration-300 ${
                      previewUrl
                        ? "opacity-0 hover:opacity-100 bg-black/50"
                        : "bg-[#0E464F]"
                    } text-foreground`}
                  >
                    <Image
                      width={32}
                      height={32}
                      src={CloudDownloadIcon}
                      alt="Upload Icon"
                      className="w-8 h-8"
                    />
                    <p className="max-w-[192px] text-center text-foreground text-base font-normal leading-6 font-roboto">
                      {isUploading
                        ? "Uploading..."
                        : "Drag & drop or click to upload"}
                    </p>
                  </div>
                </div>
              </label>
            </div>
            {errors.avatar && (
              <span
                id="avatar-error"
                className="text-sm text-red-500 tracking-wide"
                role="alert"
              >
                {errors.avatar}
              </span>
            )}
          </div>

          <div className="h-1 bg-[#07373F] w-full"></div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex flex-col gap-2 relative">
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
                aria-label="Enter your name"
                data-testid="name-input"
              />
              {errors.name && (
                <span
                  id="name-error"
                  className="absolute right-3 top-2/3 transform -translate-y-1/2 text-sm text-red-500 tracking-wide"
                  role="alert"
                >
                  {errors.name}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 relative">
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
                  className="absolute top-3 left-3 w-6 h-6"
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={state.email}
                  onChange={handleChange}
                  placeholder="hello@avioflagos.io"
                  className="w-full bg-transparent py-3 pl-11 pr-12 rounded-xl border border-[#07373F] font-roboto text-base font-normal leading-6 text-white"
                  aria-label="Enter your email"
                  data-testid="email-input"
                />
                {errors.email && (
                  <span
                    id="email-error"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-red-500 tracking-wide"
                    role="alert"
                  >
                    {errors.email}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 relative">
              <label
                htmlFor="request"
                className="font-roboto text-base font-normal leading-6 text-foreground"
              >
                Special request?
              </label>
              <textarea
                id="request"
                name="request"
                value={state.request}
                onChange={handleChange}
                placeholder="Textarea"
                className="bg-transparent p-3 pr-12 rounded-xl border border-[#07373F] font-roboto text-base font-normal leading-6 text-foreground min-h-[127px]"
                aria-label="Special request"
                data-testid="request-textarea"
              ></textarea>
              {errors.request && (
                <span
                  id="request-error"
                  className="absolute right-3 top-14 transform -translate-y-1/2 text-sm text-red-500 tracking-wide"
                  role="alert"
                >
                  {errors.request}
                </span>
              )}
            </div>

            <div className="flex gap-6">
              <button
                type="button"
                onClick={() => router.push("/")}
                className="py-3 px-6 rounded-lg font-normal text-base text-[#24A0B5] leading-6 border border-[#24A0B5] bg-[#041E23] w-full jeju"
                data-testid="back-button"
              >
                Back
              </button>
              <button
                type="submit"
                className="py-3 px-6 rounded-lg font-normal text-base text-white leading-6 border border-[#24A0B5] bg-[#24A0B5] w-full jeju"
                data-testid="submit-button"
              >
                Get My Free Ticket
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
