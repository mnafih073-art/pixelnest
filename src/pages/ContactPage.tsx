import { FormEvent, useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  Instagram,
  Mail,
  Phone,
} from 'lucide-react';
import { SERVICES_LIST, STUDIO_INFO } from '../data/studioData';

interface ContactPageProps {
  preselectedService: string;
}

export function ContactPage({ preselectedService }: ContactPageProps) {
  const [name, setName] = useState('');
  const [contactDetail, setContactDetail] = useState('');
  const [service, setService] = useState(
    preselectedService || SERVICES_LIST[0].title
  );
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);

  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
      setSubmitted(false);
    }
  }, [preselectedService]);

  const handleCopy = async (text: string, field: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      window.setTimeout(() => setCopiedField(null), 1800);
    } catch {
      // Clipboard API unavailable in restricted contexts; clickable links still work
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!description.trim() || description.trim().length < 10) {
      setErrorMessage('Please share a brief description of your project (at least 10 characters).');
      return;
    }
    setErrorMessage('');
    setSubmitted(true);
  };

  const mailtoSubject = encodeURIComponent(
    `Project Enquiry: ${service} — ${name || 'New Client'}`
  );
  const mailtoBody = encodeURIComponent(
    `Hello Pixel Nest Studio,\n\nName: ${name}\nContact: ${contactDetail || 'Not specified'}\nService Required: ${service}\n\nProject Details:\n${description}\n`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-10 pb-20 lg:pt-14 lg:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Communication Details Column */}
        <div className="lg:col-span-5">
          <p className="text-xs font-semibold tracking-wide text-[#1438B8]">
            Contact Us
          </p>
          <h1
            className="mt-2 font-display font-bold tracking-tight text-[#0D1E54] leading-[1.08] text-balance"
            style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)' }}
          >
            Let&apos;s Work Together
          </h1>
          <p className="mt-4 text-base text-[#0D1E54]/78 leading-relaxed">
            Have a campaign, brand identity, reel, or website in mind? Reach out directly via email, Instagram, or phone—or fill out the brief to receive a custom studio quote.
          </p>

          {/* Direct Communication Channels */}
          <div className="mt-8 space-y-4">
            {/* Clickable Email */}
            <div className="bg-white rounded-2xl p-5 border border-[#0D1E54]/10 flex items-center justify-between gap-4">
              <a
                href={`mailto:${STUDIO_INFO.email}`}
                className="flex items-center gap-4 min-w-0 group"
              >
                <span className="w-11 h-11 rounded-xl bg-[#DBEAFE] text-[#1438B8] flex items-center justify-center shrink-0 group-hover:bg-[#1438B8] group-hover:text-[#FAF6EE] transition-colors">
                  <Mail className="w-5 h-5" />
                </span>
                <div className="min-w-0">
                  <span className="block text-xs text-[#0D1E54]/60">Email Us</span>
                  <span className="block text-sm sm:text-base font-semibold text-[#0D1E54] group-hover:text-[#1438B8] transition-colors truncate">
                    {STUDIO_INFO.email}
                  </span>
                </div>
              </a>
              <button
                type="button"
                onClick={() => handleCopy(STUDIO_INFO.email, 'email')}
                aria-label="Copy email address"
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-[#0D1E54]/60 hover:text-[#1438B8] hover:bg-[#F4EDE0] transition-colors shrink-0"
              >
                {copiedField === 'email' ? (
                  <Check className="w-4 h-4 text-[#1438B8]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Click-to-call Phone */}
            <div className="bg-white rounded-2xl p-5 border border-[#0D1E54]/10 flex items-center justify-between gap-4">
              <a
                href={STUDIO_INFO.phoneHref}
                className="flex items-center gap-4 min-w-0 group"
              >
                <span className="w-11 h-11 rounded-xl bg-[#DBEAFE] text-[#1438B8] flex items-center justify-center shrink-0 group-hover:bg-[#1438B8] group-hover:text-[#FAF6EE] transition-colors">
                  <Phone className="w-5 h-5" />
                </span>
                <div className="min-w-0">
                  <span className="block text-xs text-[#0D1E54]/60">Call or Message</span>
                  <span className="block text-sm sm:text-base font-semibold text-[#0D1E54] group-hover:text-[#1438B8] transition-colors tabular-nums">
                    {STUDIO_INFO.phoneDisplay}
                  </span>
                </div>
              </a>
              <button
                type="button"
                onClick={() => handleCopy(STUDIO_INFO.phoneDisplay, 'phone')}
                aria-label="Copy phone number"
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-[#0D1E54]/60 hover:text-[#1438B8] hover:bg-[#F4EDE0] transition-colors shrink-0"
              >
                {copiedField === 'phone' ? (
                  <Check className="w-4 h-4 text-[#1438B8]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Direct Instagram Profile Link */}
            <a
              href={STUDIO_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#091B5C] text-[#FAF6EE] rounded-2xl p-5 flex items-center justify-between gap-4 hover:bg-[#1438B8] transition-colors group"
            >
              <div className="flex items-center gap-4 min-w-0">
                <span className="w-11 h-11 rounded-xl bg-[#FAF6EE]/12 text-[#FAF6EE] flex items-center justify-center shrink-0">
                  <Instagram className="w-5 h-5" />
                </span>
                <div className="min-w-0">
                  <span className="block text-xs text-[#DBEAFE]/80">Instagram Studio Feed</span>
                  <span className="block text-sm sm:text-base font-semibold">
                    {STUDIO_INFO.instagramHandle}
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#DBEAFE] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
            </a>
          </div>
        </div>

        {/* Right Project Enquiry Form Column */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-[#0D1E54]/10">
            {submitted ? (
              <div className="py-6">
                <div className="w-12 h-12 rounded-2xl bg-[#DBEAFE] text-[#1438B8] flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h2 className="mt-5 font-display text-2xl sm:text-3xl font-bold text-[#0D1E54]">
                  Enquiry Prepared for {STUDIO_INFO.name}
                </h2>
                <p className="mt-2 text-sm sm:text-base text-[#0D1E54]/75 leading-relaxed">
                  Thank you, <strong className="font-semibold text-[#0D1E54]">{name}</strong>. Your brief for <strong className="font-semibold text-[#1438B8]">{service}</strong> is ready. Send it directly via your email app or reach us on Instagram/phone for an immediate response.
                </p>

                <div className="mt-6 rounded-xl bg-[#FAF6EE] border border-[#0D1E54]/10 p-5 space-y-2 text-sm">
                  <div>
                    <span className="text-[#0D1E54]/55">Service: </span>
                    <span className="font-medium text-[#0D1E54]">{service}</span>
                  </div>
                  {contactDetail && (
                    <div>
                      <span className="text-[#0D1E54]/55">Reply to: </span>
                      <span className="font-medium text-[#0D1E54]">{contactDetail}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-[#0D1E54]/55">Brief: </span>
                    <span className="text-[#0D1E54]/85">{description}</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={`mailto:${STUDIO_INFO.email}?subject=${mailtoSubject}&body=${mailtoBody}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-[#FAF6EE] bg-[#1438B8] hover:bg-[#091B5C] rounded-xl transition-colors whitespace-nowrap shrink-0"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send via Email App</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setContactDetail('');
                      setDescription('');
                    }}
                    className="inline-flex items-center justify-center px-5 py-3.5 text-sm font-medium text-[#0D1E54] border border-[#0D1E54]/15 hover:border-[#1438B8] rounded-xl transition-colors whitespace-nowrap shrink-0"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-[#0D1E54]">
                    Project Enquiry Brief
                  </h2>
                  <p className="mt-1 text-sm text-[#0D1E54]/65">
                    Tell us what you are looking to create and we will respond with a tailored plan and quote.
                  </p>
                </div>

                {errorMessage && (
                  <div
                    role="alert"
                    className="rounded-xl bg-[#FEF2F2] border border-[#DC2626]/25 px-4 py-3 text-sm text-[#991B1B]"
                  >
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="enquiry-name"
                      className="block text-sm font-medium text-[#0D1E54] mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      id="enquiry-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rohan Menon"
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF6EE] border border-[#0D1E54]/15 text-[#0D1E54] placeholder:text-[#0D1E54]/40 focus:outline-none focus:border-[#1438B8] focus:ring-2 focus:ring-[#1438B8]/20 transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-contact"
                      className="block text-sm font-medium text-[#0D1E54] mb-2"
                    >
                      Email or Phone Number
                    </label>
                    <input
                      id="enquiry-contact"
                      type="text"
                      value={contactDetail}
                      onChange={(e) => setContactDetail(e.target.value)}
                      placeholder="you@example.com or +91..."
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF6EE] border border-[#0D1E54]/15 text-[#0D1E54] placeholder:text-[#0D1E54]/40 focus:outline-none focus:border-[#1438B8] focus:ring-2 focus:ring-[#1438B8]/20 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="enquiry-service"
                    className="block text-sm font-medium text-[#0D1E54] mb-2"
                  >
                    Service Required
                  </label>
                  <select
                    id="enquiry-service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF6EE] border border-[#0D1E54]/15 text-[#0D1E54] focus:outline-none focus:border-[#1438B8] focus:ring-2 focus:ring-[#1438B8]/20 transition-colors"
                  >
                    {SERVICES_LIST.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="Custom Creative Package">Custom Creative Package</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="enquiry-description"
                    className="block text-sm font-medium text-[#0D1E54] mb-2"
                  >
                    Project Description
                  </label>
                  <textarea
                    id="enquiry-description"
                    required
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Share your project goals, timeline, references, or anything you would like us to create..."
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF6EE] border border-[#0D1E54]/15 text-[#0D1E54] placeholder:text-[#0D1E54]/40 focus:outline-none focus:border-[#1438B8] focus:ring-2 focus:ring-[#1438B8]/20 transition-colors resize-y"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="text-xs text-[#0D1E54]/60">
                    Fair custom quotes · Typically replies within 24 hours
                  </span>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-[#FAF6EE] bg-[#1438B8] hover:bg-[#091B5C] rounded-xl transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1438B8]"
                  >
                    <span>Send Project Enquiry</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
