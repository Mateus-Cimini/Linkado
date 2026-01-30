# Linkdado

## Seus links salvos com segurança

Projeto desenvolvido com o objetivo de praticar e aplicar diversos recursos de HTML, CSS, JavaScript, jQuery e Bootstrap, criando um repositório pessoal de links onde o usuário pode salvar seus links no **localStorage** do navegador. Os links são salvos em **cards personalizados** com título, descrição, data e hora, tags e podem ser organizados por seções.  

O projeto oferece funcionalidades de backup e restauração de dados via **JSON**, além de permitir apagar todos os dados com apenas 1 clique, garantindo um repositório pessoal seguro e prático.

--

## Tecnologias utilizadas

- HTML  
- CSS  
- JavaScript  
- jQuery  
- Bootstrap  

--

## Funcionalidades principais

- Criar cards para links com thumb, título, descrição, tags, data e hora.  
- Filtrar cards por playlists/seções.  
- Gerar e baixar um JSON com todos os dados salvos automaticamente.  
- Carregar um JSON de backup para gerar automaticamente os cards existentes.  
- Apagar todos os dados salvos com apenas 1 clique.  

--

## Como usar

A utilização é **intuitiva** através de botões chamativos na interface.  
No footer há uma área para dúvidas sobre como usar o site.  

- **Link online:** [Linkdado no Vercel](https://linkado-ten.vercel.app/)  
- **Repositório GitHub:** [https://github.com/Mateus-Cimini/Linkado](https://github.com/Mateus-Cimini/Linkado)  

--

## 🧩 Estrutura do Projeto

```
📁 css/
   ├── base.css
   └── footer.css
   └── header.css
   └── home.css
   └── links.css
   └── main.css
   └── modal.css
   └── responsive.css
📁 img/
   └── logo-lobo.png
📁 js/
   ├── cards.js
   └── formValidation.js
   └── main.js
   └── section.js
   └── tags.js
   └── toast.js
index.html
README.md
```

## Contribuição

Contribuições são bem-vindas! Você pode clonar o repositório e enviar pull requests:  
[Repositório GitHub](https://github.com/Mateus-Cimini/Linkado)  

---

## 🔭 Recomendações priorizadas de evolução

### 🟢 Melhorias rápidas (baixo esforço)

- **Confirmação de ações críticas**  
  Implementar um modal de confirmação antes da ação **“Apagar todos os dados”**, evitando perda acidental de informações.  
  **Benefício:** melhora a segurança e a experiência do usuário.

- **Refatoração para Vanilla JavaScript**  
  Remover a dependência do jQuery, substituindo seletores `$` por `querySelector` e `addEventListener`.  
  **Benefício:** demonstra domínio profundo de JavaScript puro e modernização de código legado.

- **Uso de imagens no README**  
  Adicionar capturas de tela e GIFs da interface em funcionamento diretamente na documentação do GitHub.  
  **Benefício:** aumenta a clareza do projeto e melhora a apresentação para recrutadores.

---

### 🟡 Melhorias de médio impacto

- **Migração para framework moderno**  
  Reconstruir a interface utilizando **React**, **Angular** ou **Svelte**.  
  **Benefício:** evidencia alinhamento com ferramentas exigidas pelo mercado frontend atual.

- **Substituição do LocalStorage**  
  Utilizar **IndexedDB** para armazenamento offline mais robusto ou integrar com APIs como **Google Drive / Google Sheets** para persistência em nuvem sem backend próprio.  
  **Benefício:** melhora escalabilidade, segurança e confiabilidade dos dados.

---

### 🔵 Diferenciais avançados (opcionais)

- **Autenticação de usuários**  
  Implementar login (ex: Firebase Auth ou Google Auth) para permitir acesso aos links em qualquer dispositivo.  
  **Benefício:** transforma o projeto em uma aplicação multiusuário real.

- **Arquitetura de componentes**  
  Transformar cards e formulários em componentes reutilizáveis com propriedades (props).  
  **Benefício:** melhora manutenibilidade, reutilização de código e escalabilidade da aplicação.

---

## Licença

Este projeto está licenciado sob a licença **MIT**.

---

## 👤 Autor

Feito por [Mateus Cimini](https://github.com/Mateus-Cimini)

