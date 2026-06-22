import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us — OrderJi",
  description: "Get in touch with the OrderJi team for demos, support, or enterprise inquiries.",
};

export default function ContactPage() {
  return <ContactClient />;
}
