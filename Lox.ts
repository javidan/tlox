import { promises as fs } from 'fs';
import * as readline from 'readline';
import { Scanner } from './Scanner';


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(question: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}



export class Lox {
    source: string
    static hadError = false

    static error(line:number, message:string) {
        Lox.report(line, "", message);
    }

    static report(line:number, where:string, message:string) {
        console.log("[line " + line + "] Error" + where + ": " + message);
        this.hadError = true;
    }

    async init(){
        var args = process.argv.slice(2);

        if(args.length == 1){
            await this.loadSource(args[0])
            this.run()
        }else if(args.length > 1){
            console.log('usage: npm run dev [source file]')
            process.exit(64)
        }else{
            await this.repl()
        }
    }

    async loadSource(filePath){
        try {
            this.source = await fs.readFile(filePath, 'utf-8');
        } catch (error) {
            console.error('Error reading file:', filePath);
            process.exit(64)
        }
    }

    async repl(){

        console.log(`This is a Tlox Repl, press Ctrl+C for exit \n\n`)

        while(true){
            this.source = await askQuestion('> ');
            await this.run()
        }
    }

    run(){
        const scanner = new Scanner(this.source)

        const tokens = scanner.scanTokens()

        for(const token of tokens){
            console.log(token)
        }

        console.log(this.source)
    }
}


const lox = new Lox()
await lox.init()