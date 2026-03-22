import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { supabase } from '../../lib/supabase';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Page = styled.div`
  min-height: 100vh;
  background: #f5f5f3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  font-family: 'DM Sans', sans-serif;
`;

const Card = styled.div`
  background: #ffffff;
  border: 1.5px solid #eaeae8;
  border-radius: 18px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  animation: ${fadeUp} 0.4s ease both;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 32px;
`;

const LogoBox = styled.div`
  width: 34px;
  height: 34px;
  background: #00c05a;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: 17px;
  color: #000;
  flex-shrink: 0;
`;

const LogoWords = styled.div`
  strong {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 14px;
    color: #111214;
    display: block;
    line-height: 1.2;
  }
  small {
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #b0b0b0;
  }
`;

const Heading = styled.h1`
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: 22px;
  color: #111214;
  margin-bottom: 6px;
`;

const Sub = styled.p`
  font-size: 13.5px;
  color: #6b7280;
  margin-bottom: 28px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;

  label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #6b7280;
  }

  input {
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    color: #111214;
    background: #ffffff;
    border: 1.5px solid #e0e0de;
    border-radius: 8px;
    padding: 10px 12px;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;

    &:focus {
      border-color: #00c05a;
      box-shadow: 0 0 0 3px rgba(0, 192, 90, 0.10);
    }

    &::placeholder { color: #b0b0b0; }
  }
`;

const SubmitBtn = styled.button<{ $loading: boolean }>`
  width: 100%;
  margin-top: 8px;
  padding: 11px;
  background: ${p => p.$loading ? '#00a84e' : '#00c05a'};
  color: #000;
  border: none;
  border-radius: 9px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 700;
  cursor: ${p => p.$loading ? 'not-allowed' : 'pointer'};
  transition: background 0.15s;

  &:hover:not(:disabled) { background: #00a84e; }
`;

const ErrorMsg = styled.div`
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.25);
  color: #b91c1c;
  font-size: 13px;
  padding: 10px 13px;
  border-radius: 8px;
  margin-bottom: 14px;
`;

export default function LoginPage() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError('Invalid email or password.');
      setLoading(false);
    } else {
      navigate('/admin');
    }
  };

  return (
    <Page>
      <Card>
        <Logo>
          <LogoBox>A</LogoBox>
          <LogoWords>
            <strong>Axis Events</strong>
            <small>Admin Panel</small>
          </LogoWords>
        </Logo>

        <Heading>Sign in</Heading>
        <Sub>Admin access only.</Sub>

        {error && <ErrorMsg>{error}</ErrorMsg>}

        <form onSubmit={handleSubmit}>
          <Field>
            <label>Email</label>
            <input
              type="email"
              placeholder="you@axisevents.com.au"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </Field>
          <Field>
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </Field>
          <SubmitBtn type="submit" $loading={loading} disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </SubmitBtn>
        </form>
      </Card>
    </Page>
  );
}
