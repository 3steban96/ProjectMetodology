import KanbanBoard from '../kanbanBoard/KanbanBoard'

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <KanbanBoard />
    </div>
  )
}
