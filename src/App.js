import { GlobalStyle } from './globalStyle'
import Home from "./pages/Home";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Home />
    </>
  );
}

// TODO:
// apply effect only when image is hovered (currently the effect is on as soon as the mouse is moved)
// custom cursor with effect on hover
// make header clickable - affect custom cursor
