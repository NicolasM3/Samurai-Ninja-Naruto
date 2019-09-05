var objCanvas=null;     // objeto que representa o canvas
var objContexto=null;   // objeto que representa o contexto do canvas

var pontos = 0;
var primeiraVez1 = true;
var primeiraVez2 = true;
var primeiraVezTiro = true;
// Objetos Image para cada coisa que vai aparecer na tela
var imgFundo = new Image();
imgFundo.src = "Images/fundo.png";

// Controle de Posicionamento do Heroi
var xHeroi=512;
var yHeroi=480;
var velocidadeHeroi = 20;
// Controle de Posicionamento do Monstro
var xMonstro1=55;
var yMonstro1=50;
var xMonstro2=55;
var yMonstro2=50;
var xMonstro3=55;
var yMonstro3=50;
var velocidadeMonstro = 10;
// Contrle do Posicionamento da Bandeira
var xBandeira;
var yBandeira;
// Controle do tiro
var xTiro = 200;
var yTiro = 300;

var xFocoTiro;
var yFocoTiro;

var VetorMonstros = new Array([xMonstro1, yMonstro1], [xMonstro2, yMonstro2], [xMonstro3, yMonstro3]);
var VetorMonstro = new Array([xMonstro1, yMonstro1]);

var imgHeroi = new Image();
imgHeroi.src = "Images/heroi.png";
var imgMonstro1 = new Image();
imgMonstro1.src = "Images/monstro.png";
var imgMonstro2 = new Image();
imgMonstro2.src = "Images/monstro.png";
var imgMonstro3 = new Image();
imgMonstro3.src = "Images/monstro.png";
var imgBandeira = new Image();
imgBandeira.src = "Images/bandeira.png";
var imgTiro = new Image();
imgTiro.src = "Images/bandeira.png";

function Iniciar(){
    objCanvas = document.getElementById("meuCanvas");
    objContexto = objCanvas.getContext("2d");
    objContexto.drawImage(imgFundo,0,0);
    DefinirPosicaoBandeira();
    AtualizaTela();
}

function AtualizaTela()
{
    objContexto.drawImage(imgFundo,0,0);
    objContexto.drawImage(imgHeroi, xHeroi, yHeroi);
    objContexto.drawImage(imgBandeira, xBandeira, yBandeira);
    objContexto.drawImage(imgTiro, xTiro, yTiro);
    MovimentoTiro();
    SpawnarMonstro();
}

function SpawnarMonstro()
{
    if(pontos >= 0 && pontos < 4) 
    {
        objContexto.drawImage(imgMonstro1, VetorMonstro[0][0], VetorMonstro[0][1]);
    }
    else if(pontos >= 4 && pontos < 8)
    {
        if(primeiraVez1)
        {
            VetorMonstro.push(VetorMonstros[1]);
            //alert(VetorMonstro);
            primeiraVez1 = false;
        }
        objContexto.drawImage(imgMonstro1, VetorMonstro[0][0], VetorMonstro[0][1]);
        objContexto.drawImage(imgMonstro2, VetorMonstro[1][0], VetorMonstro[1][1]);
    }
    else if(pontos == 8)
    {
        if(primeiraVez2)
        {
            VetorMonstro.push(VetorMonstros[2]);
            //alert(VetorMonstro);
            primeiraVez2 = false;
        }
        objContexto.drawImage(imgMonstro1, VetorMonstro[0][0], VetorMonstro[0][1]);
        objContexto.drawImage(imgMonstro2, VetorMonstro[1][0], VetorMonstro[1][1]); 
        objContexto.drawImage(imgMonstro2, VetorMonstro[2][0], VetorMonstro[2][1]); 
    }
    else if(pontos > 8)
    {
        objContexto.drawImage(imgMonstro1, VetorMonstro[0][0], VetorMonstro[0][1]);
        objContexto.drawImage(imgMonstro2, VetorMonstro[1][0], VetorMonstro[1][1]);
        objContexto.drawImage(imgMonstro2, VetorMonstro[2][0], VetorMonstro[2][1]); 
    }
}

function SpawnarTiro()
{
    //alert("1");
    if(primeiraVezTiro)
    {
        xTiro = xHeroi;
        yTiro = yTiro;
    }
    objContexto.drawImage(imgTiro, xTiro, yTiro);
    MovimentoTiro();
}

