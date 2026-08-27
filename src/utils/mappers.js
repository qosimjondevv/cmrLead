export function initialsFromName(name) {
  if (!name) return '?'
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

export function mapApiDeal(raw) {
  return {
    id: raw.id,
    title: raw.title,
    value: raw.value ?? 0,
    currency: raw.currency ?? 'USD',
    stage: raw.stage,
    probability: raw.probability,
    closeDate: raw.close_date,
    status: raw.status,
    ownerName: raw.owner?.name,
    ownerInitials: initialsFromName(raw.owner?.name),
    contactId: raw.contact?.id,
    contactName: raw.contact?.name,
    contactEmail: raw.contact?.email,
    companyId: raw.company?.id,
    companyName: raw.company?.name,
    companyIndustry: raw.company?.industry,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  }
}

export function mapApiContact(raw) {
  return {
    id: raw.id,
    name: raw.name ?? `${raw.first_name ?? ''} ${raw.last_name ?? ''}`.trim(),
    firstName: raw.first_name,
    lastName: raw.last_name,
    email: raw.email,
    phone: raw.phone,
    title: raw.title,
    status: raw.status,
    source: raw.source,
    ownerName: raw.owner?.name,
    ownerInitials: initialsFromName(raw.owner?.name),
    companyId: raw.company_id ?? raw.company?.id,
    companyName: raw.company?.name,
    companyIndustry: raw.company?.industry,
    tags: raw.tags ?? [],
    activityCount: raw.activity_count ?? 0,
    createdAt: raw.created_at,
  }
}
