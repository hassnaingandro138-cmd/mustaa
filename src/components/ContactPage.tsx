import { useState, FormEvent } from 'react';
import { Phone, Mail, MapPin, MessageCircle, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { SHOWROOM_INFO, CARS, getWhatsAppUrl } from '../data/cars';

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicleInterest, setVehicleInterest] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!phone.trim()) {
      setError('Please enter a contact phone number.');
      return;
    }
    if (!message.trim()) {
      setError('Please enter your inquiry or preferred viewing details.');
      return;
    }

    setError('');
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
      {/* Header */}
      <div className="max-w-2xl border-b border-[#131b2e]/10 pb-6 sm:pb-8">
        <p className="text-xs font-semibold tracking-[0.12em] text-[#b90538] uppercase">
          Concierge &amp; Showroom Visit
        </p>
        <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#0b0f19] sm:text-4xl text-balance">
          Connect With MUSTAFA&apos;S CARS
        </h1>
        <p className="mt-3 text-sm text-[#131b2e]/70 sm:text-base">
          Schedule a private showroom appointment, request a vehicle inspection dossier, or message our acquisition specialists directly via WhatsApp.
        </p>
      </div>

      {/* Contact Cards + Form Grid */}
      <div className="mt-8 grid grid-cols-1 gap-8 sm:mt-10 lg:grid-cols-12 lg:gap-10">
        {/* Left: Direct Channels & Map */}
        <div className="min-w-0 space-y-6 lg:col-span-5">
          {/* WhatsApp Highlight Card */}
          <div className="rounded-lg border border-[#b90538]/20 bg-[#0b0f19] p-5 text-white sm:p-6">
            <h2 className="font-display text-xl font-bold">
              Instant WhatsApp Concierge
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              Speak directly with our Beverly Hills showroom specialists for real-time availability, trade-in appraisals, and live video walkarounds.
            </p>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-[#b90538] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#dc2c4f] sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Phone, Email & Address */}
          <div className="rounded-lg border border-[#131b2e]/10 bg-white p-5 space-y-5 sm:p-6">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fdf2f8] text-[#b90538]">
                <Phone className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-[#131b2e]/55">Phone Line</p>
                <a
                  href={`tel:${SHOWROOM_INFO.phoneRaw}`}
                  className="mt-0.5 block font-mono text-base font-semibold text-[#0b0f19] hover:text-[#b90538] tabular-nums"
                >
                  {SHOWROOM_INFO.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5 border-t border-[#131b2e]/8 pt-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fdf2f8] text-[#b90538]">
                <Mail className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-[#131b2e]/55">Showroom Email</p>
                <a
                  href={`mailto:${SHOWROOM_INFO.email}`}
                  className="mt-0.5 block break-all text-sm font-semibold text-[#0b0f19] hover:text-[#b90538] sm:break-normal sm:text-base"
                >
                  {SHOWROOM_INFO.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5 border-t border-[#131b2e]/8 pt-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fdf2f8] text-[#b90538]">
                <MapPin className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-[#131b2e]/55">Showroom Address</p>
                <p className="mt-0.5 text-sm font-semibold text-[#0b0f19]">
                  {SHOWROOM_INFO.address}
                </p>
                <p className="mt-1 text-xs text-[#131b2e]/65">{SHOWROOM_INFO.hours}</p>
              </div>
            </div>
          </div>

          {/* Google Maps Showroom Location Section */}
          <div className="overflow-hidden rounded-lg border border-[#131b2e]/10 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#131b2e]/8 px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <h3 className="font-display text-base font-bold text-[#0b0f19]">
                  Showroom Location
                </h3>
                <p className="text-xs text-[#131b2e]/60">
                  {SHOWROOM_INFO.shortAddress}
                </p>
              </div>
              <a
                href={SHOWROOM_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[36px] items-center gap-1 text-xs font-semibold text-[#b90538] hover:text-[#0b0f19] whitespace-nowrap shrink-0"
              >
                <span>Open Google Maps</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="relative h-64 w-full bg-[#f2f3ff]">
              <iframe
                title="MUSTAFA'S CARS Showroom Google Map"
                src="https://maps.google.com/maps?q=4800%20Wilshire%20Boulevard,%20Los%20Angeles,%20CA&t=&z=14&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              />
            </div>
          </div>
        </div>

        {/* Right: Validated Contact Form */}
        <div className="min-w-0 lg:col-span-7">
          <div className="rounded-lg border border-[#131b2e]/10 bg-white p-5 sm:p-8 lg:p-10">
            <h2 className="font-display text-xl font-bold text-[#0b0f19] sm:text-2xl">
              Send an Inquiry or Book a Test Drive
            </h2>
            <p className="mt-2 text-sm text-[#131b2e]/65">
              Complete the form below and a dedicated showroom advisor will respond within two business hours.
            </p>

            {submitted ? (
              <div className="mt-8 rounded-lg border border-[#b90538]/20 bg-[#fdf2f8] p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 text-[#b90538] shrink-0" />
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-bold text-[#0b0f19]">
                      Inquiry Received — Thank You, {name}
                    </h3>
                    <p className="mt-2 text-sm text-[#131b2e]/80">
                      Your message regarding <span className="font-semibold">{vehicleInterest}</span> has been logged with our concierge desk. We will contact you at <span className="font-mono">{phone}</span> or <span className="font-medium break-all sm:break-normal">{email}</span> shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setName('');
                        setEmail('');
                        setPhone('');
                        setMessage('');
                      }}
                      className="mt-5 inline-flex min-h-[44px] items-center rounded-lg bg-[#0b0f19] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#b90538] cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-5 sm:mt-8" noValidate>
                {error && (
                  <div
                    role="alert"
                    className="rounded-lg border border-[#b90538]/30 bg-[#fdf2f8] px-4 py-3 text-sm font-medium text-[#b90538]"
                  >
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-[#0b0f19]"
                    >
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Mercer"
                      required
                      className="mt-1.5 h-11 w-full rounded-lg border border-[#131b2e]/15 bg-white px-3.5 text-base text-[#0b0f19] focus:border-[#b90538] focus:ring-2 focus:ring-[#b90538]/15 focus:outline-none sm:text-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-[#0b0f19]"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@example.com"
                      required
                      className="mt-1.5 h-11 w-full rounded-lg border border-[#131b2e]/15 bg-white px-3.5 text-base text-[#0b0f19] focus:border-[#b90538] focus:ring-2 focus:ring-[#b90538]/15 focus:outline-none sm:text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-semibold text-[#0b0f19]"
                    >
                      Phone / WhatsApp Number
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (310) 555-0148"
                      required
                      className="mt-1.5 h-11 w-full rounded-lg border border-[#131b2e]/15 bg-white px-3.5 text-base text-[#0b0f19] focus:border-[#b90538] focus:ring-2 focus:ring-[#b90538]/15 focus:outline-none sm:text-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-vehicle"
                      className="block text-xs font-semibold text-[#0b0f19]"
                    >
                      Vehicle or Service
                    </label>
                    <select
                      id="contact-vehicle"
                      value={vehicleInterest}
                      onChange={(e) => setVehicleInterest(e.target.value)}
                      className="mt-1.5 h-11 w-full rounded-lg border border-[#131b2e]/15 bg-white px-3.5 text-base text-[#0b0f19] focus:border-[#b90538] focus:ring-2 focus:ring-[#b90538]/15 focus:outline-none sm:text-sm"
                    >
                      <option value="General Inquiry">General Showroom Inquiry</option>
                      <option value="Private Viewing & Test Drive">
                        Private Viewing &amp; Test Drive
                      </option>
                      <option value="Trade-In Appraisal">Trade-In Appraisal</option>
                      {CARS.map((car) => (
                        <option key={car.id} value={`${car.year} ${car.name}`}>
                          {car.year} {car.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-[#0b0f19]"
                  >
                    Message &amp; Preferred Timing
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share your preferred appointment date, financing questions, or transport destination..."
                    required
                    className="mt-1.5 w-full rounded-lg border border-[#131b2e]/15 bg-white p-3.5 text-base text-[#0b0f19] focus:border-[#b90538] focus:ring-2 focus:ring-[#b90538]/15 focus:outline-none sm:text-sm"
                  />
                </div>

                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-[#b90538] px-8 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#9e042f] hover:shadow-[0_6px_20px_rgba(185,5,56,0.28)] cursor-pointer sm:w-auto"
                  >
                    Submit Inquiry
                  </button>
                  <span className="text-xs text-[#131b2e]/55">
                    Protected by private client confidentiality.
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
