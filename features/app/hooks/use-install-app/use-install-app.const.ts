/** The browsers of an iPhone or an iPad, which never offer the install themselves. */
export const INSTALL_APP_IOS_USER_AGENT = /iPhone|iPad|iPod/i;

/** Matches while the page runs as an installed app, opened from the home screen. */
export const INSTALLED_APP_QUERY = "(display-mode: standalone)";
