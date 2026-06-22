import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions — OrderJi",
  description: "Read the Terms & Conditions governing your use of the OrderJi platform.",
};

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: `By accessing or using the OrderJi platform ("Service"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not use the Service. These Terms apply to all users, including restaurant owners, managers, staff members, and any other parties who access the platform.`,
  },
  {
    title: "2. Description of Service",
    body: `OrderJi provides a cloud-based restaurant management operating system encompassing point-of-sale billing, QR-based digital ordering, kitchen display systems (KDS), inventory management, customer relationship management (CRM), marketing automation, and analytics reporting. The Service is provided on a subscription basis as described in our Pricing page.`,
  },
  {
    title: "3. Account Registration",
    body: `To use the Service, you must create an account and provide accurate, complete, and current information. You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately at support@ordrji.com of any unauthorized use of your account.`,
  },
  {
    title: "4. Subscription & Payment",
    body: `OrderJi offers Starter, Growth, Scale, and Enterprise plans billed monthly or annually. Subscription fees are charged in advance. All prices are in Indian Rupees (INR) and exclusive of applicable taxes unless stated otherwise. We reserve the right to modify pricing with 30 days' prior notice. Non-payment may result in suspension or termination of your account.`,
  },
  {
    title: "5. Acceptable Use",
    body: `You agree not to misuse the Service. Prohibited activities include: (a) violating any applicable law or regulation; (b) transmitting harmful, fraudulent, or unlawful content; (c) attempting to gain unauthorized access to our systems; (d) reverse-engineering or scraping any part of the platform; (e) using the Service to compete with OrderJi without prior written consent.`,
  },
  {
    title: "6. Data & Privacy",
    body: `Your use of the Service is also governed by our Privacy Policy. You retain ownership of all data you input into the platform ("Customer Data"). By using the Service, you grant OrderJi a limited, non-exclusive licence to process your Customer Data solely to provide and improve the Service. We implement industry-standard security measures to protect your data.`,
  },
  {
    title: "7. Intellectual Property",
    body: `All intellectual property rights in the OrderJi platform, including software, design, trademarks, and content, are owned by or licensed to OrderJi. Nothing in these Terms grants you any rights to use our trademarks, logos, or branding without prior written permission. Customer Data remains the property of the respective customer.`,
  },
  {
    title: "8. Limitation of Liability",
    body: `To the fullest extent permitted by applicable law, OrderJi shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of the Service. Our total liability shall not exceed the amounts paid by you in the three months preceding the claim.`,
  },
  {
    title: "9. Termination",
    body: `Either party may terminate the subscription at any time. Upon termination, your access to the Service will cease. You may export your Customer Data before termination. We reserve the right to terminate accounts that violate these Terms without prior notice. Refunds upon termination are governed by our Refund & Cancellation Policy.`,
  },
  {
    title: "10. Governing Law",
    body: `These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Bengaluru, Karnataka, India.`,
  },
  {
    title: "11. Changes to Terms",
    body: `We may update these Terms from time to time. We will notify you of material changes by email or via an in-app notification. Continued use of the Service after such notification constitutes your acceptance of the updated Terms. We encourage you to review these Terms periodically.`,
  },
  {
    title: "12. Contact",
    body: `If you have any questions about these Terms, please contact us at legal@ordrji.com or write to us at OrderJi, Bengaluru, Karnataka, India.`,
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      badge="Legal"
      title="Terms & Conditions"
      subtitle="Please read these terms carefully before using the OrderJi platform."
      lastUpdated="June 1, 2025"
      sections={SECTIONS}
    />
  );
}
