import { mostraMsg } from "./util.js";
import { loginCozinheira } from "./api.js";
document.getElementById('formLogin').addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    if (!email || !senha) {
        mostraMsg("Por favor, verifique email ou senha.", "red");
        return;
    }
    const botao = document.getElementById("entrar")
    botao.disable = true;
    botao.textContent = "Carregando...";
    const { sucesso, msg, user } = await loginCozinheira(email, senha);
    botao.disable = false;
    botao.textContent = "Entrar";
    if (sucesso) {
        mostraMsg(`Bem-vindo,${user.nome},green`);
        setTimeout(() =>{
            window.location.href="sistema.html"
        } ,1500);
    } else {
        mostraMsg(msg || "Falha ao fazer loginCozinheira.Verifique email e senha", "red");
    }
});
