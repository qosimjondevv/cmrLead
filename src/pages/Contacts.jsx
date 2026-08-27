import { Search, Plus, Users } from 'lucide-react'
import {
  PageHeader,
  EmptyState,
  ErrorState,
  ListSkeleton,
  ConfirmDialog,
} from '@/components/shared'
import { Button, Input } from '@/components/ui'
import { ContactModal, ContactsTable, ContactsCardList } from '@/components/contacts'
import { useContactsPage, useLanguage } from '@/hooks'

export default function Contacts() {
  const { t } = useLanguage()
  const {
    search,
    setSearch,
    filtered,
    loading,
    error,
    refetch,
    modalOpen,
    setModalOpen,
    editing,
    openCreate,
    openEdit,
    submitContact,
    deleting,
    setDeleting,
    confirmDelete,
  } = useContactsPage()

  return (
    <div className="flex h-full min-h-0 flex-col">
      <PageHeader
        title={t('contacts.title')}
        description={t('contacts.description')}
        actions={
          <Button onClick={openCreate} className="gap-1.5">
            <Plus className="size-4" />
            {t('contacts.newContact')}
          </Button>
        }
      />

      <div className="border-b bg-background px-4 py-3 sm:px-6">
        <div className="relative max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('contacts.searchPlaceholder')}
            className="h-9 pl-8"
          />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto scrollbar-thin px-4 py-4 sm:px-6">
        {loading ? (
          <ListSkeleton />
        ) : error ? (
          <ErrorState title={t('contacts.loadError')} onRetry={refetch} />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={Users}
            title={t('contacts.noContactsFound')}
            description={search ? t('contacts.tryDifferentSearch') : t('contacts.noContactsYet')}
            actionLabel={search ? undefined : t('contacts.createContact')}
            onAction={openCreate}
          />
        ) : (
          <>
            <ContactsTable contacts={filtered} onEdit={openEdit} onDelete={setDeleting} />
            <ContactsCardList contacts={filtered} onEdit={openEdit} onDelete={setDeleting} />
          </>
        )}
      </div>

      <ContactModal open={modalOpen} onOpenChange={setModalOpen} contact={editing} onSubmit={submitContact} />

      <ConfirmDialog
        open={Boolean(deleting)}
        onOpenChange={(open) => !open && setDeleting(null)}
        title={t('contacts.deleteContactTitle')}
        description={`"${deleting?.name}" ${t('contacts.deleteContactDescription')}`}
        onConfirm={confirmDelete}
      />
    </div>
  )
}
