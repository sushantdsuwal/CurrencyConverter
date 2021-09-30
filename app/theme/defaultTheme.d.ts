export interface ITheme {
  black: string;
  white: string;
  transparent: string;
  backgroundColor: string;
  surfaceColor: string;
  borderColor: string;
  inputBackgroundColor: string;
  appbar: {
    statusBarColor: string;
    barStyle: string;
    backgroundColor: string;
    tintColor: string;
  };
  primary: {
    interaction: string;
    default: string;
    hover: string;
    pressed: string;
    disabledFill: string;
  };
  secondary: {
    interaction: string;
    default: string;
    hover: string;
    pressed: string;
    disabledFill: string;
    hoverFill: string;
    pressedLight: string;
    disableOutline: string;
  };
  table: {
    default: string;
    seatAvailable: string;
    tableSelected: string;
    seatSelected: string;
    partiallyAvailable: string;
    assigned: string;
  };
  section: {
    available: string;
    selected: string;
  };
  fileStructure: {
    inProgress: string;
    complete: string;
  };
  neutral: {
    title: string;
    body: string;
    subtleText: string;
    disabled: string;
    formBorders: string;
    floorPlan: string;
    hairline: string;
    tabBG: string;
  };
  danger: {
    default: string;
  };
}
