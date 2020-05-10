function request(method, url)  {
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.response)
        } else {
          reject(xhr.status)
        }
      }
    }
    xhr.ontimeout = function () {
      reject('timeout')
    }
    xhr.open(method, url, true)
    xhr.send()
  })
}

async function carregarHospedagens() {
  
  const url = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";
  const response = await request("GET", url);

  const hospedagens = JSON.parse(response);
  
  limparPainelHospedagem();

  hospedagens.forEach(function (hospedagem) {    
    //console.log(hospedagem);
    inserirCard(hospedagem);
  });
}

function inserirCard(hospedagem){

  let out = `<div class="card">
              <img src="${hospedagem.photo}" alt="" style="width:100%">
              <div class="card-container">
                <h4><b>${hospedagem.name}</b></h4> 
                <p class="tipo-propriedade">${hospedagem.property_type}</p> 
                <p class="preco-diaria">
                  <span>${formatMoeda(hospedagem.price)}</span>/diária
                </p>
                <p class="total-diarias">Total de 1 diária ${formatMoeda(hospedagem.price)}</p>                  
              </div>
            </div>`;

  document.getElementById("painel-hospedagens").innerHTML += out;

}

function limparPainelHospedagem(){
  document.getElementById("painel-hospedagens").innerHTML = "";
}

function formatMoeda(valor){  
	return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });	
}


carregarHospedagens();

// function loadDoc(){
//   carregarHospedagens();
// }
