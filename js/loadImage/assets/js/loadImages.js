document.addEventListener('DOMContentLoaded', function(event) {
    // Selecionar todas as imagens presentes na página
    const imagensNaPagina = document.querySelectorAll('img');
    const urls = Array.from(imagensNaPagina).map(img => img.src);

    // Contador para controlar o carregamento das imagens
    let imagensCarregadas = 0;

    // Função para carregar e exibir as imagens
    const carregarExibirImagens = (urls) => {
        urls.forEach(url => {
            const imagem = new Image();

            imagem.src = url;
            imagem.addEventListener('load', (event) => {
                imagensCarregadas++;

                if (imagensCarregadas === urls.length) {
                    exibirPagina();
                }
            });
        });
    };

    // Função para exibir a página após o carregamento completo das imagens
    const exibirPagina = () => {
        document.querySelector('#carregando').style.display = 'none';        

        document.querySelector('.list-images').classList.add('show');
    };

    // Chamar a função para carregar e exibir as imagens
    carregarExibirImagens(urls);

    console.log(urls, event)
});

let html = ''
for(let i = 1; i < 200; i++){
    html += `<img src="https://via.placeholder.com/${i * 5}" alt="Imagem ${i}"></img>`
}

document.querySelector('.list-images').innerHTML = html