import { app } from 'electron';
import fs from 'fs';
import { resolve } from 'path';
import { JsonDB, Config } from 'node-json-db';
const dbDir = resolve(app.getPath('userData') + '/db.json');
export let db;


export async function initDb(cb) {
    if (fs.existsSync(dbDir)) {

        // Initialize DB
        db = await new JsonDB(new Config(dbDir, true, true, '/'));

        db.push('/firstLaunch', false);
        db.getData('/launchCount').then(currentCount => {
            db.push('/launchCount', currentCount + 1);
            cb();

        });
    } else {
        firstLaunch();

        let initialDb = {
            firstLaunch: true,
            launchCount: 1
        }
        fs.writeFile(dbDir, JSON.stringify(initialDb), 'utf-8', () => {
            db = new JsonDB(new Config(dbDir, true, true, '/'));
            cb();
        })
    }
}

function firstLaunch() {
    fs.readFile('/Windows/System32/drivers/etc/hosts', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return
        }
        let groups = {
            "#Sample Name": [
                "123.456.789.321 some-domain.com"
            ]
        }
        let eachLines = data.split('\n');
        console.log('lines:', eachLines);
        let currentGroupName = '';
        let unlabledCounter = 0;
        let entries = [];
        /**
         * +0
        */
        eachLines.forEach(line => {
            let entry;
            if (line == '') {
                currentGroupName = '';
                entries = [];

            } else if (line.startsWith("#")) {
                currentGroupName = line.replace('#', '');
                entries = [];
            } else {
                if (isValidIp(line.split(' ')[0])) {
                    entries.push(line);
                }
            }
            if (entry) {
                if(currentGroupName == ''){
                    currentGroupName = `Unlabled #${unlabledCounter + 1}`;
                    unlabledCounter++;
                }
                console.log(currentGroupName, entry);
                let group = {
                    groupName:currentGroupName,
                    enabled: true,
                    entries: entry
                }
                db.push('/groups[]', group);
            }
        })
    });
}

function isValidIp(ipaddress) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
        return (true)
    }
    return (false)
}  