// import { app } from 'electron';
import fs from 'fs';
// import { resolve } from 'path';
import { JsonDB, Config } from 'node-json-db';
// const dbDir = resolve(app.getPath('userData') + '/db.json');
const dbDir = './db.json';
export let db;
export let redirectMap = {};
export function updateRedirectMap(newredirectMap) {
    redirectMap = newredirectMap;
}
export async function initDb(cb) {
    if (fs.existsSync(dbDir)) {

        // Initialize DB
        db = new JsonDB(new Config(dbDir, true, true, '/'));

        // Make sure DB has all basic stuff
        let appState;
        try {
            appState = await db.getData("/appState");
            if (!appState) appState = {};
            if (!appState.groups) appState.groups = [];
            if (!appState.page) appState.page = 'workspace';
            if (!appState.focus) appState.focus = {
                type: '',
                name: ''
            };
        } catch (e) {
            appState = {
                page: 'workspace',
                groups: [],
                focus: {
                    type: '',
                    name: ''
                }
            }
        }
        db.push("/appState", appState);
        cb();
    } else {
        let initialDb = {
            appState: {
                page: 'workspace',
                groups: []
            }
        }
        fs.writeFile(dbDir, JSON.stringify(initialDb), 'utf-8', () => {
            db = new JsonDB(new Config(dbDir, true, true, '/'));
            cb();
        })
    }
}

export let state;

state = {
    blacklist: [],
    redirects: {}
}

