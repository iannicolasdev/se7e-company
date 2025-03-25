document.addEventListener("DOMContentLoaded", function() {
    // visualizar mais produtos
    const botoesVerMais = document.querySelectorAll(".ver-mais");

    botoesVerMais.forEach(botao => {
        botao.addEventListener("click", function() {
            const listaProdutos = this.previousElementSibling;
            const produtosOcultos = listaProdutos.querySelectorAll(".produto-oculto");

            if (produtosOcultos.length > 0) {
                produtosOcultos.forEach(produto => produto.classList.remove("produto-oculto"));
                this.textContent = "Visualizar menos";
            } else {
                const todosProdutos = listaProdutos.querySelectorAll(".produto");
                todosProdutos.forEach((produto, index) => {
                    if (index >= 3) {
                        produto.classList.add("produto-oculto");
                    }
                });
                this.textContent = "Visualizar mais";
            }
        });
    });

    // filtro dos produtos 
    document.getElementById("filtro-btn").addEventListener("click", function () {
        let menu = document.getElementById("dropdown-menu");
        menu.style.display = menu.style.display === "block" ? "none" : "block";
    });

    // funcionalidade de fechar o menu
    document.addEventListener("click", function (event) {
        let dropdown = document.querySelector(".dropdown");
        if (!dropdown.contains(event.target)) {
            document.getElementById("dropdown-menu").style.display = "none";
        }
    });

    document.querySelectorAll(".filtro-opcao").forEach((botao) => {
        botao.addEventListener("click", function () {
            let categoria = this.getAttribute("data-categoria").trim().toLowerCase(); 
            let elementoCategoria = Array.from(document.querySelectorAll("h2"))
                .find(h2 => h2.textContent.trim().toLowerCase() === categoria); 
    
            if (elementoCategoria) {
                elementoCategoria.scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
                console.warn("Categoria não encontrada:", categoria);
            }
    
            document.getElementById("dropdown-menu").style.display = "none";
        });
    }); 
});

// botão de voltar 
document.addEventListener("DOMContentLoaded", function () {
    let btnTopo = document.getElementById("btnTopo");

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
