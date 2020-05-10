
function makeRequest(method, url) {
  return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function() {
      if (this.status >= 200 && this.status < 300) {

        let dados = JSON.parse(xhr.responseText);
        resolve(dados);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function() {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.send();
  });
}


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

//carregarHospedagens();

function loadDoc(){
  carregarHospedagens();
}

// https://developer.mozilla.org/pt-BR/docs/Learn/Common_questions/Como_configurar_um_servidor_de_testes_local

// # Se a versão do Python retornada acima for 3.X
// python3 -m http.server
// # No windows, tente "python" em vez de "python3"
// # Se a versão do Python retornada acima for 2.X
// python -m SimpleHTTPServer


function inserirCard(hospedagem){

  let out = `<div class="card">
              <img src="${hospedagem.photo}" alt="" style="width:100%">
              <div class="card-container">
                <h4><b>${hospedagem.name}</b></h4> 
                <p class="tipo-propriedade">${hospedagem.property_type}</p> 
                <p class="preco-diaria">
                  <span>${formatMoeda(hospedagem.price)}</span>/diária
                </p>
                <p class="total-diarias">Total de R$ 1.963</p>                  
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



