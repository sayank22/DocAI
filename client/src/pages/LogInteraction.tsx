import InteractionForm from "../components/InteractionForm";
import ChatInterface from "../components/ChatInterface";

const LogInteraction = () => {
  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh", overflow: "hidden" }}>
      <InteractionForm />
      <ChatInterface />
    </div>
  );
};

export default LogInteraction;