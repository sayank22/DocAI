import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { updateField } from "../redux/interactionSlice";

const InteractionForm = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.interaction);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(updateField({ field: e.target.name as keyof typeof data, value: e.target.value }));
  };

  return (
    <div style={{ width: "50%", padding: "20px" }}>
      <h2>Log Interaction</h2>

      <input
        name="hcpName"
        placeholder="HCP Name"
        value={data.hcpName}
        onChange={handleChange}
      />

      <input
        name="interactionType"
        placeholder="Interaction Type"
        value={data.interactionType}
        onChange={handleChange}
      />

      <input
        name="date"
        type="date"
        value={data.date}
        onChange={handleChange}
      />

      <textarea
        name="topics"
        placeholder="Topics Discussed"
        value={data.topics}
        onChange={handleChange}
      />

      <input
        name="sentiment"
        placeholder="Sentiment"
        value={data.sentiment}
        onChange={handleChange}
      />

      <textarea
        name="followUp"
        placeholder="Follow-up Actions"
        value={data.followUp}
        onChange={handleChange}
      />
    </div>
  );
};

export default InteractionForm;