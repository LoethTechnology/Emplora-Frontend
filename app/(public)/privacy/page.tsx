
import { Fragment } from "react";
import Link from "next/link";
import Navbar from "../../../components/navbar/navbar";
import Footer from "../../../components/footer/footer";

const sections = [
  {
    title: "1. Introduction",
    paragraphs: [
      'Welcome to Emplora ("the Platform", "we", "our", or "us").',
      "We are committed to protecting your privacy and ensuring that your personal information is handled responsibly. This Privacy Policy explains what information we collect, how we use it, and the choices available to you regarding your information.",
      "By accessing or using the Platform, you agree to the collection and use of information in accordance with this Privacy Policy.",
    ],
  },
  {
    title: "2. Information We Collect",
    subsections: [
      {
        title: "Information You Provide",
        paragraphs: ["We may collect information that you voluntarily provide, including:"],
        bullets: [
          "Name",
          "Email address",
          "Profile information",
          "Employment-related information you choose to share",
          "Reviews, ratings, comments, and other content you submit",
          "Communications sent to us through contact forms or support channels",
        ],
      },
      {
        title: "Information Collected Automatically",
        paragraphs: ["When you use the Platform, we may automatically collect:"],
        bullets: [
          "IP address",
          "Browser type and version",
          "Device information",
          "Pages visited",
          "Time and date of visits",
          "Usage and interaction data",
        ],
      },
      {
        title: "Third-Party Authentication",
        paragraphs: [
          "If you sign in using a third-party service such as LinkedIn, Google, or similar providers, we may receive certain profile information made available by that provider in accordance with your privacy settings.",
        ],
      },
    ],
  },
  {
    title: "3. How We Use Your Information",
    paragraphs: ["We may use your information to:"],
    bullets: [
      "Create and manage user accounts",
      "Operate and improve the Platform",
      "Display reviews and ratings submitted by users",
      "Verify user identity where necessary",
      "Respond to inquiries and support requests",
      "Monitor and prevent abuse, fraud, or misuse of the Platform",
      "Enforce our Terms of Service and Community Guidelines",
      "Analyze usage trends and improve user experience",
    ],
  },
  {
    title: "4. User-Generated Content",
    paragraphs: [
      "The Platform allows users to submit reviews, ratings, comments, and other content.",
      "Please note that information you voluntarily make public through reviews or comments may be visible to other users and visitors of the Platform.",
      "Users are solely responsible for the content they submit.",
    ],
  },
  {
    title: "5. Information Sharing",
    paragraphs: [
      "We do not sell personal information to third parties.",
      "We may share information:",
    ],
    bullets: [
      "When required by law",
      "To comply with legal obligations",
      "To protect the rights, safety, and security of the Platform, its users, or the public",
      "With service providers that assist us in operating the Platform",
    ],
  },
  {
    title: "6. Data Security",
    paragraphs: [
      "We implement reasonable technical and organizational measures to protect user information from unauthorized access, disclosure, alteration, or destruction.",
      "However, no method of electronic transmission or storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    title: "7. Data Retention",
    paragraphs: ["We retain personal information for as long as necessary to:"],
    bullets: [
      "Provide services through the Platform",
      "Comply with legal obligations",
      "Resolve disputes",
      "Enforce our policies",
    ],
    ending:
      "We may retain certain records even after an account is deleted where required by law or for legitimate business purposes.",
  },
  {
    title: "8. User Rights",
    paragraphs: ["Subject to applicable laws, users may have the right to:"],
    bullets: [
      "Access their personal information",
      "Request corrections to inaccurate information",
      "Request deletion of personal information",
      "Withdraw consent where applicable",
    ],
    ending:
      "Requests may be submitted through the contact information provided below.",
  },
  {
    title: "9. Children's Privacy",
    paragraphs: [
      "The Platform is intended for individuals who are at least 18 years old.",
      "We do not knowingly collect personal information from children.",
    ],
  },
  {
    title: "10. Changes to This Privacy Policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time.",
      "Any changes will be posted on this page with an updated revision date. Continued use of the Platform after changes become effective constitutes acceptance of the revised Privacy Policy.",
    ],
  },
];

export default function PrivacyPage() {
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
              <span className="text-white">Privacy Policy</span>
            </nav>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
              Emplora Legal
            </p>

            <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              Privacy Policy
            </h1>

            <p className="max-w-2xl leading-7 text-gray-300">
              Learn how Emplora collects, uses, and protects your personal
              information when you use our platform.
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
                      href={`#privacy-section-${index + 1}`}
                      className="block leading-5 text-gray-600 transition hover:text-blue-600"
                    >
                      {section.title}
                    </a>
                  ))}
                  <a
                    href="#privacy-section-11"
                    className="block text-gray-600 transition hover:text-blue-600"
                  >
                    11. Contact Us
                  </a>
                </nav>
              </aside>

              <article className="min-w-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8 md:p-10">
                <div className="mb-8 rounded-xl border-l-4 border-blue-600 bg-[#F1F4FF] p-5">
                  <p className="leading-7 text-gray-700">
                    Your privacy matters to us. This policy explains how your
                    information is handled when you use Emplora.
                  </p>
                </div>

                <div className="space-y-10">
                  {sections.map((section, index) => (
                    <section
                      key={section.title}
                      id={`privacy-section-${index + 1}`}
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

                      {section.subsections?.map((subsection) => (
                        <div key={subsection.title} className="mb-7">
                          <h3 className="mb-3 text-lg font-semibold text-gray-900">
                            {subsection.title}
                          </h3>

                          {subsection.paragraphs?.map((paragraph) => (
                            <p
                              key={paragraph}
                              className="mb-3 leading-7 text-gray-600"
                            >
                              {paragraph}
                            </p>
                          ))}

                          {subsection.bullets && (
                            <ul className="list-disc space-y-2 pl-6 leading-7 text-gray-600">
                              {subsection.bullets.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          )}
                        </div>
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
                    id="privacy-section-11"
                    className="scroll-mt-8"
                  >
                    <h2 className="mb-4 border-b border-gray-100 pb-3 text-xl font-bold text-[#121B3C] sm:text-2xl">
                      11. Contact Us
                    </h2>

                    <p className="mb-5 leading-7 text-gray-600">
                      If you have questions regarding this Privacy Policy,
                      please contact us at:
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
