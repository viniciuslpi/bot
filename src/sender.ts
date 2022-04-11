import { create, Whatsapp, Message, SocketState } from 'venom-bot';

class Sender {
    private client: Whatsapp;

    constructor(){
      this.initialize();
    }

    private initialize(){

        create(
            'zap-session', //Pass the name of the client you want to start the bot
            //catchQR
            (base64Qrimg, asciiQR, attempts, urlCode) => {
                console.log('Number of attempts to read the qrcode: ', attempts);
                console.log('Terminal qrcode: ', asciiQR);
                console.log('base64 image string qrcode: ', base64Qrimg);
                console.log('urlCode (data-ref): ', urlCode);
              },
              // statusFind
              (statusSession, session) => {
                console.log('Status Session: ', statusSession); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser
                //Create session wss return "serverClose" case server for close
                console.log('Session name: ', session);
              }
          )
          .then((client) => this.start(client))
          .catch((erro) => console.log(erro));
    }

    start(client: Whatsapp) {

        this.client = client;
        //this.sendText("5511954751622@c.us", "Text sended! :)")
          client.onMessage((message) => {

            if (message.body === 'oi' && message.isGroupMsg === false) {
              client
                .sendText(message.from, 'Oi pra vc tbm, fala oi de novo ou diga "sair" para sair do bot')
                .then((result) => {
                  console.log('Result: ', result); //return object success
                })
                .catch((erro) => {
                  console.error('Error when sending: ', erro); //return object error
                });
            }

           if(message.body == "sair"){
            client
                .sendText(message.from, 'Obrigado por tudo. Tchau!')
                .then((result) => {
                  console.log('Result: ', result); //return object success
                })
                .catch((erro) => {
                  console.error('Error when sending: ', erro); //return object error
                });
           } 
          });
         
      }

      async sendText(to: string, body: string){

        //5511945206557@c.us
        await this.client.sendText(to, body);
        
      }


}

export default Sender;
