import { reactive, watch } from 'vue'

const store = {
    app: reactive({
        count: null,
        count2: 5,
        redirectGroupFlat: {},
        // Anything inside of appState will be persited automatically via watch() -> updateStore()
        appState: {
            page: "workspace",
            focus: {
                type: '',
                name: ''
            },
            groups: [
                {
                    name: "📂Default",
                    enabled: true,
                    ips: {
                        "127.0.0.1": [
                            "localhost"
                        ]
                    }
                }
            ],

        }
    }),
    init(cb) {
        store.getStore().then(() => {
            cb();
        });
    },
    getStore() {
        return new Promise((resolve, reject) => {
            window
                .electron
                .ipcRenderer
                .invoke('getStore')
                .then((result) => {
                    store.app.appState = result;
                    resolve(result);
                });
        });
    },
    updateStore() {
        window
            .electron
            .ipcRenderer
            .invoke('updateStore', JSON.parse(JSON.stringify(store.app.appState)));
    },
    buildRedirectObject() {
        // Initialize empty object which will be the payload to be sent to Main
        let newRedirectMap = {};
        let enabledGroups = store.app.appState.groups.filter(group => group.enabled == true);
        enabledGroups.forEach(group => {
            for (const ip in group.ips) {
                let domains = group.ips[ip].split('\n');
                domains.forEach(domain => {
                    if (domain.startsWith('#')) {
                        console.log(`${domain} has been commented out`);
                    } else {
                        if (domain.includes('#')) {
                            domain = domain.split('#')[0];
                        }
                        if (!newRedirectMap[domain]) {
                            newRedirectMap[domain] = ip;
                        }
                    }

                })

            }
        });
        window
            .electron
            .ipcRenderer
            .invoke('updateRedirectMap', newRedirectMap);
    }
}


// Auto updates BE store everytime store.app.groups get updated
watch(
    () => store.app.appState,
    () => {
        store.updateStore();
        store.buildRedirectObject();
    },
    { deep: true }
)
export default store;

