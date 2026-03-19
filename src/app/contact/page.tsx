'use client';

import { useState } from 'react';

type Subject = '' | 'buying' | 'selling' | 'listing' | 'valuation' | 'other';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: Subject;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  return (
    <>
      <section className="contact-section">
        <h2>Get in Touch</h2>
        <p className="contact-intro">
          Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
        </p>

        {submitSuccess && (
          <div className="success-message">
            Thank you for your message! We will contact you soon.
          </div>
        )}

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(555) 123-4567"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="">Select a subject</option>
              <option value="buying">I want to buy a property</option>
              <option value="selling">I want to sell my property</option>
              <option value="listing">Information about a specific listing</option>
              <option value="valuation">Property valuation request</option>
              <option value="other">Other inquiry</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Tell us how we can help you..."
              className="form-textarea"
            />
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </section>

      <section className="contact-info-section">
        <h2>Contact Information</h2>
        <div className="contact-info">
          <p>
            <strong>📍 Address:</strong> 123 Real Estate Blvd, San Francisco, CA 94102
          </p>
          <p>
            <strong>📞 Phone:</strong> (555) 123-4567
          </p>
          <p>
            <strong>📧 Email:</strong> info@dreamhomerealty.com
          </p>
          <p>
            <strong>🕐 Office Hours:</strong> Monday - Friday: 9:00 AM - 6:00 PM&apos;
          </p>
        </div>
      </section>
    </>
  );
}
