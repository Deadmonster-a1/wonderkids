import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { useSeo } from '../hooks/useSeo';

export default function PrivacyPolicyPage() {
  useSeo({
    title: 'Privacy Policy - WonderKids',
    description: 'Learn about how WonderKids collects, uses, and protects your personal information.',
  });

  return (
    <PageWrapper>
      <section className="pt-32 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
        <h1 className="font-display-lg text-4xl md:text-5xl font-bold mb-8 text-on-surface">Privacy Policy</h1>
        
        <div className="space-y-6 text-on-surface-variant font-body-md leading-relaxed text-lg">
          <p>
            At WonderKids Academy, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>

          <h2 className="font-headline-md text-2xl font-bold text-on-surface mt-8 mb-4">1. Information We Collect</h2>
          <p>
            We may collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our services, when you participate in activities on the website, or otherwise when you contact us. The personal information we collect may include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Names of students and parents/guardians</li>
            <li>Phone numbers and email addresses</li>
            <li>Current grade level or age of the child</li>
            <li>Information submitted via the Admissions or Contact forms</li>
          </ul>

          <h2 className="font-headline-md text-2xl font-bold text-on-surface mt-8 mb-4">2. How We Use Your Information</h2>
          <p>
            We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
          </p>

          <h2 className="font-headline-md text-2xl font-bold text-on-surface mt-8 mb-4">3. Will Your Information Be Shared With Anyone?</h2>
          <p>
            We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
          </p>

          <h2 className="font-headline-md text-2xl font-bold text-on-surface mt-8 mb-4">4. How Long Do We Keep Your Information?</h2>
          <p>
            We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law.
          </p>

          <h2 className="font-headline-md text-2xl font-bold text-on-surface mt-8 mb-4">5. How Do We Keep Your Information Safe?</h2>
          <p>
            We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process.
          </p>

          <h2 className="font-headline-md text-2xl font-bold text-on-surface mt-8 mb-4">6. Contact Us</h2>
          <p>
            If you have questions or comments about this notice, you may email us at info@wonderkids.edu or contact us by post at our main campus address.
          </p>
        </div>
      </section>
    </PageWrapper>
  );
}
