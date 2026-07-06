import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — OrderJi",
  description: "Learn how OrderJi collects, uses, and protects your personal information.",
};

const SECTIONS = [
  {
    title: "1. Introduction",
    body: `OrderJi ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our restaurant management platform and related services. By using OrderJi, you consent to the practices described in this policy.`,
  },
  {
    title: "2. Information We Collect",
    body: `We collect information you provide directly to us, including: account registration details (name, email, phone, business name); payment information processed securely through third-party gateways; restaurant operational data (menu items, orders, inventory); customer data you upload (guest profiles, loyalty records); and support correspondence. We also automatically collect usage data, device information, IP addresses, and cookies when you use the platform.`,
  },
  {
    title: "3. How We Use Your Information",
    body: `We use the information we collect to: provide, maintain, and improve the Service; process transactions and send related communications; send operational notifications, updates, and support messages; analyze usage patterns to enhance platform performance; comply with legal obligations; and prevent fraud and ensure security. We do not sell your personal information to third parties.`,
  },
  {
    title: "4. Data Sharing",
    body: `We may share your information with: (a) service providers who assist in operating our platform (e.g., payment processors, cloud infrastructure, email delivery) under strict confidentiality agreements; (b) business partners with your explicit consent; (c) law enforcement or regulatory authorities when required by applicable law; (d) successors in the event of a merger, acquisition, or sale of assets, with advance notice to you.`,
  },
  {
    title: "5. Data Retention",
    body: `We retain your personal information for as long as your account is active or as needed to provide the Service. You may request deletion of your account and associated data at any time by contacting us at privacy@ordrji.com. We may retain certain information as required by law or for legitimate business purposes, such as fraud prevention.`,
  },
  {
    title: "6. Security",
    body: `We implement commercially reasonable administrative, technical, and physical safeguards to protect your information, including encryption in transit and at rest, role-based access controls, and regular security audits. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    title: "7. Cookies & Tracking",
    body: `We use cookies and similar tracking technologies to enhance your experience on our platform. These include essential cookies required for platform functionality, analytics cookies to understand usage, and preference cookies to remember your settings. You can control cookie settings through your browser, though disabling certain cookies may affect platform functionality.`,
  },
  {
    title: "8. Your Rights",
    body: `Depending on your location, you may have the right to: access the personal information we hold about you; correct inaccurate information; request deletion of your information; object to or restrict certain processing; and data portability. To exercise these rights, please contact us at privacy@ordrji.com. We will respond within 30 days.`,
  },
  {
    title: "9. Children's Privacy",
    body: `The OrderJi Service is not intended for individuals under the age of 18. We do not knowingly collect personal information from minors. If we become aware that we have inadvertently collected such information, we will take steps to delete it promptly.`,
  },
  {
    title: "10. Third-Party Links",
    body: `Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review the privacy policies of any external sites you visit.`,
  },
  {
    title: "11. Changes to This Policy",
    body: `We may update this Privacy Policy periodically. We will notify you of significant changes by email or through an in-app notice at least 14 days before the changes take effect. Your continued use of the Service after such notice constitutes your acceptance of the updated policy.`,
  },
  {
    title: "12. Contact Us",
    body: `If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact our Data Protection team at privacy@ordrji.com or write to OrderJi, 414, 4th Floor, Daga Plazzo Biyani Square, opp. Dmart Camp, Amravati, Maharashtra 444602.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      badge="Legal"
      title="Privacy Policy"
      subtitle="We take your privacy seriously. Here's how we handle your data."
      lastUpdated="June 1, 2025"
      sections={SECTIONS}
    />
  );
}
