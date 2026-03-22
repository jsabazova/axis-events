import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
`;

const ContactPageWrap = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  padding: 80px 40px;
  background: #ffffff;
  padding-top: calc(80px + 64px);

  @media (max-width: 760px) {
    padding: 60px 20px;
    padding-top: calc(60px + 64px);
  }
`;

const DecoLinesTopRight = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 480px;
  height: 480px;
  pointer-events: none;
  z-index: 0;

  @media (max-width: 760px) {
    width: 260px;
    height: 260px;
  }
`;

const DecoLinesBotLeft = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 320px;
  height: 320px;
  pointer-events: none;
  z-index: 0;
  opacity: 0.5;

  @media (max-width: 760px) {
    display: none;
  }
`;

const ContactInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const ContactIntro = styled.div`
  margin-bottom: 64px;
  animation: ${fadeUp} 0.55s ease 0.04s both;
`;

const Eyebrow = styled.span`
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #007a35;
  margin-bottom: 14px;
`;

const ContactH1 = styled.h1`
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: clamp(32px, 4vw, 54px);
  letter-spacing: -0.028em;
  line-height: 1.06;
  color: #141414;
  margin-bottom: 16px;

  em {
    font-style: normal;
    color: #00b050;
  }
`;

const ContactLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 80px;
  align-items: start;

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
    gap: 52px;
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: ${fadeUp} 0.55s ease 0.13s both;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;

  label {
    font-size: 12.5px;
    font-weight: 600;
    color: #141414;
    letter-spacing: 0.02em;
  }

  input,
  textarea {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: #141414;
    background: #ffffff;
    border: 1.5px solid #e5e5e3;
    border-radius: 9px;
    padding: 12px 14px;
    outline: none;
    transition: border-color 0.18s;

    &:focus {
      border-color: #00b050;
    }

    &::placeholder {
      color: #a0a0a0;
    }
  }

  textarea {
    resize: vertical;
    min-height: 130px;
  }
`;

const ContactTypeRow = styled.div`
  display: flex;
  gap: 10px;
`;

const TypeBtn = styled.button<{ selected?: boolean }>`
  flex: 1;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: ${p => p.selected ? '#007a35' : '#6b7280'};
  background: ${p => p.selected ? '#e8f9ef' : '#ffffff'};
  border: 1.5px solid ${p => p.selected ? '#00b050' : '#e5e5e3'};
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.18s;
  text-align: center;

  &:hover {
    border-color: #00b050;
    color: #007a35;
    background: #e8f9ef;
  }
`;

const TimeOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TimeBtn = styled.button<{ selected?: boolean }>`
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: ${p => p.selected ? '#007a35' : '#6b7280'};
  background: ${p => p.selected ? '#e8f9ef' : '#ffffff'};
  border: 1.5px solid ${p => p.selected ? '#00b050' : '#e5e5e3'};
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.18s;

  &:hover {
    border-color: #00b050;
    color: #007a35;
    background: #e8f9ef;
  }
`;

const CallTimeField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;

  label {
    font-size: 12.5px;
    font-weight: 600;
    color: #141414;
    letter-spacing: 0.02em;

    span {
      font-weight: 400;
      color: #a0a0a0;
      font-size: 11px;
    }
  }
`;

const SubmitBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  background: #00b050;
  border: none;
  padding: 14px 28px;
  border-radius: 9px;
  cursor: pointer;
  transition: background 0.18s, transform 0.15s;
  margin-top: 4px;

  svg {
    width: 13px;
    height: 13px;
  }

  &:hover {
    background: #009140;
    transform: translateY(-1px);
  }
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 4px;
  animation: ${fadeUp} 0.55s ease 0.22s both;
`;

const ResponseBadge = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: #e8f9ef;
  border: 1.5px solid rgba(0, 176, 80, 0.22);
  border-radius: 14px;
  padding: 18px 20px;

  p {
    font-size: 13.5px;
    line-height: 1.6;
    color: #007a35;

    strong {
      font-weight: 600;
    }
  }
`;

const PulseDot = styled.div`
  width: 8px;
  height: 8px;
  background: #00b050;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 5px;
  animation: ${pulse} 2s infinite;
`;

const TIME_OPTIONS = ['Morning (9am – 12pm)', 'Afternoon (12pm – 5pm)', 'Anytime'];
const TYPE_OPTIONS = ['Call me', 'Email me', 'No preference'];

