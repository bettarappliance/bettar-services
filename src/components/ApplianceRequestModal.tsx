"use client";
import { useEffect } from "react";

interface ApplianceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ApplianceRequestModal({ isOpen, onClose }: ApplianceRequestModalProps) {
  const containerId = "0f5093bd-8f11-4a84-b7b1-c71eecb81317-2104262";

  useEffect(() => {
    if (!isOpen) return;

    // Check if script already exists
    const existingScript = document.querySelector(
      `script[clienthub_id="${containerId}"]`
    );
    if (existingScript) {
      return;
    }

    // Check if container already has content
    const container = document.getElementById(containerId);
    if (container && container.children.length > 0) {
      return;
    }

    const s = document.createElement("script");
    s.src = "https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js";
    s.setAttribute("clienthub_id", containerId);
    s.setAttribute("form_url","https://clienthub.getjobber.com/client_hubs/0f5093bd-8f11-4a84-b7b1-c71eecb81317/public/work_request/embedded_work_request_form?form_id=2104262");
    s.id = "appliance-request-script";
    document.body.appendChild(s);

    return () => {
      const script = document.getElementById("appliance-request-script");
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Content */}
        <div className="p-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#002D72] mb-4">
            Request Appliance Service
          </h2>
          <p className="text-gray-600 mb-6">
            Fill out the form below and our team will reach out to confirm your appliance service request.
          </p>
          
          <link
            rel="stylesheet"
            href="https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.css"
            media="screen"
          />
          <div id={containerId} className="relative z-0" />
        </div>
      </div>
    </div>
  );
}

