import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ContactFreightPage.module.scss';

const MODES = ['Air freight', 'Sea freight', 'Not sure yet'];

export default function ContactFreightPage() {
  const [mode, setMode] = useState<string | null>(null);

  return (
    <div className={styles.page}>
      <div className={styles.decoTR}>
        <svg viewBox="0 0 480 480" fill="none"><path d="M 480 40 L 380 40 Q 360 40 360 60 L 360 140" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.3"/><path d="M 480 120 L 420 120 Q 400 120 400 140 L 400 220 Q 400 240 380 240 L 300 240" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.18"/><path d="M 480 80 L 440 80" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.5"/><path d="M 480 200 L 460 200" stroke="#00b050" strokeWidth="1" strokeOpacity="0.3"/><circle cx="360" cy="140" r="3" fill="#00b050" fillOpacity="0.3"/><circle cx="400" cy="240" r="3" fill="#00b050" fillOpacity="0.2"/></svg>
      </div>
      <div className={styles.decoBL}>
        <svg viewBox="0 0 320 320" fill="none"><path d="M 0 280 L 100 280 Q 120 280 120 260 L 120 180" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.25"/><path d="M 0 200 L 60 200 Q 80 200 80 180 L 80 120" stroke="#00b050" strokeWidth="1" strokeOpacity="0.15"/><path d="M 0 320 L 40 320" stroke="#00b050" strokeWidth="1.5" strokeOpacity="0.4"/></svg>
      </div>

      <div className={styles.inner}>
        <Link to="/services/international-freight" className={styles.backLink}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/></svg>
          Back to International Freight
        </Link>

        <div className={styles.intro}>
          <span className={styles.eyebrow}>International Freight Enquiry</span>
          <h1 className={styles.h1}>Tell us what<br />you're <em>moving.</em></h1>
          <p className={styles.sub}>The more detail you give us, the faster we can come back with a proper answer. Show date, origin, destination — even rough numbers help.</p>
        </div>

        <div className={styles.layout}>
          <form className={styles.form} onSubmit={e => e.preventDefault()}>
            <div className={styles.sectionLabel}>Your details</div>
            <div className={styles.formRow}>
              <div className={styles.field}><label>Name</label><input type="text" placeholder="Your name" /></div>
              <div className={styles.field}><label>Company</label><input type="text" placeholder="Company name" /></div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.field}><label>Email</label><input type="email" placeholder="you@company.com" /></div>
              <div className={styles.field}><label>Phone <span>— optional</span></label><input type="tel" placeholder="+61" /></div>
            </div>

            <div className={styles.sectionLabel} style={{marginTop: 8}}>Shipment details</div>

            <div className={styles.field}>
              <label>Freight mode</label>
              <div className={styles.modeToggle}>
                {MODES.map(m => (
                  <button
                    key={m}
                    type="button"
                    className={`${styles.modeBtn} ${mode === m ? styles.modeBtnSelected : ''}`}
                    onClick={() => setMode(m)}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.field}><label>Origin country / city</label><input type="text" placeholder="e.g. Germany, Frankfurt" /></div>
              <div className={styles.field}><label>Destination country / city</label><input type="text" placeholder="e.g. Australia, Melbourne" /></div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.field}>
                <label>What are you shipping?</label>
                <select defaultValue="">
                  <option value="" disabled>Select type</option>
                  <option>Boxes / cartons</option>
                  <option>Pallets</option>
                  <option>Full container load (FCL)</option>
                  <option>Display stand / exhibit</option>
                  <option>Crates / flightcases</option>
                  <option>Machinery / equipment</option>
                  <option>Mixed / multiple types</option>
                  <option>Not sure yet</option>
                </select>
              </div>
            </div>

            <div className={styles.field}>
              <label>Anything else we should know? <span>— optional</span></label>
              <textarea placeholder="Fragile items, special handling requirements, tight deadlines, previous shipper issues — anything useful." />
            </div>

            <div>
              <button type="submit" className={styles.submitBtn}>
                Send enquiry
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>
              </button>
            </div>
          </form>

          <div className={styles.sidebar}>
            <div className={styles.responseBadge}>
              <div className={styles.pulseDot} />
              <p><strong>We'll get back to you by email within 24 hours.</strong> If it makes sense, we can arrange a video call to run through your requirements and put a proper plan together.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
