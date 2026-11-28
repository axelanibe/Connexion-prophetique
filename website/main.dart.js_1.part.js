((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_1",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={Dz:function Dz(){},R1:function R1(d){this.$ti=d},aQL:function aQL(d){this.a=d},aQM:function aQM(d,e){this.a=d
this.b=e},
bLs(d){var x
B.btn()
if(d.length===0)return
x=A.bx(new B.btX(d))
self.window.addEventListener("beforeunload",x)
$.bAd=new B.btW(x)},
btn(){var x=$.bAd
if(x!=null)x.$0()
$.bAd=null},
btX:function btX(d){this.a=d},
btW:function btW(d){this.a=d},
apZ(d){var x,w,v=new B.aq_(),u=J.W(d),t=u.h(d,"id")
t=J.u(t==null?"":t)
x=u.h(d,"conversation_id")
J.u(x==null?"":x)
x=u.h(d,"appelant_id")
x=J.u(x==null?"":x)
w=u.h(d,"appelant_nom")
J.u(w==null?"":w)
A.az(u.h(d,"appele_id"))
A.az(u.h(d,"appele_nom"))
w=u.h(d,"type")
J.u(w==null?"audio":w)
w=u.h(d,"statut")
w=J.u(w==null?"sonne":w)
v.$1(u.h(d,"cree_le"))
v.$1(u.h(d,"repondu_le"))
return new B.apY(t,x,w)},
byS(d){var x,w,v,u=J.W(d),t=u.h(d,"contenu"),s=u.h(d,"id")
s=J.u(s==null?"":s)
x=u.h(d,"appel_id")
J.u(x==null?"":x)
x=u.h(d,"emetteur_id")
x=J.u(x==null?"":x)
w=u.h(d,"type")
w=J.u(w==null?"":w)
if(y.P.b(t))v=t
else v=y.f.b(t)?J.lA(t,y.N,y.z):C.b4
if(u.h(d,"cree_le")!=null)A.cj(J.u(u.h(d,"cree_le")))
return new B.Gl(s,x,w,v)},
bSL(d){var x,w,v,u,t,s,r=J.W(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return D.XP
x=A.a([],y.t)
for(r=J.a9(q),w=y.f,v=y.P,u=y.N,t=y.z;r.t();){s=r.gG(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.lA(s,u,t))}return new B.a10(x)},
bMe(d){var x=J.W(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.og(v)
if(!x.k(v,"offer")&&!x.k(v,"answer"))return null
return new A.ai3(w,v)},
c5D(d){var x,w,v=J.W(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.ai6(u,A.of(w)?w:null,v)},
apY:function apY(d,e,f){this.a=d
this.c=e
this.w=f},
aq_:function aq_(){},
Gl:function Gl(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a10:function a10(d){this.a=d},
anR(d){return B.c6s(d)},
c6s(d){var x=0,w=A.i(y.y),v
var $async$anR=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:v=!0
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$anR,w)},
bEj(d,e,f,g,h,i,j,k,l,m){return new B.u1(f,m,h,l,i,d,j,k,e,g,null)},
bIQ(d,e,f,g,h,i,j,k,l,m,n){return new B.acB(e,g,f,d,n,k,j,i,h,l,m,null)},
bKw(d,e){var x=null
return new A.ai(D.ph,A.m(d.toUpperCase(),x,2,C.W,x,A.cw(x,x,C.f,x,x,x,x,x,"Cinzel",x,x,e,x,x,C.R,x,x,!0,x,1.2,x,x,x,x,x,x),C.aw,x,x),x)},
u1:function u1(d,e,f,g,h,i,j,k,l,m,n){var _=this
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
U6:function U6(d,e){var _=this
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
b0w:function b0w(d){this.a=d},
b0v:function b0v(){},
b0i:function b0i(d){this.a=d},
b0j:function b0j(d){this.a=d},
b0h:function b0h(d){this.a=d},
b0k:function b0k(d){this.a=d},
b0l:function b0l(){},
b0m:function b0m(d){this.a=d},
b0g:function b0g(d,e){this.a=d
this.b=e},
b0n:function b0n(){},
b0o:function b0o(d){this.a=d},
b_W:function b_W(d){this.a=d},
b_Z:function b_Z(d){this.a=d},
b0_:function b0_(d){this.a=d},
b00:function b00(d){this.a=d},
b_Y:function b_Y(d){this.a=d},
b01:function b01(d){this.a=d},
b02:function b02(d){this.a=d},
b03:function b03(d){this.a=d},
b_X:function b_X(d,e){this.a=d
this.b=e},
b04:function b04(){},
b05:function b05(d){this.a=d},
b0q:function b0q(d){this.a=d},
b0r:function b0r(d){this.a=d},
b0s:function b0s(d){this.a=d},
b0t:function b0t(d){this.a=d},
b0f:function b0f(d){this.a=d},
b0c:function b0c(d,e){this.a=d
this.b=e},
b0d:function b0d(d){this.a=d},
b0e:function b0e(d){this.a=d},
b0p:function b0p(){},
b_S:function b_S(d,e){this.a=d
this.b=e},
b_Q:function b_Q(d,e){this.a=d
this.b=e},
b_R:function b_R(d,e){this.a=d
this.b=e},
b_V:function b_V(d){this.a=d},
b_P:function b_P(d){this.a=d},
b_N:function b_N(d){this.a=d},
b_O:function b_O(d,e){this.a=d
this.b=e},
b_T:function b_T(){},
b_U:function b_U(){},
b07:function b07(d){this.a=d},
b08:function b08(d){this.a=d},
b09:function b09(d){this.a=d},
b0a:function b0a(d){this.a=d},
b06:function b06(d){this.a=d},
b0b:function b0b(d){this.a=d},
b0u:function b0u(d){this.a=d},
acB:function acB(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
Ta:function Ta(d,e){this.c=d
this.a=e},
wh:function wh(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
Ir:function Ir(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
agS:function agS(d,e){var _=this
_.d=$
_.eO$=d
_.bL$=e
_.c=_.a=null},
biU:function biU(d,e){this.a=d
this.b=e},
Z_:function Z_(){},
c8P(a3,a4){var x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=null,a0="kind",a1="video",a2="packetsLost"
for(x=J.a9(a3),w=d,v=w,u=v,t=u,s=t,r=s,q=r,p=q,o=p,n=o,m=n;x.t();){l=x.gG(x)
k=l.d
l=l.b
if(l==="codec"){l=k.h(0,"mimeType")
j=J.u(l==null?"":l)
if(C.e.bj(j,"video/"))m=C.e.c_(j,6)}else if(l==="outbound-rtp"&&J.n(k.h(0,a0),a1)){l=A.bS(k.h(0,"bytesSent"))
n=l==null?d:C.d.v(l)
l=A.bS(k.h(0,"packetsSent"))
o=l==null?d:C.d.v(l)
u=A.bS(k.h(0,"framesPerSecond"))
if(u==null)u=d
l=A.bS(k.h(0,"frameWidth"))
v=l==null?d:C.d.v(l)
l=A.bS(k.h(0,"frameHeight"))
w=l==null?d:C.d.v(l)}else if(l==="remote-inbound-rtp"&&J.n(k.h(0,a0),a1)){l=A.bS(k.h(0,a2))
p=l==null?d:C.d.v(l)
r=A.bS(k.h(0,"jitter"))
if(r==null)r=d
i=A.bS(k.h(0,"roundTripTime"))
if(i==null)i=d
if(i!=null)t=i*1000}else if(l==="inbound-rtp"&&J.n(k.h(0,a0),a1)){l=A.bS(k.h(0,a2))
q=l==null?d:C.d.v(l)
s=A.bS(k.h(0,"jitter"))
if(s==null)s=d}else if(l==="candidate-pair"&&J.n(k.h(0,"state"),"succeeded")){i=A.bS(k.h(0,"currentRoundTripTime"))
if(i==null)i=d
if(t==null&&i!=null)t=i*1000}}x=a4==null
l=A.bS(x?d:a4.h(0,"octetsEnvoyes"))
h=l==null?d:C.d.v(l)
l=A.bS(x?d:a4.h(0,"horodatageMs"))
g=l==null?d:C.d.v(l)
x=Date.now()
if(n!=null&&h!=null&&g!=null){f=(x-g)/1000
e=f>0&&n>=h?(n-h)*8/f/1000:d}else e=d
l=r==null?d:r*1000
return A.Y(["codecVideo",m,"octetsEnvoyes",n,"paquetsEnvoyes",o,"paquetsPerdusEnvoi",p,"paquetsPerdusReception",q,"gigueEnvoiMs",l,"gigueReceptionMs",s==null?d:s*1000,"allerRetourMs",t,"debitSortantKbitS",e,"imagesParSeconde",u,"largeur",v,"hauteur",w,"horodatageMs",x],y.N,y.z)},
bLC(d){var x=new B.buj(),w=J.W(d),v=w.h(d,"largeur")!=null&&w.h(d,"hauteur")!=null?A.t(w.h(d,"largeur"))+"x"+A.t(w.h(d,"hauteur")):null
return C.c.b0(A.a([x.$2("Codec vid\xe9o",w.h(d,"codecVideo")),x.$3("D\xe9bit sortant",w.h(d,"debitSortantKbitS")," kbit/s"),x.$2("Paquets envoy\xe9s",w.h(d,"paquetsEnvoyes")),x.$2("Paquets perdus (envoi)",w.h(d,"paquetsPerdusEnvoi")),x.$2("Paquets perdus (r\xe9ception)",w.h(d,"paquetsPerdusReception")),x.$3("Gigue (envoi)",w.h(d,"gigueEnvoiMs")," ms"),x.$3("Gigue (r\xe9ception)",w.h(d,"gigueReceptionMs")," ms"),x.$3("Aller-retour",w.h(d,"allerRetourMs")," ms"),x.$2("Images par seconde",w.h(d,"imagesParSeconde")),x.$2("R\xe9solution envoy\xe9e",v)],y.s),"\n")},
buj:function buj(){},
aPC:function aPC(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.y=_.x=!1
_.ax=_.at=_.as=_.Q=_.z=null
_.ay=!1
_.ch=null
_.CW=!1},
aPE:function aPE(d){this.a=d},
aPF:function aPF(d){this.a=d},
aPG:function aPG(d){this.a=d},
aPD:function aPD(d){this.a=d},
a0I:function a0I(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.y=_.x=null},
asV:function asV(d){this.a=d},
asW:function asW(d){this.a=d},
bLP(d){var x=y.U,w=A.H(new A.af(A.a(d.split(" "),y.s),new B.buK(),x),!0,x.i("p.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.o(C.c.gS(w),0).toUpperCase()
return(J.o(C.c.gS(w),0)+J.o(C.c.gaC(w),0)).toUpperCase()},
buK:function buK(){},
a4g:function a4g(){this.a=null},
aKM:function aKM(){},
nq:function nq(d,e){this.e=d
this.b=e},
aGl:function aGl(d){this.a=d},
aGm:function aGm(d){this.a=d},
by4(d){var x=new B.a4M(d)
x.ax7(d)
return x},
a4M:function a4M(d){this.d=d
this.c=null},
aGi:function aGi(d){this.a=d},
aGj:function aGj(d){this.a=d},
aGk:function aGk(d){this.a=d},
Nx:function Nx(){},
aGb:function aGb(){},
aGc:function aGc(){},
aGd:function aGd(d){this.a=d},
aGa:function aGa(d){this.a=d},
bXZ(d,e){var x=y.N
x=new B.a6O(d,e,A.C(x,y.E),A.C(x,y.z))
x.axh(d,e)
return x},
a6O:function a6O(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aKO:function aKO(d){this.a=d},
aKP:function aKP(d){this.a=d},
aKQ:function aKQ(d){this.a=d},
aKR:function aKR(d){this.a=d},
aKS:function aKS(d){this.a=d},
aKT:function aKT(d){this.a=d},
aKU:function aKU(d){this.a=d},
aKV:function aKV(d){this.a=d},
aKN:function aKN(d){this.a=d},
aKW:function aKW(d){this.a=d},
bY1(d){var x=d.headerExtensions
x=y.l.b(x)?x:new A.cY(x,A.a_(x).i("cY<1,ah>"))
x=J.eG(x,new B.aL_(),y.W)
return A.H(x,!0,x.$ti.i("aD.E"))},
bY0(d){var x,w
if("encodings" in d)x=d.encodings
else x=[]
w=A.a([],y.O)
C.c.aE(x,new B.aKZ(w))
return w},
bY_(d){var x,w
if("codecs" in d)x=d.codecs
else x=[]
w=A.a([],y.B)
C.c.aE(x,new B.aKY(w))
return w},
aL_:function aL_(){},
aKZ:function aKZ(d){this.a=d},
aKY:function aKY(d){this.a=d},
a6Q:function a6Q(d){this.a=d},
aL0:function aL0(){},
byH:function byH(d){this.a=d},
c7C(){return C.c.mW(A.a(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.buS())!==-1},
buS:function buS(){},
bGW(){var x=A.a([],y.d),w=$.bGX
$.bGX=w+1
return new B.Pu(w,x,D.at7,$.ak())},
Pu:function Pu(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.fy$=0
_.go$=g
_.k1$=_.id$=0},
aL6:function aL6(d){this.a=d},
aL2:function aL2(d){this.a=d},
aL3:function aL3(d){this.a=d},
aL4:function aL4(d){this.a=d},
aL5:function aL5(){},
byI(d,e,f){return new B.Pw(d,f,e,null)},
Pw:function Pw(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
Px:function Px(){this.c=this.a=null},
aL7:function aL7(){},
aL9:function aL9(d){this.a=d},
aL8:function aL8(d){this.a=d},
bEX(d,e,f,g){var x,w={}
w.a=d
x=new B.a3_(g.i("a3_<0>"))
x.awP(e,f,w,g)
return x},
a3_:function a3_(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
azI:function azI(d,e){this.a=d
this.b=e},
azH:function azH(d){this.a=d},
UD:function UD(d,e,f,g){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g},
b2H:function b2H(){},
a9h:function a9h(d){this.b=this.a=$
this.$ti=d},
a9i:function a9i(){},
bwN(d,e){return B.bS_(d,e)},
bS_(d,e){var x=0,w=A.i(y.b),v,u,t,s,r,q,p
var $async$bwN=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:if(!d.S5("ws")&&!d.S5("wss"))throw A.j(A.fv(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.j(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.xg(r,A.io(null,null,null,!1,y.D))
u=new A.ap($.as,y.cF)
p=new A.aV(u,y.V)
if(J.n(r.readyState,1))p.cO(0,q)
else if(J.n(r.readyState,2)||J.n(r.readyState,3))p.ha(new B.He("Unexpected WebSocket state: "+A.t(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.o5(r,"open",!1,y.C).gS(0).bd(0,new B.arR(p,q),y.H)
t=y.C
s=y.H
new A.o5(r,"error",!1,t).gS(0).bd(0,new B.arS(p,q),s)
A.h5(r,"message",new B.arT(q),!1,y.m)
new A.o5(r,"close",!1,t).gS(0).bd(0,new B.arU(p,q),s)
v=u
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$bwN,w)},
xg:function xg(d,e){this.a=d
this.b=e},
arR:function arR(d,e){this.a=d
this.b=e},
arS:function arS(d,e){this.a=d
this.b=e},
arT:function arT(d){this.a=d},
arU:function arU(d,e){this.a=d
this.b=e},
bzq(){return new B.Hd("Connection Closed")},
rO:function rO(){},
GJ:function GJ(d){this.a=d},
CB:function CB(d){this.a=d},
D1:function D1(d,e){this.a=d
this.b=e},
He:function He(d){this.a=d},
Hd:function Hd(d){this.a=d},
bRq(d){var x=null,w=$.as,v=new B.a9h(y.Z),u=y.X,t=A.io(x,x,x,!0,u),s=A.io(x,x,x,!0,u)
v.a=B.bEX(new A.cM(s,A.v(s).i("cM<1>")),new A.IT(t),!0,u)
v.b=B.bEX(new A.cM(t,A.v(t).i("cM<1>")),new A.IT(s),!1,u)
v=new B.aoY(new A.aV(new A.ap(w,y.d4),y.w),v)
v.awA(d)
return v},
aoY:function aoY(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
ap1:function ap1(d){this.a=d},
aoZ:function aoZ(d){this.a=d},
ap_:function ap_(d){this.a=d},
ap0:function ap0(d,e){this.a=d
this.b=e},
ap2:function ap2(d){this.a=d},
alV:function alV(d,e){this.b=d
this.a=e},
aaJ:function aaJ(d){this.a=d},
c7d(d){switch(d){case"new":return D.asV
case"checking":return D.asW
case"connected":return D.asY
case"completed":return D.asX
case"failed":return D.L1
case"disconnected":return D.at_
case"closed":return D.L2
case"count":return D.asZ}return D.L2},
c7e(d){switch(d){case"new":return D.L3
case"gathering":return D.at0
case"complete":return D.at1}return D.L3},
c92(d){switch(d){case"stable":return D.at2
case"have-local-offer":return D.at3
case"have-local-pranswer":return D.at5
case"have-remote-offer":return D.at4
case"have-remote-pranswer":return D.at6
case"closed":return D.Lc}return D.Lc},
c8F(d){switch(d){case"new":return D.L6
case"connecting":return D.L7
case"connected":return D.L8
case"closed":return D.rs
case"disconnected":return D.L5
case"failed":return D.L4}return D.rs},
bMC(d){if(d==null)return null
return $.c9p.h(0,d)},
vs:function vs(d,e){this.a=d
this.b=e},
Pq:function Pq(d,e){this.a=d
this.b=e},
vq:function vq(d,e){this.a=d
this.b=e},
me:function me(d,e){this.a=d
this.b=e},
a6R:function a6R(d,e){this.a=d
this.b=e},
vr:function vr(d,e){this.a=d
this.b=e},
aKL:function aKL(){},
Ny:function Ny(){},
ER:function ER(){},
aG9:function aG9(){},
FE:function FE(d,e,f){this.a=d
this.b=e
this.c=f},
Pr:function Pr(){},
byG:function byG(){},
a6P:function a6P(){},
FF:function FF(d,e,f,g,h,i,j,k,l,m,n){var _=this
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
FD:function FD(){},
aKX:function aKX(d){this.d=d},
Ps:function Ps(){},
aL1:function aL1(){},
A4:function A4(d,e){this.a=d
this.b=e},
Rp:function Rp(d,e){this.b=d
this.d=e},
Pt:function Pt(d,e){this.b=d
this.c=e},
Pv:function Pv(d,e,f){this.a=d
this.b=e
this.c=f},
bAu(){var x=0,w=A.i(y.H),v
var $async$bAu=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:x=1
break
case 1:return A.f(v,w)}})
return A.h($async$bAu,w)},
bxJ(d){var x=0,w=A.i(y.y)
var $async$bxJ=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.j("The is not a video track => "+d.j(0))
throw A.j("You need to specify the deviceId")
return A.f(null,w)}})
return A.h($async$bxJ,w)},
a54(d){var x=0,w=A.i(y.H),v
var $async$a54=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.c(B.aV7("enableSpeakerphone",A.Y(["enable",d],y.N,v),v,v),$async$a54)
case 2:return A.f(null,w)}})
return A.h($async$a54,w)},
aI3(d,e){var x=0,w=A.i(y.H),v,u,t
var $async$aI3=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:t=e.d
x=t.kind==="audio"?3:4
break
case 3:u=J.lA(y.f.a(A.C5(t.getConstraints())),y.N,y.z)
u.m(0,"volume",d)
x=5
return A.c(e.Pu(0,u),$async$aI3)
case 5:case 4:v=A.d9(null,y.H)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$aI3,w)},
aV7(d,e,f,g){return B.c0k(d,e,f,g,f.i("0?"))},
c0k(d,e,f,g,h){var x=0,w=A.i(h),v
var $async$aV7=A.d(function(i,j){if(i===1)return A.e(j,w)
while(true)switch(x){case 0:x=3
return A.c(B.aV6(),$async$aV7)
case 3:v=D.GD.ck(d,e,!1,f)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$aV7,w)},
aV6(){var x=0,w=A.i(y.H),v,u
var $async$aV6=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:x=!$.bIF?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.c(D.GD.ck("initialize",A.Y(["options",A.C(v,u)],v,u),!1,y.H),$async$aV6)
case 4:$.bIF=!0
case 3:return A.f(null,w)}})
return A.h($async$aV6,w)}},D
J=c[1]
A=c[0]
C=c[2]
B=a.updateHolder(c[6],B)
D=c[8]
B.Dz.prototype={
C(d,e){this.a.C(0,e)},
dC(d,e){this.a.dC(d,e)},
au(d){return this.a.au(0)},
$idU:1}
B.R1.prototype={
jK(d){var x=A.c8("subscription"),w=A.io(new B.aQL(x),null,null,!0,this.$ti.y[1])
x.b=d.hw(new B.aQM(this,w),w.goQ(w),w.gqd())
return new A.cM(w,A.v(w).i("cM<1>"))}}
B.apY.prototype={}
B.Gl.prototype={}
B.a10.prototype={}
B.u1.prototype={
R(){return new B.U6(A.aU(y.N),C.L)}}
B.U6.prototype={
X(){var x,w,v,u,t,s,r,q,p,o=this,n=null
o.a8()
x=o.a
o.r=x.c
x=x.x
if(x==null)x=new B.aPC(B.bGW(),B.bGW())
o.d!==$&&A.aF()
o.d=x
w=o.a
v=w.y
if(v==null)v=new B.a0I(new A.dD(n,n,y.g),new A.dD(n,n,y.n))
o.e!==$&&A.aF()
o.e=v
x.ch=new B.b0w(o)
o.fx=!0
u=new B.a4g()
o.fr!==$&&A.aF()
o.fr=u
t=w.x
if(t!=null){s=$.iW()
r=s.a
q=r.length!==0&&s.as===t&&r===w.c&&s.w}else q=!1
t=$.iW()
s=o.r
r=w.e
p=w.d
t.b2O(s,r,x,v,w.f,p)
x=o.a
if(x.as)t.ax=!0
if(q){o.Ol()
return}if(x.f)u.qO("assets/audio/tonalite-appel.wav")
o.pR()},
n(){var x=this,w=x.cx
if(w!=null)w.a7(0)
w=x.cy
if(w!=null)w.a7(0)
w=x.db
if(w!=null)w.a7(0)
w=x.dx
if(w!=null)w.a7(0)
w=x.dy
if(w!=null)w.a7(0)
w=x.fr
w===$&&A.b()
w.f_()
if(x.fx)w.jU()
w=$.iW()
if(!(w.r&&w.a===x.r&&!x.y)){B.btn()
w=x.d
w===$&&A.b()
w.jU()
w=x.e
w===$&&A.b()
w.Hn()}x.al()},
Ol(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l
var $async$Ol=A.d(function(d,e){if(d===1){t=e
x=u}while(true)$async$outer:switch(x){case 0:s.a.toString
o=$.bl()
s.w=o.gIK()
o=$.iW()
s.Q=o.x
s.as=o.y
s.ay=o.Q
s.x=o.e
o=o.f
s.ch=o
if(o!=null){o=Date.now()
n=s.ch
n.toString
s.CW=new A.aW(o,0,!1).fh(n)}B.bLs(s.r)
u=4
s.a.toString
o=$.bl()
x=7
return A.c(o.cj("/messagerie/appels/"+s.r+"/signaux"),$async$Ol)
case 7:r=e
for(o=J.a9(r),n=s.f;o.t();){q=o.gG(o)
p=B.byS(q)
n.C(0,p.a)
if(p.d==="termine"||p.d==="refuse"||p.d==="annule"){s.l1(A.x("Appel termin\xe9"))
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
n.f=new B.b0i(s)
n.r=new B.b0j(s)
n.w=new B.b0k(s)
s.z=!0
if(o)s.q(new B.b0l())
s.db=A.mp(C.cO,new B.b0m(s))
o=s.e
o===$&&A.b()
n=o.r
s.dx=new A.ch(n,A.v(n).i("ch<1>")).dF(s.gafG())
o=o.w
s.dy=new A.ch(o,A.v(o).i("ch<1>")).dF(new B.b0n())
s.cx=A.mp(C.ex,new B.b0o(s))
s.v7()
case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$Ol,w)},
aDg(){var x=this.cy
if(x!=null)x.a7(0)
this.cy=A.d4(C.dX,new B.b_W(this))},
pR(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$pR=A.d(function(d,a0){if(d===1){t=a0
x=u}while(true)switch(x){case 0:f="appel"
u=4
r=null
j=s.a
i=j.z
x=i!=null?7:9
break
case 7:x=10
return A.c(i,$async$pR)
case 10:r=a0
j=s.r=B.apZ(r).a
x=8
break
case 9:i=$.bl()
x=11
return A.c(i.AF(j.c),$async$pR)
case 11:r=a0
j=s.r=s.a.c
case 8:i=$.iW()
i.b2w(j)
B.bLs(s.r)
if(s.a.f)i.QA()
q=B.apZ(r)
if(s.c==null){x=1
break}j=q.w
if(j==="termine"||j==="expire"){s.l1(A.x("Appel termin\xe9"))
x=1
break}s.a.toString
j=$.bl()
s.w=j.gIK()
f="ice"
s.a.toString
j=$.bl()
p=j.R4()
o=s.EA()
x=12
return A.c(p,$async$pR)
case 12:n=a0
m=B.bSL(n)
x=15
return A.c(o,$async$pR)
case 15:x=!a0?13:14
break
case 13:if(s.c==null){x=1
break}s.q(new B.b_Z(s))
x=16
return A.c(A.iA(C.iR,null,y.z),$async$pR)
case 16:if(s.c==null){x=1
break}s.l1(null)
x=1
break
case 14:s.aDg()
f="webrtc"
j=s.d
j===$&&A.b()
h=s.a.d==="video"||s.at
x=17
return A.c(j.u4(A.Y(["iceServers",m.a],y.N,y.z),h),$async$pR)
case 17:j.f=new B.b0_(s)
j.r=new B.b00(s)
j.w=new B.b01(s)
if(s.c==null){x=1
break}s.q(new B.b02(s))
i.b8R()
s.db=A.mp(C.cO,new B.b03(s))
j=s.e
j===$&&A.b()
i=j.r
s.dx=new A.ch(i,A.v(i).i("ch<1>")).dF(s.gafG())
i=j.w
s.dy=new A.ch(i,A.v(i).i("ch<1>")).dF(new B.b04())
s.a.toString
i=$.bl()
l=i.b
if(l!=null&&J.aw(l)!==0){s.a.toString
$.bl()
j.Q9(C.e.r1("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws",l)}s.cx=A.mp(C.ex,new B.b05(s))
s.v7()
u=2
x=6
break
case 4:u=3
e=t
k=A.ae(e)
if(s.c==null){x=1
break}A.pW().$1("Appel : \xe9chec \xe0 l\u2019\xe9tape "+A.t(f)+" : "+A.arY(A.t(k)))
j=s.c
j.toString
i=k instanceof A.fh?k.a:s.aMy(f)
j.K(y.q).f.a0(A.aI(null,null,null,null,null,C.j,null,A.m(i,null,null,null,null,null,null,null,null),null,C.p,null,null,null,null,null,null,null,null,null))
s.l1(null)
x=6
break
case 3:x=2
break
case 6:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$pR,w)},
aMy(d){if(d==="ice")return A.x("Configuration d\u2019appel indisponible. V\xe9rifie ta connexion, puis r\xe9essaie.")
if(d==="webrtc")return A.x("Ce navigateur ne peut pas d\xe9marrer l\u2019appel. Essaie depuis l\u2019application.")
return A.x("Appel introuvable ou d\xe9j\xe0 termin\xe9.")},
EA(){var x=0,w=A.i(y.y),v,u=2,t,s=this,r,q,p
var $async$EA=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
x=7
return A.c(s.W4(),$async$EA)
case 7:if(!e){v=!1
x=1
break}r=s.d
r===$&&A.b()
x=8
return A.c(r.Bu(s.a.d==="video"||s.at),$async$EA)
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
return A.h($async$EA,w)},
W4(){var x=0,w=A.i(y.y),v,u=this
var $async$W4=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:v=B.anR(u.a.d==="video"||u.at)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$W4,w)},
v7(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$v7=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.y){x=1
break}u=4
s.a.toString
p=$.bl()
x=7
return A.c(p.cj("/messagerie/appels/"+s.r+"/signaux"),$async$v7)
case 7:r=e
for(p=J.a9(r);p.t();){q=p.gG(p)
s.afH(B.byS(q))}u=2
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
return A.h($async$v7,w)},
afH(d){var x,w,v,u,t=this
if(t.c==null||t.y)return
x=t.f
w=d.a
if(x.p(0,w))return
x.C(0,w)
x=t.w
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(t.a.f)return
t.Fb(d)
break
case"reponse":if(!t.a.f)return
v=B.bMe(d.e)
if(v==null)return
x=t.d
x===$&&A.b()
x.Pt(A.Y(["sdp",v.a,"type",v.b],y.N,y.z)).bd(0,new B.b0q(t),y.a).hH(new B.b0r(t))
break
case"candidat_ice":u=B.c5D(d.e)
if(u==null)return
x=t.d
x===$&&A.b()
x.Pj(A.Y(["candidate",u.a,"sdpMid",u.c,"sdpMLineIndex",u.b],y.N,y.z))
break
case"accepte":if(!t.a.f||t.x)return
x=t.d
x===$&&A.b()
x.Ad().bd(0,new B.b0s(t),y.a).hH(new B.b0t(t))
break
case"refuse":t.l1(A.x("Appel refus\xe9"))
break
case"annule":t.l1(A.x("Appel annul\xe9"))
break
case"termine":t.l1(A.x("Appel termin\xe9"))
break}},
Fb(d){return this.aSB(d)},
aSB(d){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$Fb=A.d(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:o=B.bMe(d.e)
if(o==null){x=1
break}x=!(s.a.d==="video"||s.at)&&C.e.p(o.a,"m=video")?3:4
break
case 3:q=s.d
q===$&&A.b()
x=5
return A.c(q.qe(),$async$Fb)
case 5:if(f&&s.c!=null&&!s.y){s.q(new B.b0f(s))
$.iW().aln("video")}case 4:u=7
q=s.d
q===$&&A.b()
x=10
return A.c(q.Ae(A.Y(["sdp",o.a,"type",o.b],y.N,y.z)),$async$Fb)
case 10:r=f
if(s.c==null||s.y){x=1
break}s.NV()
s.X3("reponse",r)
u=2
x=9
break
case 7:u=6
n=t
s.l1(A.x("L\u2019appel n\u2019a pas pu aboutir."))
x=9
break
case 6:x=2
break
case 9:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$Fb,w)},
NV(){var x=0,w=A.i(y.H),v,u=this,t,s
var $async$NV=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:if(u.x){x=1
break}t=u.cy
if(t!=null)t.a7(0)
t=u.fr
t===$&&A.b()
t.f_()
u.q(new B.b0c(u,!1))
t=$.iW()
t.baT()
s=u.Q
t.a2C(u.as,s)
B.bAu()
case 1:return A.f(v,w)}})
return A.h($async$NV,w)},
v3(d,e,f){return this.aEE(d,e,f)},
X3(d,e){return this.v3(d,e,!0)},
aEE(d,e,f){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q
var $async$v3=A.d(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
t.a.toString
s=$.bl()
x=6
return A.c(s.ajw(t.r,e,d),$async$v3)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(f&&t.c!=null&&!t.y)t.l1(A.x("L\u2019appel n\u2019a pas pu aboutir."))
x=5
break
case 2:x=1
break
case 5:return A.f(null,w)
case 1:return A.e(u,w)}})
return A.h($async$v3,w)},
F2(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o
var $async$F2=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
r=s.cy
if(r!=null)r.a7(0)
r=s.fr
r===$&&A.b()
r.f_()
u=4
r=s.r
x=r.length!==0?7:8
break
case 7:s.a.toString
q=$.bl()
x=9
return A.c(q.HH(r,"termine"),$async$F2)
case 9:case 8:u=2
x=6
break
case 4:u=3
o=t
x=6
break
case 3:x=2
break
case 6:B.btn()
$.iW().JL()
r=s.c
if(r!=null)A.a7(r,!1).co()
case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$F2,w)},
adB(){var x=this
if(!x.x||x.y)return
$.iW().bch()
x.q(new B.b0d(x))
$.aH.aN$.push(new B.b0e(x))},
l1(d){var x,w,v=this,u=null
if(v.y)return
v.y=!0
x=v.cy
if(x!=null)x.a7(0)
x=v.fr
x===$&&A.b()
x.f_()
x=v.r
if(x.length!==0){v.a.toString
w=$.bl()
w.HH(x,"termine").hH(new B.b0p())}if(d!=null&&v.c!=null)v.c.K(y.q).f.a0(A.aI(u,u,u,u,u,C.j,u,A.m(d,u,u,u,u,u,u,u,u),u,C.p,u,u,u,u,u,u,u,u,u))
B.btn()
$.iW().JL()
x=v.c
if(x!=null)A.a7(x,!1).co()},
LN(){var x=0,w=A.i(y.H),v=this,u,t
var $async$LN=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.b()
x=2
return A.c(t.V7(u),$async$LN)
case 2:if(v.c!=null)v.q(new B.b_S(v,u))
$.iW().a2C(v.as,u)
return A.f(null,w)}})
return A.h($async$LN,w)},
LM(){var x=0,w=A.i(y.H),v=this,u,t
var $async$LM=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:v.ax=!1
x=2
return A.c(v.LG(!v.as),$async$LM)
case 2:u=$.iW()
t=v.Q
u.a2C(v.as,t)
return A.f(null,w)}})
return A.h($async$LM,w)},
LG(d){return this.ayE(d)},
ayE(d){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q,p,o
var $async$LG=A.d(function(e,f){if(e===1){u=f
x=v}while(true)switch(x){case 0:v=3
r=t.d
r===$&&A.b()
x=6
return A.c(r.Cy(d),$async$LG)
case 6:v=1
x=5
break
case 3:v=2
o=u
s=A.ae(o)
A.pW().$1("Appel : haut-parleur impossible : "+A.arY(A.t(s)))
x=5
break
case 2:x=1
break
case 5:r=t.d
r===$&&A.b()
p=r.CW
if(t.c!=null&&p!==t.as)t.q(new B.b_Q(t,p))
return A.f(null,w)
case 1:return A.e(u,w)}})
return A.h($async$LG,w)},
LL(){var x=0,w=A.i(y.H),v=this,u,t
var $async$LL=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:u=!v.ay
t=v.d
t===$&&A.b()
x=2
return A.c(t.V3(u),$async$LL)
case 2:if(v.c!=null)v.q(new B.b_R(v,u))
$.iW().b91(u)
return A.f(null,w)}})
return A.h($async$LL,w)},
Dh(){var x=0,w=A.i(y.H),v=this,u
var $async$Dh=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:u=v.d
u===$&&A.b()
x=2
return A.c(u.Pz(),$async$Dh)
case 2:return A.f(null,w)}})
return A.h($async$Dh,w)},
af5(){var x,w=this,v="Appel en cours\u2026",u=w.fy
if(u!=null)return u
$.iW()
if(w.x){u=A.x(v)
x=C.b.aJ(w.CW.a,1e6)
return u+" "+(C.e.cS(C.b.j(C.b.aJ(x,60)),2,"0")+":"+C.e.cS(C.b.j(C.b.ao(x,60)),2,"0"))}if(w.z)return w.a.f?A.x("\xc7a sonne\u2026"):A.x(v)
return A.x("Connexion\u2026")},
LO(){var x=0,w=A.i(y.H),v,u=this,t,s,r
var $async$LO=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:if(u.a.d==="video"||u.at||u.y){x=1
break}if(!u.x){t=u.c
t.toString
s=A.x("D\xe9croche d\u2019abord pour passer en vid\xe9o.")
t.K(y.q).f.a0(A.aI(null,null,null,null,null,C.j,null,A.m(s,null,null,null,null,null,null,null,null),null,C.p,null,null,null,null,null,null,null,null,null))
x=1
break}t=u.d
t===$&&A.b()
x=3
return A.c(t.G2(),$async$LO)
case 3:r=e
if(r==null){t=u.c
if(t!=null){s=A.x("La cam\xe9ra n\u2019a pas pu s\u2019ouvrir.")
t.K(y.q).f.a0(A.aI(null,null,null,null,null,C.j,null,A.m(s,null,null,null,null,null,null,null,null),null,C.p,null,null,null,null,null,null,null,null,null))}x=1
break}if(u.c==null||u.y){x=1
break}u.q(new B.b_V(u))
$.iW().aln("video")
u.X3("offre",r)
case 1:return A.f(v,w)}})
return A.h($async$LO,w)},
D2(){var x=0,w=A.i(y.H),v,u=this,t,s,r
var $async$D2=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:if(u.y||u.c==null){x=1
break}t=u.d
t===$&&A.b()
x=3
return A.c(t.Lb(),$async$D2)
case 3:s=e
if(u.c==null||u.y){x=1
break}r=J.dK(s)?A.x("Statistiques indisponibles pour cet appel."):B.bLC(s)
t=u.c
t.toString
x=4
return A.c(A.cX(null,null,!0,null,new B.b_P(r),t,null,!0,y.H),$async$D2)
case 4:case 1:return A.f(v,w)}})
return A.h($async$D2,w)},
Dj(){var x=0,w=A.i(y.H),v,u=this,t,s
var $async$Dj=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:if(!(u.a.d==="video"||u.at)||u.y){x=1
break}t=u.d
t===$&&A.b()
x=t.ay?3:4
break
case 3:x=5
return A.c(t.zH(),$async$Dj)
case 5:if(u.c!=null)u.q(new B.b_T())
x=1
break
case 4:x=6
return A.c(t.wS(),$async$Dj)
case 6:if(!e){t=u.c
if(t!=null){s=A.x("Le partage d\u2019\xe9cran n\u2019est pas disponible sur cet appareil.")
t.K(y.q).f.a0(A.aI(null,null,null,null,null,C.j,null,A.m(s,null,null,null,null,null,null,null,null),null,C.p,null,null,null,null,null,null,null,null,null))}x=1
break}if(u.c!=null)u.q(new B.b_U())
case 1:return A.f(v,w)}})
return A.h($async$Dj,w)},
aOC(){var x,w,v=this,u=null,t=A.a([],y.p)
if(v.a.d==="video"||v.at){t.push(A.br(!1,u,u,u,!0,u,u,!0,!1,D.a4l,u,new B.b07(v),!1,u,u,u,u,u,A.m(A.x("Basculer"),u,u,u,u,C.cH,u,u,u),u,u))
x=v.d
x===$&&A.b()
x=x.ay
w=A.cu(x?D.a23:D.a1Z,C.f,u,u)
t.push(A.br(!1,u,u,u,!0,u,u,!0,!1,w,u,new B.b08(v),!1,u,u,u,u,u,A.m(x?A.x("Arr\xeater le partage"):A.x("Partager l\u2019\xe9cran"),u,u,u,u,C.cH,u,u,u),u,u))}if(v.x){t.push(A.br(!1,u,u,u,!0,u,u,!0,!1,D.a4h,u,new B.b09(v),!1,u,u,u,u,u,A.m(A.x("Statistiques"),u,u,u,u,C.cH,u,u,u),u,u))
t.push(A.br(!1,u,u,u,!0,u,u,!0,!1,D.a49,u,new B.b0a(v),!1,u,u,u,u,u,A.m(A.x("R\xe9duire"),u,u,u,u,C.cH,u,u,u),u,u))}if(t.length===0)return
x=v.c
x.toString
A.fs(D.oz,new B.b0b(t),x,!1,u,y.H)},
A(d){var x,w,v,u,t,s,r,q=this,p=null,o=q.d
o===$&&A.b()
x=o.c
x=x==null?p:x.pF(0).length!==0
w=q.id
v=q.a
if((v.d==="video"||q.at)&&q.z){if(x===!0)x=A.ee(p,B.byI(o.e,!1,D.Ld),C.t,!1,p,q.ga7j(),p,p,p,p,p,p,p,p,p,p,p,p,p,p,p,p,p,p)
else{x=v.e
v=v.r
u=q.go&&q.x
x=A.cU(A.a8(A.a([new B.Ir(x,v,u,56,p),C.Q,B.bKw(x,22),C.x,A.m(q.af5(),p,p,p,p,D.tH,p,p,p)],y.p),C.m,C.h,C.H),p,p)}o=A.a([A.a6c(0,x),A.hY(p,A.CX(A.aa(12),B.byI(o.d,!0,D.Ld),C.br),160,p,p,16,16,110),A.hY(p,A.bg(A.bj(!1,D.a4k,C.i,p,C.o,p,p,p,p,q.ga7j(),p,A.d_(C.XF,p,C.Y,C.d2,p)),36,36),p,p,p,20,20,p)],y.p)
if(q.x)o.push(A.hY(p,new B.Ta(q.gadA(),p),p,p,16,p,16,p))
x=q.Q
v=q.as
o.push(A.hY(24,B.bIQ(q.ay,!0,v,x,q.ga7m(),q.ga7i(),q.ga7k(),q.ga7l(),q.gacC(),q.gadh(),!0),p,p,0,0,p,p))
o=A.f7(C.bp,o,C.j,C.b6,p)}else{x=y.p
v=A.a([],x)
if(q.go)v.push(A.hY(p,A.r_(B.byI(o.e,!1,D.ru),0),1,p,0,p,0,1))
if(q.x)v.push(A.hY(p,new B.Ta(q.gadA(),p),p,p,16,p,16,p))
o=B.bKw(q.a.e,24)
u=A.m(q.af5(),p,p,p,p,D.tH,C.aw,p,p)
t=q.a
s=t.e
t=t.r
t=A.aX(A.cU(new B.Ir(s,t,q.go&&q.x,88,p),p,p),1)
s=q.Q
r=q.as
v.push(A.a8(A.a([C.Q,o,C.x,new A.ai(D.ph,u,p),t,B.bIQ(q.ay,!1,r,s,q.ga7m(),q.ga7i(),q.ga7k(),q.ga7l(),q.gacC(),q.gadh(),q.x),C.Q],x),C.m,C.h,C.l))
v=A.f7(C.bp,v,C.j,C.b6,p)
o=v}return A.aK2(w,A.eh(p,C.k,A.fA(!0,o,C.Y,!0),p,p,p),new B.b0u(q),y.K)}}
B.acB.prototype={
A(d){var x,w,v=this,u=null,t=A.aa(28),s=A.aX(new B.wh(C.yD,v.e,A.x("Haut-parleur"),v.x,u,u),1),r=v.f?D.a26:D.a27,q=A.x("Appel vid\xe9o")
r=A.aX(new B.wh(r,!1,q,v.c?v.y:v.z,u,u),1)
q=v.d
x=q?D.a1T:D.a1S
w=y.p
q=A.aC(A.a([s,r,A.aX(new B.wh(x,q,A.x("Muet"),v.w,u,u),1)],w),C.m,C.h,C.l)
x=A.x("Plus")
return A.ag(u,A.a8(A.a([q,C.Q,A.aC(A.a([A.aX(new B.wh(C.yv,!1,x,v.r?v.Q:u,u,u),1),A.aX(new B.wh(D.yo,!1,A.x("Terminer"),v.as,C.es,u),1),D.a0s],w),C.m,C.h,C.l)],w),C.m,C.h,C.H),C.i,u,u,new A.ar(D.oz,u,u,t,u,u,C.w),u,u,u,D.a_K,D.a08,u,u,u)}}
B.Ta.prototype={
A(d){var x=null
return A.a8(A.a([A.bg(A.bj(!1,D.a48,C.i,x,C.o,x,x,x,x,this.c,x,A.d_(C.oI,x,C.Y,C.d2,x)),48,48),C.aq,A.m(A.x("R\xe9duire"),x,x,x,x,C.aAV,x,x,x)],y.p),C.m,C.h,C.H)}}
B.wh.prototype={
A(d){var x,w,v,u=this,t=null,s=u.r,r=s==null
if(r)s=u.d?C.f:C.oI
if(!r)x=C.f
else x=u.d?C.k:C.f
r=u.f
w=r==null?0.4:1
v=A.d_(s,t,C.Y,C.d2,t)
return A.r_(A.a8(A.a([A.bg(A.bj(!1,A.cu(u.c,x,t,30),C.i,t,C.o,t,t,t,t,r,t,v),72,72),C.x,A.m(u.e,t,t,t,t,D.aAU,C.aw,t,t)],y.p),C.m,C.h,C.H),w)}}
B.Ir.prototype={
R(){return new B.agS(null,null)}}
B.agS.prototype={
X(){var x,w=this
w.a8()
x=A.bY(null,A.cF(0,0,w.a.e?1100:2400,0),null,1,null,w)
x.TN(0,!0)
w.d!==$&&A.aF()
w.d=x},
aV(d){var x,w
this.b9(d)
x=this.a.e
if(d.e!==x){w=this.d
w===$&&A.b()
w.e=A.cF(0,0,x?1100:2400,0)
w.TN(0,!0)}},
n(){var x=this.d
x===$&&A.b()
x.n()
this.avW()},
A(d){var x,w=this,v=null,u=w.a,t=u.f,s=t*2,r=s+24,q=w.d
q===$&&A.b()
x=u.d
u=x!=null?A.mW(v,x,v,t):A.mW(C.v,v,A.m(B.bLP(u.c),v,v,v,v,A.cw(v,v,C.k,v,v,v,v,v,v,v,v,w.a.f*0.7,v,v,C.R,v,v,!0,v,v,v,v,v,v,v,v),v,v,v),t)
return A.bg(A.hN(q,new B.biU(w,s),u),r,r)}}
B.Z_.prototype={
n(){var x=this,w=x.bL$
if(w!=null)w.N(0,x.gi_())
x.bL$=null
x.al()},
c2(){this.d0()
this.cN()
this.i0()}}
B.aPC.prototype={
Bu(d){return this.baA(d)},
baA(d){var x=0,w=A.i(y.H),v,u=this,t,s,r,q,p
var $async$Bu=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:if(u.b!=null){x=1
break}t=u.d
x=3
return A.c(t.iL(0),$async$Bu)
case 3:$.aom()
s=y.N
r=A.Y(["echoCancellation",!0,"noiseSuppression",!0,"autoGainControl",!0],s,y.y)
if(d){q=y.S
q=A.Y(["facingMode","user","width",A.Y(["ideal",640],s,q),"height",A.Y(["ideal",480],s,q),"frameRate",A.Y(["ideal",24],s,q)],s,y.K)}else q=!1
x=4
return A.c(new B.Nx().xq(0,A.Y(["audio",r,"video",q],s,y.z)),$async$Bu)
case 4:p=f
u.b=p
t.sxE(0,p)
case 1:return A.f(v,w)}})
return A.h($async$Bu,w)},
u4(d,e){return this.bbn(d,e)},
bbn(d,e){var x=0,w=A.i(y.H),v=this,u,t,s,r,q,p,o
var $async$u4=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:x=2
return A.c(v.e.iL(0),$async$u4)
case 2:x=v.b==null?3:4
break
case 3:x=5
return A.c(v.Bu(e),$async$u4)
case 5:case 4:u=v.b
u.toString
x=6
return A.c($.aom().a0z(d,A.C(y.N,y.z)),$async$u4)
case 6:t=v.a=g
s=u.Cm(0),r=s.length,q=0
case 7:if(!(q<s.length)){x=9
break}p=s[q]
x=10
return A.c(t.Pg(0,p,u),$async$u4)
case 10:o=g
if(p.d.kind==="video")v.as=o
case 8:s.length===r||(0,A.G)(s),++q
x=7
break
case 9:x=11
return A.c(v.yU(),$async$u4)
case 11:t.e=new B.aPE(v)
t.Q=new B.aPF(v)
t.d=new B.aPG(v)
return A.f(null,w)}})
return A.h($async$u4,w)},
aD6(d){var x,w,v,u=this
u.c=d
x=d.pF(0)
w=x.length!==0?C.c.gS(x).d.id:null
if(!u.x){u.x=!0
u.z=w
u.e.sxE(0,d)
u.De()
v=u.r
if(v!=null)v.$0()}else{v=u.z
if(w!=null&&w!==v){u.z=w
u.e.sxE(0,d)
v=u.r
if(v!=null)v.$0()}}},
De(){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q,p,o,n,m,l
var $async$De=A.d(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:n=t.CW?0.8:1
m=t.c
m=m==null?null:m.Kn(0)
if(m==null)m=C.O
q=m.length
p=0
case 2:if(!(p<m.length)){x=4
break}s=m[p]
v=6
x=9
return A.c(B.aI3(n,s),$async$De)
case 9:v=1
x=8
break
case 6:v=5
l=u
r=A.ae(l)
A.pW().$1("Appel : volume distant impossible : "+A.arY(A.t(r)))
x=8
break
case 5:x=1
break
case 8:case 3:m.length===q||(0,A.G)(m),++p
x=2
break
case 4:return A.f(null,w)
case 1:return A.e(u,w)}})
return A.h($async$De,w)},
yU(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h
var $async$yU=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:i=s.as
if(i==null){x=1
break}u=4
o=i.a.getParameters()
n=o.transactionId
if((n==null?null:n)!=null){m=o.rtcp
l=y.z
l=A.Y(["cname",m.cname,"reducedSize",m.reducedSize],l,l)
l.h(0,"cname")
l.h(0,"reducedSize")}B.bY1(o)
m=B.bY0(o)
B.bY_(o)
r=new B.aKX(m)
q=r.d
if(q==null||J.aw(q)===0){x=1
break}for(m=q,l=m.length,k=0;k<l;++k){p=m[k]
p.c=5e5
p.e=24}x=7
return A.c(i.CB(r),$async$yU)
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
return A.h($async$yU,w)},
Ad(){var x=0,w=A.i(y.P),v,u=this,t,s
var $async$Ad=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.j(A.a0("Connexion non pr\xe9par\xe9e."))
x=3
return A.c(s.Qj(0),$async$Ad)
case 3:t=e
x=4
return A.c(s.Cz(0,t),$async$Ad)
case 4:v=A.Y(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$Ad,w)},
Ae(d){return this.b2_(d)},
b2_(d){var x=0,w=A.i(y.P),v,u=this,t,s
var $async$Ae=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.j(A.a0("Connexion non pr\xe9par\xe9e."))
x=3
return A.c(s.CC(0,new B.A4(d.h(0,"sdp"),d.h(0,"type"))),$async$Ae)
case 3:x=4
return A.c(s.Qg(0),$async$Ae)
case 4:t=f
x=5
return A.c(s.Cz(0,t),$async$Ae)
case 5:v=A.Y(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$Ae,w)},
Pt(d){return this.aZ9(d)},
aZ9(d){var x=0,w=A.i(y.H),v=this,u
var $async$Pt=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.j(A.a0("Connexion non pr\xe9par\xe9e."))
x=2
return A.c(u.CC(0,new B.A4(d.h(0,"sdp"),d.h(0,"type"))),$async$Pt)
case 2:return A.f(null,w)}})
return A.h($async$Pt,w)},
Pj(d){return this.aYP(d)},
aYP(d){var x=0,w=A.i(y.H),v,u=this,t
var $async$Pj=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.c(t.P9(new B.FE(A.az(d.h(0,"candidate")),A.az(d.h(0,"sdpMid")),A.ei(d.h(0,"sdpMLineIndex")))),$async$Pj)
case 3:case 1:return A.f(v,w)}})
return A.h($async$Pj,w)},
V7(d){return this.aqs(d)},
aqs(d){var x=0,w=A.i(y.H),v=this,u,t,s,r
var $async$V7=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.Kn(0)
if(r==null)r=C.O
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.G)(r),++s)r[s].skm(0,t)
return A.f(null,w)}})
return A.h($async$V7,w)},
Cy(d){return this.aqi(d)},
aqi(d){var x=0,w=A.i(y.H),v=this
var $async$Cy=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:x=2
return A.c(B.a54(d),$async$Cy)
case 2:v.CW=d
x=3
return A.c(v.De(),$async$Cy)
case 3:return A.f(null,w)}})
return A.h($async$Cy,w)},
V3(d){return this.aqa(d)},
aqa(d){var x=0,w=A.i(y.H),v=this,u,t,s
var $async$V3=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.pF(0)
if(s==null)s=C.O
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.G)(s),++t)s[t].skm(0,d)
return A.f(null,w)}})
return A.h($async$V3,w)},
Pz(){var x=0,w=A.i(y.H),v,u=this,t,s
var $async$Pz=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.pF(0)
if(s==null)s=D.B2
if(s.length===0){x=1
break}x=3
return A.c(B.bxJ(C.c.gS(s)),$async$Pz)
case 3:case 1:return A.f(v,w)}})
return A.h($async$Pz,w)},
qe(){var x=0,w=A.i(y.y),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0
var $async$qe=A.d(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:e=s.a
if(e==null||s.y){v=!1
x=1
break}m=s.b
m=m==null?null:m.pF(0).length!==0
if(m===!0){v=!0
x=1
break}r=null
u=4
$.aom()
m=y.N
l=y.S
x=7
return A.c(new B.Nx().xq(0,A.Y(["audio",!1,"video",A.Y(["facingMode","user","width",A.Y(["ideal",640],m,l),"height",A.Y(["ideal",480],m,l),"frameRate",A.Y(["ideal",24],m,l)],m,y.K)],m,y.z)),$async$qe)
case 7:r=a2
q=J.bCr(r)
if(J.aw(q)===0){v=!1
x=1
break}p=J.k4(q)
m=s.b
if(m==null)m=null
else{m=m.e
l=p.d
m.addTrack(l)
m=A.d9(null,y.H)}x=8
return A.c(y.x.b(m)?m:A.d5(m,y.H),$async$qe)
case 8:s.d.sxE(0,s.b)
m=s.b
m.toString
x=9
return A.c(J.bQF(e,p,m),$async$qe)
case 9:o=a2
s.as=o
x=10
return A.c(s.yU(),$async$qe)
case 10:v=!0
x=1
break
u=2
x=6
break
case 4:u=3
d=t
m=r
m=m==null?null:J.bCq(m)
if(m==null)m=C.O
l=m.length
j=y.c
i=y._
h=0
case 11:if(!(h<m.length)){x=13
break}n=m[h]
u=15
g=J.a_1(n)
if(!i.b(g)){f=new A.ap($.as,j)
f.a=8
f.c=g
g=f}x=18
return A.c(g,$async$qe)
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
return A.h($async$qe,w)},
G2(){var x=0,w=A.i(y.cO),v,u=2,t,s=this,r,q,p
var $async$G2=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:x=3
return A.c(s.qe(),$async$G2)
case 3:if(!e){v=null
x=1
break}u=5
x=8
return A.c(s.Ad(),$async$G2)
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
return A.h($async$G2,w)},
wS(){var x=0,w=A.i(y.y),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0,a1
var $async$wS=A.d(function(a2,a3){if(a2===1){t=a3
x=u}while(true)switch(x){case 0:if(s.a==null||s.y){v=!1
x=1
break}if(s.ay){v=!0
x=1
break}if(A.by()===C.at){v=!1
x=1
break}r=s.as
if(r==null){v=!1
x=1
break}q=null
u=4
$.aom()
x=7
return A.c(new B.Nx().Cb(A.Y(["video",!0,"audio",!1],y.N,y.z)),$async$wS)
case 7:q=a3
p=J.bCr(q)
if(J.aw(p)===0){v=!1
x=1
break}o=J.k4(p)
l=s.b
k=l==null?null:l.pF(0)
n=k==null?D.B2:k
s.ax=J.aw(n)!==0?J.k4(n):null
x=8
return A.c(r.TO(o),$async$wS)
case 8:s.at=q
s.ay=!0
s.d.sxE(0,q)
x=9
return A.c(s.yU(),$async$wS)
case 9:o.c=new B.aPD(s)
v=!0
x=1
break
u=2
x=6
break
case 4:u=3
a0=t
l=q
l=l==null?null:J.bCq(l)
if(l==null)l=C.O
i=l.length
h=y.c
g=y._
f=0
case 10:if(!(f<l.length)){x=12
break}m=l[f]
u=14
e=J.a_1(m)
if(!g.b(e)){d=new A.ap($.as,h)
d.a=8
d.c=e
e=d}x=17
return A.c(e,$async$wS)
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
return A.h($async$wS,w)},
zH(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$zH=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(!s.ay){x=1
break}o=s.ay=!1
u=4
r=s.as
q=s.ax
x=(r!=null?q!=null:o)?7:8
break
case 7:x=9
return A.c(r.TO(q),$async$zH)
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
o=o==null?null:o.Cm(0)
if(o==null)o=C.O
m=o.length
l=y.c
k=y._
j=0
case 10:if(!(j<o.length)){x=12
break}p=o[j]
u=14
i=J.a_1(p)
if(!k.b(i)){h=new A.ap($.as,l)
h.a=8
h.c=i
i=h}x=17
return A.c(i,$async$zH)
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
s.d.sxE(0,s.b)
case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$zH,w)},
Lb(){var x=0,w=A.i(y.P),v,u=2,t,s=this,r,q,p,o,n
var $async$Lb=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:o=s.a
if(o==null||s.y){v=C.b4
x=1
break}u=4
x=7
return A.c(J.bR1(o),$async$Lb)
case 7:r=e
q=B.c8P(r,s.Q)
s.Q=q
A.pW().$1("Appel : statistiques : "+B.bLC(q))
v=q
x=1
break
u=2
x=6
break
case 4:u=3
n=t
v=C.b4
x=1
break
x=6
break
case 3:x=2
break
case 6:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$Lb,w)},
jU(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0
var $async$jU=A.d(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
s.ay=!1
p=s.at
p=p==null?null:p.Cm(0)
if(p==null)p=C.O
o=p.length
n=y.c
m=y._
l=0
case 3:if(!(l<p.length)){x=5
break}r=p[l]
u=7
k=J.a_1(r)
if(!m.b(k)){j=new A.ap($.as,n)
j.a=8
j.c=k
k=j}x=10
return A.c(k,$async$jU)
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
return A.c(B.a54(!1),$async$jU)
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
p=p==null?null:p.au(0)
x=20
return A.c(y.x.b(p)?p:A.d5(p,y.H),$async$jU)
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
p=p==null?null:p.Cm(0)
if(p==null)p=C.O
o=p.length
l=0
case 21:if(!(l<p.length)){x=23
break}q=p[l]
u=25
k=J.a_1(q)
if(!m.b(k)){j=new A.ap($.as,n)
j.a=8
j.c=k
k=j}x=28
return A.c(k,$async$jU)
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
return A.c(s.d.n(),$async$jU)
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
return A.c(s.e.n(),$async$jU)
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
return A.h($async$jU,w)}}
B.a0I.prototype={
gb0h(){return this.b!=null&&!this.e},
Q9(d,e){return this.b0i(d,e)},
b0i(d,e){var x=0,w=A.i(y.H),v=this
var $async$Q9=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:v.x=d
v.y=e
v.e=!1
v.f=0
x=2
return A.c(v.Dc(),$async$Q9)
case 2:return A.f(null,w)}})
return A.h($async$Q9,w)},
Dc(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Dc=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.e){x=1
break}r=s.x
if(r==null||J.aw(r)===0){x=1
break}u=4
q=B.bRq(B.bwN(A.cK(r,0,null),null))
s.b=q
x=7
return A.c(q.f.a,$async$Dc)
case 7:s.f=0
p=s.y
if(p!=null&&J.aw(p)!==0)try{o=y.N
q.gjx().a.C(0,C.ab.hc(A.Y(["type","auth","jeton",p],o,o),null))}catch(l){}o=q.r.b
o===$&&A.b()
o=o.b
o===$&&A.b()
s.c=new A.cM(o,A.v(o).i("cM<1>")).bn(s.gaRV(),!0,s.gaQs(),new B.asV(s))
u=2
x=6
break
case 4:u=3
m=t
s.YD()
x=6
break
case 3:x=2
break
case 6:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$Dc,w)},
aRW(d){var x,w,v,u
try{x=C.ab.ef(0,J.u(d),null)
v=y.P
if(!v.b(x))return
if(!J.n(J.o(x,"type"),"signal_appel"))return
w=J.o(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.C(0,B.byS(w))}catch(u){}},
YD(){var x,w=this,v=w.c
if(v!=null)v.a7(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.C(0,null)
return}x=D.adH[v]
w.f=v+1
v=w.d
if(v!=null)v.a7(0)
w.d=A.d4(A.cF(0,0,0,x),new B.asW(w))},
Hn(){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q
var $async$Hn=A.d(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.a7(0)
s=t.c
s=s==null?null:s.a7(0)
x=2
return A.c(y.x.b(s)?s:A.d5(s,y.H),$async$Hn)
case 2:t.c=null
v=4
s=t.b
s=s==null?null:s.gjx().au(0)
x=7
return A.c(y._.b(s)?s:A.d5(s,y.z),$async$Hn)
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
return A.h($async$Hn,w)}}
B.a4g.prototype={
qO(d){return this.b80(d)},
b80(d){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q,p
var $async$qO=A.d(function(e,f){if(e===1){u=f
x=v}while(true)switch(x){case 0:v=3
r=t.a
x=6
return A.c((r==null?t.a=A.aqf():r).aZ(0),$async$qO)
case 6:r=t.a
r.toString
x=7
return A.c(r.ux(A.aqY(A.cK("asset:///"+d,0,null),null,null),null,!0),$async$qO)
case 7:x=8
return A.c(t.a.iz(C.Gl),$async$qO)
case 8:x=9
return A.c(t.a.hU(1),$async$qO)
case 9:x=10
return A.c(t.a.ea(0),$async$qO)
case 10:v=1
x=5
break
case 3:v=2
p=u
s=A.ae(p)
A.pW().$1("Sonnerie appel : lecture impossible ("+d+") : "+A.t(s))
x=5
break
case 2:x=1
break
case 5:return A.f(null,w)
case 1:return A.e(u,w)}})
return A.h($async$qO,w)},
f_(){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q
var $async$f_=A.d(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
s=s==null?null:s.aZ(0)
x=6
return A.c(y.x.b(s)?s:A.d5(s,y.H),$async$f_)
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
return A.h($async$f_,w)},
jU(){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q
var $async$jU=A.d(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
s=s==null?null:s.n()
x=6
return A.c(y.x.b(s)?s:A.d5(s,y.H),$async$jU)
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
return A.h($async$jU,w)}}
B.aKM.prototype={
a0z(d,e){return this.b1F(d,e)},
b1F(d,e){var x=0,w=A.i(y.Y),v,u,t,s,r
var $async$a0z=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.Y(["mandatory",A.C(r,r),"optional",A.a([A.Y(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.T)],t,y.K)}r=self.RTCPeerConnection
t=A.la(u,y.N,y.z)
t.E(0,d)
s=new r(y.m.a(A.bq(t)))
t=J.u(s)
v=B.bXZ(C.dP.goU().bY(new A.eT(t)),s)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$a0z,w)}}
B.nq.prototype={
Kn(d){var x=A.a([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.cY(w,A.a_(w).i("cY<1,ah>"))
J.fu(w,new B.aGl(x))
return x},
pF(d){var x=A.a([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.cY(w,A.a_(w).i("cY<1,ah>"))
J.fu(w,new B.aGm(x))
return x},
Cm(d){var x=A.H(this.Kn(0),!0,y.G)
C.c.E(x,this.pF(0))
return x}}
B.a4M.prototype={
ax7(d){var x=this,w=x.d
w.addEventListener("ended",A.bx(new B.aGi(x)))
w.addEventListener("mute",A.bx(new B.aGj(x)))
w.addEventListener("unmute",A.bx(new B.aGk(x)))},
skm(d,e){this.d.enabled=e},
Pu(d,e){return this.aZc(0,e)},
aZc(d,e){var x=0,w=A.i(y.H),v=this
var $async$Pu=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:x=2
return A.c(A.dd(v.d.applyConstraints(y.m.a(A.bq(e))),y.X),$async$Pu)
case 2:return A.f(null,w)}})
return A.h($async$Pu,w)},
aZ(d){var x=0,w=A.i(y.H),v=this
var $async$aZ=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.f(null,w)}})
return A.h($async$aZ,w)}}
B.Nx.prototype={
xq(d,e){return this.apm(0,e)},
apm(d,e){var x=0,w=A.i(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$xq=A.d(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.c7C())if(y.f.b(e.h(0,"video"))&&J.o(e.h(0,"video"),"facingMode")!=null)J.hp(e.h(0,"video"),"facingMode")
e.bV(0,"video",new B.aGb())
e.bV(0,"audio",new B.aGc())}catch(a0){A.oh("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.nn(e.h(0,"audio"),i,i).aA(0,"optional")&&y.F.b(J.o(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.o(e.h(0,"audio"),"optional")
r=A.C(y.N,y.z)
J.fu(s,new B.aGd(r))
J.hp(e.h(0,"audio"),"optional")
J.mK(e.h(0,"audio"),r)}}catch(a0){q=A.ae(a0)
p=A.aY(a0)
A.oh("[getUserMedia] failed to translate optional audio constraints, "+A.t(q)+", "+A.t(p))}i=self
o=i.window.navigator.mediaDevices
h=y.m
x=o.getUserMedia!=null?7:9
break
case 7:n=A.bq(e)
x=10
return A.c(A.dd(o.getUserMedia(h.a(n)),h),$async$xq)
case 10:m=a2
v=new B.nq(m,"local")
x=1
break
x=8
break
case 9:i=i.window.navigator.mediaDevices
g=e.h(0,"audio")
x=11
return A.c(A.dd(i.getUserMedia({video:e.h(0,"video"),audio:g}),h),$async$xq)
case 11:l=a2
v=new B.nq(l,"local")
x=1
break
case 8:u=2
x=6
break
case 4:u=3
f=t
k=A.ae(f)
i=J.u(k)
throw A.j("Unable to getUserMedia: "+i)
x=6
break
case 3:x=2
break
case 6:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$xq,w)},
Cb(d){return this.aoN(d)},
aoN(d){var x=0,w=A.i(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j
var $async$Cb=A.d(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:u=4
n=self
s=n.window.navigator.mediaDevices
x=s.getDisplayMedia!=null?7:9
break
case 7:r=A.bq(d)
n=y.m
x=10
return A.c(A.dd(s.getDisplayMedia(n.a(r)),n),$async$Cb)
case 10:q=f
v=new B.nq(q,"local")
x=1
break
x=8
break
case 9:n=n.window.navigator.mediaDevices
m=y.N
m=A.bq(A.Y(["mediaSource","screen"],m,m))
m.toString
l=d.h(0,"audio")
if(l==null)l=!1
x=11
return A.c(A.dd(n.getUserMedia({video:m,audio:l}),y.m),$async$Cb)
case 11:p=f
v=new B.nq(p,"local")
x=1
break
case 8:u=2
x=6
break
case 4:u=3
j=t
o=A.ae(j)
n=J.u(o)
throw A.j("Unable to getDisplayMedia: "+n)
x=6
break
case 3:x=2
break
case 6:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$Cb,w)}}
B.a6O.prototype={
axh(d,e){var x=this,w=x.at
w===$&&A.b()
w.addEventListener("datachannel",A.bx(new B.aKO(x)))
w.addEventListener("icecandidate",A.bx(new B.aKP(x)))
w.addEventListener("iceconnectionstatechange",A.bx(new B.aKQ(x)))
w.onicegatheringstatechange=A.bx(new B.aKR(x))
w.addEventListener("signalingstatechange",A.bx(new B.aKS(x)))
if(!$.bBg())w.addEventListener("connectionstatechange",A.bx(new B.aKT(x)))
w.addEventListener("negotiationneeded",A.bx(new B.aKU(x)))
w.addEventListener("track",A.bx(new B.aKV(x)))},
Qj(d){var x=0,w=A.i(y.v),v,u=this,t,s
var $async$Qj=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.b()
x=3
return A.c(A.dd(s.createOffer(y.m.a(A.bq(A.C(y.N,y.z)))),y.A),$async$Qj)
case 3:t=f
v=new B.A4(t.sdp,t.type)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$Qj,w)},
Qg(d){var x=0,w=A.i(y.v),v,u=this,t,s
var $async$Qg=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.b()
x=3
return A.c(A.dd(s.createAnswer(y.m.a(A.bq(A.C(y.N,y.z)))),y.A),$async$Qg)
case 3:t=f
v=new B.A4(t.sdp,t.type)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$Qg,w)},
Cz(d,e){return this.aqm(0,e)},
aqm(d,e){var x=0,w=A.i(y.H),v=this,u
var $async$Cz=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.b()
x=2
return A.c(A.dd(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$Cz)
case 2:return A.f(null,w)}})
return A.h($async$Cz,w)},
CC(d,e){return this.aqD(0,e)},
aqD(d,e){var x=0,w=A.i(y.H),v=this,u
var $async$CC=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.b()
x=2
return A.c(A.dd(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$CC)
case 2:return A.f(null,w)}})
return A.h($async$CC,w)},
P9(d){return this.aYn(d)},
aYn(d){var x=0,w=A.i(y.H),v=this,u,t
var $async$P9=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.b()
u=d.b
u.toString
x=2
return A.c(A.dd(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$P9)
case 2:return A.f(null,w)}})
return A.h($async$P9,w)},
Kz(d){var x=0,w=A.i(y.J),v,u=this,t,s,r
var $async$Kz=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:r=u.at
r===$&&A.b()
x=3
return A.c(A.dd(r.getStats(),y.m),$async$Kz)
case 3:t=f
s=A.a([],y.o)
t.forEach.apply(t,[A.Zi(new B.aKW(s))])
v=s
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$Kz,w)},
au(d){var x=0,w=A.i(y.H),v,u=this,t
var $async$au=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.b()
t.close()
v=A.d9(null,y.H)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$au,w)},
Pg(d,e,f){return this.aYK(0,e,f)},
aYK(d,e,f){var x=0,w=A.i(y.e),v,u=this,t
var $async$Pg=A.d(function(g,h){if(g===1)return A.e(h,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.b()
v=new B.a6Q(t.addTrack(e.d,f.e))
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$Pg,w)}}
B.a6Q.prototype={
TO(d){return this.bcI(d)},
bcI(d){var x=0,w=A.i(y.H),v=this,u,t,s,r
var $async$TO=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:try{u=d
s=u.d
v.a.replaceTrack(s)}catch(q){s=A.ae(q)
if(y.L.b(s)){t=s
throw A.j("Unable to RTCRtpSender::replaceTrack: "+J.u(t))}else throw q}return A.f(null,w)}})
return A.h($async$TO,w)},
CB(d){return this.aqu(d)},
aqu(d){var x=0,w=A.i(y.y),v,u=2,t,s=this,r,q,p,o,n,m,l
var $async$CB=A.d(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:u=4
p=s.a
r=p.getParameters()
o=d.d
n=A.a_(o).i("ad<1,an<l,@>>")
n=A.bq(A.H(new A.ad(o,new B.aL0(),n),!0,n.i("aD.E")))
o=n==null?A.bq([]):n
r.encodings=y.r.a(o)
x=7
return A.c(A.dd(p.setParameters(r),y.X),$async$CB)
case 7:x=8
return A.c(A.d9(!0,y.y),$async$CB)
case 8:p=f
v=p
x=1
break
u=2
x=6
break
case 4:u=3
l=t
p=A.ae(l)
if(y.L.b(p)){q=p
throw A.j("Unable to RTCRtpSender::setParameters: "+J.u(q))}else throw l
x=6
break
case 3:x=2
break
case 6:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$CB,w)}}
B.byH.prototype={
aZ(d){var x=0,w=A.i(y.H),v=this,u,t,s
var $async$aZ=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.ae(r)
if(y.L.b(s)){u=s
s=u
J.u(s)
throw A.j("Unable to RTCRtpTransceiver::stop: "+A.t(s))}else throw r}return A.f(null,w)}})
return A.h($async$aZ,w)}}
B.Pu.prototype={
salA(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.AR()
if(x!=null)x.style.objectFit=e},
afP(){var x=this,w=x.AR(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sl(0,v.aiD(u,x.z!=null,0,t))},
sxE(d,e){var x,w,v,u,t=this
if(e==null){x=t.AR()
if(x!=null)x.srcObject=null
x=t.w
if(x!=null)x.srcObject=null
t.z=null
return}t.z=e
if(e.pF(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.a9(y.l.b(x)?x:new A.cY(x,A.a_(x).i("cY<1,ah>")))
for(;x.t();){w=x.gG(x)
t.x.addTrack(w)}}if(e.Kn(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.a9(y.l.b(x)?x:new A.cY(x,A.a_(x).i("cY<1,ah>")))
for(;x.t();){w=x.gG(x)
t.y.addTrack(w)}}if(t.y!=null){if(t.w==null){v=self.document.createElement("audio")
v.id="audio_"+("RTCVideoRenderer-"+t.Q)
v.muted=e.b==="local"
v.autoplay=!0
t.w=v
x=t.aEz()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.AR()
if(u!=null){u.srcObject=t.x
x=t.AR()
x.toString
t.a72(x)}t.sl(0,t.a.b0I(t.z!=null))},
aEz(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
if(v!=null)return v
x=w.document.createElement("div")
x.id="html_webrtc_audio_manager_list"
x.style.display="none"
w=w.document.body
if(w!=null)w.append(x)
return x},
AR(){var x=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(x!=null)return x
return null},
n(){var x=0,w=A.i(y.H),v,u=this,t,s,r,q,p
var $async$n=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:u.z=null
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.G)(t),++r)t[r].a7(0)
q=u.AR()
t=q==null
if(!t)q.removeAttribute("src")
if(!t)q.load()
t=u.w
if(t!=null)t.remove()
p=self.document.getElementById("html_webrtc_audio_manager_list")
if(p!=null&&!p.hasChildNodes())p.remove()
v=u.en()
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$n,w)},
iL(d){var x=0,w=A.i(y.H),v=this
var $async$iL=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:$.Jw()
$.pY().u8("RTCVideoRenderer-"+v.Q,new B.aL6(v),!0)
return A.f(null,w)}})
return A.h($async$iL,w)},
a72(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.Pw.prototype={
R(){return new B.Px()}}
B.Px.prototype={
X(){var x,w,v=this
v.a8()
v.a.c.a9(0,v.gaNQ())
x=v.a
w=x.c
w.as=x.e
w.salA(0,x.d===D.ru?"contain":"cover")},
aNR(){if(this.c!=null)this.q(new B.aL7())},
n(){if(this.c!=null)this.al()},
aV(d){var x,w
this.b9(d)
A.d4(A.cF(0,0,10,0),new B.aL9(this))
x=this.a
w=x.c
w.salA(0,x.d===D.ru?"contain":"cover")},
A(d){return new A.oO(new B.aL8(this),null)}}
B.a3_.prototype={
awP(d,e,f,g){var x=this,w=$.as
x.a!==$&&A.aF()
x.a=new B.UD(d,x,new A.aV(new A.ap(w,y.c),y.u),e)
if(f.a.gi7())f.a=new B.R1(g.i("@<0>").aM(g).i("R1<1,2>")).jK(f.a)
w=A.io(null,new B.azI(f,x),null,!0,g)
x.b!==$&&A.aF()
x.b=w},
acw(){var x,w
this.d=!0
x=this.c
if(x!=null)x.a7(0)
w=this.b
w===$&&A.b()
w.au(0)}}
B.UD.prototype={
C(d,e){if(this.e)throw A.j(A.a0("Cannot add event after closing."))
if(this.d)return
this.a.a.C(0,e)},
dC(d,e){if(this.e)throw A.j(A.a0("Cannot add event after closing."))
if(this.d)return
this.aGR(d,e)},
iH(d){return this.dC(d,null)},
aGR(d,e){var x=this
if(x.w){x.a.a.dC(d,e)
return}x.c.jb(d,e)
x.acx()
x.b.acw()
x.a.a.au(0).hH(new B.b2H())},
au(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.acw()
x.c.cO(0,x.a.a.au(0))}return x.c.a},
acx(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.d2(0)
return},
$idU:1}
B.a9h.prototype={}
B.a9i.prototype={}
B.xg.prototype={
a8b(d,e){var x=this.b
if((x.b&4)!==0)return
x.C(0,new B.D1(d,e))
x.au(0)},
a53(d){var x
if((this.b.b&4)!==0)throw A.j(B.bzq())
x=A.bq(d)
x.toString
this.a.send(x)},
w0(d,e,f){return this.b_Y(0,e,f)},
b_Y(d,e,f){var x=0,w=A.i(y.H),v=this,u
var $async$w0=A.d(function(g,h){if(g===1)return A.e(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.j(B.bzq())
u.au(0)
v.a.close()
return A.f(null,w)}})
return A.h($async$w0,w)},
$ibzp:1}
B.rO.prototype={}
B.GJ.prototype={
k(d,e){if(e==null)return!1
return e instanceof B.GJ&&e.a===this.a},
gB(d){return C.e.gB(this.a)}}
B.CB.prototype={
k(d,e){var x,w,v,u
if(e==null)return!1
if(e instanceof B.CB&&e.a.length===this.a.length){for(x=this.a,w=x.length,v=e.a,u=0;u<w;++u)if(v[u]!==x[u])return!1
return!0}return!1},
gB(d){return A.fx(this.a)},
j(d){return"BinaryDataReceived("+A.t(this.a)+")"}}
B.D1.prototype={
k(d,e){if(e==null)return!1
return e instanceof B.D1&&e.a===this.a&&e.b===this.b},
gB(d){return A.fx([this.a,this.b])},
j(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.He.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketException"
else return"WebSocketException: "+x},
$ibh:1}
B.Hd.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+x}}
B.aoY.prototype={
gjx(){var x,w=this,v=w.w
if(v===$){x=w.r.b
x===$&&A.b()
x=x.a
x===$&&A.b()
v!==$&&A.aJ()
v=w.w=new B.alV(w,x)}return v},
awA(d){d.hR(0,new B.ap1(this),new B.ap2(this),y.a)}}
B.alV.prototype={
au(d){var x=this.b
x.e=x.d=null
return this.asj(0)}}
B.aaJ.prototype={
j(d){return"WebSocketChannelException: "+this.a},
$ibh:1}
B.vs.prototype={
I(){return"RTCSignalingState."+this.b}}
B.Pq.prototype={
I(){return"RTCIceGatheringState."+this.b}}
B.vq.prototype={
I(){return"RTCPeerConnectionState."+this.b}}
B.me.prototype={
I(){return"RTCIceConnectionState."+this.b}}
B.a6R.prototype={
I(){return"RTCVideoViewObjectFit."+this.b}}
B.vr.prototype={
I(){return"RTCPriorityType."+this.b}}
B.aKL.prototype={}
B.Ny.prototype={}
B.ER.prototype={
j(d){var x=this.d
return"Track(id: "+A.t(x.id)+", kind: "+A.t(x.kind)+", label: "+A.t(x.label)+", enabled: "+A.t(x.enabled)+", muted: "+A.t(x.muted)+")"}}
B.aG9.prototype={}
B.FE.prototype={}
B.Pr.prototype={}
B.byG.prototype={}
B.a6P.prototype={}
B.FF.prototype={}
B.FD.prototype={}
B.aKX.prototype={}
B.Ps.prototype={}
B.aL1.prototype={}
B.A4.prototype={}
B.Rp.prototype={}
B.Pt.prototype={}
B.Pv.prototype={
aiD(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.Pv(x,w,v)},
b0I(d){return this.aiD(null,d,null,null)},
j(d){var x=this
return A.Q(x).j(0)+"(width: "+A.t(x.a)+", height: "+A.t(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["aj<~>()","~()","~(Gl)","bc(FE)","bc(Pt)","bc(me)","~(@)","nq(@)","FD(ah)","an<l,@>(FF)","bc(bzp)","~(rO)"])
B.aQL.prototype={
$0(){return J.bQI(this.a.b7())},
$S:2}
B.aQM.prototype={
$1(d){var x,w,v,u
try{this.b.C(0,this.a.$ti.y[1].a(d))}catch(v){u=A.ae(v)
if(y.i.b(u)){x=u
w=A.aY(v)
this.b.dC(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.btX.prototype={
$1(d){var x,w,v,u=$.bl().b
if(u==null||u.length===0)return
x=self
w=new x.Headers()
w.set("Authorization","Bearer "+A.t(u))
w.set("Content-Type","application/json")
v=y.N
x.window.fetch("https://connexion-prophetique.onrender.com/messagerie/appels/"+this.a+"/signaux",{method:"POST",headers:w,body:C.ab.hc(A.Y(["type","termine","contenu",A.C(v,y.z)],v,y.K),null),keepalive:!0})},
$S:32}
B.btW.prototype={
$0(){return self.window.removeEventListener("beforeunload",this.a)},
$S:0}
B.aq_.prototype={
$1(d){if(d==null)return null
return A.cj(J.u(d))},
$S:140}
B.b0w.prototype={
$0(){var x=this.a
if(x.c!=null)x.q(new B.b0v())},
$S:0}
B.b0v.prototype={
$0(){},
$S:0}
B.b0i.prototype={
$1(d){this.a.v3("candidat_ice",d,!1)},
$S:170}
B.b0j.prototype={
$0(){var x=this.a
if(x.c!=null)x.q(new B.b0h(x))},
$S:0}
B.b0h.prototype={
$0(){return this.a.go=!0},
$S:0}
B.b0k.prototype={
$0(){this.a.l1(A.x("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.b0l.prototype={
$0(){},
$S:0}
B.b0m.prototype={
$1(d){var x=this.a,w=x.ch
if(x.c!=null&&w!=null&&x.x)x.q(new B.b0g(x,w))},
$S:48}
B.b0g.prototype={
$0(){return this.a.CW=new A.aW(Date.now(),0,!1).fh(this.b)},
$S:0}
B.b0n.prototype={
$1(d){},
$S:190}
B.b0o.prototype={
$1(d){this.a.v7()},
$S:48}
B.b_W.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.x&&!x.y){if(x.a.f)x.v3("annule",C.b4,!1)
x.l1(A.x("Pas de r\xe9ponse"))}},
$S:0}
B.b_Z.prototype={
$0(){var x=this.a
x.fy=x.a.d==="video"||x.at?A.x("Micro ou cam\xe9ra refus\xe9 : autorise le micro et la cam\xe9ra dans les r\xe9glages pour appeler en vid\xe9o."):A.x("Micro refus\xe9 : autorise le micro dans les r\xe9glages pour appeler.")},
$S:0}
B.b0_.prototype={
$1(d){this.a.v3("candidat_ice",d,!1)},
$S:170}
B.b00.prototype={
$0(){var x=this.a
if(x.c!=null)x.q(new B.b_Y(x))},
$S:0}
B.b_Y.prototype={
$0(){return this.a.go=!0},
$S:0}
B.b01.prototype={
$0(){this.a.l1(A.x("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.b02.prototype={
$0(){return this.a.z=!0},
$S:0}
B.b03.prototype={
$1(d){var x=this.a,w=x.ch
if(x.c!=null&&w!=null&&x.x)x.q(new B.b_X(x,w))},
$S:48}
B.b_X.prototype={
$0(){return this.a.CW=new A.aW(Date.now(),0,!1).fh(this.b)},
$S:0}
B.b04.prototype={
$1(d){},
$S:190}
B.b05.prototype={
$1(d){this.a.v7()},
$S:48}
B.b0q.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.NV()},
$S:34}
B.b0r.prototype={
$1(d){this.a.l1(A.x("L\u2019appel n\u2019a pas pu aboutir."))},
$S:24}
B.b0s.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.X3("offre",d)},
$S:968}
B.b0t.prototype={
$1(d){this.a.l1(A.x("L\u2019appel n\u2019a pas pu aboutir."))},
$S:24}
B.b0f.prototype={
$0(){return this.a.at=!0},
$S:0}
B.b0c.prototype={
$0(){var x=this.a
x.x=!0
x.ch=new A.aW(Date.now(),0,!1)
x.CW=C.L},
$S:0}
B.b0d.prototype={
$0(){return this.a.id=!0},
$S:0}
B.b0e.prototype={
$1(d){var x=this.a.c
if(x!=null)A.a7(x,!1).co()},
$S:4}
B.b0p.prototype={
$1(d){return A.C(y.N,y.z)},
$S:188}
B.b_S.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.b_Q.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.b_R.prototype={
$0(){return this.a.ay=this.b},
$S:0}
B.b_V.prototype={
$0(){return this.a.at=!0},
$S:0}
B.b_P.prototype={
$1(d){var x=null,w=A.m(A.x("Statistiques de l\u2019appel"),x,x,x,x,C.cH,x,x,x),v=this.a,u=A.fp(A.m(v,x,x,x,x,C.cH,x,x,x),x,C.y)
return A.d2(A.a([A.bo(!1,A.m(A.x("Fermer"),x,x,x,x,x,x,x,x),x,x,C.o,x,x,x,x,new B.b_N(d),x,x),A.bo(!1,A.m(A.x("Copier"),x,x,x,x,x,x,x,x),x,x,C.o,x,x,x,x,new B.b_O(v,d),x,x)],y.p),D.oz,u,x,w)},
$S:17}
B.b_N.prototype={
$0(){return A.a7(this.a,!1).co()},
$S:0}
B.b_O.prototype={
$0(){var x,w,v=null
A.D0(new A.tV(this.a))
x=this.b
A.a7(x,!1).co()
w=A.x("Statistiques copi\xe9es.")
x.K(y.q).f.a0(A.aI(v,v,v,v,v,C.j,v,A.m(w,v,v,v,v,v,v,v,v),v,C.p,v,v,v,v,v,v,v,v,v))},
$S:0}
B.b_T.prototype={
$0(){},
$S:0}
B.b_U.prototype={
$0(){},
$S:0}
B.b07.prototype={
$0(){var x=this.a,w=x.c
w.toString
A.a7(w,!1).co()
x.Dh()},
$S:0}
B.b08.prototype={
$0(){var x=this.a,w=x.c
w.toString
A.a7(w,!1).co()
x.Dj()},
$S:0}
B.b09.prototype={
$0(){var x=this.a,w=x.c
w.toString
A.a7(w,!1).co()
x.D2()},
$S:0}
B.b0a.prototype={
$0(){var x=this.a,w=x.c
w.toString
A.a7(w,!1).Ss().bd(0,new B.b06(x),y.H)},
$S:0}
B.b06.prototype={
$1(d){return this.a.adB()},
$S:12}
B.b0b.prototype={
$1(d){return A.fA(!0,A.a8(this.a,C.m,C.h,C.H),C.Y,!0)},
$S:290}
B.b0u.prototype={
$2(d,e){if(!d)this.a.F2()},
$S:326}
B.biU.prototype={
$2(d,e){var x,w,v,u=null,t=this.a,s=t.d
s===$&&A.b()
s=s.x
s===$&&A.b()
t=t.a.e
x=t?0.07:0.04
t=t?0.55:0.35
w=this.b
v=w+20
s=A.bIc(A.ag(u,u,C.i,u,u,new A.ar(u,u,A.d8(C.v.cm(t*(1-s)),3),u,u,u,C.bi),u,v,u,u,u,u,u,v),1+x*s)
w+=8
w=A.ag(u,u,C.i,u,u,new A.ar(u,u,A.d8(C.v,2),u,u,u,C.bi),u,w,u,u,u,u,u,w)
e.toString
return A.f7(C.P,A.a([s,w,e],y.p),C.j,C.b6,u)},
$S:969}
B.buj.prototype={
$3(d,e,f){if(e==null)return d+" : inconnu"
if(typeof e=="number")return d+" : "+C.d.aL(e,1)+f
return d+" : "+A.t(e)+f},
$2(d,e){return this.$3(d,e,"")},
$S:970}
B.aPE.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.Y(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+3}
B.aPF.prototype={
$1(d){var x=d.b,w=x.length!==0?C.c.gS(x):null
if(w!=null)this.a.aD6(w)
if(d.c.d.kind==="video"){x=this.a.r
if(x!=null)x.$0()}},
$S:z+4}
B.aPG.prototype={
$1(d){var x
if(d===D.L1){x=this.a.w
if(x!=null)x.$0()}},
$S:z+5}
B.aPD.prototype={
$0(){var x=this.a
if(x.ay){x.zH()
x=x.ch
if(x!=null)x.$0()}},
$S:26}
B.asV.prototype={
$1(d){return this.a.YD()},
$S:15}
B.asW.prototype={
$0(){var x=this.a
if(!x.e)x.Dc()},
$S:0}
B.buK.prototype={
$1(d){return d.length!==0},
$S:11}
B.aGl.prototype={
$1(d){return this.a.push(B.by4(d))},
$S:15}
B.aGm.prototype={
$1(d){return this.a.push(B.by4(d))},
$S:15}
B.aGi.prototype={
$1(d){var x=this.a.c
if(x!=null)x.$0()},
$S:18}
B.aGj.prototype={
$1(d){},
$S:18}
B.aGk.prototype={
$1(d){},
$S:18}
B.aGb.prototype={
$0(){return!1},
$S:46}
B.aGc.prototype={
$0(){return!1},
$S:46}
B.aGd.prototype={
$1(d){J.fu(d,new B.aGa(this.a))},
$S:170}
B.aGa.prototype={
$2(d,e){this.a.m(0,d,e)},
$S:43}
B.aKO.prototype={
$1(d){},
$S:18}
B.aKP.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.FE(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:18}
B.aKQ.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.b()
v=B.c7d(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.bBg())switch(w.cx.a){case 0:w.cy=D.L6
break
case 1:w.cy=D.L7
break
case 3:w.cy=D.L8
break
case 5:w.cy=D.L4
break
case 6:w.cy=D.L5
break
case 7:w.cy=D.rs
break
default:break}},
$S:31}
B.aKR.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.b()
x.CW=B.c7e(w.iceGatheringState)},
$S:31}
B.aKS.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.b()
x.ch=B.c92(w.signalingState)},
$S:31}
B.aKT.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.b()
x.cy=B.c8F(w.connectionState)},
$S:31}
B.aKU.prototype={
$1(d){},
$S:31}
B.aKV.prototype={
$1(d){var x,w,v=this.a,u=v.Q
if(u!=null){x=B.by4(d.track)
w=d.streams
w=y.l.b(w)?w:new A.cY(w,A.a_(w).i("cY<1,ah>"))
v=J.eG(w,new B.aKN(v),y.h)
u.$1(new B.Pt(A.H(v,!0,v.$ti.i("aD.E")),x))}},
$S:18}
B.aKN.prototype={
$1(d){return new B.nq(d,this.a.as)},
$S:z+7}
B.aKW.prototype={
$2(d,e){var x,w,v=y.M.a(A.C5(d)),u=A.C(y.N,y.z)
for(x=v.geh(v),x=x.gZ(x);x.t();){w=x.gG(x)
u.m(0,J.u(w.a),w.b)}this.a.push(new B.Rp(d.type,u))},
$S:971}
B.aL_.prototype={
$1(d){var x="id",w=y.f.a(A.C5(d)),v=J.cW(w)
if(v.aA(w,x))v.m(w,x,C.d.v(A.jn(v.h(w,x))))
v.h(w,"uri")
v.h(w,x)
v.h(w,"encrypted")
return new B.FD()},
$S:z+8}
B.aKZ.prototype={
$1(d){var x,w,v,u,t,s,r,q,p,o=null,n="numTemporalLayers",m="scaleResolutionDownBy",l=A.C5(d.rid),k=d.active,j=d.maxBitrate
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
p=A.Y(["rid",l,"active",k,"maxBitrate",j,"maxFramerate",x,"minBitrate",w,n,v,m,u,"ssrc",t,"priority",s,"networkPriority",r,"scalabilityMode",q],p,p)
q=p.h(0,"rid")
r=p.h(0,"active")
s=p.h(0,"maxBitrate")
t=p.h(0,"maxFramerate")
u=p.h(0,"minBitrate")
v=p.h(0,n)
w=p.h(0,m)
x=p.h(0,"ssrc")
j=p.h(0,"scalabilityMode")
k=B.bMC(p.h(0,"priority"))
l=k==null?D.rt:k
this.a.push(new B.FF(q,r,s,u,t,v,w,x,j,l,B.bMC(p.h(0,"networkPriority"))))},
$S:15}
B.aKY.prototype={
$1(d){var x,w,v,u,t,s=null,r=d.payloadType,q=d.name
if(q==null)q=s
x=d.kind
if(x==null)x=s
w=d.clockRate
v=d.numChannels
v=v==null?s:A.b0(v)
u=d.parameters
u=u==null?s:A.C5(u)
t=y.z
t=A.Y(["payloadType",r,"name",q,"kind",x,"clockRate",w,"numChannels",v,"parameters",u],t,t)
t.h(0,"payloadType")
t.h(0,"name")
t.h(0,"kind")
t.h(0,"clockRate")
t.h(0,"numChannels")
t.h(0,"parameters")
this.a.push(new B.a6P())},
$S:15}
B.aL0.prototype={
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
x=$.bQx()
v.m(0,"priority",x.h(0,d.y))
w=d.z
if(w!=null)v.m(0,"networkPriority",x.h(0,w))
return v},
$S:z+9}
B.buS.prototype={
$1(d){return J.iX(self.window.navigator.userAgent,A.bF(d,!1,!1))},
$S:11}
B.aL6.prototype={
$1(d){var x,w,v,u,t
for(x=this.a,w=x.at,v=w.length,u=0;u<w.length;w.length===v||(0,A.G)(w),++u)w[u].a7(0)
C.c.aa(w)
t=self.document.createElement("video")
t.autoplay=!0
t.muted=!0
t.controls=!1
t.srcObject=x.x
t.id="video_"+("RTCVideoRenderer-"+x.Q)
t.setAttribute("playsinline","true")
x.a72(t)
v=y.bU.c
w.push(A.h5(t,"canplay",new B.aL2(x),!1,v))
w.push(A.h5(t,"resize",new B.aL3(x),!1,v))
w.push(A.h5(t,"error",new B.aL4(t),!1,v))
w.push(A.h5(t,"ended",new B.aL5(),!1,v))
return t},
$S:139}
B.aL2.prototype={
$1(d){this.a.afP()},
$S:15}
B.aL3.prototype={
$1(d){this.a.afP()},
$S:15}
B.aL4.prototype={
$1(d){var x,w,v=this.a.error
A.oh("RTCVideoRenderer: videoElement.onError, "+J.u(v))
v.toString
x=C.Gq.h(0,A.a3(v,"code"))
x.toString
w=!J.n(A.a3(v,"message"),"")?A.a3(v,"message"):"No further diagnostic information can be determined or provided."
throw A.j(A.ny(x,C.Gp.h(0,A.a3(v,"code")),w,null))},
$S:32}
B.aL5.prototype={
$1(d){},
$S:15}
B.aL7.prototype={
$0(){},
$S:0}
B.aL9.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aL8.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.aAv("RTCVideoRenderer-"+w.Q)
else w=A.ag(x,x,C.i,x,x,x,x,x,x,x,x,x,x,x)
return A.cU(A.ag(x,w,C.i,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:972}
B.azI.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.b()
v.c=x.hw(w.gl3(w),new B.azH(v),w.gqd())},
$S:0}
B.azH.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.b()
w.acx()
x=x.b
x===$&&A.b()
x.au(0)},
$S:0}
B.b2H.prototype={
$1(d){},
$S:24}
B.arR.prototype={
$1(d){this.a.cO(0,this.b)},
$S:18}
B.arS.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.ha(new B.He("Failed to connect WebSocket"))
else this.b.a8b(1006,"error")},
$S:18}
B.arT.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.c8("data")
if(typeof x==="string")w.b=new B.GJ(A.bw(x))
else if(typeof x==="object"&&A.bVJ(y.m.a(x),"ArrayBuffer"))w.b=new B.CB(A.NY(y.R.a(x),0,null))
else throw A.j(A.a0("unexpected message type: "+J.aq(x).j(0)))
v.C(0,w.b7())},
$S:32}
B.arU.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.cO(0,this.b)
this.b.a8b(d.code,d.reason)},
$S:18}
B.ap1.prototype={
$1(d){var x=d.b,w=this.a
new A.cM(x,A.v(x).i("cM<1>")).dF(new B.aoZ(w))
x=w.r.a
x===$&&A.b()
x=x.b
x===$&&A.b()
new A.cM(x,A.v(x).i("cM<1>")).b8i(new B.ap_(d),new B.ap0(w,d))
w.f.d2(0)},
$S:z+10}
B.aoZ.prototype={
$1(d){var x,w,v
$label0$0:{x=d instanceof B.GJ
w=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.b()
x=x.a
x===$&&A.b()
x.C(0,w)
break $label0$0}x=d instanceof B.CB
v=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.b()
x=x.a
x===$&&A.b()
x.C(0,v)
break $label0$0}if(d instanceof B.D1){x=this.a.r.a
x===$&&A.b()
x=x.a
x===$&&A.b()
x.au(0)}}},
$S:z+11}
B.ap_.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.al(B.bzq())
s=A.bq(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.k.b(x)
if(t)v=x
if(t){this.a.a53(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.a53(new Uint8Array(A.bt(u)))
break $label1$1}t=A.aM("Cannot send "+J.aq(d).j(0))
throw A.j(t)}}catch(r){if(!(A.ae(r) instanceof B.Hd))throw r}},
$S:13}
B.ap0.prototype={
$0(){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q
var $async$$0=A.d(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
x=6
return A.c(t.b.w0(0,s.d,s.e),$async$$0)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(!(A.ae(q) instanceof B.Hd))throw q
x=5
break
case 2:x=1
break
case 5:return A.f(null,w)
case 1:return A.e(u,w)}})
return A.h($async$$0,w)},
$S:2}
B.ap2.prototype={
$1(d){var x,w=d instanceof A.S7?d:new B.aaJ(J.u(d)),v=this.a
v.f.ha(w)
v=v.r.a
v===$&&A.b()
x=v.a
x===$&&A.b()
x.iH(w)
v=v.a
v===$&&A.b()
v.au(0)},
$S:31};(function aliases(){var x=B.Dz.prototype
x.asj=x.au
x=B.Z_.prototype
x.avW=x.n})();(function installTearOffs(){var x=a._instance_1u,w=a._instance_0u
var v
x(v=B.U6.prototype,"gafG","afH",2)
w(v,"gadh","F2",0)
w(v,"gadA","adB",1)
w(v,"ga7l","LN",0)
w(v,"ga7k","LM",0)
w(v,"ga7i","LL",0)
w(v,"ga7j","Dh",0)
w(v,"ga7m","LO",0)
w(v,"gacC","aOC",1)
x(v=B.a0I.prototype,"gaRV","aRW",6)
w(v,"gaQs","YD",1)
w(B.Pu.prototype,"gdO","n",0)
w(B.Px.prototype,"gaNQ","aNR",1)})();(function inheritance(){var x=a.mixinHard,w=a.inheritMany,v=a.inherit
w(A.P,[B.Dz,B.apY,B.Gl,B.a10,B.aPC,B.a0I,B.a4g,B.aKL,B.Ny,B.ER,B.aG9,B.Pr,B.Ps,B.aL1,B.a9i,B.UD,B.a9h,B.xg,B.rO,B.He,B.aaJ,B.FE,B.byG,B.a6P,B.FF,B.FD,B.aKX,B.A4,B.Rp,B.Pt,B.Pv])
v(B.R1,A.fd)
w(A.xr,[B.aQL,B.btW,B.b0w,B.b0v,B.b0j,B.b0h,B.b0k,B.b0l,B.b0g,B.b_W,B.b_Z,B.b00,B.b_Y,B.b01,B.b02,B.b_X,B.b0f,B.b0c,B.b0d,B.b_S,B.b_Q,B.b_R,B.b_V,B.b_N,B.b_O,B.b_T,B.b_U,B.b07,B.b08,B.b09,B.b0a,B.aPD,B.asW,B.aGb,B.aGc,B.aL7,B.aL9,B.azI,B.azH,B.ap0])
w(A.ov,[B.aQM,B.btX,B.aq_,B.b0i,B.b0m,B.b0n,B.b0o,B.b0_,B.b03,B.b04,B.b05,B.b0q,B.b0r,B.b0s,B.b0t,B.b0e,B.b0p,B.b_P,B.b06,B.b0b,B.buj,B.aPE,B.aPF,B.aPG,B.asV,B.buK,B.aGl,B.aGm,B.aGi,B.aGj,B.aGk,B.aGd,B.aKO,B.aKP,B.aKQ,B.aKR,B.aKS,B.aKT,B.aKU,B.aKV,B.aKN,B.aL_,B.aKZ,B.aKY,B.aL0,B.buS,B.aL6,B.aL2,B.aL3,B.aL4,B.aL5,B.b2H,B.arR,B.arS,B.arT,B.arU,B.ap1,B.aoZ,B.ap_,B.ap2])
w(A.T,[B.u1,B.Ir,B.Pw])
w(A.V,[B.U6,B.Z_,B.Px])
w(A.KQ,[B.b0u,B.biU,B.aGa,B.aKW,B.aL8])
w(A.a5,[B.acB,B.Ta,B.wh])
v(B.agS,B.Z_)
v(B.aKM,B.aKL)
v(B.nq,B.Ny)
v(B.a4M,B.ER)
v(B.Nx,B.aG9)
v(B.a6O,B.Pr)
v(B.a6Q,B.Ps)
v(B.byH,B.aL1)
v(B.Pu,A.di)
w(B.a9i,[B.a3_,B.aoY])
w(B.rO,[B.GJ,B.CB,B.D1])
v(B.Hd,B.He)
v(B.alV,B.Dz)
w(A.ae8,[B.vs,B.Pq,B.vq,B.me,B.a6R,B.vr])
x(B.Z_,A.h2)})()
A.alx(b.typeUniverse,JSON.parse('{"Dz":{"dU":["1"]},"R1":{"fd":["1","2"],"fd.S":"1","fd.T":"2"},"Ir":{"T":[],"k":[]},"u1":{"T":[],"k":[]},"U6":{"V":["u1"]},"acB":{"a5":[],"k":[]},"Ta":{"a5":[],"k":[]},"wh":{"a5":[],"k":[]},"agS":{"V":["Ir"]},"nq":{"Ny":[]},"a4M":{"ER":[]},"a6O":{"Pr":[]},"a6Q":{"Ps":[]},"Pu":{"di":["Pv"],"aN":[]},"Pw":{"T":[],"k":[]},"Px":{"V":["Pw"]},"UD":{"dU":["1"]},"xg":{"bzp":[]},"GJ":{"rO":[]},"CB":{"rO":[]},"D1":{"rO":[]},"He":{"bh":[]},"Hd":{"bh":[]},"alV":{"dU":["@"]},"aaJ":{"bh":[]}}'))
A.bJs(b.typeUniverse,JSON.parse('{"Dz":1,"UD":1,"a9i":1}'))
var y=(function rtii(){var x=A.ao
return{b:x("xg"),L:x("bh"),_:x("aj<@>"),x:x("aj<~>"),T:x("B<an<l,I>>"),t:x("B<an<l,@>>"),Q:x("B<ER>"),B:x("B<a6P>"),O:x("B<FF>"),o:x("B<Rp>"),d:x("B<iN<@>>"),s:x("B<l>"),p:x("B<k>"),r:x("B<P?>"),m:x("ah"),M:x("Nh<P?,P?>"),l:x("D<ah>"),F:x("D<an<l,@>>"),J:x("D<Rp>"),j:x("D<@>"),I:x("D<w>"),P:x("an<l,@>"),f:x("an<@,@>"),E:x("Ny"),G:x("ER"),h:x("nq"),R:x("oZ"),a:x("bc"),K:x("P"),W:x("FD"),Y:x("Pr"),e:x("Ps"),v:x("A4"),Z:x("a9h<P?>"),N:x("l"),i:x("pv"),k:x("fr"),D:x("rO"),U:x("af<l>"),g:x("dD<Gl>"),n:x("dD<~>"),V:x("aV<xg>"),u:x("aV<@>"),w:x("aV<~>"),bU:x("Ud<ah>"),C:x("o5<ah>"),cF:x("ap<xg>"),c:x("ap<@>"),d4:x("ap<~>"),q:x("BL"),y:x("I"),z:x("@"),S:x("w"),A:x("ah?"),cO:x("an<l,@>?"),X:x("P?"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.oz=new A.N(1,0.10588235294117647,0.17254901960784313,0.25098039215686274,C.n)
D.XP=new B.a10(C.cR)
D.a_K=new A.ab(20,0,20,0)
D.ph=new A.ab(32,0,32,0)
D.a08=new A.ab(8,20,8,20)
D.a0s=new A.fY(1,C.bC,C.tc,null)
D.yo=new A.a6(57639,"MaterialIcons",null,!1)
D.a1S=new A.a6(58337,"MaterialIcons",null,!1)
D.a1T=new A.a6(58341,"MaterialIcons",null,!1)
D.a1Z=new A.a6(58721,"MaterialIcons",null,!0)
D.a23=new A.a6(58888,"MaterialIcons",null,!1)
D.a26=new A.a6(59048,"MaterialIcons",null,!1)
D.a27=new A.a6(59049,"MaterialIcons",null,!1)
D.a49=new A.am(C.pM,null,C.f,null,null)
D.a48=new A.am(C.pM,28,C.f,null,null)
D.a2c=new A.a6(61044,"MaterialIcons",null,!1)
D.a4h=new A.am(D.a2c,null,C.f,null,null)
D.yC=new A.a6(58923,"MaterialIcons",null,!1)
D.a4l=new A.am(D.yC,null,C.f,null,null)
D.a4k=new A.am(D.yC,20,C.f,null,null)
D.adH=A.a(x([1,2,4,8,16]),A.ao("B<w>"))
D.B2=A.a(x([]),y.Q)
D.GD=new A.fm("FlutterWebRTC.Method",C.aR,null)
D.asV=new B.me(0,"RTCIceConnectionStateNew")
D.asW=new B.me(1,"RTCIceConnectionStateChecking")
D.asX=new B.me(2,"RTCIceConnectionStateCompleted")
D.asY=new B.me(3,"RTCIceConnectionStateConnected")
D.asZ=new B.me(4,"RTCIceConnectionStateCount")
D.L1=new B.me(5,"RTCIceConnectionStateFailed")
D.at_=new B.me(6,"RTCIceConnectionStateDisconnected")
D.L2=new B.me(7,"RTCIceConnectionStateClosed")
D.L3=new B.Pq(0,"RTCIceGatheringStateNew")
D.at0=new B.Pq(1,"RTCIceGatheringStateGathering")
D.at1=new B.Pq(2,"RTCIceGatheringStateComplete")
D.rs=new B.vq(0,"RTCPeerConnectionStateClosed")
D.L4=new B.vq(1,"RTCPeerConnectionStateFailed")
D.L5=new B.vq(2,"RTCPeerConnectionStateDisconnected")
D.L6=new B.vq(3,"RTCPeerConnectionStateNew")
D.L7=new B.vq(4,"RTCPeerConnectionStateConnecting")
D.L8=new B.vq(5,"RTCPeerConnectionStateConnected")
D.L9=new B.vr(0,"veryLow")
D.rt=new B.vr(1,"low")
D.La=new B.vr(2,"medium")
D.Lb=new B.vr(3,"high")
D.at2=new B.vs(0,"RTCSignalingStateStable")
D.at3=new B.vs(1,"RTCSignalingStateHaveLocalOffer")
D.at4=new B.vs(2,"RTCSignalingStateHaveRemoteOffer")
D.at5=new B.vs(3,"RTCSignalingStateHaveLocalPrAnswer")
D.at6=new B.vs(4,"RTCSignalingStateHaveRemotePrAnswer")
D.Lc=new B.vs(5,"RTCSignalingStateClosed")
D.at7=new B.Pv(0,0,0)
D.ru=new B.a6R(0,"RTCVideoViewObjectFitContain")
D.Ld=new B.a6R(1,"RTCVideoViewObjectFitCover")
D.tH=new A.A(!0,C.aj,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.aAU=new A.A(!0,C.f,null,null,null,null,13,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.bAd=null
$.bIF=!1
$.bGX=1
$.c9p=A.Y(["very-low",D.L9,"low",D.rt,"medium",D.La,"high",D.Lb],y.N,A.ao("vr"))})();(function lazyInitializers(){var x=a.lazyFinal
x($,"cd2","aom",()=>new B.aKM())
x($,"cb6","bBg",()=>C.e.p(A.a3(A.a3(A.a3(A.bAV(),"window"),"navigator"),"userAgent"),"Firefox"))
x($,"chM","bQx",()=>A.Y([D.L9,"very-low",D.rt,"low",D.La,"medium",D.Lb,"high"],A.ao("vr"),y.N))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_1",e:"endPart",h:b})})($__dart_deferred_initializers__,"o6uoXHi2OFR/ABhucH+7jOSzlTU=");