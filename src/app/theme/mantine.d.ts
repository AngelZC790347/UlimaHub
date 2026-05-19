import type { MantineColorsTuple } from '@mantine/core';

export type ExtendedULHubColors =
  | 'neutral'
  | 'brand'
  | 'success'
  | 'error'
  | 'warning'
  | DefaultMantineColor;

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedULHubColors, MantineColorsTuple>;
  }
}
