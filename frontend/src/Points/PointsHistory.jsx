export default function PointsHistory({ history }) {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium mb-2">Points History</h3>
      <ul className="space-y-2">
        {history.map((item, index) => (
          <li key={index} className="flex justify-between py-2 border-b border-gray-100">
            <span>{item.date}</span>
            <span className="font-medium">+{item.points}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}