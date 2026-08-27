export function groupDealsByStage(deals, stages) {
  const map = {}
  for (const stage of stages) map[stage.id] = []
  for (const deal of deals) {
    if (map[deal.stage]) map[deal.stage].push(deal)
  }
  return map
}

export function sumDealValues(deals) {
  return deals.reduce((sum, d) => sum + (d.value || 0), 0)
}
