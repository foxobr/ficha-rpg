# RPG Character Sheet

Ficha de personagem para RPG com interface sci-fi.

## 🚀 Deploy no GitHub Pages

### Pré-requisitos
1. Ter o Git instalado: https://git-scm.com/download/win
2. Ter uma conta no GitHub: https://github.com

### Passo a passo para fazer o upload:

#### 1. Instalar o Git (se ainda não tiver)
- Baixe e instale o Git: https://git-scm.com/download/win
- Reinicie o PowerShell após a instalação

#### 2. Criar um repositório no GitHub
- Acesse https://github.com
- Clique em "New repository" ou "Novo repositório"
- Dê um nome ao repositório (ex: "rpg-character-sheet")
- **IMPORTANTE**: Deixe o repositório público
- Não inicialize com README, .gitignore ou licença
- Clique em "Create repository"

#### 3. Configurar o Git localmente (apenas primeira vez)
Abra o PowerShell nesta pasta e execute:
```powershell
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@example.com"
```

#### 4. Atualizar o vite.config.ts
Abra o arquivo `vite.config.ts` e altere a linha:
```typescript
base: '/project/',
```
Para:
```typescript
base: '/nome-do-seu-repositorio/',
```
(substitua "nome-do-seu-repositorio" pelo nome que você deu no passo 2)

#### 5. Fazer o upload para o GitHub
No PowerShell, nesta pasta, execute os seguintes comandos:

```powershell
# Inicializar o repositório
git init

# Adicionar todos os arquivos
git add .

# Fazer o primeiro commit
git commit -m "Initial commit"

# Renomear a branch para main
git branch -M main

# Adicionar o repositório remoto (SUBSTITUA USERNAME e REPO-NAME)
git remote add origin https://github.com/USERNAME/REPO-NAME.git

# Fazer o push
git push -u origin main

# Fazer o deploy no GitHub Pages
npm run deploy
```

**Importante**: No comando `git remote add origin`, substitua:
- `USERNAME` pelo seu nome de usuário do GitHub
- `REPO-NAME` pelo nome do repositório que você criou

#### 6. Habilitar o GitHub Pages
1. No GitHub, vá para o seu repositório
2. Clique em "Settings" (Configurações)
3. No menu lateral, clique em "Pages"
4. Em "Source", selecione a branch "gh-pages"
5. Clique em "Save"

Após alguns minutos, seu site estará disponível em:
`https://USERNAME.github.io/REPO-NAME/`

## 📝 Comandos úteis

```powershell
# Rodar o projeto localmente
npm run dev

# Fazer build do projeto
npm run build

# Fazer deploy (após configurar o Git)
npm run deploy
```

## 🔄 Atualizações futuras

Quando quiser atualizar o site após fazer mudanças:

```powershell
git add .
git commit -m "Descrição das mudanças"
git push
npm run deploy
```

## 🛠️ Tecnologias

- React
- TypeScript
- Vite
- CSS

## 📄 Licença

Projeto pessoal
