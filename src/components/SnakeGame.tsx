import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowDown, ArrowRight, ArrowUp, RotateCcw, Play, Pause } from 'lucide-react';

type Point = { x: number; y: number };
type Direction = 'up' | 'down' | 'left' | 'right';
const SIZE = 16;
const START: Point[] = [{x:7,y:8},{x:6,y:8},{x:5,y:8}];
const VECTORS: Record<Direction,Point> = {up:{x:0,y:-1},down:{x:0,y:1},left:{x:-1,y:0},right:{x:1,y:0}};
const OPPOSITE: Record<Direction,Direction> = {up:'down',down:'up',left:'right',right:'left'};
function spawn(snake:Point[]):Point|null{
 const free:Point[]=[];
 for(let y=0;y<SIZE;y++)for(let x=0;x<SIZE;x++)if(!snake.some(p=>p.x===x&&p.y===y))free.push({x,y});
 return free.length?free[Math.floor(Math.random()*free.length)]:null;
}
export default function SnakeGame(){
 const [snake,setSnake]=useState<Point[]>(START);
 const [food,setFood]=useState<Point>({x:11,y:8});
 const [status,setStatus]=useState<'ready'|'playing'|'paused'|'over'|'won'>('ready');
 const [score,setScore]=useState(0);
 const [best,setBest]=useState(0);
 const snakeRef=useRef(snake),foodRef=useRef(food),statusRef=useRef(status),dirRef=useRef<Direction>('right'),nextRef=useRef<Direction>('right');
 const touchRef=useRef<Point|null>(null);
 useEffect(()=>{snakeRef.current=snake},[snake]);
 useEffect(()=>{foodRef.current=food},[food]);
 useEffect(()=>{statusRef.current=status},[status]);
 const reset=useCallback(()=>{snakeRef.current=START;foodRef.current={x:11,y:8};dirRef.current='right';nextRef.current='right';setSnake(START);setFood({x:11,y:8});setScore(0);setStatus('playing');statusRef.current='playing'},[]);
 const turn=useCallback((direction:Direction)=>{if(direction!==OPPOSITE[dirRef.current])nextRef.current=direction},[]);
 useEffect(()=>{
  const onKey=(e:KeyboardEvent)=>{const d:Record<string,Direction>={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',w:'up',s:'down',a:'left',d:'right'};
   if(d[e.key]){e.preventDefault();turn(d[e.key]);if(statusRef.current==='ready')reset()}
   if(e.code==='Space'){e.preventDefault();setStatus(v=>v==='playing'?'paused':v==='paused'?'playing':v)}
  };
  window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey);
 },[turn,reset]);
 useEffect(()=>{
  if(status!=='playing')return;
  const timer=window.setInterval(()=>{
   dirRef.current=nextRef.current;
   const v=VECTORS[dirRef.current],current=snakeRef.current;
   const head={x:current[0].x+v.x,y:current[0].y+v.y};
   const eating=head.x===foodRef.current.x&&head.y===foodRef.current.y;
   const body=eating?current:current.slice(0,-1);
   if(head.x<0||head.x>=SIZE||head.y<0||head.y>=SIZE||body.some(p=>p.x===head.x&&p.y===head.y)){setStatus('over');return}
   const updated=[head,...(eating?current:current.slice(0,-1))];
   snakeRef.current=updated;setSnake(updated);
   if(eating){setScore(v=>{const n=v+10;setBest(b=>Math.max(b,n));return n});const next=spawn(updated);if(next){foodRef.current=next;setFood(next)}else setStatus('won')}
  },135);
  return()=>window.clearInterval(timer);
 },[status]);
 const cells=Array.from({length:SIZE*SIZE},(_,i)=>{const x=i%SIZE,y=Math.floor(i/SIZE);const index=snake.findIndex(p=>p.x===x&&p.y===y);return {key:i,head:index===0,body:index>0,food:food.x===x&&food.y===y}});
 return <main className="wrap snake-page">
  <Link to="/" className="snake-back"><ArrowLeft size={17}/> Voltar ao portfólio</Link>
  <div className="snake-intro"><p className="kicker">UM INTERVALO DIVERTIDO</p><h1>Em construção.<br/><em>Mas já dá para jogar.</em></h1><p>Enquanto novos capítulos dessa trajetória ganham forma, que tal uma partida de cobrinha? Pegue as pequenas casinhas e aumente sua pontuação.</p></div>
  <div className="snake-layout"><section className="snake-card" aria-label="Jogo da cobrinha">
   <div className="snake-score"><span>PONTOS <strong>{score}</strong></span><span>RECORDE <strong>{best}</strong></span></div>
   <div className="snake-board-wrap" onTouchStart={e=>{const t=e.touches[0];touchRef.current={x:t.clientX,y:t.clientY}}} onTouchEnd={e=>{if(!touchRef.current)return;const t=e.changedTouches[0],dx=t.clientX-touchRef.current.x,dy=t.clientY-touchRef.current.y;touchRef.current=null;if(Math.max(Math.abs(dx),Math.abs(dy))<25)return;turn(Math.abs(dx)>Math.abs(dy)?dx>0?'right':'left':dy>0?'down':'up')}}>
    <div className="snake-board">{cells.map(c=><div key={c.key} className={'snake-cell'+(c.head?' snake-head':c.body?' snake-body':c.food?' snake-food':'')}>{c.food?'⌂':''}</div>)}</div>
    {status!=='playing'&&<div className="snake-overlay"><strong>{status==='ready'?'Pronta para jogar?':status==='paused'?'Jogo pausado':status==='won'?'Você venceu!':'Fim de jogo'}</strong><p>{status==='over'?'Tente de novo e supere sua pontuação.':'Use as setas, WASD ou deslize o dedo.'}</p><button onClick={status==='paused'?()=>setStatus('playing'):reset}>{status==='paused'?<Play size={16}/>:<RotateCcw size={16}/>} {status==='paused'?'Continuar':'Jogar'}</button></div>}
   </div>
   <div className="snake-actions"><button onClick={status==='playing'?()=>setStatus('paused'):status==='paused'?()=>setStatus('playing'):reset}>{status==='playing'?<Pause size={17}/>:<Play size={17}/>} {status==='playing'?'Pausar':status==='paused'?'Continuar':'Começar'}</button><button onClick={reset}><RotateCcw size={17}/> Reiniciar</button></div>
  </section><aside className="snake-instructions"><span className="snake-tag">MINIGAME</span><h2>Uma pausa entre projetos.</h2><p>O portfólio está sempre evoluindo. Por enquanto, divirta-se com este pequeno jogo.</p><div className="snake-controls"><button aria-label="Cima" onClick={()=>turn('up')}><ArrowUp/></button><div><button aria-label="Esquerda" onClick={()=>turn('left')}><ArrowLeft/></button><button aria-label="Baixo" onClick={()=>turn('down')}><ArrowDown/></button><button aria-label="Direita" onClick={()=>turn('right')}><ArrowRight/></button></div></div><small>Teclado: setas ou WASD. No celular: deslize sobre o tabuleiro ou use os botões.</small></aside></div>
 </main>;
}
