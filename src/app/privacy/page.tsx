import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Ordrji",
  description: "Learn how Ordrji collects, uses, and protects your personal information.",
};

const SECTIONS = [
  {
    title: "1. Introduction",
    body: (
      <div className="flex flex-col gap-4">
        <p>Ordrji respects your privacy and is committed to protecting personal data processed through our website, applications, software, devices and related services.</p>
        <p>This Privacy Policy explains how SYNCKRAFT TECHNOLOGIES PVT LTD, operating under the brand name &ldquo;Ordrji&rdquo;, collects, uses, stores, discloses and protects personal data when you interact with:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>ordrji.com and related webpages;</li>
          <li>the Ordrji restaurant POS and billing application;</li>
          <li>Ordrji web dashboards and mobile applications;</li>
          <li>QR menus and online ordering pages powered by Ordrji;</li>
          <li>KOT, kitchen display and table-ordering systems;</li>
          <li>CRM, loyalty, feedback and customer-engagement features;</li>
          <li>inventory, reporting, staff and multi-outlet modules;</li>
          <li>technical support, onboarding, installation and migration services;</li>
          <li>integrations made available through Ordrji; and</li>
          <li>any other service that links to this Privacy Policy.</li>
        </ul>
        <p>Collectively, these are called the &ldquo;Services.&rdquo;</p>
        <p>In this Privacy Policy:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>&ldquo;Ordrji,&rdquo; &ldquo;we,&rdquo; &ldquo;our&rdquo; or &ldquo;us&rdquo; means SYNCKRAFT TECHNOLOGIES PVT. LTD.</li>
          <li>&ldquo;Restaurant Customer&rdquo; means a restaurant, cafe, bakery, cake shop, cloud kitchen, QSR, food court, franchise, chain or other business subscribing to Ordrji.</li>
          <li>&ldquo;Authorised User&rdquo; means an owner, administrator, manager, cashier, waiter, kitchen employee, accountant, inventory manager or other person authorised to use a Restaurant Customer&rsquo;s account.</li>
          <li>&ldquo;End Customer&rdquo; means a person who places an order, scans a QR code, makes a payment, joins a loyalty programme, provides feedback or otherwise interacts with a Restaurant Customer through Ordrji.</li>
          <li>&ldquo;Personal data&rdquo; means information relating to an identified or identifiable individual.</li>
        </ul>
      </div>
    )
  },
  {
    title: "2. Who is responsible for your personal data?",
    body: (
      <div className="flex flex-col gap-4">
        <p>Ordrji may have different privacy roles depending on the circumstances.</p>
        
        <h3 className="font-bold text-lg mt-2">2.1 When Ordrji acts as the Data Fiduciary</h3>
        <p>Ordrji generally determines why and how personal data is processed when we collect information directly for our own purposes, including:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>website enquiries;</li>
          <li>demo requests;</li>
          <li>Restaurant Customer account creation;</li>
          <li>subscription and billing administration;</li>
          <li>sales and marketing;</li>
          <li>customer support;</li>
          <li>security monitoring;</li>
          <li>product analytics; and</li>
          <li>recruitment or vendor management.</li>
        </ul>
        <p>For such processing, Ordrji acts as the Data Fiduciary, controller or equivalent responsible entity under applicable law.</p>
        
        <h3 className="font-bold text-lg mt-2">2.2 When a Restaurant Customer is the Data Fiduciary</h3>
        <p>A Restaurant Customer generally determines why and how personal data relating to its End Customers, staff, suppliers and business operations is processed.</p>
        <p>Examples include:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>customer names and mobile numbers collected during billing;</li>
          <li>delivery addresses;</li>
          <li>order histories;</li>
          <li>customer preferences;</li>
          <li>loyalty programme information;</li>
          <li>employee profiles and shift information;</li>
          <li>restaurant invoices and transaction records;</li>
          <li>customer feedback; and</li>
          <li>marketing campaigns created by the restaurant.</li>
        </ul>
        <p>For this data, the Restaurant Customer normally acts as the Data Fiduciary or controller, and Ordrji processes the data on the Restaurant Customer&rsquo;s documented instructions as a Data Processor or service provider.</p>
        <p>End Customers or restaurant employees seeking to exercise rights relating to this data should ordinarily contact the relevant restaurant first. Ordrji will provide reasonable assistance to the Restaurant Customer as required by law and the applicable Data Processing Agreement.</p>
      </div>
    )
  },
  {
    title: "3. Personal data we collect",
    body: (
      <div className="flex flex-col gap-4">
        <p>The personal data collected depends on how you use the Services and which Ordrji modules are enabled.</p>
        
        <h3 className="font-bold text-lg mt-2">3.1 Website, enquiry and demo information</h3>
        <p>When you visit ordrji.com, request a demo, submit a contact form, communicate through WhatsApp, call us or contact our sales team, we may collect:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>name;</li>
          <li>business or restaurant name;</li>
          <li>job title or role;</li>
          <li>email address;</li>
          <li>mobile or telephone number;</li>
          <li>city, state and country;</li>
          <li>restaurant type and number of outlets;</li>
          <li>current software or POS system;</li>
          <li>preferred demo date and time;</li>
          <li>business requirements and pain points;</li>
          <li>messages, enquiries and feedback;</li>
          <li>referral source; and</li>
          <li>any information voluntarily provided by you.</li>
        </ul>
        
        <h3 className="font-bold text-lg mt-2">3.2 Restaurant Customer account information</h3>
        <p>When a Restaurant Customer creates or operates an Ordrji account, we may collect:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>legal business name and trading name;</li>
          <li>restaurant or outlet name;</li>
          <li>registered and operating addresses;</li>
          <li>owner, director or authorised representative details;</li>
          <li>email addresses and mobile numbers;</li>
          <li>GSTIN, PAN or other tax and registration information;</li>
          <li>subscription plan and account status;</li>
          <li>invoice and payment records;</li>
          <li>outlet, franchise and branch details;</li>
          <li>menu, pricing, tax and business configuration;</li>
          <li>restaurant logo, images and branding;</li>
          <li>support preferences; and</li>
          <li>contractual and onboarding records.</li>
        </ul>
        <p>We do not require government identification documents unless they are necessary for account verification, payments, legal compliance, fraud prevention or a separately disclosed feature.</p>

        <h3 className="font-bold text-lg mt-2">3.3 Authorised User and staff data</h3>
        <p>Restaurant Customers may create accounts for owners, managers, cashiers, waiters, kitchen employees and other staff. Depending on the modules enabled, we may process:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>name;</li>
          <li>mobile number or email address;</li>
          <li>employee or staff ID;</li>
          <li>account username;</li>
          <li>password hash or login PIN;</li>
          <li>role and permissions;</li>
          <li>outlet and department;</li>
          <li>login and logout information;</li>
          <li>shift opening and closing details;</li>
          <li>attendance information, where enabled;</li>
          <li>actions performed in the system;</li>
          <li>discounts, refunds, cancellations and approvals;</li>
          <li>device and session information;</li>
          <li>support communications; and</li>
          <li>audit-log records.</li>
        </ul>
        <p>Ordrji does not collect biometric information unless a separately enabled attendance or authentication module requires it and a separate notice and lawful basis are provided.</p>

        <h3 className="font-bold text-lg mt-2">3.4 End Customer and ordering information</h3>
        <p>When an End Customer places an order, uses a QR menu, requests delivery, joins a loyalty programme or provides feedback, the Restaurant Customer may collect and process through Ordrji:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>name;</li>
          <li>mobile number;</li>
          <li>email address;</li>
          <li>delivery or billing address;</li>
          <li>table number;</li>
          <li>order details;</li>
          <li>order notes and customisation requests;</li>
          <li>dietary preferences;</li>
          <li>allergy information voluntarily provided for an order;</li>
          <li>visit and purchase history;</li>
          <li>favourite or frequently purchased items;</li>
          <li>birthday or anniversary, where voluntarily provided;</li>
          <li>loyalty points, rewards, wallet balance or membership tier;</li>
          <li>coupon and referral details;</li>
          <li>feedback, ratings and complaints;</li>
          <li>communication preferences;</li>
          <li>payment status and transaction reference;</li>
          <li>delivery instructions; and</li>
          <li>records of interactions with the restaurant.</li>
        </ul>
        <p>Restaurants should not use Ordrji to collect unnecessary medical, financial, identity or other highly sensitive information.</p>

        <h3 className="font-bold text-lg mt-2">3.5 Billing, order and operational data</h3>
        <p>Ordrji may process restaurant operational records such as:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>dine-in, takeaway, pickup and delivery orders;</li>
          <li>KOT and kitchen-display information;</li>
          <li>invoices, tax records and receipts;</li>
          <li>discounts, refunds and void transactions;</li>
          <li>payment method, amount and status;</li>
          <li>table assignments and order status;</li>
          <li>item prices, variants and modifiers;</li>
          <li>inventory and stock movements;</li>
          <li>recipes and ingredient usage;</li>
          <li>supplier and purchase records;</li>
          <li>wastage and expiry records;</li>
          <li>staff activity and approvals;</li>
          <li>day-opening and day-closing records;</li>
          <li>cash-hand-over records;</li>
          <li>sales, margin and performance reports; and</li>
          <li>outlet and channel-level analytics.</li>
        </ul>
        <p>Some of this information may constitute personal data when it is linked to a customer, staff member, supplier or other identifiable individual.</p>

        <h3 className="font-bold text-lg mt-2">3.6 Payment information</h3>
        <p>When payments are enabled, Ordrji may process:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>payment amount;</li>
          <li>payment method;</li>
          <li>transaction reference or payment ID;</li>
          <li>payment status;</li>
          <li>refund information;</li>
          <li>settlement information; and</li>
          <li>limited information received from the payment service provider.</li>
        </ul>
        <p>Ordrji is not designed to collect or store your full card number, CVV, UPI PIN, online-banking password or similar payment credentials. Such credentials should be entered only into the secure interface of the relevant bank or payment service provider. Payment service providers may process personal data under their own privacy policies.</p>

        <h3 className="font-bold text-lg mt-2">3.7 Device, application and technical information</h3>
        <p>We may automatically collect technical data when a person uses the Services, including:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>IP address;</li>
          <li>browser and operating-system information;</li>
          <li>device type and device identifier;</li>
          <li>POS terminal or activated-device identifier;</li>
          <li>application version;</li>
          <li>language and time-zone settings;</li>
          <li>screen size;</li>
          <li>login and session information;</li>
          <li>page or feature usage;</li>
          <li>error, crash and diagnostic logs;</li>
          <li>API and synchronisation logs;</li>
          <li>printer status and print-error information;</li>
          <li>approximate location inferred from IP address;</li>
          <li>network and connectivity status;</li>
          <li>date and time of activity; and</li>
          <li>security-event information.</li>
        </ul>
        <p>Precise location, Bluetooth, camera, local-network or notification permissions are accessed only where required by an enabled feature and subject to device settings.</p>

        <h3 className="font-bold text-lg mt-2">3.8 Offline POS information</h3>
        <p>Ordrji may operate as an offline-first or local-first POS system. This means that certain information may be temporarily or persistently stored on an authorised restaurant device before being synchronised with Ordrji&rsquo;s cloud systems. Local information may include:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>menu and outlet settings;</li>
          <li>user and role information;</li>
          <li>customer information;</li>
          <li>orders and KOTs;</li>
          <li>invoices;</li>
          <li>payment records;</li>
          <li>printer configurations;</li>
          <li>audit logs;</li>
          <li>pending synchronisation events; and</li>
          <li>local backups.</li>
        </ul>
        <p>Restaurant Customers are responsible for maintaining appropriate physical security, user access controls, operating-system updates, antivirus protection and secure disposal or transfer of devices on which Ordrji is installed.</p>

        <h3 className="font-bold text-lg mt-2">3.9 Support, installation and migration information</h3>
        <p>When providing onboarding, installation, troubleshooting or data migration, we may receive:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>menu files and images;</li>
          <li>exports from another POS system;</li>
          <li>customer, order or inventory records;</li>
          <li>device and printer configuration;</li>
          <li>screenshots;</li>
          <li>screen-sharing or remote-support session information;</li>
          <li>chat and email communications;</li>
          <li>telephone-call recordings, where notice is provided;</li>
          <li>diagnostic files; and</li>
          <li>support-ticket history.</li>
        </ul>
        <p>We will use migrated data only to provide the requested migration and related support, subject to the Restaurant Customer&rsquo;s instructions.</p>

        <h3 className="font-bold text-lg mt-2">3.10 Information from integrations and third parties</h3>
        <p>We may receive data from:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>Restaurant Customers;</li>
          <li>payment service providers;</li>
          <li>online ordering or delivery platforms;</li>
          <li>messaging and communication providers;</li>
          <li>accounting or ERP integrations;</li>
          <li>referral or distribution partners;</li>
          <li>social-media platforms;</li>
          <li>analytics and security providers;</li>
          <li>publicly available business listings; and</li>
          <li>other services connected by the Restaurant Customer.</li>
        </ul>
        <p>The data received depends on the integration, permissions granted and the third party&rsquo;s terms.</p>

        <h3 className="font-bold text-lg mt-2">3.11 Derived, aggregated and de-identified information</h3>
        <p>We may generate information such as:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>sales trends;</li>
          <li>item popularity;</li>
          <li>customer-repeat rates;</li>
          <li>stock forecasts;</li>
          <li>order-preparation times;</li>
          <li>outlet comparisons;</li>
          <li>fraud or anomaly indicators;</li>
          <li>product usage statistics; and</li>
          <li>system-performance measurements.</li>
        </ul>
        <p>Where reasonably possible, we aggregate or de-identify information before using it for benchmarking, research, product development or service improvement.</p>
      </div>
    )
  },
  {
    title: "4. How we collect personal data",
    body: (
      <div className="flex flex-col gap-4">
        <p>We collect personal data:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>directly from you;</li>
          <li>from a Restaurant Customer;</li>
          <li>when an End Customer uses a restaurant&rsquo;s QR or ordering page;</li>
          <li>from authorised POS devices and applications;</li>
          <li>through cookies and similar technologies;</li>
          <li>from integrations selected by the Restaurant Customer;</li>
          <li>from service, referral and distribution partners;</li>
          <li>during onboarding, support and migration;</li>
          <li>from publicly available sources; and</li>
          <li>when required or permitted by law.</li>
        </ul>
      </div>
    )
  },
  {
    title: "5. How we use personal data",
    body: (
      <div className="flex flex-col gap-4">
        <p>We may use personal data to:</p>
        <h3 className="font-bold text-lg mt-2">5.1 Provide and operate the Services</h3>
        <p>This includes:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>creating and maintaining accounts;</li>
          <li>authenticating users and activating devices;</li>
          <li>processing orders, invoices, KOTs and payments;</li>
          <li>enabling QR menus and online ordering;</li>
          <li>managing tables, menus, inventory and outlets;</li>
          <li>producing reports and dashboards;</li>
          <li>providing CRM, loyalty and feedback tools;</li>
          <li>synchronising offline and cloud data;</li>
          <li>supporting integrations; and</li>
          <li>providing technical support.</li>
        </ul>

        <h3 className="font-bold text-lg mt-2">5.2 Manage our relationship with Restaurant Customers</h3>
        <p>We use information to:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>provide demonstrations;</li>
          <li>complete onboarding;</li>
          <li>manage subscriptions;</li>
          <li>issue invoices;</li>
          <li>collect fees;</li>
          <li>communicate about renewals;</li>
          <li>provide training;</li>
          <li>handle complaints and support requests; and</li>
          <li>administer contracts and service-level commitments.</li>
        </ul>

        <h3 className="font-bold text-lg mt-2">5.3 Maintain security and prevent misuse</h3>
        <p>We may process information to:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>authenticate users;</li>
          <li>control permissions;</li>
          <li>detect unauthorised access;</li>
          <li>investigate fraud or misuse;</li>
          <li>maintain audit trails;</li>
          <li>protect restaurant and End Customer data;</li>
          <li>diagnose failures;</li>
          <li>prevent duplicate or altered transactions;</li>
          <li>maintain backups; and</li>
          <li>respond to security incidents.</li>
        </ul>

        <h3 className="font-bold text-lg mt-2">5.4 Improve and develop Ordrji</h3>
        <p>We may analyse usage and feedback to:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>improve user experience;</li>
          <li>identify commonly used features;</li>
          <li>improve billing, KOT and printing reliability;</li>
          <li>develop new modules;</li>
          <li>improve performance on low-end devices;</li>
          <li>train support teams;</li>
          <li>test updates;</li>
          <li>understand restaurant workflows; and</li>
          <li>develop aggregated benchmarks and insights.</li>
        </ul>

        <h3 className="font-bold text-lg mt-2">5.5 Provide analytics and intelligent insights</h3>
        <p>Where enabled, Ordrji may analyse operational data to provide:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>sales summaries;</li>
          <li>inventory alerts;</li>
          <li>menu-performance insights;</li>
          <li>item-margin analysis;</li>
          <li>suspicious discount or cancellation alerts;</li>
          <li>customer-repeat analysis;</li>
          <li>demand forecasts;</li>
          <li>campaign suggestions; and</li>
          <li>other restaurant business insights.</li>
        </ul>
        <p>Such insights are intended as operational assistance and should be reviewed by the Restaurant Customer before business decisions are made. Unless separately disclosed and contractually authorised, Ordrji will not use Restaurant Customer or End Customer personal data to train third-party general-purpose artificial-intelligence models.</p>

        <h3 className="font-bold text-lg mt-2">5.6 Send service and marketing communications</h3>
        <p>We may send:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>account and security notifications;</li>
          <li>order or payment-related communications;</li>
          <li>product updates;</li>
          <li>support messages;</li>
          <li>renewal and billing reminders;</li>
          <li>service announcements;</li>
          <li>training information;</li>
          <li>newsletters;</li>
          <li>promotional offers; and</li>
          <li>invitations to demos or events.</li>
        </ul>
        <p>Marketing messages will be sent subject to applicable consent and communication rules. Recipients can opt out of promotional communications, although essential service messages may continue.</p>

        <h3 className="font-bold text-lg mt-2">5.7 Comply with law and protect rights</h3>
        <p>We may process information to:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>comply with tax, GST, accounting and company-law requirements;</li>
          <li>respond to lawful government or court requests;</li>
          <li>establish, exercise or defend legal claims;</li>
          <li>investigate violations of our agreements;</li>
          <li>protect the rights and safety of Ordrji, Restaurant Customers, End Customers and others; and</li>
          <li>meet regulatory and security obligations.</li>
        </ul>
      </div>
    )
  },
  {
    title: "6. Lawful grounds for processing",
    body: (
      <div className="flex flex-col gap-4">
        <p>Depending on the context and applicable law, we process personal data where:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>you have given valid consent;</li>
          <li>you requested a service or action;</li>
          <li>processing is necessary to provide contracted Services;</li>
          <li>processing is permitted as a legitimate use or other lawful use;</li>
          <li>processing is necessary to comply with legal obligations;</li>
          <li>processing is necessary to protect legal rights or prevent fraud;</li>
          <li>processing is required for security and service reliability; or</li>
          <li>we have another lawful basis recognised by applicable law.</li>
        </ul>
        <p>Where processing is based on consent, consent may be withdrawn through the available account settings or by contacting us. Withdrawal does not affect processing lawfully carried out before withdrawal.</p>
      </div>
    )
  },
  {
    title: "7. Cookies and similar technologies",
    body: (
      <div className="flex flex-col gap-4">
        <p>Ordrji may use cookies, local storage, software development kits, pixels and similar technologies.</p>
        
        <h3 className="font-bold mt-2">Essential technologies</h3>
        <p>These are required for:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>login and authentication;</li>
          <li>security;</li>
          <li>session management;</li>
          <li>remembering account settings;</li>
          <li>load balancing;</li>
          <li>fraud prevention; and</li>
          <li>core website or application operation.</li>
        </ul>

        <h3 className="font-bold mt-2">Preference technologies</h3>
        <p>These remember settings such as:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>language;</li>
          <li>location or outlet;</li>
          <li>display preferences; and</li>
          <li>previously selected options.</li>
        </ul>

        <h3 className="font-bold mt-2">Analytics technologies</h3>
        <p>These help us understand:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>website visits;</li>
          <li>feature usage;</li>
          <li>application performance;</li>
          <li>crashes and errors;</li>
          <li>user journeys; and</li>
          <li>service reliability.</li>
        </ul>

        <h3 className="font-bold mt-2">Advertising or marketing technologies</h3>
        <p>Where used, these may help measure marketing campaigns or show relevant Ordrji advertisements. Non-essential technologies will be used subject to applicable consent requirements.</p>
        <p>You can control cookies through our cookie banner, browser settings or device settings. Disabling essential cookies may prevent certain Services from working.</p>
      </div>
    )
  },
  {
    title: "8. How we share personal data",
    body: (
      <div className="flex flex-col gap-4">
        <p>We may disclose personal data to the following categories of recipients.</p>

        <h3 className="font-bold text-lg mt-2">8.1 Restaurant Customers and their Authorised Users</h3>
        <p>Information relating to restaurant operations may be accessible to the relevant Restaurant Customer and users authorised by that Restaurant Customer, based on configured roles and permissions.</p>

        <h3 className="font-bold text-lg mt-2">8.2 Service providers and Data Processors</h3>
        <p>We may use vendors for:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>cloud hosting and storage;</li>
          <li>database and backup services;</li>
          <li>application monitoring;</li>
          <li>customer support;</li>
          <li>remote troubleshooting;</li>
          <li>email, SMS and WhatsApp communications;</li>
          <li>payment processing;</li>
          <li>analytics;</li>
          <li>cybersecurity;</li>
          <li>accounting and invoicing;</li>
          <li>document signing;</li>
          <li>CRM and sales administration; and</li>
          <li>software development and testing.</li>
        </ul>
        <p>These providers are permitted to process data only for agreed services and are expected to maintain appropriate confidentiality and security protections.</p>

        <h3 className="font-bold text-lg mt-2">8.3 Third-party integrations</h3>
        <p>When a Restaurant Customer enables an integration, we may exchange information with the selected provider. These providers may include payment services, delivery platforms, accounting systems, communication platforms and other restaurant technology services. The third party&rsquo;s use of information is governed by its own privacy policy and the Restaurant Customer&rsquo;s agreement with that provider.</p>

        <h3 className="font-bold text-lg mt-2">8.4 Professional advisers</h3>
        <p>We may share information with lawyers, auditors, accountants, insurers, consultants and other advisers where reasonably necessary.</p>

        <h3 className="font-bold text-lg mt-2">8.5 Government authorities and legal recipients</h3>
        <p>We may disclose information where required by law, court order, regulation or valid legal process, or where reasonably necessary to prevent fraud, investigate wrongdoing or protect legal rights.</p>

        <h3 className="font-bold text-lg mt-2">8.6 Corporate transactions</h3>
        <p>Personal data may be disclosed in connection with an investment, financing, merger, acquisition, restructuring, sale of assets or similar transaction. Any recipient will be required to handle personal data consistently with applicable law.</p>

        <h3 className="font-bold text-lg mt-2">8.7 With consent or instructions</h3>
        <p>We may share personal data for another purpose where you or the relevant Restaurant Customer has instructed or authorised us to do so.</p>
        <p>Ordrji does not sell or rent personal data to data brokers or unrelated third parties.</p>
      </div>
    )
  },
  {
    title: "9. International data transfers",
    body: (
      <div className="flex flex-col gap-4">
        <p>Ordrji and its service providers may process information in India and in other countries where approved infrastructure or service providers operate.</p>
        <p>When personal data is transferred outside India, we will take reasonable steps to:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>comply with applicable transfer restrictions;</li>
          <li>assess the recipient and purpose;</li>
          <li>use appropriate contractual and security safeguards;</li>
          <li>limit access to authorised persons; and</li>
          <li>comply with any country- or entity-specific restrictions notified by the Government of India.</li>
        </ul>
        <p>Restaurant Customers requiring specific data-location arrangements should ensure those requirements are included in their contract or Data Processing Agreement.</p>
      </div>
    )
  },
  {
    title: "10. Data retention",
    body: (
      <div className="flex flex-col gap-4">
        <p>We retain personal data only for as long as reasonably necessary for the purpose for which it was collected, to provide the Services, resolve disputes, enforce agreements and comply with legal requirements.</p>
        <p>Our general retention approach is:</p>
        <div className="overflow-x-auto w-full mb-4">
          <table className="min-w-full border border-[var(--border-color)] text-sm">
            <thead className="bg-[var(--bg-card)]">
              <tr>
                <th className="border-b border-[var(--border-color)] p-3 text-left font-semibold">Data category</th>
                <th className="border-b border-[var(--border-color)] p-3 text-left font-semibold">General retention approach</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b border-[var(--border-color)] p-3 align-top">Website enquiries and demo requests</td>
                <td className="border-b border-[var(--border-color)] p-3 align-top">Normally up to 24 months after the last meaningful interaction</td>
              </tr>
              <tr>
                <td className="border-b border-[var(--border-color)] p-3 align-top">Restaurant Customer account information</td>
                <td className="border-b border-[var(--border-color)] p-3 align-top">During the relationship and normally up to 3 years after account closure</td>
              </tr>
              <tr>
                <td className="border-b border-[var(--border-color)] p-3 align-top">Hosted restaurant operational data</td>
                <td className="border-b border-[var(--border-color)] p-3 align-top">During the subscription and for the export or recovery period stated in the contract, normally up to 90 days after termination</td>
              </tr>
              <tr>
                <td className="border-b border-[var(--border-color)] p-3 align-top">Orders, invoices and financial records</td>
                <td className="border-b border-[var(--border-color)] p-3 align-top">For the period required by tax, GST, accounting and other applicable laws</td>
              </tr>
              <tr>
                <td className="border-b border-[var(--border-color)] p-3 align-top">Support tickets and communications</td>
                <td className="border-b border-[var(--border-color)] p-3 align-top">Normally up to 3 years after closure</td>
              </tr>
              <tr>
                <td className="border-b border-[var(--border-color)] p-3 align-top">Marketing records</td>
                <td className="border-b border-[var(--border-color)] p-3 align-top">Until consent is withdrawn, an objection is received or the data is no longer required</td>
              </tr>
              <tr>
                <td className="border-b border-[var(--border-color)] p-3 align-top">Opt-out or suppression records</td>
                <td className="border-b border-[var(--border-color)] p-3 align-top">As long as necessary to honour the opt-out</td>
              </tr>
              <tr>
                <td className="border-b border-[var(--border-color)] p-3 align-top">Application and security logs</td>
                <td className="border-b border-[var(--border-color)] p-3 align-top">Normally at least 1 year, or longer where required for security or legal compliance</td>
              </tr>
              <tr>
                <td className="border-b border-[var(--border-color)] p-3 align-top">Local device data</td>
                <td className="border-b border-[var(--border-color)] p-3 align-top">Until synchronised, deleted through authorised controls or removed during secure device decommissioning</td>
              </tr>
              <tr>
                <td className="border-b border-[var(--border-color)] p-3 align-top">Backups</td>
                <td className="border-b border-[var(--border-color)] p-3 align-top">Until overwritten through the applicable backup cycle, normally within 90 days</td>
              </tr>
              <tr>
                <td className="p-3 align-top">Aggregated or de-identified data</td>
                <td className="p-3 align-top">May be retained for a longer period where it no longer identifies an individual</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>Retention periods may differ where:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>a Restaurant Customer has configured a permitted retention period;</li>
          <li>a contract or Data Processing Agreement requires a different period;</li>
          <li>litigation or investigation is pending;</li>
          <li>deletion would interfere with security or fraud prevention;</li>
          <li>legal obligations require continued retention; or</li>
          <li>the individual has requested deletion and no exception applies.</li>
        </ul>
      </div>
    )
  },
  {
    title: "11. Account closure and Restaurant Customer data export",
    body: (
      <div className="flex flex-col gap-4">
        <p>A Restaurant Customer may request account closure in accordance with its subscription agreement.</p>
        <p>Before deletion, the Restaurant Customer should export data it is legally required to retain. Following termination:</p>
        <ol className="list-decimal pl-5 flex flex-col gap-1">
          <li>access to the account may be suspended;</li>
          <li>data may remain available for a limited export or recovery period;</li>
          <li>production data will be deleted or de-identified after that period, subject to legal requirements;</li>
          <li>residual copies may remain in encrypted backups until the backup cycle completes; and</li>
          <li>limited records may be retained for tax, fraud prevention, dispute resolution, security and legal compliance.</li>
        </ol>
        <p>Ordrji may request written authorisation and identity verification before processing an export or deletion request.</p>
      </div>
    )
  },
  {
    title: "12. Security safeguards",
    body: (
      <div className="flex flex-col gap-4">
        <p>Ordrji uses reasonable technical and organisational safeguards designed to protect personal data. Depending on the Service and risk, these may include:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>encryption in transit;</li>
          <li>encryption, tokenisation or masking at rest where appropriate;</li>
          <li>role-based access controls;</li>
          <li>staff PINs and account authentication;</li>
          <li>secure password hashing;</li>
          <li>audit logs;</li>
          <li>device registration and activation;</li>
          <li>access monitoring;</li>
          <li>network and database controls;</li>
          <li>encrypted or access-controlled backups;</li>
          <li>security logging;</li>
          <li>vulnerability management;</li>
          <li>software update controls;</li>
          <li>synchronisation retry and idempotency controls;</li>
          <li>disaster-recovery procedures;</li>
          <li>employee confidentiality obligations;</li>
          <li>vendor security requirements;</li>
          <li>incident-response procedures; and</li>
          <li>regular review of access permissions.</li>
        </ul>
        <p>No internet, cloud or device-based system can be guaranteed to be completely secure. Restaurant Customers must protect passwords, PINs, devices, printers, local networks and authorised-user accounts and must notify Ordrji promptly of suspected misuse.</p>
      </div>
    )
  },
  {
    title: "13. Personal data breaches",
    body: (
      <div className="flex flex-col gap-4">
        <p>If Ordrji becomes aware of a personal-data breach, we will investigate and take reasonable steps to:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>contain the incident;</li>
          <li>protect affected systems;</li>
          <li>identify the nature and extent of the breach;</li>
          <li>assess potential consequences;</li>
          <li>restore secure service;</li>
          <li>prevent recurrence; and</li>
          <li>notify affected persons, Restaurant Customers and regulatory authorities where required by applicable law.</li>
        </ul>
        <p>Where Ordrji processes affected data on behalf of a Restaurant Customer, we will notify and reasonably assist that Restaurant Customer in meeting its legal obligations.</p>
      </div>
    )
  },
  {
    title: "14. Your privacy rights",
    body: (
      <div className="flex flex-col gap-4">
        <p>Subject to applicable law, you may have the right to:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>obtain information about personal data being processed;</li>
          <li>request a summary of the personal data and processing activities;</li>
          <li>ask for inaccurate or misleading data to be corrected;</li>
          <li>ask for incomplete data to be completed;</li>
          <li>ask for personal data to be updated;</li>
          <li>request erasure where retention is no longer required;</li>
          <li>withdraw consent;</li>
          <li>object to or opt out of direct marketing;</li>
          <li>raise a grievance;</li>
          <li>nominate another individual to exercise rights in the event of death or incapacity; and</li>
          <li>approach the relevant regulatory authority after using the available grievance process.</li>
        </ul>
        <p>Rights are not absolute. We may retain or continue processing information where required for legal compliance, security, fraud prevention, contractual claims or another lawful purpose.</p>

        <h3 className="font-bold text-lg mt-2">How to submit a request</h3>
        <p>Send a request to:</p>
        <p>
          Privacy email: privacy@ordrji.com<br/>
          Subject: Privacy Rights Request
        </p>
        <p>Include:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>your name;</li>
          <li>registered mobile number or email;</li>
          <li>Restaurant Customer or outlet name, where relevant;</li>
          <li>description of the request;</li>
          <li>relationship with the restaurant; and</li>
          <li>information reasonably required to verify identity.</li>
        </ul>
        <p>We will not ask for passwords, UPI PINs or CVVs.</p>

        <h3 className="font-bold text-lg mt-2">Requests concerning restaurant-controlled data</h3>
        <p>When Ordrji processes data on behalf of a Restaurant Customer, we may:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>direct the request to the Restaurant Customer;</li>
          <li>notify the Restaurant Customer;</li>
          <li>act on the Restaurant Customer&rsquo;s documented instructions; or</li>
          <li>assist the Restaurant Customer in responding.</li>
        </ul>
      </div>
    )
  },
  {
    title: "15. Grievance redressal",
    body: (
      <div className="flex flex-col gap-4">
        <p>Questions, complaints or grievances concerning this Privacy Policy may be sent to the Privacy and Grievance Officer.</p>
        <p>
          <strong>Privacy and Grievance Officer:</strong> ASIYA IMRAN SHAIKH<br/>
          <strong>Designation:</strong> Software Developer<br/>
          <strong>Legal entity:</strong> SYNCKRAFT TECHNOLOGIES PVT. LTD<br/>
          <strong>Registered office:</strong> 414, 4th Floor, Daga Plazzo Biyani Sqaure, opp. Dmart Camp, Amravati, Maharashtra 444602<br/>
          <strong>Email:</strong> privacy@ordrji.com<br/>
          <strong>General email:</strong> hello@ordrji.com<br/>
          <strong>Phone:</strong> +91 90044 02006<br/>
          <strong>Working hours:</strong> 11 AM-6PM, Monday to Saturday
        </p>
        <p>We aim to acknowledge grievances promptly and respond within 30 days, unless a shorter or longer period is required or permitted by applicable law.</p>
      </div>
    )
  },
  {
    title: "16. Marketing choices",
    body: (
      <div className="flex flex-col gap-4">
        <p>You may stop promotional communications by:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>using an unsubscribe link;</li>
          <li>replying with the stated opt-out instruction;</li>
          <li>changing communication preferences in your account;</li>
          <li>asking the Restaurant Customer to stop its campaigns; or</li>
          <li>contacting privacy@ordrji.com.</li>
        </ul>
        <p>Opting out of marketing will not stop essential communications relating to orders, security, payments, subscriptions, support or legal matters.</p>
        <p>Restaurant Customers using Ordrji&rsquo;s WhatsApp, SMS, email or campaign features are responsible for:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>obtaining required consent;</li>
          <li>maintaining proof of consent where required;</li>
          <li>respecting opt-outs;</li>
          <li>maintaining accurate contact lists;</li>
          <li>following platform and telecom rules; and</li>
          <li>ensuring that messages are not misleading, unlawful or unsolicited.</li>
        </ul>
      </div>
    )
  },
  {
    title: "17. Children’s privacy",
    body: (
      <div className="flex flex-col gap-4">
        <p>Ordrji&rsquo;s business accounts and administrative Services are intended for adults authorised by a Restaurant Customer. Ordrji does not knowingly permit children to independently create Restaurant Customer or staff-administrator accounts.</p>
        <p>Where an End Customer under 18 uses a restaurant ordering service:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>the transaction should be completed by or with the involvement of a parent or lawful guardian;</li>
          <li>only information reasonably necessary to fulfil the order should be collected;</li>
          <li>the restaurant should obtain verifiable parental or guardian consent where legally required;</li>
          <li>Ordrji and Restaurant Customers must not conduct behavioural monitoring or targeted advertising directed at children where prohibited; and</li>
          <li>a parent or guardian may contact the relevant restaurant or Ordrji regarding the child&rsquo;s data.</li>
        </ul>
      </div>
    )
  },
  {
    title: "18. Sensitive information",
    body: (
      <div className="flex flex-col gap-4">
        <p>Do not enter the following information into free-text fields, order notes, support chats or other Ordrji areas unless it is strictly necessary and expressly authorised:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>passwords;</li>
          <li>card numbers or CVVs;</li>
          <li>UPI PINs;</li>
          <li>bank passwords;</li>
          <li>Aadhaar numbers;</li>
          <li>passport details;</li>
          <li>medical records;</li>
          <li>biometric templates;</li>
          <li>highly sensitive identity documents; or</li>
          <li>information unrelated to restaurant operations.</li>
        </ul>
        <p>Where allergy or dietary information is provided for an order, it should be limited to what is reasonably necessary to fulfil that order safely.</p>
      </div>
    )
  },
  {
    title: "19. Restaurant Customer responsibilities",
    body: (
      <div className="flex flex-col gap-4">
        <p>Restaurant Customers using Ordrji are responsible for:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>providing appropriate privacy notices to End Customers and staff;</li>
          <li>identifying a lawful purpose for collecting personal data;</li>
          <li>collecting only necessary information;</li>
          <li>obtaining consent where required;</li>
          <li>configuring appropriate roles and permissions;</li>
          <li>keeping login details secure;</li>
          <li>reviewing staff access when employment or duties change;</li>
          <li>protecting local POS devices and networks;</li>
          <li>maintaining legally required restaurant and tax records;</li>
          <li>responding to privacy requests;</li>
          <li>honouring communication opt-outs;</li>
          <li>using CRM and marketing features lawfully;</li>
          <li>obtaining permission before migrating data from another system;</li>
          <li>notifying Ordrji promptly of suspected security incidents; and</li>
          <li>complying with applicable privacy, consumer, tax, labour and electronic-communication laws.</li>
        </ul>
        <p>Restaurant Customers must not use Ordrji to unlawfully monitor employees, create discriminatory profiles or send unsolicited communications.</p>
      </div>
    )
  },
  {
    title: "20. Third-party websites and services",
    body: (
      <div className="flex flex-col gap-4">
        <p>The Services may contain links to or integrations with third-party websites, payment providers, delivery platforms, messaging services, accounting software or other systems.</p>
        <p>Ordrji does not control the privacy practices of independent third parties. You should review their privacy policies before providing information or enabling an integration. Disabling an integration may not automatically delete information already processed by that third party.</p>
      </div>
    )
  },
  {
    title: "21. Business analytics and benchmarking",
    body: (
      <div className="flex flex-col gap-4">
        <p>Ordrji may use aggregated or de-identified information to:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>understand restaurant-industry trends;</li>
          <li>measure product performance;</li>
          <li>improve reliability;</li>
          <li>develop reports;</li>
          <li>create benchmarks;</li>
          <li>improve fraud detection;</li>
          <li>develop forecasting models; and</li>
          <li>support research and product development.</li>
        </ul>
        <p>We will take reasonable steps to prevent such information from being used to identify an individual or disclose the confidential business data of a Restaurant Customer.</p>
      </div>
    )
  },
  {
    title: "22. Changes to this Privacy Policy",
    body: (
      <div className="flex flex-col gap-4">
        <p>We may update this Privacy Policy to reflect:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>changes to the Services;</li>
          <li>new features or integrations;</li>
          <li>changes in our vendors;</li>
          <li>legal or regulatory developments;</li>
          <li>security practices; or</li>
          <li>organisational changes.</li>
        </ul>
        <p>The updated policy will display a revised &ldquo;Last updated&rdquo; date. Where a change materially affects how personal data is used, we will provide additional notice through the website, application, registered email, dashboard or another appropriate channel. Where required, we will obtain fresh consent.</p>
      </div>
    )
  },
  {
    title: "23. Contact us",
    body: (
      <div className="flex flex-col gap-4">
        <p>For privacy questions, rights requests or complaints, contact:</p>
        <p>
          <strong>SYNCKRAFT TECHNOLOGIES PVT. LTD., operating as Ordrji</strong><br/>
          414, 4th Floor, Daga Plazzo Biyani Sqaure, opp. Dmart Camp, Amravati, Maharashtra 444602<br/>
          <strong>Email:</strong> privacy@ordrji.com<br/>
          <strong>General enquiries:</strong> hello@ordrji.com<br/>
          <strong>Phone:</strong> +91 90044 02006
        </p>
      </div>
    )
  }
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      badge="Legal"
      title="Privacy Policy"
      subtitle="We take your privacy seriously. Here's how we handle your data."
      lastUpdated="15 July 2026"
      sections={SECTIONS}
    />
  );
}
