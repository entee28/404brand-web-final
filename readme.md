# Sahafa

## Setting up dev environment

- Install NodeJS LTS
- Create `.env` file at project root folder (file content on Discord)
- Run those command

```
$ git switch sahafa
$ npm install
$ npm run client-install
```

## Starting development server

```
$ npm run dev
```

## Development guidelines

- Only work on issue with **Ready** status
- Drag ticket to **In progress** collumn when start working
- Create a new branch from **sahafa**, name it **SHF-[issue id]** and working on that branch
- When finished, create a pull request from development branch to **sahafa**, add other members as reviewers and drag ticket to **In review** column
