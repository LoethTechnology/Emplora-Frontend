import { Fragment } from "react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Community Guidelines", href: "/community-guidelines" },
    { label: "Review Submission Policy", href: "/review-submission-policy" },
    { label: "Disclaimer", href: "/disclaimer" },
    {
      label: "Dispute Resolution",
      href: "/dispute-resolution",
    },
  ];

  return (
    <Fragment>
      <footer className="bg-[#121B3C] p-8 text-white md:p-[50px]">
        <section className="flex flex-col justify-between gap-10 md:flex-row md:items-start md:gap-12">
          <section className="max-w-md">
            <div className="mb-[10px]">
              <h1 className="text-[25px] font-light">Emplora</h1>
            </div>

            <p className="text-sm text-[#B6B6B6] md:text-base">
              A people focused company creating meaningful work experiences
              and opportunities for growth.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-base font-semibold text-white">
              Quick Links
            </h2>

            <ul className="flex flex-col gap-4 text-sm text-[#B6B6B6] md:text-base">
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/search-company" className="hover:text-white">
                  Review a Company
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-base font-semibold text-white">
              Legal &amp; Policies
            </h2>

            <ul className="flex flex-col gap-3 text-sm text-[#B6B6B6] md:text-base">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </section>

        <section>
          <hr className="my-8 border-t border-[#676767]" />
        </section>

        <section>
          <p className="text-center text-xs text-[#B6B6B6] md:text-sm">
            &copy; {currentYear} Emplora. All rights reserved.
          </p>
        </section>
      </footer>
    </Fragment>
  );
};

export default Footer;
