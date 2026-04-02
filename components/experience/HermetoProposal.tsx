"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  GitPullRequest,
  CheckCircle2,
  Eye,
  FileText,
  Clock,
  ChevronRight,
} from "lucide-react";
import ProposalTableOfContents from "./ProposalTableOfContents";

/* ── Small reusable pieces ──────────────────────────────────── */

const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="px-1.5 py-0.5 text-[13px] rounded bg-white/[0.06] text-accent-primary font-mono">
    {children}
  </code>
);

const SectionTitle = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => (
  <h2
    id={id}
    className="scroll-mt-28 text-2xl md:text-3xl font-bold text-white mb-6 pt-8 first:pt-0"
  >
    {children}
  </h2>
);

const Divider = () => <hr className="border-white/[0.05] my-12" />;

const fade = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5 },
};

/* ── PR table row ───────────────────────────────────────────── */

const PRRow = ({
  id,
  url,
  description,
  category,
  merged,
}: {
  id: string;
  url: string;
  description: string;
  category?: string;
  merged: boolean;
}) => (
  <tr className="border-b border-white/[0.04] last:border-0">
    <td className="py-3 pr-4 whitespace-nowrap">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-accent-primary hover:text-accent-secondary transition-colors text-sm font-mono"
      >
        {id}
        <ExternalLink className="w-3 h-3 opacity-40" />
      </a>
    </td>
    <td className="py-3 pr-4 text-gray-300 text-sm">{description}</td>
    {category !== undefined && (
      <td className="py-3 pr-4 hidden md:table-cell">
        <span className="text-xs text-gray-500">{category}</span>
      </td>
    )}
    <td className="py-3 text-right">
      {merged ? (
        <span className="inline-flex items-center gap-1 text-xs text-green-400">
          <CheckCircle2 className="w-3 h-3" /> Merged
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 text-xs text-blue-400">
          <Eye className="w-3 h-3" /> Review
        </span>
      )}
    </td>
  </tr>
);

/* ── Timeline item ──────────────────────────────────────────── */

const TimelineItem = ({
  phase,
  weeks,
  title,
  detail,
  highlight = false,
}: {
  phase: string;
  weeks: string;
  title: string;
  detail: string;
  highlight?: boolean;
}) => (
  <div
    className={`flex gap-4 p-4 rounded-xl border transition-colors ${
      highlight
        ? "bg-accent-secondary/[0.06] border-accent-secondary/20"
        : "bg-white/[0.02] border-white/[0.04] hover:border-white/[0.08]"
    }`}
  >
    <div className="shrink-0 pt-0.5">
      <span
        className={`text-[11px] font-mono font-bold tracking-wider ${
          highlight ? "text-accent-secondary" : "text-accent-primary"
        }`}
      >
        {phase}
      </span>
      <p className="text-[11px] text-gray-600 mt-0.5">{weeks}</p>
    </div>
    <div className="min-w-0">
      <p
        className={`text-sm font-semibold mb-0.5 ${
          highlight ? "text-accent-secondary" : "text-white"
        }`}
      >
        {title}
      </p>
      <p className="text-xs text-gray-500 leading-relaxed">{detail}</p>
    </div>
  </div>
);

/* ── Main component ─────────────────────────────────────────── */

