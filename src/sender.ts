import { create, Whatsapp, Message, SocketState } from 'venom-bot';
import parsePhoneNumber, { isValidPhoneNumber } from 'libphonenumber-js';

export type QRCode = {
  base64Qr: string
}

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
                .sendText(message.from, 'Oi pra vc tbm, voce pode escrever "sair" para sair do bot.\nMas posso te mostrar algo legal? Escreva "sim"')
                .then((result) => {
                  console.log('Result: ', result); //return object success
                })
                .catch((erro) => {
                  console.error('Error when sending: ', erro); //return object error
                });
            }

            if (message.body === 'sim' && message.isGroupMsg === false) {
              client
                .sendText(message.from, 'INDIRETA PRA MIM FOFA??????? KKKKKKKKKKKKKKKKKKKK👌👌👌😂😂😂😂😂😂😂😂👌😂👌KKKK👌👌😂👌😂👌👌😂KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKJKK😂👌😂👌😂👌😂👌😂👌😂😂👌KKKKK JOGA NA MINHA LINHA DO TENPO E MARCA O CANIL DE CACHORAS 🐶🐶👈👊QUE VOSE CHAMA DE BONDE💣💣💥💥 SÓ LEBRO DE VC QUANDO ESCUTO🗣👤 LATIDO🐶🐶 NA RUA SUA CACHORA??🐕🐕, ACHO QUE VOU LIGAR📱📱 PRO IBAMA PRA SABER SE SUA MÃE 👱👱TEM LICENCIA✅📝 PRA TE CRIA, SABE PQ ELA NÃO TE DEIXA SAIR DE CASA?🏠🏠 PORQUE COM ESSA CARA FEIA🐮🐮 QUE VOCÊ TEM ELA TEM MEDO😱😱 DE TE CONFUNDIREM COM UM XIPANZE🙈🙊 E TE LEVAREM🏃➡ PRO ZOOLÓGICO, PROGETO☢☢ DE PUTA,💄👄🖕💅 NEM O INFERNO😈😈 É MAIS QUENTE QUE ESSE FOGO🔥🔥 QUE VOCÊ TEM NO SEU RABO??NEM 5 OCEANOS🌊🌊 ATLÂNTICOS🌊🌊 CONSEGUEM APAGAR🚫🚫🙄😑 ISSO SUA PIRANHA.????🐟🐟😣👊👊 SABE PORK VARIOS KORREM ATRAZ DE VOOC?🏃🏃👈👈 POORK QUANDO A MEREMDA🍓🍈🍊🍉🍌 É DE GRACA A FILA ENCHE👪👫👭 TE ORIENTA IMUDA\n\n\nGostou? Agora vc pode mandar pras suas inimigas rs! Se quiser receber novamente, digite sim ou escreva sair.')
                .then((result) => {
                  console.log('Result: ', result); //return object success
                })
                .catch((erro) => {
                  console.error('Error when sending: ', erro); //return object error
                });
            }


           if(message.body == "sair"){
            client
                .sendText(message.from, 'Obrigado por testar o bot. Tchau!')
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

        if(!isValidPhoneNumber(to, "BR")){
          throw new Error('This number is not valid.');
        }

        let phoneNumber = parsePhoneNumber(to, "BR")?.format("E.164").replace("+", "") as string;

        phoneNumber = phoneNumber.includes('@c.us') ? phoneNumber : `${phoneNumber}@c.us`;

        console.log(phoneNumber);

        await this.client.sendText(phoneNumber, body);
        
      }


}

export default Sender;
