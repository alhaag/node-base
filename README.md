# node-skeleton

Projeto Node.js base, pré configurado, que serve de base para a criação de novos projetos.

## Conteúdo

1. Framework back-end padrão do node [**Express**](http://expressjs.com/)
2. Template [**Jade**](http://jade-lang.com/) para gerenciamento de views
3. Testes(TDD) com a integração do framework [**Mocha**](https://mochajs.org/)
3. [**Gulp**](http://gulpjs.com/) previamente configurado para gerenciamento de tarefas front-end como:
 * Transpilação de javascript de ECMA 6 para ECMA 5.1;
 * **Minificação** de arquivos javascript e analise sintática
 * Preprocessador [**Less**](http://lesscss.org/) para geração dinâmica e organizada de CSS

## Iniciando

Os procedimentos a seguir seguem um passo a passo para a instalação em sistemas linux ubuntu.

Usuários de outras plataformas unix ou windows podem realizar os procementos a seguir de forma semelhante.

### Node.js
Caso ainda não tenha o node instalado na máquina de desenvolvimento utilize o seguinte comando:
```bash
sudo apt-get update
sudo apt-get install nodejs
```

Para instalar o gerenciador de pacotes do NPM do Node.js:
```bash
sudo apt-get install npm
```

Caso precise instalar um versão mais recente do que a disponibilizada pelo gerenciador de pacotes do seu sistema operacional utilize o [procedimento](http://exponential.io/blog/install-nodejs-on-linux/) com a última versão diponível no site do [node](https://nodejs.org/en/).

### Instalando dependências

As dependências estão incluidas no arquivo **./package.json** para instalar execute a partir da raiz do projeto:

```
sudo npm install
```

### Iniciar Node

Para iniciar a execução do projeto node e siscronizar as alterações de código com o browser em tempo real execute o seguinte comando a partir da raiz do projeto:

```
gulp browser-sync
```
