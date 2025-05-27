// Menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const menu = document.querySelector('.menu');
    
    if (mobileMenuIcon && menu) {
        mobileMenuIcon.addEventListener('click', function() {
            menu.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em um link
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menu.classList.remove('active');
        });
    });
    
    // Smooth scroll para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animação de entrada para elementos ao rolar a página
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.resumo-card, .curso-card, .hero-content, .impacto-text, .assistente-content, .questoes-text');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Adicionar classe para animação inicial
    setTimeout(function() {
        document.querySelectorAll('.hero-content, .hero-image').forEach(el => {
            el.classList.add('animate');
        });
    }, 300);
    
    // Chamar a função ao carregar a página e ao rolar
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});

// Simulação do assistente IA
function initAssistantChat() {
    const chatContainer = document.getElementById('chat-container');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    
    if (!chatContainer || !userInput || !sendButton) return;
    
    const respostas = {
        'oi': 'Olá! Como posso ajudar com seus estudos de odontologia hoje?',
        'olá': 'Olá! Como posso ajudar com seus estudos de odontologia hoje?',
        'bom dia': 'Bom dia! Em que posso ajudar com seus estudos odontológicos?',
        'boa tarde': 'Boa tarde! Em que posso ajudar com seus estudos odontológicos?',
        'boa noite': 'Boa noite! Em que posso ajudar com seus estudos odontológicos?',
        'endodontia': 'Endodontia é a especialidade que trata do complexo dentino-pulpar e dos tecidos periapicais. Os principais procedimentos incluem tratamento de canal, pulpotomia e apicectomia.',
        'periodontia': 'Periodontia é a especialidade que trata dos tecidos de suporte e proteção dos dentes (gengiva, ligamento periodontal, cemento e osso alveolar). Trata doenças como gengivite e periodontite.',
        'cárie': 'A cárie dental é uma doença multifatorial causada por bactérias que produzem ácidos que desmineralizam o esmalte e a dentina. A prevenção inclui higiene bucal adequada, controle da dieta e uso de flúor.',
        'dentística': 'Dentística é a especialidade que trata da estética e restauração dos dentes. Inclui procedimentos como restaurações diretas e indiretas, facetas e clareamento dental.',
        'prótese': 'Prótese dentária é a especialidade que repõe dentes ausentes ou restaura dentes comprometidos. Pode ser fixa (coroas e pontes), removível (parcial ou total) ou sobre implantes.',
        'ortodontia': 'Ortodontia é a especialidade que corrige o posicionamento dos dentes e dos ossos maxilares. Utiliza aparelhos fixos ou removíveis para alinhar os dentes e corrigir a oclusão.',
        'radiologia': 'Radiologia odontológica é a especialidade que utiliza exames de imagem para diagnóstico. Inclui radiografias periapicais, panorâmicas, tomografias e outros exames complementares.',
        'cirurgia': 'Cirurgia bucomaxilofacial é a especialidade que trata cirurgicamente as doenças da boca, face e pescoço. Inclui extrações, cirurgias ortognáticas, tratamento de traumas e patologias.',
        'implante': 'Implantes dentários são dispositivos de titânio inseridos no osso para substituir raízes dentárias perdidas. Servem como base para próteses fixas, devolvendo função e estética.',
        'atm': 'A Articulação Temporomandibular (ATM) conecta a mandíbula ao crânio. Disfunções podem causar dor, estalos, limitação de abertura bucal e outros sintomas que requerem tratamento multidisciplinar.'
    };
    
    function addMessage(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = isUser ? 'user-message' : 'assistant-message';
        messageDiv.textContent = text;
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    function handleUserInput() {
        const text = userInput.value.trim();
        if (!text) return;
        
        addMessage(text, true);
        userInput.value = '';
        
        // Simular tempo de resposta
        setTimeout(() => {
            let resposta = 'Desculpe, não tenho informações específicas sobre isso. Posso ajudar com temas como endodontia, periodontia, cárie, dentística, prótese, ortodontia, radiologia, cirurgia, implantes ou ATM.';
            
            // Verificar se há palavras-chave na pergunta
            for (const keyword in respostas) {
                if (text.toLowerCase().includes(keyword)) {
                    resposta = respostas[keyword];
                    break;
                }
            }
            
            addMessage(resposta, false);
        }, 1000);
    }
    
    sendButton.addEventListener('click', handleUserInput);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });
    
    // Mensagem inicial
    addMessage('Olá! Sou o assistente FBBR. Como posso ajudar com seus estudos de odontologia hoje?', false);
}

