import {
  AlertCircleIcon,
  AlertHexagonIcon,
  AlignBoxBottomLeftIcon,
  ApertureIcon,
  AppsIcon,
  AppWindowIcon,
  BasketIcon,
  BorderAllIcon,
  BorderHorizontalIcon,
  BorderInnerIcon,
  BorderStyle2Icon,
  BorderTopIcon,
  BorderVerticalIcon,
  BoxAlignBottomIcon,
  BoxAlignLeftIcon,
  BoxIcon,
  BoxModelIcon,
  BrandTidalIcon,
  CalendarIcon,
  CardboardsIcon,
  ChartArcsIcon,
  ChartAreaIcon,
  ChartCandleIcon,
  ChartDonut3Icon,
  ChartDotsIcon,
  ChartLineIcon,
  ChartRadarIcon,
  ColumnsIcon,
  CopyIcon,
  CurrencyDollarIcon,
  EditIcon,
  EyeTableIcon,
  FidgetSpinnerIcon,
  FileCheckIcon,
  FileDotsIcon,
  FilesIcon,
  FileTextIcon,
  FilterIcon,
  HelpIcon,
  JumpRopeIcon,
  LayoutDashboardIcon,
  LayoutKanbanIcon,
  LoginIcon,
  MailIcon,
  Message2Icon,
  MoodHappyIcon,
  PageBreakIcon,
  PhotoAiIcon,
  PointIcon,
  RotateIcon,
  RowInsertBottomIcon,
  SearchIcon,
  ServerIcon,
  SettingsIcon,
  ShoppingCartIcon,
  SocialIcon,
  SortAscendingIcon,
  TableIcon,
  TicketIcon,
  TypographyIcon,
  UserCircleIcon,
  UserPlusIcon,
  UserShieldIcon,
  ZoomCodeIcon
} from "vue-tabler-icons";
export interface menu {
  header?: string;
  title?: string;
  icon?: any;
  to?: string;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
  external?: boolean;
}

const sidebarItem: menu[] = [
  { header: "Yönetim" },
  {
    title: "Dashboard",
    icon: LayoutDashboardIcon,
    to: "/",
    external: false,
  },
  {
    title: "Yatlar",
    icon: BoxIcon,
    to: "/yachts",
    external: false,
  },
  {
    title: "Deneyimler",
    icon: BrandTidalIcon,
    to: "/experiences",
    external: false,
  },
  {
    title: "Müşteri Yorumları",
    icon: Message2Icon,
    to: "/reviews",
    external: false,
  },
  {
    title: "Rezervasyonlar",
    icon: CalendarIcon,
    to: "/reservations",
    external: false,
  },
  {
    title: "Blog & Yazılar",
    icon: FileTextIcon,
    to: "/blogs",
    external: false,
  },

  {
    title: "301 Yönlendirme",
    icon: RotateIcon,
    to: "/redirects",
    external: false,
  },
  {
    title: "Site Ayarları",
    icon: SettingsIcon,
    to: "/site-settings",
    external: false,
  },
];
export default sidebarItem;
