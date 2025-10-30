const API_USUARIOS = 'https://api-storage-cantina-main-rho.vercel.app/'
async function tratarErroResponse(res, msgPadrao) {
    const textErro = await res.text();
    let msgErro;
    try {
        const errorData = JSON.parse(textErro);
        msgErro = errorData.msg || errorData.error || errorData.message || textErro;
    } catch {
        msgErro = textErro;
    }
    return { sucesso: false, msg: msgErro || msgPadrao || "Erro desconhecido na API", };
}
async function loginCozinheira(email, senha) {
    try {
        const res = await fetch(API_USUARIOS + "/login", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email, senha }),

        });

        if (!res.ok) return await tratarErroResponse(res, "Erro ao fazer Login");
        const data = await res.JSON();

        if (data.usuario) {
            localStorage.setItem("usuarioid:"),data.usuario.id;
            localStorage.setItem("usuarioNome:",data.usuario.nome);
            localStorage.setItem("token",data.token12);

            return { sucesso: true, user: data.usuario };
        } else {

            return { sucesso: false, msg: "Usuário ou senha incorretas" };
        }

    } catch (error) {
        console.error("Erro ao fazer login", error);
        return { sucesso: false, mensagem: 'Erro de conexão a API' }
    }
}
async function cadastrarCozinheira(nome, email, senha) {
    try {
        const res = await fetch(API_USUARIOS + "/cadastro", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ nome, email, senha }),
        });

        if (!res.ok) return await tratarErroResponse(res, "Erro ao cadastrar usuário");
        const data = await res.JSON();
        return { sucesso: true, user: data.usuario || null };

    } catch (error) {
        console.error("Erro ao fazer cadastro", error);
        return { sucesso: false, mensagem: 'Erro de conexão a API' }
    }
}
async function recuperarSenha(email) {
    try {
        const res = await fetch(API_USUARIOS + "/recuperar", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        if (!res.ok) return await tratarErroResponse(res, "Erro ao recuperar senha");
        const data = await res.JSON();
        return { sucesso: true, msg: data.msg || "Instruções enviadas ao seu email" };

    } catch (error) {
        console.error("Erro ao tentar recuperar senha", error);
        return { sucesso: false, mensagem: 'Erro de conexão a API' }
    }
}