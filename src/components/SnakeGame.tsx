import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Play } from 'lucide-react';

type Status = 'ready' | 'playing' | 'over';
type Obstacle = { x:number; w:number; h:number; kind:number };
type GameState = { y:number; vy:number; obstacles:Obstacle[]; distance:number; speed:number; spawn:number; frame:number; clouds:{x:number;y:number}[] };
const W=800, H=300, GROUND=249, PW=39, PH=55, PX=93;
const GRAVITY=0.77, JUMP=-13.4;
const initial=():GameState=>({y:GROUND-PH,vy:0,obstacles:[],distance:0,speed:5.2,spawn:75,frame:0,clouds:[{x:145,y:62},{x:470,y:43},{x:730,y:82}]});
const pixels=[
'....hhhhhhhh....',
'..hhhhhhhhhhhhh.',
'.hhhhhhhhhhhhhhh',
'.hhhssshhhshhhhh',
'hhhssssssssshhhhh',
'hhhssssssssshhhhh',
'hhhswwssssswwhhh',
'hhhseesssssee hhh',
'hhhssssnnsssshhhh',
'.hhssssssssshhhh.',
'.hhssssmmssshhh..',
'..hhssssssshhhh..',
'..hhhhhhhhhhhh...',
'...hhttpptthhh...',
'....tttpppttt...',
'....tttpppttt...',
'...ttttppptttt..',
'...ttttppptttt..',
'....tttpppttt...',
'.....bb..bb.....',
'.....bb..bb.....',
'.....bb..bb.....',
'....bbb..bbb....',
'....bbb..bbb....'
].map(s=>s.replace(/ /g,''));
const palette:Record<string,string>={h:'#243c30',s:'#e3bda5',w:'#e9d3bf',e:'#172a21',n:'#c9917c',m:'#a96166',t:'#e8ebdf',p:'#c3d4c5',b:'#304b3b'};
function drawClara(ctx:CanvasRenderingContext2D,x:number,y:number,frame:number){
 const unit=2.45, bounce=frame%14<7?0:1;
 for(let row=0;row<pixels.length;row++)for(let col=0;col<pixels[row].length;col++){
  const key=pixels[row][col],color=palette[key];if(!color)continue;
  const leg=row>=20?(frame%12<6?(col<8?-1:1):(col<8?1:-1)):0;
  ctx.fillStyle=color;ctx.fillRect(Math.round(x+col*unit+leg),Math.round(y+row*unit+bounce),Math.ceil(unit),Math.ceil(unit));
 }
}
function drawCactus(ctx:CanvasRenderingContext2D,x:number,h:number,kind:number){
 ctx.fillStyle='#476d54';const w=kind===0?18:24;
 ctx.fillRect(Math.round(x+w*.35),GROUND-h,Math.round(w*.4),h);
 ctx.fillRect(Math.round(x),GROUND-h*.64,7,7);ctx.fillRect(Math.round(x),GROUND-h*.64,7,h*.37);
 ctx.fillRect(Math.round(x+w-7),GROUND-h*.8,7,7);ctx.fillRect(Math.round(x+w-7),GROUND-h*.8,7,h*.42);
 ctx.fillStyle='#8cac91';ctx.fillRect(Math.round(x+w*.35),GROUND-h,3,h);
}
function render(ctx:CanvasRenderingContext2D,g:GameState,status:Status){
 ctx.clearRect(0,0,W,H);ctx.fillStyle='#f3f5ed';ctx.fillRect(0,0,W,H);
 ctx.fillStyle='#e4ebe1';ctx.fillRect(0,180,W,GROUND-180);
 ctx.fillStyle='#d5e2d5';for(let i=0;i<7;i++){const x=(i*180-g.distance*.15%180+W)%W;ctx.fillRect(x,204,95,45);ctx.fillRect(x+20,188,50,16);}
 ctx.strokeStyle='#bacfbe';ctx.lineWidth=2;
 for(const c of g.clouds){const x=(c.x-g.distance*.23%1050+1050)%1050-40;ctx.beginPath();ctx.moveTo(x,c.y+18);ctx.lineTo(x+15,c.y+18);ctx.lineTo(x+22,c.y+9);ctx.lineTo(x+37,c.y+9);ctx.lineTo(x+44,c.y);ctx.lineTo(x+66,c.y);ctx.lineTo(x+74,c.y+13);ctx.lineTo(x+92,c.y+13);ctx.stroke();}
 ctx.fillStyle='#466f54';ctx.fillRect(0,GROUND,W,3);
 ctx.fillStyle='#a2bba6';for(let i=0;i<23;i++){const x=(i*47-g.distance*1.2%47+W)%W;ctx.fillRect(x,GROUND+11+(i%3)*5,4,2);}
 for(const o of g.obstacles)drawCactus(ctx,o.x,o.h,o.kind);
 drawClara(ctx,PX,g.y,g.frame);
 if(status==='ready'){ctx.fillStyle='#2d4d38';ctx.font='bold 15px monospace';ctx.fillText('CLARA RUN',25,32);}
}
export default function SnakeGame(){
 const canvas=useRef<HTMLCanvasElement|null>(null),state=useRef<GameState>(initial()),statusRef=useRef<Status>('ready'),last=useRef(0),acc=useRef(0),scoreRef=useRef(0);
 const [status,setStatus]=useState<Status>('ready'),[score,setScore]=useState(0),[best,setBest]=useState(0);
 const change=useCallback((v:Status)=>{statusRef.current=v;setStatus(v)},[]);
 const reset=useCallback(()=>{state.current=initial();scoreRef.current=0;setScore(0);change('playing')},[change]);
 const jump=useCallback(()=>{if(statusRef.current!=='playing'){reset();return}const g=state.current;if(g.y>=GROUND-PH-.1){g.vy=JUMP;}},[reset]);
 useEffect(()=>{try{setBest(Number(localStorage.getItem('clara-run-best')||0))}catch{}},[]);
 useEffect(()=>{const key=(e:KeyboardEvent)=>{if(['Space','ArrowUp','KeyW'].includes(e.code)){e.preventDefault();jump()}if(e.code==='KeyR')reset()};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key)},[jump,reset]);
 useEffect(()=>{
  let id=0;const ctx=canvas.current?.getContext('2d');if(!ctx)return;
  const tick=(time:number)=>{if(!last.current)last.current=time;acc.current+=Math.min(time-last.current,50);last.current=time;
   while(acc.current>=16.67){acc.current-=16.67;const g=state.current;
    if(statusRef.current==='playing'){
     g.frame++;g.distance+=g.speed;g.speed=Math.min(10.7,5.2+g.distance/1700);
     g.vy+=GRAVITY;g.y=Math.min(GROUND-PH,g.y+g.vy);if(g.y===GROUND-PH)g.vy=0;
     g.spawn--;if(g.spawn<=0){const h=32+Math.floor(Math.random()*3)*12;g.obstacles.push({x:W+20,w:24,h,kind:Math.random()>.5?1:0});g.spawn=Math.round(62+Math.random()*45-(g.speed-5)*2)}
     for(const o of g.obstacles)o.x-=g.speed;g.obstacles=g.obstacles.filter(o=>o.x>-35);
     if(g.obstacles.some(o=>PX+PW-9>o.x+3&&PX+8<o.x+o.w-3&&g.y+PH-3>GROUND-o.h+7)){change('over')}
     const next=Math.floor(g.distance/12);if(next!==scoreRef.current){scoreRef.current=next;setScore(next);setBest(b=>{if(next<=b)return b;try{localStorage.setItem('clara-run-best',String(next))}catch{}return next})}
    }
   }
   render(ctx,state.current,statusRef.current);id=requestAnimationFrame(tick);
  };
  id=requestAnimationFrame(tick);return()=>{cancelAnimationFrame(id);last.current=0;acc.current=0};
 },[change]);
 return <main className="wrap dino-page">
  <Link to="/" className="snake-back"><ArrowLeft size={17}/> Voltar ao portfólio</Link>
  <div className="dino-intro"><p className="kicker">UM INTERVALO DIVERTIDO</p><h1>Clara <em>Run.</em></h1><p>Uma aventura pixelada com a Clara como protagonista. Pule os obstáculos e tente bater seu recorde!</p></div>
  <section className="dino-shell" aria-label="Jogo de corrida e salto Clara Run">
   <div className="dino-hud"><span>CLARA RUN <small>01 / INFINITO</small></span><span>PONTOS <strong>{String(score).padStart(5,'0')}</strong> <span className="dino-best">RECORDE <strong>{String(best).padStart(5,'0')}</strong></span></span></div>
   <div className="dino-stage" onPointerDown={e=>{if(e.pointerType!=='mouse')jump()}}>
    <canvas ref={canvas} width={W} height={H} aria-label="Clara pixelada pula cactos. Pressione espaço, seta para cima ou toque para saltar."/>
    {status!=='playing'&&<div className="dino-overlay"><div className="dino-overlay-card"><span className="dino-overline">{status==='over'?'FIM DE JOGO':'PRONTA PARA CORRER?'}</span><h2>{status==='over'?'Mais uma tentativa?':'Clara Run'}</h2><p>{status==='over'?`Você fez ${score} pontos. Tente superar seu recorde!`:'Espaço, ↑ ou toque para pular. Desvie dos cactos!'}</p><button onClick={reset}>{status==='over'?<RotateCcw size={16}/>:<Play size={16}/>} {status==='over'?'Jogar novamente':'Começar jogo'}</button></div></div>}
   </div>
   <div className="dino-bottom"><span>ESPAÇO / ↑ / TOQUE PARA PULAR</span><button onClick={jump}>{status==='playing'?'↑ PULAR':'▶ JOGAR'}</button><button onClick={reset}><RotateCcw size={15}/> REINICIAR</button></div>
  </section>
  <p className="dino-footnote">Inspirado na mecânica do jogo do dinossauro do navegador, com uma protagonista pixelada exclusiva.</p>
 </main>;
}