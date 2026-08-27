import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Input,
  Label,
  Avatar,
  AvatarFallback,
} from '@/components/ui'
import { useLanguage } from '@/hooks'

export function ProfileCard({ name, onNameChange, email, onEmailChange, onSubmit }) {
  const { t } = useLanguage()
  return (
    <Card>
      <form onSubmit={onSubmit}>
        <CardHeader>
          <CardTitle>{t('settings.profileTitle')}</CardTitle>
          <CardDescription>{t('settings.profileDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="size-14">
              <AvatarFallback className="text-base">AD</AvatarFallback>
            </Avatar>
            <Button type="button" variant="outline" size="sm">
              {t('settings.changeAvatar')}
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="s-name">{t('settings.fullName')}</Label>
              <Input id="s-name" value={name} onChange={(e) => onNameChange(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="s-email">{t('settings.email')}</Label>
              <Input id="s-email" type="email" value={email} onChange={(e) => onEmailChange(e.target.value)} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button type="submit">{t('common.saveChanges')}</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
