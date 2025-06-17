// KanbanBoard.jsx

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { useState, useEffect } from 'react'
import axios from 'axios'

const initialData = {
  todo: [
    { id: '1', content: 'Investigar cliente', descripcion: '', asignado_a: '', horas_estimadas: '', horas_reales: '', comments: [] },
    { id: '2', content: 'Diseñar wireframe', descripcion: '', asignado_a: '', horas_estimadas: '', horas_reales: '', comments: [] },
  ],
  inProgress: [
    { id: '3', content: 'Crear prototipo', descripcion: '', asignado_a: '', horas_estimadas: '', horas_reales: '', comments: [] }
  ],
  done: [
    { id: '4', content: 'Reunión inicial', descripcion: '', asignado_a: '', horas_estimadas: '', horas_reales: '', comments: [] }
  ]
}

export default function KanbanBoard() {
  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem('kanban-columns')
    return saved ? JSON.parse(saved) : initialData
  })
  const [newTask, setNewTask] = useState('')
  const [selectedTask, setSelectedTask] = useState(null)
  const [commentText, setCommentText] = useState('')

  useEffect(() => {
    localStorage.setItem('kanban-columns', JSON.stringify(columns))
  }, [columns])

  const handleDragEnd = ({ source, destination }) => {
    if (!destination) return
    const sourceCol = [...columns[source.droppableId]]
    const destCol = [...columns[destination.droppableId]]
    const [movedTask] = sourceCol.splice(source.index, 1)

    if (source.droppableId === destination.droppableId) {
      sourceCol.splice(destination.index, 0, movedTask)
      setColumns({ ...columns, [source.droppableId]: sourceCol })
    } else {
      movedTask.estado = destination.droppableId
      destCol.splice(destination.index, 0, movedTask)
      setColumns({ ...columns, [source.droppableId]: sourceCol, [destination.droppableId]: destCol })
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && newTask.trim()) {
      const newId = Date.now().toString()
      const updated = [...columns.todo, {
        id: newId,
        content: newTask,
        descripcion: '',
        asignado_a: '',
        horas_estimadas: '',
        horas_reales: '',
        comments: []
      }]
      setColumns({ ...columns, todo: updated })
      setNewTask('')
    }
  }

  const deleteTask = (columnId, taskId) => {
    const updated = columns[columnId].filter(task => task.id !== taskId)
    setColumns({ ...columns, [columnId]: updated })
  }

  const openTaskModal = (task) => {
    setSelectedTask({ ...task })
    setCommentText('')
  }

  const addComment = () => {
    if (!commentText.trim()) return
    const updatedColumns = { ...columns }
    for (let column in updatedColumns) {
      updatedColumns[column] = updatedColumns[column].map(task => {
        if (task.id === selectedTask.id) {
          return { ...task, comments: [...task.comments, commentText] }
        }
        return task
      })
    }
    setColumns(updatedColumns)
    setCommentText('')
  }

  const updateTaskInDatabase = async () => {
    try {
      await axios.put(`http://localhost:3000/tareas/${selectedTask.id}`, {
        titulo: selectedTask.content,
        descripcion: selectedTask.descripcion,
        asignado_a: selectedTask.asignado_a,
        horas_estimadas: selectedTask.horas_estimadas,
        horas_reales: selectedTask.horas_reales
      })
      alert('Tarea actualizada exitosamente')
      closeModal()
    } catch (err) {
      console.error(err)
      alert('Error al actualizar la tarea')
    }
  }

  const closeModal = () => setSelectedTask(null)

  const columnColors = {
    todo: 'bg-blue-100',
    inProgress: 'bg-yellow-100',
    done: 'bg-green-100',
  }

  const statusChips = {
    todo: { text: 'To Do', color: 'bg-blue-200 text-blue-800' },
    inProgress: { text: 'En Proceso', color: 'bg-yellow-200 text-yellow-800' },
    done: { text: 'Hecho', color: 'bg-green-200 text-green-800' },
  }

  return (
    <div className="bg-white text-black min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Tablero Kanban</h2>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(columns).map(([columnId, tasks]) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`${columnColors[columnId]} rounded-lg p-4 min-h-[250px] shadow-sm transition-all`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold capitalize text-lg">
                      {columnId === 'todo' ? 'Por hacer' : columnId === 'inProgress' ? 'En proceso' : 'Hecho'}
                    </h3>
                    <span className="text-sm opacity-70">{tasks.length} tareas</span>
                  </div>

                  {columnId === 'todo' && (
                    <input
                      type="text"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Agregar nueva tarea..."
                      className="w-full p-2 mb-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  )}

                  {tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white p-3 my-2 rounded-lg shadow-sm transition-transform duration-200 hover:scale-[1.01] cursor-pointer"
                          onClick={() => openTaskModal(task)}
                        >
                          <div className="flex justify-between items-center">
                            <p className="text-sm">{task.content}</p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteTask(columnId, task.id)
                              }}
                              className="text-red-500 text-xs ml-2 hover:underline"
                            >
                              Eliminar
                            </button>
                          </div>
                          <span className={`text-xs px-2 py-1 mt-1 inline-block rounded-full ${statusChips[columnId].color}`}>
                            {statusChips[columnId].text}
                          </span>
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {selectedTask && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 transition duration-300 ease-out animate-fadeIn">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 w-full max-w-md shadow-2xl transform transition duration-300 ease-out scale-95 animate-slideUp">
            <h3 className="text-lg font-bold mb-2">Editar tarea: {selectedTask.content}</h3>

            <input type="text" value={selectedTask.content} onChange={(e) => setSelectedTask({ ...selectedTask, content: e.target.value })} placeholder="Título" className="w-full p-2 mb-2 border rounded" />
            <textarea value={selectedTask.descripcion} onChange={(e) => setSelectedTask({ ...selectedTask, descripcion: e.target.value })} placeholder="Descripción" className="w-full p-2 mb-2 border rounded" />
            <input type="number" value={selectedTask.asignado_a} onChange={(e) => setSelectedTask({ ...selectedTask, asignado_a: e.target.value })} placeholder="Asignado a (ID)" className="w-full p-2 mb-2 border rounded" />
            <input type="number" step="0.01" value={selectedTask.horas_estimadas} onChange={(e) => setSelectedTask({ ...selectedTask, horas_estimadas: e.target.value })} placeholder="Horas estimadas" className="w-full p-2 mb-2 border rounded" />
            <input type="number" step="0.01" value={selectedTask.horas_reales} onChange={(e) => setSelectedTask({ ...selectedTask, horas_reales: e.target.value })} placeholder="Horas reales" className="w-full p-2 mb-4 border rounded" />

            <div className="flex justify-between">
              <button onClick={updateTaskInDatabase} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Guardar cambios</button>
              <button onClick={closeModal} className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400">Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
