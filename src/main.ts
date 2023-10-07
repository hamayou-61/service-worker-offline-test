const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('./sw.js');
      
      if (registration.installing) {
        console.log('Service workerをインストール中');
      } else if (registration.waiting) {
        console.log('Service workerインストール済み');
      } else if (registration.active) {
        console.log('Service workerがアクティブ');
      }
    } catch (error) {
      console.error(`[${error}] : serviceWorker登録が失敗`);
    }
  }
};

registerServiceWorker()