import { createContext, useReducer } from "react";
import { reducer } from "../contexts/Reducer";

export const LogoutContext = createContext();
export const LoginContext = createContext();
export const UserContext = createContext();
export const ToggleSidebarContext = createContext();
export const ToggleSidebarProfileContext = createContext();
export const ToggleContactInfoContext = createContext();
export const ToggleChatWallpaperContext = createContext();
export const ToggleSettingsContext = createContext();
export const SettingsNotificationContext = createContext();
export const SettingsPrivacyContext = createContext();
export const SettingsSecurityContext = createContext();
export const SettingsAccountInfoContext = createContext();
export const SettingsHelpContext = createContext();
export const ThemeContext = createContext();
export const SearchMessageContext = createContext();
export const ChatBackgroundContext = createContext();
export const NewChatContext = createContext();
export const CommunitiesContext = createContext();
export const EncryptionContext = createContext();
export const DisappearingMessagesContext = createContext();
export const StarredMessageContext = createContext();
export const EmailContext = createContext();
export const ChatDetailsContext = createContext();

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

  const [toggleChatWallpaper, dispatchChatWallpaper] = useReducer(
    reducer,
    initialState
  );

  const [searchMessageContext, dispatchSearchMessage] = useReducer(
    reducer,
    initialState
  );

  const [newChatContext, dispatchNewChat] = useReducer(reducer, initialState);

  const [communitiesContext, dispatchCommunities] = useReducer(
    reducer,
    initialState
  );

  const [encryptionContext, dispatchEncryption] = useReducer(
    reducer,
    initialState
  );

  const [disappearingMessagesContext, dispatchDisapparingMessages] = useReducer(
    reducer,
    initialState
  );

  const [starredMessageContext, dispatchStarredMessage] = useReducer(
    reducer,
    initialState
  );

  return (
    <>
      <StarredMessageContext.Provider
        value={{
          starredMessageState: starredMessageContext,
          starredMessageDispatch: dispatchStarredMessage,
        }}
      >
        <DisappearingMessagesContext.Provider
          value={{
            disappearingMessagesState: disappearingMessagesContext,
            disappearingMessagesDispatch: dispatchDisapparingMessages,
          }}
        >
          <EncryptionContext.Provider
            value={{
              encryptionState: encryptionContext,
              encryptionDispatch: dispatchEncryption,
            }}
          >
            <CommunitiesContext.Provider
              value={{
                communitiesState: communitiesContext,
                communitiesDispatch: dispatchCommunities,
              }}
            >
              <NewChatContext.Provider
                value={{
                  newChatState: newChatContext,
                  newChatDispatch: dispatchNewChat,
                }}
              >
                <ToggleChatWallpaperContext.Provider
                  value={{
                    toggleChatWallpaperState: toggleChatWallpaper,
                    toggleChatWallpaperDispatch: dispatchChatWallpaper,
                  }}
                >
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
                            settingsAccountInfoState:
                              settingsAccountInfoContext,
                            settingsAccountInfoDispatch:
                              dispatchSettingsAccountInfo,
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
                                settingsNotificationState:
                                  settingsNotificationContext,
                                settingsNotificationDispatch:
                                  dispatchSettingsNotification,
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
                                    toggleSettingsDispatch:
                                      dispatchToggleSettings,
                                  }}
                                >
                                  <ToggleContactInfoContext.Provider
                                    value={{
                                      toggleContactInfoState: toggleContactInfo,
                                      toggleContactInfoDispatch:
                                        dispatchToggleContactInfo,
                                    }}
                                  >
                                    <ToggleSidebarProfileContext.Provider
                                      value={{
                                        toggleSidebarProfileState:
                                          toggleSidebarProfile,
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
                </ToggleChatWallpaperContext.Provider>
              </NewChatContext.Provider>
            </CommunitiesContext.Provider>
          </EncryptionContext.Provider>
        </DisappearingMessagesContext.Provider>
      </StarredMessageContext.Provider>
    </>
  );
};
export default Context;