// Inicializar o assistente se estiver na página correta
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('chat-container')) {
        initAssistantChat();
    }
});

// Sistema de flashcards
function initFlashcards() {
    const flashcardContainer = document.getElementById('flashcard-container');
    const flashcardFront = document.getElementById('flashcard-front');
    const flashcardBack = document.getElementById('flashcard-back');
    const flipButton = document.getElementById('flip-button');
    const nextButton = document.getElementById('next-button');
    
    if (!flashcardContainer || !flashcardFront || !flashcardBack || !flipButton || !nextButton) return;
    
    const flashcards = [
        {
            front: 'O que é cárie dental?',
            back: 'Doença multifatorial causada por bactérias que produzem ácidos que desmineralizam o esmalte e a dentina.'
        },
        {
            front: 'Quais são os tecidos periodontais?',
            back: 'Gengiva, ligamento periodontal, cemento radicular e osso alveolar.'
        },
        {
            front: 'O que é pulpite irreversível?',
            back: 'Inflamação da polpa dental que não pode ser revertida, necessitando de tratamento endodôntico.'
        },
        {
            front: 'Quais são os músculos da mastigação?',
            back: 'Masseter, temporal, pterigóideo medial e pterigóideo lateral.'
        },
        {
            front: 'O que é bruxismo?',
            back: 'Hábito parafuncional de ranger ou apertar os dentes, geralmente durante o sono.'
        },
        {
            front: 'Quais são os componentes da tríade de Keyes?',
            back: 'Hospedeiro suscetível, microbiota cariogênica e substrato adequado (dieta rica em carboidratos).'
        },
        {
            front: 'O que é a classificação de Black?',
            back: 'Sistema de classificação de cavidades dentárias: Classe I (oclusais), II (proximais em posteriores), III (proximais em anteriores sem ângulo incisal), IV (proximais em anteriores com ângulo incisal), V (cervicais) e VI (pontas de cúspides).'
        }
    ];
    
    let currentIndex = 0;
    let isFlipped = false;
    
    function updateFlashcard() {
        flashcardFront.textContent = flashcards[currentIndex].front;
        flashcardBack.textContent = flashcards[currentIndex].back;
        isFlipped = false;
        flashcardContainer.classList.remove('flipped');
    }
    
    flipButton.addEventListener('click', function() {
        isFlipped = !isFlipped;
        flashcardContainer.classList.toggle('flipped');
    });
    
    nextButton.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % flashcards.length;
        updateFlashcard();
    });
    
    // Inicializar o primeiro flashcard
    updateFlashcard();
}

// Inicializar os flashcards se estiver na página correta
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('flashcard-container')) {
        initFlashcards();
    }
});

