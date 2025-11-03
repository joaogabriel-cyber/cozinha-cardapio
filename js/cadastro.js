import { mostraMsg } from "./util.js";;
import { cadastrarCozinheira } from "./api.js";
document.getElementById('formCadastrar').addEventListener("submit", async (event) => {
    event.preventDefault();
    const nome = document.getElementById("nome").value.trim();
    const confirmarSenha = document.getElementById("confirmarSenha").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    if (!nome || !email || !senha || !confirmarSenha) {
        mostraMsg("Por favor , preencha todos os campos.", red);
        return;
    }
    if (senha!==confirmarSenha) {
        mostraMsg("As senhas não conferem","red")
    }
    const botao = document.getElementById("cadastrar")
    botao.disable = true;
    botao.textContent = "Carregando...";
    const { sucesso, msg } = await cadastrarCozinheira(nome, email, senha);
    botao.disable = false;
    botao.textContent = "Cadastrar";
    if (sucesso) {
        mostraMsg("Cadastro realizado com sucesso","green");
        setTimeout(() => {
            window.location.href = "login.html"
        }, 1500);
    } else {
        mostraMsg(msg , "red");
    }
});