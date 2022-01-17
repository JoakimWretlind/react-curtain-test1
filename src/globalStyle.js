import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    *,
    ::after,
    ::before {
      margin: 0;
      padding: 0;
      box-sizing: inherit;
    }
    
    html {
      font-size: 62.5%;
    }
    
    body {
      box-sizing: border-box;
      font-family: 'montserrat', sans-serif;
    }
    
    a {
      text-decoration: none;
    }
    
    ul, li {
      list-style: none;
    }

/* CSS for react-curtain */
/* curtains canvas */
/* position has to be absolute*/
.curtains-canvas {  
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh; 
  pointer-events: none;
}

.SimplePlane {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
}

.SimplePlane img {
  display: none;
  object-fit: cover;
}
`;