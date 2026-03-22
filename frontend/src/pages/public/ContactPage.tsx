import { useState } from 'react';
import styles from './ContactPage.module.scss';

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
    <div className={styles.contactPageWrap}>
      <div className={styles.decoLinesTopRight}>
        <svg viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 480 40 L 380 40 Q 360 40 360 60 L 360 140" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.3" fill="none"/>
          <path d="M 480 120 L 420 120 Q 400 120 400 140 L 400 220 Q 400 240 380 240 L 300 240" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.18" fill="none"/>
          <path d="M 480 80 L 440 80" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.5" fill="none"/>
          <path d="M 480 200 L 460 200" stroke="#00b050" strokeWidth="1" strokeOpacity="0.3" fill="none"/>
          <path d="M 480 320 L 360 320 Q 340 320 340 300 L 340 260" stroke="#00b050" strokeWidth="1" strokeOpacity="0.15" fill="none"/>
          <circle cx="360" cy="140" r="3" fill="#00b050" fillOpacity="0.3"/>
          <circle cx="400" cy="240" r="3" fill="#00b050" fillOpacity="0.2"/>
        </svg>
      </div>

      <div className={styles.decoLinesBotLeft}>
        <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0 280 L 100 280 Q 120 280 120 260 L 120 180" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.25" fill="none"/>
          <path d="M 0 200 L 60 200 Q 80 200 80 180 L 80 120" stroke="#00b050" strokeWidth="1" strokeOpacity="0.15" fill="none"/>
          <path d="M 0 320 L 40 320" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.4" fill="none"/>
        </svg>
      </div>

      <div className={styles.contactInner}>
        <div className={styles.contactIntro}>
          <span className={styles.eyebrow}>Get in touch</span>
          <h1 className={styles.contactH1}>
            Need a hand?<br /><em>Drop your details.</em>
          </h1>
        </div>

        <div className={styles.contactLayout}>
          <form className={styles.contactForm} onSubmit={e => e.preventDefault()}>
            <div className={styles.formRow}>
              <div className={styles.field}>
                <label>Name</label>
                <input type="text" placeholder="Your name" />
              </div>
              <div className={styles.field}>
                <label>Email</label>
                <input type="email" placeholder="you@company.com" />
              </div>
            </div>

            <div className={styles.field}>
              <label>Phone</label>
              <input type="tel" placeholder="+61" />
            </div>

            <div className={styles.field}>
              <label>Preferred response</label>
              <div className={styles.contactTypeRow}>
                {TYPE_OPTIONS.map(type => (
                  <button
                    key={type}
                    type="button"
                    className={`${styles.typeBtn} ${contactType === type ? styles.typeBtnSelected : ''}`}
                    onClick={() => handleTypeSelect(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {showCallTime && (
              <div className={styles.callTimeField}>
                <label>
                  Best time to call{' '}
                  <span>— select all that apply</span>
                </label>
                <div className={styles.timeOptions}>
                  {TIME_OPTIONS.map(time => (
                    <button
                      key={time}
                      type="button"
                      className={`${styles.timeBtn} ${selectedTimes.includes(time) ? styles.timeBtnSelected : ''}`}
                      onClick={() => handleTimeToggle(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.field}>
              <label>How can we help?</label>
              <textarea placeholder="Tell us what you need — the more detail the better." />
            </div>

            <div>
              <button type="submit" className={styles.submitBtn}>
                Send message{' '}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
                </svg>
              </button>
            </div>
          </form>

          <div className={styles.contactDetails}>
            <div className={styles.responseBadge}>
              <div className={styles.pulseDot} />
              <p>
                <strong>We'll get back to you within 24 hours.</strong>{' '}
                It's easier that way — right person, right answers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
