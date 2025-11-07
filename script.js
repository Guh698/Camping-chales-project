// app.js
gsap.registerPlugin(
  ScrollTrigger,
  SplitText,
  Draggable,
  InertiaPlugin,
  MorphSVGPlugin,
  MotionPathPlugin,
  DrawSVGPlugin,
  Flip
);

// porta do site (não admin) + o /graphql
const WP_ENDPOINT = "https://dev-camping-college-work.pantheonsite.io/graphql";

// O "pedido"
const GQL_QUERY = `
  query {
    posts(where: { orderby: { field: DATE, order: DESC } }) { # Busca "Posts"
      nodes {
        title # O título nativo ("Chalé Manacá")
        
        # O nome do seu GRUPO no GraphQL
        infosDoChale { 
          
          # Os nomes dos seus CAMPOS
          descricaoCurta
          precoDaDiaria
          fotoPrincipal {
            node {
              sourceUrl # A URL da imagem!
            }
          }
        }
      }
    }
  }
`;
// 'orderby' ali só por boa prática, pra vir na ordem certa

// --- EXECUÇÃO ---

// Função Async para buscar os dados
async function fetchWpData() {
  console.log("Fetching data from WordPress...");

  try {
    const response = await fetch(WP_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Enviamos nossa query GQL dentro de um objeto JSON
      body: JSON.stringify({ query: GQL_QUERY }),
    });

    // 4. Recebemos a resposta
    const jsonResponse = await response.json();

    // 5. Pegamos os dados que realmente importam
    const chalesData = jsonResponse.data.posts.nodes;

    console.log("Données reçues!", chalesData);

    // 6. Chamamos a função para "desenhar" na tela
    renderChales(chalesData);
  } catch (error) {
    console.error("Oh là là! Erro ao buscar dados:", error);
    // Mostra um erro para o usuário no container
    const container = document.getElementById("chales-container");
    container.innerHTML =
      "<p>Oops! Não conseguimos carregar os chalés. Tente novamente.</p>";
  }
}

// 7. A Função de Renderização (Vanilla JS puro)
function renderChales(chales) {
  const container = document.getElementById("chales-container");

  // Limpa o "Carregando..."
  container.innerHTML = "";

  // Se não veio nada, avisa
  if (chales.length === 0) {
    container.innerHTML = "<p>Nenhum chalé encontrado no momento.</p>";
    return;
  }

  // Loop para criar cada card
  chales.forEach((chale) => {
    // Pega os dados com segurança
    const info = chale.infosDoChale;
    const title = chale.title; // Título nativo do WP
    const desc = info.descricaoCurta || "Sem descrição."; // Fallback
    const price = info.precoDaDiaria || "Preço sob consulta"; // Fallback
    const imgUrl = info.fotoPrincipal?.node?.sourceUrl || "placeholder.jpg"; // Optional chaining

    // Cria o HTML do card (você pode usar .createElement também)
    const cardHTML = `
      <div class="chale-card" style="opacity: 0;"> <img src="${imgUrl}" alt="Foto do ${title}">
        <h3>${title}</h3>
        <p>${desc}</p>
        <strong>${price}</strong>
      </div>
    `;

    // Insere o card no container
    container.insertAdjacentHTML("beforeend", cardHTML);
  });

  // 8. O TOQUE AWWWARDS!
  // Agora que os cards ESTÃO no HTML (mas invisíveis), animamos!
  gsap.to(".chale-card", {
    opacity: 1,
    y: 0,
    stagger: 0.2, // Um card depois do outro
    duration: 1.2,
    ease: "power4.out",
  });
}

// 9. O Ponto de Partida: Quando o HTML carregar, busque os dados.
document.addEventListener("DOMContentLoaded", () => {
  fetchWpData();
});
