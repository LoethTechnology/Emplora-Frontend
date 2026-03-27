import Footer from "@/components/footer/footer"
import Navbar from "@/components/navbar/navbar"
import ContacHeroImg from "@/images/contact/contact-hero-img.jpg";
import MailIconSrc from "@/images/contact/mail.svg";
import MapPinIconSrc from "@/images/contact/map-pin.svg";
import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react/jsx-runtime"

const ContactPage = () => {
  return (
    <Fragment>
      {/* navbar section  */}
      <Navbar />

      {/* main area  */}
      <main className="w-full">
        {/* Herosection */}
        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-112.5 flex items-center justify-center px-4 sm:px-6 md:px-0">
          <Image src={ContacHeroImg} alt="Contact Hero Image" className="absolute inset-0 w-full h-full object-cover opacity-50 bg-center" />
          <div className="absolute inset-0 bg-[#263B81]/30"></div>
          <div className="relative z-10 text-center px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[62px] text-white font-bold mb-4 leading-tight">Contact Us</h2>
            <nav className="text-white text-sm sm:text-base md:text-lg">
              <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
              <span className="mx-2">|</span>
              <span>Contact Us</span>
            </nav>
          </div>
        </div>

        {/* other section  */}
        <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-12 px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-20">
          {/* left  */}
          <div className="flex flex-col gap-6 sm:gap-8 w-full lg:w-1/2">
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl text-[#2F2F2F] font-semibold">Get In Touch</h3>
              <p className="text-sm sm:text-base md:text-lg text-[#727272] mt-4 leading-relaxed">We&apos;d love to hear from you. Whether you have a question, feedback, or need support, our team is here to help. At Emplora, we value your input and are committed to providing the best experience for our community. Feel free to reach out to us for:</p>
              <ul className="text-[#727272] text-sm sm:text-base md:text-lg mt-4 list-disc list-inside space-y-2">
                <li>General inquiries</li>
                <li>Support or technical issues</li>
                <li>Reporting concerns or content</li>
                <li>Partnerships or collaborations</li>
              </ul>
            </div>
            
            {/* links section  */}
            <div className="flex flex-col gap-4 sm:gap-6">
                <div className="flex gap-3 sm:gap-4 items-center">
                  <span className="bg-[#EBEDF7] rounded-full p-2 sm:p-2.5 inline-flex items-center justify-center flex-shrink-0 w-10 h-10">
                    <Image src={MailIconSrc} alt="Mail" width={20} height={20} />
                  </span>
                  <div className="flex flex-col gap-1 sm:gap-2.5">
                    <h4 className="text-[#2F2F2F] font-semibold text-base sm:text-lg">Email Us</h4>
                    <Link href="mailto:info@emplora.ng" className="text-[#727272] text-sm sm:text-base hover:text-[#263B81] transition-colors">info@emplora.ng</Link>
                  </div>
                </div>
                <div className="flex gap-3 sm:gap-4 items-center">
                  <span className="bg-[#EBEDF7] rounded-full p-2 sm:p-2.5 inline-flex items-center justify-center flex-shrink-0 w-10 h-10">
                    <Image src={MapPinIconSrc} alt="Location" width={20} height={20} />
                  </span>
                  <div className="flex flex-col gap-1 sm:gap-2.5">
                    <h4 className="text-[#2F2F2F] font-semibold text-base sm:text-lg">Visit Our Office</h4>
                    <p className="text-[#727272] text-sm sm:text-base">Abuja, Nigeria</p>
                  </div>
                </div>
            </div>
          </div>

          {/* right  */}
          <div className="w-full lg:w-1/2 bg-[#FFFFFF] border-[0.8px] border-[#E9E9E9] rounded-xl p-8">
          <h3 className="text-2xl sm:text-3xl md:text-2xl text-[#2F2F2F] font-semibold">Send us a message</h3>
          </div>
        </div>

      </main>

      <Footer />
    </Fragment>
  )
}

export default ContactPage
