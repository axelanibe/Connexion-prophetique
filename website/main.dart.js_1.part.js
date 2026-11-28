((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_1",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={DL:function DL(){},Rk:function Rk(d){this.$ti=d},aRx:function aRx(d){this.a=d},aRy:function aRy(d,e){this.a=d
this.b=e},
bMW(d){var x
B.buL()
if(d.length===0)return
x=A.bs(new B.bvm(d))
self.window.addEventListener("beforeunload",x)
$.bBD=new B.bvl(x)},
buL(){var x=$.bBD
if(x!=null)x.$0()
$.bBD=null},
bvm:function bvm(d){this.a=d},
bvl:function bvl(d){this.a=d},
aqs(d){var x,w,v=new B.aqt(),u=J.W(d),t=u.h(d,"id")
t=J.q(t==null?"":t)
x=u.h(d,"conversation_id")
J.q(x==null?"":x)
x=u.h(d,"appelant_id")
x=J.q(x==null?"":x)
w=u.h(d,"appelant_nom")
J.q(w==null?"":w)
A.av(u.h(d,"appele_id"))
A.av(u.h(d,"appele_nom"))
w=u.h(d,"type")
J.q(w==null?"audio":w)
w=u.h(d,"statut")
w=J.q(w==null?"sonne":w)
v.$1(u.h(d,"cree_le"))
v.$1(u.h(d,"repondu_le"))
return new B.aqr(t,x,w)},
bAi(d){var x,w,v,u=J.W(d),t=u.h(d,"contenu"),s=u.h(d,"id")
s=J.q(s==null?"":s)
x=u.h(d,"appel_id")
J.q(x==null?"":x)
x=u.h(d,"emetteur_id")
x=J.q(x==null?"":x)
w=u.h(d,"type")
w=J.q(w==null?"":w)
if(y.P.b(t))v=t
else v=y.f.b(t)?J.lG(t,y.N,y.z):C.aZ
if(u.h(d,"cree_le")!=null)A.c9(J.q(u.h(d,"cree_le")))
return new B.GB(s,x,w,v)},
bUi(d){var x,w,v,u,t,s,r=J.W(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return D.Yk
x=A.a([],y.t)
for(r=J.ab(q),w=y.f,v=y.P,u=y.N,t=y.z;r.t();){s=r.gG(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.lG(s,u,t))}return new B.a1p(x)},
bNJ(d){var x=J.W(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.oq(v)
if(!x.k(v,"offer")&&!x.k(v,"answer"))return null
return new A.aiu(w,v)},
c7a(d){var x,w,v=J.W(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.aix(u,A.oo(w)?w:null,v)},
aqr:function aqr(d,e,f){this.a=d
this.c=e
this.w=f},
aqt:function aqt(){},
GB:function GB(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a1p:function a1p(d){this.a=d},
aoi(d){return B.c80(d)},
c80(d){var x=0,w=A.i(y.y),v
var $async$aoi=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:v=!0
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$aoi,w)},
bFI(d,e,f,g,h,i,j,k,l,m){return new B.ub(f,m,h,l,i,d,j,k,e,g,null)},
bKj(d,e,f,g,h,i,j,k,l,m,n){return new B.ad2(e,g,f,d,n,k,j,i,h,l,m,null)},
bM_(d,e){var x=null
return new A.ae(C.lr,A.m(d.toUpperCase(),x,2,C.V,x,A.cA(x,x,C.f,x,x,x,x,x,"Cinzel",x,x,e,x,x,C.S,x,x,!0,x,1.2,x,x,x,x,x,x),C.ar,x,x),x)},
ub:function ub(d,e,f,g,h,i,j,k,l,m,n){var _=this
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
Uq:function Uq(d,e){var _=this
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
b1v:function b1v(d){this.a=d},
b1u:function b1u(){},
b1h:function b1h(d){this.a=d},
b1i:function b1i(d){this.a=d},
b1g:function b1g(d){this.a=d},
b1j:function b1j(d){this.a=d},
b1k:function b1k(){},
b1l:function b1l(d){this.a=d},
b1f:function b1f(d,e){this.a=d
this.b=e},
b1m:function b1m(){},
b1n:function b1n(d){this.a=d},
b0V:function b0V(d){this.a=d},
b0Y:function b0Y(d){this.a=d},
b0Z:function b0Z(d){this.a=d},
b1_:function b1_(d){this.a=d},
b0X:function b0X(d){this.a=d},
b10:function b10(d){this.a=d},
b11:function b11(d){this.a=d},
b12:function b12(d){this.a=d},
b0W:function b0W(d,e){this.a=d
this.b=e},
b13:function b13(){},
b14:function b14(d){this.a=d},
b1p:function b1p(d){this.a=d},
b1q:function b1q(d){this.a=d},
b1r:function b1r(d){this.a=d},
b1s:function b1s(d){this.a=d},
b1e:function b1e(d){this.a=d},
b1b:function b1b(d,e){this.a=d
this.b=e},
b1c:function b1c(d){this.a=d},
b1d:function b1d(d){this.a=d},
b1o:function b1o(){},
b0R:function b0R(d,e){this.a=d
this.b=e},
b0P:function b0P(d,e){this.a=d
this.b=e},
b0Q:function b0Q(d,e){this.a=d
this.b=e},
b0U:function b0U(d){this.a=d},
b0O:function b0O(d){this.a=d},
b0M:function b0M(d){this.a=d},
b0N:function b0N(d,e){this.a=d
this.b=e},
b0S:function b0S(){},
b0T:function b0T(){},
b16:function b16(d){this.a=d},
b17:function b17(d){this.a=d},
b18:function b18(d){this.a=d},
b19:function b19(d){this.a=d},
b15:function b15(d){this.a=d},
b1a:function b1a(d){this.a=d},
b1t:function b1t(d){this.a=d},
ad2:function ad2(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
Tt:function Tt(d,e){this.c=d
this.a=e},
wn:function wn(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
IH:function IH(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
ahi:function ahi(d,e){var _=this
_.d=$
_.eQ$=d
_.bM$=e
_.c=_.a=null},
bka:function bka(d,e){this.a=d
this.b=e},
Zn:function Zn(){},
car(a3,a4){var x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=null,a0="kind",a1="video",a2="packetsLost"
for(x=J.ab(a3),w=d,v=w,u=v,t=u,s=t,r=s,q=r,p=q,o=p,n=o,m=n;x.t();){l=x.gG(x)
k=l.d
l=l.b
if(l==="codec"){l=k.h(0,"mimeType")
j=J.q(l==null?"":l)
if(C.e.bj(j,"video/"))m=C.e.c0(j,6)}else if(l==="outbound-rtp"&&J.n(k.h(0,a0),a1)){l=A.bM(k.h(0,"bytesSent"))
n=l==null?d:C.d.u(l)
l=A.bM(k.h(0,"packetsSent"))
o=l==null?d:C.d.u(l)
u=A.bM(k.h(0,"framesPerSecond"))
if(u==null)u=d
l=A.bM(k.h(0,"frameWidth"))
v=l==null?d:C.d.u(l)
l=A.bM(k.h(0,"frameHeight"))
w=l==null?d:C.d.u(l)}else if(l==="remote-inbound-rtp"&&J.n(k.h(0,a0),a1)){l=A.bM(k.h(0,a2))
p=l==null?d:C.d.u(l)
r=A.bM(k.h(0,"jitter"))
if(r==null)r=d
i=A.bM(k.h(0,"roundTripTime"))
if(i==null)i=d
if(i!=null)t=i*1000}else if(l==="inbound-rtp"&&J.n(k.h(0,a0),a1)){l=A.bM(k.h(0,a2))
q=l==null?d:C.d.u(l)
s=A.bM(k.h(0,"jitter"))
if(s==null)s=d}else if(l==="candidate-pair"&&J.n(k.h(0,"state"),"succeeded")){i=A.bM(k.h(0,"currentRoundTripTime"))
if(i==null)i=d
if(t==null&&i!=null)t=i*1000}}x=a4==null
l=A.bM(x?d:a4.h(0,"octetsEnvoyes"))
h=l==null?d:C.d.u(l)
l=A.bM(x?d:a4.h(0,"horodatageMs"))
g=l==null?d:C.d.u(l)
x=Date.now()
if(n!=null&&h!=null&&g!=null){f=(x-g)/1000
e=f>0&&n>=h?(n-h)*8/f/1000:d}else e=d
l=r==null?d:r*1000
return A.X(["codecVideo",m,"octetsEnvoyes",n,"paquetsEnvoyes",o,"paquetsPerdusEnvoi",p,"paquetsPerdusReception",q,"gigueEnvoiMs",l,"gigueReceptionMs",s==null?d:s*1000,"allerRetourMs",t,"debitSortantKbitS",e,"imagesParSeconde",u,"largeur",v,"hauteur",w,"horodatageMs",x],y.N,y.z)},
bN4(d){var x=new B.bvK(),w=J.W(d),v=w.h(d,"largeur")!=null&&w.h(d,"hauteur")!=null?A.u(w.h(d,"largeur"))+"x"+A.u(w.h(d,"hauteur")):null
return C.c.b_(A.a([x.$2("Codec vid\xe9o",w.h(d,"codecVideo")),x.$3("D\xe9bit sortant",w.h(d,"debitSortantKbitS")," kbit/s"),x.$2("Paquets envoy\xe9s",w.h(d,"paquetsEnvoyes")),x.$2("Paquets perdus (envoi)",w.h(d,"paquetsPerdusEnvoi")),x.$2("Paquets perdus (r\xe9ception)",w.h(d,"paquetsPerdusReception")),x.$3("Gigue (envoi)",w.h(d,"gigueEnvoiMs")," ms"),x.$3("Gigue (r\xe9ception)",w.h(d,"gigueReceptionMs")," ms"),x.$3("Aller-retour",w.h(d,"allerRetourMs")," ms"),x.$2("Images par seconde",w.h(d,"imagesParSeconde")),x.$2("R\xe9solution envoy\xe9e",v)],y.s),"\n")},
bvK:function bvK(){},
aQu:function aQu(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.y=_.x=!1
_.ax=_.at=_.as=_.Q=_.z=null
_.ay=!1
_.ch=null
_.CW=!1},
aQw:function aQw(d){this.a=d},
aQx:function aQx(d){this.a=d},
aQy:function aQy(d){this.a=d},
aQv:function aQv(d){this.a=d},
a16:function a16(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.y=_.x=null},
atv:function atv(d){this.a=d},
atw:function atw(d){this.a=d},
bNi(d){var x=y.U,w=A.H(new A.aj(A.a(d.split(" "),y.s),new B.bwa(),x),!0,x.i("p.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.o(C.c.gS(w),0).toUpperCase()
return(J.o(C.c.gS(w),0)+J.o(C.c.gaC(w),0)).toUpperCase()},
bwa:function bwa(){},
a4H:function a4H(){this.a=null},
aLz:function aLz(){},
ny:function ny(d,e){this.e=d
this.b=e},
aH6:function aH6(d){this.a=d},
aH7:function aH7(d){this.a=d},
bzx(d){var x=new B.a5c(d)
x.ay1(d)
return x},
a5c:function a5c(d){this.d=d
this.c=null},
aH3:function aH3(d){this.a=d},
aH4:function aH4(d){this.a=d},
aH5:function aH5(d){this.a=d},
NP:function NP(){},
aGT:function aGT(){},
aGU:function aGU(){},
aGV:function aGV(d){this.a=d},
aGS:function aGS(d){this.a=d},
bZw(d,e){var x=y.N
x=new B.a7d(d,e,A.C(x,y.E),A.C(x,y.z))
x.ayb(d,e)
return x},
a7d:function a7d(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aLB:function aLB(d){this.a=d},
aLC:function aLC(d){this.a=d},
aLD:function aLD(d){this.a=d},
aLE:function aLE(d){this.a=d},
aLF:function aLF(d){this.a=d},
aLG:function aLG(d){this.a=d},
aLH:function aLH(d){this.a=d},
aLI:function aLI(d){this.a=d},
aLA:function aLA(d){this.a=d},
aLJ:function aLJ(d){this.a=d},
bZz(d){var x=d.headerExtensions
x=y.l.b(x)?x:new A.cs(x,A.Z(x).i("cs<1,ah>"))
x=J.eu(x,new B.aLN(),y.W)
return A.H(x,!0,x.$ti.i("aE.E"))},
bZy(d){var x,w
if("encodings" in d)x=d.encodings
else x=[]
w=A.a([],y.O)
C.c.aF(x,new B.aLM(w))
return w},
bZx(d){var x,w
if("codecs" in d)x=d.codecs
else x=[]
w=A.a([],y.B)
C.c.aF(x,new B.aLL(w))
return w},
aLN:function aLN(){},
aLM:function aLM(d){this.a=d},
aLL:function aLL(d){this.a=d},
a7f:function a7f(d){this.a=d},
aLO:function aLO(){},
bA8:function bA8(d){this.a=d},
c9c(){return C.c.n1(A.a(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.bwi())!==-1},
bwi:function bwi(){},
bIk(){var x=A.a([],y.d),w=$.bIl
$.bIl=w+1
return new B.PM(w,x,D.av4,$.am())},
PM:function PM(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.fy$=0
_.go$=g
_.k1$=_.id$=0},
aLU:function aLU(d){this.a=d},
aLQ:function aLQ(d){this.a=d},
aLR:function aLR(d){this.a=d},
aLS:function aLS(d){this.a=d},
aLT:function aLT(){},
bA9(d,e,f){return new B.PO(d,f,e,null)},
PO:function PO(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
PP:function PP(){this.c=this.a=null},
aLV:function aLV(){},
aLX:function aLX(d){this.a=d},
aLW:function aLW(d){this.a=d},
bGk(d,e,f,g){var x,w={}
w.a=d
x=new B.a3q(g.i("a3q<0>"))
x.axJ(e,f,w,g)
return x},
a3q:function a3q(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
aAm:function aAm(d,e){this.a=d
this.b=e},
aAl:function aAl(d){this.a=d},
UX:function UX(d,e,f,g){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g},
b3F:function b3F(){},
a9H:function a9H(d){this.b=this.a=$
this.$ti=d},
a9I:function a9I(){},
bye(d,e){return B.bTy(d,e)},
bTy(d,e){var x=0,w=A.i(y.b),v,u,t,s,r,q,p
var $async$bye=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:if(!d.SH("ws")&&!d.SH("wss"))throw A.j(A.fB(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.j(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.xo(r,A.i5(null,null,null,!1,y.D))
u=new A.ap($.as,y.cF)
p=new A.aV(u,y.V)
if(J.n(r.readyState,1))p.cK(0,q)
else if(J.n(r.readyState,2)||J.n(r.readyState,3))p.hb(new B.Hu("Unexpected WebSocket state: "+A.u(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.oe(r,"open",!1,y.C).gS(0).bd(0,new B.ass(p,q),y.H)
t=y.C
s=y.H
new A.oe(r,"error",!1,t).gS(0).bd(0,new B.ast(p,q),s)
A.h8(r,"message",new B.asu(q),!1,y.m)
new A.oe(r,"close",!1,t).gS(0).bd(0,new B.asv(p,q),s)
v=u
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$bye,w)},
xo:function xo(d,e){this.a=d
this.b=e},
ass:function ass(d,e){this.a=d
this.b=e},
ast:function ast(d,e){this.a=d
this.b=e},
asu:function asu(d){this.a=d},
asv:function asv(d,e){this.a=d
this.b=e},
bAQ(){return new B.Ht("Connection Closed")},
rY:function rY(){},
GZ:function GZ(d){this.a=d},
CN:function CN(d){this.a=d},
Dd:function Dd(d,e){this.a=d
this.b=e},
Hu:function Hu(d){this.a=d},
Ht:function Ht(d){this.a=d},
bSY(d){var x=null,w=$.as,v=new B.a9H(y.Z),u=y.X,t=A.i5(x,x,x,!0,u),s=A.i5(x,x,x,!0,u)
v.a=B.bGk(new A.cJ(s,A.v(s).i("cJ<1>")),new A.J8(t),!0,u)
v.b=B.bGk(new A.cJ(t,A.v(t).i("cJ<1>")),new A.J8(s),!1,u)
v=new B.app(new A.aV(new A.ap(w,y.d4),y.w),v)
v.axt(d)
return v},
app:function app(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
apt:function apt(d){this.a=d},
apq:function apq(d){this.a=d},
apr:function apr(d){this.a=d},
aps:function aps(d,e){this.a=d
this.b=e},
apu:function apu(d){this.a=d},
amm:function amm(d,e){this.b=d
this.a=e},
ab7:function ab7(d){this.a=d},
c8O(d){switch(d){case"new":return D.auS
case"checking":return D.auT
case"connected":return D.auV
case"completed":return D.auU
case"failed":return D.Lg
case"disconnected":return D.auX
case"closed":return D.Lh
case"count":return D.auW}return D.Lh},
c8P(d){switch(d){case"new":return D.Li
case"gathering":return D.auY
case"complete":return D.auZ}return D.Li},
caF(d){switch(d){case"stable":return D.av_
case"have-local-offer":return D.av0
case"have-local-pranswer":return D.av2
case"have-remote-offer":return D.av1
case"have-remote-pranswer":return D.av3
case"closed":return D.Lr}return D.Lr},
cah(d){switch(d){case"new":return D.Ll
case"connecting":return D.Lm
case"connected":return D.Ln
case"closed":return D.rE
case"disconnected":return D.Lk
case"failed":return D.Lj}return D.rE},
bO6(d){if(d==null)return null
return $.cb1.h(0,d)},
vx:function vx(d,e){this.a=d
this.b=e},
PI:function PI(d,e){this.a=d
this.b=e},
vv:function vv(d,e){this.a=d
this.b=e},
mo:function mo(d,e){this.a=d
this.b=e},
a7g:function a7g(d,e){this.a=d
this.b=e},
vw:function vw(d,e){this.a=d
this.b=e},
aLy:function aLy(){},
NQ:function NQ(){},
F1:function F1(){},
aGR:function aGR(){},
FU:function FU(d,e,f){this.a=d
this.b=e
this.c=f},
PJ:function PJ(){},
bA7:function bA7(){},
a7e:function a7e(){},
FV:function FV(d,e,f,g,h,i,j,k,l,m,n){var _=this
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
FT:function FT(){},
aLK:function aLK(d){this.d=d},
PK:function PK(){},
aLP:function aLP(){},
Ae:function Ae(d,e){this.a=d
this.b=e},
RJ:function RJ(d,e){this.b=d
this.d=e},
PL:function PL(d,e){this.b=d
this.c=e},
PN:function PN(d,e,f){this.a=d
this.b=e
this.c=f},
bBU(){var x=0,w=A.i(y.H),v
var $async$bBU=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:x=1
break
case 1:return A.f(v,w)}})
return A.h($async$bBU,w)},
bza(d){var x=0,w=A.i(y.y)
var $async$bza=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.j("The is not a video track => "+d.j(0))
throw A.j("You need to specify the deviceId")
return A.f(null,w)}})
return A.h($async$bza,w)},
a5v(d){var x=0,w=A.i(y.H),v
var $async$a5v=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.c(B.aVY("enableSpeakerphone",A.X(["enable",d],y.N,v),v,v),$async$a5v)
case 2:return A.f(null,w)}})
return A.h($async$a5v,w)},
aIP(d,e){var x=0,w=A.i(y.H),v,u,t
var $async$aIP=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:t=e.d
x=t.kind==="audio"?3:4
break
case 3:u=J.lG(y.f.a(A.Cg(t.getConstraints())),y.N,y.z)
u.m(0,"volume",d)
x=5
return A.c(e.PY(0,u),$async$aIP)
case 5:case 4:v=A.d6(null,y.H)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$aIP,w)},
aVY(d,e,f,g){return B.c1R(d,e,f,g,f.i("0?"))},
c1R(d,e,f,g,h){var x=0,w=A.i(h),v
var $async$aVY=A.d(function(i,j){if(i===1)return A.e(j,w)
while(true)switch(x){case 0:x=3
return A.c(B.aVX(),$async$aVY)
case 3:v=D.GN.bX(d,e,!1,f)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$aVY,w)},
aVX(){var x=0,w=A.i(y.H),v,u
var $async$aVX=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:x=!$.bK8?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.c(D.GN.bX("initialize",A.X(["options",A.C(v,u)],v,u),!1,y.H),$async$aVX)
case 4:$.bK8=!0
case 3:return A.f(null,w)}})
return A.h($async$aVX,w)}},D
J=c[1]
A=c[0]
C=c[2]
B=a.updateHolder(c[6],B)
D=c[8]
B.DL.prototype={
C(d,e){this.a.C(0,e)},
dE(d,e){this.a.dE(d,e)},
ap(d){return this.a.ap(0)},
$idW:1}
B.Rk.prototype={
jN(d){var x=A.cb("subscription"),w=A.i5(new B.aRx(x),null,null,!0,this.$ti.y[1])
x.b=d.hx(new B.aRy(this,w),w.goW(w),w.gqj())
return new A.cJ(w,A.v(w).i("cJ<1>"))}}
B.aqr.prototype={}
B.GB.prototype={}
B.a1p.prototype={}
B.ub.prototype={
R(){return new B.Uq(A.aX(y.N),C.L)}}
B.Uq.prototype={
Y(){var x,w,v,u,t,s,r,q,p,o=this,n=null
o.a8()
x=o.a
o.r=x.c
x=x.x
if(x==null)x=new B.aQu(B.bIk(),B.bIk())
o.d!==$&&A.aG()
o.d=x
w=o.a
v=w.y
if(v==null)v=new B.a16(new A.dc(n,n,y.g),new A.dc(n,n,y.n))
o.e!==$&&A.aG()
o.e=v
x.ch=new B.b1v(o)
o.fx=!0
u=new B.a4H()
o.fr!==$&&A.aG()
o.fr=u
t=w.x
if(t!=null){s=$.iX()
r=s.a
q=r.length!==0&&s.as===t&&r===w.c&&s.w}else q=!1
t=$.iX()
s=o.r
r=w.e
p=w.d
t.b3X(s,r,x,v,w.f,p)
x=o.a
if(x.as)t.ax=!0
if(q){o.OL()
return}if(x.f)u.qV("assets/audio/tonalite-appel.wav")
o.pX()},
n(){var x=this,w=x.cx
if(w!=null)w.a0(0)
w=x.cy
if(w!=null)w.a0(0)
w=x.db
if(w!=null)w.a0(0)
w=x.dx
if(w!=null)w.a0(0)
w=x.dy
if(w!=null)w.a0(0)
w=x.fr
w===$&&A.b()
w.e3()
if(x.fx)w.hw()
w=$.iX()
if(!(w.r&&w.a===x.r&&!x.y)){B.buL()
w=x.d
w===$&&A.b()
w.hw()
w=x.e
w===$&&A.b()
w.HI()}x.al()},
OL(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l
var $async$OL=A.d(function(d,e){if(d===1){t=e
x=u}while(true)$async$outer:switch(x){case 0:s.a.toString
o=$.bl()
s.w=o.gJ6()
o=$.iX()
s.Q=o.x
s.as=o.y
s.ay=o.Q
s.x=o.e
o=o.f
s.ch=o
if(o!=null){o=Date.now()
n=s.ch
n.toString
s.CW=new A.aY(o,0,!1).f2(n)}B.bMW(s.r)
u=4
s.a.toString
o=$.bl()
x=7
return A.c(o.cl("/messagerie/appels/"+s.r+"/signaux"),$async$OL)
case 7:r=e
for(o=J.ab(r),n=s.f;o.t();){q=o.gG(o)
p=B.bAi(q)
n.C(0,p.a)
if(p.d==="termine"||p.d==="refuse"||p.d==="annule"){s.l4(A.x("Appel termin\xe9"))
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
n.f=new B.b1h(s)
n.r=new B.b1i(s)
n.w=new B.b1j(s)
s.z=!0
if(o)s.q(new B.b1k())
s.db=A.kJ(C.cw,new B.b1l(s))
o=s.e
o===$&&A.b()
n=o.r
s.dx=new A.bT(n,A.v(n).i("bT<1>")).d9(s.gagv())
o=o.w
s.dy=new A.bT(o,A.v(o).i("bT<1>")).d9(new B.b1m())
s.cx=A.kJ(C.eA,new B.b1n(s))
s.vi()
case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$OL,w)},
aEb(){var x=this.cy
if(x!=null)x.a0(0)
this.cy=A.d0(C.dY,new B.b0V(this))},
pX(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$pX=A.d(function(d,a0){if(d===1){t=a0
x=u}while(true)switch(x){case 0:f="appel"
u=4
r=null
j=s.a
i=j.z
x=i!=null?7:9
break
case 7:x=10
return A.c(i,$async$pX)
case 10:r=a0
j=s.r=B.aqs(r).a
x=8
break
case 9:i=$.bl()
x=11
return A.c(i.AW(j.c),$async$pX)
case 11:r=a0
j=s.r=s.a.c
case 8:i=$.iX()
i.b3G(j)
B.bMW(s.r)
if(s.a.f)i.R4()
q=B.aqs(r)
if(s.c==null){x=1
break}j=q.w
if(j==="termine"||j==="expire"){s.l4(A.x("Appel termin\xe9"))
x=1
break}s.a.toString
j=$.bl()
s.w=j.gJ6()
f="ice"
s.a.toString
j=$.bl()
p=j.RC()
o=s.ES()
x=12
return A.c(p,$async$pX)
case 12:n=a0
m=B.bUi(n)
x=15
return A.c(o,$async$pX)
case 15:x=!a0?13:14
break
case 13:if(s.c==null){x=1
break}s.q(new B.b0Y(s))
x=16
return A.c(A.j7(C.iX,null,y.z),$async$pX)
case 16:if(s.c==null){x=1
break}s.l4(null)
x=1
break
case 14:s.aEb()
f="webrtc"
j=s.d
j===$&&A.b()
h=s.a.d==="video"||s.at
x=17
return A.c(j.ug(A.X(["iceServers",m.a],y.N,y.z),h),$async$pX)
case 17:j.f=new B.b0Z(s)
j.r=new B.b1_(s)
j.w=new B.b10(s)
if(s.c==null){x=1
break}s.q(new B.b11(s))
i.ba6()
s.db=A.kJ(C.cw,new B.b12(s))
j=s.e
j===$&&A.b()
i=j.r
s.dx=new A.bT(i,A.v(i).i("bT<1>")).d9(s.gagv())
i=j.w
s.dy=new A.bT(i,A.v(i).i("bT<1>")).d9(new B.b13())
s.a.toString
i=$.bl()
l=i.b
if(l!=null&&J.aB(l)!==0){s.a.toString
$.bl()
j.QE(C.e.r9("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws",l)}s.cx=A.kJ(C.eA,new B.b14(s))
s.vi()
u=2
x=6
break
case 4:u=3
e=t
k=A.ag(e)
if(s.c==null){x=1
break}A.os().$1("Appel : \xe9chec \xe0 l\u2019\xe9tape "+A.u(f)+" : "+A.asz(A.u(k)))
j=s.c
j.toString
i=k instanceof A.fA?k.a:s.aNB(f)
j.K(y.q).f.X(A.az(null,null,null,null,null,C.j,null,A.m(i,null,null,null,null,null,null,null,null),null,C.p,null,null,null,null,null,null,null,null,null))
s.l4(null)
x=6
break
case 3:x=2
break
case 6:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$pX,w)},
aNB(d){if(d==="ice")return A.x("Configuration d\u2019appel indisponible. V\xe9rifie ta connexion, puis r\xe9essaie.")
if(d==="webrtc")return A.x("Ce navigateur ne peut pas d\xe9marrer l\u2019appel. Essaie depuis l\u2019application.")
return A.x("Appel introuvable ou d\xe9j\xe0 termin\xe9.")},
ES(){var x=0,w=A.i(y.y),v,u=2,t,s=this,r,q,p
var $async$ES=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
x=7
return A.c(s.WJ(),$async$ES)
case 7:if(!e){v=!1
x=1
break}r=s.d
r===$&&A.b()
x=8
return A.c(r.BI(s.a.d==="video"||s.at),$async$ES)
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
return A.h($async$ES,w)},
WJ(){var x=0,w=A.i(y.y),v,u=this
var $async$WJ=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:v=B.aoi(u.a.d==="video"||u.at)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$WJ,w)},
vi(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$vi=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.y){x=1
break}u=4
s.a.toString
p=$.bl()
x=7
return A.c(p.cl("/messagerie/appels/"+s.r+"/signaux"),$async$vi)
case 7:r=e
for(p=J.ab(r);p.t();){q=p.gG(p)
s.agw(B.bAi(q))}u=2
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
return A.h($async$vi,w)},
agw(d){var x,w,v,u,t=this
if(t.c==null||t.y)return
x=t.f
w=d.a
if(x.p(0,w))return
x.C(0,w)
x=t.w
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(t.a.f)return
t.Ft(d)
break
case"reponse":if(!t.a.f)return
v=B.bNJ(d.e)
if(v==null)return
x=t.d
x===$&&A.b()
x.PX(A.X(["sdp",v.a,"type",v.b],y.N,y.z)).bd(0,new B.b1p(t),y.a).hI(new B.b1q(t))
break
case"candidat_ice":u=B.c7a(d.e)
if(u==null)return
x=t.d
x===$&&A.b()
x.PN(A.X(["candidate",u.a,"sdpMid",u.c,"sdpMLineIndex",u.b],y.N,y.z))
break
case"accepte":if(!t.a.f||t.x)return
x=t.d
x===$&&A.b()
x.Au().bd(0,new B.b1r(t),y.a).hI(new B.b1s(t))
break
case"refuse":t.l4(A.x("Appel refus\xe9"))
break
case"annule":t.l4(A.x("Appel annul\xe9"))
break
case"termine":t.l4(A.x("Appel termin\xe9"))
break}},
Ft(d){return this.aTI(d)},
aTI(d){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$Ft=A.d(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:o=B.bNJ(d.e)
if(o==null){x=1
break}x=!(s.a.d==="video"||s.at)&&C.e.p(o.a,"m=video")?3:4
break
case 3:q=s.d
q===$&&A.b()
x=5
return A.c(q.qk(),$async$Ft)
case 5:if(f&&s.c!=null&&!s.y){s.q(new B.b1e(s))
$.iX().ame("video")}case 4:u=7
q=s.d
q===$&&A.b()
x=10
return A.c(q.Av(A.X(["sdp",o.a,"type",o.b],y.N,y.z)),$async$Ft)
case 10:r=f
if(s.c==null||s.y){x=1
break}s.Ol()
s.XI("reponse",r)
u=2
x=9
break
case 7:u=6
n=t
s.l4(A.x("L\u2019appel n\u2019a pas pu aboutir."))
x=9
break
case 6:x=2
break
case 9:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$Ft,w)},
Ol(){var x=0,w=A.i(y.H),v,u=this,t,s
var $async$Ol=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:if(u.x){x=1
break}t=u.cy
if(t!=null)t.a0(0)
t=u.fr
t===$&&A.b()
t.e3()
u.q(new B.b1b(u,!1))
t=$.iX()
t.bc9()
s=u.Q
t.a3n(u.as,s)
B.bBU()
case 1:return A.f(v,w)}})
return A.h($async$Ol,w)},
vd(d,e,f){return this.aFB(d,e,f)},
XI(d,e){return this.vd(d,e,!0)},
aFB(d,e,f){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q
var $async$vd=A.d(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
t.a.toString
s=$.bl()
x=6
return A.c(s.akk(t.r,e,d),$async$vd)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(f&&t.c!=null&&!t.y)t.l4(A.x("L\u2019appel n\u2019a pas pu aboutir."))
x=5
break
case 2:x=1
break
case 5:return A.f(null,w)
case 1:return A.e(u,w)}})
return A.h($async$vd,w)},
Fj(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o
var $async$Fj=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
r=s.cy
if(r!=null)r.a0(0)
r=s.fr
r===$&&A.b()
r.e3()
u=4
r=s.r
x=r.length!==0?7:8
break
case 7:s.a.toString
q=$.bl()
x=9
return A.c(q.I1(r,"termine"),$async$Fj)
case 9:case 8:u=2
x=6
break
case 4:u=3
o=t
x=6
break
case 3:x=2
break
case 6:B.buL()
$.iX().K9()
r=s.c
if(r!=null)A.aa(r,!1).cs()
case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$Fj,w)},
aeq(){var x=this
if(!x.x||x.y)return
$.iX().bdA()
x.q(new B.b1c(x))
$.aJ.aN$.push(new B.b1d(x))},
l4(d){var x,w,v=this,u=null
if(v.y)return
v.y=!0
x=v.cy
if(x!=null)x.a0(0)
x=v.fr
x===$&&A.b()
x.e3()
x=v.r
if(x.length!==0){v.a.toString
w=$.bl()
w.I1(x,"termine").hI(new B.b1o())}if(d!=null&&v.c!=null)v.c.K(y.q).f.X(A.az(u,u,u,u,u,C.j,u,A.m(d,u,u,u,u,u,u,u,u),u,C.p,u,u,u,u,u,u,u,u,u))
B.buL()
$.iX().K9()
x=v.c
if(x!=null)A.aa(x,!1).cs()},
Mb(){var x=0,w=A.i(y.H),v=this,u,t
var $async$Mb=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.b()
x=2
return A.c(t.VM(u),$async$Mb)
case 2:if(v.c!=null)v.q(new B.b0R(v,u))
$.iX().a3n(v.as,u)
return A.f(null,w)}})
return A.h($async$Mb,w)},
Ma(){var x=0,w=A.i(y.H),v=this,u,t
var $async$Ma=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:v.ax=!1
x=2
return A.c(v.M5(!v.as),$async$Ma)
case 2:u=$.iX()
t=v.Q
u.a3n(v.as,t)
return A.f(null,w)}})
return A.h($async$Ma,w)},
M5(d){return this.azy(d)},
azy(d){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q,p,o
var $async$M5=A.d(function(e,f){if(e===1){u=f
x=v}while(true)switch(x){case 0:v=3
r=t.d
r===$&&A.b()
x=6
return A.c(r.CN(d),$async$M5)
case 6:v=1
x=5
break
case 3:v=2
o=u
s=A.ag(o)
A.os().$1("Appel : haut-parleur impossible : "+A.asz(A.u(s)))
x=5
break
case 2:x=1
break
case 5:r=t.d
r===$&&A.b()
p=r.CW
if(t.c!=null&&p!==t.as)t.q(new B.b0P(t,p))
return A.f(null,w)
case 1:return A.e(u,w)}})
return A.h($async$M5,w)},
M9(){var x=0,w=A.i(y.H),v=this,u,t
var $async$M9=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:u=!v.ay
t=v.d
t===$&&A.b()
x=2
return A.c(t.VI(u),$async$M9)
case 2:if(v.c!=null)v.q(new B.b0Q(v,u))
$.iX().bah(u)
return A.f(null,w)}})
return A.h($async$M9,w)},
Dx(){var x=0,w=A.i(y.H),v=this,u
var $async$Dx=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:u=v.d
u===$&&A.b()
x=2
return A.c(u.Q2(),$async$Dx)
case 2:return A.f(null,w)}})
return A.h($async$Dx,w)},
afV(){var x,w=this,v="Appel en cours\u2026",u=w.fy
if(u!=null)return u
$.iX()
if(w.x){u=A.x(v)
x=C.b.aE(w.CW.a,1e6)
return u+" "+(C.e.cP(C.b.j(C.b.aE(x,60)),2,"0")+":"+C.e.cP(C.b.j(C.b.an(x,60)),2,"0"))}if(w.z)return w.a.f?A.x("\xc7a sonne\u2026"):A.x(v)
return A.x("Connexion\u2026")},
Mc(){var x=0,w=A.i(y.H),v,u=this,t,s,r
var $async$Mc=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:if(u.a.d==="video"||u.at||u.y){x=1
break}if(!u.x){t=u.c
t.toString
s=A.x("D\xe9croche d\u2019abord pour passer en vid\xe9o.")
t.K(y.q).f.X(A.az(null,null,null,null,null,C.j,null,A.m(s,null,null,null,null,null,null,null,null),null,C.p,null,null,null,null,null,null,null,null,null))
x=1
break}t=u.d
t===$&&A.b()
x=3
return A.c(t.Gm(),$async$Mc)
case 3:r=e
if(r==null){t=u.c
if(t!=null){s=A.x("La cam\xe9ra n\u2019a pas pu s\u2019ouvrir.")
t.K(y.q).f.X(A.az(null,null,null,null,null,C.j,null,A.m(s,null,null,null,null,null,null,null,null),null,C.p,null,null,null,null,null,null,null,null,null))}x=1
break}if(u.c==null||u.y){x=1
break}u.q(new B.b0U(u))
$.iX().ame("video")
u.XI("offre",r)
case 1:return A.f(v,w)}})
return A.h($async$Mc,w)},
Dh(){var x=0,w=A.i(y.H),v,u=this,t,s,r
var $async$Dh=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:if(u.y||u.c==null){x=1
break}t=u.d
t===$&&A.b()
x=3
return A.c(t.LA(),$async$Dh)
case 3:s=e
if(u.c==null||u.y){x=1
break}r=J.dJ(s)?A.x("Statistiques indisponibles pour cet appel."):B.bN4(s)
t=u.c
t.toString
x=4
return A.c(A.da(null,null,!0,null,new B.b0O(r),t,null,!0,y.H),$async$Dh)
case 4:case 1:return A.f(v,w)}})
return A.h($async$Dh,w)},
Dz(){var x=0,w=A.i(y.H),v,u=this,t,s
var $async$Dz=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:if(!(u.a.d==="video"||u.at)||u.y){x=1
break}t=u.d
t===$&&A.b()
x=t.ay?3:4
break
case 3:x=5
return A.c(t.zY(),$async$Dz)
case 5:if(u.c!=null)u.q(new B.b0S())
x=1
break
case 4:x=6
return A.c(t.xc(),$async$Dz)
case 6:if(!e){t=u.c
if(t!=null){s=A.x("Le partage d\u2019\xe9cran n\u2019est pas disponible sur cet appareil.")
t.K(y.q).f.X(A.az(null,null,null,null,null,C.j,null,A.m(s,null,null,null,null,null,null,null,null),null,C.p,null,null,null,null,null,null,null,null,null))}x=1
break}if(u.c!=null)u.q(new B.b0T())
case 1:return A.f(v,w)}})
return A.h($async$Dz,w)},
aPG(){var x,w,v=this,u=null,t=A.a([],y.p)
if(v.a.d==="video"||v.at){t.push(A.br(!1,u,u,u,!0,u,u,!0,!1,D.a57,u,new B.b16(v),!1,u,u,u,u,u,A.m(A.x("Basculer"),u,u,u,u,C.cI,u,u,u),u,u))
x=v.d
x===$&&A.b()
x=x.ay
w=A.ct(x?D.a2J:D.a2E,C.f,u,u)
t.push(A.br(!1,u,u,u,!0,u,u,!0,!1,w,u,new B.b17(v),!1,u,u,u,u,u,A.m(x?A.x("Arr\xeater le partage"):A.x("Partager l\u2019\xe9cran"),u,u,u,u,C.cI,u,u,u),u,u))}if(v.x){t.push(A.br(!1,u,u,u,!0,u,u,!0,!1,D.a53,u,new B.b18(v),!1,u,u,u,u,u,A.m(A.x("Statistiques"),u,u,u,u,C.cI,u,u,u),u,u))
t.push(A.br(!1,u,u,u,!0,u,u,!0,!1,D.a4V,u,new B.b19(v),!1,u,u,u,u,u,A.m(A.x("R\xe9duire"),u,u,u,u,C.cI,u,u,u),u,u))}if(t.length===0)return
x=v.c
x.toString
A.fx(D.oK,new B.b1a(t),x,!1,u,y.H)},
A(d){var x,w,v,u,t,s,r,q=this,p=null,o=q.d
o===$&&A.b()
x=o.c
x=x==null?p:x.pL(0).length!==0
w=q.id
v=q.a
if((v.d==="video"||q.at)&&q.z){if(x===!0)x=A.eg(p,B.bA9(o.e,!1,D.Ls),C.t,!1,p,q.ga86(),p,p,p,p,p,p,p,p,p,p,p,p,p,p,p,p,p,p)
else{x=v.e
v=v.r
u=q.go&&q.x
x=A.cW(A.a7(A.a([new B.IH(x,v,u,56,p),C.R,B.bM_(x,22),C.y,A.m(q.afV(),p,p,p,p,D.tU,p,p,p)],y.p),C.m,C.h,C.I),p,p)}o=A.a([A.a6C(0,x),A.i1(p,A.D8(A.a8(12),B.bA9(o.d,!0,D.Ls),C.bk),160,p,p,16,16,110),A.i1(p,A.bc(A.bm(!1,D.a56,C.i,p,C.o,p,p,p,p,q.ga86(),p,A.df(C.Ya,p,p,C.X,C.d2,p)),36,36),p,p,p,20,20,p)],y.p)
if(q.x)o.push(A.i1(p,new B.Tt(q.gaep(),p),p,p,16,p,16,p))
x=q.Q
v=q.as
o.push(A.i1(24,B.bKj(q.ay,!0,v,x,q.ga89(),q.ga85(),q.ga87(),q.ga88(),q.gads(),q.gae6(),!0),p,p,0,0,p,p))
o=A.f9(C.br,o,C.j,C.b7,p)}else{x=y.p
v=A.a([],x)
if(q.go)v.push(A.i1(p,A.rb(B.bA9(o.e,!1,D.rG),0),1,p,0,p,0,1))
if(q.x)v.push(A.i1(p,new B.Tt(q.gaep(),p),p,p,16,p,16,p))
o=B.bM_(q.a.e,24)
u=A.m(q.afV(),p,p,p,p,D.tU,C.ar,p,p)
t=q.a
s=t.e
t=t.r
t=A.aW(A.cW(new B.IH(s,t,q.go&&q.x,88,p),p,p),1)
s=q.Q
r=q.as
v.push(A.a7(A.a([C.R,o,C.y,new A.ae(C.lr,u,p),t,B.bKj(q.ay,!1,r,s,q.ga89(),q.ga85(),q.ga87(),q.ga88(),q.gads(),q.gae6(),q.x),C.R],x),C.m,C.h,C.l))
v=A.f9(C.br,v,C.j,C.b7,p)
o=v}return A.aKQ(w,A.ej(p,C.k,A.fF(!0,o,C.X,!0),p,p,p),new B.b1t(q),y.K)}}
B.ad2.prototype={
A(d){var x,w,v=this,u=null,t=A.a8(28),s=A.aW(new B.wn(C.yM,v.e,A.x("Haut-parleur"),v.x,u,u),1),r=v.f?D.a2M:D.a2N,q=A.x("Appel vid\xe9o")
r=A.aW(new B.wn(r,!1,q,v.c?v.y:v.z,u,u),1)
q=v.d
x=q?D.a2y:D.a2x
w=y.p
q=A.ay(A.a([s,r,A.aW(new B.wn(x,q,A.x("Muet"),v.w,u,u),1)],w),C.m,C.h,C.l)
x=A.x("Plus")
return A.af(u,A.a7(A.a([q,C.R,A.ay(A.a([A.aW(new B.wn(C.yF,!1,x,v.r?v.Q:u,u,u),1),A.aW(new B.wn(D.yx,!1,A.x("Terminer"),v.as,C.ev,u),1),D.a17],w),C.m,C.h,C.l)],w),C.m,C.h,C.I),C.i,u,u,new A.ar(D.oK,u,u,t,u,u,C.v),u,u,u,D.a0q,D.a0O,u,u,u)}}
B.Tt.prototype={
A(d){var x=null
return A.a7(A.a([A.bc(A.bm(!1,D.a4U,C.i,x,C.o,x,x,x,x,this.c,x,A.df(C.oR,x,x,C.X,C.d2,x)),48,48),C.aj,A.m(A.x("R\xe9duire"),x,x,x,x,C.aDn,x,x,x)],y.p),C.m,C.h,C.I)}}
B.wn.prototype={
A(d){var x,w,v,u=this,t=null,s=u.r,r=s==null
if(r)s=u.d?C.f:C.oR
if(!r)x=C.f
else x=u.d?C.k:C.f
r=u.f
w=r==null?0.4:1
v=A.df(s,t,t,C.X,C.d2,t)
return A.rb(A.a7(A.a([A.bc(A.bm(!1,A.ct(u.c,x,t,30),C.i,t,C.o,t,t,t,t,r,t,v),72,72),C.y,A.m(u.e,t,t,t,t,D.aDm,C.ar,t,t)],y.p),C.m,C.h,C.I),w)}}
B.IH.prototype={
R(){return new B.ahi(null,null)}}
B.ahi.prototype={
Y(){var x,w=this
w.a8()
x=A.c_(null,A.cp(0,0,w.a.e?1100:2400,0),null,1,null,w)
x.Uo(0,!0)
w.d!==$&&A.aG()
w.d=x},
aW(d){var x,w
this.b9(d)
x=this.a.e
if(d.e!==x){w=this.d
w===$&&A.b()
w.e=A.cp(0,0,x?1100:2400,0)
w.Uo(0,!0)}},
n(){var x=this.d
x===$&&A.b()
x.n()
this.awP()},
A(d){var x,w=this,v=null,u=w.a,t=u.f,s=t*2,r=s+24,q=w.d
q===$&&A.b()
x=u.d
u=x!=null?A.n4(v,x,v,t):A.n4(C.w,v,A.m(B.bNi(u.c),v,v,v,v,A.cA(v,v,C.k,v,v,v,v,v,v,v,v,w.a.f*0.7,v,v,C.S,v,v,!0,v,v,v,v,v,v,v,v),v,v,v),t)
return A.bc(A.hQ(q,new B.bka(w,s),u),r,r)}}
B.Zn.prototype={
n(){var x=this,w=x.bM$
if(w!=null)w.O(0,x.gi0())
x.bM$=null
x.al()},
c3(){this.d0()
this.cO()
this.i1()}}
B.aQu.prototype={
BI(d){return this.bbR(d)},
bbR(d){var x=0,w=A.i(y.H),v,u=this,t,s,r,q,p
var $async$BI=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:if(u.b!=null){x=1
break}t=u.d
x=3
return A.c(t.iO(0),$async$BI)
case 3:$.aoO()
s=y.N
r=A.X(["echoCancellation",!0,"noiseSuppression",!0,"autoGainControl",!0],s,y.y)
if(d){q=y.S
q=A.X(["facingMode","user","width",A.X(["ideal",640],s,q),"height",A.X(["ideal",480],s,q),"frameRate",A.X(["ideal",24],s,q)],s,y.K)}else q=!1
x=4
return A.c(new B.NP().xJ(0,A.X(["audio",r,"video",q],s,y.z)),$async$BI)
case 4:p=f
u.b=p
t.sxW(0,p)
case 1:return A.f(v,w)}})
return A.h($async$BI,w)},
ug(d,e){return this.bcE(d,e)},
bcE(d,e){var x=0,w=A.i(y.H),v=this,u,t,s,r,q,p,o
var $async$ug=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:x=2
return A.c(v.e.iO(0),$async$ug)
case 2:x=v.b==null?3:4
break
case 3:x=5
return A.c(v.BI(e),$async$ug)
case 5:case 4:u=v.b
u.toString
x=6
return A.c($.aoO().a1j(d,A.C(y.N,y.z)),$async$ug)
case 6:t=v.a=g
s=u.CB(0),r=s.length,q=0
case 7:if(!(q<s.length)){x=9
break}p=s[q]
x=10
return A.c(t.PK(0,p,u),$async$ug)
case 10:o=g
if(p.d.kind==="video")v.as=o
case 8:s.length===r||(0,A.G)(s),++q
x=7
break
case 9:x=11
return A.c(v.z8(),$async$ug)
case 11:t.e=new B.aQw(v)
t.Q=new B.aQx(v)
t.d=new B.aQy(v)
return A.f(null,w)}})
return A.h($async$ug,w)},
aE1(d){var x,w,v,u=this
u.c=d
x=d.pL(0)
w=x.length!==0?C.c.gS(x).d.id:null
if(!u.x){u.x=!0
u.z=w
u.e.sxW(0,d)
u.Dt()
v=u.r
if(v!=null)v.$0()}else{v=u.z
if(w!=null&&w!==v){u.z=w
u.e.sxW(0,d)
v=u.r
if(v!=null)v.$0()}}},
Dt(){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q,p,o,n,m,l
var $async$Dt=A.d(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:n=t.CW?0.8:1
m=t.c
m=m==null?null:m.KM(0)
if(m==null)m=C.Q
q=m.length
p=0
case 2:if(!(p<m.length)){x=4
break}s=m[p]
v=6
x=9
return A.c(B.aIP(n,s),$async$Dt)
case 9:v=1
x=8
break
case 6:v=5
l=u
r=A.ag(l)
A.os().$1("Appel : volume distant impossible : "+A.asz(A.u(r)))
x=8
break
case 5:x=1
break
case 8:case 3:m.length===q||(0,A.G)(m),++p
x=2
break
case 4:return A.f(null,w)
case 1:return A.e(u,w)}})
return A.h($async$Dt,w)},
z8(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h
var $async$z8=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:i=s.as
if(i==null){x=1
break}u=4
o=i.a.getParameters()
n=o.transactionId
if((n==null?null:n)!=null){m=o.rtcp
l=y.z
l=A.X(["cname",m.cname,"reducedSize",m.reducedSize],l,l)
l.h(0,"cname")
l.h(0,"reducedSize")}B.bZz(o)
m=B.bZy(o)
B.bZx(o)
r=new B.aLK(m)
q=r.d
if(q==null||J.aB(q)===0){x=1
break}for(m=q,l=m.length,k=0;k<l;++k){p=m[k]
p.c=5e5
p.e=24}x=7
return A.c(i.CQ(r),$async$z8)
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
return A.h($async$z8,w)},
Au(){var x=0,w=A.i(y.P),v,u=this,t,s
var $async$Au=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.j(A.a0("Connexion non pr\xe9par\xe9e."))
x=3
return A.c(s.QO(0),$async$Au)
case 3:t=e
x=4
return A.c(s.CO(0,t),$async$Au)
case 4:v=A.X(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$Au,w)},
Av(d){return this.b39(d)},
b39(d){var x=0,w=A.i(y.P),v,u=this,t,s
var $async$Av=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.j(A.a0("Connexion non pr\xe9par\xe9e."))
x=3
return A.c(s.CR(0,new B.Ae(d.h(0,"sdp"),d.h(0,"type"))),$async$Av)
case 3:x=4
return A.c(s.QL(0),$async$Av)
case 4:t=f
x=5
return A.c(s.CO(0,t),$async$Av)
case 5:v=A.X(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$Av,w)},
PX(d){return this.b_i(d)},
b_i(d){var x=0,w=A.i(y.H),v=this,u
var $async$PX=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.j(A.a0("Connexion non pr\xe9par\xe9e."))
x=2
return A.c(u.CR(0,new B.Ae(d.h(0,"sdp"),d.h(0,"type"))),$async$PX)
case 2:return A.f(null,w)}})
return A.h($async$PX,w)},
PN(d){return this.aZY(d)},
aZY(d){var x=0,w=A.i(y.H),v,u=this,t
var $async$PN=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.c(t.PD(new B.FU(A.av(d.h(0,"candidate")),A.av(d.h(0,"sdpMid")),A.ek(d.h(0,"sdpMLineIndex")))),$async$PN)
case 3:case 1:return A.f(v,w)}})
return A.h($async$PN,w)},
VM(d){return this.arj(d)},
arj(d){var x=0,w=A.i(y.H),v=this,u,t,s,r
var $async$VM=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.KM(0)
if(r==null)r=C.Q
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.G)(r),++s)r[s].skp(0,t)
return A.f(null,w)}})
return A.h($async$VM,w)},
CN(d){return this.ar8(d)},
ar8(d){var x=0,w=A.i(y.H),v=this
var $async$CN=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:x=2
return A.c(B.a5v(d),$async$CN)
case 2:v.CW=d
x=3
return A.c(v.Dt(),$async$CN)
case 3:return A.f(null,w)}})
return A.h($async$CN,w)},
VI(d){return this.ar0(d)},
ar0(d){var x=0,w=A.i(y.H),v=this,u,t,s
var $async$VI=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.pL(0)
if(s==null)s=C.Q
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.G)(s),++t)s[t].skp(0,d)
return A.f(null,w)}})
return A.h($async$VI,w)},
Q2(){var x=0,w=A.i(y.H),v,u=this,t,s
var $async$Q2=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.pL(0)
if(s==null)s=D.Bd
if(s.length===0){x=1
break}x=3
return A.c(B.bza(C.c.gS(s)),$async$Q2)
case 3:case 1:return A.f(v,w)}})
return A.h($async$Q2,w)},
qk(){var x=0,w=A.i(y.y),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0
var $async$qk=A.d(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:e=s.a
if(e==null||s.y){v=!1
x=1
break}m=s.b
m=m==null?null:m.pL(0).length!==0
if(m===!0){v=!0
x=1
break}r=null
u=4
$.aoO()
m=y.N
l=y.S
x=7
return A.c(new B.NP().xJ(0,A.X(["audio",!1,"video",A.X(["facingMode","user","width",A.X(["ideal",640],m,l),"height",A.X(["ideal",480],m,l),"frameRate",A.X(["ideal",24],m,l)],m,y.K)],m,y.z)),$async$qk)
case 7:r=a2
q=J.bDO(r)
if(J.aB(q)===0){v=!1
x=1
break}p=J.k9(q)
m=s.b
if(m==null)m=null
else{m=m.e
l=p.d
m.addTrack(l)
m=A.d6(null,y.H)}x=8
return A.c(y.x.b(m)?m:A.cM(m,y.H),$async$qk)
case 8:s.d.sxW(0,s.b)
m=s.b
m.toString
x=9
return A.c(J.bSc(e,p,m),$async$qk)
case 9:o=a2
s.as=o
x=10
return A.c(s.z8(),$async$qk)
case 10:v=!0
x=1
break
u=2
x=6
break
case 4:u=3
d=t
m=r
m=m==null?null:J.bDN(m)
if(m==null)m=C.Q
l=m.length
j=y.c
i=y._
h=0
case 11:if(!(h<m.length)){x=13
break}n=m[h]
u=15
g=J.a_n(n)
if(!i.b(g)){f=new A.ap($.as,j)
f.a=8
f.c=g
g=f}x=18
return A.c(g,$async$qk)
case 18:u=3
x=17
break
case 15:u=14
a0=t
x=17
break
case 14:x=3
break
case 17:case 12:m.length===l||(0,A.G)(m),++h
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
return A.h($async$qk,w)},
Gm(){var x=0,w=A.i(y.cO),v,u=2,t,s=this,r,q,p
var $async$Gm=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:x=3
return A.c(s.qk(),$async$Gm)
case 3:if(!e){v=null
x=1
break}u=5
x=8
return A.c(s.Au(),$async$Gm)
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
return A.h($async$Gm,w)},
xc(){var x=0,w=A.i(y.y),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0,a1
var $async$xc=A.d(function(a2,a3){if(a2===1){t=a3
x=u}while(true)switch(x){case 0:if(s.a==null||s.y){v=!1
x=1
break}if(s.ay){v=!0
x=1
break}if(A.by()===C.au){v=!1
x=1
break}r=s.as
if(r==null){v=!1
x=1
break}q=null
u=4
$.aoO()
x=7
return A.c(new B.NP().Cq(A.X(["video",!0,"audio",!1],y.N,y.z)),$async$xc)
case 7:q=a3
p=J.bDO(q)
if(J.aB(p)===0){v=!1
x=1
break}o=J.k9(p)
l=s.b
k=l==null?null:l.pL(0)
n=k==null?D.Bd:k
s.ax=J.aB(n)!==0?J.k9(n):null
x=8
return A.c(r.Up(o),$async$xc)
case 8:s.at=q
s.ay=!0
s.d.sxW(0,q)
x=9
return A.c(s.z8(),$async$xc)
case 9:o.c=new B.aQv(s)
v=!0
x=1
break
u=2
x=6
break
case 4:u=3
a0=t
l=q
l=l==null?null:J.bDN(l)
if(l==null)l=C.Q
i=l.length
h=y.c
g=y._
f=0
case 10:if(!(f<l.length)){x=12
break}m=l[f]
u=14
e=J.a_n(m)
if(!g.b(e)){d=new A.ap($.as,h)
d.a=8
d.c=e
e=d}x=17
return A.c(e,$async$xc)
case 17:u=3
x=16
break
case 14:u=13
a1=t
x=16
break
case 13:x=3
break
case 16:case 11:l.length===i||(0,A.G)(l),++f
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
return A.h($async$xc,w)},
zY(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$zY=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(!s.ay){x=1
break}o=s.ay=!1
u=4
r=s.as
q=s.ax
x=(r!=null?q!=null:o)?7:8
break
case 7:x=9
return A.c(r.Up(q),$async$zY)
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
o=o==null?null:o.CB(0)
if(o==null)o=C.Q
m=o.length
l=y.c
k=y._
j=0
case 10:if(!(j<o.length)){x=12
break}p=o[j]
u=14
i=J.a_n(p)
if(!k.b(i)){h=new A.ap($.as,l)
h.a=8
h.c=i
i=h}x=17
return A.c(i,$async$zY)
case 17:u=2
x=16
break
case 14:u=13
f=t
x=16
break
case 13:x=2
break
case 16:case 11:o.length===m||(0,A.G)(o),++j
x=10
break
case 12:s.ax=s.at=null
s.d.sxW(0,s.b)
case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$zY,w)},
LA(){var x=0,w=A.i(y.P),v,u=2,t,s=this,r,q,p,o,n
var $async$LA=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:o=s.a
if(o==null||s.y){v=C.aZ
x=1
break}u=4
x=7
return A.c(J.bSz(o),$async$LA)
case 7:r=e
q=B.car(r,s.Q)
s.Q=q
A.os().$1("Appel : statistiques : "+B.bN4(q))
v=q
x=1
break
u=2
x=6
break
case 4:u=3
n=t
v=C.aZ
x=1
break
x=6
break
case 3:x=2
break
case 6:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$LA,w)},
hw(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0
var $async$hw=A.d(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
s.ay=!1
p=s.at
p=p==null?null:p.CB(0)
if(p==null)p=C.Q
o=p.length
n=y.c
m=y._
l=0
case 3:if(!(l<p.length)){x=5
break}r=p[l]
u=7
k=J.a_n(r)
if(!m.b(k)){j=new A.ap($.as,n)
j.a=8
j.c=k
k=j}x=10
return A.c(k,$async$hw)
case 10:u=2
x=9
break
case 7:u=6
h=t
x=9
break
case 6:x=2
break
case 9:case 4:p.length===o||(0,A.G)(p),++l
x=3
break
case 5:s.ch=s.as=s.ax=s.at=null
u=12
x=15
return A.c(B.a5v(!1),$async$hw)
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
return A.c(y.x.b(p)?p:A.cM(p,y.H),$async$hw)
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
p=p==null?null:p.CB(0)
if(p==null)p=C.Q
o=p.length
l=0
case 21:if(!(l<p.length)){x=23
break}q=p[l]
u=25
k=J.a_n(q)
if(!m.b(k)){j=new A.ap($.as,n)
j.a=8
j.c=k
k=j}x=28
return A.c(k,$async$hw)
case 28:u=2
x=27
break
case 25:u=24
e=t
x=27
break
case 24:x=2
break
case 27:case 22:p.length===o||(0,A.G)(p),++l
x=21
break
case 23:s.b=null
u=30
x=33
return A.c(s.d.n(),$async$hw)
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
return A.c(s.e.n(),$async$hw)
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
return A.h($async$hw,w)}}
B.a16.prototype={
gb1q(){return this.b!=null&&!this.e},
QE(d,e){return this.b1r(d,e)},
b1r(d,e){var x=0,w=A.i(y.H),v=this
var $async$QE=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:v.x=d
v.y=e
v.e=!1
v.f=0
x=2
return A.c(v.Dr(),$async$QE)
case 2:return A.f(null,w)}})
return A.h($async$QE,w)},
Dr(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Dr=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.e){x=1
break}r=s.x
if(r==null||J.aB(r)===0){x=1
break}u=4
q=B.bSY(B.bye(A.cI(r,0,null),null))
s.b=q
x=7
return A.c(q.f.a,$async$Dr)
case 7:s.f=0
p=s.y
if(p!=null&&J.aB(p)!==0)try{o=y.N
q.gjy().a.C(0,C.ab.hd(A.X(["type","auth","jeton",p],o,o),null))}catch(l){}o=q.r.b
o===$&&A.b()
o=o.b
o===$&&A.b()
s.c=new A.cJ(o,A.v(o).i("cJ<1>")).bp(s.gaSY(),!0,s.gaRv(),new B.atv(s))
u=2
x=6
break
case 4:u=3
m=t
s.Zj()
x=6
break
case 3:x=2
break
case 6:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$Dr,w)},
aSZ(d){var x,w,v,u
try{x=C.ab.eg(0,J.q(d),null)
v=y.P
if(!v.b(x))return
if(!J.n(J.o(x,"type"),"signal_appel"))return
w=J.o(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.C(0,B.bAi(w))}catch(u){}},
Zj(){var x,w=this,v=w.c
if(v!=null)v.a0(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.C(0,null)
return}x=D.aeJ[v]
w.f=v+1
v=w.d
if(v!=null)v.a0(0)
w.d=A.d0(A.cp(0,0,0,x),new B.atw(w))},
HI(){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q
var $async$HI=A.d(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.a0(0)
s=t.c
s=s==null?null:s.a0(0)
x=2
return A.c(y.x.b(s)?s:A.cM(s,y.H),$async$HI)
case 2:t.c=null
v=4
s=t.b
s=s==null?null:s.gjy().ap(0)
x=7
return A.c(y._.b(s)?s:A.cM(s,y.z),$async$HI)
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
return A.h($async$HI,w)}}
B.a4H.prototype={
qV(d){return this.b9g(d)},
b9g(d){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q,p
var $async$qV=A.d(function(e,f){if(e===1){u=f
x=v}while(true)switch(x){case 0:v=3
r=t.a
x=6
return A.c((r==null?t.a=A.a_W():r).aS(0),$async$qV)
case 6:r=t.a
r.toString
x=7
return A.c(r.uG(A.CF(A.cI("asset:///"+d,0,null),null,null),null,!0),$async$qV)
case 7:x=8
return A.c(t.a.iD(C.Gv),$async$qV)
case 8:x=9
return A.c(t.a.hV(1),$async$qV)
case 9:x=10
return A.c(t.a.e6(0),$async$qV)
case 10:v=1
x=5
break
case 3:v=2
p=u
s=A.ag(p)
A.os().$1("Sonnerie appel : lecture impossible ("+d+") : "+A.u(s))
x=5
break
case 2:x=1
break
case 5:return A.f(null,w)
case 1:return A.e(u,w)}})
return A.h($async$qV,w)},
e3(){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q
var $async$e3=A.d(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
s=s==null?null:s.aS(0)
x=6
return A.c(y.x.b(s)?s:A.cM(s,y.H),$async$e3)
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
return A.h($async$e3,w)},
hw(){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q
var $async$hw=A.d(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
s=s==null?null:s.n()
x=6
return A.c(y.x.b(s)?s:A.cM(s,y.H),$async$hw)
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
return A.h($async$hw,w)}}
B.aLz.prototype={
a1j(d,e){return this.b2P(d,e)},
b2P(d,e){var x=0,w=A.i(y.Y),v,u,t,s,r
var $async$a1j=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.X(["mandatory",A.C(r,r),"optional",A.a([A.X(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.T)],t,y.K)}r=self.RTCPeerConnection
t=A.lg(u,y.N,y.z)
t.E(0,d)
s=new r(y.m.a(A.bp(t)))
t=J.q(s)
v=B.bZw(C.dS.gp_().bZ(new A.eV(t)),s)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$a1j,w)}}
B.ny.prototype={
KM(d){var x=A.a([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.cs(w,A.Z(w).i("cs<1,ah>"))
J.fz(w,new B.aH6(x))
return x},
pL(d){var x=A.a([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.cs(w,A.Z(w).i("cs<1,ah>"))
J.fz(w,new B.aH7(x))
return x},
CB(d){var x=A.H(this.KM(0),!0,y.G)
C.c.E(x,this.pL(0))
return x}}
B.a5c.prototype={
ay1(d){var x=this,w=x.d
w.addEventListener("ended",A.bs(new B.aH3(x)))
w.addEventListener("mute",A.bs(new B.aH4(x)))
w.addEventListener("unmute",A.bs(new B.aH5(x)))},
skp(d,e){this.d.enabled=e},
PY(d,e){return this.b_l(0,e)},
b_l(d,e){var x=0,w=A.i(y.H),v=this
var $async$PY=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:x=2
return A.c(A.cS(v.d.applyConstraints(y.m.a(A.bp(e))),y.X),$async$PY)
case 2:return A.f(null,w)}})
return A.h($async$PY,w)},
aS(d){var x=0,w=A.i(y.H),v=this
var $async$aS=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.f(null,w)}})
return A.h($async$aS,w)}}
B.NP.prototype={
xJ(d,e){return this.aqd(0,e)},
aqd(d,e){var x=0,w=A.i(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$xJ=A.d(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.c9c())if(y.f.b(e.h(0,"video"))&&J.o(e.h(0,"video"),"facingMode")!=null)J.hs(e.h(0,"video"),"facingMode")
e.bW(0,"video",new B.aGT())
e.bW(0,"audio",new B.aGU())}catch(a0){A.or("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.ma(e.h(0,"audio"),i,i).aA(0,"optional")&&y.F.b(J.o(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.o(e.h(0,"audio"),"optional")
r=A.C(y.N,y.z)
J.fz(s,new B.aGV(r))
J.hs(e.h(0,"audio"),"optional")
J.mU(e.h(0,"audio"),r)}}catch(a0){q=A.ag(a0)
p=A.aZ(a0)
A.or("[getUserMedia] failed to translate optional audio constraints, "+A.u(q)+", "+A.u(p))}i=self
o=i.window.navigator.mediaDevices
h=y.m
x=o.getUserMedia!=null?7:9
break
case 7:n=A.bp(e)
x=10
return A.c(A.cS(o.getUserMedia(h.a(n)),h),$async$xJ)
case 10:m=a2
v=new B.ny(m,"local")
x=1
break
x=8
break
case 9:i=i.window.navigator.mediaDevices
g=e.h(0,"audio")
x=11
return A.c(A.cS(i.getUserMedia({video:e.h(0,"video"),audio:g}),h),$async$xJ)
case 11:l=a2
v=new B.ny(l,"local")
x=1
break
case 8:u=2
x=6
break
case 4:u=3
f=t
k=A.ag(f)
i=J.q(k)
throw A.j("Unable to getUserMedia: "+i)
x=6
break
case 3:x=2
break
case 6:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$xJ,w)},
Cq(d){return this.apE(d)},
apE(d){var x=0,w=A.i(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j
var $async$Cq=A.d(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:u=4
n=self
s=n.window.navigator.mediaDevices
x=s.getDisplayMedia!=null?7:9
break
case 7:r=A.bp(d)
n=y.m
x=10
return A.c(A.cS(s.getDisplayMedia(n.a(r)),n),$async$Cq)
case 10:q=f
v=new B.ny(q,"local")
x=1
break
x=8
break
case 9:n=n.window.navigator.mediaDevices
m=y.N
m=A.bp(A.X(["mediaSource","screen"],m,m))
m.toString
l=d.h(0,"audio")
if(l==null)l=!1
x=11
return A.c(A.cS(n.getUserMedia({video:m,audio:l}),y.m),$async$Cq)
case 11:p=f
v=new B.ny(p,"local")
x=1
break
case 8:u=2
x=6
break
case 4:u=3
j=t
o=A.ag(j)
n=J.q(o)
throw A.j("Unable to getDisplayMedia: "+n)
x=6
break
case 3:x=2
break
case 6:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$Cq,w)}}
B.a7d.prototype={
ayb(d,e){var x=this,w=x.at
w===$&&A.b()
w.addEventListener("datachannel",A.bs(new B.aLB(x)))
w.addEventListener("icecandidate",A.bs(new B.aLC(x)))
w.addEventListener("iceconnectionstatechange",A.bs(new B.aLD(x)))
w.onicegatheringstatechange=A.bs(new B.aLE(x))
w.addEventListener("signalingstatechange",A.bs(new B.aLF(x)))
if(!$.bCF())w.addEventListener("connectionstatechange",A.bs(new B.aLG(x)))
w.addEventListener("negotiationneeded",A.bs(new B.aLH(x)))
w.addEventListener("track",A.bs(new B.aLI(x)))},
QO(d){var x=0,w=A.i(y.v),v,u=this,t,s
var $async$QO=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.b()
x=3
return A.c(A.cS(s.createOffer(y.m.a(A.bp(A.C(y.N,y.z)))),y.A),$async$QO)
case 3:t=f
v=new B.Ae(t.sdp,t.type)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$QO,w)},
QL(d){var x=0,w=A.i(y.v),v,u=this,t,s
var $async$QL=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.b()
x=3
return A.c(A.cS(s.createAnswer(y.m.a(A.bp(A.C(y.N,y.z)))),y.A),$async$QL)
case 3:t=f
v=new B.Ae(t.sdp,t.type)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$QL,w)},
CO(d,e){return this.ard(0,e)},
ard(d,e){var x=0,w=A.i(y.H),v=this,u
var $async$CO=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.b()
x=2
return A.c(A.cS(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$CO)
case 2:return A.f(null,w)}})
return A.h($async$CO,w)},
CR(d,e){return this.aru(0,e)},
aru(d,e){var x=0,w=A.i(y.H),v=this,u
var $async$CR=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.b()
x=2
return A.c(A.cS(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$CR)
case 2:return A.f(null,w)}})
return A.h($async$CR,w)},
PD(d){return this.aZw(d)},
aZw(d){var x=0,w=A.i(y.H),v=this,u,t
var $async$PD=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.b()
u=d.b
u.toString
x=2
return A.c(A.cS(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$PD)
case 2:return A.f(null,w)}})
return A.h($async$PD,w)},
KY(d){var x=0,w=A.i(y.J),v,u=this,t,s,r
var $async$KY=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:r=u.at
r===$&&A.b()
x=3
return A.c(A.cS(r.getStats(),y.m),$async$KY)
case 3:t=f
s=A.a([],y.o)
t.forEach.apply(t,[A.ZG(new B.aLJ(s))])
v=s
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$KY,w)},
ap(d){var x=0,w=A.i(y.H),v,u=this,t
var $async$ap=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.b()
t.close()
v=A.d6(null,y.H)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$ap,w)},
PK(d,e,f){return this.aZT(0,e,f)},
aZT(d,e,f){var x=0,w=A.i(y.e),v,u=this,t
var $async$PK=A.d(function(g,h){if(g===1)return A.e(h,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.b()
v=new B.a7f(t.addTrack(e.d,f.e))
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$PK,w)}}
B.a7f.prototype={
Up(d){return this.be0(d)},
be0(d){var x=0,w=A.i(y.H),v=this,u,t,s,r
var $async$Up=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:try{u=d
s=u.d
v.a.replaceTrack(s)}catch(q){s=A.ag(q)
if(y.L.b(s)){t=s
throw A.j("Unable to RTCRtpSender::replaceTrack: "+J.q(t))}else throw q}return A.f(null,w)}})
return A.h($async$Up,w)},
CQ(d){return this.arl(d)},
arl(d){var x=0,w=A.i(y.y),v,u=2,t,s=this,r,q,p,o,n,m,l
var $async$CQ=A.d(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:u=4
p=s.a
r=p.getParameters()
o=d.d
n=A.Z(o).i("ad<1,ao<l,@>>")
n=A.bp(A.H(new A.ad(o,new B.aLO(),n),!0,n.i("aE.E")))
o=n==null?A.bp([]):n
r.encodings=y.r.a(o)
x=7
return A.c(A.cS(p.setParameters(r),y.X),$async$CQ)
case 7:x=8
return A.c(A.d6(!0,y.y),$async$CQ)
case 8:p=f
v=p
x=1
break
u=2
x=6
break
case 4:u=3
l=t
p=A.ag(l)
if(y.L.b(p)){q=p
throw A.j("Unable to RTCRtpSender::setParameters: "+J.q(q))}else throw l
x=6
break
case 3:x=2
break
case 6:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$CQ,w)}}
B.bA8.prototype={
aS(d){var x=0,w=A.i(y.H),v=this,u,t,s
var $async$aS=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.ag(r)
if(y.L.b(s)){u=s
s=u
J.q(s)
throw A.j("Unable to RTCRtpTransceiver::stop: "+A.u(s))}else throw r}return A.f(null,w)}})
return A.h($async$aS,w)}}
B.PM.prototype={
samq(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.B7()
if(x!=null)x.style.objectFit=e},
agE(){var x=this,w=x.B7(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sl(0,v.ajs(u,x.z!=null,0,t))},
sxW(d,e){var x,w,v,u,t=this
if(e==null){x=t.B7()
if(x!=null)x.srcObject=null
x=t.w
if(x!=null)x.srcObject=null
t.z=null
return}t.z=e
if(e.pL(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.ab(y.l.b(x)?x:new A.cs(x,A.Z(x).i("cs<1,ah>")))
for(;x.t();){w=x.gG(x)
t.x.addTrack(w)}}if(e.KM(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.ab(y.l.b(x)?x:new A.cs(x,A.Z(x).i("cs<1,ah>")))
for(;x.t();){w=x.gG(x)
t.y.addTrack(w)}}if(t.y!=null){if(t.w==null){v=self.document.createElement("audio")
v.id="audio_"+("RTCVideoRenderer-"+t.Q)
v.muted=e.b==="local"
v.autoplay=!0
t.w=v
x=t.aFw()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.B7()
if(u!=null){u.srcObject=t.x
x=t.B7()
x.toString
t.a7Q(x)}t.sl(0,t.a.b1R(t.z!=null))},
aFw(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
if(v!=null)return v
x=w.document.createElement("div")
x.id="html_webrtc_audio_manager_list"
x.style.display="none"
w=w.document.body
if(w!=null)w.append(x)
return x},
B7(){var x=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(x!=null)return x
return null},
n(){var x=0,w=A.i(y.H),v,u=this,t,s,r,q,p
var $async$n=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:u.z=null
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.G)(t),++r)t[r].a0(0)
q=u.B7()
t=q==null
if(!t)q.removeAttribute("src")
if(!t)q.load()
t=u.w
if(t!=null)t.remove()
p=self.document.getElementById("html_webrtc_audio_manager_list")
if(p!=null&&!p.hasChildNodes())p.remove()
v=u.eo()
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$n,w)},
iO(d){var x=0,w=A.i(y.H),v=this
var $async$iO=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:$.JN()
$.q7().uj("RTCVideoRenderer-"+v.Q,new B.aLU(v),!0)
return A.f(null,w)}})
return A.h($async$iO,w)},
a7Q(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.PO.prototype={
R(){return new B.PP()}}
B.PP.prototype={
Y(){var x,w,v=this
v.a8()
v.a.c.a9(0,v.gaOT())
x=v.a
w=x.c
w.as=x.e
w.samq(0,x.d===D.rG?"contain":"cover")},
aOU(){if(this.c!=null)this.q(new B.aLV())},
n(){if(this.c!=null)this.al()},
aW(d){var x,w
this.b9(d)
A.d0(A.cp(0,0,10,0),new B.aLX(this))
x=this.a
w=x.c
w.samq(0,x.d===D.rG?"contain":"cover")},
A(d){return new A.nu(new B.aLW(this),null)}}
B.a3q.prototype={
axJ(d,e,f,g){var x=this,w=$.as
x.a!==$&&A.aG()
x.a=new B.UX(d,x,new A.aV(new A.ap(w,y.c),y.u),e)
if(f.a.gi7())f.a=new B.Rk(g.i("@<0>").aM(g).i("Rk<1,2>")).jN(f.a)
w=A.i5(null,new B.aAm(f,x),null,!0,g)
x.b!==$&&A.aG()
x.b=w},
adm(){var x,w
this.d=!0
x=this.c
if(x!=null)x.a0(0)
w=this.b
w===$&&A.b()
w.ap(0)}}
B.UX.prototype={
C(d,e){if(this.e)throw A.j(A.a0("Cannot add event after closing."))
if(this.d)return
this.a.a.C(0,e)},
dE(d,e){if(this.e)throw A.j(A.a0("Cannot add event after closing."))
if(this.d)return
this.aHR(d,e)},
im(d){return this.dE(d,null)},
aHR(d,e){var x=this
if(x.w){x.a.a.dE(d,e)
return}x.c.jc(d,e)
x.adn()
x.b.adm()
x.a.a.ap(0).hI(new B.b3F())},
ap(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.adm()
x.c.cK(0,x.a.a.ap(0))}return x.c.a},
adn(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.d2(0)
return},
$idW:1}
B.a9H.prototype={}
B.a9I.prototype={}
B.xo.prototype={
a9_(d,e){var x=this.b
if((x.b&4)!==0)return
x.C(0,new B.Dd(d,e))
x.ap(0)},
a5Q(d){var x
if((this.b.b&4)!==0)throw A.j(B.bAQ())
x=A.bp(d)
x.toString
this.a.send(x)},
wd(d,e,f){return this.b16(0,e,f)},
b16(d,e,f){var x=0,w=A.i(y.H),v=this,u
var $async$wd=A.d(function(g,h){if(g===1)return A.e(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.j(B.bAQ())
u.ap(0)
v.a.close()
return A.f(null,w)}})
return A.h($async$wd,w)},
$ibAP:1}
B.rY.prototype={}
B.GZ.prototype={
k(d,e){if(e==null)return!1
return e instanceof B.GZ&&e.a===this.a},
gB(d){return C.e.gB(this.a)}}
B.CN.prototype={
k(d,e){var x,w,v,u
if(e==null)return!1
if(e instanceof B.CN&&e.a.length===this.a.length){for(x=this.a,w=x.length,v=e.a,u=0;u<w;++u)if(v[u]!==x[u])return!1
return!0}return!1},
gB(d){return A.fD(this.a)},
j(d){return"BinaryDataReceived("+A.u(this.a)+")"}}
B.Dd.prototype={
k(d,e){if(e==null)return!1
return e instanceof B.Dd&&e.a===this.a&&e.b===this.b},
gB(d){return A.fD([this.a,this.b])},
j(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.Hu.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketException"
else return"WebSocketException: "+x},
$ibi:1}
B.Ht.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+x}}
B.app.prototype={
gjy(){var x,w=this,v=w.w
if(v===$){x=w.r.b
x===$&&A.b()
x=x.a
x===$&&A.b()
v!==$&&A.aK()
v=w.w=new B.amm(w,x)}return v},
axt(d){d.hS(0,new B.apt(this),new B.apu(this),y.a)}}
B.amm.prototype={
ap(d){var x=this.b
x.e=x.d=null
return this.atc(0)}}
B.ab7.prototype={
j(d){return"WebSocketChannelException: "+this.a},
$ibi:1}
B.vx.prototype={
H(){return"RTCSignalingState."+this.b}}
B.PI.prototype={
H(){return"RTCIceGatheringState."+this.b}}
B.vv.prototype={
H(){return"RTCPeerConnectionState."+this.b}}
B.mo.prototype={
H(){return"RTCIceConnectionState."+this.b}}
B.a7g.prototype={
H(){return"RTCVideoViewObjectFit."+this.b}}
B.vw.prototype={
H(){return"RTCPriorityType."+this.b}}
B.aLy.prototype={}
B.NQ.prototype={}
B.F1.prototype={
j(d){var x=this.d
return"Track(id: "+A.u(x.id)+", kind: "+A.u(x.kind)+", label: "+A.u(x.label)+", enabled: "+A.u(x.enabled)+", muted: "+A.u(x.muted)+")"}}
B.aGR.prototype={}
B.FU.prototype={}
B.PJ.prototype={}
B.bA7.prototype={}
B.a7e.prototype={}
B.FV.prototype={}
B.FT.prototype={}
B.aLK.prototype={}
B.PK.prototype={}
B.aLP.prototype={}
B.Ae.prototype={}
B.RJ.prototype={}
B.PL.prototype={}
B.PN.prototype={
ajs(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.PN(x,w,v)},
b1R(d){return this.ajs(null,d,null,null)},
j(d){var x=this
return A.Q(x).j(0)+"(width: "+A.u(x.a)+", height: "+A.u(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["ak<~>()","~()","~(GB)","be(FU)","be(PL)","be(mo)","~(@)","ny(@)","FT(ah)","ao<l,@>(FV)","be(bAP)","~(rY)"])
B.aRx.prototype={
$0(){return J.bSf(this.a.b7())},
$S:1}
B.aRy.prototype={
$1(d){var x,w,v,u
try{this.b.C(0,this.a.$ti.y[1].a(d))}catch(v){u=A.ag(v)
if(y.i.b(u)){x=u
w=A.aZ(v)
this.b.dE(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.bvm.prototype={
$1(d){var x,w,v,u=$.bl().b
if(u==null||u.length===0)return
x=self
w=new x.Headers()
w.set("Authorization","Bearer "+A.u(u))
w.set("Content-Type","application/json")
v=y.N
x.window.fetch("https://connexion-prophetique.onrender.com/messagerie/appels/"+this.a+"/signaux",{method:"POST",headers:w,body:C.ab.hd(A.X(["type","termine","contenu",A.C(v,y.z)],v,y.K),null),keepalive:!0})},
$S:27}
B.bvl.prototype={
$0(){return self.window.removeEventListener("beforeunload",this.a)},
$S:0}
B.aqt.prototype={
$1(d){if(d==null)return null
return A.c9(J.q(d))},
$S:131}
B.b1v.prototype={
$0(){var x=this.a
if(x.c!=null)x.q(new B.b1u())},
$S:0}
B.b1u.prototype={
$0(){},
$S:0}
B.b1h.prototype={
$1(d){this.a.vd("candidat_ice",d,!1)},
$S:196}
B.b1i.prototype={
$0(){var x=this.a
if(x.c!=null)x.q(new B.b1g(x))},
$S:0}
B.b1g.prototype={
$0(){return this.a.go=!0},
$S:0}
B.b1j.prototype={
$0(){this.a.l4(A.x("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.b1k.prototype={
$0(){},
$S:0}
B.b1l.prototype={
$1(d){var x=this.a,w=x.ch
if(x.c!=null&&w!=null&&x.x)x.q(new B.b1f(x,w))},
$S:41}
B.b1f.prototype={
$0(){return this.a.CW=new A.aY(Date.now(),0,!1).f2(this.b)},
$S:0}
B.b1m.prototype={
$1(d){},
$S:183}
B.b1n.prototype={
$1(d){this.a.vi()},
$S:41}
B.b0V.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.x&&!x.y){if(x.a.f)x.vd("annule",C.aZ,!1)
x.l4(A.x("Pas de r\xe9ponse"))}},
$S:0}
B.b0Y.prototype={
$0(){var x=this.a
x.fy=x.a.d==="video"||x.at?A.x("Micro ou cam\xe9ra refus\xe9 : autorise le micro et la cam\xe9ra dans les r\xe9glages pour appeler en vid\xe9o."):A.x("Micro refus\xe9 : autorise le micro dans les r\xe9glages pour appeler.")},
$S:0}
B.b0Z.prototype={
$1(d){this.a.vd("candidat_ice",d,!1)},
$S:196}
B.b1_.prototype={
$0(){var x=this.a
if(x.c!=null)x.q(new B.b0X(x))},
$S:0}
B.b0X.prototype={
$0(){return this.a.go=!0},
$S:0}
B.b10.prototype={
$0(){this.a.l4(A.x("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.b11.prototype={
$0(){return this.a.z=!0},
$S:0}
B.b12.prototype={
$1(d){var x=this.a,w=x.ch
if(x.c!=null&&w!=null&&x.x)x.q(new B.b0W(x,w))},
$S:41}
B.b0W.prototype={
$0(){return this.a.CW=new A.aY(Date.now(),0,!1).f2(this.b)},
$S:0}
B.b13.prototype={
$1(d){},
$S:183}
B.b14.prototype={
$1(d){this.a.vi()},
$S:41}
B.b1p.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.Ol()},
$S:36}
B.b1q.prototype={
$1(d){this.a.l4(A.x("L\u2019appel n\u2019a pas pu aboutir."))},
$S:23}
B.b1r.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.XI("offre",d)},
$S:975}
B.b1s.prototype={
$1(d){this.a.l4(A.x("L\u2019appel n\u2019a pas pu aboutir."))},
$S:23}
B.b1e.prototype={
$0(){return this.a.at=!0},
$S:0}
B.b1b.prototype={
$0(){var x=this.a
x.x=!0
x.ch=new A.aY(Date.now(),0,!1)
x.CW=C.L},
$S:0}
B.b1c.prototype={
$0(){return this.a.id=!0},
$S:0}
B.b1d.prototype={
$1(d){var x=this.a.c
if(x!=null)A.aa(x,!1).cs()},
$S:4}
B.b1o.prototype={
$1(d){return A.C(y.N,y.z)},
$S:187}
B.b0R.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.b0P.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.b0Q.prototype={
$0(){return this.a.ay=this.b},
$S:0}
B.b0U.prototype={
$0(){return this.a.at=!0},
$S:0}
B.b0O.prototype={
$1(d){var x=null,w=A.m(A.x("Statistiques de l\u2019appel"),x,x,x,x,C.cI,x,x,x),v=this.a,u=A.fi(A.m(v,x,x,x,x,C.cI,x,x,x),x,C.x)
return A.de(A.a([A.bo(!1,A.m(A.x("Fermer"),x,x,x,x,x,x,x,x),x,x,C.o,x,x,x,x,new B.b0M(d),x,x),A.bo(!1,A.m(A.x("Copier"),x,x,x,x,x,x,x,x),x,x,C.o,x,x,x,x,new B.b0N(v,d),x,x)],y.p),D.oK,u,x,w)},
$S:18}
B.b0M.prototype={
$0(){return A.aa(this.a,!1).cs()},
$S:0}
B.b0N.prototype={
$0(){var x,w,v=null
A.Dc(new A.u4(this.a))
x=this.b
A.aa(x,!1).cs()
w=A.x("Statistiques copi\xe9es.")
x.K(y.q).f.X(A.az(v,v,v,v,v,C.j,v,A.m(w,v,v,v,v,v,v,v,v),v,C.p,v,v,v,v,v,v,v,v,v))},
$S:0}
B.b0S.prototype={
$0(){},
$S:0}
B.b0T.prototype={
$0(){},
$S:0}
B.b16.prototype={
$0(){var x=this.a,w=x.c
w.toString
A.aa(w,!1).cs()
x.Dx()},
$S:0}
B.b17.prototype={
$0(){var x=this.a,w=x.c
w.toString
A.aa(w,!1).cs()
x.Dz()},
$S:0}
B.b18.prototype={
$0(){var x=this.a,w=x.c
w.toString
A.aa(w,!1).cs()
x.Dh()},
$S:0}
B.b19.prototype={
$0(){var x=this.a,w=x.c
w.toString
A.aa(w,!1).T2().bd(0,new B.b15(x),y.H)},
$S:0}
B.b15.prototype={
$1(d){return this.a.aeq()},
$S:12}
B.b1a.prototype={
$1(d){return A.fF(!0,A.a7(this.a,C.m,C.h,C.I),C.X,!0)},
$S:238}
B.b1t.prototype={
$2(d,e){if(!d)this.a.Fj()},
$S:207}
B.bka.prototype={
$2(d,e){var x,w,v,u=null,t=this.a,s=t.d
s===$&&A.b()
s=s.x
s===$&&A.b()
t=t.a.e
x=t?0.07:0.04
t=t?0.55:0.35
w=this.b
v=w+20
s=A.bJF(A.af(u,u,C.i,u,u,new A.ar(u,u,A.d3(C.w.ck(t*(1-s)),3),u,u,u,C.bj),u,v,u,u,u,u,u,v),1+x*s)
w+=8
w=A.af(u,u,C.i,u,u,new A.ar(u,u,A.d3(C.w,2),u,u,u,C.bj),u,w,u,u,u,u,u,w)
e.toString
return A.f9(C.P,A.a([s,w,e],y.p),C.j,C.b7,u)},
$S:976}
B.bvK.prototype={
$3(d,e,f){if(e==null)return d+" : inconnu"
if(typeof e=="number")return d+" : "+C.d.aL(e,1)+f
return d+" : "+A.u(e)+f},
$2(d,e){return this.$3(d,e,"")},
$S:977}
B.aQw.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.X(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+3}
B.aQx.prototype={
$1(d){var x=d.b,w=x.length!==0?C.c.gS(x):null
if(w!=null)this.a.aE1(w)
if(d.c.d.kind==="video"){x=this.a.r
if(x!=null)x.$0()}},
$S:z+4}
B.aQy.prototype={
$1(d){var x
if(d===D.Lg){x=this.a.w
if(x!=null)x.$0()}},
$S:z+5}
B.aQv.prototype={
$0(){var x=this.a
if(x.ay){x.zY()
x=x.ch
if(x!=null)x.$0()}},
$S:24}
B.atv.prototype={
$1(d){return this.a.Zj()},
$S:16}
B.atw.prototype={
$0(){var x=this.a
if(!x.e)x.Dr()},
$S:0}
B.bwa.prototype={
$1(d){return d.length!==0},
$S:11}
B.aH6.prototype={
$1(d){return this.a.push(B.bzx(d))},
$S:16}
B.aH7.prototype={
$1(d){return this.a.push(B.bzx(d))},
$S:16}
B.aH3.prototype={
$1(d){var x=this.a.c
if(x!=null)x.$0()},
$S:19}
B.aH4.prototype={
$1(d){},
$S:19}
B.aH5.prototype={
$1(d){},
$S:19}
B.aGT.prototype={
$0(){return!1},
$S:43}
B.aGU.prototype={
$0(){return!1},
$S:43}
B.aGV.prototype={
$1(d){J.fz(d,new B.aGS(this.a))},
$S:196}
B.aGS.prototype={
$2(d,e){this.a.m(0,d,e)},
$S:44}
B.aLB.prototype={
$1(d){},
$S:19}
B.aLC.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.FU(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:19}
B.aLD.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.b()
v=B.c8O(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.bCF())switch(w.cx.a){case 0:w.cy=D.Ll
break
case 1:w.cy=D.Lm
break
case 3:w.cy=D.Ln
break
case 5:w.cy=D.Lj
break
case 6:w.cy=D.Lk
break
case 7:w.cy=D.rE
break
default:break}},
$S:28}
B.aLE.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.b()
x.CW=B.c8P(w.iceGatheringState)},
$S:28}
B.aLF.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.b()
x.ch=B.caF(w.signalingState)},
$S:28}
B.aLG.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.b()
x.cy=B.cah(w.connectionState)},
$S:28}
B.aLH.prototype={
$1(d){},
$S:28}
B.aLI.prototype={
$1(d){var x,w,v=this.a,u=v.Q
if(u!=null){x=B.bzx(d.track)
w=d.streams
w=y.l.b(w)?w:new A.cs(w,A.Z(w).i("cs<1,ah>"))
v=J.eu(w,new B.aLA(v),y.h)
u.$1(new B.PL(A.H(v,!0,v.$ti.i("aE.E")),x))}},
$S:19}
B.aLA.prototype={
$1(d){return new B.ny(d,this.a.as)},
$S:z+7}
B.aLJ.prototype={
$2(d,e){var x,w,v=y.M.a(A.Cg(d)),u=A.C(y.N,y.z)
for(x=v.gei(v),x=x.ga_(x);x.t();){w=x.gG(x)
u.m(0,J.q(w.a),w.b)}this.a.push(new B.RJ(d.type,u))},
$S:978}
B.aLN.prototype={
$1(d){var x="id",w=y.f.a(A.Cg(d)),v=J.d2(w)
if(v.aA(w,x))v.m(w,x,C.d.u(A.iV(v.h(w,x))))
v.h(w,"uri")
v.h(w,x)
v.h(w,"encrypted")
return new B.FT()},
$S:z+8}
B.aLM.prototype={
$1(d){var x,w,v,u,t,s,r,q,p,o=null,n="numTemporalLayers",m="scaleResolutionDownBy",l=A.Cg(d.rid),k=d.active,j=d.maxBitrate
j=j==null?o:A.b0(j)
x=d.maxFramerate
x=x==null?o:A.b0(x)
w=d.minBitrate
w=w==null?o:A.b0(w)
v=d.numTemporalLayers
v=v==null?o:A.b0(v)
u=d.scaleResolutionDownBy
if(u==null)u=o
t=d.ssrc
t=t==null?o:A.b0(t)
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
k=B.bO6(p.h(0,"priority"))
l=k==null?D.rF:k
this.a.push(new B.FV(q,r,s,u,t,v,w,x,j,l,B.bO6(p.h(0,"networkPriority"))))},
$S:16}
B.aLL.prototype={
$1(d){var x,w,v,u,t,s=null,r=d.payloadType,q=d.name
if(q==null)q=s
x=d.kind
if(x==null)x=s
w=d.clockRate
v=d.numChannels
v=v==null?s:A.b0(v)
u=d.parameters
u=u==null?s:A.Cg(u)
t=y.z
t=A.X(["payloadType",r,"name",q,"kind",x,"clockRate",w,"numChannels",v,"parameters",u],t,t)
t.h(0,"payloadType")
t.h(0,"name")
t.h(0,"kind")
t.h(0,"clockRate")
t.h(0,"numChannels")
t.h(0,"parameters")
this.a.push(new B.a7e())},
$S:16}
B.aLO.prototype={
$1(d){var x,w,v=A.C(y.N,y.z)
v.m(0,"active",d.b)
x=d.a
if(x!=null)v.m(0,"rid",x)
x=d.c
if(x!=null)v.m(0,"maxBitrate",x)
x=d.e
if(x!=null)v.m(0,"maxFramerate",x)
x=d.d
if(x!=null)v.m(0,"minBitrate",x)
x=d.f
if(x!=null)v.m(0,"numTemporalLayers",x)
x=d.r
if(x!=null)v.m(0,"scaleResolutionDownBy",x)
x=d.x
if(x!=null)v.m(0,"scalabilityMode",x)
x=d.w
if(x!=null)v.m(0,"ssrc",x)
x=$.bS4()
v.m(0,"priority",x.h(0,d.y))
w=d.z
if(w!=null)v.m(0,"networkPriority",x.h(0,w))
return v},
$S:z+9}
B.bwi.prototype={
$1(d){return J.iY(self.window.navigator.userAgent,A.bH(d,!1,!1))},
$S:11}
B.aLU.prototype={
$1(d){var x,w,v,u,t
for(x=this.a,w=x.at,v=w.length,u=0;u<w.length;w.length===v||(0,A.G)(w),++u)w[u].a0(0)
C.c.aa(w)
t=self.document.createElement("video")
t.autoplay=!0
t.muted=!0
t.controls=!1
t.srcObject=x.x
t.id="video_"+("RTCVideoRenderer-"+x.Q)
t.setAttribute("playsinline","true")
x.a7Q(t)
v=y.bU.c
w.push(A.h8(t,"canplay",new B.aLQ(x),!1,v))
w.push(A.h8(t,"resize",new B.aLR(x),!1,v))
w.push(A.h8(t,"error",new B.aLS(t),!1,v))
w.push(A.h8(t,"ended",new B.aLT(),!1,v))
return t},
$S:136}
B.aLQ.prototype={
$1(d){this.a.agE()},
$S:16}
B.aLR.prototype={
$1(d){this.a.agE()},
$S:16}
B.aLS.prototype={
$1(d){var x,w,v=this.a.error
A.or("RTCVideoRenderer: videoElement.onError, "+J.q(v))
v.toString
x=C.GA.h(0,A.a5(v,"code"))
x.toString
w=!J.n(A.a5(v,"message"),"")?A.a5(v,"message"):"No further diagnostic information can be determined or provided."
throw A.j(A.nH(x,C.Gz.h(0,A.a5(v,"code")),w,null))},
$S:27}
B.aLT.prototype={
$1(d){},
$S:16}
B.aLV.prototype={
$0(){},
$S:0}
B.aLX.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aLW.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.aB9("RTCVideoRenderer-"+w.Q)
else w=A.af(x,x,C.i,x,x,x,x,x,x,x,x,x,x,x)
return A.cW(A.af(x,w,C.i,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:979}
B.aAm.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.b()
v.c=x.hx(w.gl6(w),new B.aAl(v),w.gqj())},
$S:0}
B.aAl.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.b()
w.adn()
x=x.b
x===$&&A.b()
x.ap(0)},
$S:0}
B.b3F.prototype={
$1(d){},
$S:23}
B.ass.prototype={
$1(d){this.a.cK(0,this.b)},
$S:19}
B.ast.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.hb(new B.Hu("Failed to connect WebSocket"))
else this.b.a9_(1006,"error")},
$S:19}
B.asu.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.cb("data")
if(typeof x==="string")w.b=new B.GZ(A.bx(x))
else if(typeof x==="object"&&A.bGT(y.m.a(x),"ArrayBuffer"))w.b=new B.CN(A.Of(y.R.a(x),0,null))
else throw A.j(A.a0("unexpected message type: "+J.aq(x).j(0)))
v.C(0,w.b7())},
$S:27}
B.asv.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.cK(0,this.b)
this.b.a9_(d.code,d.reason)},
$S:19}
B.apt.prototype={
$1(d){var x=d.b,w=this.a
new A.cJ(x,A.v(x).i("cJ<1>")).d9(new B.apq(w))
x=w.r.a
x===$&&A.b()
x=x.b
x===$&&A.b()
new A.cJ(x,A.v(x).i("cJ<1>")).b9y(new B.apr(d),new B.aps(w,d))
w.f.d2(0)},
$S:z+10}
B.apq.prototype={
$1(d){var x,w,v
$label0$0:{x=d instanceof B.GZ
w=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.b()
x=x.a
x===$&&A.b()
x.C(0,w)
break $label0$0}x=d instanceof B.CN
v=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.b()
x=x.a
x===$&&A.b()
x.C(0,v)
break $label0$0}if(d instanceof B.Dd){x=this.a.r.a
x===$&&A.b()
x=x.a
x===$&&A.b()
x.ap(0)}}},
$S:z+11}
B.apr.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.an(B.bAQ())
s=A.bp(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.k.b(x)
if(t)v=x
if(t){this.a.a5Q(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.a5Q(new Uint8Array(A.bu(u)))
break $label1$1}t=A.aM("Cannot send "+J.aq(d).j(0))
throw A.j(t)}}catch(r){if(!(A.ag(r) instanceof B.Ht))throw r}},
$S:13}
B.aps.prototype={
$0(){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q
var $async$$0=A.d(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
x=6
return A.c(t.b.wd(0,s.d,s.e),$async$$0)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(!(A.ag(q) instanceof B.Ht))throw q
x=5
break
case 2:x=1
break
case 5:return A.f(null,w)
case 1:return A.e(u,w)}})
return A.h($async$$0,w)},
$S:1}
B.apu.prototype={
$1(d){var x,w=d instanceof A.Sq?d:new B.ab7(J.q(d)),v=this.a
v.f.hb(w)
v=v.r.a
v===$&&A.b()
x=v.a
x===$&&A.b()
x.im(w)
v=v.a
v===$&&A.b()
v.ap(0)},
$S:28};(function aliases(){var x=B.DL.prototype
x.atc=x.ap
x=B.Zn.prototype
x.awP=x.n})();(function installTearOffs(){var x=a._instance_1u,w=a._instance_0u
var v
x(v=B.Uq.prototype,"gagv","agw",2)
w(v,"gae6","Fj",0)
w(v,"gaep","aeq",1)
w(v,"ga88","Mb",0)
w(v,"ga87","Ma",0)
w(v,"ga85","M9",0)
w(v,"ga86","Dx",0)
w(v,"ga89","Mc",0)
w(v,"gads","aPG",1)
x(v=B.a16.prototype,"gaSY","aSZ",6)
w(v,"gaRv","Zj",1)
w(B.PM.prototype,"gdO","n",0)
w(B.PP.prototype,"gaOT","aOU",1)})();(function inheritance(){var x=a.mixinHard,w=a.inheritMany,v=a.inherit
w(A.P,[B.DL,B.aqr,B.GB,B.a1p,B.aQu,B.a16,B.a4H,B.aLy,B.NQ,B.F1,B.aGR,B.PJ,B.PK,B.aLP,B.a9I,B.UX,B.a9H,B.xo,B.rY,B.Hu,B.ab7,B.FU,B.bA7,B.a7e,B.FV,B.FT,B.aLK,B.Ae,B.RJ,B.PL,B.PN])
v(B.Rk,A.fj)
w(A.xz,[B.aRx,B.bvl,B.b1v,B.b1u,B.b1i,B.b1g,B.b1j,B.b1k,B.b1f,B.b0V,B.b0Y,B.b1_,B.b0X,B.b10,B.b11,B.b0W,B.b1e,B.b1b,B.b1c,B.b0R,B.b0P,B.b0Q,B.b0U,B.b0M,B.b0N,B.b0S,B.b0T,B.b16,B.b17,B.b18,B.b19,B.aQv,B.atw,B.aGT,B.aGU,B.aLV,B.aLX,B.aAm,B.aAl,B.aps])
w(A.oG,[B.aRy,B.bvm,B.aqt,B.b1h,B.b1l,B.b1m,B.b1n,B.b0Z,B.b12,B.b13,B.b14,B.b1p,B.b1q,B.b1r,B.b1s,B.b1d,B.b1o,B.b0O,B.b15,B.b1a,B.bvK,B.aQw,B.aQx,B.aQy,B.atv,B.bwa,B.aH6,B.aH7,B.aH3,B.aH4,B.aH5,B.aGV,B.aLB,B.aLC,B.aLD,B.aLE,B.aLF,B.aLG,B.aLH,B.aLI,B.aLA,B.aLN,B.aLM,B.aLL,B.aLO,B.bwi,B.aLU,B.aLQ,B.aLR,B.aLS,B.aLT,B.b3F,B.ass,B.ast,B.asu,B.asv,B.apt,B.apq,B.apr,B.apu])
w(A.T,[B.ub,B.IH,B.PO])
w(A.U,[B.Uq,B.Zn,B.PP])
w(A.L6,[B.b1t,B.bka,B.aGS,B.aLJ,B.aLW])
w(A.a3,[B.ad2,B.Tt,B.wn])
v(B.ahi,B.Zn)
v(B.aLz,B.aLy)
v(B.ny,B.NQ)
v(B.a5c,B.F1)
v(B.NP,B.aGR)
v(B.a7d,B.PJ)
v(B.a7f,B.PK)
v(B.bA8,B.aLP)
v(B.PM,A.dm)
w(B.a9I,[B.a3q,B.app])
w(B.rY,[B.GZ,B.CN,B.Dd])
v(B.Ht,B.Hu)
v(B.amm,B.DL)
w(A.aeA,[B.vx,B.PI,B.vv,B.mo,B.a7g,B.vw])
x(B.Zn,A.h5)})()
A.alZ(b.typeUniverse,JSON.parse('{"DL":{"dW":["1"]},"Rk":{"fj":["1","2"],"fj.S":"1","fj.T":"2"},"IH":{"T":[],"k":[]},"ub":{"T":[],"k":[]},"Uq":{"U":["ub"]},"ad2":{"a3":[],"k":[]},"Tt":{"a3":[],"k":[]},"wn":{"a3":[],"k":[]},"ahi":{"U":["IH"]},"ny":{"NQ":[]},"a5c":{"F1":[]},"a7d":{"PJ":[]},"a7f":{"PK":[]},"PM":{"dm":["PN"],"aN":[]},"PO":{"T":[],"k":[]},"PP":{"U":["PO"]},"UX":{"dW":["1"]},"xo":{"bAP":[]},"GZ":{"rY":[]},"CN":{"rY":[]},"Dd":{"rY":[]},"Hu":{"bi":[]},"Ht":{"bi":[]},"amm":{"dW":["@"]},"ab7":{"bi":[]}}'))
A.bKW(b.typeUniverse,JSON.parse('{"DL":1,"UX":1,"a9I":1}'))
var y=(function rtii(){var x=A.al
return{b:x("xo"),L:x("bi"),_:x("ak<@>"),x:x("ak<~>"),T:x("B<ao<l,I>>"),t:x("B<ao<l,@>>"),Q:x("B<F1>"),B:x("B<a7e>"),O:x("B<FV>"),o:x("B<RJ>"),d:x("B<iN<@>>"),s:x("B<l>"),p:x("B<k>"),r:x("B<P?>"),m:x("ah"),M:x("Nz<P?,P?>"),l:x("E<ah>"),F:x("E<ao<l,@>>"),J:x("E<RJ>"),j:x("E<@>"),I:x("E<w>"),P:x("ao<l,@>"),f:x("ao<@,@>"),E:x("NQ"),G:x("F1"),h:x("ny"),R:x("p7"),a:x("be"),K:x("P"),W:x("FT"),Y:x("PJ"),e:x("PK"),v:x("Ae"),Z:x("a9H<P?>"),N:x("l"),i:x("pF"),k:x("fv"),D:x("rY"),U:x("aj<l>"),g:x("dc<GB>"),n:x("dc<~>"),V:x("aV<xo>"),u:x("aV<@>"),w:x("aV<~>"),bU:x("Ux<ah>"),C:x("oe<ah>"),cF:x("ap<xo>"),c:x("ap<@>"),d4:x("ap<~>"),q:x("BW"),y:x("I"),z:x("@"),S:x("w"),A:x("ah?"),cO:x("ao<l,@>?"),X:x("P?"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.oK=new A.N(1,0.10588235294117647,0.17254901960784313,0.25098039215686274,C.n)
D.Yk=new B.a1p(C.cS)
D.a0q=new A.a9(20,0,20,0)
D.a0O=new A.a9(8,20,8,20)
D.a17=new A.fd(1,C.bf,C.to,null)
D.yx=new A.a4(57639,"MaterialIcons",null,!1)
D.a2x=new A.a4(58337,"MaterialIcons",null,!1)
D.a2y=new A.a4(58341,"MaterialIcons",null,!1)
D.a2E=new A.a4(58721,"MaterialIcons",null,!0)
D.a2J=new A.a4(58888,"MaterialIcons",null,!1)
D.a2M=new A.a4(59048,"MaterialIcons",null,!1)
D.a2N=new A.a4(59049,"MaterialIcons",null,!1)
D.a4V=new A.ai(C.pV,null,C.f,null,null)
D.a4U=new A.ai(C.pV,28,C.f,null,null)
D.a2S=new A.a4(61044,"MaterialIcons",null,!1)
D.a53=new A.ai(D.a2S,null,C.f,null,null)
D.yL=new A.a4(58923,"MaterialIcons",null,!1)
D.a57=new A.ai(D.yL,null,C.f,null,null)
D.a56=new A.ai(D.yL,20,C.f,null,null)
D.aeJ=A.a(x([1,2,4,8,16]),A.al("B<w>"))
D.Bd=A.a(x([]),y.Q)
D.GN=new A.ff("FlutterWebRTC.Method",C.aP,null)
D.auS=new B.mo(0,"RTCIceConnectionStateNew")
D.auT=new B.mo(1,"RTCIceConnectionStateChecking")
D.auU=new B.mo(2,"RTCIceConnectionStateCompleted")
D.auV=new B.mo(3,"RTCIceConnectionStateConnected")
D.auW=new B.mo(4,"RTCIceConnectionStateCount")
D.Lg=new B.mo(5,"RTCIceConnectionStateFailed")
D.auX=new B.mo(6,"RTCIceConnectionStateDisconnected")
D.Lh=new B.mo(7,"RTCIceConnectionStateClosed")
D.Li=new B.PI(0,"RTCIceGatheringStateNew")
D.auY=new B.PI(1,"RTCIceGatheringStateGathering")
D.auZ=new B.PI(2,"RTCIceGatheringStateComplete")
D.rE=new B.vv(0,"RTCPeerConnectionStateClosed")
D.Lj=new B.vv(1,"RTCPeerConnectionStateFailed")
D.Lk=new B.vv(2,"RTCPeerConnectionStateDisconnected")
D.Ll=new B.vv(3,"RTCPeerConnectionStateNew")
D.Lm=new B.vv(4,"RTCPeerConnectionStateConnecting")
D.Ln=new B.vv(5,"RTCPeerConnectionStateConnected")
D.Lo=new B.vw(0,"veryLow")
D.rF=new B.vw(1,"low")
D.Lp=new B.vw(2,"medium")
D.Lq=new B.vw(3,"high")
D.av_=new B.vx(0,"RTCSignalingStateStable")
D.av0=new B.vx(1,"RTCSignalingStateHaveLocalOffer")
D.av1=new B.vx(2,"RTCSignalingStateHaveRemoteOffer")
D.av2=new B.vx(3,"RTCSignalingStateHaveLocalPrAnswer")
D.av3=new B.vx(4,"RTCSignalingStateHaveRemotePrAnswer")
D.Lr=new B.vx(5,"RTCSignalingStateClosed")
D.av4=new B.PN(0,0,0)
D.rG=new B.a7g(0,"RTCVideoViewObjectFitContain")
D.Ls=new B.a7g(1,"RTCVideoViewObjectFitCover")
D.tU=new A.A(!0,C.ak,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.aDm=new A.A(!0,C.f,null,null,null,null,13,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.bBD=null
$.bK8=!1
$.bIl=1
$.cb1=A.X(["very-low",D.Lo,"low",D.rF,"medium",D.Lp,"high",D.Lq],y.N,A.al("vw"))})();(function lazyInitializers(){var x=a.lazyFinal
x($,"ceD","aoO",()=>new B.aLz())
x($,"ccH","bCF",()=>C.e.p(A.a5(A.a5(A.a5(A.bCj(),"window"),"navigator"),"userAgent"),"Firefox"))
x($,"cjm","bS4",()=>A.X([D.Lo,"very-low",D.rF,"low",D.Lp,"medium",D.Lq,"high"],A.al("vw"),y.N))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_1",e:"endPart",h:b})})($__dart_deferred_initializers__,"5kgqBUDI2d6qUW4wKho7VZJbIYY=");