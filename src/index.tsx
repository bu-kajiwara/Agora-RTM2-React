import AgoraRTM, { RTMClient, RTMConfig } from 'agora-rtm-sdk'

export default AgoraRTM
export * from 'agora-rtm-sdk'

/**
 * Returns a hook to access an RTM client, use this outside your React component.
 * The returned hook gives the same client throughout the application lifecycle.
 * @param appId Agora AppID
 * @param config RTM Config
 * @param areaCodes Area Code
 * @returns React Hook to access client object
 */
export const createClient = (
  appId: string,
  userId: string,
  config?: RTMConfig
) => {
  let client: RTMClient
  /**
   * A React Hook to access the RTM Client
   * @returns RTM Client
   */
  function createClosure() {
    if (!client) {
      client = new AgoraRTM.RTM(appId, userId, config)
    }
    return client
  }
  return () => createClosure()
}

/**
 * Returns a hook to access an RTM client instance, use this outside your React component.
 * The returned hook accepts the RTM config on the first hook call and gives the same channel instance throughout the application lifecycle.
 * Use this when you need to create a client but the config is only available during the application runtime, don't update the config between re-renders.
 * @returns A React Hook that give you access to the RTM Client instance.
 */
export const createLazyClient = () => {
  let client: RTMClient
  /**
   * A React hook that gives you access to the RTM Client instance
   * @param appId Agora App ID
   * @param config RTM Client Config
   * @param areaCodes areaCodes
   * @returns RTM Client instance
   */
  function createClosure(appId: string, userId: string, config?: RTMConfig) {
    if (!client) {
      client = new AgoraRTM.RTM(appId, userId, config)
    }
    return client
  }
  return (appId: string, userId: string, config?: RTMConfig) =>
    createClosure(appId, userId, config)
}
