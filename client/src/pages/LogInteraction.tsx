import InteractionForm from "../components/InteractionForm";
import ChatInterface from "../components/ChatInterface";

const LogInteraction = () => {
  return (
    <div style={{ display: "flex" }}>
      <InteractionForm />
      <ChatInterface />
    </div>
  );
};

export default LogInteraction;