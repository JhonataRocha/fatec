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
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL
    );
    COMMIT;
    `;
    await db.exec(sql);

        // --- usuários ---
    await db.exec(`
      BEGIN TRANSACTION;
      INSERT OR IGNORE INTO usuarios (id, nome, email, password) VALUES
        (1, 'Jhonata Rocha de Oliveira',        'jhonata@email.com',   '123456'),
        (2, 'Caio Felipe Almeida',              'caio@email.com',       'senha123'),
        (3, 'Gabriel Henrique Caetano Sales',   'gabriel@email.com',    'admin123');
    `);
    
    // --- auditorias (15 registros) ---
    await db.exec(`
      INSERT OR IGNORE INTO auditorias (id, titulo, categoria, data, status, usuario_id) VALUES
        (1,  'Verificação de Firewall',         'Segurança',       '2025-06-01', 'Conforme',      1),
        (2,  'Auditoria de Acesso',             'Acesso',          '2025-06-02', 'Não Conforme',  3),
        (3,  'Backup Semanal',                  'Infraestrutura',  '2025-06-03', 'Pendente',      1),
        (4,  'Atualizações de Software',        'Manutenção',      '2025-06-04', 'Conforme',      2),
        (5,  'Gestão de Senhas',                'Segurança',       '2025-06-05', 'Não Conforme',  3),
        (6,  'Revisão de Logs',                 'Segurança',       '2025-06-06', 'Conforme',      1),
        (7,  'Teste de Intrusão',               'Rede',            '2025-06-07', 'Pendente',      2),
        (8,  'Avaliação de Malware',            'Segurança',       '2025-06-08', 'Não Conforme',  3),
        (9,  'Configuração de VPN',             'Rede',            '2025-06-09', 'Conforme',      1),
        (10, 'Performance de Banco',            'Infraestrutura',  '2025-06-10', 'Pendente',      2),
        (11, 'Conformidade LGPD',               'Conformidade',    '2025-06-11', 'Não Conforme',  3),
        (12, 'Auditoria Física de Segurança',   'Manutenção',      '2025-06-12', 'Conforme',      1),
        (13, 'Teste de Phishing',               'Segurança',       '2025-06-13', 'Não Conforme',  2),
        (14, 'Revisão de Permissões',           'Acesso',          '2025-06-14', 'Pendente',      3),
        (15, 'Atualização de Certificados',     'Infraestrutura',  '2025-06-15', 'Conforme',      1);
    `);
    
    // --- achados (30 registros) ---
    await db.exec(`
      INSERT OR IGNORE INTO achados (id, descricao, auditoria_id, status, data) VALUES
        (1,  'Senha padrão em uso no servidor web',              1, 'Aberto',    '2025-06-01'),
        (2,  'Usuário com acesso indevido a arquivos sensíveis',2, 'Revisão',   '2025-06-02'),
        (3,  'Backup semanal não executado',                     3, 'Corrigido', '2025-06-03'),
        (4,  'Software desatualizado exposto na rede',           4, 'Aberto',    '2025-06-04'),
        (5,  'Política de senhas fraca detectada',              5, 'Aberto',    '2025-06-05'),
        (6,  'Regra de firewall padrão permite tudo',           1, 'Aberto',    '2025-06-01'),
        (7,  'Logs do firewall não estão sendo armazenados',    1, 'Revisão',   '2025-06-02'),
        (8,  'Configuração de portas abertas sem necessidade',  1, 'Aberto',    '2025-06-03'),
        (9,  'Usuário admin sem MFA',                           2, 'Aberto',    '2025-06-02'),
        (10, 'Permissões excessivas em diretório de dados',      2, 'Revisão',   '2025-06-03'),
        (11, 'Backup manual atrasado em 3 dias',                3, 'Aberto',    '2025-06-04'),
        (12, 'Backup parcial falhou sem notificação',           3, 'Corrigido', '2025-06-05'),
        (13, 'Script de backup sem compressão',                 3, 'Revisão',   '2025-06-06'),
        (14, 'Falha na atualização de software crítico',        4, 'Aberto',    '2025-06-07'),
        (15, 'Patch de segurança não aplicado',                 4, 'Corrigido', '2025-06-08'),
        (16, 'Versão de software desatualizada detectada',      4, 'Revisão',   '2025-06-09'),
        (17, 'Falha nas revisões de log',                       6, 'Aberto',    '2025-06-08'),
        (18, 'Logs anteriores indisponíveis',                   6, 'Revisão',   '2025-06-09'),
        (19, 'Tempo de retenção de logs insuficiente',          6, 'Aberto',    '2025-06-10'),
        (20, 'Ambiente de testes acessível via VPN',            7, 'Aberto',    '2025-06-07'),
        (21, 'Rede de produção configurada em bridge',          7, 'Revisão',   '2025-06-08'),
        (22, 'Ferramenta de pentest não atualizada',            7, 'Corrigido', '2025-06-09'),
        (23, 'Sistema infectado por malware',                   8, 'Aberto',    '2025-06-08'),
        (24, 'Antivírus desativado em horários agendados',      8, 'Revisão',   '2025-06-09'),
        (25, 'Entradas suspeitas no log de eventos',            9, 'Aberto',    '2025-06-10'),
        (26, 'VPN sem quadro de segurança TLS',                 9, 'Corrigido', '2025-06-11'),
        (27, 'Conexões VPN simultâneas não limitadas',          9, 'Revisão',   '2025-06-12'),
        (28, 'Consultas lentas no banco de dados',              10,'Aberto',    '2025-06-10'),
        (29, 'Índices faltando em tabelas críticas',            10,'Corrigido', '2025-06-11'),
        (30, 'Transações sem rollback adequado',                10,'Revisão',   '2025-06-12');
    `);

    await db.close();
    console.log('Banco de dados criado com sucesso.');
}

init().catch(err => {
    console.error('Erro ao criar banco:', err);
});
