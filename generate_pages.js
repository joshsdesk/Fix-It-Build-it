const fs = require('fs');
const path = require('path');

const pages = [
  {
    path: 'app/services/page.tsx',
    title: 'Specialty Code 677 Non-Structural Adaptations',
    eyebrow: 'Service Scope',
    subtitle: 'Sensory-informed, surface-mounted, and joist-anchored home accessibility adaptations.',
    contentSections: [
      {
        title: 'Joist-Anchored Swing Mounts',
        desc: 'Heavy-duty ceiling joist mounts for high-impact sensory seekers.'
      },
      {
        title: 'Baltic Birch French Cleat Tracks',
        desc: 'Modular, adjustable tracking systems for sensory equipment.'
      },
      {
        title: 'Tension Posts',
        desc: 'Zero-penetration vertical mounts for renter-friendly setups.'
      },
      {
        title: 'Acoustic Felt Dampening',
        desc: 'Sound-absorbing treatments for noise reduction and sensory calming.'
      },
      {
        title: 'Tactile Stations',
        desc: 'Custom-designed textured zones for tactile engagement.'
      },
      {
        title: 'Zero-VOC Finishes',
        desc: 'Non-toxic, safe coatings used on all fabricated elements.'
      },
      {
        title: 'Padded Nooks',
        desc: 'Safe, enclosed spaces for decompression and regulation.'
      },
      {
        title: 'Mandatory General Contractor Auditor Exclusion Clause',
        desc: 'Strict adherence to non-structural limits under Specialty Code 677.'
      }
    ],
    bentoText: 'Summary of non-structural safety standards and Enrollment Pending notice.',
    metaTitle: 'Services | FIX IT, BUILD IT COLORADO LLC'
  },
  {
    path: 'app/packages/page.tsx',
    title: 'Modular Sensory Equipment & Adaptation Packages',
    eyebrow: 'Equipment & Packages',
    subtitle: 'Pre-configured sensory spatial solutions tailored for renters, homeowners, and clinics.',
    contentSections: [
      {
        title: 'Tier 1: Renter & HOA Zero-Penetration Line',
        desc: 'Cleat tracks and tension posts for leased properties without structural changes.'
      },
      {
        title: 'Tier 2: Homeowner Custom Rigs',
        desc: 'Joist-anchored swings, wall climbers, and permanent built-ins.'
      },
      {
        title: 'Tier 3: Decompression & Sensory Nooks',
        desc: 'Acoustic felt, padded safety walls, and enclosed calming spaces.'
      }
    ],
    bentoText: 'Winnie Dunn 4-Quadrant sensory alignment summary and custom quote CTA.',
    metaTitle: 'Service Packages | FIX IT, BUILD IT COLORADO LLC'
  },
  {
    path: 'app/funding/page.tsx',
    title: 'Payment, Waiver & Funding Pathways',
    eyebrow: 'Funding Options',
    subtitle: 'Navigating Health First Colorado HCBS Waivers, private pay credits, and alternative grants.',
    contentSections: [
      {
        title: 'Medicaid HCBS Waivers',
        desc: 'CES, SLS, and BI waivers processed via CMA PAR bids.'
      },
      {
        title: 'Private Pay',
        desc: '$250 in-home audit credited 100% toward the final build.'
      },
      {
        title: 'HSA/FSA Eligibility',
        desc: 'Guidance on using health savings accounts for qualifying sensory adaptations.'
      },
      {
        title: 'Alternative Grants',
        desc: 'FSSP, HBF, UHCCF, and Chive Charities for funding cap overages.'
      }
    ],
    bentoText: 'Financial transparency statement and Case Manager intake link.',
    metaTitle: 'Funding | FIX IT, BUILD IT COLORADO LLC'
  },
  {
    path: 'app/unmet-needs/page.tsx',
    title: 'Unmet Needs & Complex Adaptation Hub',
    eyebrow: 'Resource Hub',
    subtitle: 'Solutions for families and case managers navigating sensory safety challenges and waiver cap overages.',
    contentSections: [
      {
        title: 'Bridging the $14,000 HCBS Lifecycle Cap',
        desc: 'Strategies and alternative funding pathways for intensive adaptations.'
      },
      {
        title: 'Custom Engineering for Severe Behaviors',
        desc: 'Non-structural adaptations for elopement, pica, and SIBs (Self-Injurious Behaviors).'
      },
      {
        title: 'Multi-Disciplinary Collaboration',
        desc: 'Working alongside OT and BCBA professionals with Letters of Medical Necessity (LMN).'
      }
    ],
    bentoText: 'Direct Case Manager PAR bid request card.',
    metaTitle: 'Unmet Needs | FIX IT, BUILD IT COLORADO LLC'
  },
  {
    path: 'app/sensory-wizard/page.tsx',
    title: 'Smart Sensory Wizard Intake Estimator',
    eyebrow: 'Intake Estimator',
    subtitle: 'A 2-minute interactive audit matching environmental friction to sensory adaptations.',
    contentSections: [
      {
        title: 'Embedded Sensory Wizard',
        desc: 'Interactive component mapping sensory needs to structural solutions.'
      },
      {
        title: 'Step-by-Step Intake Progress',
        desc: 'Guided questionnaire targeting friction points in the home.'
      },
      {
        title: 'Private Pay vs. Medicaid CMA Pathway',
        desc: 'Estimator comparing out-of-pocket costs with waiver funding pathways.'
      }
    ],
    bentoText: 'Data privacy notice (HIPAA non-PHI masking) and submit gate.',
    metaTitle: 'Sensory Wizard | FIX IT, BUILD IT COLORADO LLC'
  },
  {
    path: 'app/about/page.tsx',
    title: 'About FIX IT, BUILD IT COLORADO LLC',
    eyebrow: 'About Us',
    subtitle: '15+ years of master carpentry combined with lived parent experience raising a neurodivergent child.',
    contentSections: [
      {
        title: 'Josh Bourassa Profile',
        desc: 'Lead Craftsman dedicated to functional, sensory-safe home environments.'
      },
      {
        title: 'The "All-Access" Philosophy',
        desc: 'We never turn away a family based on "levels" or severity of support needs.'
      },
      {
        title: 'Clinical Partnership Pledge',
        desc: 'Committed to executing designs approved by OT and BCBA professionals.'
      }
    ],
    bentoText: 'Quality assurance attestation, pending approval notice, and craftsman sign-off.',
    metaTitle: 'About Us | FIX IT, BUILD IT COLORADO LLC'
  },
  {
    path: 'app/grievance-policy/page.tsx',
    title: 'Client Grievance & Complaint Resolution Policy',
    eyebrow: 'Company Policy',
    subtitle: 'Our formal commitment to transparent intake, thorough investigation, and timely resolution.',
    contentSections: [
      {
        title: 'Step 1: Intake & Logging',
        desc: 'Formal process for documenting and tracking client complaints.'
      },
      {
        title: 'Step 2: Investigation & Corrective Action',
        desc: 'Objective review and implementation of remediating actions.'
      },
      {
        title: 'Mandatory 15-Day Written Resolution SLA',
        desc: 'Strict timeline ensuring clients receive a documented resolution.'
      },
      {
        title: 'HCPF & State Appeal Contact Info',
        desc: 'Resources for escalating grievances to state regulatory agencies.'
      }
    ],
    bentoText: 'Official compliance attestation block.',
    metaTitle: 'Grievance Policy | FIX IT, BUILD IT COLORADO LLC'
  },
  {
    path: 'app/hepa-policy/page.tsx',
    title: 'HEPA Dust Containment & Clean-Build Protocol',
    eyebrow: 'Safety Protocol',
    subtitle: 'Infection control, zero-VOC materials, and off-site pre-fabrication for sensitive home environments.',
    contentSections: [
      {
        title: '80%+ Off-Site Shop Pre-Fabrication',
        desc: 'Minimizing in-home noise and dust by building off-site.'
      },
      {
        title: 'Negative Pressure HEPA Air Scrubbing',
        desc: 'Medical-grade dust containment during installation.'
      },
      {
        title: 'Zero-VOC & Non-Toxic Baltic Birch Materials',
        desc: 'Safe, sustainable woods and finishes for sensitive respiratory systems.'
      },
      {
        title: 'Post-Install Sanitization',
        desc: 'Thorough cleaning protocol prior to project handoff.'
      }
    ],
    bentoText: 'Clean-build safety pledge.',
    metaTitle: 'HEPA Policy | FIX IT, BUILD IT COLORADO LLC'
  },
  {
    path: 'app/privacy/page.tsx',
    title: 'HIPAA & Multi-Tenant Data Privacy Policy',
    eyebrow: 'Privacy Policy',
    subtitle: 'How FIX IT, BUILD IT COLORADO LLC protects client personal and health information.',
    contentSections: [
      {
        title: 'PII/PHI Handling & Non-PHI Masking',
        desc: 'Strict protocols for data sanitization and anonymization.'
      },
      {
        title: 'Cloudflare Encrypted Storage',
        desc: 'Secure, multi-tenant cloud infrastructure for data protection.'
      },
      {
        title: 'Form Submission Security',
        desc: 'End-to-end encryption for all intake and PAR requests.'
      },
      {
        title: 'Third-Party Non-Disclosure',
        desc: 'Commitment to never sell or unauthorized share of client data.'
      }
    ],
    bentoText: 'Privacy officer contact info and data security seal.',
    metaTitle: 'Privacy Policy | FIX IT, BUILD IT COLORADO LLC'
  },
  {
    path: 'app/non-discrimination/page.tsx',
    title: 'Non-Discrimination & Accessibility Statement',
    eyebrow: 'Accessibility',
    subtitle: 'Equal access to services regardless of race, disability, age, income, or waiver status.',
    contentSections: [
      {
        title: 'ADA Title III Compliance',
        desc: 'Commitment to public accommodation and equal service access.'
      },
      {
        title: 'Section 504 Declaration',
        desc: 'Compliance with federal laws prohibiting discrimination based on disability.'
      },
      {
        title: 'Website Accessibility Features',
        desc: 'WCAG alignment and assistive technology support.'
      },
      {
        title: 'Accommodation Request Intake',
        desc: 'Process for requesting specific communication or physical accommodations.'
      }
    ],
    bentoText: 'Accessibility officer contact details.',
    metaTitle: 'Non-Discrimination | FIX IT, BUILD IT COLORADO LLC'
  },
  {
    path: 'app/terms/page.tsx',
    title: 'Terms of Service & Workmanship Warranty',
    eyebrow: 'Legal Terms',
    subtitle: 'Operating terms, installation warranties, and scope boundaries under Specialty Code 677.',
    contentSections: [
      {
        title: '1-Year Workmanship Warranty',
        desc: 'Guarantee on installation integrity and structural safety.'
      },
      {
        title: 'Landlord & HOA Consent Requirements',
        desc: 'Client responsibilities for obtaining property modification approvals.'
      },
      {
        title: 'Scope Limits (Non-Structural Only)',
        desc: 'Strict adherence to EAA guidelines excluding load-bearing alterations.'
      },
      {
        title: 'Liability Disclaimers',
        desc: 'Limitations of liability related to equipment use and wear-and-tear.'
      }
    ],
    bentoText: 'Service agreement summary.',
    metaTitle: 'Terms of Service | FIX IT, BUILD IT COLORADO LLC'
  },
  {
    path: 'app/payment-terms/page.tsx',
    title: 'Payment Terms & Conditional Lien Release Policy',
    eyebrow: 'Financial Policy',
    subtitle: 'Transparent financial schedules, Medicaid waiver billing, and lien waiver practices.',
    contentSections: [
      {
        title: 'Private Pay Deposit Schedules',
        desc: 'Standard milestone payment terms for out-of-pocket adaptations.'
      },
      {
        title: 'Medicaid Waiver PAR Billing Mechanics',
        desc: 'Direct CMA invoicing upon successful final inspection.'
      },
      {
        title: 'Levelset Conditional Lien Waiver Issuance',
        desc: 'Automated lien waivers provided upon receipt of payment.'
      },
      {
        title: 'Invoicing Terms',
        desc: 'Net-30 timelines and late payment procedures.'
      }
    ],
    bentoText: 'Financial compliance attestation.',
    metaTitle: 'Payment Terms | FIX IT, BUILD IT COLORADO LLC'
  }
];

