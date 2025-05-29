import { IsIPAD } from '@/themes/app.constant';
import { Dimensions, View } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
// @ts-ignore
import One from '@/assets/svg/onboarding/1.svg';
// @ts-ignore
import Two from '@/assets/svg/onboarding/2.svg';
// @ts-ignore
import Three from '@/assets/svg/onboarding/3.svg';
// @ts-ignore
import Four from '@/assets/svg/onboarding/4.svg';

export const onboardingSlides: onboardingSlidesTypes[] = [
  {
    color: '#fff',
    title: 'Explora',
    image: (
      <View>
        <One
          height={IsIPAD ? verticalScale(345) : verticalScale(330)}
          width={IsIPAD ? verticalScale(285) : verticalScale(230)}
        />
      </View>
    ),
    secondTitle: 'Logística woodward',
    subTitle:
      'Descubre todos los beneficios que Logística Woodward tiene para tí',
    titleColor: '#000',
    subTitleColor: '#808080',
  },
  {
    color: '#ededed',
    title: 'Navega',
    image: (
      <View>
        <Two
          height={IsIPAD ? verticalScale(345) : verticalScale(330)}
          width={IsIPAD ? verticalScale(285) : verticalScale(230)}
        />
      </View>
      // <Image
      //   source={Two}
      //   style={{
      //     width: IsIPAD ? verticalScale(285) : verticalScale(230),
      //     height: IsIPAD ? verticalScale(345) : verticalScale(330),
      //   }}
      //   resizeMode="contain"
      // />
    ),
    secondTitle: 'Logística woodward',
    subTitle: 'Encuentra la mejor opción para retribuir tu esfuerzo',
    titleColor: '#000000',
    subTitleColor: '#808080',
  },
  {
    color: '#fff',
    title: 'Socializa',
    image: (
      <Three
        height={IsIPAD ? verticalScale(345) : verticalScale(330)}
        width={IsIPAD ? verticalScale(285) : verticalScale(230)}
      />
    ),
    secondTitle: 'Logística woodward',
    subTitle: 'Crea lazos sólidos con los demás colaboradores regalando TEUS',
    titleColor: '#000',
    subTitleColor: '#808080',
  },
  {
    color: '#1E417C',
    title: 'Cumple tus metas',
    image: (
      <Four
        height={IsIPAD ? verticalScale(345) : verticalScale(330)}
        width={IsIPAD ? verticalScale(285) : verticalScale(230)}
      />
    ),
    secondTitle: 'Logística woodward',
    subTitle: 'Sigue con tu gran trabajo para obtener las mejores recompensas',
    titleColor: '#eeeeee',
    subTitleColor: '#d4d4d4',
  },
];

// onboarding variables
export enum Side {
  LEFT,
  RIGHT,
  NONE,
}

export const MIN_LEDGE = 25;
export const { width: WIDTH, height: HEIGHT } = Dimensions.get('screen');
export const MARGIN_WIDTH = MIN_LEDGE + 50;
export const PREV = WIDTH;
export const NEXT = 0;
export const LEFT_SNAP_POINTS = [MARGIN_WIDTH, PREV];
export const RIGHT_SNAP_POINTS = [NEXT, WIDTH, -MARGIN_WIDTH];

export const SECURE_STORE_STRINGS = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
};

export const ASYNC_STORAGE_STRINGS = {
  userData: 'appUserData',
};

// Notifications
interface NotificationItem {
  rol: 'cliente' | 'trafico' | 'admin';
  title: string;
  body: (params: { origen: string; destino: string }) => string;
}

export const CLIENT_NOTIFICATIONS_STRINGS: Record<
  'newAppointment',
  NotificationItem
> = {
  newAppointment: {
    rol: 'trafico',
    title: 'Nueva solicitud de servicio',
    body: ({ origen, destino }) =>
      `Se ha generado una nueva solicitud de un cliente con ruta ${origen} -> ${destino}`,
  },
};
