
# ACodITools - Sistema de Auditoria

**ACodITools** é um sistema web completo para controle de auditorias, desenvolvido com:
- 🖥️ Frontend em HTML/CSS/JS
- 🛠️ Backend em Node.js + Express
- 💾 Banco de Dados SQLite

---

## 📦 Funcionalidades

- ✅ Login de usuário
- 📊 Dashboard dinâmico com estatísticas
- 📋 Listagem de auditorias e achados
- 📝 Registro de novos achados
- 🧭 Navegação via menu lateral

---

## 🚀 Como rodar o projeto localmente

### 1. Clonar o repositório
```bash
git clone [https://github.com/SEU_USUARIO/acoditools.git](https://github.com/JhonataRocha/fatec.git)
cd acoditools
```

### 2. Instalar as dependências
```bash
cd "Server Node"
npm install
```

### 3. Colocar o banco de dados na pasta do servidor
Copie o arquivo `acoditools.db` para a pasta `Server Node`.

### 4. Definir variáveis de ambiente (opcional)
- `PORT`: porta utilizada pelo servidor (padrão `3000`).
- `DB_FILE`: caminho para o arquivo SQLite (padrão `./acoditools.db`).

### 5. Iniciar o servidor
```bash
npm start
```
O servidor será iniciado em `http://localhost:3000` (ou na porta definida em `PORT`).

### 6. Abrir o frontend
Abra o arquivo `HTML Projeto/inicial/index.html` no navegador (pode usar Live Server).

---

## 🔌 Rotas da API

- `POST /usuario` – Criar novo usuário
- `POST /login` – Autenticar usuário
- `GET /auditorias` – Listar auditorias
- `GET /achados` – Listar achados
- `POST /achados` – Registrar novo achado
- `GET /dashboard` – Dados de conformidade

---

## 👤 Autores
-- Jhonata Rocha de Oliveira – Líder do projeto e testador
- Caio Felipe Almeida – Desenvolvedor
- Gabriel Henrique Caetano Sales – Desenvolvedor


## 📄 Licença
Projeto de uso acadêmico - FATEC São Caetano do Sul
