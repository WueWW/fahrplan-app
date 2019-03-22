export const isAppleDevice = (): boolean => /iPad|iPhone|iPod/i.test(navigator.userAgent);

export const isAndroidDevice = (): boolean => /android/i.test(navigator.userAgent);

export const isMobileDevice = (): boolean => isAppleDevice() || isAndroidDevice();
