import { Fragment } from "react";
import Link from "next/link";
import Navbar from "../../../components/navbar/navbar";
import Footer from "../../../components/footer/footer";

const sections = [
  {
    id: "general-disclaimer",
    title: "1. General Disclaimer",
    content:
      "Emplora is a platform that allows users to share workplace experiences and access information about employers. The information provided on the platform is for general informational purposes only and should not be treated as a guarantee of any employer's practices, working conditions, or employment opportunities.",
  },
  {
    id: "user-content",
    title: "2. User-Generated Content",
    content:
      "Reviews, ratings, comments, and other content published by users represent the views and experiences of their respective authors. They do not necessarily reflect the views of Emplora or Loeth Technology. We do not guarantee that all user-submitted content is accurate, complete, or current.",
  },
  {
    id: "no-professional-advice",
    title: "3. No Professional Advice",
    content:
      "Content on Emplora is not intended to constitute legal, financial, career, or other professional advice. Users should seek advice from an appropriately qualified professional where necessary before making decisions based on information found on the platform.",
  },
  {
    id: "accuracy",
    title: "4. Accuracy of Information",
    content:
      "We aim to maintain a useful and reliable platform, but we cannot guarantee that all information published on Emplora is accurate, complete, reliable, or up to date. Users should exercise their own judgment when evaluating reviews and other information.",
  },
  {
    id: "limitation",
    title: "5. Limitation of Responsibility",
    content:
      "To the extent permitted by applicable law, Emplora and Loeth Technology are not responsible for decisions, losses, or damages arising from reliance on user-generated content or other information available through the platform. Nothing in this disclaimer excludes or limits liability where doing so would be unlawful.",
  },
  {
    id: "moderation",
    title: "6. Content Moderation",
    content:
      "We may review, restrict, or remove content that violates our policies or applicable law. However, we do not guarantee that every piece of content will be reviewed or that all inappropriate content will be identified or removed.",
  },
];

export default function DisclaimerPage() {
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
              <span>Disclaimer</span>
            </div>

            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-blue-200">
              Legal &amp; Policies
            </p>
            <h1 className="max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
              Disclaimer
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
                This disclaimer explains the limitations and responsibilities
                associated with using Emplora and the information available on
                the platform.
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
                  Contact Us
                </h2>
                <p>
                  If you have questions about this disclaimer, contact Loeth
                  Technology at{" "}
                  <a
                    href="mailto:contact@loeth.ng"
                    className="font-medium text-blue-700 hover:underline"
                  >
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
