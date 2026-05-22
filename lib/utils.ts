import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhone(phone: string): string {
  return phone.replace(/\s/g, '')
}

export const PHONE = '06 06 44 17 81'
export const PHONE_HREF = 'tel:+33606441781'
export const EMAIL = '82@neuf.fr'
export const FACEBOOK_URL = 'https://www.facebook.com/Robinsdestoits/?notif_id=1778005996345505&notif_t=follower_invite&ref=notif'
export const INSTAGRAM_URL = 'https://www.instagram.com/vincecardo82/'
export const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/wALxvHXvYiK7rUR78'
