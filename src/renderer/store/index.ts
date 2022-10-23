import { initializeApp } from "firebase/app";
import { config } from "./firebaseConfig.secret"
import { reactive } from 'vue'

const store = ({
    app: reactive({
        count: null
    }),
    firebase:initializeApp(config),
})

export default store;
