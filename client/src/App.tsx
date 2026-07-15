import LogInteraction from "./pages/LogInteraction";
import { Toaster } from 'sonner';

function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <LogInteraction />
    </>
  );
}

export default App;