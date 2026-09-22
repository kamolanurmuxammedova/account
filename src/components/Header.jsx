import { useState } from "react";
import AuthModal from "../components/AuthModal"; // путь поправь под себя

// внутри компонента:
const [authOpen, setAuthOpen] = useState(false);

// вместо/рядом с иконками сердца и корзины:
{realToken ? (
  <Button onClick={() => { localStorage.removeItem("accessToken1"); setrealToken(null); }}>
    Выйти
  </Button>
) : (
  <Button onClick={() => setAuthOpen(true)}>Войти</Button>
)}

<AuthModal
  open={authOpen}
  onClose={() => setAuthOpen(false)}
  setrealToken={setrealToken}
/>