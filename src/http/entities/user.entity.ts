export enum Permission {
  ADMIN = 1,
  EDITOR = 2,
  VIEWER = 3,
}

interface UserProps {
  ldap: number;
  name: string;
  email: string;
  permissions?: Record<string, Permission> | null;
}

function normalizePermissions(
  permissions: UserProps['permissions'],
): UserProps['permissions'] | null {
  if (!permissions) return null;
  const isValidPermission = (permission: Permission) =>
    Object.values(Permission).includes(permission);

  return Object.entries(permissions).reduce((acc, [key, value]) => {
    if (isValidPermission(value)) acc[key] = value;
    else acc[key] = Permission.VIEWER;
    return acc;
  }, {});
}

export class UserEntity {
  private props: UserProps;

  constructor({ email, ldap, name, permissions }: UserProps) {
    this.props = {
      email,
      ldap,
      name,
      permissions: normalizePermissions(permissions),
    };
  }

  get info(): Omit<UserEntity['props'], 'permissions'> {
    return {
      name: this.props.name,
      ldap: this.props.ldap,
      email: this.props.email,
    };
  }

  get permissions(): UserEntity['props']['permissions'] {
    return this.props.permissions;
  }
}
