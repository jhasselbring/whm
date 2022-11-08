import { reactive, watch } from 'vue'

const store = {
    app: reactive({
        count: null,
        count2: 5,
        // Anything inside of appState will be persited automatically via watch() -> updateStore()
        appState: {
            page: "workspace",
            groups: [
                {
                    name: "📂Test",
                    enabled: true,
                    ips: {
                        "127.0.0.1": [
                            "localhost"
                        ]
                    }
                }
            ]
        }
    }),
    init(cb: Function) {
        store.getLaunchCount().then(
            () => {
                store.getStore().then(() => {
                    cb();
                });
            }
        );
    },
    getLaunchCount() {
        return new Promise((resolve, reject) => {
            window
                .electron
                .ipcRenderer
                .invoke('getLaunchCount')
                .then((result: any) => {
                    store.app.count = result;
                    resolve(result);
                });
        });
    },
    getStore() {
        return new Promise((resolve, reject) => {
            window
                .electron
                .ipcRenderer
                .invoke('getStore')
                .then((result: any) => {
                    console.log('getStore', result);
                    store.app.appState = result;
                    resolve(result);
                });
        });
    },
    updateStore() {
        console.log('Updating Store via updateStore()');
        window
            .electron
            .ipcRenderer
            .invoke('updateStore', JSON.parse(JSON.stringify(store.app.appState)));
    }
}


// Auto updates BE store everytime store.app.groups get updated
watch(
    () => store.app.appState,
    () => {
        console.log('Detected appState change via watch()');
        store.updateStore();
    },
    { deep: true }
)
export default store;

