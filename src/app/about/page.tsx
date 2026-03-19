export default function AboutPage() {
  const services = [
    {
      emoji: '🏠',
      title: 'Buy a Home',
      description: 'Find your dream property with our extensive listings and expert guidance.',
    },
    {
      emoji: '📤',
      title: 'Sell Your Home',
      description: 'Get the best value for your property with our marketing expertise.',
    },
    {
      emoji: '🔍',
      title: 'Property Valuation',
      description: 'Free professional appraisal to determine your home&apos;s market value.',
    },
    {
      emoji: '💼',
      title: 'Investment Properties',
      description: 'Discover profitable real estate investment opportunities.',
    },
  ];

  const reasons = [
    'Over 20 years of industry experience',
    'Licensed and certified real estate professionals',
    'Extensive network of trusted partners',
    'Personalized service tailored to your needs',
    'Cutting-edge technology for seamless transactions',
    'Proven track record of satisfied clients',
  ];

  return (
    <>
      <section className="about-section">
        <h2>About DreamHome Realty</h2>
        <p>
          Welcome to DreamHome Realty, your trusted partner in finding the perfect home. With over 20 years of
          experience in the real estate market, we&apos;ve helped thousands of families achieve their dream of
          homeownership.
        </p>
        <p>
          Our mission is simple: to provide exceptional service, expert guidance, and personalized attention to
          every client. We believe that buying or selling a home is more than just a transaction—it&apos;s a
          life-changing experience.
        </p>
      </section>

      <section className="services-section">
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </section>

      <section className="why-choose-us">
        <h2 className="section-title">Why Choose Us?</h2>
        <ul className="reasons-list">
          {reasons.map((reason, index) => (
            <li key={index} className="reason-item">
              ✓ {reason}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

function ServiceCard({ service }: { service: { emoji: string; title: string; description: string } }) {
  return (
    <div className="service-card">
      <h3>{service.emoji} {service.title}</h3>
      <p>{service.description}</p>
    </div>
  );
}
