import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Chatbot } from './components/Chatbot';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Chatbot />
    </>
  );
}

export default App;
