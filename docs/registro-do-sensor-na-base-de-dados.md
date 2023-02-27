# Registar Sensor

1. Recebe uma requisição do tipo **POST** na rota broker/sync.
2. Valida os dados obrigatorios **email**, **password**, **cpf** e **serialCode**.


A request http será utilizada para criar um vínculo entre o sensor e o servidor. Na primeira conexão com o servidor, o sensor faz a requisição de sincronização ao servidor e aguarda a resposta, o qual contém seu identificador.
As rotas mqtt serão utilizadas na transmissão de medidas.
