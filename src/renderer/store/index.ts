import { reactive } from 'vue'

const store = ({
    app: reactive({
        count: null
    }),
    getLaunchCount(){
        return new Promise( (resolve, reject) => {
            window
            .electron
            .ipcRenderer
            .invoke('getLaunchCount')
            .then((result: any) => {
                resolve(result);
            });
        });

    }
})

export default store;
