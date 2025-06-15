document.addEventListener('DOMContentLoaded', () => {
    const tabela = document.getElementById('tabelaMinhasAuditorias');
    if (!tabela) return;

    fetch('http://localhost:3000/auditorias')
        .then(res => res.json())
        .then(auditorias => {
            const userId = localStorage.getItem('userId');
            const lista = userId
                ? auditorias.filter(a => String(a.usuario_id) === String(userId))
                : auditorias;

            if (lista.length === 0) {
                tabela.innerHTML =
                    '<tr><td colspan="5">Nenhuma auditoria encontrada.</td></tr>';
                return;
            }

            lista.forEach(a => {
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
            tabela.innerHTML =
                '<tr><td colspan="5">Erro ao carregar auditorias.</td></tr>';
        });
});
