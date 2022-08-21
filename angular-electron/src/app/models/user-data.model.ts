export interface UserData {
  lastFile: string;
  darkMode: boolean;
}

const DEFAULT_USER_DATA: UserData = {
  lastFile: undefined,
  darkMode: false,
};
export { DEFAULT_USER_DATA };
