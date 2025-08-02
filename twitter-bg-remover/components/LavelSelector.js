export default function LabelSelector({ labels, selected, setSelected }) {
  return (
    <div className="flex space-x-3 mt-4">
      {labels.map((label, idx) => (
        <img
          key={idx}
          src={`/labels/${label}`}
          alt={`label-${idx}`}
          className={`w-16 h-16 cursor-pointer ${selected === label ? "ring-4 ring-blue-500" : ""}`}
          onClick={() => setSelected(label)}
        />
      ))}
    </div>
  );
}
