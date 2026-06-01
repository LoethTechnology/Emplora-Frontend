'use client'

// Importing the necessary modules 
import Navbar from "@/components/navbar/navbar"
import Footer from "@/components/footer/footer"
import ContacHeroImg from "@/images/contact/contact-hero-img.jpg";
import MailIconSrc from "@/images/contact/mail.svg";
import MapPinIconSrc from "@/images/contact/map-pin.svg";
import UserIcon from "@/images/contact/user.svg";
import MailIcon2 from "@/images/contact/mail2.svg";
import PhoneIcon from "@/images/contact/phone.svg";
import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react/jsx-runtime"

// React Hook Form + Zod
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Updated Schema with Checkbox
const contactSchema = z.object({
  firstname: z.string().min(2, "First name must be at least 2 characters"),
  lastname: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string()
    .min(10, "Phone number must be at least 10 characters")
    .regex(/^[0-9+\s-()]+$/, "Please enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  agree: z.boolean().refine(val => val === true, "You must agree to the Terms and Privacy Policy"),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Creating the contact page component 
const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      agree: false,
    },
  });

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    try {
      console.log("Form submitted:", data);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      alert("Thank you! Your message has been sent successfully.");
      reset();
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <Fragment>
      <Navbar />

      <main className="w-full">
        {/* Hero Section */}
        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-112.5 flex items-center justify-center px-4 sm:px-6 md:px-0">
          <Image
            src={ContacHeroImg}
            alt="Contact Hero Image"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-[#263B81]/30"></div>
          <div className="relative z-10 text-center px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[62px] text-white font-bold mb-4 leading-tight">
              Contact Us
            </h2>
            <nav className="text-white text-sm sm:text-base md:text-lg">
              <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
              <span className="mx-2">|</span>
              <span>Contact Us</span>
            </nav>
          </div>
        </div>

        {/* Contact Content */}
        <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-12 px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-20">
          {/* Left - Info */}
          <div className="flex flex-col gap-6 sm:gap-8 w-full lg:w-1/2">
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl text-[#2F2F2F] font-semibold">
                Get In Touch
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-[#727272] mt-4 leading-relaxed">
                We&apos;d love to hear from you. Whether you have a question, feedback, or need support,
                our team is here to help. Feel free to reach out to us for:
              </p>
              <ul className="text-[#727272] text-sm sm:text-base md:text-lg mt-4 list-disc list-inside space-y-2">
                <li>General inquiries</li>
                <li>Support or technical issues</li>
                <li>Reporting concerns or content</li>
                <li>Partnerships or collaborations</li>
              </ul>
            </div>

            {/* Contact Links */}
            <div className="flex flex-col gap-4 sm:gap-6">
              <div className="flex gap-3 sm:gap-4 items-center">
                <span className="bg-[#EBEDF7] rounded-full p-2.5 inline-flex items-center justify-center flex-shrink-0 w-10 h-10">
                  <Image src={MailIconSrc} alt="Mail" width={20} height={20} />
                </span>
                <div>
                  <h4 className="text-[#2F2F2F] font-semibold text-base sm:text-lg">Email Us</h4>
                  <Link href="mailto:info@emplora.ng" className="text-[#727272] text-sm sm:text-base hover:text-[#263B81] transition-colors">
                    info@emplora.ng
                  </Link>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4 items-center">
                <span className="bg-[#EBEDF7] rounded-full p-2.5 inline-flex items-center justify-center flex-shrink-0 w-10 h-10">
                  <Image src={MapPinIconSrc} alt="Location" width={20} height={20} />
                </span>
                <div>
                  <h4 className="text-[#2F2F2F] font-semibold text-base sm:text-lg">Visit Our Office</h4>
                  <p className="text-[#727272] text-sm sm:text-base">Abuja, Nigeria</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="w-full lg:w-1/2 bg-white border border-[#E9E9E9] rounded-xl p-8">
            <h3 className="text-2xl sm:text-3xl text-[#2F2F2F] font-semibold mb-6">
              Send us a message
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-[#2F2F2F] mb-1.5">First Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      {...register("firstname")}
                      className="w-full pl-11 pr-4 py-3 border border-[#E9E9E9] rounded-lg focus:outline-none focus:border-[#263B81] transition-colors"
                      placeholder="Enter your first name"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#727272]">
                      <Image src={UserIcon} alt="User Icon" width={16} height={16} />
                    </div>
                  </div>
                  {errors.firstname && <p className="mt-1 text-sm text-red-600">{errors.firstname.message}</p>}
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-[#2F2F2F] mb-1.5">Last Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      {...register("lastname")}
                      className="w-full pl-11 pr-4 py-3 border border-[#E9E9E9] rounded-lg focus:outline-none focus:border-[#263B81] transition-colors"
                      placeholder="Enter your last name"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#727272]">
                      <Image src={UserIcon} alt="User Icon" width={16} height={16} />
                    </div>
                  </div>
                  {errors.lastname && <p className="mt-1 text-sm text-red-600">{errors.lastname.message}</p>}
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-[#2F2F2F] mb-1.5">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      {...register("email")}
                      className="w-full pl-11 pr-4 py-3 border border-[#E9E9E9] rounded-lg focus:outline-none focus:border-[#263B81] transition-colors"
                      placeholder="you@example.com"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#727272]">
                      <Image src={MailIcon2} alt="User Icon" width={16} height={16} />
                    </div>
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-[#2F2F2F] mb-1.5">Phone Number</label>
                  <div className="relative">
                    <input
                      type="tel"
                      {...register("phone")}
                      className="w-full pl-11 pr-4 py-3 border border-[#E9E9E9] rounded-lg focus:outline-none focus:border-[#263B81] transition-colors"
                      placeholder="+234 801 234 5678"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#727272]">
                      <Image src={PhoneIcon} alt="User Icon" width={16} height={16} />
                    </div>
                  </div>
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
                </div>
              </div>

              {/* Message */}
              <div className="relative">
                <label className="block text-sm font-medium text-[#2F2F2F] mb-1.5">Write your Message/Question</label>
                <textarea
                  {...register("message")}
                  rows={6}
                  className="w-full px-4 py-3 border border-[#E9E9E9] rounded-lg focus:outline-none focus:border-[#263B81] transition-colors resize-y min-h-[140px]"
                  placeholder="Write your message here..."
                />
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
              </div>

              {/* Checkbox */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="agree"
                  {...register("agree")}
                  className="mt-1 w-5 h-5 accent-[#334EAC] border border-[#DEDEDE] cursor-pointer"
                />
                <label htmlFor="agree" className="text-sm text-[#2F2F2F] cursor-pointer">
                  I agree to the{" "}
                  <Link href="/" className="text-[#334EAC] hover:underline">Terms of Service</Link> and{" "}
                  <Link href="/" className="text-[#334EAC] hover:underline">Privacy Policy</Link>
                </label>
              </div>
              {errors.agree && <p className="text-sm text-red-600">{errors.agree.message}</p>}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-12.5 text-[15px] bg-[#334EAC] pl-7.5 pr-7.5 rounded-[5px] hover:bg-[#263B81] disabled:bg-gray-400 text-white font-semibold transition-colors"
              >
                {isSubmitting ? "Sending Message..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </Fragment>
  );
};

// Exporting the contact page 
export default ContactPage;
