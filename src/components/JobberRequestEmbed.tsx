"use client";
import { useEffect } from "react";
import DiagnosticFeeNotice from "./DiagnosticFeeNotice";

const JOBBER_SCRIPT_SRC =
  "https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js";
const JOBBER_CLIENTHUB_ID = "0f5093bd-8f11-4a84-b7b1-c71eecb81317-1652150";
const JOBBER_FORM_URL =
  "https://clienthub.getjobber.com/client_hubs/0f5093bd-8f11-4a84-b7b1-c71eecb81317/public/work_request/embedded_work_request_form?form_id=1652150";

export default function JobberRequestEmbed() {
  useEffect(() => {
    // Each Jobber form uses the same script URL. Match this form's container,
    // so an appliance inquiry script cannot block the repair form.
    const container = document.getElementById(JOBBER_CLIENTHUB_ID);
    if (!container) return;

    const s = document.createElement("script");
    s.src = JOBBER_SCRIPT_SRC;
    s.setAttribute("clienthub_id", JOBBER_CLIENTHUB_ID);
    s.setAttribute("form_url", JOBBER_FORM_URL);
    s.async = true;
    document.body.appendChild(s);

    // A new page mount has a new, empty container and must run the embed again.
    // Remove only the script owned by this mount.
    return () => {
      s.remove();
    };
  }, []);

  return (
    <>
      <section className="py-10 bg-[#F4F7FF]">
        <div className="max-w-7xl mx-auto text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
            Request <span className="text-[#002D72]">Appliance Repair</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Tell us which appliance needs attention, what is happening, and your
            preferred availability. Our team will contact you to confirm the
            service appointment.
          </p>
          <DiagnosticFeeNotice className="max-w-2xl mx-auto text-left" />
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
          <div className="mt-6 rounded-xl border border-[#002D72]/20 bg-white p-5 text-center text-gray-700">
            <p>Having trouble with the form?</p>
            <div className="mt-3 flex flex-wrap justify-center gap-4">
              <a href={JOBBER_FORM_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#002D72] underline underline-offset-4">
                Open the request form in a new tab
              </a>
              <a href="tel:301-949-2500" className="font-semibold text-[#002D72] underline underline-offset-4">
                Call 301-949-2500
              </a>
            </div>
            <p className="mt-3 text-sm">A request is not a confirmed appointment. We will contact you to arrange service.</p>
          </div>
        </div>
      </section>
    </>
  );
}
