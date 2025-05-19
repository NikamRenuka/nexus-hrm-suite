
export const getRoleBadgeVariant = (role: string) => {
  switch (role) {
    case 'super_admin':
      return 'destructive';
    case 'admin':
      return 'default';
    case 'hr':
      return 'secondary';
    case 'manager':
      return 'outline';
    default:
      return 'secondary';
  }
};
