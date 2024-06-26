import express from "express";
import bodyParser from "body-parser";
import { atualizar, procurar, setUser, getUser, delUser, validarUser} from "../back/controle/usuario.js";
import { atualizarProd, procurarProd, setProd, getProd, delProd} from "../back/controle/produtos.js";
import { atualizarEmp, procurarEmp, setEmpr, getEmpresa, delEmpr} from "../back/controle/empresa.js";
import { atualizarCargo, procurarCargo, setCarg, getCarg, delCarg} from "../back/controle/cargo.js";
import { atualizarFunc, procurarFunc, setFunc, getFunc, delFunc} from "../back/controle/funcionario.js";


const host = "127.0.0.1";
const porta = 3000;
const user = "localhost";
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//------------------------------------------------usuário---------------------------------------------------------
app.get('/teste', async (req, res) => {
    let cod_em = Number(req.body.cod_empr);
    let cpf = Number(req.body.cpf);

    try {
        const count = await validarUser(cod_em, cpf);
        if (count === 0) {
            res.send("funciona");
        } else {
            res.send(`Usuário já existente: ${count}`);
        }
    } catch (error) {
        res.status(500).send('Erro ao validar usuário.');
    }
});
app.post('/usuario', async (req, res) => {
    let nome = req.body.nome;
    let email = req.body.email;
    let senha = req.body.senha;
    let cpf = Number(req.body.cpf);
    let cod = Number(req.body.cod_empr);
    let foto = req.body.foto;
  
    let userData = { nome, email, senha, cpf, cod, foto };
    
  if(validarUser(cpf,cod) == 0){
    try {
      await setUser(userData);
      res.status(200).send('Usuário criado com sucesso!');
    } catch (error) {
      res.status(500).send('Erro ao criar usuário.');
    }
}
else {
    res.status(400).json({ message: "usuário já existente:"+validarUser(cpf,cod) });
}
  });


