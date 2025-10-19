"use client";

import Image from "next/image";
import Link from "next/link";
import JobberRequestEmbed from "../../components/JobberRequestEmbed";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function RequestService() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Jobber Request Form */}
      <JobberRequestEmbed />

      <Footer />
    </div>
  );
}
