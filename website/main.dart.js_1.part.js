((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_1",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={Bv:function Bv(){},Oe:function Oe(d){this.$ti=d},aKW:function aKW(d){this.a=d},aKX:function aKX(d,e){this.a=d
this.b=e},
bBv(d){var x
B.bk_()
if(d.length===0)return
x=A.bs(new B.bkw(d))
self.window.addEventListener("beforeunload",x)
$.bqJ=new B.bkv(x)},
bk_(){var x=$.bqJ
if(x!=null)x.$0()
$.bqJ=null},
bkw:function bkw(d){this.a=d},
bkv:function bkv(d){this.a=d},
aln(d){var x,w,v=new B.alo(),u=J.Z(d),t=u.h(d,"id")
t=J.x(t==null?"":t)
x=u.h(d,"conversation_id")
J.x(x==null?"":x)
x=u.h(d,"appelant_id")
x=J.x(x==null?"":x)
w=u.h(d,"appelant_nom")
J.x(w==null?"":w)
A.aV(u.h(d,"appele_id"))
A.aV(u.h(d,"appele_nom"))
w=u.h(d,"type")
J.x(w==null?"audio":w)
w=u.h(d,"statut")
w=J.x(w==null?"sonne":w)
v.$1(u.h(d,"cree_le"))
v.$1(u.h(d,"repondu_le"))
return new B.alm(t,x,w)},
bpp(d){var x,w,v,u=J.Z(d),t=u.h(d,"contenu"),s=u.h(d,"id")
s=J.x(s==null?"":s)
x=u.h(d,"appel_id")
J.x(x==null?"":x)
x=u.h(d,"emetteur_id")
x=J.x(x==null?"":x)
w=u.h(d,"type")
w=J.x(w==null?"":w)
if(y.P.b(t))v=t
else v=y.f.b(t)?J.kQ(t,y.N,y.z):C.ba
if(u.h(d,"cree_le")!=null)A.cm(J.x(u.h(d,"cree_le")))
return new B.Ea(s,x,w,v)},
bId(d){var x,w,v,u,t,s,r=J.Z(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return D.SI
x=A.a([],y.t)
for(r=J.a9(q),w=y.f,v=y.P,u=y.N,t=y.z;r.v();){s=r.gH(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.kQ(s,u,t))}return new B.YU(x)},
bCe(d){var x=J.Z(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.r5(v)
if(!x.l(v,"offer")&&!x.l(v,"answer"))return null
return new A.adU(w,v)},
bV_(d){var x,w,v=J.Z(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.adX(u,A.nj(w)?w:null,v)},
alm:function alm(d,e,f){this.a=d
this.c=e
this.w=f},
alo:function alo(){},
Ea:function Ea(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
YU:function YU(d){this.a=d},
ajl(d){return B.bVL(d)},
bVL(d){var x=0,w=A.i(y.y),v
var $async$ajl=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:v=!0
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$ajl,w)},
buK(d,e,f,g,h,i,j,k,l,m){return new B.rK(f,m,h,l,i,d,j,k,e,g,null)},
bz0(d,e,f,g,h,i,j,k,l,m,n){return new B.a8y(e,g,f,d,n,k,j,i,h,l,m,null)},
bAB(d,e){var x=null
return new A.ac(D.op,A.m(d.toUpperCase(),x,2,C.U,x,A.cy(x,x,C.f,x,x,x,x,x,"Cinzel",x,x,e,x,x,C.T,x,x,!0,x,1.2,x,x,x,x,x,x),C.au,x,x),x)},
rK:function rK(d,e,f,g,h,i,j,k,l,m,n){var _=this
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
R9:function R9(d,e){var _=this
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
aUN:function aUN(d){this.a=d},
aUM:function aUM(){},
aUz:function aUz(d){this.a=d},
aUA:function aUA(d){this.a=d},
aUy:function aUy(d){this.a=d},
aUB:function aUB(d){this.a=d},
aUC:function aUC(){},
aUD:function aUD(d){this.a=d},
aUx:function aUx(d,e){this.a=d
this.b=e},
aUE:function aUE(){},
aUF:function aUF(d){this.a=d},
aUc:function aUc(d){this.a=d},
aUf:function aUf(d){this.a=d},
aUg:function aUg(d){this.a=d},
aUh:function aUh(d){this.a=d},
aUe:function aUe(d){this.a=d},
aUi:function aUi(d){this.a=d},
aUj:function aUj(d){this.a=d},
aUk:function aUk(d){this.a=d},
aUd:function aUd(d,e){this.a=d
this.b=e},
aUl:function aUl(){},
aUm:function aUm(d){this.a=d},
aUH:function aUH(d){this.a=d},
aUI:function aUI(d){this.a=d},
aUJ:function aUJ(d){this.a=d},
aUK:function aUK(d){this.a=d},
aUw:function aUw(d){this.a=d},
aUt:function aUt(d,e){this.a=d
this.b=e},
aUu:function aUu(d){this.a=d},
aUv:function aUv(d){this.a=d},
aUG:function aUG(){},
aU8:function aU8(d,e){this.a=d
this.b=e},
aU6:function aU6(d,e){this.a=d
this.b=e},
aU7:function aU7(d,e){this.a=d
this.b=e},
aUb:function aUb(d){this.a=d},
aU5:function aU5(d){this.a=d},
aU3:function aU3(d){this.a=d},
aU4:function aU4(d,e){this.a=d
this.b=e},
aU9:function aU9(){},
aUa:function aUa(){},
aUo:function aUo(d){this.a=d},
aUp:function aUp(d){this.a=d},
aUq:function aUq(d){this.a=d},
aUr:function aUr(d){this.a=d},
aUn:function aUn(d){this.a=d},
aUs:function aUs(d){this.a=d},
aUL:function aUL(d){this.a=d},
a8y:function a8y(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
Qd:function Qd(d,e){this.c=d
this.a=e},
uJ:function uJ(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
Gc:function Gc(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
acL:function acL(d,e){var _=this
_.d=$
_.eE$=d
_.bL$=e
_.c=_.a=null},
bap:function bap(d,e){this.a=d
this.b=e},
VX:function VX(){},
bXD(a3,a4){var x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=null,a0="kind",a1="video",a2="packetsLost"
for(x=J.a9(a3),w=d,v=w,u=v,t=u,s=t,r=s,q=r,p=q,o=p,n=o,m=n;x.v();){l=x.gH(x)
k=l.d
l=l.b
if(l==="codec"){l=k.h(0,"mimeType")
j=J.x(l==null?"":l)
if(C.e.bG(j,"video/"))m=C.e.cq(j,6)}else if(l==="outbound-rtp"&&J.l(k.h(0,a0),a1)){l=A.bU(k.h(0,"bytesSent"))
n=l==null?d:C.d.t(l)
l=A.bU(k.h(0,"packetsSent"))
o=l==null?d:C.d.t(l)
u=A.bU(k.h(0,"framesPerSecond"))
if(u==null)u=d
l=A.bU(k.h(0,"frameWidth"))
v=l==null?d:C.d.t(l)
l=A.bU(k.h(0,"frameHeight"))
w=l==null?d:C.d.t(l)}else if(l==="remote-inbound-rtp"&&J.l(k.h(0,a0),a1)){l=A.bU(k.h(0,a2))
p=l==null?d:C.d.t(l)
r=A.bU(k.h(0,"jitter"))
if(r==null)r=d
i=A.bU(k.h(0,"roundTripTime"))
if(i==null)i=d
if(i!=null)t=i*1000}else if(l==="inbound-rtp"&&J.l(k.h(0,a0),a1)){l=A.bU(k.h(0,a2))
q=l==null?d:C.d.t(l)
s=A.bU(k.h(0,"jitter"))
if(s==null)s=d}else if(l==="candidate-pair"&&J.l(k.h(0,"state"),"succeeded")){i=A.bU(k.h(0,"currentRoundTripTime"))
if(i==null)i=d
if(t==null&&i!=null)t=i*1000}}x=a4==null
l=A.bU(x?d:a4.h(0,"octetsEnvoyes"))
h=l==null?d:C.d.t(l)
l=A.bU(x?d:a4.h(0,"horodatageMs"))
g=l==null?d:C.d.t(l)
x=Date.now()
if(n!=null&&h!=null&&g!=null){f=(x-g)/1000
e=f>0&&n>=h?(n-h)*8/f/1000:d}else e=d
l=r==null?d:r*1000
return A.Y(["codecVideo",m,"octetsEnvoyes",n,"paquetsEnvoyes",o,"paquetsPerdusEnvoi",p,"paquetsPerdusReception",q,"gigueEnvoiMs",l,"gigueReceptionMs",s==null?d:s*1000,"allerRetourMs",t,"debitSortantKbitS",e,"imagesParSeconde",u,"largeur",v,"hauteur",w,"horodatageMs",x],y.N,y.z)},
bBE(d){var x=new B.bkS(),w=J.Z(d),v=w.h(d,"largeur")!=null&&w.h(d,"hauteur")!=null?A.A(w.h(d,"largeur"))+"x"+A.A(w.h(d,"hauteur")):null
return C.c.b4(A.a([x.$2("Codec vid\xe9o",w.h(d,"codecVideo")),x.$3("D\xe9bit sortant",w.h(d,"debitSortantKbitS")," kbit/s"),x.$2("Paquets envoy\xe9s",w.h(d,"paquetsEnvoyes")),x.$2("Paquets perdus (envoi)",w.h(d,"paquetsPerdusEnvoi")),x.$2("Paquets perdus (r\xe9ception)",w.h(d,"paquetsPerdusReception")),x.$3("Gigue (envoi)",w.h(d,"gigueEnvoiMs")," ms"),x.$3("Gigue (r\xe9ception)",w.h(d,"gigueReceptionMs")," ms"),x.$3("Aller-retour",w.h(d,"allerRetourMs")," ms"),x.$2("Images par seconde",w.h(d,"imagesParSeconde")),x.$2("R\xe9solution envoy\xe9e",v)],y.s),"\n")},
bkS:function bkS(){},
aJV:function aJV(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.y=_.x=!1
_.ax=_.at=_.as=_.Q=_.z=null
_.ay=!1
_.ch=null
_.CW=!1},
aJX:function aJX(d){this.a=d},
aJY:function aJY(d){this.a=d},
aJZ:function aJZ(d){this.a=d},
aJW:function aJW(d){this.a=d},
YD:function YD(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.y=_.x=null},
aoa:function aoa(d){this.a=d},
aob:function aob(d){this.a=d},
bBR(d){var x=y.U,w=A.J(new A.ae(A.a(d.split(" "),y.s),new B.bli(),x),!0,x.i("p.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.n(C.c.gR(w),0).toUpperCase()
return(J.n(C.c.gR(w),0)+J.n(C.c.gaK(w),0)).toUpperCase()},
bli:function bli(){},
a1_:function a1_(){this.a=null},
aFn:function aFn(){},
mA:function mA(d,e){this.e=d
this.b=e},
aBh:function aBh(d){this.a=d},
aBi:function aBi(d){this.a=d},
boD(d){var x=new B.a1s(d)
x.atB(d)
return x},
a1s:function a1s(d){this.d=d
this.c=null},
aBe:function aBe(d){this.a=d},
aBf:function aBf(d){this.a=d},
aBg:function aBg(d){this.a=d},
L3:function L3(){},
aB7:function aB7(){},
aB8:function aB8(){},
aB9:function aB9(d){this.a=d},
aB6:function aB6(d){this.a=d},
bN8(d,e){var x=y.N
x=new B.a3n(d,e,A.C(x,y.E),A.C(x,y.z))
x.atK(d,e)
return x},
a3n:function a3n(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aFp:function aFp(d){this.a=d},
aFq:function aFq(d){this.a=d},
aFr:function aFr(d){this.a=d},
aFs:function aFs(d){this.a=d},
aFt:function aFt(d){this.a=d},
aFu:function aFu(d){this.a=d},
aFv:function aFv(d){this.a=d},
aFw:function aFw(d){this.a=d},
aFo:function aFo(d){this.a=d},
aFx:function aFx(d){this.a=d},
bNb(d){var x=d.headerExtensions
x=y.l.b(x)?x:new A.dB(x,A.a_(x).i("dB<1,ai>"))
x=J.ez(x,new B.aFB(),y.W)
return A.J(x,!0,x.$ti.i("aI.E"))},
bNa(d){var x,w
if("encodings" in d)x=d.encodings
else x=[]
w=A.a([],y.O)
C.c.aD(x,new B.aFA(w))
return w},
bN9(d){var x,w
if("codecs" in d)x=d.codecs
else x=[]
w=A.a([],y.B)
C.c.aD(x,new B.aFz(w))
return w},
aFB:function aFB(){},
aFA:function aFA(d){this.a=d},
aFz:function aFz(d){this.a=d},
a3p:function a3p(d){this.a=d},
aFC:function aFC(){},
bpe:function bpe(d){this.a=d},
bWS(){return C.c.mw(A.a(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.blq())!==-1},
blq:function blq(){},
bxe(){var x=A.a([],y.d),w=$.bxf
$.bxf=w+1
return new B.MQ(w,x,D.alT,$.ah())},
MQ:function MQ(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.fy$=0
_.go$=g
_.k1$=_.id$=0},
aFI:function aFI(d){this.a=d},
aFE:function aFE(d){this.a=d},
aFF:function aFF(d){this.a=d},
aFG:function aFG(d){this.a=d},
aFH:function aFH(){},
bpf(d,e,f){return new B.MS(d,f,e,null)},
MS:function MS(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
MT:function MT(){this.c=this.a=null},
aFJ:function aFJ(){},
aFL:function aFL(d){this.a=d},
aFK:function aFK(d){this.a=d},
bvk(d,e,f,g){var x,w={}
w.a=d
x=new B.a_M(g.i("a_M<0>"))
x.atj(e,f,w,g)
return x},
a_M:function a_M(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
auI:function auI(d,e){this.a=d
this.b=e},
auH:function auH(d){this.a=d},
RG:function RG(d,e,f,g){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g},
aWW:function aWW(){},
a5D:function a5D(d){this.b=this.a=$
this.$ti=d},
a5E:function a5E(){},
bnl(d,e){return B.bHu(d,e)},
bHu(d,e){var x=0,w=A.i(y.b),v,u,t,s,r,q,p
var $async$bnl=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:if(!d.Qm("ws")&&!d.Qm("wss"))throw A.j(A.fF(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.j(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.vH(r,A.i9(null,null,null,!1,y.D))
u=new A.ak($.au,y.cF)
p=new A.aR(u,y.V)
if(J.l(r.readyState,1))p.cJ(0,q)
else if(J.l(r.readyState,2)||J.l(r.readyState,3))p.hq(new B.F0("Unexpected WebSocket state: "+A.A(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.na(r,"open",!1,y.C).gR(0).bf(0,new B.an9(p,q),y.H)
t=y.C
s=y.H
new A.na(r,"error",!1,t).gR(0).bf(0,new B.ana(p,q),s)
A.fC(r,"message",new B.anb(q),!1,y.m)
new A.na(r,"close",!1,t).gR(0).bf(0,new B.anc(p,q),s)
v=u
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$bnl,w)},
vH:function vH(d,e){this.a=d
this.b=e},
an9:function an9(d,e){this.a=d
this.b=e},
ana:function ana(d,e){this.a=d
this.b=e},
anb:function anb(d){this.a=d},
anc:function anc(d,e){this.a=d
this.b=e},
bpX(){return new B.F_("Connection Closed")},
qz:function qz(){},
Ev:function Ev(d){this.a=d},
AE:function AE(d){this.a=d},
B_:function B_(d,e){this.a=d
this.b=e},
F0:function F0(d){this.a=d},
F_:function F_(d){this.a=d},
bH1(d){var x=null,w=$.au,v=new B.a5D(y.Z),u=y.X,t=A.i9(x,x,x,!0,u),s=A.i9(x,x,x,!0,u)
v.a=B.bvk(new A.cK(s,A.u(s).i("cK<1>")),new A.GD(t),!0,u)
v.b=B.bvk(new A.cK(t,A.u(t).i("cK<1>")),new A.GD(s),!1,u)
v=new B.ako(new A.aR(new A.ak(w,y.d4),y.w),v)
v.at4(d)
return v},
ako:function ako(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
aks:function aks(d){this.a=d},
akp:function akp(d){this.a=d},
akq:function akq(d){this.a=d},
akr:function akr(d,e){this.a=d
this.b=e},
akt:function akt(d){this.a=d},
ahC:function ahC(d,e){this.b=d
this.a=e},
a6R:function a6R(d){this.a=d},
bWu(d){switch(d){case"new":return D.alG
case"checking":return D.alH
case"connected":return D.alJ
case"completed":return D.alI
case"failed":return D.J7
case"disconnected":return D.alL
case"closed":return D.J8
case"count":return D.alK}return D.J8},
bWv(d){switch(d){case"new":return D.J9
case"gathering":return D.alM
case"complete":return D.alN}return D.J9},
bXO(d){switch(d){case"stable":return D.alO
case"have-local-offer":return D.alP
case"have-local-pranswer":return D.alR
case"have-remote-offer":return D.alQ
case"have-remote-pranswer":return D.alS
case"closed":return D.Ji}return D.Ji},
bXv(d){switch(d){case"new":return D.Jc
case"connecting":return D.Jd
case"connected":return D.Je
case"closed":return D.qo
case"disconnected":return D.Jb
case"failed":return D.Ja}return D.qo},
bCt(d){if(d==null)return null
return $.bY9.h(0,d)},
u0:function u0(d,e){this.a=d
this.b=e},
MM:function MM(d,e){this.a=d
this.b=e},
tZ:function tZ(d,e){this.a=d
this.b=e},
lu:function lu(d,e){this.a=d
this.b=e},
a3q:function a3q(d,e){this.a=d
this.b=e},
u_:function u_(d,e){this.a=d
this.b=e},
aFm:function aFm(){},
L4:function L4(){},
CM:function CM(){},
aB5:function aB5(){},
Dt:function Dt(d,e,f){this.a=d
this.b=e
this.c=f},
MN:function MN(){},
bpd:function bpd(){},
a3o:function a3o(){},
Du:function Du(d,e,f,g,h,i,j,k,l,m,n){var _=this
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
Ds:function Ds(){},
aFy:function aFy(d){this.d=d},
MO:function MO(){},
aFD:function aFD(){},
yh:function yh(d,e){this.a=d
this.b=e},
OC:function OC(d,e){this.b=d
this.d=e},
MP:function MP(d,e){this.b=d
this.c=e},
MR:function MR(d,e,f){this.a=d
this.b=e
this.c=f},
bqZ(){var x=0,w=A.i(y.H),v
var $async$bqZ=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:x=1
break
case 1:return A.f(v,w)}})
return A.h($async$bqZ,w)},
bog(d){var x=0,w=A.i(y.y)
var $async$bog=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.j("The is not a video track => "+d.j(0))
throw A.j("You need to specify the deviceId")
return A.f(null,w)}})
return A.h($async$bog,w)},
a1L(d){var x=0,w=A.i(y.H),v
var $async$a1L=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.c(B.aOR("enableSpeakerphone",A.Y(["enable",d],y.N,v),v,v),$async$a1L)
case 2:return A.f(null,w)}})
return A.h($async$a1L,w)},
aCJ(d,e){var x=0,w=A.i(y.H),v,u,t
var $async$aCJ=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:t=e.d
x=t.kind==="audio"?3:4
break
case 3:u=J.kQ(y.f.a(A.A8(t.getConstraints())),y.N,y.z)
u.n(0,"volume",d)
x=5
return A.c(e.NQ(0,u),$async$aCJ)
case 5:case 4:v=A.cZ(null,y.H)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$aCJ,w)},
aOR(d,e,f,g){return B.bQl(d,e,f,g,f.i("0?"))},
bQl(d,e,f,g,h){var x=0,w=A.i(h),v
var $async$aOR=A.d(function(i,j){if(i===1)return A.e(j,w)
while(true)switch(x){case 0:x=3
return A.c(B.aOQ(),$async$aOR)
case 3:v=D.ES.cr(d,e,!1,f)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$aOR,w)},
aOQ(){var x=0,w=A.i(y.H),v,u
var $async$aOQ=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:x=!$.byQ?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.c(D.ES.cr("initialize",A.Y(["options",A.C(v,u)],v,u),!1,y.H),$async$aOQ)
case 4:$.byQ=!0
case 3:return A.f(null,w)}})
return A.h($async$aOQ,w)}},D
J=c[1]
A=c[0]
C=c[2]
B=a.updateHolder(c[6],B)
D=c[8]
B.Bv.prototype={
E(d,e){this.a.E(0,e)},
dn(d,e){this.a.dn(d,e)},
av(d){return this.a.av(0)},
$idI:1}
B.Oe.prototype={
jg(d){var x=A.c1("subscription"),w=A.i9(new B.aKW(x),null,null,!0,this.$ti.y[1])
x.b=d.hg(new B.aKX(this,w),w.gob(w),w.gpx())
return new A.cK(w,A.u(w).i("cK<1>"))}}
B.alm.prototype={}
B.Ea.prototype={}
B.YU.prototype={}
B.rK.prototype={
P(){return new B.R9(A.aQ(y.N),C.G)}}
B.R9.prototype={
V(){var x,w,v,u,t,s,r,q,p,o=this,n=null
o.a9()
x=o.a
o.r=x.c
x=x.x
if(x==null)x=new B.aJV(B.bxe(),B.bxe())
o.d!==$&&A.ay()
o.d=x
w=o.a
v=w.y
if(v==null)v=new B.YD(new A.dr(n,n,y.g),new A.dr(n,n,y.n))
o.e!==$&&A.ay()
o.e=v
x.ch=new B.aUN(o)
o.fx=!0
u=new B.a1_()
o.fr!==$&&A.ay()
o.fr=u
t=w.x
if(t!=null){s=$.ij()
r=s.a
q=r.length!==0&&s.as===t&&r===w.c&&s.w}else q=!1
t=$.ij()
s=o.r
r=w.e
p=w.d
t.aYz(s,r,x,v,w.f,p)
x=o.a
if(x.as)t.ax=!0
if(q){o.MG()
return}if(x.f)u.q6("assets/audio/tonalite-appel.wav")
o.pc()},
m(){var x=this,w=x.cx
if(w!=null)w.a8(0)
w=x.cy
if(w!=null)w.a8(0)
w=x.db
if(w!=null)w.a8(0)
w=x.dx
if(w!=null)w.a8(0)
w=x.dy
if(w!=null)w.a8(0)
w=x.fr
w===$&&A.b()
w.eS()
if(x.fx)w.ju()
w=$.ij()
if(!(w.r&&w.a===x.r&&!x.y)){B.bk_()
w=x.d
w===$&&A.b()
w.ju()
w=x.e
w===$&&A.b()
w.FU()}x.am()},
MG(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l
var $async$MG=A.d(function(d,e){if(d===1){t=e
x=u}while(true)$async$outer:switch(x){case 0:s.a.toString
o=$.bg()
s.w=o.gHc()
o=$.ij()
s.Q=o.x
s.as=o.y
s.ay=o.Q
s.x=o.e
o=o.f
s.ch=o
if(o!=null){o=Date.now()
n=s.ch
n.toString
s.CW=new A.aS(o,0,!1).fa(n)}B.bBv(s.r)
u=4
s.a.toString
o=$.bg()
x=7
return A.c(o.cc("/messagerie/appels/"+s.r+"/signaux"),$async$MG)
case 7:r=e
for(o=J.a9(r),n=s.f;o.v();){q=o.gH(o)
p=B.bpp(q)
n.E(0,p.a)
if(p.d==="termine"||p.d==="refuse"||p.d==="annule"){s.kC(A.t("Appel termin\xe9"))
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
n.f=new B.aUz(s)
n.r=new B.aUA(s)
n.w=new B.aUB(s)
s.z=!0
if(o)s.q(new B.aUC())
s.db=A.lG(C.cJ,new B.aUD(s))
o=s.e
o===$&&A.b()
n=o.r
s.dx=new A.cu(n,A.u(n).i("cu<1>")).dG(s.gade())
o=o.w
s.dy=new A.cu(o,A.u(o).i("cu<1>")).dG(new B.aUE())
s.cx=A.lG(C.ek,new B.aUF(s))
s.ud()
case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$MG,w)},
azy(){var x=this.cy
if(x!=null)x.a8(0)
this.cy=A.cS(C.dN,new B.aUc(this))},
pc(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$pc=A.d(function(d,a0){if(d===1){t=a0
x=u}while(true)switch(x){case 0:f="appel"
u=4
r=null
j=s.a
i=j.z
x=i!=null?7:9
break
case 7:x=10
return A.c(i,$async$pc)
case 10:r=a0
j=s.r=B.aln(r).a
x=8
break
case 9:i=$.bg()
x=11
return A.c(i.zu(j.c),$async$pc)
case 11:r=a0
j=s.r=s.a.c
case 8:i=$.ij()
i.aYh(j)
B.bBv(s.r)
if(s.a.f)i.OS()
q=B.aln(r)
if(s.c==null){x=1
break}j=q.w
if(j==="termine"||j==="expire"){s.kC(A.t("Appel termin\xe9"))
x=1
break}s.a.toString
j=$.bg()
s.w=j.gHc()
f="ice"
s.a.toString
j=$.bg()
p=j.Po()
o=s.Dh()
x=12
return A.c(p,$async$pc)
case 12:n=a0
m=B.bId(n)
x=15
return A.c(o,$async$pc)
case 15:x=!a0?13:14
break
case 13:if(s.c==null){x=1
break}s.q(new B.aUf(s))
x=16
return A.c(A.iu(C.iy,null,y.z),$async$pc)
case 16:if(s.c==null){x=1
break}s.kC(null)
x=1
break
case 14:s.azy()
f="webrtc"
j=s.d
j===$&&A.b()
h=s.a.d==="video"||s.at
x=17
return A.c(j.tb(A.Y(["iceServers",m.a],y.N,y.z),h),$async$pc)
case 17:j.f=new B.aUg(s)
j.r=new B.aUh(s)
j.w=new B.aUi(s)
if(s.c==null){x=1
break}s.q(new B.aUj(s))
i.b33()
s.db=A.lG(C.cJ,new B.aUk(s))
j=s.e
j===$&&A.b()
i=j.r
s.dx=new A.cu(i,A.u(i).i("cu<1>")).dG(s.gade())
i=j.w
s.dy=new A.cu(i,A.u(i).i("cu<1>")).dG(new B.aUl())
s.a.toString
i=$.bg()
l=i.b
if(l!=null&&J.av(l)!==0){s.a.toString
$.bg()
j.Ou(C.e.a1j("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws",l)}s.cx=A.lG(C.ek,new B.aUm(s))
s.ud()
u=2
x=6
break
case 4:u=3
e=t
k=A.ad(e)
if(s.c==null){x=1
break}A.oK().$1("Appel : \xe9chec \xe0 l\u2019\xe9tape "+A.A(f)+" : "+A.ang(A.A(k)))
j=s.c
j.toString
i=k instanceof A.fu?k.a:s.aIA(f)
j.L(y.q).f.ak(A.aT(null,null,null,null,null,C.l,null,A.m(i,null,null,null,null,null,null,null,null),null,C.w,null,null,null,null,null,null,null,null,null))
s.kC(null)
x=6
break
case 3:x=2
break
case 6:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$pc,w)},
aIA(d){if(d==="ice")return A.t("Configuration d\u2019appel indisponible. V\xe9rifie ta connexion, puis r\xe9essaie.")
if(d==="webrtc")return A.t("Ce navigateur ne peut pas d\xe9marrer l\u2019appel. Essaie depuis l\u2019application.")
return A.t("Appel introuvable ou d\xe9j\xe0 termin\xe9.")},
Dh(){var x=0,w=A.i(y.y),v,u=2,t,s=this,r,q,p
var $async$Dh=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
x=7
return A.c(s.U8(),$async$Dh)
case 7:if(!e){v=!1
x=1
break}r=s.d
r===$&&A.b()
x=8
return A.c(r.Ah(s.a.d==="video"||s.at),$async$Dh)
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
return A.h($async$Dh,w)},
U8(){var x=0,w=A.i(y.y),v,u=this
var $async$U8=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:v=B.ajl(u.a.d==="video"||u.at)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$U8,w)},
ud(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$ud=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.y){x=1
break}u=4
s.a.toString
p=$.bg()
x=7
return A.c(p.cc("/messagerie/appels/"+s.r+"/signaux"),$async$ud)
case 7:r=e
for(p=J.a9(r);p.v();){q=p.gH(p)
s.adf(B.bpp(q))}u=2
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
return A.h($async$ud,w)},
adf(d){var x,w,v,u,t=this
if(t.c==null||t.y)return
x=t.f
w=d.a
if(x.p(0,w))return
x.E(0,w)
x=t.w
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(t.a.f)return
t.DN(d)
break
case"reponse":if(!t.a.f)return
v=B.bCe(d.e)
if(v==null)return
x=t.d
x===$&&A.b()
x.NP(A.Y(["sdp",v.a,"type",v.b],y.N,y.z)).bf(0,new B.aUH(t),y.a).ho(new B.aUI(t))
break
case"candidat_ice":u=B.bV_(d.e)
if(u==null)return
x=t.d
x===$&&A.b()
x.NF(A.Y(["candidate",u.a,"sdpMid",u.c,"sdpMLineIndex",u.b],y.N,y.z))
break
case"accepte":if(!t.a.f||t.x)return
x=t.d
x===$&&A.b()
x.z5().bf(0,new B.aUJ(t),y.a).ho(new B.aUK(t))
break
case"refuse":t.kC(A.t("Appel refus\xe9"))
break
case"annule":t.kC(A.t("Appel annul\xe9"))
break
case"termine":t.kC(A.t("Appel termin\xe9"))
break}},
DN(d){return this.aOh(d)},
aOh(d){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$DN=A.d(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:o=B.bCe(d.e)
if(o==null){x=1
break}x=!(s.a.d==="video"||s.at)&&C.e.p(o.a,"m=video")?3:4
break
case 3:q=s.d
q===$&&A.b()
x=5
return A.c(q.py(),$async$DN)
case 5:if(f&&s.c!=null&&!s.y){s.q(new B.aUw(s))
$.ij().aiI("video")}case 4:u=7
q=s.d
q===$&&A.b()
x=10
return A.c(q.z6(A.Y(["sdp",o.a,"type",o.b],y.N,y.z)),$async$DN)
case 10:r=f
if(s.c==null||s.y){x=1
break}s.Mi()
s.V7("reponse",r)
u=2
x=9
break
case 7:u=6
n=t
s.kC(A.t("L\u2019appel n\u2019a pas pu aboutir."))
x=9
break
case 6:x=2
break
case 9:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$DN,w)},
Mi(){var x=0,w=A.i(y.H),v,u=this,t,s
var $async$Mi=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:if(u.x){x=1
break}t=u.cy
if(t!=null)t.a8(0)
t=u.fr
t===$&&A.b()
t.eS()
u.q(new B.aUt(u,!1))
t=$.ij()
t.b4L()
s=u.Q
t.a0u(u.as,s)
B.bqZ()
case 1:return A.f(v,w)}})
return A.h($async$Mi,w)},
u9(d,e,f){return this.aAV(d,e,f)},
V7(d,e){return this.u9(d,e,!0)},
aAV(d,e,f){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q
var $async$u9=A.d(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
t.a.toString
s=$.bg()
x=6
return A.c(s.agT(t.r,e,d),$async$u9)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(f&&t.c!=null&&!t.y)t.kC(A.t("L\u2019appel n\u2019a pas pu aboutir."))
x=5
break
case 2:x=1
break
case 5:return A.f(null,w)
case 1:return A.e(u,w)}})
return A.h($async$u9,w)},
DF(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o
var $async$DF=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
r=s.cy
if(r!=null)r.a8(0)
r=s.fr
r===$&&A.b()
r.eS()
u=4
r=s.r
x=r.length!==0?7:8
break
case 7:s.a.toString
q=$.bg()
x=9
return A.c(q.Gb(r,"termine"),$async$DF)
case 9:case 8:u=2
x=6
break
case 4:u=3
o=t
x=6
break
case 3:x=2
break
case 6:B.bk_()
$.ij().If()
r=s.c
if(r!=null)A.af(r,!1).cH()
case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$DF,w)},
aba(){var x=this
if(!x.x||x.y)return
$.ij().b67()
x.q(new B.aUu(x))
$.aA.aJ$.push(new B.aUv(x))},
kC(d){var x,w,v=this,u=null
if(v.y)return
v.y=!0
x=v.cy
if(x!=null)x.a8(0)
x=v.fr
x===$&&A.b()
x.eS()
x=v.r
if(x.length!==0){v.a.toString
w=$.bg()
w.Gb(x,"termine").ho(new B.aUG())}if(d!=null&&v.c!=null)v.c.L(y.q).f.ak(A.aT(u,u,u,u,u,C.l,u,A.m(d,u,u,u,u,u,u,u,u),u,C.w,u,u,u,u,u,u,u,u,u))
B.bk_()
$.ij().If()
x=v.c
if(x!=null)A.af(x,!1).cH()},
Ka(){var x=0,w=A.i(y.H),v=this,u,t
var $async$Ka=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.b()
x=2
return A.c(t.Td(u),$async$Ka)
case 2:if(v.c!=null)v.q(new B.aU8(v,u))
$.ij().a0u(v.as,u)
return A.f(null,w)}})
return A.h($async$Ka,w)},
K9(){var x=0,w=A.i(y.H),v=this,u,t
var $async$K9=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:v.ax=!1
x=2
return A.c(v.K3(!v.as),$async$K9)
case 2:u=$.ij()
t=v.Q
u.a0u(v.as,t)
return A.f(null,w)}})
return A.h($async$K9,w)},
K3(d){return this.av6(d)},
av6(d){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q,p,o
var $async$K3=A.d(function(e,f){if(e===1){u=f
x=v}while(true)switch(x){case 0:v=3
r=t.d
r===$&&A.b()
x=6
return A.c(r.Bk(d),$async$K3)
case 6:v=1
x=5
break
case 3:v=2
o=u
s=A.ad(o)
A.oK().$1("Appel : haut-parleur impossible : "+A.ang(A.A(s)))
x=5
break
case 2:x=1
break
case 5:r=t.d
r===$&&A.b()
p=r.CW
if(t.c!=null&&p!==t.as)t.q(new B.aU6(t,p))
return A.f(null,w)
case 1:return A.e(u,w)}})
return A.h($async$K3,w)},
K8(){var x=0,w=A.i(y.H),v=this,u,t
var $async$K8=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:u=!v.ay
t=v.d
t===$&&A.b()
x=2
return A.c(t.Ta(u),$async$K8)
case 2:if(v.c!=null)v.q(new B.aU7(v,u))
$.ij().b3d(u)
return A.f(null,w)}})
return A.h($async$K8,w)},
C_(){var x=0,w=A.i(y.H),v=this,u
var $async$C_=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:u=v.d
u===$&&A.b()
x=2
return A.c(u.NV(),$async$C_)
case 2:return A.f(null,w)}})
return A.h($async$C_,w)},
acD(){var x,w=this,v="Appel en cours\u2026",u=w.fy
if(u!=null)return u
$.ij()
if(w.x){u=A.t(v)
x=C.b.aG(w.CW.a,1e6)
return u+" "+(C.e.cN(C.b.j(C.b.aG(x,60)),2,"0")+":"+C.e.cN(C.b.j(C.b.au(x,60)),2,"0"))}if(w.z)return w.a.f?A.t("\xc7a sonne\u2026"):A.t(v)
return A.t("Connexion\u2026")},
Kb(){var x=0,w=A.i(y.H),v,u=this,t,s,r
var $async$Kb=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:if(u.a.d==="video"||u.at||u.y){x=1
break}if(!u.x){t=u.c
t.toString
s=A.t("D\xe9croche d\u2019abord pour passer en vid\xe9o.")
t.L(y.q).f.ak(A.aT(null,null,null,null,null,C.l,null,A.m(s,null,null,null,null,null,null,null,null),null,C.w,null,null,null,null,null,null,null,null,null))
x=1
break}t=u.d
t===$&&A.b()
x=3
return A.c(t.Ey(),$async$Kb)
case 3:r=e
if(r==null){t=u.c
if(t!=null){s=A.t("La cam\xe9ra n\u2019a pas pu s\u2019ouvrir.")
t.L(y.q).f.ak(A.aT(null,null,null,null,null,C.l,null,A.m(s,null,null,null,null,null,null,null,null),null,C.w,null,null,null,null,null,null,null,null,null))}x=1
break}if(u.c==null||u.y){x=1
break}u.q(new B.aUb(u))
$.ij().aiI("video")
u.V7("offre",r)
case 1:return A.f(v,w)}})
return A.h($async$Kb,w)},
BN(){var x=0,w=A.i(y.H),v,u=this,t,s,r
var $async$BN=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:if(u.y||u.c==null){x=1
break}t=u.d
t===$&&A.b()
x=3
return A.c(t.JB(),$async$BN)
case 3:s=e
if(u.c==null||u.y){x=1
break}r=J.dK(s)?A.t("Statistiques indisponibles pour cet appel."):B.bBE(s)
t=u.c
t.toString
x=4
return A.c(A.dF(null,null,!0,null,new B.aU5(r),t,null,!0,y.H),$async$BN)
case 4:case 1:return A.f(v,w)}})
return A.h($async$BN,w)},
C1(){var x=0,w=A.i(y.H),v,u=this,t,s
var $async$C1=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:if(!(u.a.d==="video"||u.at)||u.y){x=1
break}t=u.d
t===$&&A.b()
x=t.ay?3:4
break
case 3:x=5
return A.c(t.yC(),$async$C1)
case 5:if(u.c!=null)u.q(new B.aU9())
x=1
break
case 4:x=6
return A.c(t.vX(),$async$C1)
case 6:if(!e){t=u.c
if(t!=null){s=A.t("Le partage d\u2019\xe9cran n\u2019est pas disponible sur cet appareil.")
t.L(y.q).f.ak(A.aT(null,null,null,null,null,C.l,null,A.m(s,null,null,null,null,null,null,null,null),null,C.w,null,null,null,null,null,null,null,null,null))}x=1
break}if(u.c!=null)u.q(new B.aUa())
case 1:return A.f(v,w)}})
return A.h($async$C1,w)},
aKv(){var x,w,v=this,u=null,t=A.a([],y.p)
if(v.a.d==="video"||v.at){t.push(A.bh(!1,u,u,u,!0,u,u,!0,!1,D.Zk,u,new B.aUo(v),!1,u,u,u,u,u,A.m(A.t("Basculer"),u,u,u,u,C.cU,u,u,u),u,u))
x=v.d
x===$&&A.b()
x=x.ay
w=A.ci(x?D.X9:D.X4,C.f,u,u)
t.push(A.bh(!1,u,u,u,!0,u,u,!0,!1,w,u,new B.aUp(v),!1,u,u,u,u,u,A.m(x?A.t("Arr\xeater le partage"):A.t("Partager l\u2019\xe9cran"),u,u,u,u,C.cU,u,u,u),u,u))}if(v.x){t.push(A.bh(!1,u,u,u,!0,u,u,!0,!1,D.Zg,u,new B.aUq(v),!1,u,u,u,u,u,A.m(A.t("Statistiques"),u,u,u,u,C.cU,u,u,u),u,u))
t.push(A.bh(!1,u,u,u,!0,u,u,!0,!1,D.Z9,u,new B.aUr(v),!1,u,u,u,u,u,A.m(A.t("R\xe9duire"),u,u,u,u,C.cU,u,u,u),u,u))}if(t.length===0)return
x=v.c
x.toString
A.f5(D.nJ,new B.aUs(t),x,!1,u,y.H)},
A(d){var x,w,v,u,t,s,r,q=this,p=null,o=q.d
o===$&&A.b()
x=o.c
x=x==null?p:x.oX(0).length!==0
w=q.id
v=q.a
if((v.d==="video"||q.at)&&q.z){if(x===!0)x=A.e0(p,B.bpf(o.e,!1,D.Jj),C.v,!1,p,q.ga53(),p,p,p,p,p,p,p,p,p,p,p,p,p,p,p,p,p,p)
else{x=v.e
v=v.r
u=q.go&&q.x
x=A.cV(A.a7(A.a([new B.Gc(x,v,u,56,p),C.J,B.bAB(x,22),C.C,A.m(q.acD(),p,p,p,p,D.rp,p,p,p)],y.p),C.m,C.i,C.I),p,p)}o=A.a([A.a2N(0,x),A.ht(p,A.YH(A.a6(12),B.bpf(o.d,!0,D.Jj),C.bx),160,p,p,16,16,110),A.ht(p,A.bb(A.bo(!1,D.Zj,C.h,p,C.o,p,p,p,p,q.ga53(),p,A.cP(C.SA,p,C.Z,C.cX,p)),36,36),p,p,p,20,20,p)],y.p)
if(q.x)o.push(A.ht(p,new B.Qd(q.gab9(),p),p,p,16,p,16,p))
x=q.Q
v=q.as
o.push(A.ht(24,B.bz0(q.ay,!0,v,x,q.ga56(),q.ga52(),q.ga54(),q.ga55(),q.gaai(),q.gaaR(),!0),p,p,0,0,p,p))
o=A.eR(C.bl,o,C.l,C.b1,p)}else{x=y.p
v=A.a([],x)
if(q.go)v.push(A.ht(p,A.pM(B.bpf(o.e,!1,D.qq),0),1,p,0,p,0,1))
if(q.x)v.push(A.ht(p,new B.Qd(q.gab9(),p),p,p,16,p,16,p))
o=B.bAB(q.a.e,24)
u=A.m(q.acD(),p,p,p,p,D.rp,C.au,p,p)
t=q.a
s=t.e
t=t.r
t=A.b_(A.cV(new B.Gc(s,t,q.go&&q.x,88,p),p,p),1)
s=q.Q
r=q.as
v.push(A.a7(A.a([C.J,o,C.C,new A.ac(D.op,u,p),t,B.bz0(q.ay,!1,r,s,q.ga56(),q.ga52(),q.ga54(),q.ga55(),q.gaai(),q.gaaR(),q.x),C.J],x),C.m,C.i,C.k))
v=A.eR(C.bl,v,C.l,C.b1,p)
o=v}return A.aEG(w,A.el(p,C.j,A.fb(!0,o,C.Z,!0),p,p,p),new B.aUL(q),y.K)}}
B.a8y.prototype={
A(d){var x,w,v=this,u=null,t=A.a6(28),s=A.b_(new B.uJ(C.wU,v.e,A.t("Haut-parleur"),v.x,u,u),1),r=v.f?D.Xc:D.Xd,q=A.t("Appel vid\xe9o")
r=A.b_(new B.uJ(r,!1,q,v.c?v.y:v.z,u,u),1)
q=v.d
x=q?D.WZ:D.WY
w=y.p
q=A.aD(A.a([s,r,A.b_(new B.uJ(x,q,A.t("Muet"),v.w,u,u),1)],w),C.m,C.i,C.k)
x=A.t("Plus")
return A.aa(u,A.a7(A.a([q,C.J,A.aD(A.a([A.b_(new B.uJ(C.wM,!1,x,v.r?v.Q:u,u,u),1),A.b_(new B.uJ(D.wF,!1,A.t("Terminer"),v.as,C.ee,u),1),D.VK],w),C.m,C.i,C.k)],w),C.m,C.i,C.I),C.h,u,u,new A.an(D.nJ,u,u,t,u,u,C.u),u,u,u,D.Vf,D.Vz,u,u,u)}}
B.Qd.prototype={
A(d){var x=null
return A.a7(A.a([A.bb(A.bo(!1,D.Z8,C.h,x,C.o,x,x,x,x,this.c,x,A.cP(C.nR,x,C.Z,C.cX,x)),48,48),C.ap,A.m(A.t("R\xe9duire"),x,x,x,x,C.at7,x,x,x)],y.p),C.m,C.i,C.I)}}
B.uJ.prototype={
A(d){var x,w,v,u=this,t=null,s=u.r,r=s==null
if(r)s=u.d?C.f:C.nR
if(!r)x=C.f
else x=u.d?C.j:C.f
r=u.f
w=r==null?0.4:1
v=A.cP(s,t,C.Z,C.cX,t)
return A.pM(A.a7(A.a([A.bb(A.bo(!1,A.ci(u.c,x,t,30),C.h,t,C.o,t,t,t,t,r,t,v),72,72),C.C,A.m(u.e,t,t,t,t,D.at6,C.au,t,t)],y.p),C.m,C.i,C.I),w)}}
B.Gc.prototype={
P(){return new B.acL(null,null)}}
B.acL.prototype={
V(){var x,w=this
w.a9()
x=A.bM(null,A.cA(0,0,w.a.e?1100:2400,0),null,1,null,w)
x.RX(0,!0)
w.d!==$&&A.ay()
w.d=x},
aS(d){var x,w
this.b9(d)
x=this.a.e
if(d.e!==x){w=this.d
w===$&&A.b()
w.e=A.cA(0,0,x?1100:2400,0)
w.RX(0,!0)}},
m(){var x=this.d
x===$&&A.b()
x.m()
this.asr()},
A(d){var x,w=this,v=null,u=w.a,t=u.f,s=t*2,r=s+24,q=w.d
q===$&&A.b()
x=u.d
u=x!=null?A.ma(v,x,v,t):A.ma(C.t,v,A.m(B.bBR(u.c),v,v,v,v,A.cy(v,v,C.j,v,v,v,v,v,v,v,v,w.a.f*0.7,v,v,C.T,v,v,!0,v,v,v,v,v,v,v,v),v,v,v),t)
return A.bb(A.hj(q,new B.bap(w,s),u),r,r)}}
B.VX.prototype={
m(){var x=this,w=x.bL$
if(w!=null)w.O(0,x.ghH())
x.bL$=null
x.am()},
bY(){this.cW()
this.cI()
this.hI()}}
B.aJV.prototype={
Ah(d){return this.b4z(d)},
b4z(d){var x=0,w=A.i(y.H),v,u=this,t,s,r,q,p
var $async$Ah=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:if(u.b!=null){x=1
break}t=u.d
x=3
return A.c(t.it(0),$async$Ah)
case 3:$.ajQ()
s=y.N
r=A.Y(["echoCancellation",!0,"noiseSuppression",!0,"autoGainControl",!0],s,y.y)
if(d){q=y.S
q=A.Y(["facingMode","user","width",A.Y(["ideal",640],s,q),"height",A.Y(["ideal",480],s,q),"frameRate",A.Y(["ideal",24],s,q)],s,y.K)}else q=!1
x=4
return A.c(new B.L3().wq(0,A.Y(["audio",r,"video",q],s,y.z)),$async$Ah)
case 4:p=f
u.b=p
t.swB(0,p)
case 1:return A.f(v,w)}})
return A.h($async$Ah,w)},
tb(d,e){return this.b5f(d,e)},
b5f(d,e){var x=0,w=A.i(y.H),v=this,u,t,s,r,q,p,o
var $async$tb=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:x=2
return A.c(v.e.it(0),$async$tb)
case 2:x=v.b==null?3:4
break
case 3:x=5
return A.c(v.Ah(e),$async$tb)
case 5:case 4:u=v.b
u.toString
x=6
return A.c($.ajQ().Zx(d,A.C(y.N,y.z)),$async$tb)
case 6:t=v.a=g
s=u.B8(0),r=s.length,q=0
case 7:if(!(q<s.length)){x=9
break}p=s[q]
x=10
return A.c(t.NC(0,p,u),$async$tb)
case 10:o=g
if(p.d.kind==="video")v.as=o
case 8:s.length===r||(0,A.G)(s),++q
x=7
break
case 9:x=11
return A.c(v.xR(),$async$tb)
case 11:t.e=new B.aJX(v)
t.Q=new B.aJY(v)
t.d=new B.aJZ(v)
return A.f(null,w)}})
return A.h($async$tb,w)},
azo(d){var x,w,v,u=this
u.c=d
x=d.oX(0)
w=x.length!==0?C.c.gR(x).d.id:null
if(!u.x){u.x=!0
u.z=w
u.e.swB(0,d)
u.BX()
v=u.r
if(v!=null)v.$0()}else{v=u.z
if(w!=null&&w!==v){u.z=w
u.e.swB(0,d)
v=u.r
if(v!=null)v.$0()}}},
BX(){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q,p,o,n,m,l
var $async$BX=A.d(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:n=t.CW?0.8:1
m=t.c
m=m==null?null:m.IQ(0)
if(m==null)m=C.aY
q=m.length
p=0
case 2:if(!(p<m.length)){x=4
break}s=m[p]
v=6
x=9
return A.c(B.aCJ(n,s),$async$BX)
case 9:v=1
x=8
break
case 6:v=5
l=u
r=A.ad(l)
A.oK().$1("Appel : volume distant impossible : "+A.ang(A.A(r)))
x=8
break
case 5:x=1
break
case 8:case 3:m.length===q||(0,A.G)(m),++p
x=2
break
case 4:return A.f(null,w)
case 1:return A.e(u,w)}})
return A.h($async$BX,w)},
xR(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h
var $async$xR=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:i=s.as
if(i==null){x=1
break}u=4
o=i.a.getParameters()
n=o.transactionId
if((n==null?null:n)!=null){m=o.rtcp
l=y.z
l=A.Y(["cname",m.cname,"reducedSize",m.reducedSize],l,l)
l.h(0,"cname")
l.h(0,"reducedSize")}B.bNb(o)
m=B.bNa(o)
B.bN9(o)
r=new B.aFy(m)
q=r.d
if(q==null||J.av(q)===0){x=1
break}for(m=q,l=m.length,k=0;k<l;++k){p=m[k]
p.c=5e5
p.e=24}x=7
return A.c(i.Bn(r),$async$xR)
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
return A.h($async$xR,w)},
z5(){var x=0,w=A.i(y.P),v,u=this,t,s
var $async$z5=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.j(A.a4("Connexion non pr\xe9par\xe9e."))
x=3
return A.c(s.OE(0),$async$z5)
case 3:t=e
x=4
return A.c(s.Bl(0,t),$async$z5)
case 4:v=A.Y(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$z5,w)},
z6(d){return this.aXR(d)},
aXR(d){var x=0,w=A.i(y.P),v,u=this,t,s
var $async$z6=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.j(A.a4("Connexion non pr\xe9par\xe9e."))
x=3
return A.c(s.Bo(0,new B.yh(d.h(0,"sdp"),d.h(0,"type"))),$async$z6)
case 3:x=4
return A.c(s.OB(0),$async$z6)
case 4:t=f
x=5
return A.c(s.Bl(0,t),$async$z6)
case 5:v=A.Y(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$z6,w)},
NP(d){return this.aUw(d)},
aUw(d){var x=0,w=A.i(y.H),v=this,u
var $async$NP=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.j(A.a4("Connexion non pr\xe9par\xe9e."))
x=2
return A.c(u.Bo(0,new B.yh(d.h(0,"sdp"),d.h(0,"type"))),$async$NP)
case 2:return A.f(null,w)}})
return A.h($async$NP,w)},
NF(d){return this.aUc(d)},
aUc(d){var x=0,w=A.i(y.H),v,u=this,t
var $async$NF=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.c(t.Nu(new B.Dt(A.aV(d.h(0,"candidate")),A.aV(d.h(0,"sdpMid")),A.fr(d.h(0,"sdpMLineIndex")))),$async$NF)
case 3:case 1:return A.f(v,w)}})
return A.h($async$NF,w)},
Td(d){return this.an9(d)},
an9(d){var x=0,w=A.i(y.H),v=this,u,t,s,r
var $async$Td=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.IQ(0)
if(r==null)r=C.aY
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.G)(r),++s)r[s].sjT(0,t)
return A.f(null,w)}})
return A.h($async$Td,w)},
Bk(d){return this.an0(d)},
an0(d){var x=0,w=A.i(y.H),v=this
var $async$Bk=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:x=2
return A.c(B.a1L(d),$async$Bk)
case 2:v.CW=d
x=3
return A.c(v.BX(),$async$Bk)
case 3:return A.f(null,w)}})
return A.h($async$Bk,w)},
Ta(d){return this.amT(d)},
amT(d){var x=0,w=A.i(y.H),v=this,u,t,s
var $async$Ta=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.oX(0)
if(s==null)s=C.aY
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.G)(s),++t)s[t].sjT(0,d)
return A.f(null,w)}})
return A.h($async$Ta,w)},
NV(){var x=0,w=A.i(y.H),v,u=this,t,s
var $async$NV=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.oX(0)
if(s==null)s=D.zj
if(s.length===0){x=1
break}x=3
return A.c(B.bog(C.c.gR(s)),$async$NV)
case 3:case 1:return A.f(v,w)}})
return A.h($async$NV,w)},
py(){var x=0,w=A.i(y.y),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0
var $async$py=A.d(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:e=s.a
if(e==null||s.y){v=!1
x=1
break}m=s.b
m=m==null?null:m.oX(0).length!==0
if(m===!0){v=!0
x=1
break}r=null
u=4
$.ajQ()
m=y.N
l=y.S
x=7
return A.c(new B.L3().wq(0,A.Y(["audio",!1,"video",A.Y(["facingMode","user","width",A.Y(["ideal",640],m,l),"height",A.Y(["ideal",480],m,l),"frameRate",A.Y(["ideal",24],m,l)],m,y.K)],m,y.z)),$async$py)
case 7:r=a2
q=J.bsW(r)
if(J.av(q)===0){v=!1
x=1
break}p=J.ke(q)
m=s.b
if(m==null)m=null
else{m=m.e
l=p.d
m.addTrack(l)
m=A.cZ(null,y.H)}x=8
return A.c(y.x.b(m)?m:A.ds(m,y.H),$async$py)
case 8:s.d.swB(0,s.b)
m=s.b
m.toString
x=9
return A.c(J.bGf(e,p,m),$async$py)
case 9:o=a2
s.as=o
x=10
return A.c(s.xR(),$async$py)
case 10:v=!0
x=1
break
u=2
x=6
break
case 4:u=3
d=t
m=r
m=m==null?null:J.bsV(m)
if(m==null)m=C.aY
l=m.length
j=y.c
i=y._
h=0
case 11:if(!(h<m.length)){x=13
break}n=m[h]
u=15
g=J.WZ(n)
if(!i.b(g)){f=new A.ak($.au,j)
f.a=8
f.c=g
g=f}x=18
return A.c(g,$async$py)
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
return A.h($async$py,w)},
Ey(){var x=0,w=A.i(y.cO),v,u=2,t,s=this,r,q,p
var $async$Ey=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:x=3
return A.c(s.py(),$async$Ey)
case 3:if(!e){v=null
x=1
break}u=5
x=8
return A.c(s.z5(),$async$Ey)
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
return A.h($async$Ey,w)},
vX(){var x=0,w=A.i(y.y),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0,a1
var $async$vX=A.d(function(a2,a3){if(a2===1){t=a3
x=u}while(true)switch(x){case 0:if(s.a==null||s.y){v=!1
x=1
break}if(s.ay){v=!0
x=1
break}if(A.bt()===C.ar){v=!1
x=1
break}r=s.as
if(r==null){v=!1
x=1
break}q=null
u=4
$.ajQ()
x=7
return A.c(new B.L3().AY(A.Y(["video",!0,"audio",!1],y.N,y.z)),$async$vX)
case 7:q=a3
p=J.bsW(q)
if(J.av(p)===0){v=!1
x=1
break}o=J.ke(p)
l=s.b
k=l==null?null:l.oX(0)
n=k==null?D.zj:k
s.ax=J.av(n)!==0?J.ke(n):null
x=8
return A.c(r.RY(o),$async$vX)
case 8:s.at=q
s.ay=!0
s.d.swB(0,q)
x=9
return A.c(s.xR(),$async$vX)
case 9:o.c=new B.aJW(s)
v=!0
x=1
break
u=2
x=6
break
case 4:u=3
a0=t
l=q
l=l==null?null:J.bsV(l)
if(l==null)l=C.aY
i=l.length
h=y.c
g=y._
f=0
case 10:if(!(f<l.length)){x=12
break}m=l[f]
u=14
e=J.WZ(m)
if(!g.b(e)){d=new A.ak($.au,h)
d.a=8
d.c=e
e=d}x=17
return A.c(e,$async$vX)
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
return A.h($async$vX,w)},
yC(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$yC=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(!s.ay){x=1
break}o=s.ay=!1
u=4
r=s.as
q=s.ax
x=(r!=null?q!=null:o)?7:8
break
case 7:x=9
return A.c(r.RY(q),$async$yC)
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
o=o==null?null:o.B8(0)
if(o==null)o=C.aY
m=o.length
l=y.c
k=y._
j=0
case 10:if(!(j<o.length)){x=12
break}p=o[j]
u=14
i=J.WZ(p)
if(!k.b(i)){h=new A.ak($.au,l)
h.a=8
h.c=i
i=h}x=17
return A.c(i,$async$yC)
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
s.d.swB(0,s.b)
case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$yC,w)},
JB(){var x=0,w=A.i(y.P),v,u=2,t,s=this,r,q,p,o,n
var $async$JB=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:o=s.a
if(o==null||s.y){v=C.ba
x=1
break}u=4
x=7
return A.c(J.bGD(o),$async$JB)
case 7:r=e
q=B.bXD(r,s.Q)
s.Q=q
A.oK().$1("Appel : statistiques : "+B.bBE(q))
v=q
x=1
break
u=2
x=6
break
case 4:u=3
n=t
v=C.ba
x=1
break
x=6
break
case 3:x=2
break
case 6:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$JB,w)},
ju(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0
var $async$ju=A.d(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
s.ay=!1
p=s.at
p=p==null?null:p.B8(0)
if(p==null)p=C.aY
o=p.length
n=y.c
m=y._
l=0
case 3:if(!(l<p.length)){x=5
break}r=p[l]
u=7
k=J.WZ(r)
if(!m.b(k)){j=new A.ak($.au,n)
j.a=8
j.c=k
k=j}x=10
return A.c(k,$async$ju)
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
return A.c(B.a1L(!1),$async$ju)
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
p=p==null?null:p.av(0)
x=20
return A.c(y.x.b(p)?p:A.ds(p,y.H),$async$ju)
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
p=p==null?null:p.B8(0)
if(p==null)p=C.aY
o=p.length
l=0
case 21:if(!(l<p.length)){x=23
break}q=p[l]
u=25
k=J.WZ(q)
if(!m.b(k)){j=new A.ak($.au,n)
j.a=8
j.c=k
k=j}x=28
return A.c(k,$async$ju)
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
return A.c(s.d.m(),$async$ju)
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
return A.c(s.e.m(),$async$ju)
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
return A.h($async$ju,w)}}
B.YD.prototype={
gaWi(){return this.b!=null&&!this.e},
Ou(d,e){return this.aWj(d,e)},
aWj(d,e){var x=0,w=A.i(y.H),v=this
var $async$Ou=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:v.x=d
v.y=e
v.e=!1
v.f=0
x=2
return A.c(v.BW(),$async$Ou)
case 2:return A.f(null,w)}})
return A.h($async$Ou,w)},
BW(){var x=0,w=A.i(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$BW=A.d(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.e){x=1
break}r=s.x
if(r==null||J.av(r)===0){x=1
break}u=4
q=B.bH1(B.bnl(A.cJ(r,0,null),null))
s.b=q
x=7
return A.c(q.f.a,$async$BW)
case 7:s.f=0
p=s.y
if(p!=null&&J.av(p)!==0)try{o=y.N
q.gj8().a.E(0,C.a9.hu(A.Y(["type","auth","jeton",p],o,o),null))}catch(l){}o=q.r.b
o===$&&A.b()
o=o.b
o===$&&A.b()
s.c=new A.cK(o,A.u(o).i("cK<1>")).br(s.gaNB(),!0,s.gaMc(),new B.aoa(s))
u=2
x=6
break
case 4:u=3
m=t
s.WI()
x=6
break
case 3:x=2
break
case 6:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$BW,w)},
aNC(d){var x,w,v,u
try{x=C.a9.eu(0,J.x(d),null)
v=y.P
if(!v.b(x))return
if(!J.l(J.n(x,"type"),"signal_appel"))return
w=J.n(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.E(0,B.bpp(w))}catch(u){}},
WI(){var x,w=this,v=w.c
if(v!=null)v.a8(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.E(0,null)
return}x=D.a7j[v]
w.f=v+1
v=w.d
if(v!=null)v.a8(0)
w.d=A.cS(A.cA(0,0,0,x),new B.aob(w))},
FU(){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q
var $async$FU=A.d(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.a8(0)
s=t.c
s=s==null?null:s.a8(0)
x=2
return A.c(y.x.b(s)?s:A.ds(s,y.H),$async$FU)
case 2:t.c=null
v=4
s=t.b
s=s==null?null:s.gj8().av(0)
x=7
return A.c(y._.b(s)?s:A.ds(s,y.z),$async$FU)
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
return A.h($async$FU,w)}}
B.a1_.prototype={
q6(d){return this.b2g(d)},
b2g(d){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q,p
var $async$q6=A.d(function(e,f){if(e===1){u=f
x=v}while(true)switch(x){case 0:v=3
r=t.a
x=6
return A.c((r==null?t.a=A.alD():r).bh(0),$async$q6)
case 6:r=t.a
r.toString
x=7
return A.c(r.tG(A.aml(A.cJ("asset:///"+d,0,null),null,null),null,!0),$async$q6)
case 7:x=8
return A.c(t.a.ij(C.EB),$async$q6)
case 8:x=9
return A.c(t.a.hB(1),$async$q6)
case 9:x=10
return A.c(t.a.e3(0),$async$q6)
case 10:v=1
x=5
break
case 3:v=2
p=u
s=A.ad(p)
A.oK().$1("Sonnerie appel : lecture impossible ("+d+") : "+A.A(s))
x=5
break
case 2:x=1
break
case 5:return A.f(null,w)
case 1:return A.e(u,w)}})
return A.h($async$q6,w)},
eS(){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q
var $async$eS=A.d(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
s=s==null?null:s.bh(0)
x=6
return A.c(y.x.b(s)?s:A.ds(s,y.H),$async$eS)
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
return A.h($async$eS,w)},
ju(){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q
var $async$ju=A.d(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
s=s==null?null:s.m()
x=6
return A.c(y.x.b(s)?s:A.ds(s,y.H),$async$ju)
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
return A.h($async$ju,w)}}
B.aFn.prototype={
Zx(d,e){return this.aXz(d,e)},
aXz(d,e){var x=0,w=A.i(y.Y),v,u,t,s,r
var $async$Zx=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.Y(["mandatory",A.C(r,r),"optional",A.a([A.Y(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.T)],t,y.K)}r=self.RTCPeerConnection
t=A.lf(u,y.N,y.z)
t.K(0,d)
s=new r(y.m.a(A.bf(t)))
t=J.x(s)
v=B.bN8(C.dI.god().ca(new A.eT(t)),s)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$Zx,w)}}
B.mA.prototype={
IQ(d){var x=A.a([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.dB(w,A.a_(w).i("dB<1,ai>"))
J.fE(w,new B.aBh(x))
return x},
oX(d){var x=A.a([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.dB(w,A.a_(w).i("dB<1,ai>"))
J.fE(w,new B.aBi(x))
return x},
B8(d){var x=A.J(this.IQ(0),!0,y.G)
C.c.K(x,this.oX(0))
return x}}
B.a1s.prototype={
atB(d){var x=this,w=x.d
w.addEventListener("ended",A.bs(new B.aBe(x)))
w.addEventListener("mute",A.bs(new B.aBf(x)))
w.addEventListener("unmute",A.bs(new B.aBg(x)))},
sjT(d,e){this.d.enabled=e},
NQ(d,e){return this.aUz(0,e)},
aUz(d,e){var x=0,w=A.i(y.H),v=this
var $async$NQ=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:x=2
return A.c(A.dc(v.d.applyConstraints(y.m.a(A.bf(e))),y.X),$async$NQ)
case 2:return A.f(null,w)}})
return A.h($async$NQ,w)},
bh(d){var x=0,w=A.i(y.H),v=this
var $async$bh=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.f(null,w)}})
return A.h($async$bh,w)}}
B.L3.prototype={
wq(d,e){return this.am7(0,e)},
am7(d,e){var x=0,w=A.i(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$wq=A.d(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.bWS())if(y.f.b(e.h(0,"video"))&&J.n(e.h(0,"video"),"facingMode")!=null)J.hi(e.h(0,"video"),"facingMode")
e.ce(0,"video",new B.aB7())
e.ce(0,"audio",new B.aB8())}catch(a0){A.oJ("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.pF(e.h(0,"audio"),i,i).aC(0,"optional")&&y.F.b(J.n(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.n(e.h(0,"audio"),"optional")
r=A.C(y.N,y.z)
J.fE(s,new B.aB9(r))
J.hi(e.h(0,"audio"),"optional")
J.m0(e.h(0,"audio"),r)}}catch(a0){q=A.ad(a0)
p=A.aY(a0)
A.oJ("[getUserMedia] failed to translate optional audio constraints, "+A.A(q)+", "+A.A(p))}i=self
o=i.window.navigator.mediaDevices
h=y.m
x=o.getUserMedia!=null?7:9
break
case 7:n=A.bf(e)
x=10
return A.c(A.dc(o.getUserMedia(h.a(n)),h),$async$wq)
case 10:m=a2
v=new B.mA(m,"local")
x=1
break
x=8
break
case 9:i=i.window.navigator.mediaDevices
g=e.h(0,"audio")
x=11
return A.c(A.dc(i.getUserMedia({video:e.h(0,"video"),audio:g}),h),$async$wq)
case 11:l=a2
v=new B.mA(l,"local")
x=1
break
case 8:u=2
x=6
break
case 4:u=3
f=t
k=A.ad(f)
i=J.x(k)
throw A.j("Unable to getUserMedia: "+i)
x=6
break
case 3:x=2
break
case 6:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$wq,w)},
AY(d){return this.alB(d)},
alB(d){var x=0,w=A.i(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j
var $async$AY=A.d(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:u=4
n=self
s=n.window.navigator.mediaDevices
x=s.getDisplayMedia!=null?7:9
break
case 7:r=A.bf(d)
n=y.m
x=10
return A.c(A.dc(s.getDisplayMedia(n.a(r)),n),$async$AY)
case 10:q=f
v=new B.mA(q,"local")
x=1
break
x=8
break
case 9:n=n.window.navigator.mediaDevices
m=y.N
m=A.bf(A.Y(["mediaSource","screen"],m,m))
m.toString
l=d.h(0,"audio")
if(l==null)l=!1
x=11
return A.c(A.dc(n.getUserMedia({video:m,audio:l}),y.m),$async$AY)
case 11:p=f
v=new B.mA(p,"local")
x=1
break
case 8:u=2
x=6
break
case 4:u=3
j=t
o=A.ad(j)
n=J.x(o)
throw A.j("Unable to getDisplayMedia: "+n)
x=6
break
case 3:x=2
break
case 6:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$AY,w)}}
B.a3n.prototype={
atK(d,e){var x=this,w=x.at
w===$&&A.b()
w.addEventListener("datachannel",A.bs(new B.aFp(x)))
w.addEventListener("icecandidate",A.bs(new B.aFq(x)))
w.addEventListener("iceconnectionstatechange",A.bs(new B.aFr(x)))
w.onicegatheringstatechange=A.bs(new B.aFs(x))
w.addEventListener("signalingstatechange",A.bs(new B.aFt(x)))
if(!$.brK())w.addEventListener("connectionstatechange",A.bs(new B.aFu(x)))
w.addEventListener("negotiationneeded",A.bs(new B.aFv(x)))
w.addEventListener("track",A.bs(new B.aFw(x)))},
OE(d){var x=0,w=A.i(y.v),v,u=this,t,s
var $async$OE=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.b()
x=3
return A.c(A.dc(s.createOffer(y.m.a(A.bf(A.C(y.N,y.z)))),y.A),$async$OE)
case 3:t=f
v=new B.yh(t.sdp,t.type)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$OE,w)},
OB(d){var x=0,w=A.i(y.v),v,u=this,t,s
var $async$OB=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.b()
x=3
return A.c(A.dc(s.createAnswer(y.m.a(A.bf(A.C(y.N,y.z)))),y.A),$async$OB)
case 3:t=f
v=new B.yh(t.sdp,t.type)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$OB,w)},
Bl(d,e){return this.an3(0,e)},
an3(d,e){var x=0,w=A.i(y.H),v=this,u
var $async$Bl=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.b()
x=2
return A.c(A.dc(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$Bl)
case 2:return A.f(null,w)}})
return A.h($async$Bl,w)},
Bo(d,e){return this.ank(0,e)},
ank(d,e){var x=0,w=A.i(y.H),v=this,u
var $async$Bo=A.d(function(f,g){if(f===1)return A.e(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.b()
x=2
return A.c(A.dc(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$Bo)
case 2:return A.f(null,w)}})
return A.h($async$Bo,w)},
Nu(d){return this.aTS(d)},
aTS(d){var x=0,w=A.i(y.H),v=this,u,t
var $async$Nu=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.b()
u=d.b
u.toString
x=2
return A.c(A.dc(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$Nu)
case 2:return A.f(null,w)}})
return A.h($async$Nu,w)},
J_(d){var x=0,w=A.i(y.J),v,u=this,t,s,r
var $async$J_=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:r=u.at
r===$&&A.b()
x=3
return A.c(A.dc(r.getStats(),y.m),$async$J_)
case 3:t=f
s=A.a([],y.o)
t.forEach.apply(t,[A.aj9(new B.aFx(s))])
v=s
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$J_,w)},
av(d){var x=0,w=A.i(y.H),v,u=this,t
var $async$av=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.b()
t.close()
v=A.cZ(null,y.H)
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$av,w)},
NC(d,e,f){return this.aU7(0,e,f)},
aU7(d,e,f){var x=0,w=A.i(y.e),v,u=this,t
var $async$NC=A.d(function(g,h){if(g===1)return A.e(h,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.b()
v=new B.a3p(t.addTrack(e.d,f.e))
x=1
break
case 1:return A.f(v,w)}})
return A.h($async$NC,w)}}
B.a3p.prototype={
RY(d){return this.b6z(d)},
b6z(d){var x=0,w=A.i(y.H),v=this,u,t,s,r
var $async$RY=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:try{u=d
s=u.d
v.a.replaceTrack(s)}catch(q){s=A.ad(q)
if(y.L.b(s)){t=s
throw A.j("Unable to RTCRtpSender::replaceTrack: "+J.x(t))}else throw q}return A.f(null,w)}})
return A.h($async$RY,w)},
Bn(d){return this.anb(d)},
anb(d){var x=0,w=A.i(y.y),v,u=2,t,s=this,r,q,p,o,n,m,l
var $async$Bn=A.d(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:u=4
p=s.a
r=p.getParameters()
o=d.d
n=A.a_(o).i("ao<1,az<o,@>>")
n=A.bf(A.J(new A.ao(o,new B.aFC(),n),!0,n.i("aI.E")))
o=n==null?A.bf([]):n
r.encodings=y.r.a(o)
x=7
return A.c(A.dc(p.setParameters(r),y.X),$async$Bn)
case 7:x=8
return A.c(A.cZ(!0,y.y),$async$Bn)
case 8:p=f
v=p
x=1
break
u=2
x=6
break
case 4:u=3
l=t
p=A.ad(l)
if(y.L.b(p)){q=p
throw A.j("Unable to RTCRtpSender::setParameters: "+J.x(q))}else throw l
x=6
break
case 3:x=2
break
case 6:case 1:return A.f(v,w)
case 2:return A.e(t,w)}})
return A.h($async$Bn,w)}}
B.bpe.prototype={
bh(d){var x=0,w=A.i(y.H),v=this,u,t,s
var $async$bh=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.ad(r)
if(y.L.b(s)){u=s
s=u
J.x(s)
throw A.j("Unable to RTCRtpTransceiver::stop: "+A.A(s))}else throw r}return A.f(null,w)}})
return A.h($async$bh,w)}}
B.MQ.prototype={
saiT(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.zG()
if(x!=null)x.style.objectFit=e},
adm(){var x=this,w=x.zG(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sk(0,v.ag_(u,x.z!=null,0,t))},
swB(d,e){var x,w,v,u,t=this
if(e==null){x=t.zG()
if(x!=null)x.srcObject=null
x=t.w
if(x!=null)x.srcObject=null
t.z=null
return}t.z=e
if(e.oX(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.a9(y.l.b(x)?x:new A.dB(x,A.a_(x).i("dB<1,ai>")))
for(;x.v();){w=x.gH(x)
t.x.addTrack(w)}}if(e.IQ(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.a9(y.l.b(x)?x:new A.dB(x,A.a_(x).i("dB<1,ai>")))
for(;x.v();){w=x.gH(x)
t.y.addTrack(w)}}if(t.y!=null){if(t.w==null){v=self.document.createElement("audio")
v.id="audio_"+("RTCVideoRenderer-"+t.Q)
v.muted=e.b==="local"
v.autoplay=!0
t.w=v
x=t.aAQ()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.zG()
if(u!=null){u.srcObject=t.x
x=t.zG()
x.toString
t.a4O(x)}t.sk(0,t.a.aWJ(t.z!=null))},
aAQ(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
if(v!=null)return v
x=w.document.createElement("div")
x.id="html_webrtc_audio_manager_list"
x.style.display="none"
w=w.document.body
if(w!=null)w.append(x)
return x},
zG(){var x=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(x!=null)return x
return null},
m(){var x=0,w=A.i(y.H),v,u=this,t,s,r,q,p
var $async$m=A.d(function(d,e){if(d===1)return A.e(e,w)
while(true)switch(x){case 0:u.z=null
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.G)(t),++r)t[r].a8(0)
q=u.zG()
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
return A.h($async$m,w)},
it(d){var x=0,w=A.i(y.H),v=this
var $async$it=A.d(function(e,f){if(e===1)return A.e(f,w)
while(true)switch(x){case 0:$.WT()
$.rb().w5("RTCVideoRenderer-"+v.Q,new B.aFI(v),!0)
return A.f(null,w)}})
return A.h($async$it,w)},
a4O(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.MS.prototype={
P(){return new B.MT()}}
B.MT.prototype={
V(){var x,w,v=this
v.a9()
v.a.c.a5(0,v.gaJO())
x=v.a
w=x.c
w.as=x.e
w.saiT(0,x.d===D.qq?"contain":"cover")},
aJP(){if(this.c!=null)this.q(new B.aFJ())},
m(){if(this.c!=null)this.am()},
aS(d){var x,w
this.b9(d)
A.cS(A.cA(0,0,10,0),new B.aFL(this))
x=this.a
w=x.c
w.saiT(0,x.d===D.qq?"contain":"cover")},
A(d){return new A.pD(new B.aFK(this),null)}}
B.a_M.prototype={
atj(d,e,f,g){var x=this,w=$.au
x.a!==$&&A.ay()
x.a=new B.RG(d,x,new A.aR(new A.ak(w,y.c),y.u),e)
if(f.a.ghP())f.a=new B.Oe(g.i("@<0>").bH(g).i("Oe<1,2>")).jg(f.a)
w=A.i9(null,new B.auI(f,x),null,!0,g)
x.b!==$&&A.ay()
x.b=w},
aab(){var x,w
this.d=!0
x=this.c
if(x!=null)x.a8(0)
w=this.b
w===$&&A.b()
w.av(0)}}
B.RG.prototype={
E(d,e){if(this.e)throw A.j(A.a4("Cannot add event after closing."))
if(this.d)return
this.a.a.E(0,e)},
dn(d,e){if(this.e)throw A.j(A.a4("Cannot add event after closing."))
if(this.d)return
this.aD3(d,e)},
jP(d){return this.dn(d,null)},
aD3(d,e){var x=this
if(x.w){x.a.a.dn(d,e)
return}x.c.jk(d,e)
x.aac()
x.b.aab()
x.a.a.av(0).ho(new B.aWW())},
av(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.aab()
x.c.cJ(0,x.a.a.av(0))}return x.c.a},
aac(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.dc(0)
return},
$idI:1}
B.a5D.prototype={}
B.a5E.prototype={}
B.vH.prototype={
a5V(d,e){var x=this.b
if((x.b&4)!==0)return
x.E(0,new B.B_(d,e))
x.av(0)},
a2Q(d){var x
if((this.b.b&4)!==0)throw A.j(B.bpX())
x=A.bf(d)
x.toString
this.a.send(x)},
v4(d,e,f){return this.aW_(0,e,f)},
aW_(d,e,f){var x=0,w=A.i(y.H),v=this,u
var $async$v4=A.d(function(g,h){if(g===1)return A.e(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.j(B.bpX())
u.av(0)
v.a.close()
return A.f(null,w)}})
return A.h($async$v4,w)},
$ibpW:1}
B.qz.prototype={}
B.Ev.prototype={
l(d,e){if(e==null)return!1
return e instanceof B.Ev&&e.a===this.a},
gC(d){return C.e.gC(this.a)}}
B.AE.prototype={
l(d,e){var x,w,v,u
if(e==null)return!1
if(e instanceof B.AE&&e.a.length===this.a.length){for(x=this.a,w=x.length,v=e.a,u=0;u<w;++u)if(v[u]!==x[u])return!1
return!0}return!1},
gC(d){return A.fO(this.a)},
j(d){return"BinaryDataReceived("+A.A(this.a)+")"}}
B.B_.prototype={
l(d,e){if(e==null)return!1
return e instanceof B.B_&&e.a===this.a&&e.b===this.b},
gC(d){return A.fO([this.a,this.b])},
j(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.F0.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketException"
else return"WebSocketException: "+x},
$ibl:1}
B.F_.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+x}}
B.ako.prototype={
gj8(){var x,w=this,v=w.w
if(v===$){x=w.r.b
x===$&&A.b()
x=x.a
x===$&&A.b()
v!==$&&A.aE()
v=w.w=new B.ahC(w,x)}return v},
at4(d){d.hT(0,new B.aks(this),new B.akt(this),y.a)}}
B.ahC.prototype={
av(d){var x=this.b
x.e=x.d=null
return this.aoP(0)}}
B.a6R.prototype={
j(d){return"WebSocketChannelException: "+this.a},
$ibl:1}
B.u0.prototype={
I(){return"RTCSignalingState."+this.b}}
B.MM.prototype={
I(){return"RTCIceGatheringState."+this.b}}
B.tZ.prototype={
I(){return"RTCPeerConnectionState."+this.b}}
B.lu.prototype={
I(){return"RTCIceConnectionState."+this.b}}
B.a3q.prototype={
I(){return"RTCVideoViewObjectFit."+this.b}}
B.u_.prototype={
I(){return"RTCPriorityType."+this.b}}
B.aFm.prototype={}
B.L4.prototype={}
B.CM.prototype={
j(d){var x=this.d
return"Track(id: "+A.A(x.id)+", kind: "+A.A(x.kind)+", label: "+A.A(x.label)+", enabled: "+A.A(x.enabled)+", muted: "+A.A(x.muted)+")"}}
B.aB5.prototype={}
B.Dt.prototype={}
B.MN.prototype={}
B.bpd.prototype={}
B.a3o.prototype={}
B.Du.prototype={}
B.Ds.prototype={}
B.aFy.prototype={}
B.MO.prototype={}
B.aFD.prototype={}
B.yh.prototype={}
B.OC.prototype={}
B.MP.prototype={}
B.MR.prototype={
ag_(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.MR(x,w,v)},
aWJ(d){return this.ag_(null,d,null,null)},
j(d){var x=this
return A.P(x).j(0)+"(width: "+A.A(x.a)+", height: "+A.A(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["al<~>()","~()","~(Ea)","b7(Dt)","b7(MP)","b7(lu)","~(@)","mA(@)","Ds(ai)","az<o,@>(Du)","b7(bpW)","~(qz)"])
B.aKW.prototype={
$0(){return J.bGi(this.a.b5())},
$S:2}
B.aKX.prototype={
$1(d){var x,w,v,u
try{this.b.E(0,this.a.$ti.y[1].a(d))}catch(v){u=A.ad(v)
if(y.i.b(u)){x=u
w=A.aY(v)
this.b.dn(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.bkw.prototype={
$1(d){var x,w,v,u=$.bg().b
if(u==null||u.length===0)return
x=self
w=new x.Headers()
w.set("Authorization","Bearer "+A.A(u))
w.set("Content-Type","application/json")
v=y.N
x.window.fetch("https://connexion-prophetique.onrender.com/messagerie/appels/"+this.a+"/signaux",{method:"POST",headers:w,body:C.a9.hu(A.Y(["type","termine","contenu",A.C(v,y.z)],v,y.K),null),keepalive:!0})},
$S:30}
B.bkv.prototype={
$0(){return self.window.removeEventListener("beforeunload",this.a)},
$S:0}
B.alo.prototype={
$1(d){if(d==null)return null
return A.cm(J.x(d))},
$S:129}
B.aUN.prototype={
$0(){var x=this.a
if(x.c!=null)x.q(new B.aUM())},
$S:0}
B.aUM.prototype={
$0(){},
$S:0}
B.aUz.prototype={
$1(d){this.a.u9("candidat_ice",d,!1)},
$S:159}
B.aUA.prototype={
$0(){var x=this.a
if(x.c!=null)x.q(new B.aUy(x))},
$S:0}
B.aUy.prototype={
$0(){return this.a.go=!0},
$S:0}
B.aUB.prototype={
$0(){this.a.kC(A.t("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.aUC.prototype={
$0(){},
$S:0}
B.aUD.prototype={
$1(d){var x=this.a,w=x.ch
if(x.c!=null&&w!=null&&x.x)x.q(new B.aUx(x,w))},
$S:45}
B.aUx.prototype={
$0(){return this.a.CW=new A.aS(Date.now(),0,!1).fa(this.b)},
$S:0}
B.aUE.prototype={
$1(d){},
$S:176}
B.aUF.prototype={
$1(d){this.a.ud()},
$S:45}
B.aUc.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.x&&!x.y){if(x.a.f)x.u9("annule",C.ba,!1)
x.kC(A.t("Pas de r\xe9ponse"))}},
$S:0}
B.aUf.prototype={
$0(){var x=this.a
x.fy=x.a.d==="video"||x.at?A.t("Micro ou cam\xe9ra refus\xe9 : autorise le micro et la cam\xe9ra dans les r\xe9glages pour appeler en vid\xe9o."):A.t("Micro refus\xe9 : autorise le micro dans les r\xe9glages pour appeler.")},
$S:0}
B.aUg.prototype={
$1(d){this.a.u9("candidat_ice",d,!1)},
$S:159}
B.aUh.prototype={
$0(){var x=this.a
if(x.c!=null)x.q(new B.aUe(x))},
$S:0}
B.aUe.prototype={
$0(){return this.a.go=!0},
$S:0}
B.aUi.prototype={
$0(){this.a.kC(A.t("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.aUj.prototype={
$0(){return this.a.z=!0},
$S:0}
B.aUk.prototype={
$1(d){var x=this.a,w=x.ch
if(x.c!=null&&w!=null&&x.x)x.q(new B.aUd(x,w))},
$S:45}
B.aUd.prototype={
$0(){return this.a.CW=new A.aS(Date.now(),0,!1).fa(this.b)},
$S:0}
B.aUl.prototype={
$1(d){},
$S:176}
B.aUm.prototype={
$1(d){this.a.ud()},
$S:45}
B.aUH.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.Mi()},
$S:32}
B.aUI.prototype={
$1(d){this.a.kC(A.t("L\u2019appel n\u2019a pas pu aboutir."))},
$S:23}
B.aUJ.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.V7("offre",d)},
$S:871}
B.aUK.prototype={
$1(d){this.a.kC(A.t("L\u2019appel n\u2019a pas pu aboutir."))},
$S:23}
B.aUw.prototype={
$0(){return this.a.at=!0},
$S:0}
B.aUt.prototype={
$0(){var x=this.a
x.x=!0
x.ch=new A.aS(Date.now(),0,!1)
x.CW=C.G},
$S:0}
B.aUu.prototype={
$0(){return this.a.id=!0},
$S:0}
B.aUv.prototype={
$1(d){var x=this.a.c
if(x!=null)A.af(x,!1).cH()},
$S:4}
B.aUG.prototype={
$1(d){return A.C(y.N,y.z)},
$S:175}
B.aU8.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.aU6.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.aU7.prototype={
$0(){return this.a.ay=this.b},
$S:0}
B.aUb.prototype={
$0(){return this.a.at=!0},
$S:0}
B.aU5.prototype={
$1(d){var x=null,w=A.m(A.t("Statistiques de l\u2019appel"),x,x,x,x,C.cU,x,x,x),v=this.a,u=A.hx(A.m(v,x,x,x,x,C.cU,x,x,x),x,C.y)
return A.dL(A.a([A.bB(!1,A.m(A.t("Fermer"),x,x,x,x,x,x,x,x),x,x,C.o,x,x,x,x,new B.aU3(d),x,x),A.bB(!1,A.m(A.t("Copier"),x,x,x,x,x,x,x,x),x,x,C.o,x,x,x,x,new B.aU4(v,d),x,x)],y.p),D.nJ,u,x,w)},
$S:25}
B.aU3.prototype={
$0(){return A.af(this.a,!1).cH()},
$S:0}
B.aU4.prototype={
$0(){var x,w,v=null
A.AZ(new A.rC(this.a))
x=this.b
A.af(x,!1).cH()
w=A.t("Statistiques copi\xe9es.")
x.L(y.q).f.ak(A.aT(v,v,v,v,v,C.l,v,A.m(w,v,v,v,v,v,v,v,v),v,C.w,v,v,v,v,v,v,v,v,v))},
$S:0}
B.aU9.prototype={
$0(){},
$S:0}
B.aUa.prototype={
$0(){},
$S:0}
B.aUo.prototype={
$0(){var x=this.a,w=x.c
w.toString
A.af(w,!1).cH()
x.C_()},
$S:0}
B.aUp.prototype={
$0(){var x=this.a,w=x.c
w.toString
A.af(w,!1).cH()
x.C1()},
$S:0}
B.aUq.prototype={
$0(){var x=this.a,w=x.c
w.toString
A.af(w,!1).cH()
x.BN()},
$S:0}
B.aUr.prototype={
$0(){var x=this.a,w=x.c
w.toString
A.af(w,!1).QF().bf(0,new B.aUn(x),y.H)},
$S:0}
B.aUn.prototype={
$1(d){return this.a.aba()},
$S:11}
B.aUs.prototype={
$1(d){return A.fb(!0,A.a7(this.a,C.m,C.i,C.I),C.Z,!0)},
$S:221}
B.aUL.prototype={
$2(d,e){if(!d)this.a.DF()},
$S:186}
B.bap.prototype={
$2(d,e){var x,w,v,u=null,t=this.a,s=t.d
s===$&&A.b()
s=s.x
s===$&&A.b()
t=t.a.e
x=t?0.07:0.04
t=t?0.55:0.35
w=this.b
v=w+20
s=A.byo(A.aa(u,u,C.h,u,u,new A.an(u,u,A.cU(C.t.cb(t*(1-s)),3),u,u,u,C.bd),u,v,u,u,u,u,u,v),1+x*s)
w+=8
w=A.aa(u,u,C.h,u,u,new A.an(u,u,A.cU(C.t,2),u,u,u,C.bd),u,w,u,u,u,u,u,w)
e.toString
return A.eR(C.O,A.a([s,w,e],y.p),C.l,C.b1,u)},
$S:872}
B.bkS.prototype={
$3(d,e,f){if(e==null)return d+" : inconnu"
if(typeof e=="number")return d+" : "+C.d.aF(e,1)+f
return d+" : "+A.A(e)+f},
$2(d,e){return this.$3(d,e,"")},
$S:873}
B.aJX.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.Y(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+3}
B.aJY.prototype={
$1(d){var x=d.b,w=x.length!==0?C.c.gR(x):null
if(w!=null)this.a.azo(w)
if(d.c.d.kind==="video"){x=this.a.r
if(x!=null)x.$0()}},
$S:z+4}
B.aJZ.prototype={
$1(d){var x
if(d===D.J7){x=this.a.w
if(x!=null)x.$0()}},
$S:z+5}
B.aJW.prototype={
$0(){var x=this.a
if(x.ay){x.yC()
x=x.ch
if(x!=null)x.$0()}},
$S:26}
B.aoa.prototype={
$1(d){return this.a.WI()},
$S:15}
B.aob.prototype={
$0(){var x=this.a
if(!x.e)x.BW()},
$S:0}
B.bli.prototype={
$1(d){return d.length!==0},
$S:10}
B.aBh.prototype={
$1(d){return this.a.push(B.boD(d))},
$S:15}
B.aBi.prototype={
$1(d){return this.a.push(B.boD(d))},
$S:15}
B.aBe.prototype={
$1(d){var x=this.a.c
if(x!=null)x.$0()},
$S:17}
B.aBf.prototype={
$1(d){},
$S:17}
B.aBg.prototype={
$1(d){},
$S:17}
B.aB7.prototype={
$0(){return!1},
$S:42}
B.aB8.prototype={
$0(){return!1},
$S:42}
B.aB9.prototype={
$1(d){J.fE(d,new B.aB6(this.a))},
$S:159}
B.aB6.prototype={
$2(d,e){this.a.n(0,d,e)},
$S:46}
B.aFp.prototype={
$1(d){},
$S:17}
B.aFq.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.Dt(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:17}
B.aFr.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.b()
v=B.bWu(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.brK())switch(w.cx.a){case 0:w.cy=D.Jc
break
case 1:w.cy=D.Jd
break
case 3:w.cy=D.Je
break
case 5:w.cy=D.Ja
break
case 6:w.cy=D.Jb
break
case 7:w.cy=D.qo
break
default:break}},
$S:44}
B.aFs.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.b()
x.CW=B.bWv(w.iceGatheringState)},
$S:44}
B.aFt.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.b()
x.ch=B.bXO(w.signalingState)},
$S:44}
B.aFu.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.b()
x.cy=B.bXv(w.connectionState)},
$S:44}
B.aFv.prototype={
$1(d){},
$S:44}
B.aFw.prototype={
$1(d){var x,w,v=this.a,u=v.Q
if(u!=null){x=B.boD(d.track)
w=d.streams
w=y.l.b(w)?w:new A.dB(w,A.a_(w).i("dB<1,ai>"))
v=J.ez(w,new B.aFo(v),y.h)
u.$1(new B.MP(A.J(v,!0,v.$ti.i("aI.E")),x))}},
$S:17}
B.aFo.prototype={
$1(d){return new B.mA(d,this.a.as)},
$S:z+7}
B.aFx.prototype={
$2(d,e){var x,w,v=y.M.a(A.A8(d)),u=A.C(y.N,y.z)
for(x=v.gef(v),x=x.gY(x);x.v();){w=x.gH(x)
u.n(0,J.x(w.a),w.b)}this.a.push(new B.OC(d.type,u))},
$S:874}
B.aFB.prototype={
$1(d){var x="id",w=y.f.a(A.A8(d)),v=J.cL(w)
if(v.aC(w,x))v.n(w,x,C.d.t(A.iM(v.h(w,x))))
v.h(w,"uri")
v.h(w,x)
v.h(w,"encrypted")
return new B.Ds()},
$S:z+8}
B.aFA.prototype={
$1(d){var x,w,v,u,t,s,r,q,p,o=null,n="numTemporalLayers",m="scaleResolutionDownBy",l=A.A8(d.rid),k=d.active,j=d.maxBitrate
j=j==null?o:A.aW(j)
x=d.maxFramerate
x=x==null?o:A.aW(x)
w=d.minBitrate
w=w==null?o:A.aW(w)
v=d.numTemporalLayers
v=v==null?o:A.aW(v)
u=d.scaleResolutionDownBy
if(u==null)u=o
t=d.ssrc
t=t==null?o:A.aW(t)
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
k=B.bCt(p.h(0,"priority"))
l=k==null?D.qp:k
this.a.push(new B.Du(q,r,s,u,t,v,w,x,j,l,B.bCt(p.h(0,"networkPriority"))))},
$S:15}
B.aFz.prototype={
$1(d){var x,w,v,u,t,s=null,r=d.payloadType,q=d.name
if(q==null)q=s
x=d.kind
if(x==null)x=s
w=d.clockRate
v=d.numChannels
v=v==null?s:A.aW(v)
u=d.parameters
u=u==null?s:A.A8(u)
t=y.z
t=A.Y(["payloadType",r,"name",q,"kind",x,"clockRate",w,"numChannels",v,"parameters",u],t,t)
t.h(0,"payloadType")
t.h(0,"name")
t.h(0,"kind")
t.h(0,"clockRate")
t.h(0,"numChannels")
t.h(0,"parameters")
this.a.push(new B.a3o())},
$S:15}
B.aFC.prototype={
$1(d){var x,w,v=A.C(y.N,y.z)
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
x=$.bG7()
v.n(0,"priority",x.h(0,d.y))
w=d.z
if(w!=null)v.n(0,"networkPriority",x.h(0,w))
return v},
$S:z+9}
B.blq.prototype={
$1(d){return J.kd(self.window.navigator.userAgent,A.c_(d,!1,!1))},
$S:10}
B.aFI.prototype={
$1(d){var x,w,v,u,t
for(x=this.a,w=x.at,v=w.length,u=0;u<w.length;w.length===v||(0,A.G)(w),++u)w[u].a8(0)
C.c.ab(w)
t=self.document.createElement("video")
t.autoplay=!0
t.muted=!0
t.controls=!1
t.srcObject=x.x
t.id="video_"+("RTCVideoRenderer-"+x.Q)
t.setAttribute("playsinline","true")
x.a4O(t)
v=y.bU.c
w.push(A.fC(t,"canplay",new B.aFE(x),!1,v))
w.push(A.fC(t,"resize",new B.aFF(x),!1,v))
w.push(A.fC(t,"error",new B.aFG(t),!1,v))
w.push(A.fC(t,"ended",new B.aFH(),!1,v))
return t},
$S:127}
B.aFE.prototype={
$1(d){this.a.adm()},
$S:15}
B.aFF.prototype={
$1(d){this.a.adm()},
$S:15}
B.aFG.prototype={
$1(d){var x,w,v=this.a.error
A.oJ("RTCVideoRenderer: videoElement.onError, "+J.x(v))
v.toString
x=C.EF.h(0,A.a0(v,"code"))
x.toString
w=!J.l(A.a0(v,"message"),"")?A.a0(v,"message"):"No further diagnostic information can be determined or provided."
throw A.j(A.mJ(x,C.EE.h(0,A.a0(v,"code")),w,null))},
$S:30}
B.aFH.prototype={
$1(d){},
$S:15}
B.aFJ.prototype={
$0(){},
$S:0}
B.aFL.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aFK.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.boh("RTCVideoRenderer-"+w.Q)
else w=A.aa(x,x,C.h,x,x,x,x,x,x,x,x,x,x,x)
return A.cV(A.aa(x,w,C.h,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:875}
B.auI.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.b()
v.c=x.hg(w.gkE(w),new B.auH(v),w.gpx())},
$S:0}
B.auH.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.b()
w.aac()
x=x.b
x===$&&A.b()
x.av(0)},
$S:0}
B.aWW.prototype={
$1(d){},
$S:23}
B.an9.prototype={
$1(d){this.a.cJ(0,this.b)},
$S:17}
B.ana.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.hq(new B.F0("Failed to connect WebSocket"))
else this.b.a5V(1006,"error")},
$S:17}
B.anb.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.c1("data")
if(typeof x==="string")w.b=new B.Ev(A.bj(x))
else if(typeof x==="object"&&A.bL6(y.m.a(x),"ArrayBuffer"))w.b=new B.AE(A.Lo(y.R.a(x),0,null))
else throw A.j(A.a4("unexpected message type: "+J.am(x).j(0)))
v.E(0,w.b5())},
$S:30}
B.anc.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.cJ(0,this.b)
this.b.a5V(d.code,d.reason)},
$S:17}
B.aks.prototype={
$1(d){var x=d.b,w=this.a
new A.cK(x,A.u(x).i("cK<1>")).dG(new B.akp(w))
x=w.r.a
x===$&&A.b()
x=x.b
x===$&&A.b()
new A.cK(x,A.u(x).i("cK<1>")).b2y(new B.akq(d),new B.akr(w,d))
w.f.dc(0)},
$S:z+10}
B.akp.prototype={
$1(d){var x,w,v
$label0$0:{x=d instanceof B.Ev
w=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.b()
x=x.a
x===$&&A.b()
x.E(0,w)
break $label0$0}x=d instanceof B.AE
v=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.b()
x=x.a
x===$&&A.b()
x.E(0,v)
break $label0$0}if(d instanceof B.B_){x=this.a.r.a
x===$&&A.b()
x=x.a
x===$&&A.b()
x.av(0)}}},
$S:z+11}
B.akq.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.ag(B.bpX())
s=A.bf(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.k.b(x)
if(t)v=x
if(t){this.a.a2Q(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.a2Q(new Uint8Array(A.bv(u)))
break $label1$1}t=A.aM("Cannot send "+J.am(d).j(0))
throw A.j(t)}}catch(r){if(!(A.ad(r) instanceof B.F_))throw r}},
$S:13}
B.akr.prototype={
$0(){var x=0,w=A.i(y.H),v=1,u,t=this,s,r,q
var $async$$0=A.d(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
x=6
return A.c(t.b.v4(0,s.d,s.e),$async$$0)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(!(A.ad(q) instanceof B.F_))throw q
x=5
break
case 2:x=1
break
case 5:return A.f(null,w)
case 1:return A.e(u,w)}})
return A.h($async$$0,w)},
$S:2}
B.akt.prototype={
$1(d){var x,w=d instanceof A.Pf?d:new B.a6R(J.x(d)),v=this.a
v.f.hq(w)
v=v.r.a
v===$&&A.b()
x=v.a
x===$&&A.b()
x.jP(w)
v=v.a
v===$&&A.b()
v.av(0)},
$S:44};(function aliases(){var x=B.Bv.prototype
x.aoP=x.av
x=B.VX.prototype
x.asr=x.m})();(function installTearOffs(){var x=a._instance_1u,w=a._instance_0u
var v
x(v=B.R9.prototype,"gade","adf",2)
w(v,"gaaR","DF",0)
w(v,"gab9","aba",1)
w(v,"ga55","Ka",0)
w(v,"ga54","K9",0)
w(v,"ga52","K8",0)
w(v,"ga53","C_",0)
w(v,"ga56","Kb",0)
w(v,"gaai","aKv",1)
x(v=B.YD.prototype,"gaNB","aNC",6)
w(v,"gaMc","WI",1)
w(B.MQ.prototype,"gdL","m",0)
w(B.MT.prototype,"gaJO","aJP",1)})();(function inheritance(){var x=a.mixinHard,w=a.inheritMany,v=a.inherit
w(A.W,[B.Bv,B.alm,B.Ea,B.YU,B.aJV,B.YD,B.a1_,B.aFm,B.L4,B.CM,B.aB5,B.MN,B.MO,B.aFD,B.a5E,B.RG,B.a5D,B.vH,B.qz,B.F0,B.a6R,B.Dt,B.bpd,B.a3o,B.Du,B.Ds,B.aFy,B.yh,B.OC,B.MP,B.MR])
v(B.Oe,A.eY)
w(A.vR,[B.aKW,B.bkv,B.aUN,B.aUM,B.aUA,B.aUy,B.aUB,B.aUC,B.aUx,B.aUc,B.aUf,B.aUh,B.aUe,B.aUi,B.aUj,B.aUd,B.aUw,B.aUt,B.aUu,B.aU8,B.aU6,B.aU7,B.aUb,B.aU3,B.aU4,B.aU9,B.aUa,B.aUo,B.aUp,B.aUq,B.aUr,B.aJW,B.aob,B.aB7,B.aB8,B.aFJ,B.aFL,B.auI,B.auH,B.akr])
w(A.nx,[B.aKX,B.bkw,B.alo,B.aUz,B.aUD,B.aUE,B.aUF,B.aUg,B.aUk,B.aUl,B.aUm,B.aUH,B.aUI,B.aUJ,B.aUK,B.aUv,B.aUG,B.aU5,B.aUn,B.aUs,B.bkS,B.aJX,B.aJY,B.aJZ,B.aoa,B.bli,B.aBh,B.aBi,B.aBe,B.aBf,B.aBg,B.aB9,B.aFp,B.aFq,B.aFr,B.aFs,B.aFt,B.aFu,B.aFv,B.aFw,B.aFo,B.aFB,B.aFA,B.aFz,B.aFC,B.blq,B.aFI,B.aFE,B.aFF,B.aFG,B.aFH,B.aWW,B.an9,B.ana,B.anb,B.anc,B.aks,B.akp,B.akq,B.akt])
w(A.T,[B.rK,B.Gc,B.MS])
w(A.U,[B.R9,B.VX,B.MT])
w(A.It,[B.aUL,B.bap,B.aB6,B.aFx,B.aFK])
w(A.a2,[B.a8y,B.Qd,B.uJ])
v(B.acL,B.VX)
v(B.aFn,B.aFm)
v(B.mA,B.L4)
v(B.a1s,B.CM)
v(B.L3,B.aB5)
v(B.a3n,B.MN)
v(B.a3p,B.MO)
v(B.bpe,B.aFD)
v(B.MQ,A.d6)
w(B.a5E,[B.a_M,B.ako])
w(B.qz,[B.Ev,B.AE,B.B_])
v(B.F_,B.F0)
v(B.ahC,B.Bv)
w(A.aa4,[B.u0,B.MM,B.tZ,B.lu,B.a3q,B.u_])
x(B.VX,A.fz)})()
A.ahg(b.typeUniverse,JSON.parse('{"Bv":{"dI":["1"]},"Oe":{"eY":["1","2"],"eY.S":"1","eY.T":"2"},"Gc":{"T":[],"k":[]},"rK":{"T":[],"k":[]},"R9":{"U":["rK"]},"a8y":{"a2":[],"k":[]},"Qd":{"a2":[],"k":[]},"uJ":{"a2":[],"k":[]},"acL":{"U":["Gc"]},"mA":{"L4":[]},"a1s":{"CM":[]},"a3n":{"MN":[]},"a3p":{"MO":[]},"MQ":{"d6":["MR"],"aJ":[]},"MS":{"T":[],"k":[]},"MT":{"U":["MS"]},"RG":{"dI":["1"]},"vH":{"bpW":[]},"Ev":{"qz":[]},"AE":{"qz":[]},"B_":{"qz":[]},"F0":{"bl":[]},"F_":{"bl":[]},"ahC":{"dI":["@"]},"a6R":{"bl":[]}}'))
A.bzB(b.typeUniverse,JSON.parse('{"Bv":1,"RG":1,"a5E":1}'))
var y=(function rtii(){var x=A.as
return{b:x("vH"),L:x("bl"),_:x("al<@>"),x:x("al<~>"),T:x("B<az<o,H>>"),t:x("B<az<o,@>>"),Q:x("B<CM>"),B:x("B<a3o>"),O:x("B<Du>"),o:x("B<OC>"),d:x("B<ia<@>>"),s:x("B<o>"),p:x("B<k>"),r:x("B<W?>"),m:x("ai"),M:x("KR<W?,W?>"),l:x("E<ai>"),F:x("E<az<o,@>>"),J:x("E<OC>"),j:x("E<@>"),I:x("E<v>"),P:x("az<o,@>"),f:x("az<@,@>"),E:x("L4"),G:x("CM"),h:x("mA"),R:x("nX"),a:x("b7"),K:x("W"),W:x("Ds"),Y:x("MN"),e:x("MO"),v:x("yh"),Z:x("a5D<W?>"),N:x("o"),i:x("on"),k:x("f4"),D:x("qz"),U:x("ae<o>"),g:x("dr<Ea>"),n:x("dr<~>"),V:x("aR<vH>"),u:x("aR<@>"),w:x("aR<~>"),bU:x("Rg<ai>"),C:x("na<ai>"),cF:x("ak<vH>"),c:x("ak<@>"),d4:x("ak<~>"),q:x("zM"),y:x("H"),z:x("@"),S:x("v"),A:x("ai?"),cO:x("az<o,@>?"),X:x("W?"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.nJ=new A.M(1,0.10588235294117647,0.17254901960784313,0.25098039215686274,C.n)
D.SI=new B.YU(C.cN)
D.Vf=new A.a8(20,0,20,0)
D.op=new A.a8(32,0,32,0)
D.Vz=new A.a8(8,20,8,20)
D.VK=new A.ho(1,C.bZ,C.apc,null)
D.wF=new A.a3(57639,"MaterialIcons",null,!1)
D.WY=new A.a3(58337,"MaterialIcons",null,!1)
D.WZ=new A.a3(58341,"MaterialIcons",null,!1)
D.X4=new A.a3(58721,"MaterialIcons",null,!0)
D.X9=new A.a3(58888,"MaterialIcons",null,!1)
D.Xc=new A.a3(59048,"MaterialIcons",null,!1)
D.Xd=new A.a3(59049,"MaterialIcons",null,!1)
D.Z9=new A.aj(C.oR,null,C.f,null,null)
D.Z8=new A.aj(C.oR,28,C.f,null,null)
D.Xh=new A.a3(61044,"MaterialIcons",null,!1)
D.Zg=new A.aj(D.Xh,null,C.f,null,null)
D.wT=new A.a3(58923,"MaterialIcons",null,!1)
D.Zk=new A.aj(D.wT,null,C.f,null,null)
D.Zj=new A.aj(D.wT,20,C.f,null,null)
D.a7j=A.a(x([1,2,4,8,16]),A.as("B<v>"))
D.zj=A.a(x([]),y.Q)
D.ES=new A.f9("FlutterWebRTC.Method",C.aR,null)
D.alG=new B.lu(0,"RTCIceConnectionStateNew")
D.alH=new B.lu(1,"RTCIceConnectionStateChecking")
D.alI=new B.lu(2,"RTCIceConnectionStateCompleted")
D.alJ=new B.lu(3,"RTCIceConnectionStateConnected")
D.alK=new B.lu(4,"RTCIceConnectionStateCount")
D.J7=new B.lu(5,"RTCIceConnectionStateFailed")
D.alL=new B.lu(6,"RTCIceConnectionStateDisconnected")
D.J8=new B.lu(7,"RTCIceConnectionStateClosed")
D.J9=new B.MM(0,"RTCIceGatheringStateNew")
D.alM=new B.MM(1,"RTCIceGatheringStateGathering")
D.alN=new B.MM(2,"RTCIceGatheringStateComplete")
D.qo=new B.tZ(0,"RTCPeerConnectionStateClosed")
D.Ja=new B.tZ(1,"RTCPeerConnectionStateFailed")
D.Jb=new B.tZ(2,"RTCPeerConnectionStateDisconnected")
D.Jc=new B.tZ(3,"RTCPeerConnectionStateNew")
D.Jd=new B.tZ(4,"RTCPeerConnectionStateConnecting")
D.Je=new B.tZ(5,"RTCPeerConnectionStateConnected")
D.Jf=new B.u_(0,"veryLow")
D.qp=new B.u_(1,"low")
D.Jg=new B.u_(2,"medium")
D.Jh=new B.u_(3,"high")
D.alO=new B.u0(0,"RTCSignalingStateStable")
D.alP=new B.u0(1,"RTCSignalingStateHaveLocalOffer")
D.alQ=new B.u0(2,"RTCSignalingStateHaveRemoteOffer")
D.alR=new B.u0(3,"RTCSignalingStateHaveLocalPrAnswer")
D.alS=new B.u0(4,"RTCSignalingStateHaveRemotePrAnswer")
D.Ji=new B.u0(5,"RTCSignalingStateClosed")
D.alT=new B.MR(0,0,0)
D.qq=new B.a3q(0,"RTCVideoViewObjectFitContain")
D.Jj=new B.a3q(1,"RTCVideoViewObjectFitCover")
D.rp=new A.z(!0,C.ah,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.at6=new A.z(!0,C.f,null,null,null,null,13,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.bqJ=null
$.byQ=!1
$.bxf=1
$.bY9=A.Y(["very-low",D.Jf,"low",D.qp,"medium",D.Jg,"high",D.Jh],y.N,A.as("u_"))})();(function lazyInitializers(){var x=a.lazyFinal
x($,"c0I","ajQ",()=>new B.aFn())
x($,"bZQ","brK",()=>C.e.p(A.a0(A.a0(A.a0(A.brq(),"window"),"navigator"),"userAgent"),"Firefox"))
x($,"c5a","bG7",()=>A.Y([D.Jf,"very-low",D.qp,"low",D.Jg,"medium",D.Jh,"high"],A.as("u_"),y.N))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_1",e:"endPart",h:b})})($__dart_deferred_initializers__,"Cg2gWc4+HbnixCi7JRaAbko7DeU=");