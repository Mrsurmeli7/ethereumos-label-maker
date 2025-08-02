export default function ColorPicker({ color, setColor }) {
  return (
    <div className="flex items-center space-x-2">
      <label>Arka plan rengi:</label>
      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
    </div>
  );
}
