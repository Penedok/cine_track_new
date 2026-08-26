# Cine Track — Backend

API em Python que guarda e devolve a lista de filmes. O frontend consome essas rotas.

## Biblioteca

A única biblioteca extra para rodar o servidor é o **Flask**.

| Biblioteca | Para que serve |
| --- | --- |
| **Flask** | Cria o servidor HTTP e as rotas (`GET`, `POST`, `DELETE`) |

O Flask já traz o `jsonify` (responder JSON) e o `request` (ler o body das requisições). Não é preciso instalar `flask-cors`: o CORS é liberado no próprio `app.py`.

Instalação:

```bash
pip install flask
```

## Pré-requisitos

- **Python 3** (3.10 ou superior)
- **pip** (vem junto com o Python)

Confira no terminal:

```bash
python --version
pip --version
```

No Windows, se `python` não funcionar, tente `py --version`.

## Como rodar

1. Abra o terminal **no PowerShell** (o prompt deve ser `PS ...`, não `>>>`).
2. Entre na pasta do backend:

```bash
cd backend
```

3. Instale o Flask (só na primeira vez):

```bash
pip install flask
```

4. Suba o servidor:

```bash
python app.py
```

Se deu certo, aparece:

```text
 * Running on http://localhost:5000
 * Debugger is active!
```

Deixe esse terminal aberto. Para parar: `Ctrl + C`.

Teste no navegador: [http://localhost:5000/movies](http://localhost:5000/movies)

## Rotas

| Método | URL | O que faz |
| --- | --- | --- |
| `GET` | `/movies` | Lista todos os filmes |
| `GET` | `/movies/<id>` | Busca um filme pelo id |
| `POST` | `/movies` | Cria um filme (JSON no body) |
| `DELETE` | `/movies/<id>` | Remove um filme pelo id |

O servidor sobe em `localhost`, porta **5000**, com `debug=True`.

## Se aparecer `>>>` no terminal

Isso é o interpretador do Python, não o Flask. Digite `exit()` e rode de novo `python app.py` no PowerShell.

Não cole comandos com `&` enquanto o prompt for `>>>`.