app.get('/usuario/mostrar', async (req, res) => {
    const { valor, nome} = req.body; // Usar req.query para parâmetros de consulta em uma requisição GET
console.log(valor, nome)
    try {
        const resultado = await procurar({ valor, nome});
        res.status(200).json({ data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao procurar usuário", error: error.message });
    }
});


app.post('/usuario/atualizar', async (req, res) => {
    const { valor, nome, tipo, ent} = req.body; // Usar req.query para parâmetros de consulta em uma requisição GET
console.log(valor, nome,tipo, ent)
    try {
        const resultado = await atualizar(valor, nome, tipo, ent)
        res.status(200).json({ data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar o usuário", error: error.message });
    }
});

app.post('/usuario/deletar', async (req, res) => {
    const { valor, nome} = req.body; // Usar req.query para parâmetros de consulta em uma requisição GET
console.log(valor, nome)
    try {
        const resultado = await delUser(valor, nome)
        res.status(200).json({ data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar o usuário", error: error.message });
    }
});

app.get('/usuario/mostrar_todos', async (req, res) => {
 getUser()
});

//-------------------------------------------------Produto---------------------------------------------------------
app.post('/produto', async (req, res) => {
    const { nome, valor, quantidade, area, cod_empr, foto } = req.body; // Supondo que esses são os parâmetros esperados

    try {
        const resultado = await setProd({ nome, valor, quantidade, area, cod_empr, foto });
        res.status(201).json({ message: "Produto criado com sucesso", data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar o produto", error: error.message });
    }
});


app.get('/produto/mostrar', async (req, res) => {
    const { valor, nome} = req.body; // Usar req.query para parâmetros de consulta em uma requisição GET
console.log(valor, nome)
    try {
        const resultado = await procurarProd({ valor, nome});
        res.status(200).json({ data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao procurar o produto", error: error.message });
    }
});


app.post('/produto/atualizar', async (req, res) => {
    const { valor, nome, tipo, ent} = req.body; // Usar req.query para parâmetros de consulta em uma requisição GET
console.log(valor, nome,tipo, ent)
    try {
        const resultado = await atualizarProd(valor, nome, tipo, ent)
        res.status(200).json({ data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar o produto", error: error.message });
    }
});

app.post('/produto/deletar', async (req, res) => {
    const { valor, nome} = req.body; // Usar req.query para parâmetros de consulta em uma requisição GET
console.log(valor, nome)
    try {
        const resultado = await delProd(valor, nome)
        res.status(200).json({ data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar o produto", error: error.message });
    }
});


app.get('/produto/mostrar_todos', async (req, res) => {
 getProd()
});
//------------------------------------------------------Empresa------------------------------------------------------------
app.post('/empresa', async (req, res) => {
    const {Nome, RS, Email, CNPJ, Senha, Foto } = req.body; // Supondo que esses são os parâmetros esperados

    try {
        const resultado = await setEmpr({Nome, RS, Email, CNPJ, Senha, Foto});
        res.status(201).json({ message: "Empresa criada com sucesso", data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar a empresa", error: error.message });
    }
});


app.get('/empresa/mostrar', async (req, res) => {
    const { valor, nome} = req.body; // Usar req.query para parâmetros de consulta em uma requisição GET
console.log(valor, nome)
    try {
        const resultado = await procurarEmp({ valor, nome});
        res.status(200).json({ data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao procurar a empresa", error: error.message });
    }
});


app.post('/empresa/atualizar', async (req, res) => {
    const { valor, nome, tipo, ent} = req.body; // Usar req.query para parâmetros de consulta em uma requisição GET
console.log(valor, nome,tipo, ent)
    try {
        const resultado = await atualizarEmp(valor, nome, tipo, ent)
        res.status(200).json({ data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar a empresa", error: error.message });
    }
});

app.post('/empresa/deletar', async (req, res) => {
    const { valor, nome} = req.body; // Usar req.query para parâmetros de consulta em uma requisição GET
console.log(valor, nome)
    try {
        const resultado = await delEmpr(valor, nome)
        res.status(200).json({ data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar a empresa", error: error.message });
    }
});


app.get('/empresa/mostrar_todos', async (req, res) => {
 getEmpresa()
});
//--------------------------------------------------------------Cargo--------------------------------------------------------

app.post('/cargo', async (req, res) => {
    const {Nome, Salario, Cod_empresa } = req.body; // Supondo que esses são os parâmetros esperados

    try {
        const resultado = await setCarg({Nome, Salario, Cod_empresa });
        res.status(201).json({ message: "Cargo criado com sucesso", data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar o cargo", error: error.message });
    }
});


app.get('/cargo/mostrar', async (req, res) => {
    const { valor, nome} = req.body; // Usar req.query para parâmetros de consulta em uma requisição GET
console.log(valor, nome)
    try {
        const resultado = await procurarCargo({ valor, nome});
        res.status(200).json({ data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao procurar o cargo", error: error.message });
    }
});


app.post('/cargo/atualizar', async (req, res) => {
    const { valor, nome, tipo, ent} = req.body; // Usar req.query para parâmetros de consulta em uma requisição GET
console.log(valor, nome,tipo, ent)
    try {
        const resultado = await atualizarCargo(valor, nome, tipo, ent)
        res.status(200).json({ data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar o cargo", error: error.message });
    }
});

app.post('/cargo/deletar', async (req, res) => {
    const { valor, nome} = req.body; // Usar req.query para parâmetros de consulta em uma requisição GET
console.log(valor, nome)
    try {
        const resultado = await delCarg(valor, nome)
        res.status(200).json({ data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar o cargo", error: error.message });
    }
});


app.get('/cargo/mostrar_todos', async (req, res) => {
 getCarg()
});

//----------------------------------------------------------Funcionário------------------------------------------

app.post('/funcionario', async (req, res) => {
    const {Nome, Email, Telefone, foto, CPF, Cod_empresa, Cod_cargo, senha } = req.body; // Supondo que esses são os parâmetros esperados
console.log(Nome, Email, Telefone, foto, CPF, Cod_empresa, Cod_cargo, senha )
    try {
        const resultado = await setFunc({Nome, Email, Telefone, foto, CPF, Cod_empresa, Cod_cargo, senha});
        res.status(201).json({ message: "Funcionário criado com sucesso", data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar o funcionário", error: error.message });
    }
});


app.get('/funcionario/mostrar', async (req, res) => {
    const { valor, nome} = req.body; // Usar req.query para parâmetros de consulta em uma requisição GET
console.log(valor, nome)
    try {
        const resultado = await procurarFunc({ valor, nome});
        res.status(200).json({ data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao procurar o funcionário", error: error.message });
    }
});


app.post('/funcionario/atualizar', async (req, res) => {
    const { valor, nome, tipo, ent} = req.body; // Usar req.query para parâmetros de consulta em uma requisição GET
console.log(valor, nome,tipo, ent)
    try {
        const resultado = await atualizarFunc(valor, nome, tipo, ent)
        res.status(200).json({ data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar o funcionário", error: error.message });
    }
});

app.post('/funcionario/deletar', async (req, res) => {
    const { valor, nome} = req.body; // Usar req.query para parâmetros de consulta em uma requisição GET
console.log(valor, nome)
    try {
        const resultado = await delFunc(valor, nome)
        res.status(200).json({ data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar o funcionário", error: error.message });
    }
});


app.get('/funcionario/mostrar_todos', async (req, res) => {
 getFunc()
});

app.listen(porta, host, user, () => {
    console.log("servidor rodando");
});
