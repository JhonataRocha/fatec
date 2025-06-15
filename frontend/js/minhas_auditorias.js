document.addEventListener('DOMContentLoaded', () => {
    const tabela = document.getElementById('tabelaMinhasAuditorias');
    if (!tabela) return;
    const userId = localStorage.getItem('userId');
    if (!userId) {
        tabela.innerHTML = '<tr><td colspan="5">Usuário não autenticado.</td></tr>';
        return;
    }
    fetch('http://localhost:3000/auditorias')
        .then(res => res.json())
        .then(auditorias => {
            const minhas = auditorias.filter(a => String(a.usuario_id) === String(userId));
            if (minhas.length === 0) {
                tabela.innerHTML = '<tr><td colspan="5">Nenhuma auditoria encontrada.</td></tr>';
                return;
            }
            minhas.forEach(a => {
                const linha = `
                    <tr>
                        <td>${a.id}</td>
                        <td>${a.titulo}</td>
                        <td>${a.categoria}</td>
                        <td>${a.data}</td>
                        <td>${a.status}</td>
                    </tr>`;
                tabela.innerHTML += linha;
            });
        })
        .catch(err => {
            console.error('Erro ao carregar auditorias:', err);
            tabela.innerHTML = '<tr><td colspan="5">Erro ao carregar auditorias.</td></tr>';
        });
});
