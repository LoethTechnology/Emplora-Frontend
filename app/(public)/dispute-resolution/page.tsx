import { Fragment } from "react";
import Link from "next/link";
import Navbar from "../../../components/navbar/navbar";
import Footer from "../../../components/footer/footer";

const sections = [
  {
    id: "reporting",
    title: "1. Reporting Content",
    content:
      "Users and employers may report reviews, ratings, comments, or other content they believe violates Emplora's policies or applicable law. Reports should identify the content in question and explain the reason for the complaint.",
  },
  {
    id: "information-required",
    title: "2. Information Required",
    content:
      "When submitting a report, provide the relevant content or link, a clear description of the concern, and any supporting information that may help us assess the report. Incomplete reports may require clarification before they can be reviewed.",
  },
  {
    id: "review-process",
    title: "3. Review Process",
    content:
      "Emplora will assess reports in accordance with its policies and the information available. We may request additional details where necessary. The time required to review a report may vary depending on its complexity and the information provided.",
  },
  {
    id: "possible-outcomes",
    title: "4. Possible Outcomes",
    content:
      "Following a review, we may decide to retain the content, request changes, restrict its visibility, remove it, or take other appropriate action under our policies. Submitting a report does not guarantee that content will be removed.",
  },
  {
    id: "employer-complaints",
    title: "5. Employer Complaints",
    content:
      "Employers may challenge content they believe is false, misleading, unlawful, or in violation of Emplora's policies. We may consider the explanation and supporting information provided by the employer alongside the content being challenged. A disagreement with a review alone does not automatically justify its removal.",
  },
  {
    id: "temporary-restrictions",
    title: "6. Temporary Restrictions",
    content:
      "Where appropriate, Emplora may temporarily restrict content while assessing a report, particularly where there are concerns about potential harm, privacy, or compliance with applicable law.",
  },
  {
    id: "cooperation",
    title: "7. Cooperation",
    content:
      "We may request further information from the person who submitted a report or from other relevant parties to help resolve a complaint. Any information provided should be accurate and relevant to the matter being reviewed.",
  },
  {
    id: "repeat-abuse",
    title: "8. Repeated or Abusive Reports",
    content:
      "We may take appropriate action against users who repeatedly submit knowingly false, malicious, abusive, or bad-faith reports, in accordance with our platform policies.",
  },
  {
    id: "appeals",
    title: "9. Appeals",
    content:
      "If you disagree with an outcome, you may contact us with an explanation of your concern and any relevant additional information. We may reconsider the matter where appropriate.",
  },
  {
    id: "good-faith",
    title: "10. Good-Faith Reporting",
    content:
      "Reports should be submitted honestly and responsibly. Do not use the reporting process to intimidate reviewers, retaliate against users, suppress genuine workplace experiences, or unfairly damage an employer's reputation.",
  },
  {
    id: "limitations",
    title: "11. Limitations",
    content:
      "While we aim to handle reports fairly and responsibly, we cannot guarantee a particular outcome or resolution. Our review is based on the information available to us and does not constitute a legal determination of disputed facts.",
  },
];

export default function DisputeResolutionPage() {
  return (
    <Fragment>
      <Navbar variant="" />

      <main className="min-h-screen bg-[#F7F8FC]">
        <section className="bg-[#121B3C] px-5 pb-14 pt-28 text-white md:px-12 md:pb-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 text-sm text-gray-300">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span>Dispute Resolution</span>
            </div>

            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-blue-200">
              Legal &amp; Policies
            </p>
            <h1 className="max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
              Dispute Resolution &amp; Content Reporting Policy
            </h1>
            <p className="mt-5 text-sm text-gray-300">
              Last Updated: 02-06-2026
            </p>
          </div>
        </section>

        <section className="px-5 py-10 md:px-12 md:py-16">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[260px_1fr]">
            <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6 lg:sticky lg:top-24">
              <h2 className="mb-4 text-lg font-semibold text-[#121B3C]">
                On this page
              </h2>
              <nav className="space-y-3 text-sm text-gray-600">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block hover:text-blue-700"
                  >
                    {section.title}
                  </a>
                ))}
                <a href="#contact" className="block hover:text-blue-700">
                  Contact Us
                </a>
              </nav>
            </aside>

            <article className="rounded-2xl border border-gray-200 bg-white p-6 leading-7 text-gray-700 shadow-sm md:p-10">
              <p className="mb-8">
                This policy explains how users and employers can report
                content, raise concerns, and request a review of disputes
                relating to content published on Emplora.
              </p>

              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="mb-8 scroll-mt-28"
                >
                  <h2 className="mb-3 text-xl font-semibold text-[#121B3C]">
                    {section.title}
                  </h2>
                  <p>{section.content}</p>
                </section>
              ))}

              <section
                id="contact"
                className="scroll-mt-28 rounded-xl bg-[#F7F8FC] p-6"
              >
                <h2 className="mb-3 text-xl font-semibold text-[#121B3C]">
                  12. Contact Us
                </h2>
                <p>
                  To submit a content report or dispute resolution request,
                  contact Loeth Technology at{" "}
                  <a
                    href="mailto:contact@loeth.ng"
                    className="font-medium text-blue-700 hover:underline"
                  >
                    contact@loeth.ng
                  </a>
                  . Please use the subject line{" "}
                  <strong>Content Report / Dispute Resolution Request</strong>.
                </p>
              </section>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </Fragment>
  );
}
