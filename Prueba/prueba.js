
const fs = require('fs');
const leerArray = async () => {

    try{
        const nombreArchivo = 'products.json'
        const contenidoString = await fs.promises.readFile(nombreArchivo, 'utf-8');
        const contenidoObj = JSON.parse(contenidoString);
        const sizeFile = Buffer.byteLength(contenidoString, 'utf-8');
        const info = {
            contenidoString,
            contenidoObj,
            sizeFile,
        };
        console.log(info);
        await fs.promises.writeFile('info.json', JSON.stringify(info, null, 2), 'utf-8'); 
        console.log('El objeto se ha guardado en info.json');
    } catch(err){
        throw new Error('Error al leer el archivo: '+ err.message)
    }
    
}

leerArray();