pages.forEach(page => {
  const fileContent = `import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PendingApprovalStamp } from '@/components/ui/rubber-stamp/PendingApprovalStamp';

export const metadata: Metadata = {
  title: "${page.metaTitle}",
  description: "${page.subtitle}",
};

export default function StandalonePage() {
  return (
    <>
      <Header />
      <div className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto text-slate-200">
        {/* Hero Header */}
        <div className="flex flex-col items-center text-center gap-2 relative mb-12">
          <h3 className="text-sm tracking-widest text-white/50 uppercase font-bold mb-2">${page.eyebrow}</h3>
          <div className="h-px w-32 bg-fibi-accent/30 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-thin tracking-tight leading-tight">
            ${page.title}
          </h1>
          <p className="text-slate-400 text-sm md:text-lg font-light max-w-3xl leading-relaxed mx-auto">
            ${page.subtitle}
          </p>
        </div>

        {/* Content Sections */}
        <div className="prose prose-invert max-w-none mb-12 space-y-8">
${page.contentSections.map(sec => `          <div className="p-6 rounded-2xl glass-card border-white/5 border-b-fibi-accent/20">
            <h2 className="text-2xl font-bold text-white mb-2">${sec.title}</h2>
            <p className="text-slate-400">${sec.desc}</p>
          </div>`).join('\n')}
        </div>

        {/* Bottom Bento Container */}
        <div className="w-full max-w-4xl mx-auto mt-12 rounded-2xl bg-gradient-to-r from-fibi-accent/20 to-fibi-purple/20 border border-white/10 p-4 md:p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/imgs/UI/noise.png')] opacity-20 mix-blend-overlay" />
          <PendingApprovalStamp text="pending approval" />
          <div className="relative z-10 flex flex-col items-center">
            <p className="text-slate-300 text-sm md:text-base leading-relaxed w-full">
              ${page.bentoText}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
`;

  fs.writeFileSync(path.join(process.cwd(), page.path), fileContent);
  console.log('Wrote ' + page.path);
});

