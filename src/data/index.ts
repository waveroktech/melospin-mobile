import theme from 'theme';

export const onboardingData = [
  {
    id: 1,
    title: 'Connect',
    description: 'Best DJs around you, explore globally.',
    image: theme.images.onboarding['onboarding-1'],
    bgImage: theme.images.bg['onboarding-bg-1'],
  },
  {
    id: 2,
    title: 'Promote',
    description: 'Your music, reach more audience.',
    image: theme.images.onboarding['onboarding-2'],
    bgImage: theme.images.bg['onboarding-bg-2'],
  },
];

export const genres = [
  {
    id: 1,
    title: 'RnB',
  },
  {
    id: 2,
    title: 'Hip-pop',
  },
  {
    id: 3,
    title: 'Rap Music',
  },
  {
    id: 4,
    title: 'Amapiano',
  },
  {
    id: 5,
    title: 'Pop',
  },
  {
    id: 6,
    title: 'House',
  },
  {
    id: 7,
    title: 'Electronica',
  },
  {
    id: 8,
    title: 'Jazz',
  },
  {
    id: 9,
    title: 'EDM',
  },
];

export const newReleases = [
  {
    id: 1,
    title: 'Baddest',
    artist: 'DJ  Shawn',
    cover: theme.images.releases['release-1'],
  },
  {
    id: 2,
    title: 'Lonely at the top',
    artist: 'Asake',
    cover: theme.images.releases['release-2'],
  },
  {
    id: 3,
    title: 'Funds',
    artist: 'Davido Ft Odumodublack',
    cover: theme.images.releases['release-3'],
  },
];

export const promotions = [
  {
    id: 1,
    title: 'Baddest.zip',
    status: 'Completed',
    sharedWith: 'Shared with DJ Zenzee & 25 Others',
    bg: theme.colors.WHITE,
    borderColor: theme.colors.LIGHT_100,
    textColor: theme.colors.MAIN_900,
  },
  {
    id: 2,
    title: 'Joy is coming.zip',
    status: 'Pending approval',
    sharedWith: 'Shared with DJ Zenzee & 25 Others',
    bg: theme.colors.LIGHT_YELLOW,
    textColor: theme.colors.SEMANTIC_YELLOW,
  },
  {
    id: 3,
    title: 'Erima.zip',
    status: 'Active',
    sharedWith: 'Shared with DJ Zenzee & 25 Others',
    textColor: theme.colors.DARKER_GREEN,
    bg: theme.colors.SEMANTIC_GREEN,
  },
  {
    id: 4,
    title: 'Baddest.zip',
    status: 'Active',
    sharedWith: 'Shared with DJ Zenzee & 25 Others',
    textColor: theme.colors.DARKER_GREEN,
    bg: theme.colors.SEMANTIC_GREEN,
  },
  {
    id: 5,
    title: 'Erima.zip',
    status: 'Active',
    sharedWith: 'Shared with DJ Zenzee & 25 Others',
    textColor: theme.colors.DARKER_GREEN,
    bg: theme.colors.SEMANTIC_GREEN,
  },
];

export const djs = [
  {
    id: 1,
    title: 'DJ Zenzee',
    rate: 'from 300,000 NGN',
    profile: theme.images['dj-images']['dj-1'],
  },
  {
    id: 2,
    title: 'Dj Kulcaddy',
    rate: 'from 300,000 NGN',
    profile: theme.images['dj-images']['dj-2'],
  },
  {
    id: 3,
    title: 'Dj Kulcaddy',
    rate: 'from 300,000 NGN',
    profile: theme.images['dj-images']['dj-3'],
  },
  {
    id: 4,
    title: 'Dj Kulcaddy',
    rate: 'from 300,000 NGN',
    profile: theme.images['dj-images']['dj-4'],
  },
  {
    id: 5,
    title: 'Dj Kulcaddy',
    rate: 'from 300,000 NGN',
    profile: theme.images['dj-images']['dj-1'],
  },
];

export const frequency = [
  {
    id: 1,
    title: 'Daily',
  },
  {
    id: 2,
    title: 'Weekend',
  },
];

export const streamingLinks = [
  {
    id: 1,
    title: 'spotify',
    icon: 'spotify-icon',
  },
  {
    id: 2,
    title: 'appleMusic',
    icon: 'apple-icon',
  },
  {
    id: 3,
    title: 'youtube',
    icon: 'youtube-icon',
  },
];

export const promotionTabs = [
  {
    id: 1,
    title: 'My Earnings',
  },
  {
    id: 2,
    title: 'Booking History',
  },
  {
    id: 3,
    title: 'Settings',
  },
];

export const sessions = [
  {
    id: 1,
    title: 'Mondays',
  },
  {
    id: 2,
    title: 'Tuesdays',
  },
  {
    id: 3,
    title: 'Wednesdays',
  },
  {
    id: 4,
    title: 'Thursdays',
  },
  {
    id: 5,
    title: 'Fridays',
  },
  {
    id: 6,
    title: 'Saturdays',
  },
  {
    id: 7,
    title: 'Sundays',
  },
];

export const notifications = [
  {
    title: 'Today',
    data: [
      {
        id: 1,
        title: 'Promo Request Sent',
        message: 'Your promotion request to [DJ Name] has been delivered.',
      },
    ],
  },
  {
    title: 'Yesterday',
    data: [
      {
        id: 1,
        title: 'Request Declined',
        message: '[DJ Name] has rejected your promo request.',
      },
      {
        id: 2,
        title: 'Promo In Progress',
        message: '[DJ Name] has started promoting your track “[Song Title].”',
      },
    ],
  },
  {
    title: 'July 22, 2025',
    data: [
      {
        id: 1,
        title: 'Your Track is Live',
        message: '“[Song Title]” is now live for DJs to view.',
      },
      {
        id: 2,
        title: 'New Fan Alert',
        message: '[DJ Name] just followed you. Tap to connect.',
      },
    ],
  },
];
