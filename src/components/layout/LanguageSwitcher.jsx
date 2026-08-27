import { Languages } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui'
import { useLanguage } from '@/hooks'
import { LANGUAGE_OPTIONS } from '@/constants'
import { cn } from '@/lib/utils'

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex h-9 items-center gap-1.5 rounded-md px-2 text-sm font-medium text-foreground outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Change language"
        >
          <Languages className="size-[18px]" />
          <span className="uppercase">{lang}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {LANGUAGE_OPTIONS.map((opt) => (
          <DropdownMenuItem
            key={opt.value}
            onClick={() => setLang(opt.value)}
            className={cn('justify-between', lang === opt.value && 'font-medium text-primary')}
          >
            {opt.label}
            <span className="text-xs uppercase text-muted-foreground">{opt.value}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
