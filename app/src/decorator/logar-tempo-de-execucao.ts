export function logarTempoExecucao(emSegundos: boolean = false){ // parâmetro indicando que depende de uma condição verdadeira ou falsa para indicar em segundos ou milisegundos
    return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
    )
    {

        const MetodoOriginal = descriptor.value;
        descriptor.value = function(...args: any[]){ // sobrescrever o metodo. ...args define que pode receber infinitos parâmetros que neste caso serão postos como elementos de uma array do tipo any
           let divisor = 1;
           let unidade = 'milisegundos';
           if(emSegundos){ // caso seja verdadeira a condição de que deve ser mostrada em segundos ele faz as alterações abaixo
            divisor = 1000;
            unidade = 'segundos';
           }
            const t1 = performance.now();
            const retorno = MetodoOriginal.apply(this,args); // apply mostra o contexto(this no negociacoesController, passando o array args como parâmetro, passando cada item do array como se fosse um parâmetro separado)
            const t2 = performance.now();

            console.log(`${propertyKey}, tempo de execução: ${(t2-t1)/divisor} ${unidade}`)
            retorno;
        }

        return descriptor;
    }
    
}