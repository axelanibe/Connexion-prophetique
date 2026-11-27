((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_1",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={AW:function AW(){},Ne:function Ne(d){this.$ti=d},aIp:function aIp(d){this.a=d},aIq:function aIq(d,e){this.a=d
this.b=e},
buT(d){var x
B.bdA()
if(d.length===0)return
x=A.bk(new B.be6(d))
self.window.addEventListener("beforeunload",x)
$.bke=new B.be5(x)},
bdA(){var x=$.bke
if(x!=null)x.$0()
$.bke=null},
be6:function be6(d){this.a=d},
be5:function be5(d){this.a=d},
ajg(d){var x,w,v=new B.ajh(),u=J.a3(d),t=u.h(d,"id")
t=J.D(t==null?"":t)
x=u.h(d,"conversation_id")
J.D(x==null?"":x)
x=u.h(d,"appelant_id")
x=J.D(x==null?"":x)
w=u.h(d,"appelant_nom")
J.D(w==null?"":w)
A.aU(u.h(d,"appele_id"))
A.aU(u.h(d,"appele_nom"))
w=u.h(d,"type")
J.D(w==null?"audio":w)
w=u.h(d,"statut")
w=J.D(w==null?"sonne":w)
v.$1(u.h(d,"cree_le"))
v.$1(u.h(d,"repondu_le"))
return new B.ajf(t,x,w)},
biZ(d){var x,w,v,u=J.a3(d),t=u.h(d,"contenu"),s=u.h(d,"id")
s=J.D(s==null?"":s)
x=u.h(d,"appel_id")
J.D(x==null?"":x)
x=u.h(d,"emetteur_id")
x=J.D(x==null?"":x)
w=u.h(d,"type")
w=J.D(w==null?"":w)
if(y.P.b(t))v=t
else v=y.f.b(t)?J.kF(t,y.N,y.z):C.bm
if(u.h(d,"cree_le")!=null)A.d0(J.D(u.h(d,"cree_le")))
return new B.DB(s,x,w,v)},
bBD(d){var x,w,v,u,t,s,r=J.a3(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return D.QZ
x=A.a([],y.t)
for(r=J.ak(q),w=y.f,v=y.P,u=y.N,t=y.z;r.v();){s=r.gJ(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.kF(s,u,t))}return new B.Xn(x)},
bvC(d){var x=J.a3(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.qL(v)
if(!x.k(v,"offer")&&!x.k(v,"answer"))return null
return new A.ac2(w,v)},
bOh(d){var x,w,v=J.a3(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.ac5(u,A.n2(w)?w:null,v)},
ajf:function ajf(d,e,f){this.a=d
this.c=e
this.w=f},
ajh:function ajh(){},
DB:function DB(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
Xn:function Xn(d){this.a=d},
ahk(d){return B.bP2(d)},
bP2(d){var x=0,w=A.i(y.y),v
var $async$ahk=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:v=!0
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$ahk,w)},
bob(d,e,f,g,h,i,j,k,l,m){return new B.rn(f,m,h,l,i,d,j,k,e,g,null)},
bso(d,e,f,g,h,i,j,k,l,m,n){return new B.a6R(e,g,f,d,n,k,j,i,h,l,m,null)},
btZ(d,e){var x=null
return new A.af(D.nX,A.n(d.toUpperCase(),x,2,C.M,x,A.cl(x,x,C.f,x,x,x,x,x,"Cinzel",x,x,e,x,x,C.O,x,x,!0,x,1.2,x,x,x,x,x,x),C.aq,x,x),x)},
rn:function rn(d,e,f,g,h,i,j,k,l,m,n){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.w=i
_.x=j
_.y=k
_.z=l
_.as=m
_.a=n},
Q7:function Q7(d,e){var _=this
_.e=_.d=$
_.f=d
_.r=""
_.w=null
_.ax=_.at=_.as=_.Q=_.z=_.y=_.x=!1
_.ay=!0
_.ch=null
_.CW=e
_.dy=_.dx=_.db=_.cy=_.cx=null
_.fr=$
_.fx=!1
_.fy=null
_.id=_.go=!1
_.c=_.a=null},
aSd:function aSd(d){this.a=d},
aSc:function aSc(){},
aS_:function aS_(d){this.a=d},
aS0:function aS0(d){this.a=d},
aRZ:function aRZ(d){this.a=d},
aS1:function aS1(d){this.a=d},
aS2:function aS2(){},
aS3:function aS3(d){this.a=d},
aRY:function aRY(d,e){this.a=d
this.b=e},
aS4:function aS4(){},
aS5:function aS5(d){this.a=d},
aRD:function aRD(d){this.a=d},
aRG:function aRG(d){this.a=d},
aRH:function aRH(d){this.a=d},
aRI:function aRI(d){this.a=d},
aRF:function aRF(d){this.a=d},
aRJ:function aRJ(d){this.a=d},
aRK:function aRK(d){this.a=d},
aRL:function aRL(d){this.a=d},
aRE:function aRE(d,e){this.a=d
this.b=e},
aRM:function aRM(){},
aRN:function aRN(d){this.a=d},
aS7:function aS7(d){this.a=d},
aS8:function aS8(d){this.a=d},
aS9:function aS9(d){this.a=d},
aSa:function aSa(d){this.a=d},
aRX:function aRX(d){this.a=d},
aRU:function aRU(d,e){this.a=d
this.b=e},
aRV:function aRV(d){this.a=d},
aRW:function aRW(d){this.a=d},
aS6:function aS6(){},
aRz:function aRz(d,e){this.a=d
this.b=e},
aRx:function aRx(d,e){this.a=d
this.b=e},
aRy:function aRy(d,e){this.a=d
this.b=e},
aRC:function aRC(d){this.a=d},
aRw:function aRw(d){this.a=d},
aRu:function aRu(d){this.a=d},
aRv:function aRv(d,e){this.a=d
this.b=e},
aRA:function aRA(){},
aRB:function aRB(){},
aRP:function aRP(d){this.a=d},
aRQ:function aRQ(d){this.a=d},
aRR:function aRR(d){this.a=d},
aRS:function aRS(d){this.a=d},
aRO:function aRO(d){this.a=d},
aRT:function aRT(d){this.a=d},
aSb:function aSb(d){this.a=d},
a6R:function a6R(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.w=i
_.x=j
_.y=k
_.z=l
_.Q=m
_.as=n
_.a=o},
Pc:function Pc(d,e){this.c=d
this.a=e},
uj:function uj(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
FB:function FB(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
aaU:function aaU(d,e){var _=this
_.d=$
_.f2$=d
_.bO$=e
_.c=_.a=null},
b4v:function b4v(d,e){this.a=d
this.b=e},
Uz:function Uz(){},
bQV(a3,a4){var x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=null,a0="kind",a1="video",a2="packetsLost"
for(x=J.ak(a3),w=d,v=w,u=v,t=u,s=t,r=s,q=r,p=q,o=p,n=o,m=n;x.v();){l=x.gJ(x)
k=l.d
l=l.b
if(l==="codec"){l=k.h(0,"mimeType")
j=J.D(l==null?"":l)
if(C.e.bx(j,"video/"))m=C.e.ci(j,6)}else if(l==="outbound-rtp"&&J.l(k.h(0,a0),a1)){l=A.dy(k.h(0,"bytesSent"))
n=l==null?d:C.c.t(l)
l=A.dy(k.h(0,"packetsSent"))
o=l==null?d:C.c.t(l)
u=A.dy(k.h(0,"framesPerSecond"))
if(u==null)u=d
l=A.dy(k.h(0,"frameWidth"))
v=l==null?d:C.c.t(l)
l=A.dy(k.h(0,"frameHeight"))
w=l==null?d:C.c.t(l)}else if(l==="remote-inbound-rtp"&&J.l(k.h(0,a0),a1)){l=A.dy(k.h(0,a2))
p=l==null?d:C.c.t(l)
r=A.dy(k.h(0,"jitter"))
if(r==null)r=d
i=A.dy(k.h(0,"roundTripTime"))
if(i==null)i=d
if(i!=null)t=i*1000}else if(l==="inbound-rtp"&&J.l(k.h(0,a0),a1)){l=A.dy(k.h(0,a2))
q=l==null?d:C.c.t(l)
s=A.dy(k.h(0,"jitter"))
if(s==null)s=d}else if(l==="candidate-pair"&&J.l(k.h(0,"state"),"succeeded")){i=A.dy(k.h(0,"currentRoundTripTime"))
if(i==null)i=d
if(t==null&&i!=null)t=i*1000}}x=a4==null
l=A.dy(x?d:a4.h(0,"octetsEnvoyes"))
h=l==null?d:C.c.t(l)
l=A.dy(x?d:a4.h(0,"horodatageMs"))
g=l==null?d:C.c.t(l)
x=Date.now()
if(n!=null&&h!=null&&g!=null){f=(x-g)/1000
e=f>0&&n>=h?(n-h)*8/f/1000:d}else e=d
l=r==null?d:r*1000
return A.X(["codecVideo",m,"octetsEnvoyes",n,"paquetsEnvoyes",o,"paquetsPerdusEnvoi",p,"paquetsPerdusReception",q,"gigueEnvoiMs",l,"gigueReceptionMs",s==null?d:s*1000,"allerRetourMs",t,"debitSortantKbitS",e,"imagesParSeconde",u,"largeur",v,"hauteur",w,"horodatageMs",x],y.N,y.z)},
bv1(d){var x=new B.bes(),w=J.a3(d),v=w.h(d,"largeur")!=null&&w.h(d,"hauteur")!=null?A.z(w.h(d,"largeur"))+"x"+A.z(w.h(d,"hauteur")):null
return C.d.bz(A.a([x.$2("Codec vid\xe9o",w.h(d,"codecVideo")),x.$3("D\xe9bit sortant",w.h(d,"debitSortantKbitS")," kbit/s"),x.$2("Paquets envoy\xe9s",w.h(d,"paquetsEnvoyes")),x.$2("Paquets perdus (envoi)",w.h(d,"paquetsPerdusEnvoi")),x.$2("Paquets perdus (r\xe9ception)",w.h(d,"paquetsPerdusReception")),x.$3("Gigue (envoi)",w.h(d,"gigueEnvoiMs")," ms"),x.$3("Gigue (r\xe9ception)",w.h(d,"gigueReceptionMs")," ms"),x.$3("Aller-retour",w.h(d,"allerRetourMs")," ms"),x.$2("Images par seconde",w.h(d,"imagesParSeconde")),x.$2("R\xe9solution envoy\xe9e",v)],y.s),"\n")},
bes:function bes(){},
aHs:function aHs(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.y=_.x=!1
_.ax=_.at=_.as=_.Q=_.z=null
_.ay=!1
_.ch=null
_.CW=!1},
aHu:function aHu(d){this.a=d},
aHv:function aHv(d){this.a=d},
aHw:function aHw(d){this.a=d},
aHt:function aHt(d){this.a=d},
X7:function X7(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.y=_.x=null},
am1:function am1(d){this.a=d},
am2:function am2(d){this.a=d},
bve(d){var x=y.U,w=A.I(new A.ai(A.a(d.split(" "),y.s),new B.beT(),x),!0,x.i("q.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.m(C.d.gP(w),0).toUpperCase()
return(J.m(C.d.gP(w),0)+J.m(C.d.gaH(w),0)).toUpperCase()},
beT:function beT(){},
a_r:function a_r(){this.a=null},
aD3:function aD3(){},
mm:function mm(d,e){this.e=d
this.b=e},
az3:function az3(d){this.a=d},
az4:function az4(d){this.a=d},
bic(d){var x=new B.a_S(d)
x.ar0(d)
return x},
a_S:function a_S(d){this.d=d
this.c=null},
az0:function az0(d){this.a=d},
az1:function az1(d){this.a=d},
az2:function az2(d){this.a=d},
Kk:function Kk(){},
ayU:function ayU(){},
ayV:function ayV(){},
ayW:function ayW(d){this.a=d},
ayT:function ayT(d){this.a=d},
bGw(d,e){var x=y.N
x=new B.a1H(d,e,A.B(x,y.E),A.B(x,y.z))
x.ar9(d,e)
return x},
a1H:function a1H(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aD5:function aD5(d){this.a=d},
aD6:function aD6(d){this.a=d},
aD7:function aD7(d){this.a=d},
aD8:function aD8(d){this.a=d},
aD9:function aD9(d){this.a=d},
aDa:function aDa(d){this.a=d},
aDb:function aDb(d){this.a=d},
aDc:function aDc(d){this.a=d},
aD4:function aD4(d){this.a=d},
aDd:function aDd(d){this.a=d},
bGz(d){var x=d.headerExtensions
x=y.l.b(x)?x:new A.dt(x,A.a0(x).i("dt<1,ad>"))
x=J.eo(x,new B.aDh(),y.W)
return A.I(x,!0,x.$ti.i("aN.E"))},
bGy(d){var x,w
if("encodings" in d)x=d.encodings
else x=[]
w=A.a([],y.O)
C.d.aB(x,new B.aDg(w))
return w},
bGx(d){var x,w
if("codecs" in d)x=d.codecs
else x=[]
w=A.a([],y.B)
C.d.aB(x,new B.aDf(w))
return w},
aDh:function aDh(){},
aDg:function aDg(d){this.a=d},
aDf:function aDf(d){this.a=d},
a1J:function a1J(d){this.a=d},
aDi:function aDi(){},
biO:function biO(d){this.a=d},
bQ9(){return C.d.mf(A.a(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.bf0())!==-1},
bf0:function bf0(){},
bqB(){var x=A.a([],y.d),w=$.bqC
$.bqC=w+1
return new B.LT(w,x,D.aiN,$.aq())},
LT:function LT(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.fy$=0
_.go$=g
_.k1$=_.id$=0},
aDo:function aDo(d){this.a=d},
aDk:function aDk(d){this.a=d},
aDl:function aDl(d){this.a=d},
aDm:function aDm(d){this.a=d},
aDn:function aDn(){},
biP(d,e,f){return new B.LV(d,f,e,null)},
LV:function LV(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
LW:function LW(){this.c=this.a=null},
aDp:function aDp(){},
aDr:function aDr(d){this.a=d},
aDq:function aDq(d){this.a=d},
boJ(d,e,f,g){var x,w={}
w.a=d
x=new B.Zf(g.i("Zf<0>"))
x.aqJ(e,f,w,g)
return x},
Zf:function Zf(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
asv:function asv(d,e){this.a=d
this.b=e},
asu:function asu(d){this.a=d},
QE:function QE(d,e,f,g){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g},
aUm:function aUm(){},
a3Y:function a3Y(d){this.b=this.a=$
this.$ti=d},
a3Z:function a3Z(){},
bgZ(d,e){return B.bAV(d,e)},
bAV(d,e){var x=0,w=A.i(y.b),v,u,t,s,r,q,p
var $async$bgZ=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:if(!d.Oy("ws")&&!d.Oy("wss"))throw A.j(A.fs(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.j(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.vg(r,A.hW(null,null,null,!1,y.D))
u=new A.ag($.ar,y.cF)
p=new A.aR(u,y.V)
if(J.l(r.readyState,1))p.cB(0,q)
else if(J.l(r.readyState,2)||J.l(r.readyState,3))p.hg(new B.Et("Unexpected WebSocket state: "+A.z(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.mV(r,"open",!1,y.C).gP(0).bb(0,new B.al2(p,q),y.H)
t=y.C
s=y.H
new A.mV(r,"error",!1,t).gP(0).bb(0,new B.al3(p,q),s)
A.fo(r,"message",new B.al4(q),!1,y.m)
new A.mV(r,"close",!1,t).gP(0).bb(0,new B.al5(p,q),s)
v=u
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$bgZ,w)},
vg:function vg(d,e){this.a=d
this.b=e},
al2:function al2(d,e){this.a=d
this.b=e},
al3:function al3(d,e){this.a=d
this.b=e},
al4:function al4(d){this.a=d},
al5:function al5(d,e){this.a=d
this.b=e},
bjt(){return new B.Es("Connection Closed")},
qg:function qg(){},
DW:function DW(d){this.a=d},
A3:function A3(d){this.a=d},
Aq:function Aq(d,e){this.a=d
this.b=e},
Et:function Et(d){this.a=d},
Es:function Es(d){this.a=d},
bAr(d){var x=null,w=$.ar,v=new B.a3Y(y.Z),u=y.X,t=A.hW(x,x,x,!0,u),s=A.hW(x,x,x,!0,u)
v.a=B.boJ(new A.cz(s,A.t(s).i("cz<1>")),new A.G1(t),!0,u)
v.b=B.boJ(new A.cz(t,A.t(t).i("cz<1>")),new A.G1(s),!1,u)
v=new B.aio(new A.aR(new A.ag(w,y.d4),y.w),v)
v.aqu(d)
return v},
aio:function aio(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
ais:function ais(d){this.a=d},
aip:function aip(d){this.a=d},
aiq:function aiq(d){this.a=d},
air:function air(d,e){this.a=d
this.b=e},
ait:function ait(d){this.a=d},
afC:function afC(d,e){this.b=d
this.a=e},
a59:function a59(d){this.a=d},
bPM(d){switch(d){case"new":return D.aiA
case"checking":return D.aiB
case"connected":return D.aiD
case"completed":return D.aiC
case"failed":return D.HQ
case"disconnected":return D.aiF
case"closed":return D.HR
case"count":return D.aiE}return D.HR},
bPN(d){switch(d){case"new":return D.HS
case"gathering":return D.aiG
case"complete":return D.aiH}return D.HS},
bR5(d){switch(d){case"stable":return D.aiI
case"have-local-offer":return D.aiJ
case"have-local-pranswer":return D.aiL
case"have-remote-offer":return D.aiK
case"have-remote-pranswer":return D.aiM
case"closed":return D.I0}return D.I0},
bQN(d){switch(d){case"new":return D.HV
case"connecting":return D.HW
case"connected":return D.HX
case"closed":return D.pP
case"disconnected":return D.HU
case"failed":return D.HT}return D.pP},
bvR(d){if(d==null)return null
return $.bRr.h(0,d)},
tC:function tC(d,e){this.a=d
this.b=e},
LP:function LP(d,e){this.a=d
this.b=e},
tA:function tA(d,e){this.a=d
this.b=e},
lk:function lk(d,e){this.a=d
this.b=e},
a1K:function a1K(d,e){this.a=d
this.b=e},
tB:function tB(d,e){this.a=d
this.b=e},
aD2:function aD2(){},
Kl:function Kl(){},
Cb:function Cb(){},
ayS:function ayS(){},
CS:function CS(d,e,f){this.a=d
this.b=e
this.c=f},
LQ:function LQ(){},
biN:function biN(){},
a1I:function a1I(){},
CT:function CT(d,e,f,g,h,i,j,k,l,m,n){var _=this
_.a=d
_.b=e
_.c=f
_.d=g
_.e=h
_.f=i
_.r=j
_.w=k
_.x=l
_.y=m
_.z=n},
CR:function CR(){},
aDe:function aDe(d){this.d=d},
LR:function LR(){},
aDj:function aDj(){},
xP:function xP(d,e){this.a=d
this.b=e},
NA:function NA(d,e){this.b=d
this.d=e},
LS:function LS(d,e){this.b=d
this.c=e},
LU:function LU(d,e,f){this.a=d
this.b=e
this.c=f},
bku(){var x=0,w=A.i(y.H),v
var $async$bku=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:x=1
break
case 1:return A.f(v,w)}})
return A.h($async$bku,w)},
bhO(d){var x=0,w=A.i(y.y)
var $async$bhO=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.j("The is not a video track => "+d.j(0))
throw A.j("You need to specify the deviceId")
return A.f(null,w)}})
return A.h($async$bhO,w)},
a09(d){var x=0,w=A.i(y.H),v
var $async$a09=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.c(B.aMj("enableSpeakerphone",A.X(["enable",d],y.N,v),v,v),$async$a09)
case 2:return A.f(null,w)}})
return A.h($async$a09,w)},
aAu(d,e){var x=0,w=A.i(y.H),v,u,t
var $async$aAu=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:t=e.d
x=t.kind==="audio"?3:4
break
case 3:u=J.kF(y.f.a(A.zz(t.getConstraints())),y.N,y.z)
u.n(0,"volume",d)
x=5
return A.c(e.Mb(0,u),$async$aAu)
case 5:case 4:v=A.cU(null,y.H)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$aAu,w)},
aMj(d,e,f,g){return B.bJH(d,e,f,g,f.i("0?"))},
bJH(d,e,f,g,h){var x=0,w=A.i(h),v
var $async$aMj=A.d(function(i,j){if(i===1)return A.e(j,w)
while(true)switch(x){case 0:x=3
return A.c(B.aMi(),$async$aMj)
case 3:v=D.DA.cj(d,e,!1,f)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$aMj,w)},
aMi(){var x=0,w=A.i(y.H),v,u
var $async$aMi=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:x=!$.bsd?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.c(D.DA.cj("initialize",A.X(["options",A.B(v,u)],v,u),!1,y.H),$async$aMi)
case 4:$.bsd=!0
case 3:return A.f(null,w)}})
return A.h($async$aMi,w)}},D
J=c[1]
A=c[0]
C=c[2]
B=a.updateHolder(c[6],B)
D=c[8]
B.AW.prototype={
E(d,e){this.a.E(0,e)},
df(d,e){this.a.df(d,e)},
ap(d){return this.a.ap(0)},
$idx:1}
B.Ne.prototype={
j4(d){var x=A.bP("subscription"),w=A.hW(new B.aIp(x),null,null,!0,this.$ti.y[1])
x.b=d.h7(new B.aIq(this,w),w.gnQ(w),w.gp5())
return new A.cz(w,A.t(w).i("cz<1>"))}}
B.ajf.prototype={}
B.DB.prototype={}
B.Xn.prototype={}
B.rn.prototype={
S(){return new B.Q7(A.aQ(y.N),C.z)}}
B.Q7.prototype={
a8(){var x,w,v,u,t,s,r,q,p,o=this,n=null
o.an()
x=o.a
o.r=x.c
x=x.x
if(x==null)x=new B.aHs(B.bqB(),B.bqB())
o.d!==$&&A.az()
o.d=x
w=o.a
v=w.y
if(v==null)v=new B.X7(new A.di(n,n,y.g),new A.di(n,n,y.n))
o.e!==$&&A.az()
o.e=v
x.ch=new B.aSd(o)
o.fx=!0
u=new B.a_r()
o.fr!==$&&A.az()
o.fr=u
t=w.x
if(t!=null){s=$.i4()
r=s.a
q=r.length!==0&&s.as===t&&r===w.c&&s.w}else q=!1
t=$.i4()
s=o.r
r=w.e
p=w.d
t.aUo(s,r,x,v,w.f,p)
x=o.a
if(x.as)t.ax=!0
if(q){o.L4()
return}if(x.f)u.pB("assets/audio/tonalite-appel.wav")
o.oI()},
m(){var x=this,w=x.cx
if(w!=null)w.a5(0)
w=x.cy
if(w!=null)w.a5(0)
w=x.db
if(w!=null)w.a5(0)
w=x.dx
if(w!=null)w.a5(0)
w=x.dy
if(w!=null)w.a5(0)
w=x.fr
w===$&&A.b()
w.eI()
if(x.fx)w.jg()
w=$.i4()
if(!(w.r&&w.a===x.r&&!x.y)){B.bdA()
w=x.d
w===$&&A.b()
w.jg()
w=x.e
w===$&&A.b()
w.EK()}x.ao()},
L4(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l
var $async$L4=A.d(function(d,e){if(d===1){t=e
x=u}while(true)$async$outer:switch(x){case 0:s.a.toString
o=$.b9()
s.w=o.gFR()
o=$.i4()
s.Q=o.x
s.as=o.y
s.ay=o.Q
s.x=o.e
o=o.f
s.ch=o
if(o!=null){o=Date.now()
n=s.ch
n.toString
s.CW=new A.b_(o,0,!1).f_(n)}B.buT(s.r)
u=4
s.a.toString
o=$.b9()
x=7
return A.c(o.e1("/messagerie/appels/"+s.r+"/signaux"),$async$L4)
case 7:r=e
for(o=J.ak(r),n=s.f;o.v();){q=o.gJ(o)
p=B.biZ(q)
n.E(0,p.a)
if(p.d==="termine"||p.d==="refuse"||p.d==="annule"){s.ko(A.u("Appel termin\xe9"))
x=1
break $async$outer}}u=2
x=6
break
case 4:u=3
l=t
x=6
break
case 3:x=2
break
case 6:o=s.c!=null
if(!o||s.y){x=1
break}n=s.d
n===$&&A.b()
n.f=new B.aS_(s)
n.r=new B.aS0(s)
n.w=new B.aS1(s)
s.z=!0
if(o)s.u(new B.aS2())
s.db=A.lv(C.cT,new B.aS3(s))
o=s.e
o===$&&A.b()
n=o.r
s.dx=new A.cf(n,A.t(n).i("cf<1>")).dw(s.gaaT())
o=o.w
s.dy=new A.cf(o,A.t(o).i("cf<1>")).dw(new B.aS4())
s.cx=A.lv(C.ec,new B.aS5(s))
s.tK()
case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$L4,w)},
awK(){var x=this.cy
if(x!=null)x.a5(0)
this.cy=A.cI(C.ed,new B.aRD(this))},
oI(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$oI=A.d(function(d,a0){if(d===1){t=a0
x=u}while(true)switch(x){case 0:f="appel"
u=4
r=null
j=s.a
i=j.z
x=i!=null?7:9
break
case 7:x=10
return A.c(i,$async$oI)
case 10:r=a0
j=s.r=B.ajg(r).a
x=8
break
case 9:i=$.b9()
x=11
return A.c(i.yP(j.c),$async$oI)
case 11:r=a0
j=s.r=s.a.c
case 8:i=$.i4()
i.aUa(j)
B.buT(s.r)
if(s.a.f)i.N6()
q=B.ajg(r)
if(s.c==null){x=1
break}j=q.w
if(j==="termine"||j==="expire"){s.ko(A.u("Appel termin\xe9"))
x=1
break}s.a.toString
j=$.b9()
s.w=j.gFR()
f="ice"
s.a.toString
j=$.b9()
p=j.ND()
o=s.Cu()
x=12
return A.c(p,$async$oI)
case 12:n=a0
m=B.bBD(n)
x=15
return A.c(o,$async$oI)
case 15:x=!a0?13:14
break
case 13:if(s.c==null){x=1
break}s.u(new B.aRG(s))
x=16
return A.c(A.ig(C.ik,null,y.z),$async$oI)
case 16:if(s.c==null){x=1
break}s.ko(null)
x=1
break
case 14:s.awK()
f="webrtc"
j=s.d
j===$&&A.b()
h=s.a.d==="video"||s.at
x=17
return A.c(j.rH(A.X(["iceServers",m.a],y.N,y.z),h),$async$oI)
case 17:j.f=new B.aRH(s)
j.r=new B.aRI(s)
j.w=new B.aRJ(s)
if(s.c==null){x=1
break}s.u(new B.aRK(s))
i.aZs()
s.db=A.lv(C.cT,new B.aRL(s))
j=s.e
j===$&&A.b()
i=j.r
s.dx=new A.cf(i,A.t(i).i("cf<1>")).dw(s.gaaT())
i=j.w
s.dy=new A.cf(i,A.t(i).i("cf<1>")).dw(new B.aRM())
s.a.toString
i=$.b9()
l=i.b
if(l!=null&&J.aA(l)!==0){s.a.toString
$.b9()
j.ML(C.e.a_7("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws",l)}s.cx=A.lv(C.ec,new B.aRN(s))
s.tK()
u=2
x=6
break
case 4:u=3
e=t
k=A.aa(e)
if(s.c==null){x=1
break}A.ov().$1("Appel : \xe9chec \xe0 l\u2019\xe9tape "+A.z(f)+" : "+A.al9(A.z(k)))
j=s.c
j.toString
i=k instanceof A.ff?k.a:s.aFB(f)
j.N(y.q).f.aM(A.bx(null,null,null,null,null,C.n,null,A.n(i,null,null,null,null,null,null,null,null),null,C.A,null,null,null,null,null,null,null,null,null))
s.ko(null)
x=6
break
case 3:x=2
break
case 6:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$oI,w)},
aFB(d){if(d==="ice")return A.u("Configuration d\u2019appel indisponible. V\xe9rifie ta connexion, puis r\xe9essaie.")
if(d==="webrtc")return A.u("Ce navigateur ne peut pas d\xe9marrer l\u2019appel. Essaie depuis l\u2019application.")
return A.u("Appel introuvable ou d\xe9j\xe0 termin\xe9.")},
Cu(){var x=0,w=A.i(y.y),v,u=2,t,s=this,r,q,p
var $async$Cu=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
x=7
return A.c(s.Sf(),$async$Cu)
case 7:if(!e){v=!1
x=1
break}r=s.d
r===$&&A.b()
x=8
return A.c(r.zI(s.a.d==="video"||s.at),$async$Cu)
case 8:v=!0
x=1
break
u=2
x=6
break
case 4:u=3
p=t
v=!1
x=1
break
x=6
break
case 3:x=2
break
case 6:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$Cu,w)},
Sf(){var x=0,w=A.i(y.y),v,u=this
var $async$Sf=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:v=B.ahk(u.a.d==="video"||u.at)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$Sf,w)},
tK(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$tK=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.y){x=1
break}u=4
s.a.toString
p=$.b9()
x=7
return A.c(p.e1("/messagerie/appels/"+s.r+"/signaux"),$async$tK)
case 7:r=e
for(p=J.ak(r);p.v();){q=p.gJ(p)
s.aaU(B.biZ(q))}u=2
x=6
break
case 4:u=3
n=t
x=6
break
case 3:x=2
break
case 6:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$tK,w)},
aaU(d){var x,w,v,u,t=this
if(t.c==null||t.y)return
x=t.f
w=d.a
if(x.p(0,w))return
x.E(0,w)
x=t.w
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(t.a.f)return
t.CU(d)
break
case"reponse":if(!t.a.f)return
v=B.bvC(d.e)
if(v==null)return
x=t.d
x===$&&A.b()
x.Ma(A.X(["sdp",v.a,"type",v.b],y.N,y.z)).bb(0,new B.aS7(t),y.a).he(new B.aS8(t))
break
case"candidat_ice":u=B.bOh(d.e)
if(u==null)return
x=t.d
x===$&&A.b()
x.M2(A.X(["candidate",u.a,"sdpMid",u.c,"sdpMLineIndex",u.b],y.N,y.z))
break
case"accepte":if(!t.a.f||t.x)return
x=t.d
x===$&&A.b()
x.yq().bb(0,new B.aS9(t),y.a).he(new B.aSa(t))
break
case"refuse":t.ko(A.u("Appel refus\xe9"))
break
case"annule":t.ko(A.u("Appel annul\xe9"))
break
case"termine":t.ko(A.u("Appel termin\xe9"))
break}},
CU(d){return this.aL_(d)},
aL_(d){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$CU=A.d(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:o=B.bvC(d.e)
if(o==null){x=1
break}x=!(s.a.d==="video"||s.at)&&C.e.p(o.a,"m=video")?3:4
break
case 3:q=s.d
q===$&&A.b()
x=5
return A.c(q.p6(),$async$CU)
case 5:if(f&&s.c!=null&&!s.y){s.u(new B.aRX(s))
$.i4().agl("video")}case 4:u=7
q=s.d
q===$&&A.b()
x=10
return A.c(q.yr(A.X(["sdp",o.a,"type",o.b],y.N,y.z)),$async$CU)
case 10:r=f
if(s.c==null||s.y){x=1
break}s.KI()
s.Tc("reponse",r)
u=2
x=9
break
case 7:u=6
n=t
s.ko(A.u("L\u2019appel n\u2019a pas pu aboutir."))
x=9
break
case 6:x=2
break
case 9:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$CU,w)},
KI(){var x=0,w=A.i(y.H),v,u=this,t,s
var $async$KI=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:if(u.x){x=1
break}t=u.cy
if(t!=null)t.a5(0)
t=u.fr
t===$&&A.b()
t.eI()
u.u(new B.aRU(u,!1))
t=$.i4()
t.b04()
s=u.Q
t.Zk(u.as,s)
B.bku()
case 1:return A.f(v,w)}})
return A.h($async$KI,w)},
tH(d,e,f){return this.ay3(d,e,f)},
Tc(d,e){return this.tH(d,e,!0)},
ay3(d,e,f){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q
var $async$tH=A.d(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
t.a.toString
s=$.b9()
x=6
return A.c(s.aew(t.r,e,d),$async$tH)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(f&&t.c!=null&&!t.y)t.ko(A.u("L\u2019appel n\u2019a pas pu aboutir."))
x=5
break
case 2:x=1
break
case 5:return A.f(null,w)
case 1:return A.e(u,w)}})
return A.h($async$tH,w)},
CN(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o
var $async$CN=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
r=s.cy
if(r!=null)r.a5(0)
r=s.fr
r===$&&A.b()
r.eI()
u=4
r=s.r
x=r.length!==0?7:8
break
case 7:s.a.toString
q=$.b9()
x=9
return A.c(q.EZ(r,"termine"),$async$CN)
case 9:case 8:u=2
x=6
break
case 4:u=3
o=t
x=6
break
case 3:x=2
break
case 6:B.bdA()
$.i4().GN()
r=s.c
if(r!=null)A.aw(r,!1).cP()
case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$CN,w)},
a8S(){var x=this
if(!x.x||x.y)return
$.i4().b1p()
x.u(new B.aRV(x))
$.ax.aI$.push(new B.aRW(x))},
ko(d){var x,w,v=this,u=null
if(v.y)return
v.y=!0
x=v.cy
if(x!=null)x.a5(0)
x=v.fr
x===$&&A.b()
x.eI()
x=v.r
if(x.length!==0){v.a.toString
w=$.b9()
w.EZ(x,"termine").he(new B.aS6())}if(d!=null&&v.c!=null)v.c.N(y.q).f.aM(A.bx(u,u,u,u,u,C.n,u,A.n(d,u,u,u,u,u,u,u,u),u,C.A,u,u,u,u,u,u,u,u,u))
B.bdA()
$.i4().GN()
x=v.c
if(x!=null)A.aw(x,!1).cP()},
ID(){var x=0,w=A.i(y.H),v=this,u,t
var $async$ID=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.b()
x=2
return A.c(t.Rj(u),$async$ID)
case 2:if(v.c!=null)v.u(new B.aRz(v,u))
$.i4().Zk(v.as,u)
return A.f(null,w)}})
return A.h($async$ID,w)},
IC(){var x=0,w=A.i(y.H),v=this,u,t
var $async$IC=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:v.ax=!1
x=2
return A.c(v.Iv(!v.as),$async$IC)
case 2:u=$.i4()
t=v.Q
u.Zk(v.as,t)
return A.f(null,w)}})
return A.h($async$IC,w)},
Iv(d){return this.asp(d)},
asp(d){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q,p,o
var $async$Iv=A.d(function(e,f){if(e===1){u=f
x=v}while(true)switch(x){case 0:v=3
r=t.d
r===$&&A.b()
x=6
return A.c(r.AG(d),$async$Iv)
case 6:v=1
x=5
break
case 3:v=2
o=u
s=A.aa(o)
A.ov().$1("Appel : haut-parleur impossible : "+A.al9(A.z(s)))
x=5
break
case 2:x=1
break
case 5:r=t.d
r===$&&A.b()
p=r.CW
if(t.c!=null&&p!==t.as)t.u(new B.aRx(t,p))
return A.f(null,w)
case 1:return A.e(u,w)}})
return A.h($async$Iv,w)},
IB(){var x=0,w=A.i(y.H),v=this,u,t
var $async$IB=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:u=!v.ay
t=v.d
t===$&&A.b()
x=2
return A.c(t.Rg(u),$async$IB)
case 2:if(v.c!=null)v.u(new B.aRy(v,u))
$.i4().aZC(u)
return A.f(null,w)}})
return A.h($async$IB,w)},
Bg(){var x=0,w=A.i(y.H),v=this,u
var $async$Bg=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:u=v.d
u===$&&A.b()
x=2
return A.c(u.Mg(),$async$Bg)
case 2:return A.f(null,w)}})
return A.h($async$Bg,w)},
aaj(){var x,w=this,v="Appel en cours\u2026",u=w.fy
if(u!=null)return u
$.i4()
if(w.x){u=A.u(v)
x=C.b.aF(w.CW.a,1e6)
return u+" "+(C.e.cV(C.b.j(C.b.aF(x,60)),2,"0")+":"+C.e.cV(C.b.j(C.b.ar(x,60)),2,"0"))}if(w.z)return w.a.f?A.u("\xc7a sonne\u2026"):A.u(v)
return A.u("Connexion\u2026")},
IE(){var x=0,w=A.i(y.H),v,u=this,t,s,r
var $async$IE=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:if(u.a.d==="video"||u.at||u.y){x=1
break}if(!u.x){t=u.c
t.toString
s=A.u("D\xe9croche d\u2019abord pour passer en vid\xe9o.")
t.N(y.q).f.aM(A.bx(null,null,null,null,null,C.n,null,A.n(s,null,null,null,null,null,null,null,null),null,C.A,null,null,null,null,null,null,null,null,null))
x=1
break}t=u.d
t===$&&A.b()
x=3
return A.c(t.DC(),$async$IE)
case 3:r=e
if(r==null){t=u.c
if(t!=null){s=A.u("La cam\xe9ra n\u2019a pas pu s\u2019ouvrir.")
t.N(y.q).f.aM(A.bx(null,null,null,null,null,C.n,null,A.n(s,null,null,null,null,null,null,null,null),null,C.A,null,null,null,null,null,null,null,null,null))}x=1
break}if(u.c==null||u.y){x=1
break}u.u(new B.aRC(u))
$.i4().agl("video")
u.Tc("offre",r)
case 1:return A.f(v,w)}})
return A.h($async$IE,w)},
B7(){var x=0,w=A.i(y.H),v,u=this,t,s,r
var $async$B7=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:if(u.y||u.c==null){x=1
break}t=u.d
t===$&&A.b()
x=3
return A.c(t.I4(),$async$B7)
case 3:s=e
if(u.c==null||u.y){x=1
break}r=J.dE(s)?A.u("Statistiques indisponibles pour cet appel."):B.bv1(s)
t=u.c
t.toString
x=4
return A.c(A.fH(null,null,!0,null,new B.aRw(r),t,null,!0,y.H),$async$B7)
case 4:case 1:return A.f(v,w)}})
return A.h($async$B7,w)},
Bi(){var x=0,w=A.i(y.H),v,u=this,t,s
var $async$Bi=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:if(!(u.a.d==="video"||u.at)||u.y){x=1
break}t=u.d
t===$&&A.b()
x=t.ay?3:4
break
case 3:x=5
return A.c(t.y0(),$async$Bi)
case 5:if(u.c!=null)u.u(new B.aRA())
x=1
break
case 4:x=6
return A.c(t.vu(),$async$Bi)
case 6:if(!e){t=u.c
if(t!=null){s=A.u("Le partage d\u2019\xe9cran n\u2019est pas disponible sur cet appareil.")
t.N(y.q).f.aM(A.bx(null,null,null,null,null,C.n,null,A.n(s,null,null,null,null,null,null,null,null),null,C.A,null,null,null,null,null,null,null,null,null))}x=1
break}if(u.c!=null)u.u(new B.aRB())
case 1:return A.f(v,w)}})
return A.h($async$Bi,w)},
aHt(){var x,w,v=this,u=null,t=A.a([],y.p)
if(v.a.d==="video"||v.at){t.push(A.bA(!1,u,u,u,!0,u,!0,!1,D.Xh,u,new B.aRP(v),!1,u,u,u,u,u,A.n(A.u("Basculer"),u,u,u,u,C.cO,u,u,u),u,u))
x=v.d
x===$&&A.b()
x=x.ay
w=A.cc(x?D.V9:D.V4,C.f,u,u)
t.push(A.bA(!1,u,u,u,!0,u,!0,!1,w,u,new B.aRQ(v),!1,u,u,u,u,u,A.n(x?A.u("Arr\xeater le partage"):A.u("Partager l\u2019\xe9cran"),u,u,u,u,C.cO,u,u,u),u,u))}if(v.x){t.push(A.bA(!1,u,u,u,!0,u,!0,!1,D.Xd,u,new B.aRR(v),!1,u,u,u,u,u,A.n(A.u("Statistiques"),u,u,u,u,C.cO,u,u,u),u,u))
t.push(A.bA(!1,u,u,u,!0,u,!0,!1,D.X7,u,new B.aRS(v),!1,u,u,u,u,u,A.n(A.u("R\xe9duire"),u,u,u,u,C.cO,u,u,u),u,u))}if(t.length===0)return
x=v.c
x.toString
A.eW(D.nh,new B.aRT(t),x,!1,u,y.H)},
C(d){var x,w,v,u,t,s,r,q=this,p=null,o=q.d
o===$&&A.b()
x=o.c
x=x==null?p:x.oy(0).length!==0
w=q.id
v=q.a
if((v.d==="video"||q.at)&&q.z){if(x===!0)x=A.dY(p,B.biP(o.e,!1,D.I1),C.B,!1,p,q.ga2O(),p,p,p,p,p,p,p,p,p,p,p,p,p,p,p,p,p,p)
else{x=v.e
v=v.r
u=q.go&&q.x
x=A.cK(A.ab(A.a([new B.FB(x,v,u,56,p),C.K,B.btZ(x,22),C.F,A.n(q.aaj(),p,p,p,p,D.qN,p,p,p)],y.p),C.m,C.i,C.J),p,p)}o=A.a([A.a17(0,x),A.hz(p,A.Xb(A.a7(12),B.biP(o.d,!0,D.I1),C.bn),160,p,p,16,16,110),A.hz(p,A.bb(A.cg(!1,D.Xg,C.h,p,C.u,p,p,p,p,q.ga2O(),p,A.cL(C.QR,p,C.V,C.cQ,p)),36,36),p,p,p,20,20,p)],y.p)
if(q.x)o.push(A.hz(p,new B.Pc(q.ga8R(),p),p,p,16,p,16,p))
x=q.Q
v=q.as
o.push(A.hz(24,B.bso(q.ay,!0,v,x,q.ga2R(),q.ga2N(),q.ga2P(),q.ga2Q(),q.ga80(),q.ga8y(),!0),p,p,0,0,p,p))
o=A.eN(C.bi,o,C.n,C.b_,p)}else{x=y.p
v=A.a([],x)
if(q.go)v.push(A.hz(p,A.xd(B.biP(o.e,!1,D.pR),0),1,p,0,p,0,1))
if(q.x)v.push(A.hz(p,new B.Pc(q.ga8R(),p),p,p,16,p,16,p))
o=B.btZ(q.a.e,24)
u=A.n(q.aaj(),p,p,p,p,D.qN,C.aq,p,p)
t=q.a
s=t.e
t=t.r
t=A.b0(A.cK(new B.FB(s,t,q.go&&q.x,88,p),p,p),1)
s=q.Q
r=q.as
v.push(A.ab(A.a([C.K,o,C.F,new A.af(D.nX,u,p),t,B.bso(q.ay,!1,r,s,q.ga2R(),q.ga2N(),q.ga2P(),q.ga2Q(),q.ga80(),q.ga8y(),q.x),C.K],x),C.m,C.i,C.k))
v=A.eN(C.bi,v,C.n,C.b_,p)
o=v}return A.aCo(w,A.eM(p,C.j,A.f1(!0,o,C.V,!0),p,p,p),new B.aSb(q),y.K)}}
B.a6R.prototype={
C(d){var x,w,v=this,u=null,t=A.a7(28),s=A.b0(new B.uj(C.w0,v.e,A.u("Haut-parleur"),v.x,u,u),1),r=v.f?D.Vc:D.Vd,q=A.u("Appel vid\xe9o")
r=A.b0(new B.uj(r,!1,q,v.c?v.y:v.z,u,u),1)
q=v.d
x=q?D.UZ:D.UY
w=y.p
q=A.aL(A.a([s,r,A.b0(new B.uj(x,q,A.u("Muet"),v.w,u,u),1)],w),C.m,C.i,C.k)
x=A.u("Plus")
return A.a8(u,A.ab(A.a([q,C.K,A.aL(A.a([A.b0(new B.uj(C.vT,!1,x,v.r?v.Q:u,u,u),1),A.b0(new B.uj(D.vM,!1,A.u("Terminer"),v.as,C.e6,u),1),D.TK],w),C.m,C.i,C.k)],w),C.m,C.i,C.J),C.h,u,u,new A.al(D.nh,u,u,t,u,u,C.r),u,u,u,D.Tf,D.Tz,u,u,u)}}
B.Pc.prototype={
C(d){var x=null
return A.ab(A.a([A.bb(A.cg(!1,D.X6,C.h,x,C.u,x,x,x,x,this.c,x,A.cL(C.no,x,C.V,C.cQ,x)),48,48),C.at,A.n(A.u("R\xe9duire"),x,x,x,x,C.apE,x,x,x)],y.p),C.m,C.i,C.J)}}
B.uj.prototype={
C(d){var x,w,v,u=this,t=null,s=u.r,r=s==null
if(r)s=u.d?C.f:C.no
if(!r)x=C.f
else x=u.d?C.j:C.f
r=u.f
w=r==null?0.4:1
v=A.cL(s,t,C.V,C.cQ,t)
return A.xd(A.ab(A.a([A.bb(A.cg(!1,A.cc(u.c,x,t,30),C.h,t,C.u,t,t,t,t,r,t,v),72,72),C.F,A.n(u.e,t,t,t,t,D.apD,C.aq,t,t)],y.p),C.m,C.i,C.J),w)}}
B.FB.prototype={
S(){return new B.aaU(null,null)}}
B.aaU.prototype={
a8(){var x,w=this
w.an()
x=A.c_(null,A.cs(0,0,w.a.e?1100:2400,0),null,1,null,w)
x.Q5(0,!0)
w.d!==$&&A.az()
w.d=x},
aQ(d){var x,w
this.b4(d)
x=this.a.e
if(d.e!==x){w=this.d
w===$&&A.b()
w.e=A.cs(0,0,x?1100:2400,0)
w.Q5(0,!0)}},
m(){var x=this.d
x===$&&A.b()
x.m()
this.apW()},
C(d){var x,w=this,v=null,u=w.a,t=u.f,s=t*2,r=s+24,q=w.d
q===$&&A.b()
x=u.d
u=x!=null?A.lZ(v,x,v,t):A.lZ(C.t,v,A.n(B.bve(u.c),v,v,v,v,A.cl(v,v,C.j,v,v,v,v,v,v,v,v,w.a.f*0.7,v,v,C.O,v,v,!0,v,v,v,v,v,v,v,v),v,v,v),t)
return A.bb(A.hH(q,new B.b4v(w,s),u),r,r)}}
B.Uz.prototype={
m(){var x=this,w=x.bO$
if(w!=null)w.O(0,x.ghS())
x.bO$=null
x.ao()},
bY(){this.d3()
this.cM()
this.hT()}}
B.aHs.prototype={
zI(d){return this.b_T(d)},
b_T(d){var x=0,w=A.i(y.H),v,u=this,t,s,r,q,p
var $async$zI=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:if(u.b!=null){x=1
break}t=u.d
x=3
return A.c(t.ie(0),$async$zI)
case 3:$.ahQ()
s=y.N
r=A.X(["echoCancellation",!0,"noiseSuppression",!0,"autoGainControl",!0],s,y.y)
if(d){q=y.S
q=A.X(["facingMode","user","width",A.X(["ideal",640],s,q),"height",A.X(["ideal",480],s,q),"frameRate",A.X(["ideal",24],s,q)],s,y.K)}else q=!1
x=4
return A.c(new B.Kk().vW(0,A.X(["audio",r,"video",q],s,y.z)),$async$zI)
case 4:p=f
u.b=p
t.sw6(0,p)
case 1:return A.f(v,w)}})
return A.h($async$zI,w)},
rH(d,e){return this.b0y(d,e)},
b0y(d,e){var x=0,w=A.i(y.H),v=this,u,t,s,r,q,p,o
var $async$rH=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:x=2
return A.c(v.e.ie(0),$async$rH)
case 2:x=v.b==null?3:4
break
case 3:x=5
return A.c(v.zI(e),$async$rH)
case 5:case 4:u=v.b
u.toString
x=6
return A.c($.ahQ().Xt(d,A.B(y.N,y.z)),$async$rH)
case 6:t=v.a=g
s=u.Av(0),r=s.length,q=0
case 7:if(!(q<s.length)){x=9
break}p=s[q]
x=10
return A.c(t.M_(0,p,u),$async$rH)
case 10:o=g
if(p.d.kind==="video")v.as=o
case 8:s.length===r||(0,A.K)(s),++q
x=7
break
case 9:x=11
return A.c(v.xj(),$async$rH)
case 11:t.e=new B.aHu(v)
t.Q=new B.aHv(v)
t.d=new B.aHw(v)
return A.f(null,w)}})
return A.h($async$rH,w)},
awE(d){var x,w,v,u=this
u.c=d
x=d.oy(0)
w=x.length!==0?C.d.gP(x).d.id:null
if(!u.x){u.x=!0
u.z=w
u.e.sw6(0,d)
u.Be()
v=u.r
if(v!=null)v.$0()}else{v=u.z
if(w!=null&&w!==v){u.z=w
u.e.sw6(0,d)
v=u.r
if(v!=null)v.$0()}}},
Be(){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q,p,o,n,m,l
var $async$Be=A.d(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:n=t.CW?0.8:1
m=t.c
m=m==null?null:m.Hj(0)
if(m==null)m=C.bG
q=m.length
p=0
case 2:if(!(p<m.length)){x=4
break}s=m[p]
v=6
x=9
return A.c(B.aAu(n,s),$async$Be)
case 9:v=1
x=8
break
case 6:v=5
l=u
r=A.aa(l)
A.ov().$1("Appel : volume distant impossible : "+A.al9(A.z(r)))
x=8
break
case 5:x=1
break
case 8:case 3:m.length===q||(0,A.K)(m),++p
x=2
break
case 4:return A.f(null,w)
case 1:return A.e(u,w)}})
return A.h($async$Be,w)},
xj(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h
var $async$xj=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:i=s.as
if(i==null){x=1
break}u=4
o=i.a.getParameters()
n=o.transactionId
if((n==null?null:n)!=null){m=o.rtcp
l=y.z
l=A.X(["cname",m.cname,"reducedSize",m.reducedSize],l,l)
l.h(0,"cname")
l.h(0,"reducedSize")}B.bGz(o)
m=B.bGy(o)
B.bGx(o)
r=new B.aDe(m)
q=r.d
if(q==null||J.aA(q)===0){x=1
break}for(m=q,l=m.length,k=0;k<l;++k){p=m[k]
p.c=5e5
p.e=24}x=7
return A.c(i.AJ(r),$async$xj)
case 7:u=2
x=6
break
case 4:u=3
h=t
x=6
break
case 3:x=2
break
case 6:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$xj,w)},
yq(){var x=0,w=A.i(y.P),v,u=this,t,s
var $async$yq=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.j(A.a1("Connexion non pr\xe9par\xe9e."))
x=3
return A.c(s.MV(0),$async$yq)
case 3:t=e
x=4
return A.c(s.AH(0,t),$async$yq)
case 4:v=A.X(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$yq,w)},
yr(d){return this.aTL(d)},
aTL(d){var x=0,w=A.i(y.P),v,u=this,t,s
var $async$yr=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.j(A.a1("Connexion non pr\xe9par\xe9e."))
x=3
return A.c(s.AK(0,new B.xP(d.h(0,"sdp"),d.h(0,"type"))),$async$yr)
case 3:x=4
return A.c(s.MS(0),$async$yr)
case 4:t=f
x=5
return A.c(s.AH(0,t),$async$yr)
case 5:v=A.X(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$yr,w)},
Ma(d){return this.aQN(d)},
aQN(d){var x=0,w=A.i(y.H),v=this,u
var $async$Ma=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.j(A.a1("Connexion non pr\xe9par\xe9e."))
x=2
return A.c(u.AK(0,new B.xP(d.h(0,"sdp"),d.h(0,"type"))),$async$Ma)
case 2:return A.f(null,w)}})
return A.h($async$Ma,w)},
M2(d){return this.aQy(d)},
aQy(d){var x=0,w=A.i(y.H),v,u=this,t
var $async$M2=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.c(t.LS(new B.CS(A.aU(d.h(0,"candidate")),A.aU(d.h(0,"sdpMid")),A.fc(d.h(0,"sdpMLineIndex")))),$async$M2)
case 3:case 1:return A.f(v,w)}})
return A.h($async$M2,w)},
Rj(d){return this.akJ(d)},
akJ(d){var x=0,w=A.i(y.H),v=this,u,t,s,r
var $async$Rj=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.Hj(0)
if(r==null)r=C.bG
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.K)(r),++s)r[s].sjH(0,t)
return A.f(null,w)}})
return A.h($async$Rj,w)},
AG(d){return this.akA(d)},
akA(d){var x=0,w=A.i(y.H),v=this
var $async$AG=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:x=2
return A.c(B.a09(d),$async$AG)
case 2:v.CW=d
x=3
return A.c(v.Be(),$async$AG)
case 3:return A.f(null,w)}})
return A.h($async$AG,w)},
Rg(d){return this.akt(d)},
akt(d){var x=0,w=A.i(y.H),v=this,u,t,s
var $async$Rg=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.oy(0)
if(s==null)s=C.bG
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.K)(s),++t)s[t].sjH(0,d)
return A.f(null,w)}})
return A.h($async$Rg,w)},
Mg(){var x=0,w=A.i(y.H),v,u=this,t,s
var $async$Mg=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.oy(0)
if(s==null)s=D.y2
if(s.length===0){x=1
break}x=3
return A.c(B.bhO(C.d.gP(s)),$async$Mg)
case 3:case 1:return A.f(v,w)}})
return A.h($async$Mg,w)},
p6(){var x=0,w=A.i(y.y),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0
var $async$p6=A.d(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:e=s.a
if(e==null||s.y){v=!1
x=1
break}m=s.b
m=m==null?null:m.oy(0).length!==0
if(m===!0){v=!0
x=1
break}r=null
u=4
$.ahQ()
m=y.N
l=y.S
x=7
return A.c(new B.Kk().vW(0,A.X(["audio",!1,"video",A.X(["facingMode","user","width",A.X(["ideal",640],m,l),"height",A.X(["ideal",480],m,l),"frameRate",A.X(["ideal",24],m,l)],m,y.K)],m,y.z)),$async$p6)
case 7:r=a2
q=J.bmn(r)
if(J.aA(q)===0){v=!1
x=1
break}p=J.k1(q)
m=s.b
if(m==null)m=null
else{m=m.e
l=p.d
m.addTrack(l)
m=A.cU(null,y.H)}x=8
return A.c(y.x.b(m)?m:A.dj(m,y.H),$async$p6)
case 8:s.d.sw6(0,s.b)
m=s.b
m.toString
x=9
return A.c(J.bzF(e,p,m),$async$p6)
case 9:o=a2
s.as=o
x=10
return A.c(s.xj(),$async$p6)
case 10:v=!0
x=1
break
u=2
x=6
break
case 4:u=3
d=t
m=r
m=m==null?null:J.bmm(m)
if(m==null)m=C.bG
l=m.length
j=y.c
i=y._
h=0
case 11:if(!(h<m.length)){x=13
break}n=m[h]
u=15
g=J.VA(n)
if(!i.b(g)){f=new A.ag($.ar,j)
f.a=8
f.c=g
g=f}x=18
return A.c(g,$async$p6)
case 18:u=3
x=17
break
case 15:u=14
a0=t
x=17
break
case 14:x=3
break
case 17:case 12:m.length===l||(0,A.K)(m),++h
x=11
break
case 13:v=!1
x=1
break
x=6
break
case 3:x=2
break
case 6:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$p6,w)},
DC(){var x=0,w=A.i(y.cO),v,u=2,t,s=this,r,q,p
var $async$DC=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:x=3
return A.c(s.p6(),$async$DC)
case 3:if(!e){v=null
x=1
break}u=5
x=8
return A.c(s.yq(),$async$DC)
case 8:r=e
v=r
x=1
break
u=2
x=7
break
case 5:u=4
p=t
v=null
x=1
break
x=7
break
case 4:x=2
break
case 7:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$DC,w)},
vu(){var x=0,w=A.i(y.y),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0,a1
var $async$vu=A.d(function(a2,a3){if(a2===1){t=a3
x=u}while(true)switch(x){case 0:if(s.a==null||s.y){v=!1
x=1
break}if(s.ay){v=!0
x=1
break}if(A.bl()===C.am){v=!1
x=1
break}r=s.as
if(r==null){v=!1
x=1
break}q=null
u=4
$.ahQ()
x=7
return A.c(new B.Kk().Ak(A.X(["video",!0,"audio",!1],y.N,y.z)),$async$vu)
case 7:q=a3
p=J.bmn(q)
if(J.aA(p)===0){v=!1
x=1
break}o=J.k1(p)
l=s.b
k=l==null?null:l.oy(0)
n=k==null?D.y2:k
s.ax=J.aA(n)!==0?J.k1(n):null
x=8
return A.c(r.Q6(o),$async$vu)
case 8:s.at=q
s.ay=!0
s.d.sw6(0,q)
x=9
return A.c(s.xj(),$async$vu)
case 9:o.c=new B.aHt(s)
v=!0
x=1
break
u=2
x=6
break
case 4:u=3
a0=t
l=q
l=l==null?null:J.bmm(l)
if(l==null)l=C.bG
i=l.length
h=y.c
g=y._
f=0
case 10:if(!(f<l.length)){x=12
break}m=l[f]
u=14
e=J.VA(m)
if(!g.b(e)){d=new A.ag($.ar,h)
d.a=8
d.c=e
e=d}x=17
return A.c(e,$async$vu)
case 17:u=3
x=16
break
case 14:u=13
a1=t
x=16
break
case 13:x=3
break
case 16:case 11:l.length===i||(0,A.K)(l),++f
x=10
break
case 12:v=!1
x=1
break
x=6
break
case 3:x=2
break
case 6:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$vu,w)},
y0(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$y0=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(!s.ay){x=1
break}o=s.ay=!1
u=4
r=s.as
q=s.ax
x=(r!=null?q!=null:o)?7:8
break
case 7:x=9
return A.c(r.Q6(q),$async$y0)
case 9:case 8:u=2
x=6
break
case 4:u=3
g=t
x=6
break
case 3:x=2
break
case 6:o=s.at
o=o==null?null:o.Av(0)
if(o==null)o=C.bG
m=o.length
l=y.c
k=y._
j=0
case 10:if(!(j<o.length)){x=12
break}p=o[j]
u=14
i=J.VA(p)
if(!k.b(i)){h=new A.ag($.ar,l)
h.a=8
h.c=i
i=h}x=17
return A.c(i,$async$y0)
case 17:u=2
x=16
break
case 14:u=13
f=t
x=16
break
case 13:x=2
break
case 16:case 11:o.length===m||(0,A.K)(o),++j
x=10
break
case 12:s.ax=s.at=null
s.d.sw6(0,s.b)
case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$y0,w)},
I4(){var x=0,w=A.i(y.P),v,u=2,t,s=this,r,q,p,o,n
var $async$I4=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:o=s.a
if(o==null||s.y){v=C.bm
x=1
break}u=4
x=7
return A.c(J.bA1(o),$async$I4)
case 7:r=e
q=B.bQV(r,s.Q)
s.Q=q
A.ov().$1("Appel : statistiques : "+B.bv1(q))
v=q
x=1
break
u=2
x=6
break
case 4:u=3
n=t
v=C.bm
x=1
break
x=6
break
case 3:x=2
break
case 6:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$I4,w)},
jg(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0
var $async$jg=A.d(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
s.ay=!1
p=s.at
p=p==null?null:p.Av(0)
if(p==null)p=C.bG
o=p.length
n=y.c
m=y._
l=0
case 3:if(!(l<p.length)){x=5
break}r=p[l]
u=7
k=J.VA(r)
if(!m.b(k)){j=new A.ag($.ar,n)
j.a=8
j.c=k
k=j}x=10
return A.c(k,$async$jg)
case 10:u=2
x=9
break
case 7:u=6
h=t
x=9
break
case 6:x=2
break
case 9:case 4:p.length===o||(0,A.K)(p),++l
x=3
break
case 5:s.ch=s.as=s.ax=s.at=null
u=12
x=15
return A.c(B.a09(!1),$async$jg)
case 15:u=2
x=14
break
case 12:u=11
g=t
x=14
break
case 11:x=2
break
case 14:u=17
p=s.a
p=p==null?null:p.ap(0)
x=20
return A.c(y.x.b(p)?p:A.dj(p,y.H),$async$jg)
case 20:u=2
x=19
break
case 17:u=16
f=t
x=19
break
case 16:x=2
break
case 19:s.a=null
p=s.b
p=p==null?null:p.Av(0)
if(p==null)p=C.bG
o=p.length
l=0
case 21:if(!(l<p.length)){x=23
break}q=p[l]
u=25
k=J.VA(q)
if(!m.b(k)){j=new A.ag($.ar,n)
j.a=8
j.c=k
k=j}x=28
return A.c(k,$async$jg)
case 28:u=2
x=27
break
case 25:u=24
e=t
x=27
break
case 24:x=2
break
case 27:case 22:p.length===o||(0,A.K)(p),++l
x=21
break
case 23:s.b=null
u=30
x=33
return A.c(s.d.m(),$async$jg)
case 33:u=2
x=32
break
case 30:u=29
d=t
x=32
break
case 29:x=2
break
case 32:u=35
x=38
return A.c(s.e.m(),$async$jg)
case 38:u=2
x=37
break
case 35:u=34
a0=t
x=37
break
case 34:x=2
break
case 37:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$jg,w)}}
B.X7.prototype={
gaSl(){return this.b!=null&&!this.e},
ML(d,e){return this.aSm(d,e)},
aSm(d,e){var x=0,w=A.i(y.H),v=this
var $async$ML=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:v.x=d
v.y=e
v.e=!1
v.f=0
x=2
return A.c(v.Bd(),$async$ML)
case 2:return A.f(null,w)}})
return A.h($async$ML,w)},
Bd(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Bd=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.e){x=1
break}r=s.x
if(r==null||J.aA(r)===0){x=1
break}u=4
q=B.bAr(B.bgZ(A.cG(r,0,null),null))
s.b=q
x=7
return A.c(q.f.a,$async$Bd)
case 7:s.f=0
p=s.y
if(p!=null&&J.aA(p)!==0)try{o=y.N
q.giV().a.E(0,C.a3.hy(A.X(["type","auth","jeton",p],o,o),null))}catch(l){}o=q.r.b
o===$&&A.b()
o=o.b
o===$&&A.b()
s.c=new A.cz(o,A.t(o).i("cz<1>")).bp(s.gaKo(),!0,s.gaJ0(),new B.am1(s))
u=2
x=6
break
case 4:u=3
m=t
s.UL()
x=6
break
case 3:x=2
break
case 6:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$Bd,w)},
aKp(d){var x,w,v,u
try{x=C.a3.ev(0,J.D(d),null)
v=y.P
if(!v.b(x))return
if(!J.l(J.m(x,"type"),"signal_appel"))return
w=J.m(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.E(0,B.biZ(w))}catch(u){}},
UL(){var x,w=this,v=w.c
if(v!=null)v.a5(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.E(0,null)
return}x=D.a4G[v]
w.f=v+1
v=w.d
if(v!=null)v.a5(0)
w.d=A.cI(A.cs(0,0,0,x),new B.am2(w))},
EK(){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q
var $async$EK=A.d(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.a5(0)
s=t.c
s=s==null?null:s.a5(0)
x=2
return A.c(y.x.b(s)?s:A.dj(s,y.H),$async$EK)
case 2:t.c=null
v=4
s=t.b
s=s==null?null:s.giV().ap(0)
x=7
return A.c(y._.b(s)?s:A.dj(s,y.z),$async$EK)
case 7:v=1
x=6
break
case 4:v=3
q=u
x=6
break
case 3:x=1
break
case 6:t.b=null
return A.f(null,w)
case 1:return A.e(u,w)}})
return A.h($async$EK,w)}}
B.a_r.prototype={
pB(d){return this.aYE(d)},
aYE(d){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q,p
var $async$pB=A.d(function(e,f){if(e===1){u=f
x=v}while(true)switch(x){case 0:v=3
r=t.a
x=6
return A.c((r==null?t.a=A.ajw():r).bd(0),$async$pB)
case 6:r=t.a
r.toString
x=7
return A.c(r.ta(A.ake(A.cG("asset:///"+d,0,null),null,null),null,!0),$async$pB)
case 7:x=8
return A.c(t.a.i3(C.Di),$async$pB)
case 8:x=9
return A.c(t.a.hr(1),$async$pB)
case 9:x=10
return A.c(t.a.dZ(0),$async$pB)
case 10:v=1
x=5
break
case 3:v=2
p=u
s=A.aa(p)
A.ov().$1("Sonnerie appel : lecture impossible ("+d+") : "+A.z(s))
x=5
break
case 2:x=1
break
case 5:return A.f(null,w)
case 1:return A.e(u,w)}})
return A.h($async$pB,w)},
eI(){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q
var $async$eI=A.d(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
s=s==null?null:s.bd(0)
x=6
return A.c(y.x.b(s)?s:A.dj(s,y.H),$async$eI)
case 6:v=1
x=5
break
case 3:v=2
q=u
x=5
break
case 2:x=1
break
case 5:return A.f(null,w)
case 1:return A.e(u,w)}})
return A.h($async$eI,w)},
jg(){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q
var $async$jg=A.d(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
s=s==null?null:s.m()
x=6
return A.c(y.x.b(s)?s:A.dj(s,y.H),$async$jg)
case 6:v=1
x=5
break
case 3:v=2
q=u
x=5
break
case 2:x=1
break
case 5:t.a=null
return A.f(null,w)
case 1:return A.e(u,w)}})
return A.h($async$jg,w)}}
B.aD3.prototype={
Xt(d,e){return this.aTz(d,e)},
aTz(d,e){var x=0,w=A.i(y.Y),v,u,t,s,r
var $async$Xt=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.X(["mandatory",A.B(r,r),"optional",A.a([A.X(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.T)],t,y.K)}r=self.RTCPeerConnection
t=A.l3(u,y.N,y.z)
t.K(0,d)
s=new r(y.m.a(A.b8(t)))
t=J.D(s)
v=B.bGw(C.dA.gnS().c5(new A.eG(t)),s)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$Xt,w)}}
B.mm.prototype={
Hj(d){var x=A.a([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.dt(w,A.a0(w).i("dt<1,ad>"))
J.fr(w,new B.az3(x))
return x},
oy(d){var x=A.a([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.dt(w,A.a0(w).i("dt<1,ad>"))
J.fr(w,new B.az4(x))
return x},
Av(d){var x=A.I(this.Hj(0),!0,y.G)
C.d.K(x,this.oy(0))
return x}}
B.a_S.prototype={
ar0(d){var x=this,w=x.d
w.addEventListener("ended",A.bk(new B.az0(x)))
w.addEventListener("mute",A.bk(new B.az1(x)))
w.addEventListener("unmute",A.bk(new B.az2(x)))},
sjH(d,e){this.d.enabled=e},
Mb(d,e){return this.aQQ(0,e)},
aQQ(d,e){var x=0,w=A.i(y.H),v=this
var $async$Mb=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:x=2
return A.c(A.d4(v.d.applyConstraints(y.m.a(A.b8(e))),y.X),$async$Mb)
case 2:return A.f(null,w)}})
return A.h($async$Mb,w)},
bd(d){var x=0,w=A.i(y.H),v=this
var $async$bd=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.f(null,w)}})
return A.h($async$bd,w)}}
B.Kk.prototype={
vW(d,e){return this.ajI(0,e)},
ajI(d,e){var x=0,w=A.i(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$vW=A.d(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.bQ9())if(y.f.b(e.h(0,"video"))&&J.m(e.h(0,"video"),"facingMode")!=null)J.h6(e.h(0,"video"),"facingMode")
e.cb(0,"video",new B.ayU())
e.cb(0,"audio",new B.ayV())}catch(a0){A.ou("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.pp(e.h(0,"audio"),i,i).aC(0,"optional")&&y.F.b(J.m(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.m(e.h(0,"audio"),"optional")
r=A.B(y.N,y.z)
J.fr(s,new B.ayW(r))
J.h6(e.h(0,"audio"),"optional")
J.lP(e.h(0,"audio"),r)}}catch(a0){q=A.aa(a0)
p=A.aW(a0)
A.ou("[getUserMedia] failed to translate optional audio constraints, "+A.z(q)+", "+A.z(p))}i=self
o=i.window.navigator.mediaDevices
h=y.m
x=o.getUserMedia!=null?7:9
break
case 7:n=A.b8(e)
x=10
return A.c(A.d4(o.getUserMedia(h.a(n)),h),$async$vW)
case 10:m=a2
v=new B.mm(m,"local")
x=1
break
x=8
break
case 9:i=i.window.navigator.mediaDevices
g=e.h(0,"audio")
x=11
return A.c(A.d4(i.getUserMedia({video:e.h(0,"video"),audio:g}),h),$async$vW)
case 11:l=a2
v=new B.mm(l,"local")
x=1
break
case 8:u=2
x=6
break
case 4:u=3
f=t
k=A.aa(f)
i=J.D(k)
throw A.j("Unable to getUserMedia: "+i)
x=6
break
case 3:x=2
break
case 6:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$vW,w)},
Ak(d){return this.ajb(d)},
ajb(d){var x=0,w=A.i(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j
var $async$Ak=A.d(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:u=4
n=self
s=n.window.navigator.mediaDevices
x=s.getDisplayMedia!=null?7:9
break
case 7:r=A.b8(d)
n=y.m
x=10
return A.c(A.d4(s.getDisplayMedia(n.a(r)),n),$async$Ak)
case 10:q=f
v=new B.mm(q,"local")
x=1
break
x=8
break
case 9:n=n.window.navigator.mediaDevices
m=y.N
m=A.b8(A.X(["mediaSource","screen"],m,m))
m.toString
l=d.h(0,"audio")
if(l==null)l=!1
x=11
return A.c(A.d4(n.getUserMedia({video:m,audio:l}),y.m),$async$Ak)
case 11:p=f
v=new B.mm(p,"local")
x=1
break
case 8:u=2
x=6
break
case 4:u=3
j=t
o=A.aa(j)
n=J.D(o)
throw A.j("Unable to getDisplayMedia: "+n)
x=6
break
case 3:x=2
break
case 6:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$Ak,w)}}
B.a1H.prototype={
ar9(d,e){var x=this,w=x.at
w===$&&A.b()
w.addEventListener("datachannel",A.bk(new B.aD5(x)))
w.addEventListener("icecandidate",A.bk(new B.aD6(x)))
w.addEventListener("iceconnectionstatechange",A.bk(new B.aD7(x)))
w.onicegatheringstatechange=A.bk(new B.aD8(x))
w.addEventListener("signalingstatechange",A.bk(new B.aD9(x)))
if(!$.blf())w.addEventListener("connectionstatechange",A.bk(new B.aDa(x)))
w.addEventListener("negotiationneeded",A.bk(new B.aDb(x)))
w.addEventListener("track",A.bk(new B.aDc(x)))},
MV(d){var x=0,w=A.i(y.v),v,u=this,t,s
var $async$MV=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.b()
x=3
return A.c(A.d4(s.createOffer(y.m.a(A.b8(A.B(y.N,y.z)))),y.A),$async$MV)
case 3:t=f
v=new B.xP(t.sdp,t.type)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$MV,w)},
MS(d){var x=0,w=A.i(y.v),v,u=this,t,s
var $async$MS=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.b()
x=3
return A.c(A.d4(s.createAnswer(y.m.a(A.b8(A.B(y.N,y.z)))),y.A),$async$MS)
case 3:t=f
v=new B.xP(t.sdp,t.type)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$MS,w)},
AH(d,e){return this.akD(0,e)},
akD(d,e){var x=0,w=A.i(y.H),v=this,u
var $async$AH=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.b()
x=2
return A.c(A.d4(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$AH)
case 2:return A.f(null,w)}})
return A.h($async$AH,w)},
AK(d,e){return this.akU(0,e)},
akU(d,e){var x=0,w=A.i(y.H),v=this,u
var $async$AK=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.b()
x=2
return A.c(A.d4(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$AK)
case 2:return A.f(null,w)}})
return A.h($async$AK,w)},
LS(d){return this.aQd(d)},
aQd(d){var x=0,w=A.i(y.H),v=this,u,t
var $async$LS=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.b()
u=d.b
u.toString
x=2
return A.c(A.d4(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$LS)
case 2:return A.f(null,w)}})
return A.h($async$LS,w)},
Ht(d){var x=0,w=A.i(y.J),v,u=this,t,s,r
var $async$Ht=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:r=u.at
r===$&&A.b()
x=3
return A.c(A.d4(r.getStats(),y.m),$async$Ht)
case 3:t=f
s=A.a([],y.o)
t.forEach.apply(t,[A.ah7(new B.aDd(s))])
v=s
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$Ht,w)},
ap(d){var x=0,w=A.i(y.H),v,u=this,t
var $async$ap=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.b()
t.close()
v=A.cU(null,y.H)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$ap,w)},
M_(d,e,f){return this.aQt(0,e,f)},
aQt(d,e,f){var x=0,w=A.i(y.e),v,u=this,t
var $async$M_=A.d(function(g,h){if(g===1)return A.e(h,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.b()
v=new B.a1J(t.addTrack(e.d,f.e))
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$M_,w)}}
B.a1J.prototype={
Q6(d){return this.b1P(d)},
b1P(d){var x=0,w=A.i(y.H),v=this,u,t,s,r
var $async$Q6=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:try{u=d
s=u.d
v.a.replaceTrack(s)}catch(q){s=A.aa(q)
if(y.L.b(s)){t=s
throw A.j("Unable to RTCRtpSender::replaceTrack: "+J.D(t))}else throw q}return A.f(null,w)}})
return A.h($async$Q6,w)},
AJ(d){return this.akL(d)},
akL(d){var x=0,w=A.i(y.y),v,u=2,t,s=this,r,q,p,o,n,m,l
var $async$AJ=A.d(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:u=4
p=s.a
r=p.getParameters()
o=d.d
n=A.a0(o).i("ao<1,aB<o,@>>")
n=A.b8(A.I(new A.ao(o,new B.aDi(),n),!0,n.i("aN.E")))
o=n==null?A.b8([]):n
r.encodings=y.r.a(o)
x=7
return A.c(A.d4(p.setParameters(r),y.X),$async$AJ)
case 7:x=8
return A.c(A.cU(!0,y.y),$async$AJ)
case 8:p=f
v=p
x=1
break
u=2
x=6
break
case 4:u=3
l=t
p=A.aa(l)
if(y.L.b(p)){q=p
throw A.j("Unable to RTCRtpSender::setParameters: "+J.D(q))}else throw l
x=6
break
case 3:x=2
break
case 6:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$AJ,w)}}
B.biO.prototype={
bd(d){var x=0,w=A.i(y.H),v=this,u,t,s
var $async$bd=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.aa(r)
if(y.L.b(s)){u=s
s=u
J.D(s)
throw A.j("Unable to RTCRtpTransceiver::stop: "+A.z(s))}else throw r}return A.f(null,w)}})
return A.h($async$bd,w)}}
B.LT.prototype={
sagw(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.z5()
if(x!=null)x.style.objectFit=e},
ab0(){var x=this,w=x.z5(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sl(0,v.adC(u,x.z!=null,0,t))},
sw6(d,e){var x,w,v,u,t=this
if(e==null){x=t.z5()
if(x!=null)x.srcObject=null
x=t.w
if(x!=null)x.srcObject=null
t.z=null
return}t.z=e
if(e.oy(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.ak(y.l.b(x)?x:new A.dt(x,A.a0(x).i("dt<1,ad>")))
for(;x.v();){w=x.gJ(x)
t.x.addTrack(w)}}if(e.Hj(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.ak(y.l.b(x)?x:new A.dt(x,A.a0(x).i("dt<1,ad>")))
for(;x.v();){w=x.gJ(x)
t.y.addTrack(w)}}if(t.y!=null){if(t.w==null){v=self.document.createElement("audio")
v.id="audio_"+("RTCVideoRenderer-"+t.Q)
v.muted=e.b==="local"
v.autoplay=!0
t.w=v
x=t.axZ()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.z5()
if(u!=null){u.srcObject=t.x
x=t.z5()
x.toString
t.a2y(x)}t.sl(0,t.a.aSM(t.z!=null))},
axZ(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
if(v!=null)return v
x=w.document.createElement("div")
x.id="html_webrtc_audio_manager_list"
x.style.display="none"
w=w.document.body
if(w!=null)w.append(x)
return x},
z5(){var x=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(x!=null)return x
return null},
m(){var x=0,w=A.i(y.H),v,u=this,t,s,r,q,p
var $async$m=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:u.z=null
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.K)(t),++r)t[r].a5(0)
q=u.z5()
t=q==null
if(!t)q.removeAttribute("src")
if(!t)q.load()
t=u.w
if(t!=null)t.remove()
p=self.document.getElementById("html_webrtc_audio_manager_list")
if(p!=null&&!p.hasChildNodes())p.remove()
v=u.ek()
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$m,w)},
ie(d){var x=0,w=A.i(y.H),v=this
var $async$ie=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:$.Vu()
$.qQ().vD("RTCVideoRenderer-"+v.Q,new B.aDo(v),!0)
return A.f(null,w)}})
return A.h($async$ie,w)},
a2y(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.LV.prototype={
S(){return new B.LW()}}
B.LW.prototype={
a8(){var x,w,v=this
v.an()
v.a.c.a4(0,v.gaGN())
x=v.a
w=x.c
w.as=x.e
w.sagw(0,x.d===D.pR?"contain":"cover")},
aGO(){if(this.c!=null)this.u(new B.aDp())},
m(){if(this.c!=null)this.ao()},
aQ(d){var x,w
this.b4(d)
A.cI(A.cs(0,0,10,0),new B.aDr(this))
x=this.a
w=x.c
w.sagw(0,x.d===D.pR?"contain":"cover")},
C(d){return new A.wJ(new B.aDq(this),null)}}
B.Zf.prototype={
aqJ(d,e,f,g){var x=this,w=$.ar
x.a!==$&&A.az()
x.a=new B.QE(d,x,new A.aR(new A.ag(w,y.c),y.u),e)
if(f.a.ghE())f.a=new B.Ne(g.i("@<0>").bA(g).i("Ne<1,2>")).j4(f.a)
w=A.hW(null,new B.asv(f,x),null,!0,g)
x.b!==$&&A.az()
x.b=w},
a7V(){var x,w
this.d=!0
x=this.c
if(x!=null)x.a5(0)
w=this.b
w===$&&A.b()
w.ap(0)}}
B.QE.prototype={
E(d,e){if(this.e)throw A.j(A.a1("Cannot add event after closing."))
if(this.d)return
this.a.a.E(0,e)},
df(d,e){if(this.e)throw A.j(A.a1("Cannot add event after closing."))
if(this.d)return
this.aAa(d,e)},
jC(d){return this.df(d,null)},
aAa(d,e){var x=this
if(x.w){x.a.a.df(d,e)
return}x.c.j7(d,e)
x.a7W()
x.b.a7V()
x.a.a.ap(0).he(new B.aUm())},
ap(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.a7V()
x.c.cB(0,x.a.a.ap(0))}return x.c.a},
a7W(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.d7(0)
return},
$idx:1}
B.a3Y.prototype={}
B.a3Z.prototype={}
B.vg.prototype={
a3G(d,e){var x=this.b
if((x.b&4)!==0)return
x.E(0,new B.Aq(d,e))
x.ap(0)},
a0B(d){var x
if((this.b.b&4)!==0)throw A.j(B.bjt())
x=A.b8(d)
x.toString
this.a.send(x)},
uz(d,e,f){return this.aS3(0,e,f)},
aS3(d,e,f){var x=0,w=A.i(y.H),v=this,u
var $async$uz=A.d(function(g,h){if(g===1)return A.e(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.j(B.bjt())
u.ap(0)
v.a.close()
return A.f(null,w)}})
return A.h($async$uz,w)},
$ibjs:1}
B.qg.prototype={}
B.DW.prototype={
k(d,e){if(e==null)return!1
return e instanceof B.DW&&e.a===this.a},
gB(d){return C.e.gB(this.a)}}
B.A3.prototype={
k(d,e){var x,w,v,u
if(e==null)return!1
if(e instanceof B.A3&&e.a.length===this.a.length){for(x=this.a,w=x.length,v=e.a,u=0;u<w;++u)if(v[u]!==x[u])return!1
return!0}return!1},
gB(d){return A.fA(this.a)},
j(d){return"BinaryDataReceived("+A.z(this.a)+")"}}
B.Aq.prototype={
k(d,e){if(e==null)return!1
return e instanceof B.Aq&&e.a===this.a&&e.b===this.b},
gB(d){return A.fA([this.a,this.b])},
j(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.Et.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketException"
else return"WebSocketException: "+x},
$ibh:1}
B.Es.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+x}}
B.aio.prototype={
giV(){var x,w=this,v=w.w
if(v===$){x=w.r.b
x===$&&A.b()
x=x.a
x===$&&A.b()
v!==$&&A.aE()
v=w.w=new B.afC(w,x)}return v},
aqu(d){d.hH(0,new B.ais(this),new B.ait(this),y.a)}}
B.afC.prototype={
ap(d){var x=this.b
x.e=x.d=null
return this.amq(0)}}
B.a59.prototype={
j(d){return"WebSocketChannelException: "+this.a},
$ibh:1}
B.tC.prototype={
I(){return"RTCSignalingState."+this.b}}
B.LP.prototype={
I(){return"RTCIceGatheringState."+this.b}}
B.tA.prototype={
I(){return"RTCPeerConnectionState."+this.b}}
B.lk.prototype={
I(){return"RTCIceConnectionState."+this.b}}
B.a1K.prototype={
I(){return"RTCVideoViewObjectFit."+this.b}}
B.tB.prototype={
I(){return"RTCPriorityType."+this.b}}
B.aD2.prototype={}
B.Kl.prototype={}
B.Cb.prototype={
j(d){var x=this.d
return"Track(id: "+A.z(x.id)+", kind: "+A.z(x.kind)+", label: "+A.z(x.label)+", enabled: "+A.z(x.enabled)+", muted: "+A.z(x.muted)+")"}}
B.ayS.prototype={}
B.CS.prototype={}
B.LQ.prototype={}
B.biN.prototype={}
B.a1I.prototype={}
B.CT.prototype={}
B.CR.prototype={}
B.aDe.prototype={}
B.LR.prototype={}
B.aDj.prototype={}
B.xP.prototype={}
B.NA.prototype={}
B.LS.prototype={}
B.LU.prototype={
adC(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.LU(x,w,v)},
aSM(d){return this.adC(null,d,null,null)},
j(d){var x=this
return A.N(x).j(0)+"(width: "+A.z(x.a)+", height: "+A.z(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["ae<~>()","~()","~(DB)","b4(CS)","b4(LS)","b4(lk)","~(@)","mm(@)","CR(ad)","aB<o,@>(CT)","b4(bjs)","~(qg)"])
B.aIp.prototype={
$0(){return J.bzI(this.a.b0())},
$S:2}
B.aIq.prototype={
$1(d){var x,w,v,u
try{this.b.E(0,this.a.$ti.y[1].a(d))}catch(v){u=A.aa(v)
if(y.i.b(u)){x=u
w=A.aW(v)
this.b.df(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.be6.prototype={
$1(d){var x,w,v,u=$.b9().b
if(u==null||u.length===0)return
x=self
w=new x.Headers()
w.set("Authorization","Bearer "+A.z(u))
w.set("Content-Type","application/json")
v=y.N
x.window.fetch("https://connexion-prophetique.onrender.com/messagerie/appels/"+this.a+"/signaux",{method:"POST",headers:w,body:C.a3.hy(A.X(["type","termine","contenu",A.B(v,y.z)],v,y.K),null),keepalive:!0})},
$S:27}
B.be5.prototype={
$0(){return self.window.removeEventListener("beforeunload",this.a)},
$S:0}
B.ajh.prototype={
$1(d){if(d==null)return null
return A.d0(J.D(d))},
$S:112}
B.aSd.prototype={
$0(){var x=this.a
if(x.c!=null)x.u(new B.aSc())},
$S:0}
B.aSc.prototype={
$0(){},
$S:0}
B.aS_.prototype={
$1(d){this.a.tH("candidat_ice",d,!1)},
$S:175}
B.aS0.prototype={
$0(){var x=this.a
if(x.c!=null)x.u(new B.aRZ(x))},
$S:0}
B.aRZ.prototype={
$0(){return this.a.go=!0},
$S:0}
B.aS1.prototype={
$0(){this.a.ko(A.u("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.aS2.prototype={
$0(){},
$S:0}
B.aS3.prototype={
$1(d){var x=this.a,w=x.ch
if(x.c!=null&&w!=null&&x.x)x.u(new B.aRY(x,w))},
$S:41}
B.aRY.prototype={
$0(){return this.a.CW=new A.b_(Date.now(),0,!1).f_(this.b)},
$S:0}
B.aS4.prototype={
$1(d){},
$S:168}
B.aS5.prototype={
$1(d){this.a.tK()},
$S:41}
B.aRD.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.x&&!x.y){if(x.a.f)x.tH("annule",C.bm,!1)
x.ko(A.u("Pas de r\xe9ponse"))}},
$S:0}
B.aRG.prototype={
$0(){var x=this.a
x.fy=x.a.d==="video"||x.at?A.u("Micro ou cam\xe9ra refus\xe9 : autorise le micro et la cam\xe9ra dans les r\xe9glages pour appeler en vid\xe9o."):A.u("Micro refus\xe9 : autorise le micro dans les r\xe9glages pour appeler.")},
$S:0}
B.aRH.prototype={
$1(d){this.a.tH("candidat_ice",d,!1)},
$S:175}
B.aRI.prototype={
$0(){var x=this.a
if(x.c!=null)x.u(new B.aRF(x))},
$S:0}
B.aRF.prototype={
$0(){return this.a.go=!0},
$S:0}
B.aRJ.prototype={
$0(){this.a.ko(A.u("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.aRK.prototype={
$0(){return this.a.z=!0},
$S:0}
B.aRL.prototype={
$1(d){var x=this.a,w=x.ch
if(x.c!=null&&w!=null&&x.x)x.u(new B.aRE(x,w))},
$S:41}
B.aRE.prototype={
$0(){return this.a.CW=new A.b_(Date.now(),0,!1).f_(this.b)},
$S:0}
B.aRM.prototype={
$1(d){},
$S:168}
B.aRN.prototype={
$1(d){this.a.tK()},
$S:41}
B.aS7.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.KI()},
$S:34}
B.aS8.prototype={
$1(d){this.a.ko(A.u("L\u2019appel n\u2019a pas pu aboutir."))},
$S:22}
B.aS9.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.Tc("offre",d)},
$S:855}
B.aSa.prototype={
$1(d){this.a.ko(A.u("L\u2019appel n\u2019a pas pu aboutir."))},
$S:22}
B.aRX.prototype={
$0(){return this.a.at=!0},
$S:0}
B.aRU.prototype={
$0(){var x=this.a
x.x=!0
x.ch=new A.b_(Date.now(),0,!1)
x.CW=C.z},
$S:0}
B.aRV.prototype={
$0(){return this.a.id=!0},
$S:0}
B.aRW.prototype={
$1(d){var x=this.a.c
if(x!=null)A.aw(x,!1).cP()},
$S:3}
B.aS6.prototype={
$1(d){return A.B(y.N,y.z)},
$S:176}
B.aRz.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.aRx.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.aRy.prototype={
$0(){return this.a.ay=this.b},
$S:0}
B.aRC.prototype={
$0(){return this.a.at=!0},
$S:0}
B.aRw.prototype={
$1(d){var x=null,w=A.n(A.u("Statistiques de l\u2019appel"),x,x,x,x,C.cO,x,x,x),v=this.a,u=A.kw(A.n(v,x,x,x,x,C.cO,x,x,x),x,C.C)
return A.h7(A.a([A.cy(!1,A.n(A.u("Fermer"),x,x,x,x,x,x,x,x),x,x,C.u,x,x,x,x,new B.aRu(d),x,x),A.cy(!1,A.n(A.u("Copier"),x,x,x,x,x,x,x,x),x,x,C.u,x,x,x,x,new B.aRv(v,d),x,x)],y.p),D.nh,u,x,w)},
$S:33}
B.aRu.prototype={
$0(){return A.aw(this.a,!1).cP()},
$S:0}
B.aRv.prototype={
$0(){var x,w,v=null
A.Ap(new A.rf(this.a))
x=this.b
A.aw(x,!1).cP()
w=A.u("Statistiques copi\xe9es.")
x.N(y.q).f.aM(A.bx(v,v,v,v,v,C.n,v,A.n(w,v,v,v,v,v,v,v,v),v,C.A,v,v,v,v,v,v,v,v,v))},
$S:0}
B.aRA.prototype={
$0(){},
$S:0}
B.aRB.prototype={
$0(){},
$S:0}
B.aRP.prototype={
$0(){var x=this.a,w=x.c
w.toString
A.aw(w,!1).cP()
x.Bg()},
$S:0}
B.aRQ.prototype={
$0(){var x=this.a,w=x.c
w.toString
A.aw(w,!1).cP()
x.Bi()},
$S:0}
B.aRR.prototype={
$0(){var x=this.a,w=x.c
w.toString
A.aw(w,!1).cP()
x.B7()},
$S:0}
B.aRS.prototype={
$0(){var x=this.a,w=x.c
w.toString
A.aw(w,!1).OS().bb(0,new B.aRO(x),y.H)},
$S:0}
B.aRO.prototype={
$1(d){return this.a.a8S()},
$S:12}
B.aRT.prototype={
$1(d){return A.f1(!0,A.ab(this.a,C.m,C.i,C.J),C.V,!0)},
$S:210}
B.aSb.prototype={
$2(d,e){if(!d)this.a.CN()},
$S:189}
B.b4v.prototype={
$2(d,e){var x,w,v,u=null,t=this.a,s=t.d
s===$&&A.b()
s=s.x
s===$&&A.b()
t=t.a.e
x=t?0.07:0.04
t=t?0.55:0.35
w=this.b
v=w+20
s=A.brM(A.a8(u,u,C.h,u,u,new A.al(u,u,A.cJ(C.t.c4(t*(1-s)),3),u,u,u,C.b7),u,v,u,u,u,u,u,v),1+x*s)
w+=8
w=A.a8(u,u,C.h,u,u,new A.al(u,u,A.cJ(C.t,2),u,u,u,C.b7),u,w,u,u,u,u,u,w)
e.toString
return A.eN(C.H,A.a([s,w,e],y.p),C.n,C.b_,u)},
$S:856}
B.bes.prototype={
$3(d,e,f){if(e==null)return d+" : inconnu"
if(typeof e=="number")return d+" : "+C.c.aE(e,1)+f
return d+" : "+A.z(e)+f},
$2(d,e){return this.$3(d,e,"")},
$S:857}
B.aHu.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.X(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+3}
B.aHv.prototype={
$1(d){var x=d.b,w=x.length!==0?C.d.gP(x):null
if(w!=null)this.a.awE(w)
if(d.c.d.kind==="video"){x=this.a.r
if(x!=null)x.$0()}},
$S:z+4}
B.aHw.prototype={
$1(d){var x
if(d===D.HQ){x=this.a.w
if(x!=null)x.$0()}},
$S:z+5}
B.aHt.prototype={
$0(){var x=this.a
if(x.ay){x.y0()
x=x.ch
if(x!=null)x.$0()}},
$S:24}
B.am1.prototype={
$1(d){return this.a.UL()},
$S:14}
B.am2.prototype={
$0(){var x=this.a
if(!x.e)x.Bd()},
$S:0}
B.beT.prototype={
$1(d){return d.length!==0},
$S:10}
B.az3.prototype={
$1(d){return this.a.push(B.bic(d))},
$S:14}
B.az4.prototype={
$1(d){return this.a.push(B.bic(d))},
$S:14}
B.az0.prototype={
$1(d){var x=this.a.c
if(x!=null)x.$0()},
$S:15}
B.az1.prototype={
$1(d){},
$S:15}
B.az2.prototype={
$1(d){},
$S:15}
B.ayU.prototype={
$0(){return!1},
$S:38}
B.ayV.prototype={
$0(){return!1},
$S:38}
B.ayW.prototype={
$1(d){J.fr(d,new B.ayT(this.a))},
$S:175}
B.ayT.prototype={
$2(d,e){this.a.n(0,d,e)},
$S:43}
B.aD5.prototype={
$1(d){},
$S:15}
B.aD6.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.CS(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:15}
B.aD7.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.b()
v=B.bPM(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.blf())switch(w.cx.a){case 0:w.cy=D.HV
break
case 1:w.cy=D.HW
break
case 3:w.cy=D.HX
break
case 5:w.cy=D.HT
break
case 6:w.cy=D.HU
break
case 7:w.cy=D.pP
break
default:break}},
$S:42}
B.aD8.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.b()
x.CW=B.bPN(w.iceGatheringState)},
$S:42}
B.aD9.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.b()
x.ch=B.bR5(w.signalingState)},
$S:42}
B.aDa.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.b()
x.cy=B.bQN(w.connectionState)},
$S:42}
B.aDb.prototype={
$1(d){},
$S:42}
B.aDc.prototype={
$1(d){var x,w,v=this.a,u=v.Q
if(u!=null){x=B.bic(d.track)
w=d.streams
w=y.l.b(w)?w:new A.dt(w,A.a0(w).i("dt<1,ad>"))
v=J.eo(w,new B.aD4(v),y.h)
u.$1(new B.LS(A.I(v,!0,v.$ti.i("aN.E")),x))}},
$S:15}
B.aD4.prototype={
$1(d){return new B.mm(d,this.a.as)},
$S:z+7}
B.aDd.prototype={
$2(d,e){var x,w,v=y.M.a(A.zz(d)),u=A.B(y.N,y.z)
for(x=v.gfo(v),x=x.gX(x);x.v();){w=x.gJ(x)
u.n(0,J.D(w.a),w.b)}this.a.push(new B.NA(d.type,u))},
$S:858}
B.aDh.prototype={
$1(d){var x="id",w=y.f.a(A.zz(d)),v=J.cB(w)
if(v.aC(w,x))v.n(w,x,C.c.t(A.iz(v.h(w,x))))
v.h(w,"uri")
v.h(w,x)
v.h(w,"encrypted")
return new B.CR()},
$S:z+8}
B.aDg.prototype={
$1(d){var x,w,v,u,t,s,r,q,p,o=null,n="numTemporalLayers",m="scaleResolutionDownBy",l=A.zz(d.rid),k=d.active,j=d.maxBitrate
j=j==null?o:A.aT(j)
x=d.maxFramerate
x=x==null?o:A.aT(x)
w=d.minBitrate
w=w==null?o:A.aT(w)
v=d.numTemporalLayers
v=v==null?o:A.aT(v)
u=d.scaleResolutionDownBy
if(u==null)u=o
t=d.ssrc
t=t==null?o:A.aT(t)
s=d.priority
if(s==null)s=o
r=d.networkPriority
if(r==null)r=o
q=d.scalabilityMode
if(q==null)q=o
p=y.z
p=A.X(["rid",l,"active",k,"maxBitrate",j,"maxFramerate",x,"minBitrate",w,n,v,m,u,"ssrc",t,"priority",s,"networkPriority",r,"scalabilityMode",q],p,p)
q=p.h(0,"rid")
r=p.h(0,"active")
s=p.h(0,"maxBitrate")
t=p.h(0,"maxFramerate")
u=p.h(0,"minBitrate")
v=p.h(0,n)
w=p.h(0,m)
x=p.h(0,"ssrc")
j=p.h(0,"scalabilityMode")
k=B.bvR(p.h(0,"priority"))
l=k==null?D.pQ:k
this.a.push(new B.CT(q,r,s,u,t,v,w,x,j,l,B.bvR(p.h(0,"networkPriority"))))},
$S:14}
B.aDf.prototype={
$1(d){var x,w,v,u,t,s=null,r=d.payloadType,q=d.name
if(q==null)q=s
x=d.kind
if(x==null)x=s
w=d.clockRate
v=d.numChannels
v=v==null?s:A.aT(v)
u=d.parameters
u=u==null?s:A.zz(u)
t=y.z
t=A.X(["payloadType",r,"name",q,"kind",x,"clockRate",w,"numChannels",v,"parameters",u],t,t)
t.h(0,"payloadType")
t.h(0,"name")
t.h(0,"kind")
t.h(0,"clockRate")
t.h(0,"numChannels")
t.h(0,"parameters")
this.a.push(new B.a1I())},
$S:14}
B.aDi.prototype={
$1(d){var x,w,v=A.B(y.N,y.z)
v.n(0,"active",d.b)
x=d.a
if(x!=null)v.n(0,"rid",x)
x=d.c
if(x!=null)v.n(0,"maxBitrate",x)
x=d.e
if(x!=null)v.n(0,"maxFramerate",x)
x=d.d
if(x!=null)v.n(0,"minBitrate",x)
x=d.f
if(x!=null)v.n(0,"numTemporalLayers",x)
x=d.r
if(x!=null)v.n(0,"scaleResolutionDownBy",x)
x=d.x
if(x!=null)v.n(0,"scalabilityMode",x)
x=d.w
if(x!=null)v.n(0,"ssrc",x)
x=$.bzx()
v.n(0,"priority",x.h(0,d.y))
w=d.z
if(w!=null)v.n(0,"networkPriority",x.h(0,w))
return v},
$S:z+9}
B.bf0.prototype={
$1(d){return J.k0(self.window.navigator.userAgent,A.bT(d,!1,!1))},
$S:10}
B.aDo.prototype={
$1(d){var x,w,v,u,t
for(x=this.a,w=x.at,v=w.length,u=0;u<w.length;w.length===v||(0,A.K)(w),++u)w[u].a5(0)
C.d.a7(w)
t=self.document.createElement("video")
t.autoplay=!0
t.muted=!0
t.controls=!1
t.srcObject=x.x
t.id="video_"+("RTCVideoRenderer-"+x.Q)
t.setAttribute("playsinline","true")
x.a2y(t)
v=y.bU.c
w.push(A.fo(t,"canplay",new B.aDk(x),!1,v))
w.push(A.fo(t,"resize",new B.aDl(x),!1,v))
w.push(A.fo(t,"error",new B.aDm(t),!1,v))
w.push(A.fo(t,"ended",new B.aDn(),!1,v))
return t},
$S:109}
B.aDk.prototype={
$1(d){this.a.ab0()},
$S:14}
B.aDl.prototype={
$1(d){this.a.ab0()},
$S:14}
B.aDm.prototype={
$1(d){var x,w,v=this.a.error
A.ou("RTCVideoRenderer: videoElement.onError, "+J.D(v))
v.toString
x=C.Dm.h(0,A.Y(v,"code"))
x.toString
w=!J.l(A.Y(v,"message"),"")?A.Y(v,"message"):"No further diagnostic information can be determined or provided."
throw A.j(A.mu(x,C.Dl.h(0,A.Y(v,"code")),w,null))},
$S:27}
B.aDn.prototype={
$1(d){},
$S:14}
B.aDp.prototype={
$0(){},
$S:0}
B.aDr.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aDq.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.bhP("RTCVideoRenderer-"+w.Q)
else w=A.a8(x,x,C.h,x,x,x,x,x,x,x,x,x,x,x)
return A.cK(A.a8(x,w,C.h,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:859}
B.asv.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.b()
v.c=x.h7(w.gkq(w),new B.asu(v),w.gp5())},
$S:0}
B.asu.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.b()
w.a7W()
x=x.b
x===$&&A.b()
x.ap(0)},
$S:0}
B.aUm.prototype={
$1(d){},
$S:22}
B.al2.prototype={
$1(d){this.a.cB(0,this.b)},
$S:15}
B.al3.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.hg(new B.Et("Failed to connect WebSocket"))
else this.b.a3G(1006,"error")},
$S:15}
B.al4.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.bP("data")
if(typeof x==="string")w.b=new B.DW(A.be(x))
else if(typeof x==="object"&&A.bEv(y.m.a(x),"ArrayBuffer"))w.b=new B.A3(A.KG(y.R.a(x),0,null))
else throw A.j(A.a1("unexpected message type: "+J.ah(x).j(0)))
v.E(0,w.b0())},
$S:27}
B.al5.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.cB(0,this.b)
this.b.a3G(d.code,d.reason)},
$S:15}
B.ais.prototype={
$1(d){var x=d.b,w=this.a
new A.cz(x,A.t(x).i("cz<1>")).dw(new B.aip(w))
x=w.r.a
x===$&&A.b()
x=x.b
x===$&&A.b()
new A.cz(x,A.t(x).i("cz<1>")).aYX(new B.aiq(d),new B.air(w,d))
w.f.d7(0)},
$S:z+10}
B.aip.prototype={
$1(d){var x,w,v
$label0$0:{x=d instanceof B.DW
w=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.b()
x=x.a
x===$&&A.b()
x.E(0,w)
break $label0$0}x=d instanceof B.A3
v=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.b()
x=x.a
x===$&&A.b()
x.E(0,v)
break $label0$0}if(d instanceof B.Aq){x=this.a.r.a
x===$&&A.b()
x=x.a
x===$&&A.b()
x.ap(0)}}},
$S:z+11}
B.aiq.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.ac(B.bjt())
s=A.b8(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.k.b(x)
if(t)v=x
if(t){this.a.a0B(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.a0B(new Uint8Array(A.bo(u)))
break $label1$1}t=A.aJ("Cannot send "+J.ah(d).j(0))
throw A.j(t)}}catch(r){if(!(A.aa(r) instanceof B.Es))throw r}},
$S:11}
B.air.prototype={
$0(){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q
var $async$$0=A.d(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
x=6
return A.c(t.b.uz(0,s.d,s.e),$async$$0)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(!(A.aa(q) instanceof B.Es))throw q
x=5
break
case 2:x=1
break
case 5:return A.f(null,w)
case 1:return A.e(u,w)}})
return A.h($async$$0,w)},
$S:2}
B.ait.prototype={
$1(d){var x,w=d instanceof A.Od?d:new B.a59(J.D(d)),v=this.a
v.f.hg(w)
v=v.r.a
v===$&&A.b()
x=v.a
x===$&&A.b()
x.jC(w)
v=v.a
v===$&&A.b()
v.ap(0)},
$S:42};(function aliases(){var x=B.AW.prototype
x.amq=x.ap
x=B.Uz.prototype
x.apW=x.m})();(function installTearOffs(){var x=a._instance_1u,w=a._instance_0u
var v
x(v=B.Q7.prototype,"gaaT","aaU",2)
w(v,"ga8y","CN",0)
w(v,"ga8R","a8S",1)
w(v,"ga2Q","ID",0)
w(v,"ga2P","IC",0)
w(v,"ga2N","IB",0)
w(v,"ga2O","Bg",0)
w(v,"ga2R","IE",0)
w(v,"ga80","aHt",1)
x(v=B.X7.prototype,"gaKo","aKp",6)
w(v,"gaJ0","UL",1)
w(B.LT.prototype,"gdN","m",0)
w(B.LW.prototype,"gaGN","aGO",1)})();(function inheritance(){var x=a.mixinHard,w=a.inheritMany,v=a.inherit
w(A.S,[B.AW,B.ajf,B.DB,B.Xn,B.aHs,B.X7,B.a_r,B.aD2,B.Kl,B.Cb,B.ayS,B.LQ,B.LR,B.aDj,B.a3Z,B.QE,B.a3Y,B.vg,B.qg,B.Et,B.a59,B.CS,B.biN,B.a1I,B.CT,B.CR,B.aDe,B.xP,B.NA,B.LS,B.LU])
v(B.Ne,A.eO)
w(A.vq,[B.aIp,B.be5,B.aSd,B.aSc,B.aS0,B.aRZ,B.aS1,B.aS2,B.aRY,B.aRD,B.aRG,B.aRI,B.aRF,B.aRJ,B.aRK,B.aRE,B.aRX,B.aRU,B.aRV,B.aRz,B.aRx,B.aRy,B.aRC,B.aRu,B.aRv,B.aRA,B.aRB,B.aRP,B.aRQ,B.aRR,B.aRS,B.aHt,B.am2,B.ayU,B.ayV,B.aDp,B.aDr,B.asv,B.asu,B.air])
w(A.nh,[B.aIq,B.be6,B.ajh,B.aS_,B.aS3,B.aS4,B.aS5,B.aRH,B.aRL,B.aRM,B.aRN,B.aS7,B.aS8,B.aS9,B.aSa,B.aRW,B.aS6,B.aRw,B.aRO,B.aRT,B.bes,B.aHu,B.aHv,B.aHw,B.am1,B.beT,B.az3,B.az4,B.az0,B.az1,B.az2,B.ayW,B.aD5,B.aD6,B.aD7,B.aD8,B.aD9,B.aDa,B.aDb,B.aDc,B.aD4,B.aDh,B.aDg,B.aDf,B.aDi,B.bf0,B.aDo,B.aDk,B.aDl,B.aDm,B.aDn,B.aUm,B.al2,B.al3,B.al4,B.al5,B.ais,B.aip,B.aiq,B.ait])
w(A.W,[B.rn,B.FB,B.LV])
w(A.Z,[B.Q7,B.Uz,B.LW])
w(A.HM,[B.aSb,B.b4v,B.ayT,B.aDd,B.aDq])
w(A.a4,[B.a6R,B.Pc,B.uj])
v(B.aaU,B.Uz)
v(B.aD3,B.aD2)
v(B.mm,B.Kl)
v(B.a_S,B.Cb)
v(B.Kk,B.ayS)
v(B.a1H,B.LQ)
v(B.a1J,B.LR)
v(B.biO,B.aDj)
v(B.LT,A.d_)
w(B.a3Z,[B.Zf,B.aio])
w(B.qg,[B.DW,B.A3,B.Aq])
v(B.Es,B.Et)
v(B.afC,B.AW)
w(A.a8l,[B.tC,B.LP,B.tA,B.lk,B.a1K,B.tB])
x(B.Uz,A.fD)})()
A.afg(b.typeUniverse,JSON.parse('{"AW":{"dx":["1"]},"Ne":{"eO":["1","2"],"eO.S":"1","eO.T":"2"},"FB":{"W":[],"k":[]},"rn":{"W":[],"k":[]},"Q7":{"Z":["rn"]},"a6R":{"a4":[],"k":[]},"Pc":{"a4":[],"k":[]},"uj":{"a4":[],"k":[]},"aaU":{"Z":["FB"]},"mm":{"Kl":[]},"a_S":{"Cb":[]},"a1H":{"LQ":[]},"a1J":{"LR":[]},"LT":{"d_":["LU"],"aK":[]},"LV":{"W":[],"k":[]},"LW":{"Z":["LV"]},"QE":{"dx":["1"]},"vg":{"bjs":[]},"DW":{"qg":[]},"A3":{"qg":[]},"Aq":{"qg":[]},"Et":{"bh":[]},"Es":{"bh":[]},"afC":{"dx":["@"]},"a59":{"bh":[]}}'))
A.bsZ(b.typeUniverse,JSON.parse('{"AW":1,"QE":1,"a3Z":1}'))
var y=(function rtii(){var x=A.ap
return{b:x("vg"),L:x("bh"),_:x("ae<@>"),x:x("ae<~>"),T:x("A<aB<o,F>>"),t:x("A<aB<o,@>>"),Q:x("A<Cb>"),B:x("A<a1I>"),O:x("A<CT>"),o:x("A<NA>"),d:x("A<hX<@>>"),s:x("A<o>"),p:x("A<k>"),r:x("A<S?>"),m:x("ad"),M:x("K6<S?,S?>"),l:x("C<ad>"),F:x("C<aB<o,@>>"),J:x("C<NA>"),j:x("C<@>"),I:x("C<w>"),P:x("aB<o,@>"),f:x("aB<@,@>"),E:x("Kl"),G:x("Cb"),h:x("mm"),R:x("nF"),a:x("b4"),K:x("S"),W:x("CR"),Y:x("LQ"),e:x("LR"),v:x("xP"),Z:x("a3Y<S?>"),N:x("o"),i:x("o7"),k:x("eV"),D:x("qg"),U:x("ai<o>"),g:x("di<DB>"),n:x("di<~>"),V:x("aR<vg>"),u:x("aR<@>"),w:x("aR<~>"),bU:x("Qe<ad>"),C:x("mV<ad>"),cF:x("ag<vg>"),c:x("ag<@>"),d4:x("ag<~>"),q:x("ze"),y:x("F"),z:x("@"),S:x("w"),A:x("ad?"),cO:x("aB<o,@>?"),X:x("S?"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.nh=new A.L(1,0.10588235294117647,0.17254901960784313,0.25098039215686274,C.l)
D.QZ=new B.Xn(C.cG)
D.Tf=new A.a6(20,0,20,0)
D.nX=new A.a6(32,0,32,0)
D.Tz=new A.a6(8,20,8,20)
D.TK=new A.hv(1,C.bX,C.alQ,null)
D.vM=new A.a5(57639,"MaterialIcons",null,!1)
D.UY=new A.a5(58337,"MaterialIcons",null,!1)
D.UZ=new A.a5(58341,"MaterialIcons",null,!1)
D.V4=new A.a5(58721,"MaterialIcons",null,!0)
D.V9=new A.a5(58888,"MaterialIcons",null,!1)
D.Vc=new A.a5(59048,"MaterialIcons",null,!1)
D.Vd=new A.a5(59049,"MaterialIcons",null,!1)
D.X7=new A.aj(C.oo,null,C.f,null,null)
D.X6=new A.aj(C.oo,28,C.f,null,null)
D.Vg=new A.a5(61044,"MaterialIcons",null,!1)
D.Xd=new A.aj(D.Vg,null,C.f,null,null)
D.w_=new A.a5(58923,"MaterialIcons",null,!1)
D.Xh=new A.aj(D.w_,null,C.f,null,null)
D.Xg=new A.aj(D.w_,20,C.f,null,null)
D.a4G=A.a(x([1,2,4,8,16]),A.ap("A<w>"))
D.y2=A.a(x([]),y.Q)
D.DA=new A.f0("FlutterWebRTC.Method",C.aL,null)
D.aiA=new B.lk(0,"RTCIceConnectionStateNew")
D.aiB=new B.lk(1,"RTCIceConnectionStateChecking")
D.aiC=new B.lk(2,"RTCIceConnectionStateCompleted")
D.aiD=new B.lk(3,"RTCIceConnectionStateConnected")
D.aiE=new B.lk(4,"RTCIceConnectionStateCount")
D.HQ=new B.lk(5,"RTCIceConnectionStateFailed")
D.aiF=new B.lk(6,"RTCIceConnectionStateDisconnected")
D.HR=new B.lk(7,"RTCIceConnectionStateClosed")
D.HS=new B.LP(0,"RTCIceGatheringStateNew")
D.aiG=new B.LP(1,"RTCIceGatheringStateGathering")
D.aiH=new B.LP(2,"RTCIceGatheringStateComplete")
D.pP=new B.tA(0,"RTCPeerConnectionStateClosed")
D.HT=new B.tA(1,"RTCPeerConnectionStateFailed")
D.HU=new B.tA(2,"RTCPeerConnectionStateDisconnected")
D.HV=new B.tA(3,"RTCPeerConnectionStateNew")
D.HW=new B.tA(4,"RTCPeerConnectionStateConnecting")
D.HX=new B.tA(5,"RTCPeerConnectionStateConnected")
D.HY=new B.tB(0,"veryLow")
D.pQ=new B.tB(1,"low")
D.HZ=new B.tB(2,"medium")
D.I_=new B.tB(3,"high")
D.aiI=new B.tC(0,"RTCSignalingStateStable")
D.aiJ=new B.tC(1,"RTCSignalingStateHaveLocalOffer")
D.aiK=new B.tC(2,"RTCSignalingStateHaveRemoteOffer")
D.aiL=new B.tC(3,"RTCSignalingStateHaveLocalPrAnswer")
D.aiM=new B.tC(4,"RTCSignalingStateHaveRemotePrAnswer")
D.I0=new B.tC(5,"RTCSignalingStateClosed")
D.aiN=new B.LU(0,0,0)
D.pR=new B.a1K(0,"RTCVideoViewObjectFitContain")
D.I1=new B.a1K(1,"RTCVideoViewObjectFitCover")
D.qN=new A.y(!0,C.ae,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.apD=new A.y(!0,C.f,null,null,null,null,13,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.bke=null
$.bsd=!1
$.bqC=1
$.bRr=A.X(["very-low",D.HY,"low",D.pQ,"medium",D.HZ,"high",D.I_],y.N,A.ap("tB"))})();(function lazyInitializers(){var x=a.lazyFinal
x($,"bV_","ahQ",()=>new B.aD3())
x($,"bT7","blf",()=>C.e.p(A.Y(A.Y(A.Y(A.bkW(),"window"),"navigator"),"userAgent"),"Firefox"))
x($,"bZp","bzx",()=>A.X([D.HY,"very-low",D.pQ,"low",D.HZ,"medium",D.I_,"high"],A.ap("tB"),y.N))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_1",e:"endPart",h:b})})($__dart_deferred_initializers__,"5BtWECZuX2RMAOFUMAAHZJem4nw=");