function MovimentoDoMonstroX()
{
    for(var i = 0; i < VetorMonstro.length; i++)
    {
        if(i == 0)
        {
            var aproximadoXHeroi = Math.floor(xHeroi / 20);
            var aproximadoXMonstro = Math.floor(VetorMonstro[i][0] / 20);

            if(aproximadoXHeroi > aproximadoXMonstro)
            {
                VetorMonstro[i][0] += velocidadeMonstro;
            }
            else if(aproximadoXHeroi < aproximadoXMonstro)
            {
                VetorMonstro[i][0] -= velocidadeMonstro;
            }
            
            if(aproximadoXHeroi == aproximadoXMonstro)
            {
                if(yHeroi > VetorMonstro[i][1])
                {
                    VetorMonstro[i][1] += velocidadeMonstro;
                }
                else
                {
                    VetorMonstro[i][1] -= velocidadeMonstro;
                }
            }
        }
        else if(i == 1)
        {
            var aproximadoYHeroi = Math.floor(yHeroi / 20);
            var aproximadoYMonstro = Math.floor(VetorMonstro[i][1] / 20);

            if(aproximadoYHeroi > aproximadoYMonstro)
            {
                VetorMonstro[i][1] += velocidadeMonstro;
            }
            else if(aproximadoYHeroi < aproximadoYMonstro)
            {
                VetorMonstro[i][1] -= velocidadeMonstro;
            }
            
            if(aproximadoYHeroi == aproximadoYMonstro)
            {
                if(xHeroi > VetorMonstro[i][0])
                {
                    VetorMonstro[i][0] += velocidadeMonstro;
                }
                else
                {
                    VetorMonstro[i][0] -= velocidadeMonstro;
                }
            }
        }
        else
        {
            var aproximadoYHeroi = Math.floor(yHeroi / 20);
            var aproximadoYMonstro = Math.floor(VetorMonstro[i][1] / 20);
            var aproximadoXHeroi = Math.floor(xHeroi / 20);
            var aproximadoXMonstro = Math.floor(VetorMonstro[i][0] / 20);

            if(aproximadoXHeroi > aproximadoXMonstro)
            {
                VetorMonstro[i][0] += velocidadeMonstro / 2;
            }
            else if(aproximadoXHeroi < aproximadoXMonstro)
            {
                VetorMonstro[i][0] -= velocidadeMonstro / 2;
            }
            if(aproximadoYHeroi > aproximadoYMonstro)
            {
                VetorMonstro[i][1] += velocidadeMonstro / 2;
            }
            else if(aproximadoYHeroi < aproximadoYMonstro)
            {
                VetorMonstro[i][1] -= velocidadeMonstro / 2;
            }
        }
    }

    VerificarContato();
}

function MovimentoDoHeroi()
{
    var teclaRecebida = event.keyCode;

    switch(teclaRecebida)
    {
        case 65: 
            if(xHeroi > 55)
            {
                xHeroi = (xHeroi - velocidadeHeroi); 
            }
            break;
        case 87: 
            if(yHeroi > 50)
            {
                yHeroi = (yHeroi - velocidadeHeroi); 
            }
            break;
        case 68: 
            if(xHeroi < 932)
            {
                xHeroi = (xHeroi + velocidadeHeroi); 
            }
            break;
        case 83: 
            if(yHeroi < 860 )
            {
                yHeroi = (yHeroi + velocidadeHeroi); 
            }    
            break; 
    }

    VerificarContato();
    MovimentoDoMonstroX();
    AtualizaTela();
}

function VerificarContato()
{
    for (var i = 0; i < VetorMonstro.length; i++)
    {
        var aproximadoXHeroi = Math.floor(xHeroi / 20);
        var aproximadoXMonstro = Math.floor(VetorMonstro[i][0] / 20);
        var aproximadoXBandeira = Math.floor(xBandeira / 20);

        var aproximadoYHeroi = Math.floor(yHeroi / 20);
        var aproximadoYMonstro = Math.floor(VetorMonstro[i][1] / 20);
        var aproximadoYBandeira = Math.floor(yBandeira / 20);


        if(aproximadoXHeroi == aproximadoXMonstro && aproximadoYHeroi == aproximadoYMonstro)
        {
            alert("perdeu");
            Iniciar();
            AtualizaTela();
        }

        if((aproximadoXHeroi == aproximadoXBandeira || aproximadoXHeroi == aproximadoXBandeira + 1 || aproximadoXHeroi == aproximadoXBandeira - 1) && (aproximadoYHeroi == aproximadoYBandeira + 1 || aproximadoYHeroi == aproximadoYBandeira))
        {
            pontos += 1;
            DefinirPosicaoBandeira();
            AtualizaTela();
        }
    }
}

function DefinirPosicaoBandeira()
{
    xBandeira = Math.floor(Math.random() * (932 - 55)) + 55;
    yBandeira = Math.floor(Math.random() * (860 - 50)) + 50;
}

function ReceberPontos()
{
    pontos += 1;
    AtualizaTela();
}

function MovimentoTiro()
{
    aproximadoXFoco = Math.floor(xFocoTiro / 40);
    aproximadoYFoco = Math.floor(yFocoTiro / 40);

    aproximadoXTiro = Math.floor(xTiro / 40);
    aproximadoYTiro = Math.floor(yTiro / 40);
    if(aproximadoXFoco > aproximadoXTiro)
    {
        xTiro += 20;
    }
    else
    {
        xTiro -= 20;
    }

    if(aproximadoYFoco > aproximadoYTiro)
    {
        yTiro += 20;
    }
    else
    {
        yTiro -= 20;
    }

    if(aproximadoYFoco == aproximadoYTiro && aproximadoXFoco == aproximadoXTiro)
    {
        xFocoTiro = 100000;
        yFocoTiro = 100000;

        xTiro = xFocoTiro;
        yTiro = yFocoTiro;
    }
}

$(document).ready(function(){
    Iniciar();
    $(document).on("click",function(event)
    {
        xFocoTiro = event.pageX;
        yFocoTiro = event.pageY;

        xTiro = xHeroi;
        yTiro = yHeroi;
        SpawnarTiro();
    });
})