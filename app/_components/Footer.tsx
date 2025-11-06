"use client";

import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full border-t border-neutral-200 bg-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-10 md:py-12 text-center">
        <p className="text-sm text-neutral-600">
          This organization is a registered student organization of Cornell University
        </p>
        <p className="mt-2 text-sm text-neutral-700">© {year} Cornell Private Equity Club</p>

        <a
          href="https://hr.cornell.edu/about/workplace-rights/equal-education-and-employment"
          className="mt-2 inline-block text-sm underline underline-offset-4 text-[#0F1A2E] hover:opacity-80"
          target="_blank"
          rel="noopener noreferrer"
        >
          Equal Education and Employment
        </a>

        {/* Social Icons */}
        <div className="mt-5 flex items-center justify-center gap-6 text-neutral-900">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/cpec.cornell/"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition"
          >
            <FaInstagram className="w-6 h-6" />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/company/cornell-private-equity-club/"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition"
          >
            <FaLinkedin className="w-6 h-6" />
          </a>

          {/* Email */}
          <a
            href="mailto:cornellprivateequityclub@gmail.com"
            aria-label="Email"
            className="hover:opacity-70 transition"
          >
            <MdEmail className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}
