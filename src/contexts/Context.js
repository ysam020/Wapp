import { createContext, useReducer, useEffect } from "react";
import { reducer } from "../contexts/Reducer";

export const LogoutContext = createContext();
export const LoginContext = createContext();
export const UserContext = createContext();
export const ToggleSidebarContext = createContext();
export const ToggleSidebarProfileContext = createContext();
export const ToggleContactInfoContext = createContext();
export const ToggleSettingsContext = createContext();
export const SettingsNotificationContext = createContext();
export const SettingsPrivacyContext = createContext();
export const SettingsSecurityContext = createContext();
export const SettingsAccountInfoContext = createContext();
export const SettingsHelpContext = createContext();
export const ThemeContext = createContext();
export const SearchMessageContext = createContext();

const Context = ({ children }) => {
  const initialState = false;
  const sidebarState = true;

  const [toggleSidebarProfile, dispatchToggleSidebarProfile] = useReducer(
    reducer,
    initialState
  );
  const [toggleContactInfo, dispatchToggleContactInfo] = useReducer(
    reducer,
    initialState
  );
  const [toggleSettings, dispatchToggleSettings] = useReducer(
    reducer,
    initialState
  );
  const [toggleSidebarContext, dispatchToggleSidebar] = useReducer(
    reducer,
    sidebarState
  );
  const [settingsNotificationContext, dispatchSettingsNotification] =
    useReducer(reducer, initialState);
  const [settingsPrivacyContext, dispatchSettingsPrivacy] = useReducer(
    reducer,
    initialState
  );
  const [settingsSecurityContext, dispatchSettingsSecurity] = useReducer(
    reducer,
    initialState
  );
  const [settingsAccountInfoContext, dispatchSettingsAccountInfo] = useReducer(
    reducer,
    initialState
  );

  const [settingsHelpContext, dispatchSettingsHelp] = useReducer(
    reducer,
    initialState
  );

  const [searchMessageContext, dispatchSearchMessage] = useReducer(
    reducer,
    initialState
  );

  return (
    <>
      <SettingsPrivacyContext.Provider
        value={{
          settingsPrivacyState: settingsPrivacyContext,
          settingsPrivacyDispatch: dispatchSettingsPrivacy,
        }}
      >
        <SearchMessageContext.Provider
          value={{
            searchMessageState: searchMessageContext,
            searchMessageDispatch: dispatchSearchMessage,
          }}
        >
          <SettingsSecurityContext.Provider
            value={{
              settingsSecurityState: settingsSecurityContext,
              settingsSecurityDispatch: dispatchSettingsSecurity,
            }}
          >
            <SettingsAccountInfoContext.Provider
              value={{
                settingsAccountInfoState: settingsAccountInfoContext,
                settingsAccountInfoDispatch: dispatchSettingsAccountInfo,
              }}
            >
              <SettingsHelpContext.Provider
                value={{
                  settingsHelpState: settingsHelpContext,
                  settingsHelpDispatch: dispatchSettingsHelp,
                }}
              >
                <SettingsNotificationContext.Provider
                  value={{
                    settingsNotificationState: settingsNotificationContext,
                    settingsNotificationDispatch: dispatchSettingsNotification,
                  }}
                >
                  <ToggleSidebarContext.Provider
                    value={{
                      toggleSidebarState: toggleSidebarContext,
                      toggleSidebarDispatch: dispatchToggleSidebar,
                    }}
                  >
                    <ToggleSettingsContext.Provider
                      value={{
                        toggleSettingsState: toggleSettings,
                        toggleSettingsDispatch: dispatchToggleSettings,
                      }}
                    >
                      <ToggleContactInfoContext.Provider
                        value={{
                          toggleContactInfoState: toggleContactInfo,
                          toggleContactInfoDispatch: dispatchToggleContactInfo,
                        }}
                      >
                        <ToggleSidebarProfileContext.Provider
                          value={{
                            toggleSidebarProfileState: toggleSidebarProfile,
                            toggleSidebarProfileDispatch:
                              dispatchToggleSidebarProfile,
                          }}
                        >
                          {children}
                        </ToggleSidebarProfileContext.Provider>
                      </ToggleContactInfoContext.Provider>
                    </ToggleSettingsContext.Provider>
                  </ToggleSidebarContext.Provider>
                </SettingsNotificationContext.Provider>
              </SettingsHelpContext.Provider>
            </SettingsAccountInfoContext.Provider>
          </SettingsSecurityContext.Provider>
        </SearchMessageContext.Provider>
      </SettingsPrivacyContext.Provider>
    </>
  );
};
export default Context;
