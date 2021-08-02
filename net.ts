import init from './src/mongoose/init'
import * as prompts from 'prompts'
import Model_Node from './src/mongoose/model/node'
import * as config_settings from './config/settings.json'
import * as net from 'net'

init()
const commands = {
    commands: async () => {
        let choices: Array<{ title: string, description: string, value: Function }> = [
            { title: 'Add', description: 'Add host', value: commands.add },
            { title: 'Delete', description: 'Delete host', value: commands.del },
            { title: 'List', description: 'List hosts', value: commands.list },
            { title: 'Banned', description: 'List banned hosts', value: commands.list_banned },
            { title: 'Exit', description: 'Exits', value: commands.exit }
        ]
        const res = await prompts({
            type: 'autocomplete',
            name: 'value',
            message: 'Command',
            choices
        })
        if (typeof res.value !== 'function') {
            console.clear()
            return commands.commands()
        }
        res.value()
    },
    add: async () => {
        const res = await prompts({
            type: 'text',
            name: 'host',
            message: 'Enter host',
            validate: async host => {
                if (net.isIP(host) === 0) return 'Invalid IP address'
                if (await Model_Node.exists({ host })) return 'Host already exists'
                return true
            }
        })
        console.clear()
        if (res.host) {
            const info = await new Model_Node({
                host: res.host,
                banned: 0
            }).save()
            if (info) {
                console.log(`Added ${info.host}`)
            }
        }
        commands.commands()
    },
    del: async () => {
        const res = await prompts({
            type: 'text',
            name: 'host',
            message: 'Enter host to delete'
        })
        console.clear()
        if (res.host) {
            const host = res.host.toLowerCase()
            const info = await Model_Node.deleteOne({ host }).exec()
            if (info.ok && info.deletedCount) console.log(`Deleted ${host}`)
        }
        commands.commands()
    },
    pause: () => {
        return new Promise <void> (resolve => {
            process.stdin.setRawMode(true)
            process.stdin.resume()
            process.stdin.once('data', () => resolve())
        })
    },
    list: async () => {
        const docs = await Model_Node.find({}, 'host', { lean: true }).exec()
        const hosts = docs.map(e => e.host)
        if (!hosts.length) console.log('List is empty')
        for (const host of hosts) {
            console.log(host)
        }
        await commands.pause()
        console.clear()
        commands.commands()
    },
    list_banned: async () => {
        const docs = await Model_Node.find({
            banned: {
                $gt: Date.now() - config_settings.Node.banTimeout
            }
        }, 'host banned', { lean: true }).exec()
        const hosts = docs.map(e => `${e.host} ${e.banned}`)
        if (!hosts.length) console.log('List is empty')
        for (const host of hosts) {
            console.log(host)
        }
        await commands.pause()
        console.clear()
        commands.commands()
    },
    exit: () => {
        console.clear()
        process.exit(0)
    }
}
commands.commands()