import { Platform } from 'react-native';

import { TextType } from '~/components/common/Text/Text.d';
import { ITheme } from '~/theme/defaultTheme.d';

const fontFamily = Platform.select({
  android: 'proximanova-regular',
  ios: 'proximanova-regular',
});

const fontWeightRegular = 'normal';
const fontWeightBold = 'bold';

export interface ITypographyStylesObject {
  fontFamily?: string | undefined;
  fontSize?: number;
  textAlign?: string;
  lineHeight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  fontWeight?: string;
}

type TypographyStylesObjectFunction = (
  theme: ITheme,
  bold: boolean,
) => ITypographyStylesObject;

type StyleOptions = TypographyStylesObjectFunction | ITypographyStylesObject;

export interface ITypographyStyles {
  [styleKey: string]: StyleOptions;
}

export const typographyStyles: ITypographyStyles = {
  [TextType.HEADING]: (theme: ITheme, bold: boolean) => ({
    fontFamily,
    color: '#000000',
    fontSize: 32,
    lineHeight: 39,
    fontStyle: 'normal',
    fontWeight: bold ? fontWeightBold : fontWeightRegular,
  }),
  [TextType.SUB_HEADING]: (theme: ITheme, bold: boolean) => ({
    fontFamily,
    color: theme.neutral.title,
    fontSize: 18,
    lineHeight: 22,
    fontStyle: 'normal',
    fontWeight: bold ? fontWeightBold : fontWeightRegular,
  }),
  [TextType.BODY]: (theme: ITheme, bold: boolean) => ({
    fontFamily,
    color: theme.neutral.body,
    fontSize: 16,
    lineHeight: bold ? 19 : 16,
    fontStyle: 'normal',
    fontWeight: bold ? fontWeightBold : fontWeightRegular,
  }),
  [TextType.PARAGRAPH]: (_theme: ITheme, bold: boolean) => ({
    fontFamily,
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: bold ? fontWeightBold : fontWeightRegular,
  }),
  [TextType.MD]: (_theme: ITheme, bold: boolean) => ({
    fontFamily,
    fontSize: 14,
    lineHeight: bold ? 14 : 17,
    fontWeight: bold ? fontWeightBold : fontWeightRegular,
    color: '#000000',
  }),
  [TextType.SM]: (_theme: ITheme, bold: boolean) => ({
    fontFamily,
    fontSize: 12,
    fontWeight: bold ? fontWeightBold : fontWeightRegular,
    color: '#000000',
  }),
  [TextType.LABEL]: (theme: ITheme, bold: boolean) => ({
    fontFamily,
    color: theme.neutral.body,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: bold ? fontWeightBold : fontWeightRegular,
  }),
  [TextType.BUTTON]: {
    fontFamily,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 19,
    paddingTop: 2,
    paddingBottom: 1,
    fontWeight: '600',
  },
  [TextType.BUTTON_SMALL]: {
    fontFamily,
    fontSize: 12,
    textAlign: 'center',
  },
  [TextType.INPUT]: {
    fontFamily,
    fontSize: 15,
  },
};
