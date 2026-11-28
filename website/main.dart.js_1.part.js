((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_1",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={DZ:function DZ(){},Rs:function Rs(d){this.$ti=d},aS7:function aS7(d){this.a=d},aS8:function aS8(d,e){this.a=d
this.b=e},
bPK(d){var x
B.bxq()
if(d.length===0)return
x=A.bt(new B.by1(d))
self.window.addEventListener("beforeunload",x)
$.bEp=new B.by0(x)},
bxq(){var x=$.bEp
if(x!=null)x.$0()
$.bEp=null},
by1:function by1(d){this.a=d},
by0:function by0(d){this.a=d},
aqM(d){var x,w,v=new B.aqN(),u=J.U(d),t=u.h(d,"id")
t=J.p(t==null?"":t)
x=u.h(d,"conversation_id")
J.p(x==null?"":x)
x=u.h(d,"appelant_id")
x=J.p(x==null?"":x)
w=u.h(d,"appelant_nom")
J.p(w==null?"":w)
A.at(u.h(d,"appele_id"))
A.at(u.h(d,"appele_nom"))
w=u.h(d,"type")
J.p(w==null?"audio":w)
w=u.h(d,"statut")
w=J.p(w==null?"sonne":w)
v.$1(u.h(d,"cree_le"))
v.$1(u.h(d,"repondu_le"))
return new B.aqL(t,x,w)},
bD4(d){var x,w,v,u=J.U(d),t=u.h(d,"contenu"),s=u.h(d,"id")
s=J.p(s==null?"":s)
x=u.h(d,"appel_id")
J.p(x==null?"":x)
x=u.h(d,"emetteur_id")
x=J.p(x==null?"":x)
w=u.h(d,"type")
w=J.p(w==null?"":w)
if(y.P.b(t))v=t
else v=y.f.b(t)?J.lI(t,y.N,y.z):C.b0
if(u.h(d,"cree_le")!=null)A.bS(J.p(u.h(d,"cree_le")))
return new B.GQ(s,x,w,v)},
bX4(d){var x,w,v,u,t,s,r=J.U(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return D.YX
x=A.a([],y.t)
for(r=J.ac(q),w=y.f,v=y.P,u=y.N,t=y.z;r.t();){s=r.gG(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.lI(s,u,t))}return new B.a1E(x)},
bQw(d){var x=J.U(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.ot(v)
if(!x.k(v,"offer")&&!x.k(v,"answer"))return null
return new A.aiN(w,v)},
ca0(d){var x,w,v=J.U(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.aiQ(u,A.mT(w)?w:null,v)},
aqL:function aqL(d,e,f){this.a=d
this.c=e
this.w=f},
aqN:function aqN(){},
GQ:function GQ(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a1E:function a1E(d){this.a=d},
aoB(d){return B.caR(d)},
caR(d){var x=0,w=A.i(y.y),v
var $async$aoB=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:v=!0
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$aoB,w)},
bIw(d,e,f,g,h,i,j,k,l,m){return new B.uk(f,m,h,l,i,d,j,k,e,g,null)},
bN7(d,e,f,g,h,i,j,k,l,m,n){return new B.adk(e,g,f,d,n,k,j,i,h,l,m,null)},
bOO(d,e){var x=null
return new A.a6(C.lH,A.k(d.toUpperCase(),x,2,C.U,x,A.cv(x,x,C.f,x,x,x,x,x,"Cinzel",x,x,e,x,x,C.S,x,x,!0,x,1.2,x,x,x,x,x,x),C.am,x,x),x)},
uk:function uk(d,e,f,g,h,i,j,k,l,m,n){var _=this
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
Uz:function Uz(d,e){var _=this
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
b29:function b29(d){this.a=d},
b28:function b28(){},
b1W:function b1W(d){this.a=d},
b1X:function b1X(d){this.a=d},
b1V:function b1V(d){this.a=d},
b1Y:function b1Y(d){this.a=d},
b1Z:function b1Z(){},
b2_:function b2_(d){this.a=d},
b1U:function b1U(d,e){this.a=d
this.b=e},
b20:function b20(){},
b21:function b21(d){this.a=d},
b1z:function b1z(d){this.a=d},
b1C:function b1C(d){this.a=d},
b1D:function b1D(d){this.a=d},
b1E:function b1E(d){this.a=d},
b1B:function b1B(d){this.a=d},
b1F:function b1F(d){this.a=d},
b1G:function b1G(d){this.a=d},
b1H:function b1H(d){this.a=d},
b1A:function b1A(d,e){this.a=d
this.b=e},
b1I:function b1I(){},
b1J:function b1J(d){this.a=d},
b23:function b23(d){this.a=d},
b24:function b24(d){this.a=d},
b25:function b25(d){this.a=d},
b26:function b26(d){this.a=d},
b1T:function b1T(d){this.a=d},
b1Q:function b1Q(d,e){this.a=d
this.b=e},
b1R:function b1R(d){this.a=d},
b1S:function b1S(d){this.a=d},
b22:function b22(){},
b1v:function b1v(d,e){this.a=d
this.b=e},
b1t:function b1t(d,e){this.a=d
this.b=e},
b1u:function b1u(d,e){this.a=d
this.b=e},
b1y:function b1y(d){this.a=d},
b1s:function b1s(d){this.a=d},
b1q:function b1q(d){this.a=d},
b1r:function b1r(d,e){this.a=d
this.b=e},
b1w:function b1w(){},
b1x:function b1x(){},
b1L:function b1L(d){this.a=d},
b1M:function b1M(d){this.a=d},
b1N:function b1N(d){this.a=d},
b1O:function b1O(d){this.a=d},
b1K:function b1K(d){this.a=d},
b1P:function b1P(d){this.a=d},
b27:function b27(d){this.a=d},
adk:function adk(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
TC:function TC(d,e){this.c=d
this.a=e},
wC:function wC(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
IW:function IW(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
ahB:function ahB(d,e){var _=this
_.d=$
_.eR$=d
_.bM$=e
_.c=_.a=null},
bmK:function bmK(d,e){this.a=d
this.b=e},
ZD:function ZD(){},
cdi(a3,a4){var x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=null,a0="kind",a1="video",a2="packetsLost"
for(x=J.ac(a3),w=d,v=w,u=v,t=u,s=t,r=s,q=r,p=q,o=p,n=o,m=n;x.t();){l=x.gG(x)
k=l.d
l=l.b
if(l==="codec"){l=k.h(0,"mimeType")
j=J.p(l==null?"":l)
if(C.d.bh(j,"video/"))m=C.d.c2(j,6)}else if(l==="outbound-rtp"&&J.n(k.h(0,a0),a1)){l=A.bH(k.h(0,"bytesSent"))
n=l==null?d:C.e.u(l)
l=A.bH(k.h(0,"packetsSent"))
o=l==null?d:C.e.u(l)
u=A.bH(k.h(0,"framesPerSecond"))
if(u==null)u=d
l=A.bH(k.h(0,"frameWidth"))
v=l==null?d:C.e.u(l)
l=A.bH(k.h(0,"frameHeight"))
w=l==null?d:C.e.u(l)}else if(l==="remote-inbound-rtp"&&J.n(k.h(0,a0),a1)){l=A.bH(k.h(0,a2))
p=l==null?d:C.e.u(l)
r=A.bH(k.h(0,"jitter"))
if(r==null)r=d
i=A.bH(k.h(0,"roundTripTime"))
if(i==null)i=d
if(i!=null)t=i*1000}else if(l==="inbound-rtp"&&J.n(k.h(0,a0),a1)){l=A.bH(k.h(0,a2))
q=l==null?d:C.e.u(l)
s=A.bH(k.h(0,"jitter"))
if(s==null)s=d}else if(l==="candidate-pair"&&J.n(k.h(0,"state"),"succeeded")){i=A.bH(k.h(0,"currentRoundTripTime"))
if(i==null)i=d
if(t==null&&i!=null)t=i*1000}}x=a4==null
l=A.bH(x?d:a4.h(0,"octetsEnvoyes"))
h=l==null?d:C.e.u(l)
l=A.bH(x?d:a4.h(0,"horodatageMs"))
g=l==null?d:C.e.u(l)
x=Date.now()
if(n!=null&&h!=null&&g!=null){f=(x-g)/1000
e=f>0&&n>=h?(n-h)*8/f/1000:d}else e=d
l=r==null?d:r*1000
return A.X(["codecVideo",m,"octetsEnvoyes",n,"paquetsEnvoyes",o,"paquetsPerdusEnvoi",p,"paquetsPerdusReception",q,"gigueEnvoiMs",l,"gigueReceptionMs",s==null?d:s*1000,"allerRetourMs",t,"debitSortantKbitS",e,"imagesParSeconde",u,"largeur",v,"hauteur",w,"horodatageMs",x],y.N,y.z)},
bPT(d){var x=new B.bys(),w=J.U(d),v=w.h(d,"largeur")!=null&&w.h(d,"hauteur")!=null?A.u(w.h(d,"largeur"))+"x"+A.u(w.h(d,"hauteur")):null
return C.b.aW(A.a([x.$2("Codec vid\xe9o",w.h(d,"codecVideo")),x.$3("D\xe9bit sortant",w.h(d,"debitSortantKbitS")," kbit/s"),x.$2("Paquets envoy\xe9s",w.h(d,"paquetsEnvoyes")),x.$2("Paquets perdus (envoi)",w.h(d,"paquetsPerdusEnvoi")),x.$2("Paquets perdus (r\xe9ception)",w.h(d,"paquetsPerdusReception")),x.$3("Gigue (envoi)",w.h(d,"gigueEnvoiMs")," ms"),x.$3("Gigue (r\xe9ception)",w.h(d,"gigueReceptionMs")," ms"),x.$3("Aller-retour",w.h(d,"allerRetourMs")," ms"),x.$2("Images par seconde",w.h(d,"imagesParSeconde")),x.$2("R\xe9solution envoy\xe9e",v)],y.s),"\n")},
bys:function bys(){},
aR4:function aR4(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.y=_.x=!1
_.ax=_.at=_.as=_.Q=_.z=null
_.ay=!1
_.ch=null
_.CW=!1},
aR6:function aR6(d){this.a=d},
aR7:function aR7(d){this.a=d},
aR8:function aR8(d){this.a=d},
aR5:function aR5(d){this.a=d},
a1l:function a1l(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.y=_.x=null},
atS:function atS(d){this.a=d},
atT:function atT(d){this.a=d},
bQ6(d){var x=y.U,w=A.H(new A.ah(A.a(d.split(" "),y.s),new B.byT(),x),!0,x.i("q.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.o(C.b.gS(w),0).toUpperCase()
return(J.o(C.b.gS(w),0)+J.o(C.b.gaC(w),0)).toUpperCase()},
byT:function byT(){},
a4X:function a4X(){this.a=null},
aM8:function aM8(){},
nB:function nB(d,e){this.e=d
this.b=e},
aHv:function aHv(d){this.a=d},
aHw:function aHw(d){this.a=d},
bCj(d){var x=new B.a5s(d)
x.ayM(d)
return x},
a5s:function a5s(d){this.d=d
this.c=null},
aHs:function aHs(d){this.a=d},
aHt:function aHt(d){this.a=d},
aHu:function aHu(d){this.a=d},
O1:function O1(){},
aHh:function aHh(){},
aHi:function aHi(){},
aHj:function aHj(d){this.a=d},
aHg:function aHg(d){this.a=d},
c1m(d,e){var x=y.N
x=new B.a7w(d,e,A.D(x,y.E),A.D(x,y.z))
x.ayW(d,e)
return x},
a7w:function a7w(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aMa:function aMa(d){this.a=d},
aMb:function aMb(d){this.a=d},
aMc:function aMc(d){this.a=d},
aMd:function aMd(d){this.a=d},
aMe:function aMe(d){this.a=d},
aMf:function aMf(d){this.a=d},
aMg:function aMg(d){this.a=d},
aMh:function aMh(d){this.a=d},
aM9:function aM9(d){this.a=d},
aMi:function aMi(d){this.a=d},
c1p(d){var x=d.headerExtensions
x=y.l.b(x)?x:new A.cy(x,A.Z(x).i("cy<1,ak>"))
x=J.e3(x,new B.aMm(),y.W)
return A.H(x,!0,x.$ti.i("aC.E"))},
c1o(d){var x,w
if("encodings" in d)x=d.encodings
else x=[]
w=A.a([],y.O)
C.b.aG(x,new B.aMl(w))
return w},
c1n(d){var x,w
if("codecs" in d)x=d.codecs
else x=[]
w=A.a([],y.B)
C.b.aG(x,new B.aMk(w))
return w},
aMm:function aMm(){},
aMl:function aMl(d){this.a=d},
aMk:function aMk(d){this.a=d},
a7y:function a7y(d){this.a=d},
aMn:function aMn(){},
bCW:function bCW(d){this.a=d},
cc2(){return C.b.m2(A.a(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.bz0())!==-1},
bz0:function bz0(){},
bL7(){var x=A.a([],y.d),w=$.bL8
$.bL8=w+1
return new B.PV(w,x,D.aw8,$.am())},
PV:function PV(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.fy$=0
_.go$=g
_.k1$=_.id$=0},
aMt:function aMt(d){this.a=d},
aMp:function aMp(d){this.a=d},
aMq:function aMq(d){this.a=d},
aMr:function aMr(d){this.a=d},
aMs:function aMs(){},
bCX(d,e,f){return new B.PX(d,f,e,null)},
PX:function PX(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
PY:function PY(){this.c=this.a=null},
aMu:function aMu(){},
aMw:function aMw(d){this.a=d},
aMv:function aMv(d){this.a=d},
bJ8(d,e,f,g){var x,w={}
w.a=d
x=new B.a3F(g.i("a3F<0>"))
x.ayu(e,f,w,g)
return x},
a3F:function a3F(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
aAM:function aAM(d,e){this.a=d
this.b=e},
aAL:function aAL(d){this.a=d},
V6:function V6(d,e,f,g){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g},
b4n:function b4n(){},
aa_:function aa_(d){this.b=this.a=$
this.$ti=d},
aa0:function aa0(){},
bB1(d,e){return B.bWk(d,e)},
bWk(d,e){var x=0,w=A.i(y.b),v,u,t,s,r,q,p
var $async$bB1=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:if(!d.Tb("ws")&&!d.Tb("wss"))throw A.j(A.ft(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.j(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.xB(r,A.ib(null,null,null,!1,y.D))
u=new A.ap($.as,y.cF)
p=new A.aY(u,y.V)
if(J.n(r.readyState,1))p.cK(0,q)
else if(J.n(r.readyState,2)||J.n(r.readyState,3))p.hc(new B.HK("Unexpected WebSocket state: "+A.u(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.oi(r,"open",!1,y.C).gS(0).b9(0,new B.asM(p,q),y.H)
t=y.C
s=y.H
new A.oi(r,"error",!1,t).gS(0).b9(0,new B.asN(p,q),s)
A.ha(r,"message",new B.asO(q),!1,y.m)
new A.oi(r,"close",!1,t).gS(0).b9(0,new B.asP(p,q),s)
v=u
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$bB1,w)},
xB:function xB(d,e){this.a=d
this.b=e},
asM:function asM(d,e){this.a=d
this.b=e},
asN:function asN(d,e){this.a=d
this.b=e},
asO:function asO(d){this.a=d},
asP:function asP(d,e){this.a=d
this.b=e},
bDC(){return new B.HJ("Connection Closed")},
t7:function t7(){},
Hd:function Hd(d){this.a=d},
D1:function D1(d){this.a=d},
Dr:function Dr(d,e){this.a=d
this.b=e},
HK:function HK(d){this.a=d},
HJ:function HJ(d){this.a=d},
bVK(d){var x=null,w=$.as,v=new B.aa_(y.Z),u=y.X,t=A.ib(x,x,x,!0,u),s=A.ib(x,x,x,!0,u)
v.a=B.bJ8(new A.cL(s,A.w(s).i("cL<1>")),new A.Jo(t),!0,u)
v.b=B.bJ8(new A.cL(t,A.w(t).i("cL<1>")),new A.Jo(s),!1,u)
v=new B.apJ(new A.aY(new A.ap(w,y.d4),y.w),v)
v.aye(d)
return v},
apJ:function apJ(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
apN:function apN(d){this.a=d},
apK:function apK(d){this.a=d},
apL:function apL(d){this.a=d},
apM:function apM(d,e){this.a=d
this.b=e},
apO:function apO(d){this.a=d},
amF:function amF(d,e){this.b=d
this.a=e},
abq:function abq(d){this.a=d},
cbE(d){switch(d){case"new":return D.avW
case"checking":return D.avX
case"connected":return D.avZ
case"completed":return D.avY
case"failed":return D.LQ
case"disconnected":return D.aw0
case"closed":return D.LR
case"count":return D.aw_}return D.LR},
cbF(d){switch(d){case"new":return D.LS
case"gathering":return D.aw1
case"complete":return D.aw2}return D.LS},
cdw(d){switch(d){case"stable":return D.aw3
case"have-local-offer":return D.aw4
case"have-local-pranswer":return D.aw6
case"have-remote-offer":return D.aw5
case"have-remote-pranswer":return D.aw7
case"closed":return D.M0}return D.M0},
cd8(d){switch(d){case"new":return D.LV
case"connecting":return D.LW
case"connected":return D.LX
case"closed":return D.t_
case"disconnected":return D.LU
case"failed":return D.LT}return D.t_},
bQU(d){if(d==null)return null
return $.cdT.h(0,d)},
vM:function vM(d,e){this.a=d
this.b=e},
PR:function PR(d,e){this.a=d
this.b=e},
vK:function vK(d,e){this.a=d
this.b=e},
mr:function mr(d,e){this.a=d
this.b=e},
a7z:function a7z(d,e){this.a=d
this.b=e},
vL:function vL(d,e){this.a=d
this.b=e},
aM7:function aM7(){},
O2:function O2(){},
Fg:function Fg(){},
aHf:function aHf(){},
G8:function G8(d,e,f){this.a=d
this.b=e
this.c=f},
PS:function PS(){},
bCV:function bCV(){},
a7x:function a7x(){},
G9:function G9(d,e,f,g,h,i,j,k,l,m,n){var _=this
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
G7:function G7(){},
aMj:function aMj(d){this.d=d},
PT:function PT(){},
aMo:function aMo(){},
At:function At(d,e){this.a=d
this.b=e},
RR:function RR(d,e){this.b=d
this.d=e},
PU:function PU(d,e){this.b=d
this.c=e},
PW:function PW(d,e,f){this.a=d
this.b=e
this.c=f},
bEH(){var x=0,w=A.i(y.H),v
var $async$bEH=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:x=1
break
case 1:return A.f(v,w)}})
return A.h($async$bEH,w)},
bBX(d){var x=0,w=A.i(y.y)
var $async$bBX=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.j("The is not a video track => "+d.j(0))
throw A.j("You need to specify the deviceId")
return A.f(null,w)}})
return A.h($async$bBX,w)},
a5M(d){var x=0,w=A.i(y.H),v
var $async$a5M=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.c(B.aWB("enableSpeakerphone",A.X(["enable",d],y.N,v),v,v),$async$a5M)
case 2:return A.f(null,w)}})
return A.h($async$a5M,w)},
aJf(d,e){var x=0,w=A.i(y.H),v,u,t
var $async$aJf=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:t=e.d
x=t.kind==="audio"?3:4
break
case 3:u=J.lI(y.f.a(A.Ct(t.getConstraints())),y.N,y.z)
u.m(0,"volume",d)
x=5
return A.c(e.Qs(0,u),$async$aJf)
case 5:case 4:v=A.dc(null,y.H)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$aJf,w)},
aWB(d,e,f,g){return B.c4H(d,e,f,g,f.i("0?"))},
c4H(d,e,f,g,h){var x=0,w=A.i(h),v
var $async$aWB=A.d(function(i,j){if(i===1)return A.e(j,w)
while(true)switch(x){case 0:x=3
return A.c(B.aWA(),$async$aWB)
case 3:v=D.Ho.bS(d,e,!1,f)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$aWB,w)},
aWA(){var x=0,w=A.i(y.H),v,u
var $async$aWA=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:x=!$.bMX?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.c(D.Ho.bS("initialize",A.X(["options",A.D(v,u)],v,u),!1,y.H),$async$aWA)
case 4:$.bMX=!0
case 3:return A.f(null,w)}})
return A.h($async$aWA,w)}},D
J=c[1]
A=c[0]
C=c[2]
B=a.updateHolder(c[6],B)
D=c[8]
B.DZ.prototype={
D(d,e){this.a.D(0,e)},
dF(d,e){this.a.dF(d,e)},
ap(d){return this.a.ap(0)},
$ie_:1}
B.Rs.prototype={
jO(d){var x=A.cc("subscription"),w=A.ib(new B.aS7(x),null,null,!0,this.$ti.y[1])
x.b=d.hz(new B.aS8(this,w),w.goY(w),w.gqo())
return new A.cL(w,A.w(w).i("cL<1>"))}}
B.aqL.prototype={}
B.GQ.prototype={}
B.a1E.prototype={}
B.uk.prototype={
R(){return new B.Uz(A.aZ(y.N),C.H)}}
B.Uz.prototype={
Y(){var x,w,v,u,t,s,r,q,p,o=this,n=null
o.a6()
x=o.a
o.r=x.c
x=x.x
if(x==null)x=new B.aR4(B.bL7(),B.bL7())
o.d!==$&&A.aG()
o.d=x
w=o.a
v=w.y
if(v==null)v=new B.a1l(new A.dh(n,n,y.g),new A.dh(n,n,y.n))
o.e!==$&&A.aG()
o.e=v
x.ch=new B.b29(o)
o.fx=!0
u=new B.a4X()
o.fr!==$&&A.aG()
o.fr=u
t=w.x
if(t!=null){s=$.j1()
r=s.a
q=r.length!==0&&s.as===t&&r===w.c&&s.w}else q=!1
t=$.j1()
s=o.r
r=w.e
p=w.d
t.b5e(s,r,x,v,w.f,p)
x=o.a
if(x.as)t.ax=!0
if(q){o.Pe()
return}if(x.f)u.r1("assets/audio/tonalite-appel.wav")
o.q1()},
n(){var x=this,w=x.cx
if(w!=null)w.a_(0)
w=x.cy
if(w!=null)w.a_(0)
w=x.db
if(w!=null)w.a_(0)
w=x.dx
if(w!=null)w.a_(0)
w=x.dy
if(w!=null)w.a_(0)
w=x.fr
w===$&&A.b()
w.e3()
if(x.fx)w.hy()
w=$.j1()
if(!(w.r&&w.a===x.r&&!x.y)){B.bxq()
w=x.d
w===$&&A.b()
w.hy()
w=x.e
w===$&&A.b()
w.I7()}x.ak()},
Pe(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l
var $async$Pe=A.d(function(d,e){if(d===1){t=e
x=u}while(true)$async$outer:switch(x){case 0:s.a.toString
o=$.bp()
s.w=o.gJx()
o=$.j1()
s.Q=o.x
s.as=o.y
s.ay=o.Q
s.x=o.e
o=o.f
s.ch=o
if(o!=null){o=Date.now()
n=s.ch
n.toString
s.CW=new A.aU(o,0,!1).eq(n)}B.bPK(s.r)
u=4
s.a.toString
o=$.bp()
x=7
return A.c(o.co("/messagerie/appels/"+s.r+"/signaux"),$async$Pe)
case 7:r=e
for(o=J.ac(r),n=s.f;o.t();){q=o.gG(o)
p=B.bD4(q)
n.D(0,p.a)
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
n.f=new B.b1W(s)
n.r=new B.b1X(s)
n.w=new B.b1Y(s)
s.z=!0
if(o)s.p(new B.b1Z())
s.db=A.kM(C.cy,new B.b2_(s))
o=s.e
o===$&&A.b()
n=o.r
s.dx=new A.bW(n,A.w(n).i("bW<1>")).dd(s.gahb())
o=o.w
s.dy=new A.bW(o,A.w(o).i("bW<1>")).dd(new B.b20())
s.cx=A.kM(C.eF,new B.b21(s))
s.vp()
case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$Pe,w)},
aF5(){var x=this.cy
if(x!=null)x.a_(0)
this.cy=A.d3(C.e3,new B.b1z(this))},
q1(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$q1=A.d(function(d,a0){if(d===1){t=a0
x=u}while(true)switch(x){case 0:f="appel"
u=4
r=null
j=s.a
i=j.z
x=i!=null?7:9
break
case 7:x=10
return A.c(i,$async$q1)
case 10:r=a0
j=s.r=B.aqM(r).a
x=8
break
case 9:i=$.bp()
x=11
return A.c(i.Ba(j.c),$async$q1)
case 11:r=a0
j=s.r=s.a.c
case 8:i=$.j1()
i.b4Y(j)
B.bPK(s.r)
if(s.a.f)i.Rz()
q=B.aqM(r)
if(s.c==null){x=1
break}j=q.w
if(j==="termine"||j==="expire"){s.l4(A.x("Appel termin\xe9"))
x=1
break}s.a.toString
j=$.bp()
s.w=j.gJx()
f="ice"
s.a.toString
j=$.bp()
p=j.S5()
o=s.Fa()
x=12
return A.c(p,$async$q1)
case 12:n=a0
m=B.bX4(n)
x=15
return A.c(o,$async$q1)
case 15:x=!a0?13:14
break
case 13:if(s.c==null){x=1
break}s.p(new B.b1C(s))
x=16
return A.c(A.jb(C.j7,null,y.z),$async$q1)
case 16:if(s.c==null){x=1
break}s.l4(null)
x=1
break
case 14:s.aF5()
f="webrtc"
j=s.d
j===$&&A.b()
h=s.a.d==="video"||s.at
x=17
return A.c(j.uo(A.X(["iceServers",m.a],y.N,y.z),h),$async$q1)
case 17:j.f=new B.b1D(s)
j.r=new B.b1E(s)
j.w=new B.b1F(s)
if(s.c==null){x=1
break}s.p(new B.b1G(s))
i.bbp()
s.db=A.kM(C.cy,new B.b1H(s))
j=s.e
j===$&&A.b()
i=j.r
s.dx=new A.bW(i,A.w(i).i("bW<1>")).dd(s.gahb())
i=j.w
s.dy=new A.bW(i,A.w(i).i("bW<1>")).dd(new B.b1I())
s.a.toString
i=$.bp()
l=i.b
if(l!=null&&J.az(l)!==0){s.a.toString
$.bp()
j.R9(C.d.rh("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws",l)}s.cx=A.kM(C.eF,new B.b1J(s))
s.vp()
u=2
x=6
break
case 4:u=3
e=t
k=A.ai(e)
if(s.c==null){x=1
break}A.ov().$1("Appel : \xe9chec \xe0 l\u2019\xe9tape "+A.u(f)+" : "+A.asT(A.u(k)))
j=s.c
j.toString
i=k instanceof A.fD?k.a:s.aOE(f)
j.K(y.q).f.X(A.aA(null,null,null,null,null,C.j,null,A.k(i,null,null,null,null,null,null,null,null),null,C.p,null,null,null,null,null,null,null,null,null))
s.l4(null)
x=6
break
case 3:x=2
break
case 6:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$q1,w)},
aOE(d){if(d==="ice")return A.x("Configuration d\u2019appel indisponible. V\xe9rifie ta connexion, puis r\xe9essaie.")
if(d==="webrtc")return A.x("Ce navigateur ne peut pas d\xe9marrer l\u2019appel. Essaie depuis l\u2019application.")
return A.x("Appel introuvable ou d\xe9j\xe0 termin\xe9.")},
Fa(){var x=0,w=A.i(y.y),v,u=2,t,s=this,r,q,p
var $async$Fa=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
x=7
return A.c(s.Xe(),$async$Fa)
case 7:if(!e){v=!1
x=1
break}r=s.d
r===$&&A.b()
x=8
return A.c(r.BW(s.a.d==="video"||s.at),$async$Fa)
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
return A.h($async$Fa,w)},
Xe(){var x=0,w=A.i(y.y),v,u=this
var $async$Xe=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:v=B.aoB(u.a.d==="video"||u.at)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$Xe,w)},
vp(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$vp=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.y){x=1
break}u=4
s.a.toString
p=$.bp()
x=7
return A.c(p.co("/messagerie/appels/"+s.r+"/signaux"),$async$vp)
case 7:r=e
for(p=J.ac(r);p.t();){q=p.gG(p)
s.ahc(B.bD4(q))}u=2
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
return A.h($async$vp,w)},
ahc(d){var x,w,v,u,t=this
if(t.c==null||t.y)return
x=t.f
w=d.a
if(x.q(0,w))return
x.D(0,w)
x=t.w
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(t.a.f)return
t.FU(d)
break
case"reponse":if(!t.a.f)return
v=B.bQw(d.e)
if(v==null)return
x=t.d
x===$&&A.b()
x.Qr(A.X(["sdp",v.a,"type",v.b],y.N,y.z)).b9(0,new B.b23(t),y.a).hJ(new B.b24(t))
break
case"candidat_ice":u=B.ca0(d.e)
if(u==null)return
x=t.d
x===$&&A.b()
x.Qh(A.X(["candidate",u.a,"sdpMid",u.c,"sdpMLineIndex",u.b],y.N,y.z))
break
case"accepte":if(!t.a.f||t.x)return
x=t.d
x===$&&A.b()
x.AJ().b9(0,new B.b25(t),y.a).hJ(new B.b26(t))
break
case"refuse":t.l4(A.x("Appel refus\xe9"))
break
case"annule":t.l4(A.x("Appel annul\xe9"))
break
case"termine":t.l4(A.x("Appel termin\xe9"))
break}},
FU(d){return this.aUT(d)},
aUT(d){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$FU=A.d(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:o=B.bQw(d.e)
if(o==null){x=1
break}x=!(s.a.d==="video"||s.at)&&C.d.q(o.a,"m=video")?3:4
break
case 3:q=s.d
q===$&&A.b()
x=5
return A.c(q.qp(),$async$FU)
case 5:if(f&&s.c!=null&&!s.y){s.p(new B.b1T(s))
$.j1().amU("video")}case 4:u=7
q=s.d
q===$&&A.b()
x=10
return A.c(q.AK(A.X(["sdp",o.a,"type",o.b],y.N,y.z)),$async$FU)
case 10:r=f
if(s.c==null||s.y){x=1
break}s.OP()
s.Ye("reponse",r)
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
return A.h($async$FU,w)},
OP(){var x=0,w=A.i(y.H),v,u=this,t,s
var $async$OP=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:if(u.x){x=1
break}t=u.cy
if(t!=null)t.a_(0)
t=u.fr
t===$&&A.b()
t.e3()
u.p(new B.b1Q(u,!1))
t=$.j1()
t.bdu()
s=u.Q
t.a3W(u.as,s)
B.bEH()
case 1:return A.f(v,w)}})
return A.h($async$OP,w)},
vk(d,e,f){return this.aGy(d,e,f)},
Ye(d,e){return this.vk(d,e,!0)},
aGy(d,e,f){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q
var $async$vk=A.d(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
t.a.toString
s=$.bp()
x=6
return A.c(s.al_(t.r,e,d),$async$vk)
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
return A.h($async$vk,w)},
FK(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o
var $async$FK=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
r=s.cy
if(r!=null)r.a_(0)
r=s.fr
r===$&&A.b()
r.e3()
u=4
r=s.r
x=r.length!==0?7:8
break
case 7:s.a.toString
q=$.bp()
x=9
return A.c(q.Is(r,"termine"),$async$FK)
case 9:case 8:u=2
x=6
break
case 4:u=3
o=t
x=6
break
case 3:x=2
break
case 6:B.bxq()
$.j1().KB()
r=s.c
if(r!=null)A.a5(r,!1).ck()
case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$FK,w)},
af5(){var x=this
if(!x.x||x.y)return
$.j1().beU()
x.p(new B.b1R(x))
$.aK.aN$.push(new B.b1S(x))},
l4(d){var x,w,v=this,u=null
if(v.y)return
v.y=!0
x=v.cy
if(x!=null)x.a_(0)
x=v.fr
x===$&&A.b()
x.e3()
x=v.r
if(x.length!==0){v.a.toString
w=$.bp()
w.Is(x,"termine").hJ(new B.b22())}if(d!=null&&v.c!=null)v.c.K(y.q).f.X(A.aA(u,u,u,u,u,C.j,u,A.k(d,u,u,u,u,u,u,u,u),u,C.p,u,u,u,u,u,u,u,u,u))
B.bxq()
$.j1().KB()
x=v.c
if(x!=null)A.a5(x,!1).ck()},
MC(){var x=0,w=A.i(y.H),v=this,u,t
var $async$MC=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.b()
x=2
return A.c(t.Wh(u),$async$MC)
case 2:if(v.c!=null)v.p(new B.b1v(v,u))
$.j1().a3W(v.as,u)
return A.f(null,w)}})
return A.h($async$MC,w)},
MB(){var x=0,w=A.i(y.H),v=this,u,t
var $async$MB=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:v.ax=!1
x=2
return A.c(v.Mw(!v.as),$async$MB)
case 2:u=$.j1()
t=v.Q
u.a3W(v.as,t)
return A.f(null,w)}})
return A.h($async$MB,w)},
Mw(d){return this.aAi(d)},
aAi(d){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q,p,o
var $async$Mw=A.d(function(e,f){if(e===1){u=f
x=v}while(true)switch(x){case 0:v=3
r=t.d
r===$&&A.b()
x=6
return A.c(r.D3(d),$async$Mw)
case 6:v=1
x=5
break
case 3:v=2
o=u
s=A.ai(o)
A.ov().$1("Appel : haut-parleur impossible : "+A.asT(A.u(s)))
x=5
break
case 2:x=1
break
case 5:r=t.d
r===$&&A.b()
p=r.CW
if(t.c!=null&&p!==t.as)t.p(new B.b1t(t,p))
return A.f(null,w)
case 1:return A.e(u,w)}})
return A.h($async$Mw,w)},
MA(){var x=0,w=A.i(y.H),v=this,u,t
var $async$MA=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:u=!v.ay
t=v.d
t===$&&A.b()
x=2
return A.c(t.Wd(u),$async$MA)
case 2:if(v.c!=null)v.p(new B.b1u(v,u))
$.j1().bbA(u)
return A.f(null,w)}})
return A.h($async$MA,w)},
DL(){var x=0,w=A.i(y.H),v=this,u
var $async$DL=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:u=v.d
u===$&&A.b()
x=2
return A.c(u.Qw(),$async$DL)
case 2:return A.f(null,w)}})
return A.h($async$DL,w)},
agB(){var x,w=this,v="Appel en cours\u2026",u=w.fy
if(u!=null)return u
$.j1()
if(w.x){u=A.x(v)
x=C.c.aD(w.CW.a,1e6)
return u+" "+(C.d.cP(C.c.j(C.c.aD(x,60)),2,"0")+":"+C.d.cP(C.c.j(C.c.an(x,60)),2,"0"))}if(w.z)return w.a.f?A.x("\xc7a sonne\u2026"):A.x(v)
return A.x("Connexion\u2026")},
MD(){var x=0,w=A.i(y.H),v,u=this,t,s,r
var $async$MD=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:if(u.a.d==="video"||u.at||u.y){x=1
break}if(!u.x){t=u.c
t.toString
s=A.x("D\xe9croche d\u2019abord pour passer en vid\xe9o.")
t.K(y.q).f.X(A.aA(null,null,null,null,null,C.j,null,A.k(s,null,null,null,null,null,null,null,null),null,C.p,null,null,null,null,null,null,null,null,null))
x=1
break}t=u.d
t===$&&A.b()
x=3
return A.c(t.GL(),$async$MD)
case 3:r=e
if(r==null){t=u.c
if(t!=null){s=A.x("La cam\xe9ra n\u2019a pas pu s\u2019ouvrir.")
t.K(y.q).f.X(A.aA(null,null,null,null,null,C.j,null,A.k(s,null,null,null,null,null,null,null,null),null,C.p,null,null,null,null,null,null,null,null,null))}x=1
break}if(u.c==null||u.y){x=1
break}u.p(new B.b1y(u))
$.j1().amU("video")
u.Ye("offre",r)
case 1:return A.f(v,w)}})
return A.h($async$MD,w)},
Dy(){var x=0,w=A.i(y.H),v,u=this,t,s,r
var $async$Dy=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:if(u.y||u.c==null){x=1
break}t=u.d
t===$&&A.b()
x=3
return A.c(t.M1(),$async$Dy)
case 3:s=e
if(u.c==null||u.y){x=1
break}r=J.ds(s)?A.x("Statistiques indisponibles pour cet appel."):B.bPT(s)
t=u.c
t.toString
x=4
return A.c(A.cW(null,null,!0,null,new B.b1s(r),t,null,!0,y.H),$async$Dy)
case 4:case 1:return A.f(v,w)}})
return A.h($async$Dy,w)},
DO(){var x=0,w=A.i(y.H),v,u=this,t,s
var $async$DO=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:if(!(u.a.d==="video"||u.at)||u.y){x=1
break}t=u.d
t===$&&A.b()
x=t.ay?3:4
break
case 3:x=5
return A.c(t.Aa(),$async$DO)
case 5:if(u.c!=null)u.p(new B.b1w())
x=1
break
case 4:x=6
return A.c(t.xh(),$async$DO)
case 6:if(!e){t=u.c
if(t!=null){s=A.x("Le partage d\u2019\xe9cran n\u2019est pas disponible sur cet appareil.")
t.K(y.q).f.X(A.aA(null,null,null,null,null,C.j,null,A.k(s,null,null,null,null,null,null,null,null),null,C.p,null,null,null,null,null,null,null,null,null))}x=1
break}if(u.c!=null)u.p(new B.b1x())
case 1:return A.f(v,w)}})
return A.h($async$DO,w)},
aQM(){var x,w,v=this,u=null,t=A.a([],y.p)
if(v.a.d==="video"||v.at){t.push(A.bk(!1,u,u,u,!0,u,u,!0,!1,D.a5P,u,new B.b1L(v),!1,u,u,u,u,u,A.k(A.x("Basculer"),u,u,u,u,C.cK,u,u,u),u,u))
x=v.d
x===$&&A.b()
x=x.ay
w=A.cm(x?D.a3n:D.a3i,C.f,u,u)
t.push(A.bk(!1,u,u,u,!0,u,u,!0,!1,w,u,new B.b1M(v),!1,u,u,u,u,u,A.k(x?A.x("Arr\xeater le partage"):A.x("Partager l\u2019\xe9cran"),u,u,u,u,C.cK,u,u,u),u,u))}if(v.x){t.push(A.bk(!1,u,u,u,!0,u,u,!0,!1,D.a5L,u,new B.b1N(v),!1,u,u,u,u,u,A.k(A.x("Statistiques"),u,u,u,u,C.cK,u,u,u),u,u))
t.push(A.bk(!1,u,u,u,!0,u,u,!0,!1,D.a5D,u,new B.b1O(v),!1,u,u,u,u,u,A.k(A.x("R\xe9duire"),u,u,u,u,C.cK,u,u,u),u,u))}if(t.length===0)return
x=v.c
x.toString
A.fr(D.oW,new B.b1P(t),x,!1,u,y.H)},
A(d){var x,w,v,u,t,s,r,q=this,p=null,o=q.d
o===$&&A.b()
x=o.c
x=x==null?p:x.pO(0).length!==0
w=q.id
v=q.a
if((v.d==="video"||q.at)&&q.z){if(x===!0)x=A.ek(p,B.bCX(o.e,!1,D.M1),C.x,!1,p,q.ga8H(),p,p,p,p,p,p,p,p,p,p,p,p,p,p,p,p,p,p)
else{x=v.e
v=v.r
u=q.go&&q.x
x=A.cK(A.a1(A.a([new B.IW(x,v,u,56,p),C.M,B.bOO(x,22),C.v,A.k(q.agB(),p,p,p,p,D.uh,p,p,p)],y.p),C.m,C.h,C.F),p,p)}o=A.a([A.a6V(0,x),A.i7(p,A.ud(A.a9(12),B.bCX(o.d,!0,D.M1),C.be),160,p,p,16,16,110),A.i7(p,A.b1(A.b8(!1,D.a5O,C.i,p,C.o,p,p,p,p,q.ga8H(),p,A.d4(C.YM,p,p,C.T,C.d2,p)),36,36),p,p,p,20,20,p)],y.p)
if(q.x)o.push(A.i7(p,new B.TC(q.gaf4(),p),p,p,16,p,16,p))
x=q.Q
v=q.as
o.push(A.i7(24,B.bN7(q.ay,!0,v,x,q.ga8K(),q.ga8G(),q.ga8I(),q.ga8J(),q.gae5(),q.gaeM(),!0),p,p,0,0,p,p))
o=A.fe(C.bt,o,C.j,C.b9,p)}else{x=y.p
v=A.a([],x)
if(q.go)v.push(A.i7(p,A.rk(B.bCX(o.e,!1,D.t1),0),1,p,0,p,0,1))
if(q.x)v.push(A.i7(p,new B.TC(q.gaf4(),p),p,p,16,p,16,p))
o=B.bOO(q.a.e,24)
u=A.k(q.agB(),p,p,p,p,D.uh,C.am,p,p)
t=q.a
s=t.e
t=t.r
t=A.aR(A.cK(new B.IW(s,t,q.go&&q.x,88,p),p,p),1)
s=q.Q
r=q.as
v.push(A.a1(A.a([C.M,o,C.v,new A.a6(C.lH,u,p),t,B.bN7(q.ay,!1,r,s,q.ga8K(),q.ga8G(),q.ga8I(),q.ga8J(),q.gae5(),q.gaeM(),q.x),C.M],x),C.m,C.h,C.l))
v=A.fe(C.bt,v,C.j,C.b9,p)
o=v}return A.aLp(w,A.dV(p,C.k,A.fH(!0,o,C.T,!0),p,p,p),new B.b27(q),y.K)}}
B.adk.prototype={
A(d){var x,w,v=this,u=null,t=A.a9(28),s=A.aR(new B.wC(C.zk,v.e,A.x("Haut-parleur"),v.x,u,u),1),r=v.f?D.a3q:D.a3r,q=A.x("Appel vid\xe9o")
r=A.aR(new B.wC(r,!1,q,v.c?v.y:v.z,u,u),1)
q=v.d
x=q?D.a3c:D.a3b
w=y.p
q=A.au(A.a([s,r,A.aR(new B.wC(x,q,A.x("Muet"),v.w,u,u),1)],w),C.m,C.h,C.l)
x=A.x("Plus")
return A.af(u,A.a1(A.a([q,C.M,A.au(A.a([A.aR(new B.wC(C.zd,!1,x,v.r?v.Q:u,u,u),1),A.aR(new B.wC(D.z5,!1,A.x("Terminer"),v.as,C.ez,u),1),D.a1K],w),C.m,C.h,C.l)],w),C.m,C.h,C.F),C.i,u,u,new A.aq(D.oW,u,u,t,u,u,C.w),u,u,u,D.a12,D.a1p,u,u,u)}}
B.TC.prototype={
A(d){var x=null
return A.a1(A.a([A.b1(A.b8(!1,D.a5C,C.i,x,C.o,x,x,x,x,this.c,x,A.d4(C.p2,x,x,C.T,C.d2,x)),48,48),C.ae,A.k(A.x("R\xe9duire"),x,x,x,x,C.aEx,x,x,x)],y.p),C.m,C.h,C.F)}}
B.wC.prototype={
A(d){var x,w,v,u=this,t=null,s=u.r,r=s==null
if(r)s=u.d?C.f:C.p2
if(!r)x=C.f
else x=u.d?C.k:C.f
r=u.f
w=r==null?0.4:1
v=A.d4(s,t,t,C.T,C.d2,t)
return A.rk(A.a1(A.a([A.b1(A.b8(!1,A.cm(u.c,x,t,30),C.i,t,C.o,t,t,t,t,r,t,v),72,72),C.v,A.k(u.e,t,t,t,t,D.aEw,C.am,t,t)],y.p),C.m,C.h,C.F),w)}}
B.IW.prototype={
R(){return new B.ahB(null,null)}}
B.ahB.prototype={
Y(){var x,w=this
w.a6()
x=A.c4(null,A.cs(0,0,w.a.e?1100:2400,0),null,1,null,w)
x.UU(0,!0)
w.d!==$&&A.aG()
w.d=x},
aX(d){var x,w
this.ba(d)
x=this.a.e
if(d.e!==x){w=this.d
w===$&&A.b()
w.e=A.cs(0,0,x?1100:2400,0)
w.UU(0,!0)}},
n(){var x=this.d
x===$&&A.b()
x.n()
this.axA()},
A(d){var x,w=this,v=null,u=w.a,t=u.f,s=t*2,r=s+24,q=w.d
q===$&&A.b()
x=u.d
u=x!=null?A.lT(v,x,v,t):A.lT(C.t,v,A.k(B.bQ6(u.c),v,v,v,v,A.cv(v,v,C.k,v,v,v,v,v,v,v,v,w.a.f*0.7,v,v,C.S,v,v,!0,v,v,v,v,v,v,v,v),v,v,v),t)
return A.b1(A.hW(q,new B.bmK(w,s),u),r,r)}}
B.ZD.prototype={
n(){var x=this,w=x.bM$
if(w!=null)w.O(0,x.gi2())
x.bM$=null
x.ak()},
c5(){this.d2()
this.cO()
this.i3()}}
B.aR4.prototype={
BW(d){return this.bdb(d)},
bdb(d){var x=0,w=A.i(y.H),v,u=this,t,s,r,q,p
var $async$BW=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:if(u.b!=null){x=1
break}t=u.d
x=3
return A.c(t.iP(0),$async$BW)
case 3:$.ap7()
s=y.N
r=A.X(["echoCancellation",!0,"noiseSuppression",!0,"autoGainControl",!0],s,y.y)
if(d){q=y.S
q=A.X(["facingMode","user","width",A.X(["ideal",640],s,q),"height",A.X(["ideal",480],s,q),"frameRate",A.X(["ideal",24],s,q)],s,y.K)}else q=!1
x=4
return A.c(new B.O1().xO(0,A.X(["audio",r,"video",q],s,y.z)),$async$BW)
case 4:p=f
u.b=p
t.sy0(0,p)
case 1:return A.f(v,w)}})
return A.h($async$BW,w)},
uo(d,e){return this.bdY(d,e)},
bdY(d,e){var x=0,w=A.i(y.H),v=this,u,t,s,r,q,p,o
var $async$uo=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:x=2
return A.c(v.e.iP(0),$async$uo)
case 2:x=v.b==null?3:4
break
case 3:x=5
return A.c(v.BW(e),$async$uo)
case 5:case 4:u=v.b
u.toString
x=6
return A.c($.ap7().a1R(d,A.D(y.N,y.z)),$async$uo)
case 6:t=v.a=g
s=u.CR(0),r=s.length,q=0
case 7:if(!(q<s.length)){x=9
break}p=s[q]
x=10
return A.c(t.Qe(0,p,u),$async$uo)
case 10:o=g
if(p.d.kind==="video")v.as=o
case 8:s.length===r||(0,A.G)(s),++q
x=7
break
case 9:x=11
return A.c(v.zk(),$async$uo)
case 11:t.e=new B.aR6(v)
t.Q=new B.aR7(v)
t.d=new B.aR8(v)
return A.f(null,w)}})
return A.h($async$uo,w)},
aEW(d){var x,w,v,u=this
u.c=d
x=d.pO(0)
w=x.length!==0?C.b.gS(x).d.id:null
if(!u.x){u.x=!0
u.z=w
u.e.sy0(0,d)
u.DI()
v=u.r
if(v!=null)v.$0()}else{v=u.z
if(w!=null&&w!==v){u.z=w
u.e.sy0(0,d)
v=u.r
if(v!=null)v.$0()}}},
DI(){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q,p,o,n,m,l
var $async$DI=A.d(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:n=t.CW?0.8:1
m=t.c
m=m==null?null:m.Ld(0)
if(m==null)m=C.P
q=m.length
p=0
case 2:if(!(p<m.length)){x=4
break}s=m[p]
v=6
x=9
return A.c(B.aJf(n,s),$async$DI)
case 9:v=1
x=8
break
case 6:v=5
l=u
r=A.ai(l)
A.ov().$1("Appel : volume distant impossible : "+A.asT(A.u(r)))
x=8
break
case 5:x=1
break
case 8:case 3:m.length===q||(0,A.G)(m),++p
x=2
break
case 4:return A.f(null,w)
case 1:return A.e(u,w)}})
return A.h($async$DI,w)},
zk(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h
var $async$zk=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:i=s.as
if(i==null){x=1
break}u=4
o=i.a.getParameters()
n=o.transactionId
if((n==null?null:n)!=null){m=o.rtcp
l=y.z
l=A.X(["cname",m.cname,"reducedSize",m.reducedSize],l,l)
l.h(0,"cname")
l.h(0,"reducedSize")}B.c1p(o)
m=B.c1o(o)
B.c1n(o)
r=new B.aMj(m)
q=r.d
if(q==null||J.az(q)===0){x=1
break}for(m=q,l=m.length,k=0;k<l;++k){p=m[k]
p.c=5e5
p.e=24}x=7
return A.c(i.D6(r),$async$zk)
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
return A.h($async$zk,w)},
AJ(){var x=0,w=A.i(y.P),v,u=this,t,s
var $async$AJ=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.j(A.a2("Connexion non pr\xe9par\xe9e."))
x=3
return A.c(s.Ri(0),$async$AJ)
case 3:t=e
x=4
return A.c(s.D4(0,t),$async$AJ)
case 4:v=A.X(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$AJ,w)},
AK(d){return this.b4q(d)},
b4q(d){var x=0,w=A.i(y.P),v,u=this,t,s
var $async$AK=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.j(A.a2("Connexion non pr\xe9par\xe9e."))
x=3
return A.c(s.D7(0,new B.At(d.h(0,"sdp"),d.h(0,"type"))),$async$AK)
case 3:x=4
return A.c(s.Rf(0),$async$AK)
case 4:t=f
x=5
return A.c(s.D4(0,t),$async$AK)
case 5:v=A.X(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$AK,w)},
Qr(d){return this.b0w(d)},
b0w(d){var x=0,w=A.i(y.H),v=this,u
var $async$Qr=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.j(A.a2("Connexion non pr\xe9par\xe9e."))
x=2
return A.c(u.D7(0,new B.At(d.h(0,"sdp"),d.h(0,"type"))),$async$Qr)
case 2:return A.f(null,w)}})
return A.h($async$Qr,w)},
Qh(d){return this.b0b(d)},
b0b(d){var x=0,w=A.i(y.H),v,u=this,t
var $async$Qh=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.c(t.Q7(new B.G8(A.at(d.h(0,"candidate")),A.at(d.h(0,"sdpMid")),A.en(d.h(0,"sdpMLineIndex")))),$async$Qh)
case 3:case 1:return A.f(v,w)}})
return A.h($async$Qh,w)},
Wh(d){return this.as4(d)},
as4(d){var x=0,w=A.i(y.H),v=this,u,t,s,r
var $async$Wh=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.Ld(0)
if(r==null)r=C.P
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.G)(r),++s)r[s].skq(0,t)
return A.f(null,w)}})
return A.h($async$Wh,w)},
D3(d){return this.arV(d)},
arV(d){var x=0,w=A.i(y.H),v=this
var $async$D3=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:x=2
return A.c(B.a5M(d),$async$D3)
case 2:v.CW=d
x=3
return A.c(v.DI(),$async$D3)
case 3:return A.f(null,w)}})
return A.h($async$D3,w)},
Wd(d){return this.arN(d)},
arN(d){var x=0,w=A.i(y.H),v=this,u,t,s
var $async$Wd=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.pO(0)
if(s==null)s=C.P
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.G)(s),++t)s[t].skq(0,d)
return A.f(null,w)}})
return A.h($async$Wd,w)},
Qw(){var x=0,w=A.i(y.H),v,u=this,t,s
var $async$Qw=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.pO(0)
if(s==null)s=D.BP
if(s.length===0){x=1
break}x=3
return A.c(B.bBX(C.b.gS(s)),$async$Qw)
case 3:case 1:return A.f(v,w)}})
return A.h($async$Qw,w)},
qp(){var x=0,w=A.i(y.y),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0
var $async$qp=A.d(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:e=s.a
if(e==null||s.y){v=!1
x=1
break}m=s.b
m=m==null?null:m.pO(0).length!==0
if(m===!0){v=!0
x=1
break}r=null
u=4
$.ap7()
m=y.N
l=y.S
x=7
return A.c(new B.O1().xO(0,A.X(["audio",!1,"video",A.X(["facingMode","user","width",A.X(["ideal",640],m,l),"height",A.X(["ideal",480],m,l),"frameRate",A.X(["ideal",24],m,l)],m,y.K)],m,y.z)),$async$qp)
case 7:r=a2
q=J.bGB(r)
if(J.az(q)===0){v=!1
x=1
break}p=J.kc(q)
m=s.b
if(m==null)m=null
else{m=m.e
l=p.d
m.addTrack(l)
m=A.dc(null,y.H)}x=8
return A.c(y.x.b(m)?m:A.cO(m,y.H),$async$qp)
case 8:s.d.sy0(0,s.b)
m=s.b
m.toString
x=9
return A.c(J.bUZ(e,p,m),$async$qp)
case 9:o=a2
s.as=o
x=10
return A.c(s.zk(),$async$qp)
case 10:v=!0
x=1
break
u=2
x=6
break
case 4:u=3
d=t
m=r
m=m==null?null:J.bGA(m)
if(m==null)m=C.P
l=m.length
j=y.c
i=y._
h=0
case 11:if(!(h<m.length)){x=13
break}n=m[h]
u=15
g=J.a_C(n)
if(!i.b(g)){f=new A.ap($.as,j)
f.a=8
f.c=g
g=f}x=18
return A.c(g,$async$qp)
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
return A.h($async$qp,w)},
GL(){var x=0,w=A.i(y.cO),v,u=2,t,s=this,r,q,p
var $async$GL=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:x=3
return A.c(s.qp(),$async$GL)
case 3:if(!e){v=null
x=1
break}u=5
x=8
return A.c(s.AJ(),$async$GL)
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
return A.h($async$GL,w)},
xh(){var x=0,w=A.i(y.y),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0,a1
var $async$xh=A.d(function(a2,a3){if(a2===1){t=a3
x=u}while(true)switch(x){case 0:if(s.a==null||s.y){v=!1
x=1
break}if(s.ay){v=!0
x=1
break}if(A.bB()===C.ay){v=!1
x=1
break}r=s.as
if(r==null){v=!1
x=1
break}q=null
u=4
$.ap7()
x=7
return A.c(new B.O1().CG(A.X(["video",!0,"audio",!1],y.N,y.z)),$async$xh)
case 7:q=a3
p=J.bGB(q)
if(J.az(p)===0){v=!1
x=1
break}o=J.kc(p)
l=s.b
k=l==null?null:l.pO(0)
n=k==null?D.BP:k
s.ax=J.az(n)!==0?J.kc(n):null
x=8
return A.c(r.UV(o),$async$xh)
case 8:s.at=q
s.ay=!0
s.d.sy0(0,q)
x=9
return A.c(s.zk(),$async$xh)
case 9:o.c=new B.aR5(s)
v=!0
x=1
break
u=2
x=6
break
case 4:u=3
a0=t
l=q
l=l==null?null:J.bGA(l)
if(l==null)l=C.P
i=l.length
h=y.c
g=y._
f=0
case 10:if(!(f<l.length)){x=12
break}m=l[f]
u=14
e=J.a_C(m)
if(!g.b(e)){d=new A.ap($.as,h)
d.a=8
d.c=e
e=d}x=17
return A.c(e,$async$xh)
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
return A.h($async$xh,w)},
Aa(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$Aa=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(!s.ay){x=1
break}o=s.ay=!1
u=4
r=s.as
q=s.ax
x=(r!=null?q!=null:o)?7:8
break
case 7:x=9
return A.c(r.UV(q),$async$Aa)
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
o=o==null?null:o.CR(0)
if(o==null)o=C.P
m=o.length
l=y.c
k=y._
j=0
case 10:if(!(j<o.length)){x=12
break}p=o[j]
u=14
i=J.a_C(p)
if(!k.b(i)){h=new A.ap($.as,l)
h.a=8
h.c=i
i=h}x=17
return A.c(i,$async$Aa)
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
s.d.sy0(0,s.b)
case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$Aa,w)},
M1(){var x=0,w=A.i(y.P),v,u=2,t,s=this,r,q,p,o,n
var $async$M1=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:o=s.a
if(o==null||s.y){v=C.b0
x=1
break}u=4
x=7
return A.c(J.bVl(o),$async$M1)
case 7:r=e
q=B.cdi(r,s.Q)
s.Q=q
A.ov().$1("Appel : statistiques : "+B.bPT(q))
v=q
x=1
break
u=2
x=6
break
case 4:u=3
n=t
v=C.b0
x=1
break
x=6
break
case 3:x=2
break
case 6:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$M1,w)},
hy(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0
var $async$hy=A.d(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
s.ay=!1
p=s.at
p=p==null?null:p.CR(0)
if(p==null)p=C.P
o=p.length
n=y.c
m=y._
l=0
case 3:if(!(l<p.length)){x=5
break}r=p[l]
u=7
k=J.a_C(r)
if(!m.b(k)){j=new A.ap($.as,n)
j.a=8
j.c=k
k=j}x=10
return A.c(k,$async$hy)
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
return A.c(B.a5M(!1),$async$hy)
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
return A.c(y.x.b(p)?p:A.cO(p,y.H),$async$hy)
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
p=p==null?null:p.CR(0)
if(p==null)p=C.P
o=p.length
l=0
case 21:if(!(l<p.length)){x=23
break}q=p[l]
u=25
k=J.a_C(q)
if(!m.b(k)){j=new A.ap($.as,n)
j.a=8
j.c=k
k=j}x=28
return A.c(k,$async$hy)
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
return A.c(s.d.n(),$async$hy)
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
return A.c(s.e.n(),$async$hy)
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
return A.h($async$hy,w)}}
B.a1l.prototype={
gb2G(){return this.b!=null&&!this.e},
R9(d,e){return this.b2H(d,e)},
b2H(d,e){var x=0,w=A.i(y.H),v=this
var $async$R9=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:v.x=d
v.y=e
v.e=!1
v.f=0
x=2
return A.c(v.DG(),$async$R9)
case 2:return A.f(null,w)}})
return A.h($async$R9,w)},
DG(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$DG=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.e){x=1
break}r=s.x
if(r==null||J.az(r)===0){x=1
break}u=4
q=B.bVK(B.bB1(A.cw(r,0,null),null))
s.b=q
x=7
return A.c(q.f.a,$async$DG)
case 7:s.f=0
p=s.y
if(p!=null&&J.az(p)!==0)try{o=y.N
q.gjz().a.D(0,C.ac.he(A.X(["type","auth","jeton",p],o,o),null))}catch(l){}o=q.r.b
o===$&&A.b()
o=o.b
o===$&&A.b()
s.c=new A.cL(o,A.w(o).i("cL<1>")).bo(s.gaU8(),!0,s.gaSG(),new B.atS(s))
u=2
x=6
break
case 4:u=3
m=t
s.ZP()
x=6
break
case 3:x=2
break
case 6:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$DG,w)},
aU9(d){var x,w,v,u
try{x=C.ac.ea(0,J.p(d),null)
v=y.P
if(!v.b(x))return
if(!J.n(J.o(x,"type"),"signal_appel"))return
w=J.o(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.D(0,B.bD4(w))}catch(u){}},
ZP(){var x,w=this,v=w.c
if(v!=null)v.a_(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.D(0,null)
return}x=D.afH[v]
w.f=v+1
v=w.d
if(v!=null)v.a_(0)
w.d=A.d3(A.cs(0,0,0,x),new B.atT(w))},
I7(){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q
var $async$I7=A.d(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.a_(0)
s=t.c
s=s==null?null:s.a_(0)
x=2
return A.c(y.x.b(s)?s:A.cO(s,y.H),$async$I7)
case 2:t.c=null
v=4
s=t.b
s=s==null?null:s.gjz().ap(0)
x=7
return A.c(y._.b(s)?s:A.cO(s,y.z),$async$I7)
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
return A.h($async$I7,w)}}
B.a4X.prototype={
r1(d){return this.baz(d)},
baz(d){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q,p
var $async$r1=A.d(function(e,f){if(e===1){u=f
x=v}while(true)switch(x){case 0:v=3
r=t.a
x=6
return A.c((r==null?t.a=A.a0a():r).aS(0),$async$r1)
case 6:r=t.a
r.toString
x=7
return A.c(r.uN(A.CU(A.cw("asset:///"+d,0,null),null,null),null,!0),$async$r1)
case 7:x=8
return A.c(t.a.iE(C.H6),$async$r1)
case 8:x=9
return A.c(t.a.hW(1),$async$r1)
case 9:x=10
return A.c(t.a.e6(0),$async$r1)
case 10:v=1
x=5
break
case 3:v=2
p=u
s=A.ai(p)
A.ov().$1("Sonnerie appel : lecture impossible ("+d+") : "+A.u(s))
x=5
break
case 2:x=1
break
case 5:return A.f(null,w)
case 1:return A.e(u,w)}})
return A.h($async$r1,w)},
e3(){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q
var $async$e3=A.d(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
s=s==null?null:s.aS(0)
x=6
return A.c(y.x.b(s)?s:A.cO(s,y.H),$async$e3)
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
hy(){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q
var $async$hy=A.d(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
s=s==null?null:s.n()
x=6
return A.c(y.x.b(s)?s:A.cO(s,y.H),$async$hy)
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
return A.h($async$hy,w)}}
B.aM8.prototype={
a1R(d,e){return this.b45(d,e)},
b45(d,e){var x=0,w=A.i(y.Y),v,u,t,s,r
var $async$a1R=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.X(["mandatory",A.D(r,r),"optional",A.a([A.X(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.T)],t,y.K)}r=self.RTCPeerConnection
t=A.kA(u,y.N,y.z)
t.C(0,d)
s=new r(y.m.a(A.bs(t)))
t=J.p(s)
v=B.c1m(C.dY.gp5().c_(new A.eW(t)),s)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$a1R,w)}}
B.nB.prototype={
Ld(d){var x=A.a([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.cy(w,A.Z(w).i("cy<1,ak>"))
J.fs(w,new B.aHv(x))
return x},
pO(d){var x=A.a([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.cy(w,A.Z(w).i("cy<1,ak>"))
J.fs(w,new B.aHw(x))
return x},
CR(d){var x=A.H(this.Ld(0),!0,y.G)
C.b.C(x,this.pO(0))
return x}}
B.a5s.prototype={
ayM(d){var x=this,w=x.d
w.addEventListener("ended",A.bt(new B.aHs(x)))
w.addEventListener("mute",A.bt(new B.aHt(x)))
w.addEventListener("unmute",A.bt(new B.aHu(x)))},
skq(d,e){this.d.enabled=e},
Qs(d,e){return this.b0z(0,e)},
b0z(d,e){var x=0,w=A.i(y.H),v=this
var $async$Qs=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:x=2
return A.c(A.cV(v.d.applyConstraints(y.m.a(A.bs(e))),y.X),$async$Qs)
case 2:return A.f(null,w)}})
return A.h($async$Qs,w)},
aS(d){var x=0,w=A.i(y.H),v=this
var $async$aS=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.f(null,w)}})
return A.h($async$aS,w)}}
B.O1.prototype={
xO(d,e){return this.aqZ(0,e)},
aqZ(d,e){var x=0,w=A.i(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$xO=A.d(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.cc2())if(y.f.b(e.h(0,"video"))&&J.o(e.h(0,"video"),"facingMode")!=null)J.hU(e.h(0,"video"),"facingMode")
e.bU(0,"video",new B.aHh())
e.bU(0,"audio",new B.aHi())}catch(a0){A.ou("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.me(e.h(0,"audio"),i,i).aA(0,"optional")&&y.F.b(J.o(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.o(e.h(0,"audio"),"optional")
r=A.D(y.N,y.z)
J.fs(s,new B.aHj(r))
J.hU(e.h(0,"audio"),"optional")
J.mY(e.h(0,"audio"),r)}}catch(a0){q=A.ai(a0)
p=A.b_(a0)
A.ou("[getUserMedia] failed to translate optional audio constraints, "+A.u(q)+", "+A.u(p))}i=self
o=i.window.navigator.mediaDevices
h=y.m
x=o.getUserMedia!=null?7:9
break
case 7:n=A.bs(e)
x=10
return A.c(A.cV(o.getUserMedia(h.a(n)),h),$async$xO)
case 10:m=a2
v=new B.nB(m,"local")
x=1
break
x=8
break
case 9:i=i.window.navigator.mediaDevices
g=e.h(0,"audio")
x=11
return A.c(A.cV(i.getUserMedia({video:e.h(0,"video"),audio:g}),h),$async$xO)
case 11:l=a2
v=new B.nB(l,"local")
x=1
break
case 8:u=2
x=6
break
case 4:u=3
f=t
k=A.ai(f)
i=J.p(k)
throw A.j("Unable to getUserMedia: "+i)
x=6
break
case 3:x=2
break
case 6:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$xO,w)},
CG(d){return this.aqn(d)},
aqn(d){var x=0,w=A.i(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j
var $async$CG=A.d(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:u=4
n=self
s=n.window.navigator.mediaDevices
x=s.getDisplayMedia!=null?7:9
break
case 7:r=A.bs(d)
n=y.m
x=10
return A.c(A.cV(s.getDisplayMedia(n.a(r)),n),$async$CG)
case 10:q=f
v=new B.nB(q,"local")
x=1
break
x=8
break
case 9:n=n.window.navigator.mediaDevices
m=y.N
m=A.bs(A.X(["mediaSource","screen"],m,m))
m.toString
l=d.h(0,"audio")
if(l==null)l=!1
x=11
return A.c(A.cV(n.getUserMedia({video:m,audio:l}),y.m),$async$CG)
case 11:p=f
v=new B.nB(p,"local")
x=1
break
case 8:u=2
x=6
break
case 4:u=3
j=t
o=A.ai(j)
n=J.p(o)
throw A.j("Unable to getDisplayMedia: "+n)
x=6
break
case 3:x=2
break
case 6:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$CG,w)}}
B.a7w.prototype={
ayW(d,e){var x=this,w=x.at
w===$&&A.b()
w.addEventListener("datachannel",A.bt(new B.aMa(x)))
w.addEventListener("icecandidate",A.bt(new B.aMb(x)))
w.addEventListener("iceconnectionstatechange",A.bt(new B.aMc(x)))
w.onicegatheringstatechange=A.bt(new B.aMd(x))
w.addEventListener("signalingstatechange",A.bt(new B.aMe(x)))
if(!$.bFs())w.addEventListener("connectionstatechange",A.bt(new B.aMf(x)))
w.addEventListener("negotiationneeded",A.bt(new B.aMg(x)))
w.addEventListener("track",A.bt(new B.aMh(x)))},
Ri(d){var x=0,w=A.i(y.v),v,u=this,t,s
var $async$Ri=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.b()
x=3
return A.c(A.cV(s.createOffer(y.m.a(A.bs(A.D(y.N,y.z)))),y.A),$async$Ri)
case 3:t=f
v=new B.At(t.sdp,t.type)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$Ri,w)},
Rf(d){var x=0,w=A.i(y.v),v,u=this,t,s
var $async$Rf=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.b()
x=3
return A.c(A.cV(s.createAnswer(y.m.a(A.bs(A.D(y.N,y.z)))),y.A),$async$Rf)
case 3:t=f
v=new B.At(t.sdp,t.type)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$Rf,w)},
D4(d,e){return this.arZ(0,e)},
arZ(d,e){var x=0,w=A.i(y.H),v=this,u
var $async$D4=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.b()
x=2
return A.c(A.cV(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$D4)
case 2:return A.f(null,w)}})
return A.h($async$D4,w)},
D7(d,e){return this.asf(0,e)},
asf(d,e){var x=0,w=A.i(y.H),v=this,u
var $async$D7=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.b()
x=2
return A.c(A.cV(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$D7)
case 2:return A.f(null,w)}})
return A.h($async$D7,w)},
Q7(d){return this.b_K(d)},
b_K(d){var x=0,w=A.i(y.H),v=this,u,t
var $async$Q7=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.b()
u=d.b
u.toString
x=2
return A.c(A.cV(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$Q7)
case 2:return A.f(null,w)}})
return A.h($async$Q7,w)},
Lp(d){var x=0,w=A.i(y.J),v,u=this,t,s,r
var $async$Lp=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:r=u.at
r===$&&A.b()
x=3
return A.c(A.cV(r.getStats(),y.m),$async$Lp)
case 3:t=f
s=A.a([],y.o)
t.forEach.apply(t,[A.ZW(new B.aMi(s))])
v=s
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$Lp,w)},
ap(d){var x=0,w=A.i(y.H),v,u=this,t
var $async$ap=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.b()
t.close()
v=A.dc(null,y.H)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$ap,w)},
Qe(d,e,f){return this.b06(0,e,f)},
b06(d,e,f){var x=0,w=A.i(y.e),v,u=this,t
var $async$Qe=A.d(function(g,h){if(g===1)return A.e(h,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.b()
v=new B.a7y(t.addTrack(e.d,f.e))
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$Qe,w)}}
B.a7y.prototype={
UV(d){return this.bfk(d)},
bfk(d){var x=0,w=A.i(y.H),v=this,u,t,s,r
var $async$UV=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:try{u=d
s=u.d
v.a.replaceTrack(s)}catch(q){s=A.ai(q)
if(y.L.b(s)){t=s
throw A.j("Unable to RTCRtpSender::replaceTrack: "+J.p(t))}else throw q}return A.f(null,w)}})
return A.h($async$UV,w)},
D6(d){return this.as6(d)},
as6(d){var x=0,w=A.i(y.y),v,u=2,t,s=this,r,q,p,o,n,m,l
var $async$D6=A.d(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:u=4
p=s.a
r=p.getParameters()
o=d.d
n=A.Z(o).i("ad<1,ao<m,@>>")
n=A.bs(A.H(new A.ad(o,new B.aMn(),n),!0,n.i("aC.E")))
o=n==null?A.bs([]):n
r.encodings=y.r.a(o)
x=7
return A.c(A.cV(p.setParameters(r),y.X),$async$D6)
case 7:x=8
return A.c(A.dc(!0,y.y),$async$D6)
case 8:p=f
v=p
x=1
break
u=2
x=6
break
case 4:u=3
l=t
p=A.ai(l)
if(y.L.b(p)){q=p
throw A.j("Unable to RTCRtpSender::setParameters: "+J.p(q))}else throw l
x=6
break
case 3:x=2
break
case 6:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$D6,w)}}
B.bCW.prototype={
aS(d){var x=0,w=A.i(y.H),v=this,u,t,s
var $async$aS=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.ai(r)
if(y.L.b(s)){u=s
s=u
J.p(s)
throw A.j("Unable to RTCRtpTransceiver::stop: "+A.u(s))}else throw r}return A.f(null,w)}})
return A.h($async$aS,w)}}
B.PV.prototype={
san6(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.Bm()
if(x!=null)x.style.objectFit=e},
ahk(){var x=this,w=x.Bm(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sl(0,v.ak7(u,x.z!=null,0,t))},
sy0(d,e){var x,w,v,u,t=this
if(e==null){x=t.Bm()
if(x!=null)x.srcObject=null
x=t.w
if(x!=null)x.srcObject=null
t.z=null
return}t.z=e
if(e.pO(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.ac(y.l.b(x)?x:new A.cy(x,A.Z(x).i("cy<1,ak>")))
for(;x.t();){w=x.gG(x)
t.x.addTrack(w)}}if(e.Ld(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.ac(y.l.b(x)?x:new A.cy(x,A.Z(x).i("cy<1,ak>")))
for(;x.t();){w=x.gG(x)
t.y.addTrack(w)}}if(t.y!=null){if(t.w==null){v=self.document.createElement("audio")
v.id="audio_"+("RTCVideoRenderer-"+t.Q)
v.muted=e.b==="local"
v.autoplay=!0
t.w=v
x=t.aGt()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.Bm()
if(u!=null){u.srcObject=t.x
x=t.Bm()
x.toString
t.a8p(x)}t.sl(0,t.a.b36(t.z!=null))},
aGt(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
if(v!=null)return v
x=w.document.createElement("div")
x.id="html_webrtc_audio_manager_list"
x.style.display="none"
w=w.document.body
if(w!=null)w.append(x)
return x},
Bm(){var x=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(x!=null)return x
return null},
n(){var x=0,w=A.i(y.H),v,u=this,t,s,r,q,p
var $async$n=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:u.z=null
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.G)(t),++r)t[r].a_(0)
q=u.Bm()
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
iP(d){var x=0,w=A.i(y.H),v=this
var $async$iP=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:$.K1()
$.qe().us("RTCVideoRenderer-"+v.Q,new B.aMt(v),!0)
return A.f(null,w)}})
return A.h($async$iP,w)},
a8p(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.PX.prototype={
R(){return new B.PY()}}
B.PY.prototype={
Y(){var x,w,v=this
v.a6()
v.a.c.a9(0,v.gaPU())
x=v.a
w=x.c
w.as=x.e
w.san6(0,x.d===D.t1?"contain":"cover")},
aPV(){if(this.c!=null)this.p(new B.aMu())},
n(){if(this.c!=null)this.ak()},
aX(d){var x,w
this.ba(d)
A.d3(A.cs(0,0,10,0),new B.aMw(this))
x=this.a
w=x.c
w.san6(0,x.d===D.t1?"contain":"cover")},
A(d){return new A.nw(new B.aMv(this),null)}}
B.a3F.prototype={
ayu(d,e,f,g){var x=this,w=$.as
x.a!==$&&A.aG()
x.a=new B.V6(d,x,new A.aY(new A.ap(w,y.c),y.u),e)
if(f.a.gia())f.a=new B.Rs(g.i("@<0>").aM(g).i("Rs<1,2>")).jO(f.a)
w=A.ib(null,new B.aAM(f,x),null,!0,g)
x.b!==$&&A.aG()
x.b=w},
adX(){var x,w
this.d=!0
x=this.c
if(x!=null)x.a_(0)
w=this.b
w===$&&A.b()
w.ap(0)}}
B.V6.prototype={
D(d,e){if(this.e)throw A.j(A.a2("Cannot add event after closing."))
if(this.d)return
this.a.a.D(0,e)},
dF(d,e){if(this.e)throw A.j(A.a2("Cannot add event after closing."))
if(this.d)return
this.aIR(d,e)},
io(d){return this.dF(d,null)},
aIR(d,e){var x=this
if(x.w){x.a.a.dF(d,e)
return}x.c.jd(d,e)
x.adY()
x.b.adX()
x.a.a.ap(0).hJ(new B.b4n())},
ap(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.adX()
x.c.cK(0,x.a.a.ap(0))}return x.c.a},
adY(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.d4(0)
return},
$ie_:1}
B.aa_.prototype={}
B.aa0.prototype={}
B.xB.prototype={
a9A(d,e){var x=this.b
if((x.b&4)!==0)return
x.D(0,new B.Dr(d,e))
x.ap(0)},
a6o(d){var x
if((this.b.b&4)!==0)throw A.j(B.bDC())
x=A.bs(d)
x.toString
this.a.send(x)},
wk(d,e,f){return this.b2m(0,e,f)},
b2m(d,e,f){var x=0,w=A.i(y.H),v=this,u
var $async$wk=A.d(function(g,h){if(g===1)return A.e(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.j(B.bDC())
u.ap(0)
v.a.close()
return A.f(null,w)}})
return A.h($async$wk,w)},
$ibDB:1}
B.t7.prototype={}
B.Hd.prototype={
k(d,e){if(e==null)return!1
return e instanceof B.Hd&&e.a===this.a},
gB(d){return C.d.gB(this.a)}}
B.D1.prototype={
k(d,e){var x,w,v,u
if(e==null)return!1
if(e instanceof B.D1&&e.a.length===this.a.length){for(x=this.a,w=x.length,v=e.a,u=0;u<w;++u)if(v[u]!==x[u])return!1
return!0}return!1},
gB(d){return A.fF(this.a)},
j(d){return"BinaryDataReceived("+A.u(this.a)+")"}}
B.Dr.prototype={
k(d,e){if(e==null)return!1
return e instanceof B.Dr&&e.a===this.a&&e.b===this.b},
gB(d){return A.fF([this.a,this.b])},
j(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.HK.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketException"
else return"WebSocketException: "+x},
$ibm:1}
B.HJ.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+x}}
B.apJ.prototype={
gjz(){var x,w=this,v=w.w
if(v===$){x=w.r.b
x===$&&A.b()
x=x.a
x===$&&A.b()
v!==$&&A.aL()
v=w.w=new B.amF(w,x)}return v},
aye(d){d.hT(0,new B.apN(this),new B.apO(this),y.a)}}
B.amF.prototype={
ap(d){var x=this.b
x.e=x.d=null
return this.atY(0)}}
B.abq.prototype={
j(d){return"WebSocketChannelException: "+this.a},
$ibm:1}
B.vM.prototype={
H(){return"RTCSignalingState."+this.b}}
B.PR.prototype={
H(){return"RTCIceGatheringState."+this.b}}
B.vK.prototype={
H(){return"RTCPeerConnectionState."+this.b}}
B.mr.prototype={
H(){return"RTCIceConnectionState."+this.b}}
B.a7z.prototype={
H(){return"RTCVideoViewObjectFit."+this.b}}
B.vL.prototype={
H(){return"RTCPriorityType."+this.b}}
B.aM7.prototype={}
B.O2.prototype={}
B.Fg.prototype={
j(d){var x=this.d
return"Track(id: "+A.u(x.id)+", kind: "+A.u(x.kind)+", label: "+A.u(x.label)+", enabled: "+A.u(x.enabled)+", muted: "+A.u(x.muted)+")"}}
B.aHf.prototype={}
B.G8.prototype={}
B.PS.prototype={}
B.bCV.prototype={}
B.a7x.prototype={}
B.G9.prototype={}
B.G7.prototype={}
B.aMj.prototype={}
B.PT.prototype={}
B.aMo.prototype={}
B.At.prototype={}
B.RR.prototype={}
B.PU.prototype={}
B.PW.prototype={
ak7(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.PW(x,w,v)},
b36(d){return this.ak7(null,d,null,null)},
j(d){var x=this
return A.Q(x).j(0)+"(width: "+A.u(x.a)+", height: "+A.u(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["aj<~>()","~()","~(GQ)","bd(G8)","bd(PU)","bd(mr)","~(@)","nB(@)","G7(ak)","ao<m,@>(G9)","bd(bDB)","~(t7)"])
B.aS7.prototype={
$0(){return J.bV1(this.a.b7())},
$S:1}
B.aS8.prototype={
$1(d){var x,w,v,u
try{this.b.D(0,this.a.$ti.y[1].a(d))}catch(v){u=A.ai(v)
if(y.i.b(u)){x=u
w=A.b_(v)
this.b.dF(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.by1.prototype={
$1(d){var x,w,v,u=$.bp().b
if(u==null||u.length===0)return
x=self
w=new x.Headers()
w.set("Authorization","Bearer "+A.u(u))
w.set("Content-Type","application/json")
v=y.N
x.window.fetch("https://connexion-prophetique.onrender.com/messagerie/appels/"+this.a+"/signaux",{method:"POST",headers:w,body:C.ac.he(A.X(["type","termine","contenu",A.D(v,y.z)],v,y.K),null),keepalive:!0})},
$S:27}
B.by0.prototype={
$0(){return self.window.removeEventListener("beforeunload",this.a)},
$S:0}
B.aqN.prototype={
$1(d){if(d==null)return null
return A.bS(J.p(d))},
$S:145}
B.b29.prototype={
$0(){var x=this.a
if(x.c!=null)x.p(new B.b28())},
$S:0}
B.b28.prototype={
$0(){},
$S:0}
B.b1W.prototype={
$1(d){this.a.vk("candidat_ice",d,!1)},
$S:199}
B.b1X.prototype={
$0(){var x=this.a
if(x.c!=null)x.p(new B.b1V(x))},
$S:0}
B.b1V.prototype={
$0(){return this.a.go=!0},
$S:0}
B.b1Y.prototype={
$0(){this.a.l4(A.x("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.b1Z.prototype={
$0(){},
$S:0}
B.b2_.prototype={
$1(d){var x=this.a,w=x.ch
if(x.c!=null&&w!=null&&x.x)x.p(new B.b1U(x,w))},
$S:42}
B.b1U.prototype={
$0(){return this.a.CW=new A.aU(Date.now(),0,!1).eq(this.b)},
$S:0}
B.b20.prototype={
$1(d){},
$S:200}
B.b21.prototype={
$1(d){this.a.vp()},
$S:42}
B.b1z.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.x&&!x.y){if(x.a.f)x.vk("annule",C.b0,!1)
x.l4(A.x("Pas de r\xe9ponse"))}},
$S:0}
B.b1C.prototype={
$0(){var x=this.a
x.fy=x.a.d==="video"||x.at?A.x("Micro ou cam\xe9ra refus\xe9 : autorise le micro et la cam\xe9ra dans les r\xe9glages pour appeler en vid\xe9o."):A.x("Micro refus\xe9 : autorise le micro dans les r\xe9glages pour appeler.")},
$S:0}
B.b1D.prototype={
$1(d){this.a.vk("candidat_ice",d,!1)},
$S:199}
B.b1E.prototype={
$0(){var x=this.a
if(x.c!=null)x.p(new B.b1B(x))},
$S:0}
B.b1B.prototype={
$0(){return this.a.go=!0},
$S:0}
B.b1F.prototype={
$0(){this.a.l4(A.x("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.b1G.prototype={
$0(){return this.a.z=!0},
$S:0}
B.b1H.prototype={
$1(d){var x=this.a,w=x.ch
if(x.c!=null&&w!=null&&x.x)x.p(new B.b1A(x,w))},
$S:42}
B.b1A.prototype={
$0(){return this.a.CW=new A.aU(Date.now(),0,!1).eq(this.b)},
$S:0}
B.b1I.prototype={
$1(d){},
$S:200}
B.b1J.prototype={
$1(d){this.a.vp()},
$S:42}
B.b23.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.OP()},
$S:32}
B.b24.prototype={
$1(d){this.a.l4(A.x("L\u2019appel n\u2019a pas pu aboutir."))},
$S:22}
B.b25.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.Ye("offre",d)},
$S:995}
B.b26.prototype={
$1(d){this.a.l4(A.x("L\u2019appel n\u2019a pas pu aboutir."))},
$S:22}
B.b1T.prototype={
$0(){return this.a.at=!0},
$S:0}
B.b1Q.prototype={
$0(){var x=this.a
x.x=!0
x.ch=new A.aU(Date.now(),0,!1)
x.CW=C.H},
$S:0}
B.b1R.prototype={
$0(){return this.a.id=!0},
$S:0}
B.b1S.prototype={
$1(d){var x=this.a.c
if(x!=null)A.a5(x,!1).ck()},
$S:4}
B.b22.prototype={
$1(d){return A.D(y.N,y.z)},
$S:190}
B.b1v.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.b1t.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.b1u.prototype={
$0(){return this.a.ay=this.b},
$S:0}
B.b1y.prototype={
$0(){return this.a.at=!0},
$S:0}
B.b1s.prototype={
$1(d){var x=null,w=A.k(A.x("Statistiques de l\u2019appel"),x,x,x,x,C.cK,x,x,x),v=this.a,u=A.fm(A.k(v,x,x,x,x,C.cK,x,x,x),x,C.A)
return A.d0(A.a([A.bj(!1,A.k(A.x("Fermer"),x,x,x,x,x,x,x,x),x,x,C.o,x,x,x,x,new B.b1q(d),x,x),A.bj(!1,A.k(A.x("Copier"),x,x,x,x,x,x,x,x),x,x,C.o,x,x,x,x,new B.b1r(v,d),x,x)],y.p),D.oW,u,x,w)},
$S:14}
B.b1q.prototype={
$0(){return A.a5(this.a,!1).ck()},
$S:0}
B.b1r.prototype={
$0(){var x,w,v=null
A.xN(new A.qt(this.a))
x=this.b
A.a5(x,!1).ck()
w=A.x("Statistiques copi\xe9es.")
x.K(y.q).f.X(A.aA(v,v,v,v,v,C.j,v,A.k(w,v,v,v,v,v,v,v,v),v,C.p,v,v,v,v,v,v,v,v,v))},
$S:0}
B.b1w.prototype={
$0(){},
$S:0}
B.b1x.prototype={
$0(){},
$S:0}
B.b1L.prototype={
$0(){var x=this.a,w=x.c
w.toString
A.a5(w,!1).ck()
x.DL()},
$S:0}
B.b1M.prototype={
$0(){var x=this.a,w=x.c
w.toString
A.a5(w,!1).ck()
x.DO()},
$S:0}
B.b1N.prototype={
$0(){var x=this.a,w=x.c
w.toString
A.a5(w,!1).ck()
x.Dy()},
$S:0}
B.b1O.prototype={
$0(){var x=this.a,w=x.c
w.toString
A.a5(w,!1).Tx().b9(0,new B.b1K(x),y.H)},
$S:0}
B.b1K.prototype={
$1(d){return this.a.af5()},
$S:12}
B.b1P.prototype={
$1(d){return A.fH(!0,A.a1(this.a,C.m,C.h,C.F),C.T,!0)},
$S:283}
B.b27.prototype={
$2(d,e){if(!d)this.a.FK()},
$S:336}
B.bmK.prototype={
$2(d,e){var x,w,v,u=null,t=this.a,s=t.d
s===$&&A.b()
s=s.x
s===$&&A.b()
t=t.a.e
x=t?0.07:0.04
t=t?0.55:0.35
w=this.b
v=w+20
s=A.bMt(A.af(u,u,C.i,u,u,new A.aq(u,u,A.cR(C.t.bR(t*(1-s)),3),u,u,u,C.bl),u,v,u,u,u,u,u,v),1+x*s)
w+=8
w=A.af(u,u,C.i,u,u,new A.aq(u,u,A.cR(C.t,2),u,u,u,C.bl),u,w,u,u,u,u,u,w)
e.toString
return A.fe(C.Q,A.a([s,w,e],y.p),C.j,C.b9,u)},
$S:996}
B.bys.prototype={
$3(d,e,f){if(e==null)return d+" : inconnu"
if(typeof e=="number")return d+" : "+C.e.aL(e,1)+f
return d+" : "+A.u(e)+f},
$2(d,e){return this.$3(d,e,"")},
$S:997}
B.aR6.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.X(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+3}
B.aR7.prototype={
$1(d){var x=d.b,w=x.length!==0?C.b.gS(x):null
if(w!=null)this.a.aEW(w)
if(d.c.d.kind==="video"){x=this.a.r
if(x!=null)x.$0()}},
$S:z+4}
B.aR8.prototype={
$1(d){var x
if(d===D.LQ){x=this.a.w
if(x!=null)x.$0()}},
$S:z+5}
B.aR5.prototype={
$0(){var x=this.a
if(x.ay){x.Aa()
x=x.ch
if(x!=null)x.$0()}},
$S:25}
B.atS.prototype={
$1(d){return this.a.ZP()},
$S:16}
B.atT.prototype={
$0(){var x=this.a
if(!x.e)x.DG()},
$S:0}
B.byT.prototype={
$1(d){return d.length!==0},
$S:10}
B.aHv.prototype={
$1(d){return this.a.push(B.bCj(d))},
$S:16}
B.aHw.prototype={
$1(d){return this.a.push(B.bCj(d))},
$S:16}
B.aHs.prototype={
$1(d){var x=this.a.c
if(x!=null)x.$0()},
$S:18}
B.aHt.prototype={
$1(d){},
$S:18}
B.aHu.prototype={
$1(d){},
$S:18}
B.aHh.prototype={
$0(){return!1},
$S:48}
B.aHi.prototype={
$0(){return!1},
$S:48}
B.aHj.prototype={
$1(d){J.fs(d,new B.aHg(this.a))},
$S:199}
B.aHg.prototype={
$2(d,e){this.a.m(0,d,e)},
$S:43}
B.aMa.prototype={
$1(d){},
$S:18}
B.aMb.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.G8(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:18}
B.aMc.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.b()
v=B.cbE(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.bFs())switch(w.cx.a){case 0:w.cy=D.LV
break
case 1:w.cy=D.LW
break
case 3:w.cy=D.LX
break
case 5:w.cy=D.LT
break
case 6:w.cy=D.LU
break
case 7:w.cy=D.t_
break
default:break}},
$S:29}
B.aMd.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.b()
x.CW=B.cbF(w.iceGatheringState)},
$S:29}
B.aMe.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.b()
x.ch=B.cdw(w.signalingState)},
$S:29}
B.aMf.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.b()
x.cy=B.cd8(w.connectionState)},
$S:29}
B.aMg.prototype={
$1(d){},
$S:29}
B.aMh.prototype={
$1(d){var x,w,v=this.a,u=v.Q
if(u!=null){x=B.bCj(d.track)
w=d.streams
w=y.l.b(w)?w:new A.cy(w,A.Z(w).i("cy<1,ak>"))
v=J.e3(w,new B.aM9(v),y.h)
u.$1(new B.PU(A.H(v,!0,v.$ti.i("aC.E")),x))}},
$S:18}
B.aM9.prototype={
$1(d){return new B.nB(d,this.a.as)},
$S:z+7}
B.aMi.prototype={
$2(d,e){var x,w,v=y.M.a(A.Ct(d)),u=A.D(y.N,y.z)
for(x=v.geb(v),x=x.gZ(x);x.t();){w=x.gG(x)
u.m(0,J.p(w.a),w.b)}this.a.push(new B.RR(d.type,u))},
$S:998}
B.aMm.prototype={
$1(d){var x="id",w=y.f.a(A.Ct(d)),v=J.d8(w)
if(v.aA(w,x))v.m(w,x,C.e.u(A.j_(v.h(w,x))))
v.h(w,"uri")
v.h(w,x)
v.h(w,"encrypted")
return new B.G7()},
$S:z+8}
B.aMl.prototype={
$1(d){var x,w,v,u,t,s,r,q,p,o=null,n="numTemporalLayers",m="scaleResolutionDownBy",l=A.Ct(d.rid),k=d.active,j=d.maxBitrate
j=j==null?o:A.b2(j)
x=d.maxFramerate
x=x==null?o:A.b2(x)
w=d.minBitrate
w=w==null?o:A.b2(w)
v=d.numTemporalLayers
v=v==null?o:A.b2(v)
u=d.scaleResolutionDownBy
if(u==null)u=o
t=d.ssrc
t=t==null?o:A.b2(t)
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
k=B.bQU(p.h(0,"priority"))
l=k==null?D.t0:k
this.a.push(new B.G9(q,r,s,u,t,v,w,x,j,l,B.bQU(p.h(0,"networkPriority"))))},
$S:16}
B.aMk.prototype={
$1(d){var x,w,v,u,t,s=null,r=d.payloadType,q=d.name
if(q==null)q=s
x=d.kind
if(x==null)x=s
w=d.clockRate
v=d.numChannels
v=v==null?s:A.b2(v)
u=d.parameters
u=u==null?s:A.Ct(u)
t=y.z
t=A.X(["payloadType",r,"name",q,"kind",x,"clockRate",w,"numChannels",v,"parameters",u],t,t)
t.h(0,"payloadType")
t.h(0,"name")
t.h(0,"kind")
t.h(0,"clockRate")
t.h(0,"numChannels")
t.h(0,"parameters")
this.a.push(new B.a7x())},
$S:16}
B.aMn.prototype={
$1(d){var x,w,v=A.D(y.N,y.z)
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
x=$.bUR()
v.m(0,"priority",x.h(0,d.y))
w=d.z
if(w!=null)v.m(0,"networkPriority",x.h(0,w))
return v},
$S:z+9}
B.bz0.prototype={
$1(d){return J.j2(self.window.navigator.userAgent,A.bE(d,!1,!1))},
$S:10}
B.aMt.prototype={
$1(d){var x,w,v,u,t
for(x=this.a,w=x.at,v=w.length,u=0;u<w.length;w.length===v||(0,A.G)(w),++u)w[u].a_(0)
C.b.aa(w)
t=self.document.createElement("video")
t.autoplay=!0
t.muted=!0
t.controls=!1
t.srcObject=x.x
t.id="video_"+("RTCVideoRenderer-"+x.Q)
t.setAttribute("playsinline","true")
x.a8p(t)
v=y.bU.c
w.push(A.ha(t,"canplay",new B.aMp(x),!1,v))
w.push(A.ha(t,"resize",new B.aMq(x),!1,v))
w.push(A.ha(t,"error",new B.aMr(t),!1,v))
w.push(A.ha(t,"ended",new B.aMs(),!1,v))
return t},
$S:143}
B.aMp.prototype={
$1(d){this.a.ahk()},
$S:16}
B.aMq.prototype={
$1(d){this.a.ahk()},
$S:16}
B.aMr.prototype={
$1(d){var x,w,v=this.a.error
A.ou("RTCVideoRenderer: videoElement.onError, "+J.p(v))
v.toString
x=C.Ha.h(0,A.aa(v,"code"))
x.toString
w=!J.n(A.aa(v,"message"),"")?A.aa(v,"message"):"No further diagnostic information can be determined or provided."
throw A.j(A.nK(x,C.H9.h(0,A.aa(v,"code")),w,null))},
$S:27}
B.aMs.prototype={
$1(d){},
$S:16}
B.aMu.prototype={
$0(){},
$S:0}
B.aMw.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aMv.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.aBz("RTCVideoRenderer-"+w.Q)
else w=A.af(x,x,C.i,x,x,x,x,x,x,x,x,x,x,x)
return A.cK(A.af(x,w,C.i,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:999}
B.aAM.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.b()
v.c=x.hz(w.gl6(w),new B.aAL(v),w.gqo())},
$S:0}
B.aAL.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.b()
w.adY()
x=x.b
x===$&&A.b()
x.ap(0)},
$S:0}
B.b4n.prototype={
$1(d){},
$S:22}
B.asM.prototype={
$1(d){this.a.cK(0,this.b)},
$S:18}
B.asN.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.hc(new B.HK("Failed to connect WebSocket"))
else this.b.a9A(1006,"error")},
$S:18}
B.asO.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.cc("data")
if(typeof x==="string")w.b=new B.Hd(A.bv(x))
else if(typeof x==="object"&&A.bJH(y.m.a(x),"ArrayBuffer"))w.b=new B.D1(A.Os(y.R.a(x),0,null))
else throw A.j(A.a2("unexpected message type: "+J.ar(x).j(0)))
v.D(0,w.b7())},
$S:27}
B.asP.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.cK(0,this.b)
this.b.a9A(d.code,d.reason)},
$S:18}
B.apN.prototype={
$1(d){var x=d.b,w=this.a
new A.cL(x,A.w(x).i("cL<1>")).dd(new B.apK(w))
x=w.r.a
x===$&&A.b()
x=x.b
x===$&&A.b()
new A.cL(x,A.w(x).i("cL<1>")).baR(new B.apL(d),new B.apM(w,d))
w.f.d4(0)},
$S:z+10}
B.apK.prototype={
$1(d){var x,w,v
$label0$0:{x=d instanceof B.Hd
w=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.b()
x=x.a
x===$&&A.b()
x.D(0,w)
break $label0$0}x=d instanceof B.D1
v=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.b()
x=x.a
x===$&&A.b()
x.D(0,v)
break $label0$0}if(d instanceof B.Dr){x=this.a.r.a
x===$&&A.b()
x=x.a
x===$&&A.b()
x.ap(0)}}},
$S:z+11}
B.apL.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.an(B.bDC())
s=A.bs(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.k.b(x)
if(t)v=x
if(t){this.a.a6o(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.a6o(new Uint8Array(A.bw(u)))
break $label1$1}t=A.aJ("Cannot send "+J.ar(d).j(0))
throw A.j(t)}}catch(r){if(!(A.ai(r) instanceof B.HJ))throw r}},
$S:13}
B.apM.prototype={
$0(){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q
var $async$$0=A.d(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
x=6
return A.c(t.b.wk(0,s.d,s.e),$async$$0)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(!(A.ai(q) instanceof B.HJ))throw q
x=5
break
case 2:x=1
break
case 5:return A.f(null,w)
case 1:return A.e(u,w)}})
return A.h($async$$0,w)},
$S:1}
B.apO.prototype={
$1(d){var x,w=d instanceof A.Sy?d:new B.abq(J.p(d)),v=this.a
v.f.hc(w)
v=v.r.a
v===$&&A.b()
x=v.a
x===$&&A.b()
x.io(w)
v=v.a
v===$&&A.b()
v.ap(0)},
$S:29};(function aliases(){var x=B.DZ.prototype
x.atY=x.ap
x=B.ZD.prototype
x.axA=x.n})();(function installTearOffs(){var x=a._instance_1u,w=a._instance_0u
var v
x(v=B.Uz.prototype,"gahb","ahc",2)
w(v,"gaeM","FK",0)
w(v,"gaf4","af5",1)
w(v,"ga8J","MC",0)
w(v,"ga8I","MB",0)
w(v,"ga8G","MA",0)
w(v,"ga8H","DL",0)
w(v,"ga8K","MD",0)
w(v,"gae5","aQM",1)
x(v=B.a1l.prototype,"gaU8","aU9",6)
w(v,"gaSG","ZP",1)
w(B.PV.prototype,"gdO","n",0)
w(B.PY.prototype,"gaPU","aPV",1)})();(function inheritance(){var x=a.mixinHard,w=a.inheritMany,v=a.inherit
w(A.P,[B.DZ,B.aqL,B.GQ,B.a1E,B.aR4,B.a1l,B.a4X,B.aM7,B.O2,B.Fg,B.aHf,B.PS,B.PT,B.aMo,B.aa0,B.V6,B.aa_,B.xB,B.t7,B.HK,B.abq,B.G8,B.bCV,B.a7x,B.G9,B.G7,B.aMj,B.At,B.RR,B.PU,B.PW])
v(B.Rs,A.fn)
w(A.xO,[B.aS7,B.by0,B.b29,B.b28,B.b1X,B.b1V,B.b1Y,B.b1Z,B.b1U,B.b1z,B.b1C,B.b1E,B.b1B,B.b1F,B.b1G,B.b1A,B.b1T,B.b1Q,B.b1R,B.b1v,B.b1t,B.b1u,B.b1y,B.b1q,B.b1r,B.b1w,B.b1x,B.b1L,B.b1M,B.b1N,B.b1O,B.aR5,B.atT,B.aHh,B.aHi,B.aMu,B.aMw,B.aAM,B.aAL,B.apM])
w(A.oK,[B.aS8,B.by1,B.aqN,B.b1W,B.b2_,B.b20,B.b21,B.b1D,B.b1H,B.b1I,B.b1J,B.b23,B.b24,B.b25,B.b26,B.b1S,B.b22,B.b1s,B.b1K,B.b1P,B.bys,B.aR6,B.aR7,B.aR8,B.atS,B.byT,B.aHv,B.aHw,B.aHs,B.aHt,B.aHu,B.aHj,B.aMa,B.aMb,B.aMc,B.aMd,B.aMe,B.aMf,B.aMg,B.aMh,B.aM9,B.aMm,B.aMl,B.aMk,B.aMn,B.bz0,B.aMt,B.aMp,B.aMq,B.aMr,B.aMs,B.b4n,B.asM,B.asN,B.asO,B.asP,B.apN,B.apK,B.apL,B.apO])
w(A.T,[B.uk,B.IW,B.PX])
w(A.V,[B.Uz,B.ZD,B.PY])
w(A.Lj,[B.b27,B.bmK,B.aHg,B.aMi,B.aMv])
w(A.a8,[B.adk,B.TC,B.wC])
v(B.ahB,B.ZD)
v(B.aM8,B.aM7)
v(B.nB,B.O2)
v(B.a5s,B.Fg)
v(B.O1,B.aHf)
v(B.a7w,B.PS)
v(B.a7y,B.PT)
v(B.bCW,B.aMo)
v(B.PV,A.dq)
w(B.aa0,[B.a3F,B.apJ])
w(B.t7,[B.Hd,B.D1,B.Dr])
v(B.HJ,B.HK)
v(B.amF,B.DZ)
w(A.aeS,[B.vM,B.PR,B.vK,B.mr,B.a7z,B.vL])
x(B.ZD,A.h6)})()
A.amh(b.typeUniverse,JSON.parse('{"DZ":{"e_":["1"]},"Rs":{"fn":["1","2"],"fn.S":"1","fn.T":"2"},"IW":{"T":[],"l":[]},"uk":{"T":[],"l":[]},"Uz":{"V":["uk"]},"adk":{"a8":[],"l":[]},"TC":{"a8":[],"l":[]},"wC":{"a8":[],"l":[]},"ahB":{"V":["IW"]},"nB":{"O2":[]},"a5s":{"Fg":[]},"a7w":{"PS":[]},"a7y":{"PT":[]},"PV":{"dq":["PW"],"aO":[]},"PX":{"T":[],"l":[]},"PY":{"V":["PX"]},"V6":{"e_":["1"]},"xB":{"bDB":[]},"Hd":{"t7":[]},"D1":{"t7":[]},"Dr":{"t7":[]},"HK":{"bm":[]},"HJ":{"bm":[]},"amF":{"e_":["@"]},"abq":{"bm":[]}}'))
A.bNK(b.typeUniverse,JSON.parse('{"DZ":1,"V6":1,"aa0":1}'))
var y=(function rtii(){var x=A.al
return{b:x("xB"),L:x("bm"),_:x("aj<@>"),x:x("aj<~>"),T:x("B<ao<m,I>>"),t:x("B<ao<m,@>>"),Q:x("B<Fg>"),B:x("B<a7x>"),O:x("B<G9>"),o:x("B<RR>"),d:x("B<iT<@>>"),s:x("B<m>"),p:x("B<l>"),r:x("B<P?>"),m:x("ak"),M:x("NM<P?,P?>"),l:x("E<ak>"),F:x("E<ao<m,@>>"),J:x("E<RR>"),j:x("E<@>"),I:x("E<v>"),P:x("ao<m,@>"),f:x("ao<@,@>"),E:x("O2"),G:x("Fg"),h:x("nB"),R:x("pc"),a:x("bd"),K:x("P"),W:x("G7"),Y:x("PS"),e:x("PT"),v:x("At"),Z:x("aa_<P?>"),N:x("m"),i:x("pL"),k:x("fA"),D:x("t7"),U:x("ah<m>"),g:x("dh<GQ>"),n:x("dh<~>"),V:x("aY<xB>"),u:x("aY<@>"),w:x("aY<~>"),bU:x("UG<ak>"),C:x("oi<ak>"),cF:x("ap<xB>"),c:x("ap<@>"),d4:x("ap<~>"),q:x("C8"),y:x("I"),z:x("@"),S:x("v"),A:x("ak?"),cO:x("ao<m,@>?"),X:x("P?"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.oW=new A.N(1,0.10588235294117647,0.17254901960784313,0.25098039215686274,C.n)
D.YX=new B.a1E(C.ce)
D.a12=new A.Y(20,0,20,0)
D.a1p=new A.Y(8,20,8,20)
D.a1K=new A.f6(1,C.bf,C.tL,null)
D.z5=new A.a7(57639,"MaterialIcons",null,!1)
D.a3b=new A.a7(58337,"MaterialIcons",null,!1)
D.a3c=new A.a7(58341,"MaterialIcons",null,!1)
D.a3i=new A.a7(58721,"MaterialIcons",null,!0)
D.a3n=new A.a7(58888,"MaterialIcons",null,!1)
D.a3q=new A.a7(59048,"MaterialIcons",null,!1)
D.a3r=new A.a7(59049,"MaterialIcons",null,!1)
D.a5D=new A.ae(C.q6,null,C.f,null,null)
D.a5C=new A.ae(C.q6,28,C.f,null,null)
D.a3u=new A.a7(61044,"MaterialIcons",null,!1)
D.a5L=new A.ae(D.a3u,null,C.f,null,null)
D.zj=new A.a7(58923,"MaterialIcons",null,!1)
D.a5P=new A.ae(D.zj,null,C.f,null,null)
D.a5O=new A.ae(D.zj,20,C.f,null,null)
D.afH=A.a(x([1,2,4,8,16]),A.al("B<v>"))
D.BP=A.a(x([]),y.Q)
D.Ho=new A.fi("FlutterWebRTC.Method",C.aS,null)
D.avW=new B.mr(0,"RTCIceConnectionStateNew")
D.avX=new B.mr(1,"RTCIceConnectionStateChecking")
D.avY=new B.mr(2,"RTCIceConnectionStateCompleted")
D.avZ=new B.mr(3,"RTCIceConnectionStateConnected")
D.aw_=new B.mr(4,"RTCIceConnectionStateCount")
D.LQ=new B.mr(5,"RTCIceConnectionStateFailed")
D.aw0=new B.mr(6,"RTCIceConnectionStateDisconnected")
D.LR=new B.mr(7,"RTCIceConnectionStateClosed")
D.LS=new B.PR(0,"RTCIceGatheringStateNew")
D.aw1=new B.PR(1,"RTCIceGatheringStateGathering")
D.aw2=new B.PR(2,"RTCIceGatheringStateComplete")
D.t_=new B.vK(0,"RTCPeerConnectionStateClosed")
D.LT=new B.vK(1,"RTCPeerConnectionStateFailed")
D.LU=new B.vK(2,"RTCPeerConnectionStateDisconnected")
D.LV=new B.vK(3,"RTCPeerConnectionStateNew")
D.LW=new B.vK(4,"RTCPeerConnectionStateConnecting")
D.LX=new B.vK(5,"RTCPeerConnectionStateConnected")
D.LY=new B.vL(0,"veryLow")
D.t0=new B.vL(1,"low")
D.LZ=new B.vL(2,"medium")
D.M_=new B.vL(3,"high")
D.aw3=new B.vM(0,"RTCSignalingStateStable")
D.aw4=new B.vM(1,"RTCSignalingStateHaveLocalOffer")
D.aw5=new B.vM(2,"RTCSignalingStateHaveRemoteOffer")
D.aw6=new B.vM(3,"RTCSignalingStateHaveLocalPrAnswer")
D.aw7=new B.vM(4,"RTCSignalingStateHaveRemotePrAnswer")
D.M0=new B.vM(5,"RTCSignalingStateClosed")
D.aw8=new B.PW(0,0,0)
D.t1=new B.a7z(0,"RTCVideoViewObjectFitContain")
D.M1=new B.a7z(1,"RTCVideoViewObjectFitCover")
D.uh=new A.y(!0,C.an,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.aEw=new A.y(!0,C.f,null,null,null,null,13,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.bEp=null
$.bMX=!1
$.bL8=1
$.cdT=A.X(["very-low",D.LY,"low",D.t0,"medium",D.LZ,"high",D.M_],y.N,A.al("vL"))})();(function lazyInitializers(){var x=a.lazyFinal
x($,"chu","ap7",()=>new B.aM8())
x($,"cfy","bFs",()=>C.d.q(A.aa(A.aa(A.aa(A.bF6(),"window"),"navigator"),"userAgent"),"Firefox"))
x($,"cmd","bUR",()=>A.X([D.LY,"very-low",D.t0,"low",D.LZ,"medium",D.M_,"high"],A.al("vL"),y.N))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_1",e:"endPart",h:b})})($__dart_deferred_initializers__,"APK8Sbb961ieGi/MzegAgGyRm3Q=");