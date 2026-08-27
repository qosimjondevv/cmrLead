import { PageHeader } from '@/components/shared'
import { ProfileCard, AppearanceCard, LanguageCard, NotificationsCard } from '@/components/settings'
import { useTheme, useLanguage, useSettingsForm } from '@/hooks'

export default function Settings() {
  const { t, lang, setLang } = useLanguage()
  const { theme, setTheme } = useTheme()
  const {
    name,
    setName,
    email,
    setEmail,
    notifDeals,
    setNotifDeals,
    notifTasks,
    setNotifTasks,
    handleSaveProfile,
  } = useSettingsForm()

  return (
    <div className="flex h-full min-h-0 flex-col">
      <PageHeader title={t('settings.title')} description={t('settings.description')} />

      <div className="min-h-0 flex-1 overflow-y-auto scrollbar-thin px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-2xl flex-col gap-4">
          <ProfileCard name={name} onNameChange={setName} email={email} onEmailChange={setEmail} onSubmit={handleSaveProfile} />
          <AppearanceCard theme={theme} onThemeChange={setTheme} />
          <LanguageCard lang={lang} onLangChange={setLang} />
          <NotificationsCard
            notifDeals={notifDeals}
            onNotifDealsChange={setNotifDeals}
            notifTasks={notifTasks}
            onNotifTasksChange={setNotifTasks}
          />
        </div>
      </div>
    </div>
  )
}
