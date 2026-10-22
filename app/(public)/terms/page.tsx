
import { Fragment } from "react";
import Link from "next/link";
import Navbar from "../../../components/navbar/navbar";
import Footer from "../../../components/footer/footer";

const sections = [
  {
    title: "1. Acceptance of Terms",
    paragraphs: [
      "By accessing or using Emplora (\"the Platform\"), you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use the Platform.",
    ],
  },
  {
    title: "2. Purpose of the Platform",
    paragraphs: [
      "The Platform provides users with the ability to share and access reviews, ratings, and experiences relating to employers, workplaces, recruitment processes, and work environments.",
    ],
  },
  {
    title: "3. User Accounts",
    paragraphs: [
      "Users may be required to create an account to access certain features.",
      "You agree to:",
    ],
    bullets: [
      "Provide accurate information.",
      "Maintain the security of your account.",
      "Notify us of any unauthorized access.",
      "Accept responsibility for activities conducted under your account.",
    ],
  },
  {
    title: "4. User-Generated Content",
    paragraphs: [
      "Users may submit reviews, ratings, comments, and other content.",
      "By submitting content, you agree that:",
    ],
    bullets: [
      "Your content is based on genuine experiences.",
      "Your content is truthful to the best of your knowledge.",
      "Your content does not intentionally mislead others.",
      "You are solely responsible for the content you submit.",
    ],
    ending:
      "The Platform does not guarantee the accuracy of user-generated content.",
  },
  {
    title: "5. Prohibited Content",
    paragraphs: ["Users must not submit content that:"],
    bullets: [
      "Is false, fraudulent, or misleading.",
      "Defames or unlawfully harms the reputation of any individual or organization.",
      "Contains threats, harassment, hate speech, or discrimination.",
      "Violates applicable laws or regulations.",
      "Contains confidential or private information belonging to another person.",
      "Infringes intellectual property rights.",
    ],
  },
  {
    title: "6. Content Moderation",
    paragraphs: ["The Platform reserves the right to:"],
    bullets: [
      "Review submitted content.",
      "Remove content that violates these Terms.",
      "Restrict access to content.",
      "Suspend or terminate user accounts.",
    ],
    ending: "We may take these actions with or without prior notice.",
  },
  {
    title: "7. Reporting Content",
    paragraphs: [
      "Users and organizations may report reviews or content believed to violate these Terms or other Platform policies.",
      "Reported content may be reviewed and removed where appropriate.",
    ],
  },
  {
    title: "8. Intellectual Property",
    paragraphs: [
      "All Platform content, branding, logos, software, and design elements are owned by the Platform or its licensors and are protected by applicable intellectual property laws.",
      "Users may not copy, reproduce, or distribute Platform content without authorization.",
    ],
  },
  {
    title: "9. Limitation of Liability",
    paragraphs: [
      "The Platform serves as a venue for users to share experiences and opinions.",
      "To the fullest extent permitted by law, the Platform shall not be liable for losses, damages, claims, or disputes arising from user-generated content.",
    ],
  },
  {
    title: "10. Account Suspension and Termination",
    paragraphs: [
      "We reserve the right to suspend or terminate accounts that violate these Terms or engage in conduct that may harm the Platform or its users.",
    ],
  },
  {
    title: "11. Changes to These Terms",
    paragraphs: [
      "We may update these Terms from time to time.",
      "Continued use of the Platform after changes become effective constitutes acceptance of the revised Terms.",
    ],
  },
];

export default function TermsPage() {
  return (
    <Fragment>
      <Navbar variant="" />

      <main className="min-h-screen bg-[#F7F8FC]">
        <section className="bg-[#121B3C] px-5 pb-12 pt-28 text-white sm:px-8 md:pb-16">
          <div className="mx-auto max-w-5xl">
            <nav className="mb-5 text-sm text-gray-300">
              <Link href="/" className="transition hover:text-white">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white">Terms of Service</span>
            </nav>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
              Emplora Legal
            </p>

            <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              Terms of Service
            </h1>

            <p className="max-w-2xl leading-7 text-gray-300">
              Please read these terms carefully before using Emplora.
            </p>

            <p className="mt-6 text-sm text-gray-300">
              Last Updated: 02-06-2026
            </p>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-8 md:py-16">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start">
              <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-8">
                <h2 className="mb-4 font-semibold text-[#121B3C]">
                  On this page
                </h2>

                <nav className="space-y-3 text-sm">
                  {sections.map((section, index) => (
                    <a
                      key={section.title}
                      href={`#terms-section-${index + 1}`}
                      className="block leading-5 text-gray-600 transition hover:text-blue-600"
                    >
                      {section.title}
                    </a>
                  ))}
                  <a
                    href="#terms-section-12"
                    className="block leading-5 text-gray-600 transition hover:text-blue-600"
                  >
                    12. Contact Information
                  </a>
                </nav>
              </aside>

              <article className="min-w-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8 md:p-10">
                <div className="space-y-10">
                  {sections.map((section, index) => (
                    <section
                      key={section.title}
                      id={`terms-section-${index + 1}`}
                      className="scroll-mt-8"
                    >
                      <h2 className="mb-4 border-b border-gray-100 pb-3 text-xl font-bold text-[#121B3C] sm:text-2xl">
                        {section.title}
                      </h2>

                      {section.paragraphs?.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="mb-4 leading-7 text-gray-600"
                        >
                          {paragraph}
                        </p>
                      ))}

                      {section.bullets && (
                        <ul className="list-disc space-y-2 pl-6 leading-7 text-gray-600">
                          {section.bullets.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      )}

                      {section.ending && (
                        <p className="mt-4 leading-7 text-gray-600">
                          {section.ending}
                        </p>
                      )}
                    </section>
                  ))}

                  <section
                    id="terms-section-12"
                    className="scroll-mt-8"
                  >
                    <h2 className="mb-4 border-b border-gray-100 pb-3 text-xl font-bold text-[#121B3C] sm:text-2xl">
                      12. Contact Information
                    </h2>

                    <p className="mb-5 leading-7 text-gray-600">
                      Questions regarding these Terms may be directed to:
                    </p>

                    <div className="rounded-xl bg-[#F7F8FC] p-5">
                      <p className="mb-2 text-gray-700">
                        <strong>Email: </strong>
                        <a
                          href="mailto:contact@loeth.ng"
                          className="font-medium text-blue-600 underline underline-offset-4"
                        >
                          contact@loeth.ng
                        </a>
                      </p>
                      <p className="text-gray-700">
                        <strong>Organization:</strong> Loeth Technology
                      </p>
                    </div>
                  </section>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </Fragment>
  );
}
