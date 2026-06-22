import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy — OrderJi",
  description: "Understand OrderJi's refund and cancellation terms for all subscription plans.",
};

const SECTIONS = [
  {
    title: "1. Overview",
    body: `This Refund & Cancellation Policy outlines the terms under which OrderJi processes cancellations and refund requests for its subscription-based restaurant management platform. We aim to be fair and transparent. Please read this policy carefully before subscribing.`,
  },
  {
    title: "2. Free Trial Period",
    body: `All OrderJi plans include a complimentary trial period as communicated during sign-up. During this period, you can explore the full features of your selected plan at no charge. No payment is required until the trial ends. You may cancel at any time during the trial without incurring any charges.`,
  },
  {
    title: "3. Cancellation Policy",
    body: `You may cancel your OrderJi subscription at any time from your account dashboard or by contacting us at support@ordrji.com. Upon cancellation: (a) Monthly plans — your subscription will remain active until the end of the current billing period. No further charges will be made. (b) Annual plans — your subscription will remain active until the end of the current annual term. You will not be charged for the next renewal cycle.`,
  },
  {
    title: "4. Refund Eligibility",
    body: `Refunds are considered under the following circumstances: (a) Technical failure — if OrderJi is completely inaccessible due to a platform-side technical failure for more than 72 consecutive hours, you may be eligible for a prorated refund for the affected period. (b) Duplicate charges — if you are charged more than once for the same billing cycle, the duplicate charge will be refunded in full within 7 business days. (c) Annual plan — if you cancel an annual subscription within 7 days of your initial payment (not applicable to renewals), you are eligible for a full refund.`,
  },
  {
    title: "5. Non-Refundable Circumstances",
    body: `Refunds will not be issued in the following situations: (a) Partial use of a monthly subscription period after cancellation; (b) Annual subscriptions cancelled after the 7-day window has passed; (c) Cancellations due to dissatisfaction with features that were available and clearly described at the time of subscription; (d) Accounts suspended or terminated due to violation of our Terms & Conditions; (e) Third-party integration fees or hardware costs, if any.`,
  },
  {
    title: "6. How to Request a Refund",
    body: `To request a refund, please email us at billing@ordrji.com with your registered email address, order/invoice number, the reason for your request, and any supporting documentation. All refund requests must be submitted within 30 days of the charge in question. We will acknowledge your request within 2 business days and process eligible refunds within 7–10 business days.`,
  },
  {
    title: "7. Refund Method",
    body: `Approved refunds will be credited to the original payment method (UPI, credit/debit card, net banking, or bank transfer). Processing times may vary depending on your bank or payment provider — typically 5–7 business days after we initiate the refund. OrderJi is not responsible for delays caused by your financial institution.`,
  },
  {
    title: "8. Plan Downgrades",
    body: `If you downgrade your subscription to a lower-tier plan mid-cycle, the change will take effect at the start of your next billing period. No prorated refund will be issued for the unused portion of the current period at the higher tier, unless otherwise agreed in writing.`,
  },
  {
    title: "9. Enterprise Plans",
    body: `Cancellation and refund terms for Enterprise plans are governed by the specific contract agreed upon at the time of onboarding. Please refer to your enterprise agreement or contact your dedicated account manager for details.`,
  },
  {
    title: "10. Changes to This Policy",
    body: `OrderJi reserves the right to modify this Refund & Cancellation Policy at any time. Changes will be communicated via email or in-app notification at least 15 days before they take effect. Continued use of the Service after such notice constitutes acceptance of the updated policy.`,
  },
  {
    title: "11. Contact",
    body: `For any refund, cancellation, or billing-related queries, please contact us at billing@ordrji.com or call +91 98765 43210 (Monday–Friday, 9 AM–6 PM IST). For general support, visit our Help Centre or email support@ordrji.com.`,
  },
];

export default function RefundCancellationPage() {
  return (
    <LegalPage
      badge="Policy"
      title="Refund & Cancellation"
      subtitle="Clear, fair terms for cancellations and refund requests across all OrderJi plans."
      lastUpdated="June 1, 2025"
      sections={SECTIONS}
    />
  );
}
