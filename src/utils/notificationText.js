const KNOWN_TYPES = ['order_shipped', 'comment_reply', 'mention']

export function getNotificationText(notification, t) {
  const type = KNOWN_TYPES.includes(notification?.type) ? notification.type : 'default'
  return {
    title: t(`header.notificationTypes.${type}.title`),
    message: t(`header.notificationTypes.${type}.message`),
  }
}