export default function HermetoProposal() {
  return (
    <section
      id="hermeto-proposal"
      className="relative py-8 md:py-16 px-4 md:px-8 bg-bg-dark"
    >
      <ProposalTableOfContents />

      {/* Intro badge */}
      <motion.div {...fade} className="max-w-3xl mx-auto mb-12">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent-secondary/10 border border-accent-secondary/20">
            <FileText className="w-3.5 h-3.5 text-accent-secondary" />
            <span className="text-accent-secondary text-xs font-medium">
              GSoC 2026 Proposal
            </span>
          </div>
          <span className="text-gray-600 text-xs">Hermeto Project</span>
        </div>

        <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
          Adding Native <span className="text-accent-secondary">uv</span>{" "}
          Support to Hermeto
        </h2>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
          A proposal for building a native <Code>uv</Code> package manager
          backend in the Hermeto build system for reproducible, hermetic builds.
        </p>
      </motion.div>

      {/* ── Content ─────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto">
        {/* Contact info — compact */}
        <motion.div
          {...fade}
          className="mb-12 p-5 rounded-xl bg-white/[0.02] border border-white/[0.04]"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-2 text-sm">
            {[
              { l: "Name", v: "Sameer Pawar" },
              { l: "Email", v: "pawar96sameer@gmail.com", link: "mailto:pawar96sameer@gmail.com" },
              { l: "GitHub", v: "@sammy200-ui", link: "https://github.com/sammy200-ui" },
              { l: "Timezone", v: "IST (UTC+5:30)" },
              { l: "University", v: "Newton School of Technology" },
              { l: "Year", v: "2nd Year" },
            ].map((item) => (
              <div key={item.l}>
                <span className="text-gray-600 text-xs">{item.l}</span>
                <p className="text-gray-200">
                  {item.link ? (
                    <a
                      href={item.link}
                      target={item.link.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="text-accent-primary hover:text-accent-secondary transition-colors"
                    >
                      {item.v}
                    </a>
                  ) : (
                    item.v
                  )}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Synopsis ──────────────────────────────────────── */}
        <SectionTitle id="synopsis">Synopsis</SectionTitle>
        <motion.div {...fade} className="text-gray-300 text-[15px] leading-relaxed space-y-4 mb-4">
          <p>
            <Code>uv</Code> is quickly becoming the go‑to package manager for
            Python because of its speed and strict <Code>uv.lock</Code> format.
            But right now, Hermeto only supports pip. This leaves a major gap:
            teams building natively with <Code>uv</Code> cannot use Hermeto to
            guarantee reproducible, network‑isolated builds.
          </p>
          <p>
            This proposal addresses that gap by adding a native{" "}
            <Code>uv</Code> backend (<Code>x‑uv</Code>) to Hermeto, handling
            everything from lockfile parsing to dependency fetching and offline
            environment configuration.
          </p>
          <p>
            I found Hermeto when the GSoC 2026 organizations were announced, and
            I spent three weeks digging in — setting up the dev environment,
            running the test suites, and mapping out exactly what this
            integration requires. Before this, I spent four months actively
            contributing to AsyncAPI.
          </p>
          <p>
            At its core, Konflux is about software supply chain security. The{" "}
            <Code>uv.lock</Code> format records each dependency with its source,
            version, and SHA256 checksum for every wheel and sdist — a perfect
            fit for secure, deterministic builds.
          </p>
        </motion.div>

        <Divider />

        {/* ── Understanding the Problem ─────────────────────── */}
        <SectionTitle id="understanding">
          Understanding the Problem
        </SectionTitle>

        <motion.div {...fade} className="text-gray-300 text-[15px] leading-relaxed space-y-4">
          {/* AI note */}
          <div className="p-4 rounded-lg bg-accent-tertiary/[0.05] border border-accent-tertiary/10 text-sm text-gray-400">
            <span className="text-accent-tertiary font-medium">
              AI Transparency:
            </span>{" "}
            I used AI to help navigate the codebase and get up to speed. However,
            I manually verified every technical conclusion through my own code
            inspection and local testing.
          </div>

          <h3 className="text-lg font-semibold text-white pt-4">
            What Hermeto Actually Does
          </h3>
          <p>
            Hermeto works in two steps. First, <Code>fetch‑deps</Code> reads a
            project&apos;s lockfile, downloads every dependency, verifies checksums,
            and stores everything in a flat output directory alongside a
            CycloneDX SBOM. Second, <Code>generate‑env</Code> and{" "}
            <Code>inject‑files</Code> configure the build environment so the
            package manager uses the local cache instead of the internet.
          </p>

          {/* Architecture — simple vertical flow */}
          <div className="my-8 p-5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <p className="text-xs text-gray-600 uppercase tracking-widest mb-4 font-medium">
              Architecture Flow
            </p>
            <div className="flex flex-col items-center gap-1.5 max-w-sm mx-auto text-center">
              {[
                { label: "hermeto fetch-deps", sub: "CLI entry point", accent: true },
                { label: "resolver.py", sub: "dispatches to x-uv handler" },
                { label: "uv/ backend", sub: "parse uv.lock → extract packages → resolve URLs", isNew: true },
                { label: "http_requests.py", sub: "download + checksum verify" },
                { label: "sbom.py", sub: "generate CycloneDX BOM" },
              ].map((s, i, arr) => (
                <div key={i} className="w-full">
                  <div
                    className={`relative px-4 py-2.5 rounded-lg border text-sm ${
                      s.isNew
                        ? "bg-accent-secondary/[0.06] border-accent-secondary/20"
                        : s.accent
                        ? "bg-accent-primary/[0.06] border-accent-primary/20"
                        : "bg-white/[0.02] border-white/[0.04]"
                    }`}
                  >
                    {s.isNew && (
                      <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 text-[9px] font-bold bg-accent-secondary text-bg-dark rounded">
                        NEW
                      </span>
                    )}
                    <p className={`font-mono text-xs font-medium ${s.isNew ? "text-accent-secondary" : s.accent ? "text-accent-primary" : "text-gray-300"}`}>
                      {s.label}
                    </p>
                    <p className="text-gray-500 text-[11px]">{s.sub}</p>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="w-px h-2 bg-white/10 mx-auto" />
                  )}
                </div>
              ))}

              {/* Output */}
              <div className="w-px h-3 bg-white/10" />
              <div className="w-full px-4 py-3 rounded-lg border border-accent-primary/15 bg-accent-primary/[0.03]">
                <p className="font-mono text-xs text-accent-primary font-medium mb-2">
                  hermeto-output/
                </p>
                <div className="flex gap-2 justify-center text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-bg-dark/60 text-gray-400 border border-white/[0.04]">deps/uv/</span>
                  <span className="px-2 py-0.5 rounded bg-bg-dark/60 text-gray-400 border border-white/[0.04]">bom.json</span>
                  <span className="px-2 py-0.5 rounded bg-bg-dark/60 text-gray-400 border border-white/[0.04]">.build-config</span>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-white pt-4">
            Why uv Needs Its Own Backend
          </h3>
          <p>
            Yes, <Code>uv</Code> is backwards‑compatible with pip. But the
            mentors explicitly called out that this is NOT the native way.{" "}
            <Code>uv</Code> has its own workflow based on{" "}
            <Code>uv lock</Code> / <Code>uv sync</Code>, producing its own
            lockfile: <Code>uv.lock</Code> — a TOML file with inline sdist/wheel
            entries containing full download URLs and SHA256 hashes. The pip
            backend&apos;s parser won&apos;t work for this.
          </p>

          <h3 className="text-lg font-semibold text-white pt-6">
            Key Technical Challenges
          </h3>

          {/* Mentor quote */}
          <blockquote className="border-l-2 border-accent-secondary/40 pl-4 py-1 my-4">
            <p className="text-gray-400 text-sm italic">
              &ldquo;I think this should not be a design document, but a
              document conveying your capability to write a comprehensive design
              document and then implement it.&rdquo;
            </p>
            <p className="text-gray-600 text-xs mt-1">
              — Alexey Ovchinnikov, Discussion #1396
            </p>
          </blockquote>

          {/* Challenges — clean list */}
          <div className="space-y-5 mt-6">
            {[
              {
                t: "Parsing uv.lock",
                d: "Valid TOML parsed via tomllib. The challenge is the schema — understanding how packages, sources, wheels, and markers are structured. Each [[package]] section has name, version, source, dependencies, and inline sdist/wheels entries with full PyPI download URLs and SHA256 hashes.",
              },
              {
                t: "Download URL Resolution",
                d: "The lockfile already contains full download URLs for each wheel and sdist — no need to query the PyPI simple API. I'd reuse Hermeto's existing http_requests.py infrastructure.",
              },
              {
                t: "Security — No Arbitrary Code Execution",
                d: "Core Hermeto rule. uv reads metadata statically without running setup.py during resolution. I need to verify this by tracing uv's source code during the research phase rather than trusting docs alone.",
              },
              {
                t: "SBOM Integration",
                d: "Map uv packages to CycloneDX components with pkg:pypi/ PURLs via sbom.py. The experimental backend needs annotations like hermeto:backend:experimental:x-uv.",
              },
              {
                t: "Build Environment",
                d: "After fetching, uv needs to use cached deps offline. Key question: can uv sync be pointed at a local cache with no network fallback? This is best figured out by local testing.",
              },
            ].map((c, i) => (
              <div key={i}>
                <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-accent-primary" />
                  {c.t}
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed pl-5.5">
                  {c.d}
                </p>
              </div>
            ))}
          </div>

          {/* Edge cases */}
          <div className="mt-6 p-4 rounded-lg bg-white/[0.02] border border-white/[0.04]">
            <p className="text-sm font-medium text-white mb-2">
              Edge Cases I&apos;m Watching For
            </p>
            <ul className="space-y-1.5 text-sm text-gray-400">
              {[
                "Git dependencies — not PyPI packages, need different fetching logic",
                "Platform-specific wheel selection across multiple platforms",
                "Source distributions without pre-built wheels (possible build step conflict)",
                "Workspace/monorepo support — more complex lockfile structure",
                "uv.lock format not yet formally specified as stable API — Astral moves fast",
              ].map((e, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-accent-secondary mt-1.5 shrink-0">•</span>
                  {e}
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-400 mt-3">
              I don&apos;t have answers to all of these yet — that&apos;s what the
              research phase is for.{" "}
              <span className="text-accent-secondary">
                Knowing the right questions to ask is half the work.
              </span>
            </p>
          </div>
        </motion.div>

        <Divider />

        {/* ── Implementation Plan ───────────────────────────── */}
        <SectionTitle id="implementation">
          Implementation Plan & Timeline
        </SectionTitle>

        <motion.div {...fade} className="text-gray-300 text-[15px] leading-relaxed space-y-4">
          <p>
            The deliverables are clear: research, design document,
            implementation, SBOM integration, tests, and documentation.
          </p>

          <div className="space-y-3 mt-6">
            <TimelineItem
              phase="A"
              weeks="Bonding + Wk 1–2"
              title="Research & Design Document"
              detail="Design doc via docs/design/package-manager-template.md. Submitted as PR, iterate on mentor feedback."
            />
            <TimelineItem
              phase="B1"
              weeks="Wk 3–4"
              title="Lockfile Parser"
              detail="Create hermeto/core/package_managers/uv/ module. Parse uv.lock, extract packages/versions/checksums. Unit tests."
            />
            <TimelineItem
              phase="B2"
              weeks="Wk 4–5"
              title="Fetch Pipeline"
              detail="Implement fetch_uv_source(). Download via http_requests.py, verify checksums. Register as x-uv in resolver."
            />
            <TimelineItem
              phase="B3"
              weeks="Wk 5–6"
              title="SBOM Integration"
              detail="Map uv metadata to CycloneDX components. Accurate pkg:pypi/ PURLs with experimental annotations."
            />
            <TimelineItem
              phase="B4"
              weeks="Wk 6–7"
              title="Build Environment"
              detail="generate-env + inject-files support for offline uv usage."
            />
            <TimelineItem
              phase="MID"
              weeks="Wk 7"
              title="Midterm: End-to-end Demo"
              detail="Full x-uv pipeline works on standard projects — lockfile → download → verify → SBOM → offline build."
              highlight
            />
            <TimelineItem
              phase="C1"
              weeks="Wk 8–9"
              title="Integration Tests"
              detail="Containerized e2e tests in tests/integration/ covering happy path + edge cases."
            />
            <TimelineItem
              phase="C2"
              weeks="Wk 9–10"
              title="Documentation"
              detail="User-facing docs: prerequisites, example usage, known limitations."
            />
            <TimelineItem
              phase="C3"
              weeks="Wk 10–12"
              title="Polish & Hardening"
              detail="Edge case hardening, possible x-uv → uv graduation."
            />
          </div>

          <p className="text-sm text-gray-500 mt-4">
            These are goals, not unbreakable promises. I can commit 25–30 hours
            a week for the full duration.
          </p>
        </motion.div>

        <Divider />

        {/* ── Previous Contributions ────────────────────────── */}
        <SectionTitle id="contributions">
          Previous Contributions
        </SectionTitle>

        <motion.div {...fade}>
          {/* Hermeto */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-white mb-4">Hermeto</h3>
            <div className="rounded-xl border border-white/[0.04] overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/[0.02] border-b border-white/[0.06]">
                    <th className="py-2.5 px-4 text-[11px] text-gray-500 uppercase tracking-wider font-medium">
                      PR
                    </th>
                    <th className="py-2.5 px-4 text-[11px] text-gray-500 uppercase tracking-wider font-medium">
                      Description
                    </th>
                    <th className="py-2.5 px-4 text-[11px] text-gray-500 uppercase tracking-wider font-medium text-right">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <PRRow
                    id="#1354"
                    url="https://github.com/hermetoproject/hermeto/pull/1354"
                    description="Replaced fragile test-exclusion logic with standard pytest -k filtering, closing issue #950"
                    merged
                  />
                </tbody>
              </table>
            </div>
            <p className="text-gray-500 text-sm mt-3">
              Small change but required understanding the test infrastructure —
              why the exclusion logic existed, why it caused problems, and why
              removing it was safe.
            </p>
          </div>

          {/* AsyncAPI */}
          <div>
            <div className="flex items-baseline gap-3 mb-4">
              <h3 className="text-lg font-semibold text-white">AsyncAPI</h3>
              <span className="text-xs text-gray-600">
                4 months before switching orgs
              </span>
            </div>
            <div className="rounded-xl border border-white/[0.04] overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/[0.02] border-b border-white/[0.06]">
                    <th className="py-2.5 px-4 text-[11px] text-gray-500 uppercase tracking-wider font-medium">
                      PR
                    </th>
                    <th className="py-2.5 px-4 text-[11px] text-gray-500 uppercase tracking-wider font-medium">
                      Description
                    </th>
                    <th className="py-2.5 px-4 text-[11px] text-gray-500 uppercase tracking-wider font-medium hidden md:table-cell">
                      Type
                    </th>
                    <th className="py-2.5 px-4 text-[11px] text-gray-500 uppercase tracking-wider font-medium text-right">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <PRRow id="#4781" url="https://github.com/asyncapi/website/pull/4781" description="Removed deprecated scripts from the repo" category="Refactoring" merged />
                  <PRRow id="#4997" url="https://github.com/asyncapi/website/pull/4997" description="Cleaned up unused dependencies from package.json" category="Refactoring" merged />
                  <PRRow id="#4804" url="https://github.com/asyncapi/website/pull/4804" description="Fixed react-hooks/exhaustive-deps warnings" category="Refactoring" merged />
                  <PRRow id="#5014" url="https://github.com/asyncapi/website/pull/5014" description="Replaced Moment.js with Day.js — ~90% bundle reduction" category="Infrastructure" merged />
                  <PRRow id="#4710" url="https://github.com/asyncapi/website/pull/4710" description="Fixed background scrolling bug on Roadmap modal" category="Bug Fix" merged />
                  <PRRow id="#4585" url="https://github.com/asyncapi/website/pull/4585" description="Fixed broken links in git-workflow.md" category="Bug Fix" merged />
                  <PRRow id="#4600" url="https://github.com/asyncapi/website/pull/4600" description="Fixed broken community links in contributor docs" category="Bug Fix" merged />
                  <PRRow id="#4988" url="https://github.com/asyncapi/website/pull/4988" description="Reviewed and tested Navbar Chevron UI fix" category="Review" merged={false} />
                  <PRRow id="#4808" url="https://github.com/asyncapi/website/pull/4808" description="Verified Algolia search language sync logic" category="Review" merged={false} />
                  <PRRow id="#4893" url="https://github.com/asyncapi/website/pull/4893" description="Helped a contributor understand codebase logic" category="Review" merged={false} />
                </tbody>
              </table>
            </div>
            <p className="text-gray-500 text-sm mt-3 italic">
              None of this was glamorous — and that was kind of the point.
            </p>
          </div>
        </motion.div>

        <Divider />

        {/* ── Benefits ──────────────────────────────────────── */}
        <SectionTitle id="benefits">Benefits to the Community</SectionTitle>
        <motion.div {...fade} className="text-gray-300 text-[15px] leading-relaxed space-y-4">
          <p>
            Right now, any Python team using <Code>uv</Code> with Konflux
            cannot do hermetic builds because Hermeto only speaks pip.{" "}
            <Code>uv</Code> is not niche anymore — a lot of projects are moving
            to it. This backend closes that gap.
          </p>
          <p>
            A clean <Code>uv</Code> backend also gives future contributors a
            better reference if they need to add support for Poetry, PDM, or
            whatever comes next. And the design document itself is useful even if
            the code takes longer than expected.
          </p>
        </motion.div>

        <Divider />

        {/* ── About Me ──────────────────────────────────────── */}
        <SectionTitle id="about-me">About Me</SectionTitle>
        <motion.div {...fade} className="text-gray-300 text-[15px] leading-relaxed space-y-4">
          <p>
            I&apos;m a 2nd year student at Newton School of Technology. Most of my
            experience is in JavaScript and TypeScript — React, Next.js, Node.js.
            Python is more recent but I&apos;ve been spending a lot of time in it,
            and Hermeto&apos;s codebase is a good fit.
          </p>
          <p>
            I&apos;m also part of my college&apos;s Student Developer Club where I help
            organize meets, hackathons, and work on projects with others.
          </p>

          {/* Projects — simple inline links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
            {[
              { name: "SiliconSage", desc: "AI PC builder — Next.js + FastAPI + ML", url: "https://github.com/sammy200-ui/SiliconSage" },
              { name: "Let's Collab", desc: "Real-time whiteboard — React + Socket.IO", url: "https://github.com/IronwallxR5/Let-s_Collab" },
              { name: "NotesApp", desc: "AI note-taking — MERN + Groq", url: "https://github.com/sammy200-ui/NotesApp" },
            ].map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:border-accent-secondary/30 transition-colors group"
              >
                <p className="text-sm font-medium text-white group-hover:text-accent-secondary transition-colors">
                  {p.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{p.desc}</p>
              </a>
            ))}
          </div>
        </motion.div>

        <Divider />

        {/* ── Availability ──────────────────────────────────── */}
        <SectionTitle id="availability">Availability</SectionTitle>
        <motion.div {...fade} className="text-gray-300 text-[15px] leading-relaxed space-y-4">
          <p>
            My college has an internship period from June to December. If
            selected for GSoC, that becomes my internship — no classes, no exams,
            no conflicts.
          </p>
          <p>
            I can commit{" "}
            <span className="text-white font-medium">25–30 hours a week</span>.
            Timezone is IST (UTC+5:30). Happy to do async or sync communication,
            whatever works better for the mentors.
          </p>
        </motion.div>

        <Divider />

        {/* ── Post GSoC ─────────────────────────────────────── */}
        <SectionTitle id="post-gsoc">Post GSoC</SectionTitle>
        <motion.div {...fade} className="text-gray-300 text-[15px] leading-relaxed space-y-4 mb-8">
          <p>
            I want to stay on after GSoC ends. The <Code>x-uv</Code> backend
            will need maintenance — Astral moves fast and{" "}
            <Code>uv.lock</Code> will keep evolving. Someone who understands the
            parser and edge cases is better placed to handle that.
          </p>
          <p>
            There&apos;s also the graduation path from <Code>x-uv</Code> to stable{" "}
            <Code>uv</Code>. I want to be around for that.
          </p>
          <p>
            Hermeto is the kind of project I&apos;d keep contributing to — it&apos;s
            Python, well-organized, the mentors are responsive, and the problem
            it solves —{" "}
            <span className="text-accent-tertiary">
              reproducible hermetic builds
            </span>{" "}
            — is genuinely important infrastructure work.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
