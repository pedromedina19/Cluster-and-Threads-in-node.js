import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Obter o caminho do diretório atual
const __dirname = dirname(fileURLToPath(import.meta.url));
// Construir o caminho completo para o arquivo threads.js
const __filename = `${__dirname}/threads.js`;


const fibonacci = function (code, n) {
	if (n < 1) return 0;
	if (n <= 2) return 1;
	return fibonacci(code, n - 1) + fibonacci(code, n - 2)
};

if (isMainThread) {
	console.log('main');
	const a = new Worker(__filename, { workerData: { code: 'a', number: 44 } });
    a.on('message', function (message){
        console.log(message);
    })
	const b = new Worker(__filename, { workerData: { code: 'b', number: 44 } });
    b.on('message', function (message){
        console.log(message);
    })
	const c = new Worker(__filename, { workerData: { code: 'c', number: 44 } });
    c.on('message', function (message){
        console.log(message);
    })
	const d = new Worker(__filename, { workerData: { code: 'd', number: 44 } });
	d.on('message', function (message) {
		console.log(message);
	});
} else {
	console.log('thread', workerData.code, workerData.number);
	const result = fibonacci(workerData.code, workerData.number);
	parentPort.postMessage(`thread ${workerData.code} ${result}`);
}