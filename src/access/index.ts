import type { Access } from 'payload'

export const isSuperAdmin: Access = ({ req }) => {
  return (req.user as any)?.role === 'superadmin'
}

export const isAdmin: Access = ({ req }) => {
  const role = (req.user as any)?.role
  return role === 'admin' || role === 'superadmin'
}

export const isAdminOrSelf: Access = ({ req, id }) => {
  if (!req.user) return false
  const role = (req.user as any)?.role
  if (role === 'superadmin') return true
  if (id && String((req.user as any)?.id) === String(id)) return true
  return false
}
