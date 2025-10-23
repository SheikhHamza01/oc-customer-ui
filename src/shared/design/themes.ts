import { designTokens } from './tokens';

export interface Theme {
  name: 'light' | 'dark';
  colors: {
    background: string;
    foreground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    muted: string;
    mutedForeground: string;
    accent: string;
    accentForeground: string;
    destructive: string;
    destructiveForeground: string;
    border: string;
    input: string;
    ring: string;
    sidebar: string;
    sidebarForeground: string;
    sidebarActive: string;
    sidebarActiveForeground: string;
    tableHeader: string;
    tableBody: string;
    progressBar: string;
    progressBarActive: string;
    stepper: string;
    stepperActive: string;
    stepperCompleted: string;
    stepperInactive: string;
    createAccountButton: string;
    createAccountButtonText: string;
    filterIcon: string;
  };
}

export const themes: Record<string, Theme> = {
  light: {
    name: 'light',
    colors: {
      background: '#ffffff',
      foreground: '#0f172a',
      primary: designTokens.colors.primary[600],
      primaryForeground: '#ffffff',
      secondary: designTokens.colors.gray[100],
      secondaryForeground: designTokens.colors.gray[900],
      muted: designTokens.colors.gray[100],
      mutedForeground: designTokens.colors.gray[500],
      accent: designTokens.colors.primary[100],
      accentForeground: designTokens.colors.primary[900],
      destructive: designTokens.colors.error[500],
      destructiveForeground: '#ffffff',
      border: designTokens.colors.gray[200],
      input: designTokens.colors.gray[50],
      ring: designTokens.colors.primary[500],
      sidebar: designTokens.colors.gray[50],
      sidebarForeground: designTokens.colors.gray[700],
      sidebarActive: designTokens.colors.primary[100],
      sidebarActiveForeground: designTokens.colors.primary[700],
      tableHeader: designTokens.colors.gray[50],
      tableBody: '#ffffff',
      progressBar: designTokens.colors.gray[200],
      progressBarActive: designTokens.colors.primary[500],
      stepper: designTokens.colors.gray[50],
      stepperActive: designTokens.colors.primary[600],
      stepperCompleted: designTokens.colors.success[500],
      stepperInactive: designTokens.colors.gray[300],
      createAccountButton: designTokens.colors.primary[600],
      createAccountButtonText: '#ffffff',
      filterIcon: designTokens.colors.gray[500],
    },
  },
  dark: {
    name: 'dark',
    colors: {
      background: '#0f172a',
      foreground: '#f8fafc',
      primary: designTokens.colors.primary[500],
      primaryForeground: '#ffffff',
      secondary: designTokens.colors.gray[800],
      secondaryForeground: designTokens.colors.gray[100],
      muted: designTokens.colors.gray[800],
      mutedForeground: designTokens.colors.gray[400],
      accent: designTokens.colors.primary[900],
      accentForeground: designTokens.colors.primary[100],
      destructive: designTokens.colors.error[500],
      destructiveForeground: '#ffffff',
      border: designTokens.colors.gray[700],
      input: designTokens.colors.gray[800],
      ring: designTokens.colors.primary[500],
      sidebar: designTokens.colors.gray[900],
      sidebarForeground: designTokens.colors.gray[300],
      sidebarActive: designTokens.colors.primary[900],
      sidebarActiveForeground: designTokens.colors.primary[100],
      tableHeader: designTokens.colors.gray[800],
      tableBody: designTokens.colors.gray[900],
      progressBar: designTokens.colors.gray[700],
      progressBarActive: designTokens.colors.primary[500],
      stepper: designTokens.colors.gray[800],
      stepperActive: designTokens.colors.primary[500],
      stepperCompleted: designTokens.colors.success[500],
      stepperInactive: designTokens.colors.gray[600],
      createAccountButton: designTokens.colors.primary[500],
      createAccountButtonText: '#ffffff',
      filterIcon: designTokens.colors.gray[400],
    },
  },
};

export const getTheme = (themeName: string): Theme => {
  return themes[themeName] || themes.light;
};
