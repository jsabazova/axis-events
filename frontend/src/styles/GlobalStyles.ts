import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
  }

  body {
    font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    background: #ffffff;
    color: #141414;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  a { text-decoration: none; color: inherit; }
  button { font-family: inherit; cursor: pointer; border: none; background: none; }
  ul, ol { list-style: none; margin: 0; padding: 0; }
  img { max-width: 100%; display: block; }

  /* Utility container */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 40px;

    @media (max-width: 760px) {
      padding: 0 20px;
    }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.35; }
  }
`;
