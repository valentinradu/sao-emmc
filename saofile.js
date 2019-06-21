module.exports = {
    prompts() {
        return [
            {
                name: 'name',
                message: 'Name:',
                default: this.outFolder,
                filter: val => val.toLowerCase().trim(),
                store: true
            },
            {
                name: 'group',
                message: 'Group:',
                default: '',
                filter: val => val.toLowerCase().trim(),
                store: true
            },
            {
                name: 'description',
                message: 'Description:',
                default: ''
            },
            {
                name: 'author',
                message: 'Author:',
                default: `${this.gitUser.name} <${this.gitUser.email}>`,
            },
            {
                name: 'version',
                message: 'Initial vesion:',
                default: '0.0.1'
            },
            {
                name: 'license',
                message: 'License:',
                default: 'UNLICENSED'
            },
            {
                name: 'private',
                message: 'Private:',
                default: true
            },
            {
                name: 'entryPoint',
                message: 'Entrypoint:',
                default: 'index.js'
            },
            {
                name: 'repository',
                message: 'Repository:',
                default({group, name}) { return `https://gitlab.com/${group || this.gitUser.username}/${name}.git` }
            }
        ]
    },
    actions: [
        {
            type: 'add',
            files: '**'
        },
        {
            type: 'move',
            patterns: {
                '.gitignore.template': '.gitignore',
            }
        },
        {
            type: 'move',
            patterns: {
                '.env.template': '.env'
            }
        }
    ],
    async completed() {
        this.gitInit()
        await this.npmInstall()
        this.showProjectTips()
    }
}