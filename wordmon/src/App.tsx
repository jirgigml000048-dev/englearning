import { HashRouter, Routes, Route } from 'react-router-dom';
import { MainMenu } from './routes/MainMenu';
import { Round } from './routes/Round';

function DexPlaceholder() {
  return (
    <div className="h-full w-full flex items-center justify-center font-en text-2xl text-ink-dim">
      Pokedex (Day 2+)
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <div className="h-screen w-screen overflow-hidden">
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/round/:id" element={<Round />} />
          <Route path="/dex" element={<DexPlaceholder />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
