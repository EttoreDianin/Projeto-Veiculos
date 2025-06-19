const form = document.getElementById("form");
const lista = document.getElementById("listaVeiculos");

function salvarVeiculo(veiculo) {
  const veiculos = JSON.parse(localStorage.getItem("veiculos") || "[]");
  veiculos.push(veiculo);
  localStorage.setItem("veiculos", JSON.stringify(veiculos));
}

function carregarVeiculos() {
  lista.innerHTML = "";
  const veiculos = JSON.parse(localStorage.getItem("veiculos") || "[]");

  veiculos.forEach((v, index) => {
    const item = document.createElement("li");
    item.innerHTML = `<strong>${v.tipo}</strong> | Placa: ${v.placa} | Marca: ${v.marca} | Modelo: ${v.modelo}`;
    lista.appendChild(item);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const tipo = document.getElementById("tipo").value;
  const placa = document.getElementById("placa").value.trim().toUpperCase();
  const marca = document.getElementById("marca").value.trim();
  const modelo = document.getElementById("modelo").value.trim();

  if (!tipo || !placa || !marca || !modelo) {
    alert("Preencha todos os campos!");
    return;
  }

  const veiculo = { tipo, placa, marca, modelo };
  salvarVeiculo(veiculo);
  carregarVeiculos();

  form.reset();
});

carregarVeiculos();
