"use client";
import { useEffect } from "react";

export default function ApplianceRequestEmbed() {
  useEffect(() => {
    const containerId = "0f5093bd-8f11-4a84-b7b1-c71eecb81317-2104262";
    
    // Check if script already exists
    const existingScript = document.querySelector(
      `script[clienthub_id="${containerId}"]`
    );
    if (existingScript) {
      return;
    }

    const s = document.createElement("script");
    s.src = "https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js";
    s.setAttribute("clienthub_id", containerId);
    s.setAttribute("form_url","https://clienthub.getjobber.com/client_hubs/0f5093bd-8f11-4a84-b7b1-c71eecb81317/public/work_request/embedded_work_request_form?form_id=2104262");
    document.body.appendChild(s);
    
    return () => { 
      if (document.body.contains(s)) {
        document.body.removeChild(s); 
      }
    };
  }, []);

  return (
    <>
      <section className="py-12 bg-[#F4F7FF]">
        <link
          rel="stylesheet"
          href="https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.css"
          media="screen"
        />
        <div className="max-w-7xl mx-auto px-6">
          <div id="0f5093bd-8f11-4a84-b7b1-c71eecb81317-2104262" />
        </div>
      </section>
    </>
  );
}












