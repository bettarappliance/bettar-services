"use client";
import { useEffect } from "react";

export default function JobberRequestEmbed() {
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js";
    s.setAttribute("clienthub_id","0f5093bd-8f11-4a84-b7b1-c71eecb81317-1652150");
    s.setAttribute("form_url","https://clienthub.getjobber.com/client_hubs/0f5093bd-8f11-4a84-b7b1-c71eecb81317/public/work_request/embedded_work_request_form?form_id=1652150");
    document.body.appendChild(s);
    return () => { document.body.removeChild(s); };
  }, []);

  return (
    <>
      <section className="py-10 bg-[#F4F7FF]">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
            Request a <span className="text-[#002D72]">Service</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Fill out the form below and our team will reach out to confirm your booking. 
            We&apos;re here to help with all your home service needs.
          </p>
        </div>
      </section>
      
      <section className="py-12 bg-gray-50">
        <link
          rel="stylesheet"
          href="https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.css"
          media="screen"
        />
        <div id="0f5093bd-8f11-4a84-b7b1-c71eecb81317-1652150" />
      </section>
    </>
  );
}
