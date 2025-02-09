/**
 * REFERENCE TOKENS
 *
 * These are the raw, atomic design values.
 * They include base colors, typography scales, spacing, etc.
 *
 * In your example, the color scales are the reference tokens.
 */
export const refColors = {
    grey: {
      50 : '#EEEFF1',
      100: '#D3D8DE',
      200: '#B6BFC8',
      300: '#99A5B2',
      400: '#8291A1',
      500: '#6C7E91',
      600: '#5F6F7F',
      700: '#4E5B68',
      800: '#3F4853',
      900: '#2D333B',
    },
    blue: {
      50 : '#E6F3FF',
      100: '#BAD9F5',
      200: '#8DBFEB',
      300: '#61A5E0',
      400: '#3D8CD6',
      500: '#1A73CC',
      600: '#1563B0',
      700: '#105294',
      800: '#0B4178',
      900: '#072F5C',
    },
    red: {
      50 : '#FEEEEE',
      100: '#FCC7C7',
      200: '#FA9F9F',
      300: '#F87777',
      400: '#F64F4F',
      500: '#F42727',
      600: '#D02323',
      700: '#AD1F1F',
      800: '#891B1B',
      900: '#651717',
    },
    tape: {
      50 : '',
      100: '',
      200: '',
      300: '',
      400: '',
      500: '#C1FF11',
      600: '',
      700: '',
      800: '',
      900: '',
    },
    punk: {
      50 : '',
      100: '',
      200: '',
      300: '',
      400: '',
      500: '#A697CD',
      600: '',
      700: '',
      800: '',
      900: '',
    },
    punk_pink: {
      50 : '',
      100: '',
      200: '',
      300: '',
      400: '',
      500: '#FFAAD9',
      600: '',
      700: '',
      800: '',
      900: '',
    }
  } as const

  const refColorsComplementary = {
    punk: {
      main: '#4F11FF'
    },
    tape: {
      main: '#AAFFDO'
    },
    punk_pink: {
      main: '#AAFFDO'
    },
  }
  // const refTypography = {} as const

/**
 * Retrieves a specific color from the reference colors.
 *
 * @param scale - The color scale to retrieve from. This should be a key of the `refColors` object.
 * @param shade - The specific shade of the color to retrieve. This should be a key of the `refColors.grey` object.
 * @returns The color value corresponding to the specified scale and shade.
 */
  export const getColor = (scale: keyof typeof refColors, shade: keyof typeof refColors.grey) => {
    return refColors[scale][shade]
  }

  /**
   * SYSTEM TOKENS
   *
   * System tokens apply design decisions by using reference tokens.
   * They define things like palettes, typography scales, elevation, etc.
   * For example, your palette object defines colors for backgrounds, text, borders, etc.,
   * in light and dark modes.
   */
  export const systemPalette = {
    light: {
      background: {
        primary    : refColors.grey[50],
        secondary  : refColors.grey[100],
        tertiary   : refColors.grey[200],
        destructive: refColors.red[50],
      },
      text: {
        primary    : refColors.grey[900],
        secondary  : refColors.grey[700],
        tertiary   : refColors.grey[500],
        destructive: refColors.red[500],
      },
      border: {
        default    : refColors.grey[200],
        hover      : refColors.grey[300],
        focus      : refColors.blue[400],
        destructive: refColors.red[500],
      },
      action: {
        primary    : refColors.blue[500],
        hover      : refColors.blue[600],
        active     : refColors.blue[700],
        disabled   : refColors.grey[300],
        destructive: refColors.red[500],
      },
      chart: {
        stroke : refColors.grey[400],
        grid   : refColors.grey[200],
        tooltip: refColors.grey[50],
        series : [refColors.blue[500], refColors.blue[700], refColors.grey[500], refColors.grey[700]],
      },
      punk:{
        primary      : refColors.punk[500],
        hover        : refColors.punk[600],
        active       : refColors.punk[700],
        disabled     : refColors.grey[300],
        destructive  : refColors.red[500],
        contrastText : refColors.grey[50],
        complementary: refColorsComplementary.punk.main
      },
      tape:{
        primary      : refColors.tape[500],
        hover        : refColors.tape[600],
        active       : refColors.tape[700],
        disabled     : refColors.grey[300],
        destructive  : refColors.red[500],
        contrastText : refColors.grey[50],
        complementary: refColorsComplementary.tape.main
      }
    },
    dark: {
      background: {
        primary    : refColors.grey[900],
        secondary  : refColors.grey[800],
        tertiary   : refColors.grey[700],
        destructive: refColors.red[900],
      },
      text: {
        primary    : refColors.grey[50],
        secondary  : refColors.grey[200],
        tertiary   : refColors.grey[400],
        destructive: refColors.red[500],
      },
      border: {
        default    : refColors.grey[700],
        hover      : refColors.grey[600],
        focus      : refColors.blue[400],
        destructive: refColors.red[500],
      },
      action: {
        primary    : refColors.blue[500],
        hover      : refColors.blue[400],
        active     : refColors.blue[300],
        disabled   : refColors.grey[700],
        destructive: refColors.red[500],
      },
      chart: {
        stroke : refColors.grey[200],
        grid   : refColors.grey[800],
        tooltip: refColors.grey[900],
        series : [refColors.blue[400], refColors.blue[200], refColors.grey[400], refColors.grey[200]],
      },
      punk:{
        primary      : refColors.punk[500],
        hover        : refColors.punk[600],
        active       : refColors.punk[700],
        disabled     : refColors.grey[300],
        destructive  : refColors.red[500],
        contrastText : refColors.grey[50],
        complementary: refColorsComplementary.punk.main
      },
      tape:{
        primary      : refColors.tape[500],
        hover        : refColors.tape[600],
        active       : refColors.tape[700],
        disabled     : refColors.grey[300],
        destructive  : refColors.red[500],
        contrastText : refColors.grey[50],
        complementary: refColorsComplementary.tape.main
      }
    }
  } as const

  export type ThemeMode = keyof typeof systemPalette