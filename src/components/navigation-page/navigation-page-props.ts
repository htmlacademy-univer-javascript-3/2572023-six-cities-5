export type AppNavBarProps = {
  isActive: boolean;
  showOptions: boolean;
  email?: string;
  favoriteCount?: number;
  onSignOutClick: () => void;
}
