# Load Client

1. Recebe uma requisição **POST** na rota **broker/sync**.
2. Valida os dados obrigatorios  **email**, **password**, **cpf** e **serialCode**.
3. Retorna **201** e os erros se os dados obrigatorios forem invalidos.
3. Retorna **204** se o usuário não existir.
4. Retorna **200**
