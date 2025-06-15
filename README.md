
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

> **Nota:** as senhas deste projeto ficam salvas em *texto puro* no banco de dados. Utilize-o apenas para fins de estudo.
### 1. Clonar o repositório
```bash
git clone https://github.com/JhonataRocha/fatec.git
cd fatec
```

### 2. Instalar as dependências
```bash
cd backend
npm install
```

### 3. Criar o banco de dados
Execute o script de inicialização para gerar `acoditools.db` na pasta `backend`:
```bash
npm run init-db
```

### 4. Definir variáveis de ambiente (opcional)
- `PORT`: porta utilizada pelo servidor (padrão `3000`).
- `DB_FILE`: caminho para o arquivo SQLite (padrão `./acoditools.db`).

### 5. Iniciar o servidor
```bash
npm start
```
O servidor será iniciado em `http://localhost:3000` (ou na porta definida em `PORT`).

### 6. Abrir o frontend
Abra o arquivo `frontend/auth/index.html` no navegador (pode usar Live Server).

### Usuário administrador padrão
Ao iniciar o servidor é criado automaticamente um usuário administrador com:
- **Email:** admin@emil.com
- **Senha:** admin123

### Usuário de teste
Para testar as rotas, crie manualmente o seguinte usuário utilizando a rota `/usuario`:
- **Nome:** Teste
- **Email:** teste@teste.com
- **Senha:** 123456

Exemplo de requisição com `curl`:
```bash
curl -X POST http://localhost:3000/usuario \
     -H "Content-Type: application/json" \
     -d '{"nome": "Teste", "email": "teste@teste.com", "password": "123456"}'
```

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
