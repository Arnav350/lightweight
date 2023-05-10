interface IColors {
  primary: string;
  textOne: string;
  textTwo: string;
  placeholder: string;
  background: string;
  header: string;
  box: string;
}

interface IFonts {
  small: number;
  normal: number;
  large: number;
  xlarge: number;
  xxlarge: number;
  bold:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  xbold:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
}

const COLORS: IColors = {
  primary: "#a33",

  textOne: "#eee",
  textTwo: "#888",
  placeholder: "#444",

  background: "#000",
  header: "#161616",
  box: "#1d1d1d",
};

const FONTS: IFonts = {
  small: 14,
  normal: 16,
  large: 18,
  xlarge: 24,
  xxlarge: 32,
  bold: "500",
  xbold: "600",
};

export { COLORS };
