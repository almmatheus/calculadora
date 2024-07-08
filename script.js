const operacaoAnterior = document.querySelector('#operacao-anterior')
const operacaoAtual = document.querySelector('#operacao-atual')
const botoes = document.querySelectorAll('#container-botoes button')

function adicionarDigito(digito){
    if(digito === '.' && operacaoAtual.innerText.includes('.')) return
    operacaoAtual.innerText += digito
}

function realizarOperacao(operacao){
    const valorAtual = parseFloat(operacaoAtual.innerText)
    const valorAnterior = parseFloat(operacaoAnterior.innerText.split(' ')[0])
    const operadorAnterior = operacaoAnterior.innerText.split(' ')[1]

    if(operacao === 'C' ){
        operacaoAnterior.innerText = ''
        operacaoAtual.innerText = ''
        return
    }

    if(operacao === 'CE'){
        operacaoAtual.innerText = ''
        return
    }

    if(operacao === 'DEL'){
        operacaoAtual.innerText = operacaoAtual.innerText.slice(0, -1)
        return
    }

    if(operacao === '='){
        if(operacaoAnterior){
            const resultado = calcular(valorAnterior, valorAtual, operadorAnterior)
            operacaoAtual.innerText = resultado
            operacaoAnterior.innerText = ''
        }
        return
    }

    if(!operacaoAnterior.innerText){
        operacaoAnterior.innerText = `${valorAtual} ${operacao}`
        operacaoAtual.innerText = ''
    } else if (operadorAnterior){
        const resultado = calcular(valorAnterior, valorAtual, operadorAnterior)
        operacaoAnterior.innerText = `${resultado} ${operacao}`
        operacaoAtual.innerText = ''
    }
}

function calcular(valorAnterior, valorAtual, operador){
    switch(operador){
        case '+':
            return valorAnterior + valorAtual
        case '-':
            return valorAnterior - valorAtual
        case '*':
            return valorAnterior * valorAtual
        case '/':
            return valorAnterior / valorAtual
    }
}

botoes.forEach((btn) => {
    btn.addEventListener('click', () => {
        const valor = btn.innerText

        if(!isNaN(valor) || valor === '.'){
            adicionarDigito(valor)
        } else {
            realizarOperacao(valor)
        }
    })
})