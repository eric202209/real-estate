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

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 15;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (optional but must be valid if provided)
    if (formData.phone.trim() && !validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Subject validation
    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call with realistic delay
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate occasional failure (5% chance)
          if (Math.random() < 0.05) {
            reject(new Error('Failed to send message. Please try again.'));
          } else {
            resolve(true);
          }
        }, 1500);
      });

      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setErrors({});

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
    setErrors({});
    setSubmitError(null);
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
            <strong>✓ Message sent successfully!</strong> We&apos;ll get back to you within 24 hours.
          </div>
        )}

        {submitError && (
          <div style={{
            background: '#fee',
            color: '#c00',
            padding: '15px',
            borderRadius: '5px',
            marginBottom: '20px',
            textAlign: 'center',
            fontWeight: '500'
          }}>
            <strong>✗ Error:</strong> {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="contact-form" noValidate>
          <div className="form-group">
            <label htmlFor="name">Full Name <span style={{ color: '#c00' }}>*</span></label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`form-input ${errors.name ? 'error' : ''}`}
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <small id="name-error" style={{ color: '#c00', fontSize: '14px', marginTop: '5px', display: 'block' }}>
                {errors.name}
              </small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address <span style={{ color: '#c00' }}>*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className={`form-input ${errors.email ? 'error' : ''}`}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <small id="email-error" style={{ color: '#c00', fontSize: '14px', marginTop: '5px', display: 'block' }}>
                {errors.email}
              </small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number <span style={{ color: '#999', fontSize: '12px' }}>(optional)</span></label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(555) 123-4567"
              className={`form-input ${errors.phone ? 'error' : ''}`}
              aria-invalid={errors.phone ? 'true' : 'false'}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            {errors.phone && (
              <small id="phone-error" style={{ color: '#c00', fontSize: '14px', marginTop: '5px', display: 'block' }}>
                {errors.phone}
              </small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject <span style={{ color: '#c00' }}>*</span></label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`form-input ${errors.subject ? 'error' : ''}`}
              aria-invalid={errors.subject ? 'true' : 'false'}
              aria-describedby={errors.subject ? 'subject-error' : undefined}
            >
              <option value="">Select a subject</option>
              <option value="buying">I want to buy a property</option>
              <option value="selling">I want to sell my property</option>
              <option value="listing">Information about a specific listing</option>
              <option value="valuation">Property valuation request</option>
              <option value="other">Other inquiry</option>
            </select>
            {errors.subject && (
              <small id="subject-error" style={{ color: '#c00', fontSize: '14px', marginTop: '5px', display: 'block' }}>
                {errors.subject}
              </small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="message">Message <span style={{ color: '#c00' }}>*</span></label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us how we can help you..."
              className={`form-textarea ${errors.message ? 'error' : ''}`}
              aria-invalid={errors.message ? 'true' : 'false'}
              aria-describedby={errors.message ? 'message-error' : undefined}
              rows={6}
            />
            {errors.message && (
              <small id="message-error" style={{ color: '#c00', fontSize: '14px', marginTop: '5px', display: 'block' }}>
                {errors.message}
              </small>
            )}
          </div>

          <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
            <button 
              type="submit" 
              className="submit-btn" 
              disabled={isSubmitting}
              style={{ flex: 1 }}
            >
              {isSubmitting ? (
                <>
                  <span style={{ 
                    display: 'inline-block', 
                    width: '16px', 
                    height: '16px', 
                    border: '2px solid #fff', 
                    borderRadius: '50%', 
                    borderTopColor: 'transparent',
                    animation: 'spin 1s linear infinite',
                    marginRight: '8px'
                  }} />
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
            <button 
              type="button" 
              className="contact-btn"
              onClick={handleReset}
              style={{ 
                background: '#e2e8f0',
                color: '#333',
                flex: 1
              }}
              disabled={isSubmitting}
            >
              Reset
            </button>
          </div>
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
            <strong>🕐 Office Hours:</strong> Monday - Friday: 9:00 AM - 6:00 PM
          </p>
        </div>
      </section>
    </>
  );
}
