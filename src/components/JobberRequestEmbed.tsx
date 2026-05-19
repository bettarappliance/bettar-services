"use client";
import { useEffect } from "react";

const JOBBER_SCRIPT_SRC =
  "https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js";
const JOBBER_CLIENTHUB_ID = "0f5093bd-8f11-4a84-b7b1-c71eecb81317-1652150";
const JOBBER_FORM_URL =
  "https://clienthub.getjobber.com/client_hubs/0f5093bd-8f11-4a84-b7b1-c71eecb81317/public/work_request/embedded_work_request_form?form_id=1652150";

export default function JobberRequestEmbed() {
  useEffect(() => {
    // Guard against double-injection from React Strict Mode (dev) or HMR.
    // Jobber's script mutates the DOM; running it twice produces a broken form.
    if (document.querySelector(`script[src="${JOBBER_SCRIPT_SRC}"]`)) return;

    const s = document.createElement("script");
    s.src = JOBBER_SCRIPT_SRC;
    s.setAttribute("clienthub_id", JOBBER_CLIENTHUB_ID);
    s.setAttribute("form_url", JOBBER_FORM_URL);
    s.async = true;
    document.body.appendChild(s);

    // Intentionally NO cleanup: removing the script tag does not undo the DOM
    // Jobber injected, and unmount/remount cycles in dev leave the form in a
    // broken state. Letting the script persist is safe — the guard above
    // prevents duplicate loads.
  }, []);

  return (
    <>
      <section className="py-10 bg-[#F4F7FF]">
        <div className="max-w-7xl mx-auto text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
            Request a <span className="text-[#002D72]">Service</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Fill out the form below and our team will reach out to confirm your
            booking. We&apos;re here to help with all your home service needs.
          </p>
        </div>
      </section>

      <section className="py-12 bg-[#F4F7FF]">
        <link
          rel="stylesheet"
          href="https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.css"
          media="screen"
        />
        <div className="max-w-4xl mx-auto px-4">
          <div id={JOBBER_CLIENTHUB_ID} />
        </div>
      </section>
    </>
  );
}
