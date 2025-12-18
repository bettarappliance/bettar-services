"use client";

import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  website: string; // honeypot
}

// Bot detection utilities
const isRandomString = (str: string): boolean => {
  // Check if string looks like random characters (high entropy, no spaces, mostly consonants)
  const trimmed = str.trim();
  if (trimmed.length < 10) return false;
  
  // Check for suspicious patterns
  const hasSpaces = /\s/.test(trimmed);
  const consonantRatio = (trimmed.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g) || []).length / trimmed.length;
  
  // Random strings typically have:
  // - No spaces (or very few)
  // - Low vowel ratio
  // - High consonant ratio
  // - Mix of upper/lower case in random pattern
  if (!hasSpaces && consonantRatio > 0.7 && trimmed.length > 15) {
    return true;
  }
  
  // Check for patterns like "SDvmpzgXsuwzqzVYPBdk" - random mix of letters
  const upperLowerPattern = /^[A-Za-z]{15,}$/;
  if (upperLowerPattern.test(trimmed) && !hasSpaces && consonantRatio > 0.65) {
    return true;
  }
  
  return false;
};

const isValidName = (name: string): boolean => {
  const trimmed = name.trim();
  if (trimmed.length < 2) return false;
  
  // Check if it looks like a random string
  if (isRandomString(trimmed)) {
    return false;
  }
  
  // Valid names typically have spaces or are reasonable length
  // Allow names without spaces if they're short and reasonable
  if (!/\s/.test(trimmed) && trimmed.length > 20) {
    return false;
  }
  
  return true;
};

const isValidMessage = (message: string): boolean => {
  const trimmed = message.trim();
  if (trimmed.length < 10) return false;
  
  // Check if message looks like random string
  if (isRandomString(trimmed)) {
    return false;
  }
  
  // Messages should have some variety in characters
  const uniqueChars = new Set(trimmed.toLowerCase().replace(/\s/g, '')).size;
  if (uniqueChars < 5 && trimmed.length > 15) {
    return false; // Too repetitive
  }
  
  return true;
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    website: '' // honeypot
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const pageLoadTime = useRef<number>(Date.now());
  const lastSubmitTime = useRef<number>(0);
  const submitCount = useRef<number>(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const now = Date.now();
    const timeOnPage = now - pageLoadTime.current;
    const timeSinceLastSubmit = now - lastSubmitTime.current;

    // Honeypot: if this has any value, it's likely a bot
    if (formData.website && formData.website.trim() !== '') {
      console.log('Spam detected via honeypot, not sending.');
      setIsSubmitting(false);
      setSubmitStatus('success'); // optional: pretend success
      return;
    }

    // Rate limiting: prevent rapid submissions
    if (timeSinceLastSubmit < 10000) { // 10 seconds between submissions
      console.log('Rate limit: Too soon after last submission');
      setIsSubmitting(false);
      setSubmitStatus('error');
      alert('Please wait a moment before submitting again.');
      return;
    }

    // Time-based validation: require minimum time on page (at least 3 seconds)
    if (timeOnPage < 3000) {
      console.log('Spam detected: Form submitted too quickly');
      setIsSubmitting(false);
      setSubmitStatus('success'); // Pretend success to bot
      return;
    }

    // Basic validation
    if (!formData.name.trim()) {
      alert('Please enter your full name.');
      setIsSubmitting(false);
      return;
    }

    // Enhanced name validation - detect random strings
    if (!isValidName(formData.name)) {
      console.log('Spam detected: Invalid name pattern');
      setIsSubmitting(false);
      setSubmitStatus('success'); // Pretend success to bot
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      alert('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      alert('Please enter a message with at least 10 characters.');
      setIsSubmitting(false);
      return;
    }

    // Enhanced message validation - detect random strings
    if (!isValidMessage(formData.message)) {
      console.log('Spam detected: Invalid message pattern');
      setIsSubmitting(false);
      setSubmitStatus('success'); // Pretend success to bot
      return;
    }

    // reCAPTCHA validation
    const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (recaptchaSiteKey) {
      if (!recaptchaToken) {
        alert('Please complete the reCAPTCHA verification.');
        setIsSubmitting(false);
        return;
      }
    }

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'your_service_id_here';
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'your_template_id_here';
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'your_public_key_here';

      console.log('EmailJS Config:', { serviceId, templateId, publicKey });

      if (!serviceId || !templateId || !publicKey) {
        console.error('Missing EmailJS environment variables');
        throw new Error('EmailJS configuration is missing. Please check your environment variables.');
      }

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
        to_email: 'info@bettarappliance.com'
      };

      console.log('Sending email with params:', templateParams);
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('EmailJS result:', result);

      if (result.status === 200) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
          website: ''
        });
        // Reset reCAPTCHA
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
          setRecaptchaToken(null);
        }
        // Update rate limiting
        lastSubmitTime.current = Date.now();
        submitCount.current += 1;
      } else {
        throw new Error('Email sending failed');
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset submit count after 1 hour
  useEffect(() => {
    const interval = setInterval(() => {
      submitCount.current = 0;
    }, 3600000); // 1 hour

    return () => clearInterval(interval);
  }, []);

  return (
    <div suppressHydrationWarning={true}>
      {submitStatus === 'success' && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          ✅ Thank you! We&apos;ve received your message and will get back to you soon.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          ❌ Sorry, there was an error sending your message. Please try again or call us at 301-949-2500.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot field - hidden from users but visible to bots */}
        <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
          <label htmlFor="website" style={{ display: 'none' }}>
            Leave this field empty if you are human
          </label>
          <input
            type="text"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            autoComplete="off"
            tabIndex={-1}
            aria-hidden="true"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D72] focus:border-transparent text-gray-900"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D72] focus:border-transparent text-gray-900"
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D72] focus:border-transparent text-gray-900"
              placeholder="(301) 123-4567"
            />
          </div>

          <div>
            <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
              Service Needed
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D72] focus:border-transparent text-gray-900"
            >
              <option value="">Select a service</option>
              <option value="Renovations and Remodeling">Renovations and Remodeling</option>
              <option value="Plumbing and Heating">Plumbing and Heating</option>
              <option value="Handyman Services">Handyman Services</option>
              <option value="Appliance Sales and Service">Appliance Sales and Service</option>
              <option value="Emergency Service">Emergency Service</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D72] focus:border-transparent text-gray-900"
            placeholder="Tell us about your project, timeline, and any specific requirements..."
          />
        </div>

        {/* reCAPTCHA */}
        {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
          <div className="flex justify-center">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              onChange={(token) => setRecaptchaToken(token)}
              onExpired={() => setRecaptchaToken(null)}
              onError={() => setRecaptchaToken(null)}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#002D72] text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-[#1e3a8a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>

        <p className="text-sm text-gray-500 text-center">
          By submitting this form, you agree to our privacy policy and terms of service.
        </p>
      </form>
    </div>
  );
}
