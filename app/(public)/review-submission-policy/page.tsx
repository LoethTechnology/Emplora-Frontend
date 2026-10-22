import { Fragment } from "react";
import Link from "next/link";
import Navbar from "../../../components/navbar/navbar";
import Footer from "../../../components/footer/footer";

const sections = [
  { id: "genuine-experiences", title: "1. Genuine Experiences", content: "Reviews must be based on your genuine, personal experiences with an employer. Do not submit reviews based on rumours, assumptions, or experiences that did not happen to you." },
  { id: "accuracy", title: "2. Accuracy and Honesty", content: "Provide honest, accurate, and fair information. Do not deliberately misrepresent events, exaggerate claims, or publish information you know to be false or misleading." },
  { id: "focus", title: "3. Focus on Experiences, Not Individuals", content: "Reviews should focus on your workplace experience, including the work environment, management, culture, compensation, benefits, and career development. Avoid personal attacks against individual employees or other identifiable people." },
  { id: "constructive-feedback", title: "4. Constructive Feedback", content: "We encourage respectful, clear, and constructive feedback. Explain your experience in a way that helps others understand the workplace without using abusive, insulting, or unnecessarily offensive language." },
  { id: "confidential-information", title: "5. Confidential Information", content: "Do not include trade secrets, confidential business information, private internal documents, personal data, or information you are not authorised to disclose." },
  { id: "prohibited-content", title: "6. Prohibited Review Content", content: "Reviews must not contain threats, hate speech, discrimination, harassment, defamatory allegations, illegal content, spam, promotional material, or content that violates another person's rights. Do not post content intended to manipulate an employer's rating or reputation." },
  { id: "anonymous-reviews", title: "7. Anonymous Reviews", content: "Emplora may allow reviews to be displayed anonymously to protect reviewer privacy. Anonymity does not remove your responsibility to ensure that your submission complies with this policy and our other applicable policies." },
  { id: "moderation", title: "8. Review Moderation", content: "Emplora may review submissions and remove, restrict, or decline to publish content that violates this policy or our other platform policies. We may take action where content appears suspicious, misleading, abusive, or otherwise inappropriate." },
  { id: "reporting", title: "9. Reporting Reviews", content: "Users and employers may report reviews they believe violate our policies. Reports should explain the concern and provide relevant information to help us assess the content. Reports are reviewed in accordance with our Dispute Resolution & Content Reporting Policy." },
  { id: "employer-disputes", title: "10. Employer Disputes", content: "Employers may challenge reviews they believe are false, misleading, or in violation of our policies. A complaint does not automatically mean a review will be removed. Emplora may assess the available information and take appropriate action." },
  { id: "removal", title: "11. Review Removal", content: "Emplora may remove or restrict a review where it violates this policy, applicable law, or other platform policies. Where appropriate, we may request additional information before making a decision." },
  { id: "updates", title: "12. Policy Updates", content: "We may update this policy from time to time. Changes will be published on this page, together with an updated revision date where applicable. Continued use of Emplora after changes are published constitutes acceptance of the updated policy, where applicable." },
];

export default function ReviewSubmissionPolicy() {
  return (
    <Fragment>
      <Navbar variant="" />

      <main className="min-h-screen bg-[#F7F8FC]">
        <section className="bg-[#121B3C] px-5 pb-14 pt-28 text-white md:px-12 md:pb-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 text-sm text-gray-300">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <span>Review Submission Policy</span>
            </div>

            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-blue-200">
              Legal &amp; Policies
            </p>
            <h1 className="max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
              Review Submission Policy
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
                  <a key={section.id} href={`#${section.id}`} className="block hover:text-blue-700">
                    {section.title}
                  </a>
                ))}
                <a href="#contact" className="block hover:text-blue-700">Contact Us</a>
              </nav>
            </aside>

            <article className="rounded-2xl border border-gray-200 bg-white p-6 leading-7 text-gray-700 shadow-sm md:p-10">
              <p className="mb-8">
                This policy explains the standards that apply when submitting
                company reviews on Emplora. Our goal is to maintain a useful,
                trustworthy platform where people can share workplace
                experiences responsibly.
              </p>

              {sections.map((section) => (
                <section key={section.id} id={section.id} className="mb-8 scroll-mt-28">
                  <h2 className="mb-3 text-xl font-semibold text-[#121B3C]">
                    {section.title}
                  </h2>
                  <p>{section.content}</p>
                </section>
              ))}

              <section id="contact" className="scroll-mt-28 rounded-xl bg-[#F7F8FC] p-6">
                <h2 className="mb-3 text-xl font-semibold text-[#121B3C]">
                  Contact Us
                </h2>
                <p>
                  If you have questions about this policy, contact Loeth
                  Technology at{" "}
                  <a href="mailto:contact@loeth.ng" className="font-medium text-blue-700 hover:underline">
                    contact@loeth.ng
                  </a>.
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
