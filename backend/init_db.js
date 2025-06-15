import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function init() {
    const db = await open({
        filename: './acoditools.db',
        driver: sqlite3.Database
    });

    const sql = `
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS achados (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    descricao VARCHAR(200) NOT NULL,
    auditoria_id INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL,
    data DATE NOT NULL,
    FOREIGN KEY (auditoria_id) REFERENCES auditorias(id)
);
CREATE TABLE IF NOT EXISTS auditorias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    data DATE NOT NULL,
    status VARCHAR(20) NOT NULL,
    usuario_id INTEGER,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
CREATE TABLE IF NOT EXISTS logs_acesso (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER,
    data_acesso DATETIME DEFAULT CURRENT_TIMESTAMP,
    acao VARCHAR(100),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);
INSERT INTO "achados" ("id","descricao","auditoria_id","status","data") VALUES (1,'Senha padrão em uso no servidor web',1,'Aberto','2025-06-01'),
 (2,'Usuário com acesso indevido a arquivos sensíveis',2,'Revisão','2025-06-02'),
 (3,'Backup semanal não executado',3,'Corrigido','2025-06-03'),
 (4,'Software desatualizado exposto na rede',4,'Aberto','2025-06-04'),
 (5,'Política de senhas fraca detectada',5,'Aberto','2025-06-05');
INSERT INTO "auditorias" ("id","titulo","categoria","data","status","usuario_id") VALUES (1,'Verificação de Firewall','Segurança','2025-06-01','Conforme',1),
 (2,'Auditoria de Acesso','Acesso','2025-06-02','Não Conforme',3),
 (3,'Backup Semanal','Infraestrutura','2025-06-03','Pendente',1),
 (4,'Atualizações de Software','Manutenção','2025-06-04','Conforme',2),
 (5,'Gestão de Senhas','Segurança','2025-06-05','Não Conforme',3);
INSERT INTO "usuarios" ("id","nome","email","password") VALUES (1,'Jhonata Rocha de Oliveira','jhonata@email.com','123456'),
 (2,'Caio Felipe Almeida','caio@email.com','senha123'),
 (3,'Gabriel Henrique Caetano Sales','gabriel@email.com','admin123');
COMMIT;
`;

    await db.exec(sql);


    await db.close();
    console.log('Banco de dados criado com sucesso.');
}

init().catch(err => {
    console.error('Erro ao criar banco:', err);
});
