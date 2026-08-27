import { Search, User2, Briefcase } from 'lucide-react'
import { Input, Popover, PopoverTrigger, PopoverContent } from '@/components/ui'
import { useLanguage, useGlobalSearch } from '@/hooks'

export function GlobalSearch({ className }) {
  const { t } = useLanguage()
  const { query, updateQuery, open, setOpen, results, selectDeal, selectContact } = useGlobalSearch()
  const hasResults = results.deals.length > 0 || results.contacts.length > 0

  return (
    <Popover open={open && query.trim().length > 0} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className={className}>
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => updateQuery(e.target.value)}
              onFocus={() => setOpen(true)}
              placeholder={t('header.searchPlaceholder')}
              className="h-9 w-full pl-8"
            />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width,20rem)] p-1.5"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {!hasResults && (
          <p className="px-2 py-4 text-center text-sm text-muted-foreground">{t('common.noResultsFound')}</p>
        )}
        {results.deals.length > 0 && (
          <div className="mb-1">
            <p className="px-2 py-1 text-xs font-medium text-muted-foreground">{t('header.deals')}</p>
            {results.deals.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={selectDeal}
                className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent"
              >
                <Briefcase className="size-3.5 text-muted-foreground" />
                {d.title}
              </button>
            ))}
          </div>
        )}
        {results.contacts.length > 0 && (
          <div>
            <p className="px-2 py-1 text-xs font-medium text-muted-foreground">{t('header.contacts')}</p>
            {results.contacts.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={selectContact}
                className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent"
              >
                <User2 className="size-3.5 text-muted-foreground" />
                {c.name}
              </button>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
