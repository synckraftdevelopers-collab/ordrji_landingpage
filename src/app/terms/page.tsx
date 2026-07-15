import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service — Ordrji",
  description: "Read the Terms of Service governing your use of the Ordrji platform.",
};

const SECTIONS = [
  {
    title: "Effective Date",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">ORDRJI TERMS OF SERVICE</p>
        <p className="mb-2"><strong>Effective date:</strong> 15 July 2026Last updated: 15 July 2026</p>
      </div>
    )
  },
  {
    title: "1. Introduction",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">These Terms of Service constitute a legally binding agreement between:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>SYNCKRAFT TECHNOLOGIES PVT. LTD., operating under the brand name “Ordrji”, having its registered office at  414, 4th Floor, Daga Plazzo Biyani Sqaure, opp. Dmart Camp, Amravati, Maharashtra 444602, hereinafter referred to as “Ordrji,” “Company,” “we,” “us” or “our”;</li>
        </ul>
        <p className="mb-2">and</p>
        <p className="mb-2">the person or legal entity accessing, subscribing to, purchasing, installing or using the Services, hereinafter referred to as “Customer,” “you” or “your.”</p>
        <p className="mb-2">These Terms govern access to and use of:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>ordrji.com and related websites;</li>
        <li>Ordrji restaurant POS and billing software;</li>
        <li>Windows, desktop, web, Android, iOS or other applications made available by Ordrji;</li>
        <li>owner, manager, cashier, waiter, kitchen and administrative dashboards;</li>
        <li>KOT and Kitchen Display Systems;</li>
        <li>QR menus and QR ordering;</li>
        <li>online ordering pages;</li>
        <li>table and order management;</li>
        <li>inventory, recipe and purchase management;</li>
        <li>customer relationship management;</li>
        <li>loyalty, offers, campaigns and feedback;</li>
        <li>staff, attendance and role-management modules;</li>
        <li>multi-outlet and franchise-management modules;</li>
        <li>reports, analytics and business insights;</li>
        <li>payment and third-party integrations;</li>
        <li>onboarding, migration, training and support services;</li>
        <li>APIs, software development kits and integration tools; and</li>
        </ul>
        <p className="mb-2">any other Ordrji product or service referring to these Terms.</p>
        <p className="mb-2">Collectively, these are referred to as the “Services.”</p>
      </div>
    )
  },
  {
    title: "2. Acceptance of these Terms",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">You accept these Terms when you:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>click “I Agree,” “Accept,” “Sign Up,” “Subscribe” or a similar button;</li>
        <li>create an Ordrji account;</li>
        <li>sign an order form, proposal or subscription agreement;</li>
        <li>pay an Ordrji invoice;</li>
        <li>install or activate an Ordrji application;</li>
        <li>access a demo, trial or production account;</li>
        <li>permit Ordrji to configure your restaurant account; or</li>
        </ul>
        <p className="mb-2">otherwise access or use the Services.</p>
        <p className="mb-2">If you do not agree to these Terms, you must not access or use the Services.</p>
        <p className="mb-2">If an individual accepts these Terms on behalf of a company, restaurant, partnership, franchise, organisation or other legal entity, that individual confirms that they have authority to bind that entity.</p>
      </div>
    )
  },
  {
    title: "3. Contract documents and order of priority",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">The agreement between you and Ordrji may include:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>an Order Form, quotation, proposal or subscription confirmation;</li>
        <li>a Master Services Agreement, where separately signed;</li>
        <li>a Service-Level Agreement;</li>
        <li>a Data Processing Agreement;</li>
        <li>these Terms;</li>
        <li>the Ordrji Privacy Policy;</li>
        <li>an Acceptable Use Policy;</li>
        <li>applicable module-specific or integration-specific terms; and</li>
        </ul>
        <p className="mb-2">documentation and policies incorporated by reference.</p>
        <p className="mb-2">In the event of a conflict, the following order of priority will generally apply:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>signed Master Services Agreement;</li>
        <li>signed Order Form;</li>
        <li>signed Service-Level Agreement;</li>
        <li>signed Data Processing Agreement;</li>
        <li>module-specific terms;</li>
        <li>these Terms;</li>
        <li>other published policies.</li>
        </ul>
        <p className="mb-2">A document will override another document only regarding the specific subject matter of the conflicting provision.</p>
      </div>
    )
  },
  {
    title: "4. Definitions",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">For these Terms:</p>
        <h3 className="font-bold text-lg mt-4 mb-2">4.1 Authorised User</h3>
        <p className="mb-2">An “Authorised User” is an owner, director, administrator, manager, cashier, waiter, captain, kitchen employee, accountant, inventory manager, franchise operator, consultant or other person authorised by the Customer to access the Services.</p>
        <h3 className="font-bold text-lg mt-4 mb-2">4.2 Customer Data</h3>
        <p className="mb-2">“Customer Data” means information submitted, uploaded, stored, generated or processed through the Services by or on behalf of the Customer, including:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>restaurant and outlet information;</li>
        <li>menus and pricing;</li>
        <li>customer information;</li>
        <li>staff information;</li>
        <li>orders and KOTs;</li>
        <li>invoices;</li>
        <li>payment records;</li>
        <li>inventory records;</li>
        <li>supplier and purchase records;</li>
        <li>loyalty information;</li>
        <li>feedback;</li>
        <li>reports;</li>
        <li>images, logos and business content; and</li>
        </ul>
        <p className="mb-2">configuration data.</p>
        <h3 className="font-bold text-lg mt-4 mb-2">4.3 End Customer</h3>
        <p className="mb-2">An “End Customer” is a consumer who interacts with a Customer through Ordrji, including a person who:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>places an order;</li>
        <li>scans a QR code;</li>
        <li>browses a digital menu;</li>
        <li>makes or attempts a payment;</li>
        <li>joins a loyalty programme;</li>
        <li>receives a digital bill;</li>
        <li>provides feedback; or</li>
        </ul>
        <p className="mb-2">communicates with the restaurant.</p>
        <h3 className="font-bold text-lg mt-4 mb-2">4.4 Order Form</h3>
        <p className="mb-2">An “Order Form” means any quotation, proposal, subscription selection, invoice, online checkout confirmation or written agreement identifying the Services, plan, outlets, fees, term or other commercial conditions.</p>
        <h3 className="font-bold text-lg mt-4 mb-2">4.5 Restaurant Customer</h3>
        <p className="mb-2">A “Restaurant Customer” means a restaurant, café, QSR, cloud kitchen, bakery, cake shop, dessert shop, food court, franchise, chain, bar, takeaway counter or other food business subscribing to Ordrji.</p>
        <h3 className="font-bold text-lg mt-4 mb-2">4.6 Subscription Term</h3>
        <p className="mb-2">The “Subscription Term” means the period during which the Customer is authorised to access paid Services.</p>
        <h3 className="font-bold text-lg mt-4 mb-2">4.7 Third-Party Service</h3>
        <p className="mb-2">A “Third-Party Service” means any product, platform, payment provider, delivery aggregator, messaging provider, accounting application, hardware device or other service not owned and controlled by Ordrji.</p>
      </div>
    )
  },
  {
    title: "5. Eligibility",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">You may use the Services only if:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>you are legally competent to enter into a binding agreement;</li>
        <li>you are at least 18 years old;</li>
        <li>you are authorised to act for the relevant business;</li>
        <li>your use is lawful;</li>
        <li>the information submitted by you is accurate; and</li>
        </ul>
        <p className="mb-2">you are not prohibited from using the Services under applicable law.</p>
        <p className="mb-2">Ordrji’s business administration and restaurant-management accounts are not intended to be independently operated by children.</p>
      </div>
    )
  },
  {
    title: "6. Description of the Services",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Ordrji provides technology tools intended to assist restaurants and food businesses with operations.</p>
        <p className="mb-2">Depending on the subscription plan and modules enabled, the Services may include:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>POS billing;</li>
        <li>GST invoice generation;</li>
        <li>dine-in, takeaway, pickup and delivery orders;</li>
        <li>KOT and kitchen routing;</li>
        <li>Kitchen Display Systems;</li>
        <li>table management;</li>
        <li>waiter or captain ordering;</li>
        <li>menu and pricing management;</li>
        <li>QR menus;</li>
        <li>QR and online ordering;</li>
        <li>customer database;</li>
        <li>loyalty and CRM;</li>
        <li>inventory and recipe management;</li>
        <li>purchase and supplier management;</li>
        <li>staff accounts and role permissions;</li>
        <li>reports and analytics;</li>
        <li>multi-outlet controls;</li>
        <li>messaging and campaign features;</li>
        <li>payment-service integrations;</li>
        <li>delivery-platform integrations;</li>
        <li>APIs and webhooks;</li>
        <li>onboarding and migration; and</li>
        </ul>
        <p className="mb-2">support and training.</p>
        <p className="mb-2">Features may vary by:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>subscription plan;</li>
        <li>device;</li>
        <li>operating system;</li>
        <li>outlet configuration;</li>
        <li>geographical location;</li>
        <li>integration availability;</li>
        <li>technical compatibility;</li>
        <li>regulatory requirements; and</li>
        </ul>
        <p className="mb-2">product-development stage.</p>
        <p className="mb-2">The presence of a feature in a demo, brochure, development roadmap, mock-up or marketing communication does not mean that the feature is included in every subscription.</p>
      </div>
    )
  },
  {
    title: "7. Ordrji is a technology provider",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Unless expressly stated otherwise in a signed agreement:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>Ordrji is a software and technology-service provider;</li>
        <li>Ordrji does not own or operate the Customer’s restaurant;</li>
        <li>Ordrji does not prepare, package, sell or deliver food;</li>
        <li>Ordrji does not determine food quality, ingredients, menu prices, taxes or availability;</li>
        <li>Ordrji is not the merchant, seller or supplier of food ordered from a Restaurant Customer;</li>
        <li>Ordrji is not responsible for food licences, food safety, hygiene, allergens or product descriptions;</li>
        <li>Ordrji does not employ or supervise the Customer’s employees; and</li>
        </ul>
        <p className="mb-2">Ordrji is not a tax, accounting, legal, investment or business adviser.</p>
        <p className="mb-2">The Restaurant Customer remains responsible for its food, operations, employees, customers, licences, taxes and legal compliance.</p>
      </div>
    )
  },
  {
    title: "8. Account registration",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">To use the Services, the Customer may be required to provide:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>legal business name;</li>
        <li>trading or outlet name;</li>
        <li>owner or authorised representative details;</li>
        <li>email address;</li>
        <li>mobile number;</li>
        <li>operating address;</li>
        <li>GSTIN, PAN or other tax information;</li>
        <li>outlet details;</li>
        <li>subscription information;</li>
        <li>payment details;</li>
        <li>menu and pricing information; and</li>
        </ul>
        <p className="mb-2">other information reasonably required for onboarding.</p>
        <p className="mb-2">The Customer must ensure that this information is complete, current and accurate.</p>
        <p className="mb-2">Ordrji may request reasonable documentation to:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>verify the business;</li>
        <li>verify authority;</li>
        <li>prevent fraud;</li>
        <li>enable payment processing;</li>
        <li>comply with law;</li>
        <li>configure tax settings; or</li>
        </ul>
        <p className="mb-2">provide a regulated integration.</p>
        <p className="mb-2">Ordrji may refuse or delay activation where verification cannot reasonably be completed.</p>
      </div>
    )
  },
  {
    title: "9. Account ownership",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">The account belongs to the Customer identified in the Order Form or account-registration records.</p>
        <p className="mb-2">Where an employee, consultant, franchisee, implementation partner or other person initially creates the account:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>that person does not personally own the account merely because they created it;</li>
        <li>the verified legal business or authorised proprietor will ordinarily control the account;</li>
        <li>Ordrji may request evidence of account ownership or authority; and</li>
        </ul>
        <p className="mb-2">Ordrji may temporarily restrict account changes while an ownership dispute is investigated.</p>
        <p className="mb-2">Ordrji is not responsible for internal ownership, employment, partnership, franchise or management disputes within the Customer’s organisation.</p>
      </div>
    )
  },
  {
    title: "10. Authorised Users",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">The Customer may create Authorised User accounts according to the applicable subscription plan.</p>
        <p className="mb-2">The Customer is responsible for:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>deciding who receives access;</li>
        <li>assigning correct roles and permissions;</li>
        <li>reviewing access regularly;</li>
        <li>disabling access when employment or authority ends;</li>
        <li>ensuring that credentials are not shared improperly;</li>
        <li>supervising actions performed by Authorised Users; and</li>
        </ul>
        <p className="mb-2">ensuring that Authorised Users comply with these Terms.</p>
        <p className="mb-2">An action taken through an Authorised User account will generally be treated as authorised by the Customer unless the Customer promptly reports unauthorised access.</p>
      </div>
    )
  },
  {
    title: "11. Account credentials and security",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">The Customer and Authorised Users must:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>maintain confidential passwords and PINs;</li>
        <li>use strong authentication credentials;</li>
        <li>avoid sharing owner or administrator credentials;</li>
        <li>secure registered devices;</li>
        <li>lock unattended POS terminals;</li>
        <li>protect local networks;</li>
        <li>maintain current operating-system security;</li>
        <li>use appropriate antivirus and endpoint protection;</li>
        <li>notify Ordrji promptly of suspected unauthorised access; and</li>
        </ul>
        <p className="mb-2">cooperate with reasonable security investigations.</p>
        <p className="mb-2">Ordrji will never request a Customer’s:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>UPI PIN;</li>
        <li>card CVV;</li>
        <li>online-banking password; or</li>
        </ul>
        <p className="mb-2">complete payment-card credentials.</p>
        <p className="mb-2">The Customer must immediately notify Ordrji at security@ordrji.com if it suspects that an account, device or credential has been compromised.</p>
      </div>
    )
  },
  {
    title: "12. Device activation",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Ordrji may use device activation, registration or licensing to control access.</p>
        <p className="mb-2">The Customer agrees that:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>only authorised devices may access the Services;</li>
        <li>device limits may depend on the subscription plan;</li>
        <li>an additional-device fee may apply;</li>
        <li>device transfers may require verification;</li>
        <li>Ordrji may deactivate a lost, compromised or unauthorised device;</li>
        <li>local data should be synchronised or exported before a device is reset; and</li>
        </ul>
        <p className="mb-2">the Customer is responsible for secure disposal or transfer of devices.</p>
        <p className="mb-2">Attempts to bypass device limits or activation controls are prohibited.</p>
      </div>
    )
  },
  {
    title: "13. Software licence",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Subject to payment of applicable fees and compliance with these Terms, Ordrji grants the Customer a limited, non-exclusive, non-transferable, non-sublicensable and revocable right to access and use the Services:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>during the Subscription Term;</li>
        <li>for the Customer’s internal restaurant operations;</li>
        <li>for the number of outlets, devices and Authorised Users purchased; and</li>
        </ul>
        <p className="mb-2">according to the applicable documentation and plan limits.</p>
        <p className="mb-2">The licence does not transfer ownership of any Ordrji software or intellectual property.</p>
      </div>
    )
  },
  {
    title: "14. Licence restrictions",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">The Customer must not, and must not permit another person to:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>copy the Services except as expressly permitted;</li>
        <li>sell, lease, rent, sublicense or commercially redistribute the Services;</li>
        <li>reverse engineer, decompile or disassemble the Services, except where such restriction is prohibited by law;</li>
        <li>bypass security, activation or subscription controls;</li>
        <li>gain unauthorised access to another Customer’s data;</li>
        <li>scrape or systematically extract data from the Services;</li>
        <li>use the Services to build or train a competing product without written permission;</li>
        <li>copy Ordrji’s workflows, screens, documentation or proprietary material for commercial replication;</li>
        <li>remove copyright, trademark or ownership notices;</li>
        <li>upload malicious code;</li>
        <li>conduct unauthorised penetration testing;</li>
        <li>overload or disrupt the platform;</li>
        <li>impersonate another person or entity;</li>
        <li>use another Customer’s account;</li>
        <li>use the Services for unlawful surveillance;</li>
        <li>use the Services to send unlawful or unsolicited communications; or</li>
        </ul>
        <p className="mb-2">use the Services in a manner that infringes third-party rights.</p>
      </div>
    )
  },
  {
    title: "15. Subscription plans and modules",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Ordrji may offer:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>free trials;</li>
        <li>launch offers;</li>
        <li>Starter plans;</li>
        <li>Growth plans;</li>
        <li>Pro plans;</li>
        <li>Enterprise plans;</li>
        <li>per-outlet subscriptions;</li>
        <li>per-device subscriptions;</li>
        <li>module-based subscriptions;</li>
        <li>annual subscriptions;</li>
        <li>usage-based services; and</li>
        </ul>
        <p className="mb-2">customised plans.</p>
        <p className="mb-2">The applicable plan, features, limits, fees and duration will be identified in the Order Form or account dashboard.</p>
        <p className="mb-2">Features not included in the Customer’s plan may require:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>a plan upgrade;</li>
        <li>an additional module fee;</li>
        <li>a per-outlet fee;</li>
        <li>a per-device fee;</li>
        <li>usage credits;</li>
        <li>integration charges; or</li>
        </ul>
        <p className="mb-2">implementation charges.</p>
      </div>
    )
  },
  {
    title: "16. Trials, pilots and launch offers",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Ordrji may offer limited trials or pilot programmes.</p>
        <p className="mb-2">Unless otherwise stated:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>a trial is provided for evaluation only;</li>
        <li>trial features may be limited;</li>
        <li>trial data may be deleted after the trial period;</li>
        <li>technical support may be limited;</li>
        <li>trial Services may be changed or withdrawn;</li>
        <li>trial accounts may not include service-level commitments;</li>
        <li>the Customer should not depend exclusively on a trial system for business-critical operations; and</li>
        </ul>
        <p className="mb-2">the trial automatically expires unless converted to a paid subscription.</p>
        <p className="mb-2">A launch offer may be restricted by:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>number of Customers;</li>
        <li>number of outlets;</li>
        <li>enrolment date;</li>
        <li>geographical area;</li>
        <li>subscription term;</li>
        <li>specified modules; or</li>
        </ul>
        <p className="mb-2">other published eligibility conditions.</p>
        <p className="mb-2">Promotional pricing applies only for the stated promotional period. The regular price may apply afterward.</p>
      </div>
    )
  },
  {
    title: "17. Beta and early-access features",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Ordrji may provide beta, preview, experimental or early-access features.</p>
        <p className="mb-2">Such features:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>may be incomplete;</li>
        <li>may contain errors;</li>
        <li>may change substantially;</li>
        <li>may not be suitable for production use;</li>
        <li>may be discontinued;</li>
        <li>may have limited support; and</li>
        </ul>
        <p className="mb-2">may not be covered by a service-level commitment.</p>
        <p className="mb-2">The Customer uses beta features voluntarily and at its own reasonable operational risk.</p>
        <p className="mb-2">Confidential beta information must not be publicly disclosed without Ordrji’s written permission.</p>
      </div>
    )
  },
  {
    title: "18. Onboarding and implementation",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Depending on the Order Form, onboarding may include:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>restaurant account creation;</li>
        <li>outlet configuration;</li>
        <li>menu upload;</li>
        <li>tax configuration assistance;</li>
        <li>table setup;</li>
        <li>printer setup;</li>
        <li>QR-code generation;</li>
        <li>staff account setup;</li>
        <li>training;</li>
        <li>data migration; and</li>
        </ul>
        <p className="mb-2">initial testing.</p>
        <p className="mb-2">The Customer must provide accurate information and reasonable cooperation.</p>
        <p className="mb-2">Implementation timelines depend on:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>timely data submission;</li>
        <li>menu complexity;</li>
        <li>number of outlets;</li>
        <li>hardware availability;</li>
        <li>network readiness;</li>
        <li>third-party access;</li>
        <li>data quality;</li>
        <li>Customer approvals; and</li>
        </ul>
        <p className="mb-2">requested customisation.</p>
        <p className="mb-2">A delay caused by the Customer or a Third-Party Service will not constitute a failure by Ordrji.</p>
      </div>
    )
  },
  {
    title: "19. Data migration",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Where Ordrji agrees to migrate data from another system:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>the Customer must have lawful authority to export and transfer the data;</li>
        <li>the Customer must obtain required permissions and consents;</li>
        <li>the Customer must provide data in a supported format;</li>
        <li>Ordrji may refuse corrupted, unlawful or incompatible data;</li>
        <li>Ordrji may transform or normalise data to fit Ordrji’s structure;</li>
        <li>not all historical fields, layouts, identifiers or audit logs may be transferable;</li>
        <li>migrated data must be reviewed by the Customer; and</li>
        </ul>
        <p className="mb-2">the Customer remains responsible for validating balances, taxes, inventory, invoices and opening records.</p>
        <p className="mb-2">Unless expressly included in the Order Form, extensive cleansing, mapping, custom migration or repeated migration may be chargeable.</p>
      </div>
    )
  },
  {
    title: "20. Customer configuration responsibilities",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">The Customer is responsible for reviewing and approving:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>restaurant name and address;</li>
        <li>GSTIN and tax identifiers;</li>
        <li>invoice format;</li>
        <li>menu items;</li>
        <li>menu prices;</li>
        <li>applicable taxes;</li>
        <li>HSN or SAC classifications;</li>
        <li>discounts;</li>
        <li>service charges;</li>
        <li>packaging charges;</li>
        <li>delivery charges;</li>
        <li>printer routing;</li>
        <li>table configuration;</li>
        <li>staff roles;</li>
        <li>opening inventory;</li>
        <li>recipes;</li>
        <li>supplier details;</li>
        <li>payment modes;</li>
        <li>order types; and</li>
        </ul>
        <p className="mb-2">reports used for accounting or tax filing.</p>
        <p className="mb-2">Ordrji may assist with setup but does not assume responsibility for the Customer’s commercial, accounting or tax decisions.</p>
      </div>
    )
  },
  {
    title: "21. POS billing and invoices",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Ordrji provides tools for creating bills and invoices based on Customer configuration.</p>
        <p className="mb-2">The Customer is responsible for:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>ensuring invoice information is accurate;</li>
        <li>complying with applicable tax and invoicing rules;</li>
        <li>maintaining legally required invoice records;</li>
        <li>choosing the correct tax treatment;</li>
        <li>verifying bill-number sequences;</li>
        <li>reviewing discounts and refunds;</li>
        <li>reconciling payments;</li>
        <li>controlling credit transactions;</li>
        <li>conducting day and shift closing;</li>
        <li>preserving required records; and</li>
        </ul>
        <p className="mb-2">making legally required tax filings.</p>
        <p className="mb-2">The Customer must review generated invoices before relying on them for statutory filing.</p>
        <p className="mb-2">Ordrji does not guarantee that default settings are appropriate for every state, business type, product, transaction or tax structure.</p>
      </div>
    )
  },
  {
    title: "22. KOT and kitchen operations",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">The Customer remains responsible for:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>reviewing KOTs;</li>
        <li>checking item modifications;</li>
        <li>monitoring printer and KDS status;</li>
        <li>confirming allergy or dietary instructions;</li>
        <li>preventing duplicate preparation;</li>
        <li>managing cancelled or modified orders;</li>
        <li>confirming items before serving;</li>
        <li>maintaining backup kitchen procedures; and</li>
        </ul>
        <p className="mb-2">training kitchen and service staff.</p>
        <p className="mb-2">The Customer should maintain an operational fallback procedure for temporary device, printer, network or power failures.</p>
        <p className="mb-2">Ordrji is not responsible for food preparation errors, food safety incidents or service delays caused by restaurant personnel.</p>
      </div>
    )
  },
  {
    title: "23. Menu and restaurant content",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">The Customer controls and is responsible for:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>menu descriptions;</li>
        <li>prices;</li>
        <li>photographs;</li>
        <li>food classifications;</li>
        <li>ingredient statements;</li>
        <li>allergen notices;</li>
        <li>dietary claims;</li>
        <li>portion descriptions;</li>
        <li>offers;</li>
        <li>availability;</li>
        <li>taxes;</li>
        <li>delivery times;</li>
        <li>restaurant policies; and</li>
        </ul>
        <p className="mb-2">promotional content.</p>
        <p className="mb-2">The Customer represents that it has all required rights to upload and display this content.</p>
        <p className="mb-2">Ordrji may remove or restrict content that:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>infringes intellectual-property rights;</li>
        <li>is unlawful or misleading;</li>
        <li>contains malware;</li>
        <li>impersonates another business;</li>
        <li>promotes prohibited goods or services;</li>
        <li>exposes unnecessary sensitive information; or</li>
        </ul>
        <p className="mb-2">creates a legal or security risk.</p>
      </div>
    )
  },
  {
    title: "24. QR ordering and online orders",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">When an End Customer orders from a Restaurant Customer through an Ordrji-powered page:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>the order is placed with the Restaurant Customer;</li>
        <li>the Restaurant Customer is the seller and merchant of the food;</li>
        <li>the Restaurant Customer determines the menu, prices and availability;</li>
        <li>the Restaurant Customer may accept or reject the order according to its disclosed policy;</li>
        <li>the Restaurant Customer is responsible for preparation, packaging, delivery and refunds;</li>
        <li>Ordrji provides the technology used to transmit or manage the order; and</li>
        </ul>
        <p className="mb-2">Ordrji does not become a party to the food-sale contract merely by providing the technology.</p>
        <p className="mb-2">The Restaurant Customer must clearly disclose:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>its legal or trading name;</li>
        <li>contact information;</li>
        <li>menu prices;</li>
        <li>applicable taxes and charges;</li>
        <li>cancellation rules;</li>
        <li>refund rules;</li>
        <li>estimated preparation or delivery time;</li>
        <li>dietary and allergen information where legally required; and</li>
        </ul>
        <p className="mb-2">other information required by applicable law.</p>
      </div>
    )
  },
  {
    title: "25. End-Customer disputes",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Complaints concerning:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>food quality;</li>
        <li>quantity;</li>
        <li>freshness;</li>
        <li>preparation;</li>
        <li>allergens;</li>
        <li>ingredients;</li>
        <li>packaging;</li>
        <li>missing items;</li>
        <li>delivery;</li>
        <li>restaurant service;</li>
        <li>pricing;</li>
        <li>restaurant cancellation;</li>
        <li>restaurant refunds; or</li>
        </ul>
        <p className="mb-2">restaurant promotions</p>
        <p className="mb-2">must ordinarily be resolved by the Restaurant Customer.</p>
        <p className="mb-2">Ordrji may provide technical records or reasonable platform assistance but is not required to refund a food order paid to the Restaurant Customer unless Ordrji expressly collected the amount as principal and accepted that obligation.</p>
        <p className="mb-2">Nothing in these Terms removes any right an End Customer may have under applicable consumer law.</p>
      </div>
    )
  },
  {
    title: "26. Food safety and legal compliance",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">The Restaurant Customer is solely responsible for:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>obtaining and maintaining food-business licences;</li>
        <li>complying with food-safety and hygiene requirements;</li>
        <li>maintaining appropriate kitchen and storage conditions;</li>
        <li>correctly labelling food;</li>
        <li>managing allergens;</li>
        <li>complying with packaging and legal-metrology requirements;</li>
        <li>maintaining GST and tax registrations;</li>
        <li>complying with labour and employment law;</li>
        <li>complying with municipal and fire-safety requirements;</li>
        <li>maintaining required records; and</li>
        </ul>
        <p className="mb-2">responding to regulators and customers.</p>
        <p className="mb-2">Ordrji does not inspect or certify the Customer’s food, premises, licences, employees or legal compliance.</p>
      </div>
    )
  },
  {
    title: "27. Payment services",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Ordrji may integrate with banks, UPI services, payment gateways, card processors or other payment providers.</p>
        <p className="mb-2">Payment services may be subject to:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>separate provider terms;</li>
        <li>provider verification;</li>
        <li>KYC requirements;</li>
        <li>transaction charges;</li>
        <li>settlement periods;</li>
        <li>reserve requirements;</li>
        <li>refund rules;</li>
        <li>chargebacks;</li>
        <li>provider risk controls; and</li>
        </ul>
        <p className="mb-2">regulatory restrictions.</p>
        <p className="mb-2">Unless expressly agreed otherwise:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>the payment provider processes payment credentials;</li>
        <li>Ordrji does not store full card numbers, CVVs or UPI PINs;</li>
        <li>Ordrji does not guarantee payment authorisation;</li>
        <li>the Customer is responsible for settlement-account accuracy;</li>
        <li>the Customer is responsible for chargebacks and payment disputes relating to its food or services;</li>
        <li>payment-provider downtime is outside Ordrji’s direct control; and</li>
        </ul>
        <p className="mb-2">a successful status displayed by Ordrji should be reconciled against the payment-provider record.</p>
      </div>
    )
  },
  {
    title: "28. Refunds and chargebacks for restaurant orders",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">The Restaurant Customer must establish and communicate its End-Customer refund policy.</p>
        <p className="mb-2">The Restaurant Customer is responsible for:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>deciding whether a restaurant-order refund is due;</li>
        <li>initiating authorised refunds;</li>
        <li>maintaining sufficient settlement balance where required;</li>
        <li>responding to chargeback evidence requests;</li>
        <li>providing invoices or proof of delivery;</li>
        <li>handling duplicate or incorrect restaurant charges; and</li>
        </ul>
        <p className="mb-2">complying with applicable consumer law.</p>
        <p className="mb-2">Ordrji may suspend payment functionality where excessive chargebacks, fraud, unlawful transactions or provider restrictions occur.</p>
      </div>
    )
  },
  {
    title: "29. Subscription fees",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">The Customer must pay all fees stated in the Order Form.</p>
        <p className="mb-2">Fees may include:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>subscription charges;</li>
        <li>per-outlet charges;</li>
        <li>additional-device charges;</li>
        <li>setup fees;</li>
        <li>onboarding fees;</li>
        <li>migration fees;</li>
        <li>hardware charges;</li>
        <li>installation charges;</li>
        <li>premium-support charges;</li>
        <li>messaging credits;</li>
        <li>payment-processing charges;</li>
        <li>online-ordering charges;</li>
        <li>integration fees;</li>
        <li>API fees;</li>
        <li>custom-development fees; and</li>
        </ul>
        <p className="mb-2">applicable taxes.</p>
        <p className="mb-2">Unless expressly stated otherwise, fees are quoted exclusive of GST and other applicable taxes.</p>
      </div>
    )
  },
  {
    title: "30. Billing and payment terms",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Unless the Order Form states otherwise:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>subscription fees are payable in advance;</li>
        <li>invoices are due within the period stated on the invoice;</li>
        <li>monthly subscriptions cover the relevant monthly billing cycle;</li>
        <li>annual subscriptions cover the relevant annual billing cycle;</li>
        <li>usage charges may be billed in arrears;</li>
        <li>late payments may result in suspension;</li>
        <li>the Customer must maintain accurate billing details; and</li>
        </ul>
        <p className="mb-2">bank or payment-provider charges are borne by the Customer.</p>
        <p className="mb-2">Ordrji may apply reasonable collection costs or late-payment charges where permitted by law and disclosed in the Order Form or invoice.</p>
      </div>
    )
  },
  {
    title: "31. Renewal",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">The renewal arrangement stated in the Order Form will control.</p>
        <p className="mb-2">Where a subscription is configured to renew automatically:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>it will renew for the stated renewal period;</li>
        <li>the Customer authorises collection through the saved payment method;</li>
        <li>Ordrji may send a renewal reminder;</li>
        <li>the Customer must cancel within the stated notice period to prevent renewal; and</li>
        </ul>
        <p className="mb-2">failure of automatic payment may result in a grace period or suspension.</p>
        <p className="mb-2">Where auto-renewal is not enabled, the Customer must make payment before expiry to avoid interruption.</p>
      </div>
    )
  },
  {
    title: "32. Price changes",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Ordrji may revise prices for future subscription periods.</p>
        <p className="mb-2">For an existing paid subscription:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>the current prepaid period will ordinarily remain unaffected;</li>
        <li>new pricing may apply at renewal;</li>
        <li>Ordrji will provide reasonable advance notice of a material increase; and</li>
        </ul>
        <p className="mb-2">continued use after renewal constitutes acceptance of the revised price.</p>
        <p className="mb-2">Price changes may occur due to:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>new features;</li>
        <li>increased infrastructure costs;</li>
        <li>third-party charges;</li>
        <li>tax changes;</li>
        <li>messaging or payment costs;</li>
        <li>integration costs;</li>
        <li>inflation;</li>
        <li>regulatory requirements; or</li>
        </ul>
        <p className="mb-2">changes to the Customer’s usage.</p>
      </div>
    )
  },
  {
    title: "33. Subscription refunds",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Unless an Order Form or refund policy states otherwise:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>setup and onboarding fees are non-refundable once work begins;</li>
        <li>migration fees are non-refundable once migration begins;</li>
        <li>hardware charges are governed by the applicable hardware warranty and return policy;</li>
        <li>messaging, SMS, API or usage credits are non-refundable once consumed;</li>
        <li>monthly subscription fees are not refundable for a partially used billing cycle;</li>
        <li>annual fees are not refundable merely because the Customer stops using the Services;</li>
        <li>promotional fees are non-refundable; and</li>
        </ul>
        <p className="mb-2">taxes already deposited with authorities may not be refundable.</p>
        <p className="mb-2">A refund may be provided where:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>required by law;</li>
        <li>expressly promised in a written trial or launch offer;</li>
        <li>Ordrji fails to provision the purchased Service;</li>
        <li>Ordrji permanently discontinues a prepaid Service without offering a reasonable substitute; or</li>
        </ul>
        <p className="mb-2">a signed Order Form provides another refund right.</p>
        <p className="mb-2">Approved refunds may be reduced by:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>Services already provided;</li>
        <li>consumed usage;</li>
        <li>non-refundable third-party charges;</li>
        <li>hardware delivered;</li>
        <li>completed migration or onboarding; and</li>
        </ul>
        <p className="mb-2">applicable taxes.</p>
      </div>
    )
  },
  {
    title: "34. Hardware and peripheral devices",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Ordrji may work with:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>computers;</li>
        <li>POS terminals;</li>
        <li>Android devices;</li>
        <li>tablets;</li>
        <li>thermal printers;</li>
        <li>KOT printers;</li>
        <li>LAN or Wi-Fi printers;</li>
        <li>Bluetooth printers;</li>
        <li>cash drawers;</li>
        <li>barcode scanners;</li>
        <li>label printers;</li>
        <li>customer displays;</li>
        <li>routers;</li>
        <li>kitchen displays; and</li>
        </ul>
        <p className="mb-2">other devices.</p>
        <p className="mb-2">Compatibility may depend on:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>operating system;</li>
        <li>drivers;</li>
        <li>firmware;</li>
        <li>printer language;</li>
        <li>port configuration;</li>
        <li>network setup;</li>
        <li>device quality;</li>
        <li>manufacturer support; and</li>
        </ul>
        <p className="mb-2">local permissions.</p>
        <p className="mb-2">The Customer is responsible for ensuring that its hardware meets published requirements.</p>
      </div>
    )
  },
  {
    title: "35. Third-party hardware",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Where hardware is supplied by a third party:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>the manufacturer’s warranty applies;</li>
        <li>Ordrji does not extend the manufacturer’s warranty unless expressly stated;</li>
        <li>repair or replacement may depend on the manufacturer;</li>
        <li>physical damage, liquid damage, voltage damage and misuse may be excluded;</li>
        <li>replacement timelines may depend on parts and logistics; and</li>
        </ul>
        <p className="mb-2">the Customer should maintain backup hardware for business-critical operations.</p>
        <p className="mb-2">Ordrji may provide reasonable configuration assistance but is not responsible for defects in third-party hardware.</p>
      </div>
    )
  },
  {
    title: "36. Offline operation",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Certain Ordrji POS features may be designed to continue functioning during internet interruption.</p>
        <p className="mb-2">Offline availability may depend on:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>initial account activation;</li>
        <li>prior successful synchronisation;</li>
        <li>local database health;</li>
        <li>device storage;</li>
        <li>local user credentials;</li>
        <li>printer availability;</li>
        <li>operating-system permissions; and</li>
        </ul>
        <p className="mb-2">the enabled module.</p>
        <p className="mb-2">The Customer acknowledges that not every feature may work offline. Cloud dashboards, remote changes, payment gateways, messaging, aggregator integrations and real-time cross-outlet features may require internet access.</p>
      </div>
    )
  },
  {
    title: "37. Local device data",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Where the POS stores information locally:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>the Customer must secure the device;</li>
        <li>local data may remain until synchronised or deleted;</li>
        <li>reinstalling, formatting or replacing the device may remove unsynchronised data;</li>
        <li>the Customer should not manually alter application files or databases;</li>
        <li>the Customer must permit the application to perform required backups and updates;</li>
        <li>unauthorised database modification may corrupt records; and</li>
        </ul>
        <p className="mb-2">Ordrji may not be able to recover data deleted before synchronisation or backup.</p>
        <p className="mb-2">The Customer must notify Ordrji before replacing or resetting a device containing unsynchronised records.</p>
      </div>
    )
  },
  {
    title: "38. Synchronisation",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Ordrji may synchronise local POS data with cloud systems.</p>
        <p className="mb-2">Synchronisation may be delayed by:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>internet interruption;</li>
        <li>power failure;</li>
        <li>device shutdown;</li>
        <li>software conflict;</li>
        <li>insufficient storage;</li>
        <li>account suspension;</li>
        <li>corrupted local data;</li>
        <li>server maintenance;</li>
        <li>third-party integration delay; or</li>
        </ul>
        <p className="mb-2">unsupported manual data changes.</p>
        <p className="mb-2">The Customer should review the sync-status indicator and promptly report repeated failures.</p>
        <p className="mb-2">Ordrji will use reasonable measures intended to reduce duplicate transactions and retry failed synchronisation. However, the Customer remains responsible for reconciliation and should not ignore sync warnings.</p>
      </div>
    )
  },
  {
    title: "39. Printing",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">The Customer is responsible for:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>maintaining paper;</li>
        <li>maintaining printer power;</li>
        <li>maintaining network or cable connections;</li>
        <li>installing compatible drivers;</li>
        <li>checking printer routing;</li>
        <li>reviewing failed-print alerts;</li>
        <li>confirming successful KOT printing;</li>
        <li>maintaining backup printing procedures; and</li>
        </ul>
        <p className="mb-2">preventing unauthorised reprints.</p>
        <p className="mb-2">A print command recorded by the software does not always prove that the physical printer produced a readable document.</p>
        <p className="mb-2">Restaurant staff must monitor printer output during operations.</p>
      </div>
    )
  },
  {
    title: "40. Updates and maintenance",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Ordrji may release:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>security updates;</li>
        <li>bug fixes;</li>
        <li>performance improvements;</li>
        <li>regulatory updates;</li>
        <li>compatibility updates;</li>
        <li>user-interface changes;</li>
        <li>new features; and</li>
        </ul>
        <p className="mb-2">deprecated-feature notices.</p>
        <p className="mb-2">The Customer must install mandatory desktop or mobile updates within the communicated period.</p>
        <p className="mb-2">Ordrji may restrict access to outdated versions where necessary for:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>security;</li>
        <li>data integrity;</li>
        <li>compatibility;</li>
        <li>regulatory compliance;</li>
        <li>integration continuity; or</li>
        </ul>
        <p className="mb-2">platform reliability.</p>
        <p className="mb-2">Where practical, critical billing changes will be tested and introduced gradually.</p>
      </div>
    )
  },
  {
    title: "41. Service availability",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Ordrji will use commercially reasonable efforts to maintain the Services.</p>
        <p className="mb-2">However, unless a signed Service-Level Agreement states otherwise, Ordrji does not guarantee uninterrupted or error-free availability.</p>
        <p className="mb-2">Service interruptions may arise from:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>maintenance;</li>
        <li>software updates;</li>
        <li>internet or telecom failure;</li>
        <li>cloud-provider failure;</li>
        <li>power failure;</li>
        <li>cyberattack;</li>
        <li>hardware failure;</li>
        <li>third-party integration failure;</li>
        <li>payment-provider failure;</li>
        <li>regulatory action;</li>
        <li>force majeure;</li>
        <li>emergency security work; or</li>
        </ul>
        <p className="mb-2">Customer configuration.</p>
        <p className="mb-2">Planned maintenance will ordinarily be communicated when reasonably practical.</p>
      </div>
    )
  },
  {
    title: "42. Service-Level Agreements",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">A guaranteed uptime, response time, resolution time, service credit or dedicated-support commitment applies only where included in a signed Service-Level Agreement or eligible plan.</p>
        <p className="mb-2">Marketing phrases such as:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>priority support;</li>
        <li>dedicated support;</li>
        <li>fast support;</li>
        <li>emergency assistance; or</li>
        </ul>
        <p className="mb-2">human support</p>
        <p className="mb-2">describe the intended support category and do not create a legally guaranteed response time unless a specific measurable commitment is stated in writing.</p>
      </div>
    )
  },
  {
    title: "43. Support",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Support may be provided through:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>telephone;</li>
        <li>WhatsApp;</li>
        <li>email;</li>
        <li>ticketing system;</li>
        <li>remote support;</li>
        <li>knowledge base;</li>
        <li>video tutorials; or</li>
        </ul>
        <p className="mb-2">onsite visits.</p>
        <p className="mb-2">Support coverage depends on the subscription plan.</p>
        <p className="mb-2">The Customer must provide:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>an accurate description of the problem;</li>
        <li>screenshots or logs where appropriate;</li>
        <li>device and printer details;</li>
        <li>authorised remote access where necessary;</li>
        <li>a contact person;</li>
        <li>safe access to onsite equipment; and</li>
        </ul>
        <p className="mb-2">reasonable cooperation.</p>
        <p className="mb-2">Ordrji may prioritise issues according to operational severity.</p>
      </div>
    )
  },
  {
    title: "44. Remote support",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">With Customer authorisation, Ordrji may use remote-access tools to diagnose or resolve issues.</p>
        <p className="mb-2">The Customer must:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>ensure that an authorised person approves the session;</li>
        <li>close unrelated confidential applications;</li>
        <li>supervise the session where reasonably possible;</li>
        <li>avoid displaying payment credentials;</li>
        <li>terminate access when support is completed; and</li>
        </ul>
        <p className="mb-2">inform Ordrji of restrictions before access begins.</p>
        <p className="mb-2">Ordrji will use remote access only for authorised support purposes.</p>
      </div>
    )
  },
  {
    title: "45. Onsite services",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Onsite installation, support or training may be:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>included in a plan;</li>
        <li>limited to specified locations;</li>
        <li>subject to appointment availability;</li>
        <li>subject to travel charges;</li>
        <li>subject to working-hour restrictions; or</li>
        </ul>
        <p className="mb-2">separately chargeable.</p>
        <p className="mb-2">The Customer must provide safe and lawful access to its premises.</p>
        <p className="mb-2">Ordrji personnel may refuse unsafe, abusive or unlawful working conditions.</p>
      </div>
    )
  },
  {
    title: "46. Customer Data ownership",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">As between Ordrji and the Customer:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>the Customer retains ownership of Customer Data;</li>
        <li>Ordrji retains ownership of the Services, software and platform;</li>
        <li>End Customers retain rights in their personal data as provided by law; and</li>
        </ul>
        <p className="mb-2">the relevant Restaurant Customer determines the business purpose for restaurant-controlled End-Customer data.</p>
        <p className="mb-2">The Customer grants Ordrji a limited licence to host, copy, transmit, process, display and otherwise use Customer Data as reasonably necessary to:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>provide the Services;</li>
        <li>fulfil support requests;</li>
        <li>maintain security;</li>
        <li>perform backup and recovery;</li>
        <li>enable authorised integrations;</li>
        <li>comply with law;</li>
        <li>prevent fraud;</li>
        <li>enforce the agreement; and</li>
        </ul>
        <p className="mb-2">improve the Services using aggregated or de-identified information.</p>
      </div>
    )
  },
  {
    title: "47. Personal data and Privacy Policy",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">The Ordrji Privacy Policy forms part of these Terms.</p>
        <p className="mb-2">Depending on the context:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>Ordrji may act as the Data Fiduciary for account, website, subscription and support information;</li>
        <li>the Restaurant Customer may act as the Data Fiduciary for its customer, employee and supplier information; and</li>
        </ul>
        <p className="mb-2">Ordrji may process such restaurant-controlled information as a Data Processor or service provider.</p>
        <p className="mb-2">The Customer is responsible for:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>giving required privacy notices;</li>
        <li>obtaining required consents;</li>
        <li>collecting only necessary personal data;</li>
        <li>responding to End-Customer requests;</li>
        <li>managing marketing preferences;</li>
        <li>honouring opt-outs;</li>
        <li>configuring appropriate access;</li>
        <li>maintaining a lawful purpose for processing; and</li>
        </ul>
        <p className="mb-2">complying with applicable data-protection law.</p>
        <p className="mb-2">Where required, the parties may enter into a separate Data Processing Agreement.</p>
      </div>
    )
  },
  {
    title: "48. Marketing and communications",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Where the Customer uses Ordrji to send:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>WhatsApp messages;</li>
        <li>SMS messages;</li>
        <li>email campaigns;</li>
        <li>loyalty messages;</li>
        <li>promotional offers;</li>
        <li>review requests;</li>
        <li>birthday messages; or</li>
        </ul>
        <p className="mb-2">customer win-back campaigns,</p>
        <p className="mb-2">the Customer is responsible for:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>obtaining required consent;</li>
        <li>maintaining evidence of consent where required;</li>
        <li>respecting opt-outs;</li>
        <li>using accurate sender information;</li>
        <li>complying with platform policies;</li>
        <li>complying with telecom and anti-spam requirements;</li>
        <li>avoiding misleading claims;</li>
        <li>maintaining lawful contact lists; and</li>
        </ul>
        <p className="mb-2">ensuring that messages relate to the Customer’s legitimate business.</p>
        <p className="mb-2">Ordrji may suspend campaign functionality where there is suspected spam, abuse, excessive complaints or platform-policy violation.</p>
      </div>
    )
  },
  {
    title: "49. Data accuracy",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">The Customer is responsible for reviewing the accuracy of:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>menu data;</li>
        <li>tax information;</li>
        <li>customer information;</li>
        <li>inventory records;</li>
        <li>opening balances;</li>
        <li>recipes;</li>
        <li>supplier records;</li>
        <li>payment status;</li>
        <li>financial reports;</li>
        <li>migrated data;</li>
        <li>staff permissions;</li>
        <li>outlet mappings; and</li>
        </ul>
        <p className="mb-2">integration results.</p>
        <p className="mb-2">Analytics and reports are dependent on the accuracy and completeness of underlying data.</p>
      </div>
    )
  },
  {
    title: "50. Data export",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">During an active paid subscription, the Customer may request or use available tools to export supported data.</p>
        <p className="mb-2">Exports may be subject to:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>role permissions;</li>
        <li>identity verification;</li>
        <li>plan limitations;</li>
        <li>supported formats;</li>
        <li>reasonable processing time;</li>
        <li>third-party restrictions;</li>
        <li>technical feasibility; and</li>
        </ul>
        <p className="mb-2">payment of outstanding fees.</p>
        <p className="mb-2">Custom export formats or large historical exports may be chargeable.</p>
        <p className="mb-2">The Customer is responsible for storing exported data securely and maintaining legally required records.</p>
      </div>
    )
  },
  {
    title: "51. Data retention after termination",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Following termination or expiry:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>access may be suspended;</li>
        <li>production data may remain available for a limited export or recovery period;</li>
        <li>the Customer should export required data during that period;</li>
        <li>data may then be deleted or de-identified;</li>
        <li>residual copies may remain in backups until overwritten;</li>
        <li>limited information may be retained for legal, tax, security, fraud-prevention or dispute purposes; and</li>
        </ul>
        <p className="mb-2">unsynchronised local device data may remain on Customer-controlled devices.</p>
        <p className="mb-2">Unless another period is stated in the Order Form or Privacy Policy, Ordrji may ordinarily provide up to 90 days for supported data recovery or export after termination.</p>
      </div>
    )
  },
  {
    title: "52. Data backup",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Ordrji may maintain backups according to its operational policies.</p>
        <p className="mb-2">Backups are intended for disaster recovery and may not:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>restore individual records on demand;</li>
        <li>contain the most recent unsynchronised local data;</li>
        <li>preserve every historical version;</li>
        <li>replace the Customer’s statutory recordkeeping;</li>
        <li>replace the Customer’s export obligations; or</li>
        </ul>
        <p className="mb-2">correct data entered inaccurately by the Customer.</p>
        <p className="mb-2">The Customer should maintain separate exports of legally or commercially critical information.</p>
      </div>
    )
  },
  {
    title: "53. Security",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Ordrji will use reasonable technical and organisational safeguards appropriate to the nature of the Services.</p>
        <p className="mb-2">Safeguards may include:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>encryption in transit;</li>
        <li>access controls;</li>
        <li>secure credential storage;</li>
        <li>role-based permissions;</li>
        <li>audit logs;</li>
        <li>device registration;</li>
        <li>security monitoring;</li>
        <li>backups;</li>
        <li>vulnerability management;</li>
        <li>synchronisation controls;</li>
        <li>incident-response procedures; and</li>
        </ul>
        <p className="mb-2">vendor security requirements.</p>
        <p className="mb-2">No system can be guaranteed completely secure. The Customer must also maintain appropriate physical, operational and account security.</p>
      </div>
    )
  },
  {
    title: "54. Security incidents",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">The Customer must promptly report suspected:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>unauthorised access;</li>
        <li>credential compromise;</li>
        <li>malware;</li>
        <li>data loss;</li>
        <li>suspicious staff activity;</li>
        <li>device theft;</li>
        <li>abnormal transactions;</li>
        <li>unauthorised exports;</li>
        <li>fraudulent refunds; or</li>
        </ul>
        <p className="mb-2">security vulnerabilities.</p>
        <p className="mb-2">The Customer must not publicly disclose an unremediated vulnerability in a manner that creates avoidable risk.</p>
        <p className="mb-2">Ordrji may temporarily restrict access where reasonably necessary to contain a security incident.</p>
      </div>
    )
  },
  {
    title: "55. Confidentiality",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Each party may receive confidential information from the other.</p>
        <p className="mb-2">Confidential information includes:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>non-public pricing;</li>
        <li>product roadmaps;</li>
        <li>software architecture;</li>
        <li>source code;</li>
        <li>security information;</li>
        <li>business plans;</li>
        <li>customer lists;</li>
        <li>financial information;</li>
        <li>restaurant recipes;</li>
        <li>operational information;</li>
        <li>personal data; and</li>
        </ul>
        <p className="mb-2">information marked or reasonably understood as confidential.</p>
        <p className="mb-2">The receiving party must:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>use confidential information only for the agreement;</li>
        <li>protect it with reasonable care;</li>
        <li>disclose it only to personnel and service providers who need it;</li>
        <li>ensure those recipients are bound by confidentiality; and</li>
        </ul>
        <p className="mb-2">not disclose it to third parties without permission.</p>
        <p className="mb-2">Confidentiality obligations do not apply to information that:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>becomes public without breach;</li>
        <li>was already lawfully known;</li>
        <li>is independently developed;</li>
        <li>is received lawfully from another source; or</li>
        </ul>
        <p className="mb-2">must be disclosed by law.</p>
        <p className="mb-2">Where legally permitted, the receiving party will give reasonable advance notice of compulsory disclosure.</p>
      </div>
    )
  },
  {
    title: "56. Ordrji intellectual property",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Ordrji and its licensors own all rights in:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>Ordrji software;</li>
        <li>source code;</li>
        <li>object code;</li>
        <li>interfaces;</li>
        <li>workflows;</li>
        <li>databases;</li>
        <li>designs;</li>
        <li>dashboards;</li>
        <li>documentation;</li>
        <li>templates;</li>
        <li>APIs;</li>
        <li>reports;</li>
        <li>algorithms;</li>
        <li>artificial-intelligence systems;</li>
        <li>trademarks;</li>
        <li>logos;</li>
        <li>domain names;</li>
        <li>training material;</li>
        <li>support material; and</li>
        </ul>
        <p className="mb-2">improvements to the Services.</p>
        <p className="mb-2">Except for the limited licence expressly granted, no intellectual-property right is transferred to the Customer.</p>
      </div>
    )
  },
  {
    title: "57. Customer trademarks and branding",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">The Customer grants Ordrji a limited licence to use its:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>restaurant name;</li>
        <li>logo;</li>
        <li>menu;</li>
        <li>images;</li>
        <li>outlet details; and</li>
        </ul>
        <p className="mb-2">branding</p>
        <p className="mb-2">to provide the Services and display the Customer’s digital menu, QR page, invoice or ordering page.</p>
        <p className="mb-2">Ordrji will not use the Customer’s name or logo in public case studies, advertisements or customer lists without permission, except where:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>the Customer has opted into an early-partner or promotional programme;</li>
        <li>the use is already public through the Customer’s Ordrji-powered page; or</li>
        </ul>
        <p className="mb-2">another written agreement permits it.</p>
      </div>
    )
  },
  {
    title: "58. Feedback",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">If the Customer provides suggestions, ideas, feature requests, workflows or feedback, Ordrji may use them without restriction or payment.</p>
        <p className="mb-2">Feedback will not transfer ownership of the Customer’s confidential business data.</p>
        <p className="mb-2">The Customer should not submit an idea subject to a third party’s confidentiality or intellectual-property restriction.</p>
      </div>
    )
  },
  {
    title: "59. Aggregated and de-identified information",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Ordrji may create aggregated or de-identified information from Service usage.</p>
        <p className="mb-2">Such information may be used to:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>improve performance;</li>
        <li>understand feature adoption;</li>
        <li>develop benchmarks;</li>
        <li>improve fraud detection;</li>
        <li>create industry insights;</li>
        <li>improve support;</li>
        <li>train internal analytical systems;</li>
        <li>forecast infrastructure requirements; and</li>
        </ul>
        <p className="mb-2">develop new products.</p>
        <p className="mb-2">Ordrji will take reasonable steps not to identify an individual or reveal a Customer’s confidential business information through such use.</p>
      </div>
    )
  },
  {
    title: "60. Artificial intelligence and analytical insights",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Where Ordrji provides forecasts, recommendations, anomaly alerts, AI-generated content or business insights:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>they are based on available data and assumptions;</li>
        <li>they may contain errors;</li>
        <li>they may not consider every business factor;</li>
        <li>they are not guaranteed predictions;</li>
        <li>they are not professional accounting, legal, tax or investment advice;</li>
        <li>the Customer must review them before acting; and</li>
        </ul>
        <p className="mb-2">the Customer remains responsible for business decisions.</p>
        <p className="mb-2">Ordrji may restrict AI features where the Customer lacks sufficient or reliable data.</p>
        <p className="mb-2">Unless separately disclosed and authorised, Ordrji will not use identifiable Restaurant Customer or End-Customer personal data to train unrelated third-party general-purpose AI models.</p>
      </div>
    )
  },
  {
    title: "61. Third-Party Services",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">The Customer may connect Ordrji to Third-Party Services, including:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>payment gateways;</li>
        <li>delivery aggregators;</li>
        <li>WhatsApp or messaging providers;</li>
        <li>SMS providers;</li>
        <li>accounting platforms;</li>
        <li>cloud storage;</li>
        <li>analytics tools;</li>
        <li>social platforms;</li>
        <li>hardware manufacturers;</li>
        <li>logistics providers; and</li>
        </ul>
        <p className="mb-2">restaurant marketplaces.</p>
        <p className="mb-2">Third-Party Services are governed by their own terms and privacy policies.</p>
        <p className="mb-2">Ordrji is not responsible for:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>a third party’s availability;</li>
        <li>changes to its API;</li>
        <li>suspension of the Customer’s third-party account;</li>
        <li>third-party fees;</li>
        <li>settlement delays;</li>
        <li>inaccurate third-party data;</li>
        <li>third-party security incidents;</li>
        <li>content removed by the third party;</li>
        <li>changes to third-party policies; or</li>
        </ul>
        <p className="mb-2">discontinuation of an integration.</p>
      </div>
    )
  },
  {
    title: "62. Integration permissions",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">By enabling an integration, the Customer authorises Ordrji to exchange information reasonably necessary to operate that integration.</p>
        <p className="mb-2">The Customer is responsible for:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>possessing a valid third-party account;</li>
        <li>granting correct permissions;</li>
        <li>safeguarding API keys;</li>
        <li>maintaining required subscriptions;</li>
        <li>confirming the lawfulness of transferred data;</li>
        <li>reviewing imported data; and</li>
        </ul>
        <p className="mb-2">disabling access when no longer required.</p>
        <p className="mb-2">Ordrji may disable an integration that creates security, legal, reliability or performance risks.</p>
      </div>
    )
  },
  {
    title: "63. Acceptable use",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">The Services must not be used to:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>violate law;</li>
        <li>commit fraud;</li>
        <li>evade tax;</li>
        <li>create false invoices;</li>
        <li>manipulate payment records;</li>
        <li>conceal unlawful transactions;</li>
        <li>unlawfully monitor employees;</li>
        <li>process stolen data;</li>
        <li>infringe intellectual-property rights;</li>
        <li>distribute malware;</li>
        <li>attack systems;</li>
        <li>send spam;</li>
        <li>harass individuals;</li>
        <li>impersonate another business;</li>
        <li>advertise unlawful goods or services;</li>
        <li>collect unnecessary sensitive information;</li>
        <li>bypass subscription controls;</li>
        <li>interfere with another Customer;</li>
        <li>conduct unauthorised security testing; or</li>
        </ul>
        <p className="mb-2">create material risk to Ordrji or another person.</p>
      </div>
    )
  },
  {
    title: "64. Audit and investigation",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Where Ordrji reasonably suspects misuse, fraud, security risk or a breach of these Terms, Ordrji may:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>request information;</li>
        <li>review relevant logs;</li>
        <li>restrict affected features;</li>
        <li>suspend an Authorised User;</li>
        <li>require credential reset;</li>
        <li>disable a compromised integration;</li>
        <li>preserve relevant records;</li>
        <li>cooperate with lawful authorities; and</li>
        </ul>
        <p className="mb-2">terminate the account for material breach.</p>
        <p className="mb-2">Any review will be limited to what is reasonably necessary for security, compliance and enforcement.</p>
      </div>
    )
  },
  {
    title: "65. Suspension",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Ordrji may suspend some or all Services where:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>fees are overdue;</li>
        <li>the Customer breaches these Terms;</li>
        <li>the account creates a security risk;</li>
        <li>fraud is suspected;</li>
        <li>unlawful activity is suspected;</li>
        <li>a payment provider or authority requires suspension;</li>
        <li>the Customer’s use harms the platform;</li>
        <li>the Customer abuses support personnel;</li>
        <li>required verification is not completed;</li>
        <li>an integration creates material risk; or</li>
        </ul>
        <p className="mb-2">suspension is needed to protect data or other Customers.</p>
        <p className="mb-2">Where reasonably practical, Ordrji will provide notice and an opportunity to cure the issue.</p>
        <p className="mb-2">Immediate suspension may occur where delay would create material risk.</p>
        <p className="mb-2">Suspension does not remove the obligation to pay accrued fees.</p>
      </div>
    )
  },
  {
    title: "66. Term and termination by the Customer",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">The agreement begins when the Customer accepts these Terms and continues until terminated.</p>
        <p className="mb-2">The Customer may terminate:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>according to the Order Form;</li>
        <li>through available account controls;</li>
        <li>by giving the required written notice;</li>
        <li>at the end of the current Subscription Term; or</li>
        </ul>
        <p className="mb-2">for Ordrji’s uncured material breach.</p>
        <p className="mb-2">Unless otherwise stated, cancellation prevents future renewal but does not create a refund for the current prepaid period.</p>
      </div>
    )
  },
  {
    title: "67. Termination by Ordrji",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Ordrji may terminate the agreement:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>for material breach;</li>
        <li>for repeated non-payment;</li>
        <li>for unlawful or fraudulent use;</li>
        <li>for a serious security threat;</li>
        <li>where required by law;</li>
        <li>where a Customer repeatedly abuses staff or support channels;</li>
        <li>where verification information is materially false;</li>
        <li>where the Customer infringes Ordrji’s intellectual property;</li>
        <li>where continued service creates unreasonable legal or technical risk; or</li>
        </ul>
        <p className="mb-2">where Ordrji discontinues the relevant Service.</p>
        <p className="mb-2">Where the breach is capable of remedy, Ordrji will ordinarily provide a reasonable cure period.</p>
      </div>
    )
  },
  {
    title: "68. Effect of termination",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Upon termination:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>the Customer’s licence ends;</li>
        <li>access may be disabled;</li>
        <li>Authorised Users may lose access;</li>
        <li>outstanding fees become payable;</li>
        <li>the Customer should export required data;</li>
        <li>Ordrji may delete or de-identify data after the applicable retention period;</li>
        <li>local applications may become limited or inactive;</li>
        <li>paid third-party services may end; and</li>
        </ul>
        <p className="mb-2">provisions intended to survive will remain effective.</p>
        <p className="mb-2">The following provisions survive termination:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>payment obligations;</li>
        <li>intellectual-property rights;</li>
        <li>confidentiality;</li>
        <li>data-retention rights;</li>
        <li>disclaimers;</li>
        <li>indemnities;</li>
        <li>liability limitations;</li>
        <li>dispute resolution; and</li>
        </ul>
        <p className="mb-2">general contractual provisions.</p>
      </div>
    )
  },
  {
    title: "69. Customer representations and warranties",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">The Customer represents and warrants that:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>it has authority to enter the agreement;</li>
        <li>information provided to Ordrji is accurate;</li>
        <li>it has required business registrations and licences;</li>
        <li>it has rights to Customer Data;</li>
        <li>its processing of personal data is lawful;</li>
        <li>its menu and advertising content is accurate;</li>
        <li>it will use the Services lawfully;</li>
        <li>it will not infringe third-party rights;</li>
        <li>it will configure taxes and prices accurately;</li>
        <li>it will supervise Authorised Users; and</li>
        </ul>
        <p className="mb-2">it will maintain reasonable business-continuity procedures.</p>
      </div>
    )
  },
  {
    title: "70. Limited Ordrji warranty",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">During a paid Subscription Term, Ordrji warrants that it will provide the Services:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>substantially according to applicable documentation;</li>
        <li>using reasonable skill and care;</li>
        <li>subject to the selected plan;</li>
        <li>subject to these Terms; and</li>
        </ul>
        <p className="mb-2">subject to Customer cooperation and compatible systems.</p>
        <p className="mb-2">If the Customer reports a reproducible material failure, Ordrji’s primary obligation will be to use reasonable efforts to:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>correct the failure;</li>
        <li>provide a workaround;</li>
        <li>restore the affected Service; or</li>
        </ul>
        <p className="mb-2">where correction is not reasonably possible, terminate the affected Service and provide an appropriate prepaid credit or refund for the unusable period.</p>
      </div>
    )
  },
  {
    title: "71. Disclaimers",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Except for the limited warranty expressly stated, the Services are provided on an “as available” basis to the maximum extent permitted by law.</p>
        <p className="mb-2">Ordrji does not warrant that:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>the Services will be completely uninterrupted;</li>
        <li>every defect will be corrected immediately;</li>
        <li>every device or printer will be compatible;</li>
        <li>every integration will remain available;</li>
        <li>every report will be error-free where source data is inaccurate;</li>
        <li>every message will be delivered;</li>
        <li>every online payment will succeed;</li>
        <li>every forecast or recommendation will be correct;</li>
        <li>the Services will meet every Customer-specific requirement; or</li>
        </ul>
        <p className="mb-2">use of the Services alone will increase revenue or profitability.</p>
        <p className="mb-2">No oral statement creates a warranty unless included in a written agreement signed by an authorised Ordrji representative.</p>
      </div>
    )
  },
  {
    title: "72. Business-continuity responsibility",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Because restaurant operations are time-sensitive, the Customer must maintain reasonable fallback arrangements, which may include:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>backup internet;</li>
        <li>backup power;</li>
        <li>spare printer;</li>
        <li>manual KOT process;</li>
        <li>emergency invoice procedure;</li>
        <li>backup device;</li>
        <li>printed menu;</li>
        <li>payment alternative;</li>
        <li>regular exports; and</li>
        </ul>
        <p className="mb-2">trained staff procedures.</p>
        <p className="mb-2">Ordrji’s offline features and backups assist business continuity but do not replace the Customer’s own contingency planning.</p>
      </div>
    )
  },
  {
    title: "73. Indemnity by the Customer",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">To the extent permitted by law, the Customer will defend, indemnify and hold harmless Ordrji, its affiliates, directors, officers, employees and representatives from third-party claims, losses, liabilities, penalties, damages and reasonable legal costs arising from:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>the Customer’s food, products or restaurant services;</li>
        <li>food-safety or allergen incidents;</li>
        <li>inaccurate menus or pricing;</li>
        <li>the Customer’s legal or regulatory non-compliance;</li>
        <li>Customer Data;</li>
        <li>unlawful marketing communications;</li>
        <li>intellectual-property infringement by Customer content;</li>
        <li>misuse by Authorised Users;</li>
        <li>fraudulent or unlawful transactions;</li>
        <li>tax or invoice errors caused by Customer configuration;</li>
        <li>End-Customer disputes attributable to the Restaurant Customer;</li>
        <li>violation of a Third-Party Service’s terms; or</li>
        </ul>
        <p className="mb-2">the Customer’s breach of these Terms.</p>
        <p className="mb-2">Ordrji will provide reasonable notice of an indemnified claim and permit the Customer to participate in its defence, subject to Ordrji’s right to protect its own interests.</p>
      </div>
    )
  },
  {
    title: "74. Exclusion of indirect damages",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">To the maximum extent permitted by law, neither party will be liable for:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>indirect damages;</li>
        <li>special damages;</li>
        <li>incidental damages;</li>
        <li>punitive damages;</li>
        <li>loss of goodwill;</li>
        <li>loss of anticipated savings;</li>
        <li>loss of opportunity;</li>
        <li>loss of profits;</li>
        <li>loss caused by business interruption; or</li>
        </ul>
        <p className="mb-2">loss of data not caused by that party’s breach of its express obligations,</p>
        <p className="mb-2">even if advised that such loss may occur.</p>
        <p className="mb-2">This exclusion does not apply where such liability cannot lawfully be excluded.</p>
      </div>
    )
  },
  {
    title: "75. Limitation of liability",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">To the maximum extent permitted by law, Ordrji’s total aggregate liability arising from or relating to the Services will not exceed:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>the total subscription fees actually paid by the Customer to Ordrji for the affected Services during the 12 months immediately preceding the event giving rise to the claim.</li>
        </ul>
        <p className="mb-2">For a free trial or unpaid Service, Ordrji’s aggregate liability will not exceed ₹10,000.</p>
        <p className="mb-2">The limitation will not apply to liability that cannot be limited under applicable law.</p>
        <p className="mb-2">Nothing in these Terms excludes liability for:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>fraud;</li>
        <li>wilful misconduct;</li>
        <li>death or personal injury caused by negligence where such exclusion is prohibited; or</li>
        </ul>
        <p className="mb-2">another liability that applicable law does not permit the parties to exclude.</p>
      </div>
    )
  },
  {
    title: "76. No double recovery",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">A Customer may not recover more than once for the same loss.</p>
        <p className="mb-2">Any:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>refund;</li>
        <li>service credit;</li>
        <li>insurance payment;</li>
        <li>third-party recovery; or</li>
        </ul>
        <p className="mb-2">amount already reimbursed</p>
        <p className="mb-2">will be taken into account when calculating recoverable loss.</p>
      </div>
    )
  },
  {
    title: "77. Force majeure",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Neither party will be liable for delay or failure caused by an event beyond its reasonable control, including:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>natural disaster;</li>
        <li>flood;</li>
        <li>fire;</li>
        <li>epidemic;</li>
        <li>pandemic;</li>
        <li>war;</li>
        <li>terrorism;</li>
        <li>riot;</li>
        <li>civil disturbance;</li>
        <li>government action;</li>
        <li>internet failure;</li>
        <li>telecom failure;</li>
        <li>power-grid failure;</li>
        <li>cloud-provider outage;</li>
        <li>cyberattack not caused by failure to use reasonable safeguards;</li>
        <li>labour disruption;</li>
        <li>supply-chain interruption; or</li>
        </ul>
        <p className="mb-2">failure of essential third-party infrastructure.</p>
        <p className="mb-2">The affected party will use reasonable efforts to reduce the effect of the event.</p>
        <p className="mb-2">Payment obligations for Services already provided are not excused by force majeure.</p>
      </div>
    )
  },
  {
    title: "78. Changes to the Services",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Ordrji may modify the Services to:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>improve functionality;</li>
        <li>improve security;</li>
        <li>comply with law;</li>
        <li>address technical risk;</li>
        <li>maintain third-party compatibility;</li>
        <li>remove obsolete features;</li>
        <li>improve usability; or</li>
        </ul>
        <p className="mb-2">introduce new products.</p>
        <p className="mb-2">Where a change materially reduces a paid core feature during the current Subscription Term, Ordrji will use reasonable efforts to:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>provide advance notice;</li>
        <li>offer a reasonable alternative;</li>
        <li>continue the feature for a transition period; or</li>
        </ul>
        <p className="mb-2">provide an appropriate remedy.</p>
        <p className="mb-2">Roadmap statements do not create a binding obligation to release a feature by a specific date.</p>
      </div>
    )
  },
  {
    title: "79. Changes to these Terms",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Ordrji may update these Terms for:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>legal changes;</li>
        <li>new products;</li>
        <li>security requirements;</li>
        <li>pricing structures;</li>
        <li>operational changes;</li>
        <li>third-party integrations; or</li>
        </ul>
        <p className="mb-2">clarification.</p>
        <p className="mb-2">The revised Terms will display an updated date.</p>
        <p className="mb-2">Where a change materially affects an existing paid Customer, Ordrji will provide reasonable notice through:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>email;</li>
        <li>account dashboard;</li>
        <li>application notification;</li>
        <li>website notice; or</li>
        </ul>
        <p className="mb-2">another appropriate channel.</p>
        <p className="mb-2">Continued use after the effective date constitutes acceptance, except where law or a signed agreement requires express acceptance.</p>
      </div>
    )
  },
  {
    title: "80. Electronic communications",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">The Customer consents to receiving contractual and service communications electronically, including:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>account notices;</li>
        <li>invoices;</li>
        <li>renewal notices;</li>
        <li>support communications;</li>
        <li>security alerts;</li>
        <li>legal notices;</li>
        <li>product changes; and</li>
        </ul>
        <p className="mb-2">policy updates.</p>
        <p className="mb-2">Electronic communications may be sent through:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>registered email;</li>
        <li>dashboard notification;</li>
        <li>application notification;</li>
        <li>WhatsApp;</li>
        <li>SMS; or</li>
        </ul>
        <p className="mb-2">the Ordrji website.</p>
        <p className="mb-2">The Customer must keep contact information current.</p>
      </div>
    )
  },
  {
    title: "81. Legal notices",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Formal legal notices to Ordrji must be sent to:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>SYNCKRAFT TECHNOLOGIES PVT. LTD.Operating as OrdrjiRegistered office: 414, 4th Floor, Daga Plazzo Biyani Sqaure, opp. Dmart Camp, Amravati, Maharashtra 444602Email: legal@ordrji.com</li>
        </ul>
        <p className="mb-2">A notice is considered received according to the delivery method and applicable law.</p>
        <p className="mb-2">Routine support requests sent as legal notices will continue to be handled through support procedures.</p>
      </div>
    )
  },
  {
    title: "82. Assignment",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">The Customer may not assign or transfer the agreement without Ordrji’s prior written consent, except as part of a genuine transfer of substantially all of the Customer’s relevant business, subject to:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>written notice;</li>
        <li>verification;</li>
        <li>settlement of outstanding fees;</li>
        <li>the successor accepting the agreement; and</li>
        </ul>
        <p className="mb-2">applicable law.</p>
        <p className="mb-2">Ordrji may assign the agreement to an affiliate or in connection with:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>restructuring;</li>
        <li>financing;</li>
        <li>merger;</li>
        <li>acquisition;</li>
        <li>sale of business; or</li>
        </ul>
        <p className="mb-2">transfer of relevant assets.</p>
      </div>
    )
  },
  {
    title: "83. Subcontractors",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Ordrji may use affiliates, employees, contractors and service providers to provide the Services.</p>
        <p className="mb-2">Ordrji remains responsible for its contractual obligations to the extent stated in these Terms.</p>
        <p className="mb-2">Data-processing vendors will be managed according to the Privacy Policy and applicable Data Processing Agreement.</p>
      </div>
    )
  },
  {
    title: "84. Independent contractors",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">The parties are independent contractors.</p>
        <p className="mb-2">These Terms do not create:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>employment;</li>
        <li>partnership;</li>
        <li>agency;</li>
        <li>franchise;</li>
        <li>joint venture;</li>
        <li>fiduciary relationship; or</li>
        </ul>
        <p className="mb-2">exclusive relationship.</p>
        <p className="mb-2">Neither party may bind the other without written authority.</p>
      </div>
    )
  },
  {
    title: "85. No third-party beneficiaries",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Except where expressly stated, these Terms do not give rights to a person who is not a party to the agreement.</p>
        <p className="mb-2">This provision does not remove any independent statutory right held by an End Customer or another person.</p>
      </div>
    )
  },
  {
    title: "86. Waiver",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">A failure or delay in enforcing a provision does not waive that provision.</p>
        <p className="mb-2">A waiver must be in writing and applies only to the specific situation described.</p>
      </div>
    )
  },
  {
    title: "87. Severability",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">If a provision is found invalid, illegal or unenforceable:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>it will be modified to the minimum extent necessary;</li>
        <li>the remaining provisions will continue in effect; and</li>
        </ul>
        <p className="mb-2">the parties will preserve the original commercial intent as far as legally possible.</p>
      </div>
    )
  },
  {
    title: "88. Entire agreement",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">The contract documents identified in Section 3 constitute the entire agreement concerning the Services and replace prior discussions, proposals or communications on the same subject.</p>
        <p className="mb-2">This does not exclude liability for fraud or fraudulent misrepresentation.</p>
      </div>
    )
  },
  {
    title: "89. Interpretation",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">In these Terms:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>headings are for convenience only;</li>
        <li>“including” means “including without limitation”;</li>
        <li>singular includes plural and vice versa;</li>
        <li>a reference to law includes amendments and replacements;</li>
        <li>“written” includes an electronic record where legally recognised;</li>
        <li>“days” means calendar days unless stated otherwise; and</li>
        </ul>
        <p className="mb-2">an obligation not to do something includes an obligation not to permit it.</p>
      </div>
    )
  },
  {
    title: "90. Governing law",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">These Terms are governed by the laws of India.</p>
        <p className="mb-2">The parties will attempt in good faith to resolve a dispute through direct discussion before commencing formal proceedings.</p>
      </div>
    )
  },
  {
    title: "91. Dispute-notice procedure",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Before beginning arbitration, a party must ordinarily send a written dispute notice describing:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>the nature of the dispute;</li>
        <li>relevant facts;</li>
        <li>the requested remedy;</li>
        <li>supporting documents; and</li>
        </ul>
        <p className="mb-2">an authorised contact person.</p>
        <p className="mb-2">The parties will attempt to resolve the dispute within 30 days after receipt of the notice.</p>
        <p className="mb-2">Either party may seek urgent interim or protective relief where waiting would cause material harm.</p>
      </div>
    )
  },
  {
    title: "92. Arbitration",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">If a business dispute is not resolved through discussion, it will be referred to arbitration under the Arbitration and Conciliation Act, 1996, as amended.</p>
        <p className="mb-2">The arbitration will be conducted as follows:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>the tribunal will consist of one arbitrator;</li>
        <li>the arbitrator will be mutually appointed by the parties;</li>
        <li>if the parties cannot agree, appointment will be made according to the Arbitration and Conciliation Act, 1996;</li>
        <li>the seat and legal place of arbitration will be Amravati, Maharashtra, India;</li>
        <li>hearings may be conducted physically or through video conference;</li>
        <li>the language will be English;</li>
        <li>the award will be written and reasoned;</li>
        <li>the proceedings will be confidential; and</li>
        </ul>
        <p className="mb-2">arbitration costs will be allocated by the arbitrator.</p>
        <p className="mb-2">This clause applies primarily to commercial disputes between Ordrji and Restaurant Customers.</p>
      </div>
    )
  },
  {
    title: "93. Court jurisdiction",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Subject to the arbitration clause and mandatory law, courts having jurisdiction over Amravati, Maharashtra will have exclusive jurisdiction over:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>interim relief;</li>
        <li>enforcement;</li>
        <li>non-arbitrable disputes; and</li>
        </ul>
        <p className="mb-2">proceedings permitted under applicable arbitration law.</p>
      </div>
    )
  },
  {
    title: "94. Consumer-law protection",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Nothing in these Terms:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>excludes a mandatory consumer right;</li>
        <li>prevents an eligible consumer from approaching a consumer commission;</li>
        <li>excludes liability that cannot legally be excluded;</li>
        <li>permits unfair trade practices;</li>
        <li>validates misleading advertising; or</li>
        </ul>
        <p className="mb-2">limits a statutory remedy that cannot be waived.</p>
        <p className="mb-2">Where an End Customer qualifies as a consumer under applicable law, mandatory consumer-protection law will prevail over an inconsistent contractual provision.</p>
      </div>
    )
  },
  {
    title: "95. Grievance redressal",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Questions, complaints or grievances concerning the Services may be submitted to:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>Grievance Officer: ASIYA IMRAN SHAIKHDesignation: Software DeveloperCompany: SYNCKRAFT TECHNOLOGIES PVT. LTD.Brand: OrdrjiAddress: 414, 4th Floor, Daga Plazzo Biyani Sqaure, opp. Dmart Camp, Amravati, Maharashtra 444602Email: [legal@ordrji.com]Support email: hello@ordrji.comPrivacy email: privacy@ordrji.comPhone/WhatsApp: +91 90044 02006Business hours: [11AM to 6PM , Monday to Saturday]</li>
        </ul>
        <p className="mb-2">The complaint should include:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1 mb-4">
        <li>Customer name;</li>
        <li>restaurant or outlet name;</li>
        <li>registered email or mobile number;</li>
        <li>description of the issue;</li>
        <li>relevant invoice or order reference;</li>
        <li>supporting screenshots or documents; and</li>
        </ul>
        <p className="mb-2">requested resolution.</p>
        <p className="mb-2">Ordrji aims to acknowledge complaints promptly and resolve them within the period published in its grievance process or required by applicable law.</p>
      </div>
    )
  },
  {
    title: "96. Contact information",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">SYNCKRAFT TECHNOLOGIES PVT. LTD.Operating under the brand name Ordrji</p>
        <p className="mb-2"><strong>Registered office:</strong> 414, 4th Floor, Daga Plazzo Biyani Sqaure, opp. Dmart Camp, Amravati, Maharashtra 444602CIN: U62020MH2026PTC467409GSTIN: 27ABSCS6491B1ZVWebsite: ordrji.comGeneral email: hello@ordrji.comSales email: sales@ordrji.comPrivacy email: privacy@ordrji.comLegal email: [legal@ordrji.com]Phone/WhatsApp: +91 90044 02006</p>
      </div>
    )
  },
  {
    title: "END-CUSTOMER ORDERING TERMS",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">The following compact terms should also appear on Ordrji-powered QR and online-ordering pages.</p>
      </div>
    )
  },
  {
    title: "1. Restaurant transaction",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Your order is placed directly with the restaurant identified on the ordering page. Ordrji provides the ordering technology and is not the seller or manufacturer of the food.</p>
      </div>
    )
  },
  {
    title: "2. Menu and availability",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">The restaurant controls menu items, prices, taxes, ingredients, availability and preparation times. Items may become unavailable after an order is submitted.</p>
      </div>
    )
  },
  {
    title: "3. Order acceptance",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Submitting an order does not guarantee acceptance. The restaurant may reject or modify an order because of item availability, operating hours, delivery area, payment failure or another reasonable operational reason.</p>
      </div>
    )
  },
  {
    title: "4. Food information",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Contact the restaurant before ordering where you have an allergy, intolerance or dietary requirement. Ordrji does not prepare the food and cannot verify ingredients or kitchen practices.</p>
      </div>
    )
  },
  {
    title: "5. Payment",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Payments may be processed by an independent payment provider. Do not share your UPI PIN, CVV or online-banking password with the restaurant or Ordrji.</p>
      </div>
    )
  },
  {
    title: "6. Cancellation and refund",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">The restaurant’s displayed cancellation and refund policy applies. Refund timing may also depend on the bank or payment provider.</p>
      </div>
    )
  },
  {
    title: "7. Delivery and pickup",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Preparation and delivery times are estimates. The restaurant or its delivery provider is responsible for food preparation and delivery.</p>
      </div>
    )
  },
  {
    title: "8. Complaints",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Food, order, delivery and refund complaints should first be directed to the restaurant. Technical issues with the ordering page may be reported to Ordrji.</p>
      </div>
    )
  },
  {
    title: "9. Privacy",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Personal data is handled according to the restaurant’s privacy notice and the Ordrji Privacy Policy.</p>
      </div>
    )
  },
  {
    title: "10. Mandatory rights",
    body: (
      <div className="flex flex-col">
        <p className="mb-2">Nothing in these terms limits rights available under applicable consumer law.</p>
      </div>
    )
  }
];

export default function TermsPage() {
  return (
    <LegalPage
      badge="Legal"
      title="Terms of Service"
      subtitle="Please read these terms carefully before using the Ordrji platform."
      lastUpdated="15 July 2026"
      sections={SECTIONS}
    />
  );
}
