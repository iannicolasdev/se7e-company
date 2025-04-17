// Organização de visualização dos produtos
document.addEventListener("DOMContentLoaded", function () {
    const listasProdutos = document.querySelectorAll(".lista-produtos");

    listasProdutos.forEach(lista => {
        const produtos = lista.querySelectorAll(".produto");
        // Só os 3 primeiros de cada section aparecem 
        produtos.forEach((produto, index) => {
            if (index >= 3) { 
                produto.style.display = "none";
                produto.classList.add("produto-oculto");
            }
        });
    });
});
// Função de visualizar mais produtos
document.addEventListener("DOMContentLoaded", function () {
    const botoesVerMais = document.querySelectorAll(".ver-mais");

    botoesVerMais.forEach(botao => {
        botao.addEventListener("click", function () {
            const listaProdutos = this.previousElementSibling;
            const produtosOcultos = listaProdutos.querySelectorAll(".produto-oculto");

            if (produtosOcultos.length > 0) {
                produtosOcultos.forEach(produto => {
                    produto.classList.remove("produto-oculto");
                    produto.style.display = "flex"; 
                });
                this.textContent = "Visualizar menos";
            } else {
                const todosProdutos = listaProdutos.querySelectorAll(".produto");
                todosProdutos.forEach((produto, index) => {
                    if (index >= 3) {
                        produto.classList.add("produto-oculto");
                        produto.style.display = "none"; 
                    }
                });
                this.textContent = "Visualizar mais";
            }
        });
    });
});
// Função de filtro dos produtos
document.addEventListener("DOMContentLoaded", function () {
    const filtroBtn = document.getElementById("filtro-btn");
    const menuDropdown = document.getElementById("dropdown-menu");

    // Abrir/Fechar dropdown
    filtroBtn.addEventListener("click", function () {
        menuDropdown.style.display = menuDropdown.style.display === "block" ? "none" : "block";
    });

    // Fecha se clicar fora do dropdown
    document.addEventListener("click", function (event) {
        const dropdownWrapper = document.querySelector(".dropdown");
        if (!dropdownWrapper.contains(event.target)) {
            menuDropdown.style.display = "none";
        }
    });

    // Cria botões de filtro das categorias (h2)
    const categorias = Array.from(document.querySelectorAll("section.produtos h2"))
        .map(h2 => h2.textContent.trim());

    categorias.forEach(categoria => {
        const botao = document.createElement("button");
        botao.classList.add("filtro-opcao");
        botao.setAttribute("data-categoria", categoria);
        botao.textContent = categoria;
        menuDropdown.appendChild(botao);

        botao.addEventListener("click", function () {
            const cat = this.getAttribute("data-categoria").trim().toLowerCase();
            const alvo = Array.from(document.querySelectorAll("h2"))
                .find(h2 => h2.textContent.trim().toLowerCase() === cat);

            if (alvo) {
                alvo.scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
                console.warn("Categoria não encontrada:", cat);
            }

            menuDropdown.style.display = "none";
        });
    });
});

// Botão de voltar ao topo da página
document.addEventListener("DOMContentLoaded", function () {
    let btnTopo = document.getElementById("btnTopo");
    // Exibição do botão de acordo com o scroll do Usuário
    window.addEventListener("scroll", function () {
        if (window.scrollY > 200) {
            btnTopo.style.display = "block";
        } else {
            btnTopo.style.display = "none";
        }
    });

    btnTopo.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
// MODAL (Visualização maior das imagens e mais descrições dos produtos)
document.addEventListener("DOMContentLoaded", function () {
    let modal = document.getElementById("modal");
    let modalImg = document.getElementById("modal-img");
    let modalDesc = document.getElementById("modal-desc");
    let fechar = document.querySelector(".fechar");

    document.querySelectorAll(".produto").forEach(produto => {
        produto.addEventListener("click", function () {
            let imgSrc = this.querySelector("img").src;
            let infoProduto = this.querySelector(".info-produto").cloneNode(true);

            infoProduto.querySelectorAll("p:nth-of-type(n+4)").forEach(p => {
                p.style.display = "block";
            });

            modal.style.display = "flex";
            modalImg.src = imgSrc;
            modalDesc.innerHTML = "";
            modalDesc.appendChild(infoProduto);
            document.body.classList.add("no-scroll");
        });
    });

    fechar.addEventListener("click", function () {
        modal.style.display = "none";
        document.body.classList.remove("no-scroll"); 
    });

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
            document.body.classList.remove("no-scroll"); // Bloqueio da tela quando o Modal estiver ativo
        }
    });
});