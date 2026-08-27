import { PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'

export function useKanbanSensors() {
  return useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 8 } })
  )
}
