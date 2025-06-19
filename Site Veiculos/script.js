const form = document.getElementById('formCadastro');
const listaVeiculos = document.getElementById('listaVeiculos');

// Ajuste a URL para seu backend real (porta e host)
const API_URL = 'http://localhost:8080/veiculos';

// Carrega e mostra a lista de veículos da API
async function carregarVeiculos() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Erro ao buscar veículos');
        const veiculos = await res.json();

        listaVeiculos.innerHTML = '';

        if (veiculos.length === 0) {
            listaVeiculos.innerHTML = '<li>Nenhum veículo cadastrado.</li>';
            return;
        }

        veiculos.forEach(v => {
            const li = document.createElement('li');
            li.textContent = `${v.tipo || v.constructor.name} — Placa: ${v.placa} | Marca: ${v.marca} | Modelo: ${v.modelo}`;
            listaVeiculos.appendChild(li);
        });
    } catch (error) {
        listaVeiculos.innerHTML = `<li>Erro ao carregar veículos: ${error.message}</li>`;
    }
}

// Envia os dados do formulário para o backend (POST)
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const tipo = form.tipo.value.trim();
    const placa = form.placa.value.trim();
    const marca = form.marca.value.trim();
    const modelo = form.modelo.value.trim();

    if (!tipo || !placa || !marca || !modelo) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const veiculo = { tipo, placa, marca, modelo };

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(veiculo)
        });

        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || 'Erro ao cadastrar veículo');
        }

        alert('Veículo cadastrado com sucesso!');
        form.reset();
        carregarVeiculos();
    } catch (error) {
        alert('Erro: ' + error.message);
    }
});

// Carrega veículos assim que a página abre
carregarVeiculos();
