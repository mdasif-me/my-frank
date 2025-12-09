import {
  PieChartIcon as CompetitorAnalysisAltIcon,
  Home01Icon as HomeAltIcon,
  Calendar02Icon as MyCampaignsAltIcon,
  Bitcoin03Icon as PlanBillingsAltIcon,
  GiftIcon as RewardsAltIcon,
  Setting07Icon as SettingsAltIcon,
  StarIcon as StarAltIcon,
  StoreLocation02Icon as StoreLocationAltIcon,
  UserGroup03Icon as TeamMembersAltIcon,
} from '@hugeicons-pro/core-solid-rounded';
import {
  PieChartIcon as CompetitorAnalysisIcon,
  Home01Icon as HomeIcon,
  Calendar02Icon as MyCampaignsIcon,
  Bitcoin03Icon as PlanBillingsIcon,
  GiftIcon as RewardsIcon,
  Setting07Icon as SettingsIcon,
  StarIcon,
  StoreLocation02Icon as StoreLocationIcon,
  UserGroup03Icon as TeamMembersIcon,
} from '@hugeicons-pro/core-stroke-rounded';

export interface IMenuItem {
  id: string;
  label: string;
  path: string;
  icon: any;
  altIcon: any;
}

export const MenuItems: IMenuItem[] = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: HomeIcon,
    altIcon: HomeAltIcon,
  },
  {
    id: 'review-management',
    label: 'Review Management',
    path: '/review-management',
    icon: StarIcon,
    altIcon: StarAltIcon,
  },
  {
    id: 'team-members',
    label: 'Team Members',
    path: '/team-members',
    icon: TeamMembersIcon,
    altIcon: TeamMembersAltIcon,
  },
  {
    id: 'my-campaigns',
    label: 'My Campaigns',
    path: '/my-campaigns',
    icon: MyCampaignsIcon,
    altIcon: MyCampaignsAltIcon,
  },
  {
    id: 'rewards',
    label: 'Rewards',
    path: '/rewards',
    icon: RewardsIcon,
    altIcon: RewardsAltIcon,
  },
  {
    id: 'competitor-analysis',
    label: 'Competitor Analysis',
    path: '/competitor-analysis',
    icon: CompetitorAnalysisIcon,
    altIcon: CompetitorAnalysisAltIcon,
  },
  {
    id: 'plan-billings',
    label: 'Plan $ Billings',
    path: '/plan-billings',
    icon: PlanBillingsIcon,
    altIcon: PlanBillingsAltIcon,
  },
  {
    id: 'my-network',
    label: 'My Network',
    path: '/my-network',
    icon: StoreLocationIcon,
    altIcon: StoreLocationAltIcon,
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: SettingsIcon,
    altIcon: SettingsAltIcon,
  },
];
