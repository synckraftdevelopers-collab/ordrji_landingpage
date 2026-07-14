import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us — Ordrji",
  description: "Get in touch with the Ordrji team for demos, support, or enterprise inquiries.",
};

export default function ContactPage() {
  return <ContactClient />;
}
