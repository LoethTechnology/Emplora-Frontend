
import { Fragment } from "react";
import Link from "next/link";
import Navbar from "../../../components/navbar/navbar";
import Footer from "../../../components/footer/footer";

const sections = [
  {
    title: "1. Share Honest Experiences",
    paragraphs: [
      "We encourage users to share genuine experiences based on their personal interactions with an employer, workplace, or recruitment process.",
      "Reviews should be:",
    ],
    bullets: [
      "Truthful",
      "Relevant",
      "Constructive",
      "Based on firsthand experience",
    ],
    ending: "Do not submit reviews on behalf of other people.",
  },
  {
    title: "2. Be Respectful",
    paragraphs: [
      "We understand that workplace experiences can be emotional.",
      "However, users must remain respectful when sharing opinions and experiences.",
      "Avoid:",
    ],
    bullets: [
      "Personal attacks",
      "Insults",
      "Abusive language",
      "Threats",
      "Harassment",
    ],
    ending:
      "Criticize experiences, policies, and workplace practices—not individuals.",
  },
  {
    title: "3. Do Not Post False or Misleading Information",
    paragraphs: ["Users must not knowingly submit:"],
    bullets: [
      "Fabricated reviews",
      "False accusations",
      "Misleading claims",
      "Impersonated experiences",
    ],
    ending:
      "Content found to be intentionally deceptive may be removed and may result in account suspension.",
  },
  {
    title: "4. Protect Privacy",
    paragraphs: ["Do not publish:"],
    bullets: [
      "Phone numbers",
      "Residential addresses",
      "National Identification Numbers",
      "Bank details",
      "Personal email addresses",
      "Private employee records",
      "Confidential company information",
    ],
    ending:
      "Respect the privacy of both individuals and organizations.",
  },
  {
    title: "5. No Hate Speech or Discrimination",
    paragraphs: [
      "Content that promotes or encourages discrimination based on race, ethnicity, nationality, religion, disability, gender, age, or any other protected characteristic is prohibited.",
      "Such content may result in immediate account suspension.",
    ],
  },
  {
    title: "6. No Threats or Illegal Content",
    paragraphs: ["Users may not post content that:"],
    bullets: [
      "Encourages violence",
      "Contains threats",
      "Promotes illegal activities",
      "Violates applicable laws",
    ],
    ending:
      "The Platform reserves the right to remove such content immediately.",
  },
  {
    title: "7. No Spam or Promotional Content",
    paragraphs: [
      "The Platform exists for workplace reviews and discussions.",
      "Users may not:",
    ],
    bullets: [
      "Advertise products or services",
      "Post referral links",
      "Engage in repetitive posting",
      "Use reviews for marketing purposes",
    ],
    ending: "Spam content may be removed without notice.",
  },
  {
    title: "8. Respect Intellectual Property",
    paragraphs: [
      "Do not upload content that infringes the copyrights, trademarks, or intellectual property rights of others.",
      "Users must only upload content they have the right to share.",
    ],
  },
  {
    title: "9. Reporting Content",
    paragraphs: [
      "If you believe content violates these Guidelines, you may report it using the reporting tools available on the Platform.",
      "Reports are reviewed and appropriate action may be taken.",
    ],
  },
  {
    title: "10. Enforcement",
    paragraphs: ["To protect the integrity of the Platform, we may:"],
    bullets: [
      "Remove content",
      "Restrict visibility of content",
      "Suspend user accounts",
      "Permanently ban repeat offenders",
    ],
    ending:
      "These actions may be taken when content violates these Guidelines or other Platform policies.",
  },
  {
    title: "11. Help Us Build a Better Community",
    paragraphs: [
      "Our goal is not to attack employers or employees.",
      "Our goal is to create a reliable source of workplace information that helps people make informed career decisions and encourages healthier workplace practices.",
      "By participating in this community, you agree to contribute honestly, respectfully, and responsibly.",
      "Thank you for helping us build a trustworthy platform.",
    ],
  },
];

export default function CommunityGuidelinesPage() {
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
              <span className="text-white">Community Guidelines</span>
            </nav>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
              Emplora Legal
            </p>

            <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              Community Guidelines
            </h1>

            <p className="max-w-2xl leading-7 text-gray-300">
              Help us build a respectful, trustworthy community where people
              can share workplace experiences responsibly.
            </p>

            <p className="mt-6 text-sm text-gray-300">
              Last Updated: 02/06/2026
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
                      href={`#guidelines-section-${index + 1}`}
                      className="block leading-5 text-gray-600 transition hover:text-blue-600"
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
              </aside>

              <article className="min-w-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8 md:p-10">
                <section className="mb-10">
                  <h2 className="mb-4 border-b border-gray-100 pb-3 text-xl font-bold text-[#121B3C] sm:text-2xl">
                    Our Goal
                  </h2>
                  <p className="leading-7 text-gray-600">
                    Our mission is to promote transparency in the workplace
                    by providing a platform where individuals can share honest
                    experiences about employers, recruitment processes,
                    workplace culture, and career development.
                  </p>
                  <p className="mt-4 leading-7 text-gray-600">
                    To maintain a fair and respectful environment, all users
                    are expected to follow these Community Guidelines.
                  </p>
                </section>

                <div className="space-y-10">
                  {sections.map((section, index) => (
                    <section
                      key={section.title}
                      id={`guidelines-section-${index + 1}`}
                      className="scroll-mt-8"
                    >
                      <h2 className="mb-4 border-b border-gray-100 pb-3 text-xl font-bold text-[#121B3C] sm:text-2xl">
                        {section.title}
                      </h2>

                      {section.paragraphs.map((paragraph) => (
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
