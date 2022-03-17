import { React } from 'react'
import SignUp from './components/SignUp';
import { ProvideAuth, useAuth } from './services/firebase';
import SignIn from './components/SignIn';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage';

function App() {
  const auth = useAuth();
  return (
    <ProvideAuth>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </ProvideAuth>
  );
}

export default App;
