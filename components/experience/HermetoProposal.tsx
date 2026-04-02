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
  status = "merged",
}: {
  id: string;
  url: string;
  description: string;
  category?: string;
  status?: "merged" | "open" | "review";
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
      {status === "merged" ? (
        <span className="inline-flex items-center gap-1 text-xs text-green-400">
          <CheckCircle2 className="w-3 h-3" /> Merged
        </span>
      ) : status === "open" ? (
        <span className="inline-flex items-center gap-1 text-xs text-yellow-400">
          <Clock className="w-3 h-3" /> Open
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
              { l: "University", v: "Newton School of Technology (ADYPU)" },
              { l: "Contact", v: "+919699065624" },
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
            I have spent the last three weeks digging in. I set up the dev
            environment, ran the test suites, and mapped out exactly what this{" "}
            <Code>uv</Code> integration requires. Before this, I spent four
            months actively contributing to AsyncAPI — mostly handling
            maintenance, bug fixes, and PR reviews. That experience taught me
            how to jump into an established codebase, understand the existing
            patterns, and get to work.
          </p>
          <p>
            At its core, Konflux is about software supply chain security.
            Because the <Code>uv.lock</Code> format records each dependency with
            its source, version, and SHA256 checksum for every wheel and sdist,
            it is actually a perfect fit for secure, deterministic builds. Adding
            native support for it is not just about keeping up with a new tool —
            it directly strengthens Hermeto&apos;s main mission.
          </p>
        </motion.div>

        <Divider />

        {/* ── Understanding the Problem ─────────────────────── */}
        <SectionTitle id="understanding">
          Understanding the Problem
        </SectionTitle>

        <motion.div {...fade} className="text-gray-300 text-[15px] leading-relaxed space-y-4">
          {/* AI note */}
          <div className="p-4 rounded-lg bg-accent-tertiary/[0.05] border border-accent-tertiary/10 text-sm text-gray-400 space-y-2">
            <p>
              <span className="text-accent-tertiary font-medium">
                AI Transparency:
              </span>{" "}
              Hermeto has a clear AI Contribution Policy, so I want to be
              completely transparent about my workflow. I used AI to help me
              quickly navigate the codebase, get up to speed on unfamiliar Python
              patterns, and map out the broader uv ecosystem.
            </p>
            <p>
              However, I did not just generate answers. I manually verified every
              technical conclusion, architectural mapping, and implementation
              step outlined below through my own code inspection and local
              testing. I fully understand the architecture I am proposing, and I
              am ready to explain and defend all of it.
            </p>
          </div>

          <h3 className="text-lg font-semibold text-white pt-4">
            What Hermeto Actually Does
          </h3>
          <p>
            Hermeto works in two steps. First, <Code>fetch‑deps</Code> reads a
            project&apos;s lockfile, downloads every listed dependency, verifies
            checksums, and stores everything in a flat output directory
            (<Code>deps/&lt;pm&gt;/</Code>) alongside a CycloneDX SBOM
            (<Code>bom.json</Code>). Second, <Code>generate‑env</Code> and{" "}
            <Code>inject‑files</Code> configure the build environment so the
            package manager uses the local cache instead of the internet. The
            actual build then runs with zero network access.
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
            This is something I spent time looking into beyond just the idea
            description.
          </p>
          <p>
            Yes, <Code>uv</Code> is backwards‑compatible with pip. You can run{" "}
            <Code>uv pip install -r requirements.txt</Code> and it works. The
            mentors explicitly called this out in the project description — that
            is NOT the native way. <Code>uv</Code> has its own workflow based on{" "}
            <Code>uv lock</Code> and <Code>uv sync</Code>, and it produces its
            own lockfile: <Code>uv.lock</Code>.
          </p>
          <p>
            The <Code>uv.lock</Code> format is very different from pip&apos;s{" "}
            <Code>requirements.txt</Code>. It is a TOML file that records each
            dependency with its name, version, source registry, and inline
            sdist/wheel entries — each containing the full download URL and
            SHA256 hash. It also tracks dependency markers for different
            platforms. The pip backend&apos;s <Code>requirements.py</Code> parser
            will not work for this — a new parser is needed.
          </p>

          <h3 className="text-lg font-semibold text-white pt-6">
            What I Know About the Technical Challenges
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

          <p>
            So instead of dumping everything I have learned about{" "}
            <Code>uv.lock</Code> internals, here is what I see as the key
            challenges and how I would approach them:
          </p>

          {/* Challenges — expanded */}
          <div className="space-y-8 mt-6">
            {/* 1. Parsing uv.lock */}
            <div>
              <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-2">
                <ChevronRight className="w-3.5 h-3.5 text-accent-primary" />
                1. Parsing uv.lock
              </h4>
              <div className="pl-5.5 space-y-3 text-sm text-gray-400 leading-relaxed">
                <p>
                  The <Code>uv.lock</Code> file is valid TOML, so Python&apos;s{" "}
                  <Code>tomllib</Code> can parse it. The challenge is not the
                  format but the schema — understanding how packages, sources,
                  wheels, and markers are structured inside the file. Here is a
                  simplified snippet of what a <Code>uv.lock</Code> entry looks
                  like:
                </p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/proposal/Screenshot 2026-04-02 at 11.06.53 PM.png"
                  alt="uv.lock code snippet"
                  className="rounded-lg border border-white/[0.06] w-full max-w-xl"
                />
                <p>
                  The file starts with a header: <Code>version = 1</Code>,{" "}
                  <Code>revision = 3</Code>, and <Code>requires-python</Code>.
                  Each <Code>[[package]]</Code> section has name, version,
                  source, dependencies, and inline sdist and wheels entries —
                  each wheel contains its full PyPI download URL and SHA256 hash.
                  The parser would need to walk through these entries, build a
                  list of what to download, and verify checksums. I also want to
                  follow the patterns of Hermeto&apos;s existing parsers
                  (<Code>requirements.py</Code> for pip,{" "}
                  <Code>yarn/</Code> backend for <Code>yarn.lock</Code>).
                </p>
                <p>
                  I plan to start with simple single-package projects and work up
                  to more complex cases during the research phase.
                </p>
              </div>
            </div>

            {/* 2. Download URL Resolution */}
            <div>
              <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-2">
                <ChevronRight className="w-3.5 h-3.5 text-accent-primary" />
                2. Download URL Resolution
              </h4>
              <div className="pl-5.5 space-y-3 text-sm text-gray-400 leading-relaxed">
                <p>
                  From looking at real <Code>uv.lock</Code> files, the lockfile
                  already contains full download URLs for each wheel and sdist.
                  This means the backend does not need to query the PyPI simple
                  API at fetch time — it can download directly from the URLs in
                  the lockfile. The pip backend already handles PyPI downloads
                  through <Code>http_requests.py</Code> — I would reuse that
                  infrastructure rather than writing something from scratch.
                </p>
                <p>
                  The source registry field tells us where the package came from
                  originally, but the actual download URLs are baked into the
                  sdist and wheels entries. This simplifies the fetching logic
                  compared to pip where download URLs need to be resolved
                  separately.
                </p>
              </div>
            </div>

            {/* 3. Security */}
            <div>
              <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-2">
                <ChevronRight className="w-3.5 h-3.5 text-accent-primary" />
                3. Security: No Arbitrary Code Execution
              </h4>
              <div className="pl-5.5 space-y-3 text-sm text-gray-400 leading-relaxed">
                <p>
                  This is a core Hermeto rule. From what I have read,{" "}
                  <Code>uv</Code> does not run <Code>setup.py</Code> during
                  resolution — it reads metadata statically. That would align
                  with Hermeto&apos;s security model. But I have not fully verified
                  this yet and it is one of the first things I need to confirm
                  during the research phase.
                </p>
                <p>
                  This is important enough that I would want to trace through{" "}
                  <Code>uv</Code>&apos;s actual source code during the research phase
                  rather than just trusting what the documentation says. The
                  mentors specifically listed &ldquo;inspecting uv&apos;s internals to
                  verify whether there&apos;s a potential arbitrary code execution
                  path&rdquo; as an expectation, so this cannot be hand-waved.
                </p>
              </div>
            </div>

            {/* 4. SBOM Integration */}
            <div>
              <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-2">
                <ChevronRight className="w-3.5 h-3.5 text-accent-primary" />
                4. SBOM Integration
              </h4>
              <div className="pl-5.5 space-y-3 text-sm text-gray-400 leading-relaxed">
                <p>
                  Each fetched package needs to become a CycloneDX component in
                  the SBOM. The pip backend already maps Python packages to{" "}
                  <Code>pkg:pypi/</Code> PURLs through <Code>sbom.py</Code>. The{" "}
                  <Code>uv</Code> backend would produce the same PURL entries —
                  the packages come from the same ecosystem (PyPI), just resolved
                  through a different tool.
                </p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/proposal/Screenshot 2026-04-02 at 11.07.13 PM.png"
                  alt="PURL output example"
                  className="rounded-lg border border-white/[0.06] w-full max-w-xl"
                />
                <p>
                  These follow the same <Code>pkg:pypi/</Code> format Hermeto
                  already generates for pip packages (I verified this in the test
                  suite at{" "}
                  <Code>tests/unit/package_managers/pip/test_main.py</Code>). The
                  tricky part is ensuring metadata accuracy for packages with
                  non-PyPI sources — git dependencies and direct URLs need
                  special PURL qualifiers.
                </p>
                <p>
                  Also, since the <Code>uv</Code> backend would launch as
                  experimental (<Code>x-uv</Code>), the SBOM needs to include
                  the experimental backend annotations. From the design template,
                  experimental backends mark their components with annotations
                  like <Code>hermeto:backend:experimental:x-uv</Code>. This
                  needs to be wired up from the start.
                </p>
              </div>
            </div>

            {/* 5. Build Environment */}
            <div>
              <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-2">
                <ChevronRight className="w-3.5 h-3.5 text-accent-primary" />
                5. Build Environment Configuration
              </h4>
              <div className="pl-5.5 space-y-3 text-sm text-gray-400 leading-relaxed">
                <p>
                  After fetching, Hermeto needs to tell <Code>uv</Code> to use
                  the cached dependencies instead of the network. <Code>uv</Code>{" "}
                  has environment variables for cache directory and offline mode
                  that should work for this. I still need to dig into the exact
                  configuration during the research phase.
                </p>
                <p>
                  The key question is whether <Code>uv sync</Code> can be
                  pointed entirely at a local cache with no network fallback. If
                  it can, the <Code>generate-env</Code> step just needs to emit
                  the right env vars. If not, there may be config files that need
                  to be injected. This is one of those things that is easier to
                  figure out by testing locally than by reading docs.
                </p>
                <p>
                  <span className="text-white font-medium">A note on output directory structure:</span>{" "}
                  Hermeto&apos;s <Code>fetch-deps</Code> typically downloads wheels
                  and sdists into a flat output directory (e.g.{" "}
                  <Code>deps/pip/</Code> for pip, <Code>deps/npm/</Code> for
                  npm). <Code>uv</Code>, on the other hand, has a highly
                  specific, complex internal cache structure
                  (<Code>UV_CACHE_DIR</Code>). A key research deliverable is
                  figuring out how to feed Hermeto&apos;s flat downloaded files into{" "}
                  <Code>uv sync --offline</Code>. I will investigate whether to
                  construct a local index (<Code>--find-links</Code> or a local
                  file URI index) or if <Code>uv</Code> exposes a way to
                  directly consume flat files without its internal cache layout.
                  This is a friction point the design document will need to solve
                  before any implementation starts.
                </p>
              </div>
            </div>
          </div>

          {/* Edge cases */}
          <div className="mt-6 p-4 rounded-lg bg-white/[0.02] border border-white/[0.04]">
            <p className="text-sm font-medium text-white mb-2">
              6. Edge Cases I Am Watching For
            </p>
            <ul className="space-y-1.5 text-sm text-gray-400">
              {[
                "Git dependencies in uv.lock — these are not PyPI packages and need different fetching logic",
                "Platform-specific wheel selection — uv.lock records wheels for multiple platforms; Hermeto needs to decide which to fetch",
                "Source distributions without pre-built wheels — these might require a build step, which conflicts with the no-arbitrary-code rule",
                "Workspace/monorepo support — uv supports workspaces with multiple packages; the lockfile structure gets more complex",
              ].map((e, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-accent-secondary mt-1.5 shrink-0">•</span>
                  {e}
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-400 mt-3">
              The <Code>uv.lock</Code> format is not formally specified as a
              stable API yet — Astral moves exceptionally fast and the format is
              still evolving.{" "}
              <span className="text-white font-medium">Mitigation:</span> I will
              design the parser to explicitly check the{" "}
              <Code>version</Code> field in the lockfile header (currently{" "}
              <Code>version = 1</Code>). If Astral introduces a breaking
              lockfile change, Hermeto should gracefully fail or alert the user
              rather than silently producing incorrect results.
            </p>
            <p className="text-sm text-gray-400 mt-3">
              Some details will be refined during the research and design phase.
              I have identified the key questions and will work with mentors to
              resolve them early.
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
            The expected deliverables from the project description are clear:
            research, design document, implementation, SBOM integration, tests,
            and documentation. Here is how I plan to sequence them.
          </p>

          <div className="space-y-3 mt-6">
            <TimelineItem
              phase="A"
              weeks="Bonding + Wk 1–2"
              title="Research & Design Document"
              detail="Design doc via docs/design/package-manager-template.md. Submitted as PR, iterate on Erik and Alexey's feedback. Also: set up local test environments, study pip backend, inspect uv.lock for different project types."
            />
            <TimelineItem
              phase="B1"
              weeks="Wk 3–4"
              title="Lockfile Parser"
              detail="Create hermeto/core/package_managers/uv/ module. Write the uv.lock parser that extracts dependency names, versions, sources, and checksums. Unit tests with various lockfile shapes."
            />
            <TimelineItem
              phase="B2"
              weeks="Wk 4–5"
              title="Fetch Pipeline"
              detail="Implement fetch_uv_source(). Download via http_requests.py, checksum verification against lockfile hashes. Register as x-uv in resolver with experimental prefix."
            />
            <TimelineItem
              phase="B3"
              weeks="Wk 5–6"
              title="SBOM Integration"
              detail="Map uv metadata to CycloneDX components. Generate accurate pkg:pypi/ PURLs. Experimental backend annotations in SBOM."
            />
            <TimelineItem
              phase="B4"
              weeks="Wk 6–7"
              title="Build Environment"
              detail="Implement generate-env support — emit the right environment variables for offline uv usage. Implement inject-files support — write any config files uv needs."
            />
            <TimelineItem
              phase="MID"
              weeks="Wk 7"
              title="Midterm: End-to-end Demo"
              detail='hermeto fetch-deps &apos;{"type": "x-uv"}&apos; works end-to-end — reads lockfile, downloads, verifies checksums, generates SBOM, offline build works.'
              highlight
            />
            <TimelineItem
              phase="C1"
              weeks="Wk 8–9"
              title="Integration Tests"
              detail='Containerized e2e tests in tests/integration/ with real uv projects. Alexey confirmed in #1396 these are expected and "rather straightforward" to add.'
            />
            <TimelineItem
              phase="C2"
              weeks="Wk 9–10"
              title="Documentation"
              detail="User-facing docs page in docs/ — prerequisites, example usage, known limitations."
            />
            <TimelineItem
              phase="C3"
              weeks="Wk 10–12"
              title="Hardening & Stretch Goals"
              detail="Handle edge cases surfaced during testing. Possible graduation from x-uv to uv if mentors approve. Stretch goals TBD based on progress."
            />
          </div>

          <p className="text-sm text-gray-500 mt-4">
            These targets may be adjusted based on design reviews or upstream{" "}
            <Code>uv</Code> changes, and I will communicate any updates early
            with mentors. I will be available 25–30 hours per week throughout the
            program.
          </p>
        </motion.div>

        <Divider />

        {/* ── Previous Contributions ────────────────────────── */}
        <SectionTitle id="contributions">
          Previous Contributions
        </SectionTitle>

        <motion.div {...fade}>
          <p className="text-gray-400 text-sm mb-6">
            The Hermeto GSoC guide says one merged PR is the bar. I have that,
            but I also want to show the four months of open source work I did
            before Hermeto.
          </p>
          <p className="text-gray-500 text-xs mb-8 italic">
            Note: I&apos;ll continue to add contributions here until GSoC
            selection to become more familiar with the codebase.
          </p>

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
                    description="Replaced fragile automatic test-exclusion logic with standard pytest -k filtering, closing mentor-opened issue."
                    status="merged"
                  />
                </tbody>
              </table>
            </div>
            <p className="text-gray-500 text-sm mt-3">
              That PR required understanding how the integration test
              infrastructure actually worked — not just where tests live, but why
              the exclusion logic existed in the first place and why the simpler
              approach was safe. It was not glamorous work, but it was the kind
              of work that makes the test suite easier to maintain going forward.
            </p>
          </div>

          {/* AsyncAPI */}
          <div>
            <div className="flex items-baseline gap-3 mb-2">
              <h3 className="text-lg font-semibold text-white">AsyncAPI</h3>
              <span className="text-xs text-gray-600">
                4 months before switching orgs
              </span>
            </div>
            <p className="text-gray-500 text-sm mb-4">
              I was contributing to AsyncAPI for about four months before they
              got rejected from GSoC 2026. Mostly maintenance stuff.
            </p>
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
                  <PRRow id="#4781" url="https://github.com/asyncapi/website/pull/4781" description="Removed deprecated scripts from the repo" category="Refactoring" status="merged" />
                  <PRRow id="#4997" url="https://github.com/asyncapi/website/pull/4997" description="Cleaned up unused dependencies from package.json" category="Refactoring" status="open" />
                  <PRRow id="#4804" url="https://github.com/asyncapi/website/pull/4804" description="Fixed react-hooks/exhaustive-deps warnings across the codebase" category="Refactoring" status="open" />
                  <PRRow id="#5014" url="https://github.com/asyncapi/website/pull/5014" description="Replaced Moment.js with Day.js — ~90% bundle reduction" category="Infrastructure" status="merged" />
                  <PRRow id="#4710" url="https://github.com/asyncapi/website/pull/4710" description="Fixed background scrolling bug on Roadmap modal" category="Bug Fix" status="merged" />
                  <PRRow id="#4585" url="https://github.com/asyncapi/website/pull/4585" description="Fixed broken links in git-workflow.md" category="Bug Fix" status="merged" />
                  <PRRow id="#4600" url="https://github.com/asyncapi/website/pull/4600" description="Fixed broken community links in contributor docs" category="Bug Fix" status="merged" />
                  <PRRow id="#4988" url="https://github.com/asyncapi/website/pull/4988" description="Reviewed and tested Navbar Chevron UI fix" category="Review" status="review" />
                  <PRRow id="#4808" url="https://github.com/asyncapi/website/pull/4808" description="Verified Algolia search language sync logic" category="Review" status="review" />
                  <PRRow id="#4893" url="https://github.com/asyncapi/website/pull/4893" description="Helped a contributor understand codebase logic" category="Review" status="review" />
                </tbody>
              </table>
            </div>
            <p className="text-gray-500 text-sm mt-3 italic">
              None of this was glamorous — and that was kind of the point.
            </p>
            {/* Add Open status indicator */}
            <p className="text-gray-600 text-xs mt-2">
              Some PRs are still open — AsyncAPI was rejected from GSoC 2026, so
              I switched orgs before they all got merged.
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
            There is also a secondary benefit. The pip backend is older and more
            complex. A clean <Code>uv</Code> backend gives future contributors a
            better reference if they ever need to add support for Poetry, PDM, or
            whatever comes next. And the design document itself is useful even if
            the code takes longer than expected — right now there is no
            written-down analysis of how <Code>uv</Code> should integrate with
            Hermeto.
          </p>
        </motion.div>

        <Divider />

        {/* ── About Me ──────────────────────────────────────── */}
        <SectionTitle id="about-me">About Me</SectionTitle>
        <motion.div {...fade} className="text-gray-300 text-[15px] leading-relaxed space-y-4">
          <p>
            I am a 2nd year student at Newton School of Technology (ADYPU). I
            have experience in Python, TypeScript (React, Next.js, Node.js), and
            I am comfortable working across both ecosystems. Hermeto&apos;s
            codebase aligns well with my experience, and I can easily follow its
            patterns.
          </p>
          <p>
            I&apos;m also part of my college&apos;s Student Developer Club where I help
            organize meets, hackathons, and work on projects with others. A lot
            of it is coordination — less about code and more about making sure
            things actually get done.
          </p>

          <p className="text-gray-400 text-sm mt-2">A few projects I built outside of open source:</p>
          {/* Projects — simple inline links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            {[
              { name: "SiliconSage", desc: "PC building assistant. Next.js + TypeScript frontend, FastAPI + Scikit-Learn backend for ML predictions.", url: "https://github.com/sammy200-ui/SiliconSage" },
              { name: "SpecterScan", desc: "AI-powered legal contract analyzer for flagging document risks. React, TypeScript, FastAPI, Python, Scikit-Learn.", url: "https://github.com/sammy200-ui/SpecterScan" },
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
        <SectionTitle id="availability">Availability & Commitments</SectionTitle>
        <motion.div {...fade} className="text-gray-300 text-[15px] leading-relaxed space-y-4">
          <p>
            My college has an internship period from June to December. If I get
            selected for GSoC, that becomes my internship — no classes, no exams,
            no conflicts for the entire coding period.
          </p>
          <p>
            I can put in{" "}
            <span className="text-white font-medium">25–30 hours a week</span>.
            Timezone is IST (UTC+5:30). I usually work during the day but I am
            flexible. Happy to do async (GitHub, email) or sync calls with Erik
            and Alexey, whatever works better for them.
          </p>
        </motion.div>

        <Divider />

        {/* ── Post GSoC ─────────────────────────────────────── */}
        <SectionTitle id="post-gsoc">Post GSoC</SectionTitle>
        <motion.div {...fade} className="text-gray-300 text-[15px] leading-relaxed space-y-4 mb-8">
          <p>
            Honestly, the <Code>x-uv</Code> backend shipping is not the end of
            the work — it&apos;s the beginning of it. Astral moves fast,{" "}
            <Code>uv.lock</Code> will keep changing, and whoever maintains the
            parser needs to already understand why certain edge cases were
            handled the way they were. I will have that context. It would be
            wasteful to just walk away.
          </p>
          <p>
            The graduation path from <Code>x-uv</Code> to a stable{" "}
            <Code>uv</Code> backend is also something I want to see through
            personally. Shipping it experimental and then handing it off to
            someone else to graduate feels like leaving halfway.
          </p>
          <p>
            And beyond just the <Code>uv</Code> work, I have spent enough time
            in the Hermeto codebase now to care about it. The problem it
            solves is real, the mentors actually engage with contributors, and
            there is still meaningful work to do here after GSoC.{" "}
            <span className="text-accent-tertiary">
              That&apos;s rare enough that I&apos;m not going to take it for granted.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