// Sistema de questões
function initQuestoes() {
    const questaoContainer = document.getElementById('questao-container');
    const questaoTexto = document.getElementById('questao-texto');
    const alternativas = document.getElementById('alternativas');
    const verificarButton = document.getElementById('verificar-button');
    const proximaButton = document.getElementById('proxima-button');
    const resultadoDiv = document.getElementById('resultado');
    const progressoDiv = document.getElementById('progresso');
    
    if (!questaoContainer || !questaoTexto || !alternativas || !verificarButton || !proximaButton || !resultadoDiv || !progressoDiv) return;
    
    const questoes = [
        {
            pergunta: 'Qual das opções a seguir representa corretamente um preparo cavitário de Classe III na Classificação de Black?',
            alternativas: [
                'Lesão na face oclusal dos molares e pré-molares',
                'Lesão na face proximal dos dentes anteriores, sem envolvimento do ângulo incisal',
                'Lesão na face proximal dos dentes posteriores',
                'Lesão na face proximal dos dentes anteriores, com envolvimento do ângulo incisal',
                'Lesão na região cervical de qualquer dente'
            ],
            correta: 1,
            explicacao: 'A Classe III na Classificação de Black refere-se a lesões nas faces proximais dos dentes anteriores (incisivos e caninos) que não envolvem o ângulo incisal.'
        },
        {
            pergunta: 'Qual das seguintes estruturas NÃO faz parte do periodonto de proteção?',
            alternativas: [
                'Gengiva livre',
                'Gengiva inserida',
                'Ligamento periodontal',
                'Mucosa alveolar',
                'Junção mucogengival'
            ],
            correta: 2,
            explicacao: 'O periodonto de proteção é composto pela gengiva (livre e inserida) e mucosa alveolar. O ligamento periodontal faz parte do periodonto de sustentação, junto com o cemento radicular e o osso alveolar.'
        },
        {
            pergunta: 'Qual das alternativas abaixo representa corretamente um preparo cavitário de Classe III na Classificação de Black?',
            alternativas: [
                'Cavidade na face oclusal dos molares e pré-molares',
                'Cavidade na face proximal dos dentes anteriores, sem envolvimento do ângulo incisal',
                'Cavidade na face proximal dos dentes posteriores',
                'Cavidade na face proximal dos dentes anteriores, com envolvimento do ângulo incisal',
                'Cavidade na região cervical de qualquer dente'
            ],
            correta: 1,
            explicacao: 'A Classe III na Classificação de Black refere-se a cavidades nas faces proximais dos dentes anteriores (incisivos e caninos) que não envolvem o ângulo incisal.'
        }
    ];
    
    let questaoAtual = 0;
    let pontuacao = 0;
    let respondido = false;
    
    function exibirQuestao() {
        respondido = false;
        const questao = questoes[questaoAtual];
        
        questaoTexto.textContent = questao.pergunta;
        alternativas.innerHTML = '';
        
        questao.alternativas.forEach((alt, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <input type="radio" name="resposta" id="alt${index}" value="${index}">
                <label for="alt${index}">${alt}</label>
            `;
            alternativas.appendChild(li);
        });
        
        resultadoDiv.textContent = '';
        resultadoDiv.className = '';
        verificarButton.disabled = false;
        proximaButton.disabled = true;
        
        atualizarProgresso();
    }
    
    function verificarResposta() {
        if (respondido) return;
        
        const selecionada = document.querySelector('input[name="resposta"]:checked');
        if (!selecionada) {
            resultadoDiv.textContent = 'Por favor, selecione uma alternativa.';
            resultadoDiv.className = 'alerta';
            return;
        }
        
        respondido = true;
        const respostaIndex = parseInt(selecionada.value);
        const questao = questoes[questaoAtual];
        
        if (respostaIndex === questao.correta) {
            resultadoDiv.textContent = 'Correto! ' + questao.explicacao;
            resultadoDiv.className = 'correto';
            pontuacao++;
        } else {
            resultadoDiv.textContent = 'Incorreto. ' + questao.explicacao;
            resultadoDiv.className = 'incorreto';
        }
        
        verificarButton.disabled = true;
        proximaButton.disabled = false;
        
        // Destacar a resposta correta
        document.querySelectorAll('input[name="resposta"]').forEach((input, index) => {
            const label = input.nextElementSibling;
            if (index === questao.correta) {
                label.classList.add('correta');
            } else if (index === respostaIndex) {
                label.classList.add('incorreta');
            }
        });
    }
    
    function proximaQuestao() {
        questaoAtual++;
        
        if (questaoAtual < questoes.length) {
            exibirQuestao();
        } else {
            finalizarQuiz();
        }
    }
    
    function finalizarQuiz() {
        questaoContainer.innerHTML = `
            <h2>Quiz Finalizado!</h2>
            <p>Você acertou ${pontuacao} de ${questoes.length} questões.</p>
            <p>Pontuação: ${Math.round((pontuacao / questoes.length) * 100)}%</p>
            <button id="reiniciar-button" class="btn btn-primary">Reiniciar Quiz</button>
        `;
        
        document.getElementById('reiniciar-button').addEventListener('click', function() {
            questaoAtual = 0;
            pontuacao = 0;
            exibirQuestao();
            questaoContainer.innerHTML = '';
            questaoContainer.appendChild(questaoTexto);
            questaoContainer.appendChild(alternativas);
            questaoContainer.appendChild(resultadoDiv);
            questaoContainer.appendChild(document.createElement('div')).className = 'buttons';
            document.querySelector('.buttons').appendChild(verificarButton);
            document.querySelector('.buttons').appendChild(proximaButton);
            questaoContainer.appendChild(progressoDiv);
        });
    }
    
    function atualizarProgresso() {
        progressoDiv.textContent = `Questão ${questaoAtual + 1} de ${questoes.length}`;
    }
    
    verificarButton.addEventListener('click', verificarResposta);
    proximaButton.addEventListener('click', proximaQuestao);
    
    // Iniciar o quiz
    exibirQuestao();
}

// Inicializar o sistema de questões se estiver na página correta
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('questao-container')) {
        initQuestoes();
    }
});
