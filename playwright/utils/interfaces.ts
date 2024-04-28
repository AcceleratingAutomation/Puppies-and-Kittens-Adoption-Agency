export interface LocalStorageData {
  displayName: string;
  token: string;
}

export interface LighthouseConfig {
  extends: string;
  settings: {
    formFactor?: "desktop" | "mobile";
    screenEmulation?: {
      mobile: boolean;
      width: number;
      height: number;
      deviceScaleFactor: number;
      disabled: boolean;
    };
  };
}
