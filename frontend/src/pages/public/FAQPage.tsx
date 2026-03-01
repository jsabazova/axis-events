import React, { useState } from 'react';
import styled from 'styled-components';

const FAQWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primaryDark} 100%);
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing['4xl']} 0;
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['3xl']} 0;
  }
`;

const ContentSection = styled.section`
  padding: ${({ theme }) => theme.spacing['4xl']} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['3xl']} 0;
  }
`;

const FAQContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FAQItem = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`;

const FAQQuestion = styled.button<{ isOpen: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.white};
  border: none;
  text-align: left;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.gray[900]};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[50]};
  }

  .icon {
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.fontSizes.xl};
    transition: transform 0.2s ease;
    transform: ${({ isOpen }) => (isOpen ? 'rotate(45deg)' : 'rotate(0deg)')};
  }
`;

const FAQAnswer = styled.div<{ isOpen: boolean }>`
  padding: ${({ isOpen, theme }) => (isOpen ? `0 ${theme.spacing.xl} ${theme.spacing.xl}` : '0')};
  background-color: ${({ theme }) => theme.colors.gray[50]};
  border-top: 1px solid ${({ theme }) => theme.colors.gray[200]};
  max-height: ${({ isOpen }) => (isOpen ? '1000px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.gray[700]};
    line-height: 1.6;
  }
`;

const CategorySection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};

  h3 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    padding-bottom: ${({ theme }) => theme.spacing.sm};
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;

interface FAQItemType {
  question: string;
  answer: string;
}

interface FAQCategoryType {
  title: string;
  items: FAQItemType[];
}

const FAQComponent: React.FC<{ item: FAQItemType; index: string }> = ({ item, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FAQItem>
      <FAQQuestion
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        {item.question}
        <span className="icon">+</span>
      </FAQQuestion>
      <FAQAnswer isOpen={isOpen} id={`faq-answer-${index}`}>
        <p>{item.answer}</p>
      </FAQAnswer>
    </FAQItem>
  );
};

const FAQPage: React.FC = () => {
  const faqData: FAQCategoryType[] = [
    {
      title: 'General Services',
      items: [
        {
          question: 'Do you get my stuff to and from a show?',
          answer: 'Yes, absolutely! We provide complete logistics solutions from pickup at your location to delivery at the venue, and return transport after the event. Our services include freight forwarding, on-site support, and everything in between to ensure your materials arrive safely and on time.'
        },
        {
          question: 'What areas do you service?',
          answer: 'We operate across all of Australia, covering major cities and regional areas. Our network includes Melbourne, Sydney, Brisbane, Perth, Adelaide, and regional venues throughout the country. We can reach any exhibition venue or trade show location across Australia.'
        },
        {
          question: 'How far in advance should I book your services?',
          answer: 'We recommend booking as early as possible, especially for large events or peak periods. However, we understand events can be unpredictable and also offer express and urgent delivery services for last-minute requirements. Contact us and we\'ll work with your timeline.'
        }
      ]
    },
    {
      title: 'Pricing & Quotes',
      items: [
        {
          question: 'How do you calculate pricing?',
          answer: 'Our pricing is based on several factors including pickup and delivery locations, volume (cubic meters), weight, timeline, and any special requirements. We offer competitive rates with transparent pricing and no hidden fees. Use our quote form for an instant estimate or contact us for complex requirements.'
        },
        {
          question: 'Do you offer consolidated shipping discounts?',
          answer: 'Yes! One of our key services is consolidating shipments from multiple exhibitors going to the same trade show. This reduces costs for everyone while maintaining individual tracking and handling. We automatically look for consolidation opportunities to save you money.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept various payment methods including direct bank transfer, credit cards, and can set up payment terms for regular customers. Payment details are provided with your quote and invoice.'
        }
      ]
    },
    {
      title: 'International Freight',
      items: [
        {
          question: 'Do you handle international shipments?',
          answer: 'Yes, we provide comprehensive international freight forwarding services including air freight, ocean freight, customs clearance, and documentation. Our global network of partners ensures your materials reach international destinations safely and efficiently.'
        },
        {
          question: 'What documents do I need for international shipping?',
          answer: 'International shipments require various documents depending on the destination and type of goods. These typically include commercial invoices, packing lists, and may include carnet for temporary imports, certificates of origin, or permits. Our team handles all documentation and guides you through the requirements.'
        }
      ]
    },
    {
      title: 'Site Services',
      items: [
        {
          question: 'What equipment do you provide on-site?',
          answer: 'We provide a full range of equipment including forklifts, pallet jacks, trolleys, elevated work platforms, and cranes. All equipment is maintained to high standards and operated by experienced, certified personnel. Equipment selection is tailored to your venue and requirements.'
        },
        {
          question: 'Do you provide staff for bump-in and bump-out?',
          answer: 'Yes, our experienced on-site teams handle bump-in and bump-out operations. From small crews for individual stands to large teams for major exhibitions, we scale our services to match your needs. Our staff are experienced in venue operations and safety protocols.'
        }
      ]
    },
    {
      title: 'Tracking & Communication',
      items: [
        {
          question: 'Can I track my shipment?',
          answer: 'Yes, we provide real-time tracking and updates throughout the transport process. You\'ll receive notifications at key milestones and can contact our team anytime for status updates. Our live tracking technology keeps you informed every step of the way.'
        },
        {
          question: 'Who do I contact if I have issues during the event?',
          answer: 'Each project has a dedicated point of contact who is available throughout your event. For on-site services, our site team is on location and can respond immediately to any requirements or issues that arise.'
        }
      ]
    }
  ];

  return (
    <FAQWrapper>
      <HeroSection>
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto', opacity: 0.9 }}>
            Find answers to common questions about our logistics services, pricing, and processes.
          </p>
        </div>
      </HeroSection>

      <ContentSection>
        <div className="container">
          <FAQContainer>
            {faqData.map((category, categoryIndex) => (
              <CategorySection key={categoryIndex}>
                <h3>{category.title}</h3>
                {category.items.map((item, itemIndex) => (
                  <FAQComponent
                    key={`${categoryIndex}-${itemIndex}`}
                    item={item}
                    index={`${categoryIndex}-${itemIndex}`}
                  />
                ))}
              </CategorySection>
            ))}
          </FAQContainer>

          <div style={{
            textAlign: 'center',
            marginTop: '4rem',
            padding: '2rem',
            backgroundColor: '#F9FAFB',
            borderRadius: '1rem'
          }}>
            <h2 style={{ color: '#1F2937', marginBottom: '1rem' }}>
              Still have questions?
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#4B5563', marginBottom: '1.5rem' }}>
              Our team is here to help! Contact us directly for any questions not covered here.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="mailto:info@axis-events.com.au" className="btn-primary">
                Email Us
              </a>
              <a href="tel:+61123456789" className="btn-secondary">
                Call Us
              </a>
            </div>
          </div>
        </div>
      </ContentSection>
    </FAQWrapper>
  );
};

export default FAQPage;