export function logarTempoExecucao(){
    return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
    )
    {

        const MetodoOriginal = descriptor.value;
        descriptor.value = function(...args: any[]){ // sobrescrever o metodo. ...args define que pode receber infinitos parâmetros que neste caso serão postos como elementos de uma array do tipo any
            const t1 = performance.now();
            const retorno = MetodoOriginal.apply(this,args); // apply mostra o contexto(this no negociacoesController, passando o array args como parâmetro, passando cada item do array como se fosse um parâmetro separado)
            const t2 = performance.now();

            console.log(`${propertyKey}, tempo de execução: ${(t2-t1)/1000} segundos`)
            retorno;
        }

        return descriptor;
    }
    
}