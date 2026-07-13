export async function loadRemoteModule({ remoteUrl, scope, module }) {
  await __webpack_init_sharing__('default');
  const container = window[scope];
  if (!container) {
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `${remoteUrl}/remoteEntry.js`;
      script.type = 'text/javascript';
      script.async = true;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Failed to load remote entry: ${script.src}`));
      document.head.appendChild(script);
    });
  }

  const containerInstance = window[scope];
  await containerInstance.init(__webpack_share_scopes__.default);
  const factory = await containerInstance.get(module);
  const Module = factory();
  return Module;
}