export default function ContactPage() {
  const [contactType, setContactType] = useState<string | null>(null);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

  const handleTypeSelect = (type: string) => {
    setContactType(type);
    if (type === 'Email me') setSelectedTimes([]);
  };

  const handleTimeToggle = (time: string) => {
    if (time === 'Anytime') {
      setSelectedTimes(['Anytime']);
    } else {
      setSelectedTimes(prev => {
        const without = prev.filter(t => t !== 'Anytime');
        return without.includes(time)
          ? without.filter(t => t !== time)
          : [...without, time];
      });
    }
  };

  const showCallTime = contactType !== null && contactType !== 'Email me';

  return (
    <ContactPageWrap>
      <DecoLinesTopRight>
        <svg viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 480 40 L 380 40 Q 360 40 360 60 L 360 140" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.3" fill="none"/>
          <path d="M 480 120 L 420 120 Q 400 120 400 140 L 400 220 Q 400 240 380 240 L 300 240" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.18" fill="none"/>
          <path d="M 480 80 L 440 80" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.5" fill="none"/>
          <path d="M 480 200 L 460 200" stroke="#00b050" strokeWidth="1" strokeOpacity="0.3" fill="none"/>
          <path d="M 480 320 L 360 320 Q 340 320 340 300 L 340 260" stroke="#00b050" strokeWidth="1" strokeOpacity="0.15" fill="none"/>
          <circle cx="360" cy="140" r="3" fill="#00b050" fillOpacity="0.3"/>
          <circle cx="400" cy="240" r="3" fill="#00b050" fillOpacity="0.2"/>
        </svg>
      </DecoLinesTopRight>

      <DecoLinesBotLeft>
        <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0 280 L 100 280 Q 120 280 120 260 L 120 180" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.25" fill="none"/>
          <path d="M 0 200 L 60 200 Q 80 200 80 180 L 80 120" stroke="#00b050" strokeWidth="1" strokeOpacity="0.15" fill="none"/>
          <path d="M 0 320 L 40 320" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.4" fill="none"/>
        </svg>
      </DecoLinesBotLeft>

      <ContactInner>
        <ContactIntro>
          <Eyebrow>Get in touch</Eyebrow>
          <ContactH1>
            Need a hand?<br /><em>Drop your details.</em>
          </ContactH1>
        </ContactIntro>

        <ContactLayout>
          <ContactForm onSubmit={e => e.preventDefault()}>
            <FormRow>
              <Field>
                <label>Name</label>
                <input type="text" placeholder="Your name" />
              </Field>
              <Field>
                <label>Email</label>
                <input type="email" placeholder="you@company.com" />
              </Field>
            </FormRow>

            <Field>
              <label>Phone</label>
              <input type="tel" placeholder="+61" />
            </Field>

            <Field>
              <label>Preferred response</label>
              <ContactTypeRow>
                {TYPE_OPTIONS.map(type => (
                  <TypeBtn
                    key={type}
                    type="button"
                    selected={contactType === type}
                    onClick={() => handleTypeSelect(type)}
                  >
                    {type}
                  </TypeBtn>
                ))}
              </ContactTypeRow>
            </Field>

            {showCallTime && (
              <CallTimeField>
                <label>
                  Best time to call{' '}
                  <span>— select all that apply</span>
                </label>
                <TimeOptions>
                  {TIME_OPTIONS.map(time => (
                    <TimeBtn
                      key={time}
                      type="button"
                      selected={selectedTimes.includes(time)}
                      onClick={() => handleTimeToggle(time)}
                    >
                      {time}
                    </TimeBtn>
                  ))}
                </TimeOptions>
              </CallTimeField>
            )}

            <Field>
              <label>How can we help?</label>
              <textarea placeholder="Tell us what you need — the more detail the better." />
            </Field>

            <div>
              <SubmitBtn type="submit">
                Send message{' '}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
                </svg>
              </SubmitBtn>
            </div>
          </ContactForm>

          <ContactDetails>
            <ResponseBadge>
              <PulseDot />
              <p>
                <strong>We'll get back to you within 24 hours.</strong>{' '}
                It's easier that way — right person, right answers.
              </p>
            </ResponseBadge>
          </ContactDetails>
        </ContactLayout>
      </ContactInner>
    </ContactPageWrap>
  );
}
