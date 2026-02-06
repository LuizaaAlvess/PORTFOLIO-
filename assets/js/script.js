// Seletor da Seção About (section)
const about = document.querySelector('#about');

// Seletor da Seção Projects (Carrossel)
const swiperWrapper = document.querySelector('.swiper-wrapper');

// Seletor do Formulário
const formulario = document.querySelector('#formulario');

// Regex de validação do e-mail
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Função para buscar os dados do perfil do GitHub
async function getAboutGithub() {
    try {
        const resposta = await fetch('https://api.github.com/users/LuizaaAlvess');
        const perfil = await resposta.json();

        about.innerHTML = '';

        about.innerHTML = `
        <figure class="about-image">
            <img src="${perfil.avatar_url}" alt="Foto do perfil - ${perfil.name}">
        </figure>

        <article class="about-content">
            <h2>Sobre mim</h2>
            <p>Olá, eu sou a Andreza Luiza</p>
            <h1>Desenvolvedora Full Stack</h1>
            <p>
                Desenvolvo aplicações web modernas com foco em criar experiências digitais incríveis e funcionais.
            </p>

            <div class="about-buttons-data">
                <div class="buttons-container">
                    <a href="${perfil.html_url}" target="_blank" class="botao">Ver GitHub</a>
                    <a href="#" target="_blank" class="botao-outline">Currículo</a>
                </div>

                <div class="data-container">
                    <div class="data-item">
                        <span class="data-number">${perfil.followers}</span>
                        <span class="data-label">Seguidores</span>
                    </div>
                    <div class="data-item">
                        <span class="data-number">${perfil.public_repos}</span>
                        <span class="data-label">Repositórios</span>
                    </div>
                </div>
            </div>
        </article>
        `;
    } catch (error) {
        console.error('Erro ao buscar os dados do GitHub:', error);
    }
}

// Função para buscar os dados dos Projetos (repositórios públicos) do GitHub
async function getProjectsGitHub() {
    try {
        const resposta = await fetch('https://api.github.com/users/LuizaaAlvess/repos?sort=updated&per_page=6');
        const repositorios = await resposta.json();

        swiperWrapper.innerHTML = '';

        // Ícones das linguagens
        const linguagens = {
            JavaScript: { icone: 'javascript' },
            TypeScript: { icone: 'typescript' },
            Python: { icone: 'python' },
            Java: { icone: 'java' },
            HTML: { icone: 'html' },
            CSS: { icone: 'css' },
            PHP: { icone: 'php' },
            'C#': { icone: 'csharp' },
            Go: { icone: 'go' },
            Kotlin: { icone: 'kotlin' },
            Swift: { icone: 'swift' }
        };

        repositorios.forEach(repositorio => {
            const linguagemExibir = repositorio.language || 'GitHub';
            const config = linguagens[repositorio.language] || { icone: 'github' };
            const urlIcone = `./assets/icons/${config.icone}.svg`;

            const nomeFormatado = repositorio.name
                .replace(/[-_]/g, ' ')
                .replace(/[^a-zA-Z0-9\s]/g, '')
                .toUpperCase();

            const descricao = repositorio.description
                ? repositorio.description.length > 100
                    ? repositorio.description.substring(0, 97) + '...'
                    : repositorio.description
                : 'Projeto desenvolvido no GitHub';

            const tags = repositorio.topics?.length > 0
                ? repositorio.topics.slice(0, 3)
                    .map(topic => `<span class="tag">${topic}</span>`)
                    .join('')
                : `<span class="tag">${linguagemExibir}</span>`;

            const botoesAcao = `
                <div class="project-buttons">
                    <a href="${repositorio.html_url}" target="_blank" class="botao botao-sm">
                        GitHub
                    </a>
                    ${repositorio.homepage ? `
                        <a href="${repositorio.homepage}" target="_blank" class="botao-outline botao-sm">
                            Deploy
                        </a>
                    ` : ''}
                </div>
            `;

            swiperWrapper.innerHTML += `
                <div class="swiper-slide">
                    <article class="project-card">
                        <div class="project-image">
                            <img 
                                src="${urlIcone}"
                                alt="Ícone ${linguagemExibir}"
                                onerror="this.onerror=null; this.src='./assets/icons/languages/github.svg';"
                            >
                        </div>

                        <div class="project-content">
                            <h3>${nomeFormatado}</h3>
                            <p>${descricao}</p>
                            <div class="project-tags">${tags}</div>
                            ${botoesAcao}
                        </div>
                    </article>
                </div>
            `;
        });

        iniciarSwiper();
    } catch (error) {
        console.error('Erro ao buscar repositórios:', error);
    }
}

// Inicialização do Swiper
function iniciarSwiper() {
    new Swiper('.projects-swiper', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 24,
        centeredSlides: false,
        loop: true,
        watchOverflow: true,

        breakpoints: {
            0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 40,
                centeredSlides: false
            },
            769: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 40,
                centeredSlides: false
            },
            1025: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 54,
                centeredSlides: false
            }
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
        },

        autoplay: {
            delay: 5000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false
        },

        grabCursor: true,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0
    });
}

// Executar funções
getAboutGithub();
getProjectsGitHub();