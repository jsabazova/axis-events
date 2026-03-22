import styled from 'styled-components';

const Wrap = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 56px);
  gap: 14px;
  color: #6b7280;
  font-family: 'DM Sans', sans-serif;
`;

const Icon = styled.div`
  width: 52px; height: 52px;
  background: #f5f5f3;
  border: 1.5px solid #eaeae8;
  border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  color: #b0b0b0;
  svg { width: 22px; height: 22px; }
`;

const Badge = styled.span`
  font-size: 11px;
  font-weight: 600;
  background: rgba(245,158,11,0.12);
  color: #92400e;
  border: 1px solid rgba(245,158,11,0.25);
  padding: 3px 10px;
  border-radius: 100px;
  letter-spacing: 0.04em;
`;

export default function AdminDashboard() {
  return (
    <Wrap>
      <Icon>
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="7" height="7" rx="1.5"/>
          <rect x="11" y="2" width="7" height="7" rx="1.5"/>
          <rect x="2" y="11" width="7" height="7" rx="1.5"/>
          <rect x="11" y="11" width="7" height="7" rx="1.5"/>
        </svg>
      </Icon>
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, color: '#111214' }}>
        Dashboard
      </h2>
      <p style={{ fontSize: 13.5, textAlign: 'center', maxWidth: 280, lineHeight: 1.6 }}>
        Live onsite view — truck unloads, driver assignments, storage, equipment and labour on site.
      </p>
      <Badge>Coming soon</Badge>
    </Wrap>
  );
}
