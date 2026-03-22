import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ContactOnsitePage.module.scss';

const TYPES = ['Call me', 'Email me', 'No preference'];
const TIMES = ['Morning (9am – 12pm)', 'Afternoon (12pm – 5pm)', 'Anytime'];

export default function ContactOnsitePage() {
  const [contactType, setContactType] = useState<string | null>(null);
  const [times, setTimes] = useState<string[]>([]);
  const showCall = contactType !== null && contactType !== 'Email me';

  const toggleTime = (t: string) => {
    if (t === 'Anytime') { setTimes(['Anytime']); return; }
    setTimes(prev => {
      const without = prev.filter(x => x !== 'Anytime');
      return without.includes(t) ? without.filter(x => x !== t) : [...without, t];
    });
  };

  return (
    <div className={styles.page}>
      <div className={styles.decoTR}>
        <svg viewBox="0 0 480 480" fill="none"><path d="M 480 40 L 380 40 Q 360 40 360 60 L 360 140" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.3"/><path d="M 480 120 L 420 120 Q 400 120 400 140 L 400 220 Q 400 240 380 240 L 300 240" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.18"/><path d="M 480 80 L 440 80" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.5"/><circle cx="360" cy="140" r="3" fill="#00b050" fillOpacity="0.3"/></svg>
      </div>
      <div className={styles.decoBL}>
        <svg viewBox="0 0 320 320" fill="none"><path d="M 0 280 L 100 280 Q 120 280 120 260 L 120 180" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.25"/><path d="M 0 320 L 40 320" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.4"/></svg>
      </div>

      <div className={styles.inner}>
        <Link to="/services/onsite-logistics" className={styles.backLink}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/></svg>
          Back to On-Site Logistics
        </Link>

        <div className={styles.intro}>
          <span className={styles.eyebrow}>Get in touch</span>
          <h1 className={styles.h1}>Still got questions?<br /><em>Drop your details.</em></h1>
        </div>

        <div className={styles.layout}>
          <form className={styles.form} onSubmit={e => e.preventDefault()}>
            <div className={styles.formRow}>
              <div className={styles.field}><label>Name</label><input type="text" placeholder="Your name" /></div>
              <div className={styles.field}><label>Company</label><input type="text" placeholder="Company name" /></div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.field}><label>Email</label><input type="email" placeholder="you@company.com" /></div>
              <div className={styles.field}><label>Phone</label><input type="tel" placeholder="+61" /></div>
            </div>
            <div className={styles.field}>
              <label>Event name</label>
              <input type="text" placeholder="What event are you running?" />
            </div>
            <div className={styles.field}>
              <label>Preferred response</label>
              <div className={styles.typeRow}>
                {TYPES.map(t => (
                  <button
                    key={t}
                    type="button"
                    className={`${styles.typeBtn} ${contactType === t ? styles.typeBtnSelected : ''}`}
                    onClick={() => setContactType(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            {showCall && (
              <div className={styles.field}>
                <label>Best time to call <span>— select all that apply</span></label>
                <div className={styles.timeOptions}>
                  {TIMES.map(t => (
                    <button
                      key={t}
                      type="button"
                      className={`${styles.timeBtn} ${times.includes(t) ? styles.timeBtnSelected : ''}`}
                      onClick={() => toggleTime(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className={styles.field}>
              <label>Anything else we should know?</label>
              <textarea placeholder="Any questions, concerns, or context that might help us..." />
            </div>
            <div>
              <button type="submit" className={styles.submitBtn}>
                Send message
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>
              </button>
            </div>
          </form>

          <div className={styles.sidebar}>
            <div className={styles.responseBadge}>
              <div className={styles.pulseDot} />
              <p><strong>We'll get back to you within 24 hours.</strong> It's easier that way — right person, right answers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
