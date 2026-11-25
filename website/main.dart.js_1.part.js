((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_1",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={I4:function I4(){},WB:function WB(d){this.$ti=d},b3J:function b3J(d){this.a=d},b3K:function b3K(d,e){this.a=d
this.b=e},
cvR(d){var w
B.c8Z()
if(d.length===0)return
w=A.c6(new B.caQ(d))
self.window.addEventListener("beforeunload",w)
$.ciC=new B.caP(w)},
c8Z(){var w=$.ciC
if(w!=null)w.$0()
$.ciC=null},
caQ:function caQ(d){this.a=d},
caP:function caP(d){this.a=d},
a7l(d){var w,v,u,t,s=new B.aA4(),r=J.Q(d),q=r.h(d,"id")
q=J.l(q==null?"":q)
w=r.h(d,"conversation_id")
J.l(w==null?"":w)
w=r.h(d,"appelant_id")
w=J.l(w==null?"":w)
v=r.h(d,"appelant_nom")
v=J.l(v==null?"":v)
A.ay(r.h(d,"appele_id"))
A.ay(r.h(d,"appele_nom"))
u=r.h(d,"type")
u=J.l(u==null?"audio":u)
t=r.h(d,"statut")
t=J.l(t==null?"sonne":t)
s.$1(r.h(d,"cree_le"))
s.$1(r.h(d,"repondu_le"))
return new B.aA3(q,w,v,u,t)},
cha(d){var w,v,u,t=J.Q(d),s=t.h(d,"contenu"),r=t.h(d,"id")
r=J.l(r==null?"":r)
w=t.h(d,"appel_id")
J.l(w==null?"":w)
w=t.h(d,"emetteur_id")
w=J.l(w==null?"":w)
v=t.h(d,"type")
v=J.l(v==null?"":v)
if(x.P.b(s))u=s
else u=x.f.b(s)?J.mz(s,x.N,x.z):C.bc
if(t.h(d,"cree_le")!=null)A.bS(J.l(t.h(d,"cree_le")))
return new B.Ln(r,w,v,u)},
cFj(d){var w,v,u,t,s,r,q=J.Q(d),p=q.h(d,"iceServers")
if(p==null)p=q.h(d,"ice_servers")
if(!x.j.b(p))return D.Zb
w=A.a([],x.t)
for(q=J.ap(p),v=x.f,u=x.P,t=x.N,s=x.z;q.B();){r=q.gJ(q)
if(u.b(r))w.push(r)
else if(v.b(r))w.push(J.mz(r,t,s))}return new B.a8Y(w)},
cwI(d){var w=J.Q(d),v=w.h(d,"sdp"),u=w.h(d,"type")
if(typeof v!="string"||v.length===0)return null
w=J.oL(u)
if(!w.p(u,"offer")&&!w.p(u,"answer"))return null
return new A.aqc(v,u)},
cVU(d){var w,v,u=J.Q(d),t=u.h(d,"candidate")
if(typeof t!="string")return null
w=u.h(d,"sdpMid")
v=u.h(d,"sdpMLineIndex")
u=typeof w=="string"?w:null
return new A.aqf(t,A.hs(v)?v:null,u)},
aA3:function aA3(d,e,f,g,h){var _=this
_.a=d
_.c=e
_.d=f
_.r=g
_.w=h},
aA4:function aA4(){},
Ln:function Ln(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a8Y:function a8Y(d){this.a=d},
awn(d){return B.cWT(d)},
cWT(d){var w=0,v=A.k(x.y),u
var $async$awn=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:u=!0
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$awn,v)},
cnO(d,e,f,g,h,i,j){return new B.qK(f,g,j,i,e,d,null)},
cfu(d,e,f,g,h,i,j,k,l,m){return new B.qJ(f,m,h,l,i,d,j,k,e,g,null)},
csB(d,e,f,g,h,i,j,k,l,m,n){return new B.ako(e,g,f,d,n,k,j,i,h,l,m,null)},
cuB(d,e){var w=null
return new A.W(D.rH,A.c(d.toUpperCase(),2,C.a4,w,w,A.be(w,w,C.m,w,w,w,w,w,"Cinzel",w,w,e,w,w,C.A,w,w,!0,w,1.2,w,w,w,w,w,w),C.V,w,w),w)},
qK:function qK(d,e,f,g,h,i,j){var _=this
_.c=d
_.d=e
_.e=f
_.r=g
_.w=h
_.y=i
_.a=j},
a_s:function a_s(){var _=this
_.d=!0
_.f=_.e=!1
_.x=_.w=_.r=null
_.y=$
_.Q=_.z=!1
_.c=_.a=null},
bvc:function bvc(d){this.a=d},
bvd:function bvd(d){this.a=d},
bv9:function bv9(d){this.a=d},
bva:function bva(d){this.a=d},
bv6:function bv6(d){this.a=d},
bv7:function bv7(d){this.a=d},
bv8:function bv8(d){this.a=d},
bv3:function bv3(d){this.a=d},
bv4:function bv4(d){this.a=d},
bv5:function bv5(d){this.a=d},
bvb:function bvb(d){this.a=d},
YT:function YT(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
qJ:function qJ(d,e,f,g,h,i,j,k,l,m,n){var _=this
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
a_r:function a_r(d,e){var _=this
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
bv2:function bv2(d){this.a=d},
bv1:function bv1(){},
buP:function buP(d){this.a=d},
buQ:function buQ(d){this.a=d},
buO:function buO(d){this.a=d},
buR:function buR(d){this.a=d},
buS:function buS(){},
buT:function buT(d){this.a=d},
buN:function buN(d,e){this.a=d
this.b=e},
buU:function buU(){},
buV:function buV(d){this.a=d},
bus:function bus(d){this.a=d},
buv:function buv(d){this.a=d},
buw:function buw(d){this.a=d},
bux:function bux(d){this.a=d},
buu:function buu(d){this.a=d},
buy:function buy(d){this.a=d},
buz:function buz(d){this.a=d},
buA:function buA(d){this.a=d},
but:function but(d,e){this.a=d
this.b=e},
buB:function buB(){},
buC:function buC(d){this.a=d},
buX:function buX(d){this.a=d},
buY:function buY(d){this.a=d},
buZ:function buZ(d){this.a=d},
bv_:function bv_(d){this.a=d},
buM:function buM(d){this.a=d},
buJ:function buJ(d,e){this.a=d
this.b=e},
buK:function buK(d){this.a=d},
buL:function buL(d){this.a=d},
buW:function buW(){},
buo:function buo(d,e){this.a=d
this.b=e},
bum:function bum(d,e){this.a=d
this.b=e},
bun:function bun(d,e){this.a=d
this.b=e},
bur:function bur(d){this.a=d},
bul:function bul(d){this.a=d},
buj:function buj(d){this.a=d},
buk:function buk(d,e){this.a=d
this.b=e},
bup:function bup(){},
buq:function buq(){},
buE:function buE(d){this.a=d},
buF:function buF(d){this.a=d},
buG:function buG(d){this.a=d},
buH:function buH(d){this.a=d},
buD:function buD(d){this.a=d},
buI:function buI(d){this.a=d},
bv0:function bv0(d){this.a=d},
ako:function ako(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
YU:function YU(d,e){this.c=d
this.a=e},
zT:function zT(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
NC:function NC(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
ap_:function ap_(d,e){var _=this
_.d=$
_.eJ$=d
_.bS$=e
_.c=_.a=null},
bRf:function bRf(d,e){this.a=d
this.b=e},
a5G:function a5G(){},
cZG(a4,a5){var w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0=null,a1="kind",a2="video",a3="packetsLost"
for(w=J.ap(a4),v=a0,u=v,t=u,s=t,r=s,q=r,p=q,o=p,n=o,m=n,l=m;w.B();){k=w.gJ(w)
j=k.d
k=k.b
if(k==="codec"){k=j.h(0,"mimeType")
i=J.l(k==null?"":k)
if(C.d.bQ(i,"video/"))l=C.d.cg(i,6)}else if(k==="outbound-rtp"&&J.r(j.h(0,a1),a2)){k=A.bh(j.h(0,"bytesSent"))
m=k==null?a0:C.e.C(k)
k=A.bh(j.h(0,"packetsSent"))
n=k==null?a0:C.e.C(k)
t=A.bh(j.h(0,"framesPerSecond"))
if(t==null)t=a0
k=A.bh(j.h(0,"frameWidth"))
u=k==null?a0:C.e.C(k)
k=A.bh(j.h(0,"frameHeight"))
v=k==null?a0:C.e.C(k)}else if(k==="remote-inbound-rtp"&&J.r(j.h(0,a1),a2)){k=A.bh(j.h(0,a3))
o=k==null?a0:C.e.C(k)
q=A.bh(j.h(0,"jitter"))
if(q==null)q=a0
h=A.bh(j.h(0,"roundTripTime"))
if(h==null)h=a0
if(h!=null)s=h*1000}else if(k==="inbound-rtp"&&J.r(j.h(0,a1),a2)){k=A.bh(j.h(0,a3))
p=k==null?a0:C.e.C(k)
r=A.bh(j.h(0,"jitter"))
if(r==null)r=a0}else if(k==="candidate-pair"&&J.r(j.h(0,"state"),"succeeded")){h=A.bh(j.h(0,"currentRoundTripTime"))
if(h==null)h=a0
if(s==null&&h!=null)s=h*1000}}w=a5==null
k=A.bh(w?a0:a5.h(0,"octetsEnvoyes"))
g=k==null?a0:C.e.C(k)
k=A.bh(w?a0:a5.h(0,"horodatageMs"))
f=k==null?a0:C.e.C(k)
w=Date.now()
if(m!=null&&g!=null&&f!=null){e=(w-f)/1000
d=e>0&&m>=g?(m-g)*8/e/1000:a0}else d=a0
k=q==null?a0:q*1000
return A.a2(["codecVideo",l,"octetsEnvoyes",m,"paquetsEnvoyes",n,"paquetsPerdusEnvoi",o,"paquetsPerdusReception",p,"gigueEnvoiMs",k,"gigueReceptionMs",r==null?a0:r*1000,"allerRetourMs",s,"debitSortantKbitS",d,"imagesParSeconde",t,"largeur",u,"hauteur",v,"horodatageMs",w],x.N,x.z)},
cvY(d){var w=new B.cb6(),v=J.Q(d),u=v.h(d,"largeur")!=null&&v.h(d,"hauteur")!=null?A.u(v.h(d,"largeur"))+"x"+A.u(v.h(d,"hauteur")):null
return C.b.az(A.a([w.$2("Codec vid\xe9o",v.h(d,"codecVideo")),w.$3("D\xe9bit sortant",v.h(d,"debitSortantKbitS")," kbit/s"),w.$2("Paquets envoy\xe9s",v.h(d,"paquetsEnvoyes")),w.$2("Paquets perdus (envoi)",v.h(d,"paquetsPerdusEnvoi")),w.$2("Paquets perdus (r\xe9ception)",v.h(d,"paquetsPerdusReception")),w.$3("Gigue (envoi)",v.h(d,"gigueEnvoiMs")," ms"),w.$3("Gigue (r\xe9ception)",v.h(d,"gigueReceptionMs")," ms"),w.$3("Aller-retour",v.h(d,"allerRetourMs")," ms"),w.$2("Images par seconde",v.h(d,"imagesParSeconde")),w.$2("R\xe9solution envoy\xe9e",u)],x.s),"\n")},
cb6:function cb6(){},
b36:function b36(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.y=_.x=!1
_.ax=_.at=_.as=_.Q=_.z=null
_.ay=!1
_.ch=null
_.CW=!1},
b38:function b38(d){this.a=d},
b39:function b39(d){this.a=d},
b3a:function b3a(d){this.a=d},
b37:function b37(d){this.a=d},
a8K:function a8K(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.y=_.x=null},
aDL:function aDL(d){this.a=d},
aDM:function aDM(d){this.a=d},
cbT(d){var w=x.U,v=A.G(new A.X(A.a(d.split(" "),x.s),new B.cbU(),w),!0,w.i("w.E"))
w=v.length
if(w===0)return"?"
if(w===1)return J.m(C.b.gU(v),0).toUpperCase()
return(J.m(C.b.gU(v),0)+J.m(C.b.gaY(v),0)).toUpperCase()},
cbU:function cbU(){},
acE:function acE(){this.a=null},
aYL:function aYL(){},
pi:function pi(d,e){this.e=d
this.b=e},
aTG:function aTG(d){this.a=d},
aTH:function aTH(d){this.a=d},
cgj(d){var w=new B.ad6(d)
w.aHC(d)
return w},
ad6:function ad6(d){this.d=d
this.c=null},
aTD:function aTD(d){this.a=d},
aTE:function aTE(d){this.a=d},
aTF:function aTF(d){this.a=d},
Tl:function Tl(){},
aTs:function aTs(){},
aTt:function aTt(){},
aTu:function aTu(d){this.a=d},
aTr:function aTr(d){this.a=d},
cLn(d,e){var w=x.N
w=new B.aeX(d,e,A.C(w,x.E),A.C(w,x.z))
w.aHM(d,e)
return w},
aeX:function aeX(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aYN:function aYN(d){this.a=d},
aYO:function aYO(d){this.a=d},
aYP:function aYP(d){this.a=d},
aYQ:function aYQ(d){this.a=d},
aYR:function aYR(d){this.a=d},
aYS:function aYS(d){this.a=d},
aYT:function aYT(d){this.a=d},
aYU:function aYU(d){this.a=d},
aYM:function aYM(d){this.a=d},
aYV:function aYV(d){this.a=d},
cLq(d){var w=d.headerExtensions
w=x.l.b(w)?w:new A.dB(w,A.Y(w).i("dB<1,aF>"))
w=J.dq(w,new B.aYZ(),x.W)
return A.G(w,!0,w.$ti.i("aD.E"))},
cLp(d){var w,v
if("encodings" in d)w=d.encodings
else w=[]
v=A.a([],x.O)
C.b.aG(w,new B.aYY(v))
return v},
cLo(d){var w,v
if("codecs" in d)w=d.codecs
else w=[]
v=A.a([],x.B)
C.b.aG(w,new B.aYX(v))
return v},
aYZ:function aYZ(){},
aYY:function aYY(d){this.a=d},
aYX:function aYX(d){this.a=d},
aeZ:function aeZ(d){this.a=d},
aZ_:function aZ_(){},
cgZ:function cgZ(d){this.a=d},
cYp(){return C.b.nT(A.a(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],x.s),new B.cc2())!==-1},
cc2:function cc2(){},
cqs(){var w=A.a([],x.d),v=$.cqt
$.cqt=v+1
return new B.UW(v,w,D.avo,$.ae())},
UW:function UW(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.db$=0
_.dx$=g
_.fr$=_.dy$=0},
aZ5:function aZ5(d){this.a=d},
aZ1:function aZ1(d){this.a=d},
aZ2:function aZ2(d){this.a=d},
aZ3:function aZ3(d){this.a=d},
aZ4:function aZ4(){},
ch_(d,e,f){return new B.UY(d,f,e,null)},
UY:function UY(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
UZ:function UZ(){this.c=this.a=null},
aZ6:function aZ6(){},
aZ8:function aZ8(d){this.a=d},
aZ7:function aZ7(d){this.a=d},
cor(d,e,f,g){var w,v={}
v.a=d
w=new B.abg(g.i("abg<0>"))
w.aHj(e,f,v,g)
return w},
abg:function abg(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
aMo:function aMo(d,e){this.a=d
this.b=e},
aMn:function aMn(d){this.a=d},
a0l:function a0l(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bAl:function bAl(){},
ahl:function ahl(d){this.b=this.a=$
this.$ti=d},
ahm:function ahm(){},
ceQ(d,e){return B.cEw(d,e)},
cEw(d,e){var w=0,v=A.k(x.b),u,t,s,r,q,p,o
var $async$ceQ=A.f(function(f,g){if(f===1)return A.h(g,v)
while(true)switch(w){case 0:if(!d.q4("ws")&&!d.q4("wss"))throw A.p(A.hg(d,"url","only ws: and wss: schemes are supported"))
t=self
s=t.WebSocket
r=d.l(0)
t=new t.Array()
q=new s(r,t)
q.binaryType="arraybuffer"
p=new B.Ba(q,A.hd(null,null,null,!1,x.D))
t=new A.aB($.aI,x.cF)
o=new A.bg(t,x.V)
if(J.r(q.readyState,1))o.cJ(0,p)
else if(J.r(q.readyState,2)||J.r(q.readyState,3))o.hQ(new B.Mn("Unexpected WebSocket state: "+A.u(q.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.q1(q,"open",!1,x.C).gU(0).aN(0,new B.aCi(o,p),x.H)
s=x.C
r=x.H
new A.q1(q,"error",!1,s).gU(0).aN(0,new B.aCj(o,p),r)
A.i1(q,"message",new B.aCk(p),!1,x.m)
new A.q1(q,"close",!1,s).gU(0).aN(0,new B.aCl(o,p),r)
u=t
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$ceQ,v)},
Ba:function Ba(d,e){this.a=d
this.b=e},
aCi:function aCi(d,e){this.a=d
this.b=e},
aCj:function aCj(d,e){this.a=d
this.b=e},
aCk:function aCk(d){this.a=d},
aCl:function aCl(d,e){this.a=d
this.b=e},
chE(){return new B.Mm("Connection Closed")},
v5:function v5(){},
LO:function LO(d){this.a=d},
H2:function H2(d){this.a=d},
Ht:function Ht(d,e){this.a=d
this.b=e},
Mn:function Mn(d){this.a=d},
Mm:function Mm(d){this.a=d},
cE2(d){var w=null,v=$.aI,u=new B.ahl(x.Z),t=x.X,s=A.hd(w,w,w,!0,t),r=A.hd(w,w,w,!0,t),q=A.x(r),p=A.x(s)
u.a=B.cor(new A.cZ(r,q.i("cZ<1>")),new A.Gb(s,p.i("Gb<1>")),!0,t)
u.b=B.cor(new A.cZ(s,p.i("cZ<1>")),new A.Gb(r,q.i("Gb<1>")),!1,t)
u=new B.axO(new A.bg(new A.aB(v,x.d4),x.w),u)
u.aH1(d)
return u},
axO:function axO(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
axS:function axS(d){this.a=d},
axP:function axP(d){this.a=d},
axQ:function axQ(d){this.a=d},
axR:function axR(d,e){this.a=d
this.b=e},
axT:function axT(d){this.a=d},
auf:function auf(d,e){this.b=d
this.a=e},
aiG:function aiG(d){this.a=d},
cXY(d){switch(d){case"new":return D.avb
case"checking":return D.avc
case"connected":return D.ave
case"completed":return D.avd
case"failed":return D.OC
case"disconnected":return D.avg
case"closed":return D.OD
case"count":return D.avf}return D.OD},
cXZ(d){switch(d){case"new":return D.OE
case"gathering":return D.avh
case"complete":return D.avi}return D.OE},
d_a(d){switch(d){case"stable":return D.avj
case"have-local-offer":return D.avk
case"have-local-pranswer":return D.avm
case"have-remote-offer":return D.avl
case"have-remote-pranswer":return D.avn
case"closed":return D.ON}return D.ON},
cZj(d){switch(d){case"new":return D.OH
case"connecting":return D.OI
case"connected":return D.OJ
case"closed":return D.v8
case"disconnected":return D.OG
case"failed":return D.OF}return D.v8},
cx1(d){if(d==null)return null
return $.d_D.h(0,d)},
yV:function yV(d,e){this.a=d
this.b=e},
US:function US(d,e){this.a=d
this.b=e},
yT:function yT(d,e){this.a=d
this.b=e},
oe:function oe(d,e){this.a=d
this.b=e},
af_:function af_(d,e){this.a=d
this.b=e},
yU:function yU(d,e){this.a=d
this.b=e},
aYK:function aYK(){},
Tm:function Tm(){},
JC:function JC(){},
aTq:function aTq(){},
Kt:function Kt(d,e,f){this.a=d
this.b=e
this.c=f},
UT:function UT(){},
cgY:function cgY(){},
aeY:function aeY(d){this.c=d},
Ku:function Ku(d,e,f,g,h,i,j,k,l,m,n){var _=this
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
Ks:function Ks(){},
aYW:function aYW(d){this.d=d},
UU:function UU(){},
aZ0:function aZ0(){},
Eg:function Eg(d,e){this.a=d
this.b=e},
X_:function X_(d,e){this.b=d
this.d=e},
UV:function UV(d,e){this.b=d
this.c=e},
UX:function UX(d,e,f){this.a=d
this.b=e
this.c=f},
cj1(){var w=0,v=A.k(x.H),u
var $async$cj1=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:w=1
break
case 1:return A.i(u,v)}})
return A.j($async$cj1,v)},
cfV(d){var w=0,v=A.k(x.y)
var $async$cfV=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:if(d.d.kind!=="video")throw A.p("The is not a video track => "+d.l(0))
throw A.p("You need to specify the deviceId")
return A.i(null,v)}})
return A.j($async$cfV,v)},
adr(d){var w=0,v=A.k(x.H),u
var $async$adr=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:u=x.z
w=2
return A.e(B.b8G("enableSpeakerphone",A.a2(["enable",d],x.N,u),u,u),$async$adr)
case 2:return A.i(null,v)}})
return A.j($async$adr,v)},
aVu(d,e){var w=0,v=A.k(x.H),u,t,s
var $async$aVu=A.f(function(f,g){if(f===1)return A.h(g,v)
while(true)switch(w){case 0:s=e.d
w=s.kind==="audio"?3:4
break
case 3:t=J.mz(x.f.a(A.Gw(s.getConstraints())),x.N,x.z)
t.j(0,"volume",d)
w=5
return A.e(e.Vy(0,t),$async$aVu)
case 5:case 4:u=A.d9(null,x.H)
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$aVu,v)},
b8G(d,e,f,g){return B.cP1(d,e,f,g,f.i("0?"))},
cP1(d,e,f,g,h){var w=0,v=A.k(h),u
var $async$b8G=A.f(function(i,j){if(i===1)return A.h(j,v)
while(true)switch(w){case 0:w=3
return A.e(B.b8F(),$async$b8G)
case 3:u=D.K3.cm(d,e,!1,f)
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$b8G,v)},
b8F(){var w=0,v=A.k(x.H),u,t
var $async$b8F=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:w=!$.csm?2:3
break
case 2:u=x.N
t=x.z
w=4
return A.e(D.K3.cm("initialize",A.a2(["options",A.C(u,t)],u,t),!1,x.H),$async$b8F)
case 4:$.csm=!0
case 3:return A.i(null,v)}})
return A.j($async$b8F,v)}},D
J=c[1]
A=c[0]
C=c[2]
B=a.updateHolder(c[3],B)
D=c[28]
B.I4.prototype={
E(d,e){this.a.E(0,e)},
dC(d,e){this.a.dC(d,e)},
aa(d){return this.a.aa(0)},
$ie6:1}
B.WB.prototype={
hO(d){var w=A.cF("subscription"),v=A.hd(new B.b3J(w),null,null,!0,this.$ti.y[1])
w.b=d.fM(new B.b3K(this,v),v.gnJ(v),v.gpF())
return new A.cZ(v,A.x(v).i("cZ<1>"))}}
B.aA3.prototype={}
B.Ln.prototype={}
B.a8Y.prototype={}
B.qK.prototype={
O(){return new B.a_s()}}
B.a_s.prototype={
S(){var w,v,u=this
u.W()
w=u.a
w.toString
u.z=!0
v=new B.acE()
u.y!==$&&A.aN()
u.y=v
if(!w.y)v.uh(A.Bo(C.le,$.vH().a).c)
u.Qn()
u.r=A.dl(C.c9,new B.bvc(u))
u.w=A.he(C.rv,new B.bvd(u))},
m(){var w=this,v=w.r
if(v!=null)v.X(0)
v=w.w
if(v!=null)v.X(0)
v=w.x
if(v!=null)v.X(0)
v=w.y
v===$&&A.d()
v.h9()
if(w.z)v.hc()
w.a2()},
a4F(){var w=this.x
if(w!=null)w.X(0)
this.x=A.dl(C.fb,new B.bv9(this))},
V1(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m,l
var $async$V1=A.f(function(d,e){if(d===1){s=e
w=t}while(true)switch(w){case 0:if(r.c==null||r.e||r.f){w=1
break}t=4
o=r.a
o.toString
n=$.K()
w=7
return A.e(n.EP(o.c),$async$V1)
case 7:q=e
p=B.a7l(q)
if(r.c==null||r.e){w=1
break}if(p.w!=="sonne"){r.k(new B.bva(r))
o=r.r
if(o!=null)o.X(0)
o=r.w
if(o!=null)o.X(0)
o=r.y
o===$&&A.d()
o.h9()
r.a4F()}t=2
w=6
break
case 4:t=3
l=s
w=6
break
case 3:w=2
break
case 6:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$V1,v)},
Qn(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m,l,k,j
var $async$Qn=A.f(function(d,e){if(d===1){s=e
w=t}while(true)switch(w){case 0:t=4
n=r.a
n.toString
m=$.K()
w=7
return A.e(m.EP(n.c),$async$Qn)
case 7:q=e
p=B.a7l(q)
if(r.c==null){w=1
break}l=r.a.r
if(l==null){n=$.K()
l=n.gx3()}o=l
if(p.w!=="sonne"||p.c===o){r.k(new B.bv6(r))
n=r.y
n===$&&A.d()
n.h9()
r.a4F()
w=1
break}r.k(new B.bv7(r))
if(r.a.y)r.BJ()
t=2
w=6
break
case 4:t=3
j=s
if(r.c==null){w=1
break}r.k(new B.bv8(r))
n=r.y
n===$&&A.d()
n.h9()
r.a4F()
w=6
break
case 3:w=2
break
case 6:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$Qn,v)},
BJ(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m
var $async$BJ=A.f(function(d,e){if(d===1){s=e
w=t}while(true)switch(w){case 0:if(r.f||r.e){w=1
break}w=3
return A.e(B.awn(r.a.e==="video"),$async$BJ)
case 3:if(!e){p=r.c
if(p==null){w=1
break}o=r.a.e==="video"?A.b(y.c):A.b(y.d)
p.q(x.q).f.v(A.z(null,null,null,null,null,C.h,null,A.c(o,null,null,null,null,null,null,null,null),null,C.l,null,null,null,null,null,null,null,null,null))
w=1
break}r.Q=!0
r.k(new B.bv3(r))
t=5
p=r.a
p.toString
o=$.K()
w=8
return A.e(o.Mf(p.c,"accepte"),$async$BJ)
case 8:t=2
w=7
break
case 5:t=4
m=s
q=A.M(m)
if(r.c==null){w=1
break}r.k(new B.bv4(r))
p=r.c
p.toString
o=J.l(q)
p.q(x.q).f.v(A.z(null,null,null,null,null,C.h,null,A.c(o,null,null,null,null,null,null,null,null),null,C.l,null,null,null,null,null,null,null,null,null))
w=1
break
w=7
break
case 4:w=2
break
case 7:if(r.c==null){w=1
break}p=r.r
if(p!=null)p.X(0)
p=r.w
if(p!=null)p.X(0)
p=r.y
p===$&&A.d()
p.h9()
p=r.c
p.toString
A.a1(p,!1).uw(A.e1(new B.bv5(r),null,x.z))
case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$BJ,v)},
K1(d){return this.b6A(d)},
b6z(){return this.K1(!1)},
b6A(d){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n
var $async$K1=A.f(function(e,f){if(e===1){s=f
w=t}while(true)switch(w){case 0:if(r.f){w=1
break}r.f=!0
q=r.r
if(q!=null)q.X(0)
q=r.w
if(q!=null)q.X(0)
q=r.y
q===$&&A.d()
q.h9()
t=4
q=r.a
q.toString
p=$.K()
w=7
return A.e(p.Mf(q.c,"refuse"),$async$K1)
case 7:t=2
w=6
break
case 4:t=3
n=s
w=6
break
case 3:w=2
break
case 6:q=r.c
if(q!=null)A.a1(q,!1).bH()
case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$K1,v)},
D(d){var w,v,u,t,s=this,r=null,q=s.a,p=q.e
q=A.jG(C.t,r,A.c(B.cbT(q.d),r,r,r,r,D.aCD,r,r,r),r,56)
w=s.a.d
w=A.c(w.length===0?A.b("Un membre"):w,r,r,r,r,D.aCp,C.V,r,r)
if(s.d)p=A.b("Connexion\u2026")
else if(s.e)p=A.b("Appel termin\xe9")
else p=p==="video"?A.b("Appel vid\xe9o entrant"):A.b("Appel entrant")
v=x.p
p=A.a([q,C.av,new A.W(D.rH,w,r),C.k,A.c(p,r,r,r,r,D.wp,r,r,r),D.azn],v)
if(!s.d&&!s.e){q=A.b("Refuser")
w=s.f?r:new B.bvb(s)
u=A.b("Accepter")
t=s.f?r:s.gaIv()
p.push(A.O(A.a([new B.YT(D.Bj,C.aH,q,w,r),D.aza,new B.YT(C.nD,C.d4,u,t,r)],v),C.n,C.by,C.i,r))}if(s.d)p.push(C.yN)
return A.dU(r,C.o,A.fs(!0,A.cu(A.I(p,C.n,C.f,C.O),r,r),!0,C.a_,!0,!0),r,r,r)}}
B.YT.prototype={
D(d){var w=this,v=null,u=A.di(w.d,v,v,C.a_,C.cy,v)
return A.I(A.a([A.ab(A.aR(!1,A.c1(w.c,C.m,v,32),C.j,v,C.p,v,v,v,v,w.f,v,u),72,72),C.k,A.c(w.e,v,v,v,v,C.cX,v,v,v)],x.p),C.n,C.f,C.O)}}
B.qJ.prototype={
O(){return new B.a_r(A.b7(x.N),C.R)}}
B.a_r.prototype={
S(){var w,v,u,t,s,r,q,p,o,n=this,m=null
n.W()
w=n.a
n.r=w.c
w=w.x
if(w==null)w=new B.b36(B.cqs(),B.cqs())
n.d!==$&&A.aN()
n.d=w
v=n.a
u=v.y
if(u==null)u=new B.a8K(new A.du(m,m,x.g),new A.du(m,m,x.n))
n.e!==$&&A.aN()
n.e=u
w.ch=new B.bv2(n)
n.fx=!0
t=new B.acE()
n.fr!==$&&A.aN()
n.fr=t
s=v.x
if(s!=null){r=$.ip()
q=r.a
p=q.length!==0&&r.as===s&&q===v.c&&r.w}else p=!1
s=$.ip()
r=n.r
q=v.e
o=v.d
s.bjh(r,q,w,u,v.f,o)
w=n.a
if(w.as)s.ax=!0
if(p){n.U3()
return}if(w.f)t.uh("assets/audio/tonalite-appel.wav")
n.t7()},
m(){var w=this,v=w.cx
if(v!=null)v.X(0)
v=w.cy
if(v!=null)v.X(0)
v=w.db
if(v!=null)v.X(0)
v=w.dx
if(v!=null)v.X(0)
v=w.dy
if(v!=null)v.X(0)
v=w.fr
v===$&&A.d()
v.h9()
if(w.fx)v.hc()
v=$.ip()
if(!(v.r&&v.a===w.r&&!w.y)){B.c8Z()
v=w.d
v===$&&A.d()
v.hc()
v=w.e
v===$&&A.d()
v.LU()}w.a2()},
U3(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m,l,k
var $async$U3=A.f(function(d,e){if(d===1){s=e
w=t}while(true)$async$outer:switch(w){case 0:r.a.toString
n=$.K()
r.w=n.gx3()
n=$.ip()
r.Q=n.x
r.as=n.y
r.ay=n.Q
r.x=n.e
n=n.f
r.ch=n
if(n!=null){n=Date.now()
m=r.ch
m.toString
r.CW=new A.au(n,0,!1).ev(m)}B.cvR(r.r)
t=4
r.a.toString
n=$.K()
w=7
return A.e(n.c2("/messagerie/appels/"+r.r+"/signaux"),$async$U3)
case 7:q=e
for(n=J.ap(q),m=r.f;n.B();){p=n.gJ(n)
o=B.cha(p)
m.E(0,o.a)
if(o.d==="termine"||o.d==="refuse"||o.d==="annule"){r.mG(A.b("Appel termin\xe9"))
w=1
break $async$outer}}t=2
w=6
break
case 4:t=3
k=s
w=6
break
case 3:w=2
break
case 6:n=r.c!=null
if(!n||r.y){w=1
break}m=r.d
m===$&&A.d()
m.f=new B.buP(r)
m.r=new B.buQ(r)
m.w=new B.buR(r)
r.z=!0
if(n)r.k(new B.buS())
r.db=A.he(C.cf,new B.buT(r))
n=r.e
n===$&&A.d()
m=n.r
r.dx=new A.co(m,A.x(m).i("co<1>")).d3(r.gap6())
n=n.w
r.dy=new A.co(n,A.x(n).i("co<1>")).d3(new B.buU())
r.cx=A.he(C.fb,new B.buV(r))
r.yv()
case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$U3,v)},
aPI(){var w=this.cy
if(w!=null)w.X(0)
this.cy=A.dl(C.c9,new B.bus(this))},
t7(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m,l,k,j,i,h,g,f,e,d
var $async$t7=A.f(function(a0,a1){if(a0===1){s=a1
w=t}while(true)switch(w){case 0:e="appel"
t=4
q=null
i=r.a
h=i.z
w=h!=null?7:9
break
case 7:w=10
return A.e(h,$async$t7)
case 10:q=a1
i=r.r=B.a7l(q).a
w=8
break
case 9:h=$.K()
w=11
return A.e(h.EP(i.c),$async$t7)
case 11:q=a1
i=r.r=r.a.c
case 8:h=$.ip()
h.bj1(i)
B.cvR(r.r)
if(r.a.f)h.Wx()
p=B.a7l(q)
if(r.c==null){w=1
break}i=p.w
if(i==="termine"||i==="expire"){r.mG(A.b("Appel termin\xe9"))
w=1
break}r.a.toString
i=$.K()
r.w=i.gx3()
e="ice"
r.a.toString
i=$.K()
o=i.X9()
n=r.JK()
w=12
return A.e(o,$async$t7)
case 12:m=a1
l=B.cFj(m)
w=15
return A.e(n,$async$t7)
case 15:w=!a1?13:14
break
case 13:if(r.c==null){w=1
break}r.k(new B.buv(r))
w=16
return A.e(A.jL(C.nc,null,x.z),$async$t7)
case 16:if(r.c==null){w=1
break}r.mG(null)
w=1
break
case 14:r.aPI()
e="webrtc"
i=r.d
i===$&&A.d()
g=r.a.d==="video"||r.at
w=17
return A.e(i.xe(A.a2(["iceServers",l.a],x.N,x.z),g),$async$t7)
case 17:i.f=new B.buw(r)
i.r=new B.bux(r)
i.w=new B.buy(r)
if(r.c==null){w=1
break}r.k(new B.buz(r))
h.bpf()
r.db=A.he(C.cf,new B.buA(r))
i=r.e
i===$&&A.d()
h=i.r
r.dx=new A.co(h,A.x(h).i("co<1>")).d3(r.gap6())
h=i.w
r.dy=new A.co(h,A.x(h).i("co<1>")).d3(new B.buB())
r.a.toString
h=$.K()
k=h.b
if(k!=null&&J.a7(k)!==0){r.a.toString
$.K()
i.W_(C.d.jD("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws",k)}r.cx=A.he(C.fb,new B.buC(r))
r.yv()
t=2
w=6
break
case 4:t=3
d=s
j=A.M(d)
if(r.c==null){w=1
break}A.mx().$1("Appel : \xe9chec \xe0 l\u2019\xe9tape "+A.u(e)+" : "+A.aCp(A.u(j)))
i=r.c
i.toString
h=j instanceof A.cS?j.a:r.b0D(e)
i.q(x.q).f.v(A.z(null,null,null,null,null,C.h,null,A.c(h,null,null,null,null,null,null,null,null),null,C.l,null,null,null,null,null,null,null,null,null))
r.mG(null)
w=6
break
case 3:w=2
break
case 6:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$t7,v)},
b0D(d){if(d==="ice")return A.b("Configuration d\u2019appel indisponible. V\xe9rifie ta connexion, puis r\xe9essaie.")
if(d==="webrtc")return A.b("Ce navigateur ne peut pas d\xe9marrer l\u2019appel. Essaie depuis l\u2019application.")
return A.b("Appel introuvable ou d\xe9j\xe0 termin\xe9.")},
JK(){var w=0,v=A.k(x.y),u,t=2,s,r=this,q,p,o
var $async$JK=A.f(function(d,e){if(d===1){s=e
w=t}while(true)switch(w){case 0:t=4
w=7
return A.e(r.a1c(),$async$JK)
case 7:if(!e){u=!1
w=1
break}q=r.d
q===$&&A.d()
w=8
return A.e(q.FC(r.a.d==="video"||r.at),$async$JK)
case 8:u=!0
w=1
break
t=2
w=6
break
case 4:t=3
o=s
u=!1
w=1
break
w=6
break
case 3:w=2
break
case 6:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$JK,v)},
a1c(){var w=0,v=A.k(x.y),u,t=this
var $async$a1c=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:u=B.awn(t.a.d==="video"||t.at)
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$a1c,v)},
yv(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m
var $async$yv=A.f(function(d,e){if(d===1){s=e
w=t}while(true)switch(w){case 0:if(r.c==null||r.y){w=1
break}t=4
r.a.toString
o=$.K()
w=7
return A.e(o.c2("/messagerie/appels/"+r.r+"/signaux"),$async$yv)
case 7:q=e
for(o=J.ap(q);o.B();){p=o.gJ(o)
r.ap7(B.cha(p))}t=2
w=6
break
case 4:t=3
m=s
w=6
break
case 3:w=2
break
case 6:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$yv,v)},
ap7(d){var w,v,u,t,s=this
if(s.c==null||s.y)return
w=s.f
v=d.a
if(w.u(0,v))return
w.E(0,v)
w=s.w
if(w!=null&&d.c===w)return
switch(d.d){case"offre":if(s.a.f)return
s.K4(d)
break
case"reponse":if(!s.a.f)return
u=B.cwI(d.e)
if(u==null)return
w=s.d
w===$&&A.d()
w.Vx(A.a2(["sdp",u.a,"type",u.b],x.N,x.z)).aN(0,new B.buX(s),x.a).fT(new B.buY(s))
break
case"candidat_ice":t=B.cVU(d.e)
if(t==null)return
w=s.d
w===$&&A.d()
w.Vr(A.a2(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],x.N,x.z))
break
case"accepte":if(!s.a.f||s.x)return
w=s.d
w===$&&A.d()
w.Ei().aN(0,new B.buZ(s),x.a).fT(new B.bv_(s))
break
case"refuse":s.mG(A.b("Appel refus\xe9"))
break
case"annule":s.mG(A.b("Appel annul\xe9"))
break
case"termine":s.mG(A.b("Appel termin\xe9"))
break}},
K4(d){return this.b6Y(d)},
b6Y(d){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m
var $async$K4=A.f(function(e,f){if(e===1){s=f
w=t}while(true)switch(w){case 0:n=B.cwI(d.e)
if(n==null){w=1
break}w=!(r.a.d==="video"||r.at)&&C.d.u(n.a,"m=video")?3:4
break
case 3:p=r.d
p===$&&A.d()
w=5
return A.e(p.tG(),$async$K4)
case 5:if(f&&r.c!=null&&!r.y){r.k(new B.buM(r))
$.ip().avn("video")}case 4:t=7
p=r.d
p===$&&A.d()
w=10
return A.e(p.Ej(A.a2(["sdp",n.a,"type",n.b],x.N,x.z)),$async$K4)
case 10:q=f
if(r.c==null||r.y){w=1
break}r.TA()
r.a2o("reponse",q)
t=2
w=9
break
case 7:t=6
m=s
r.mG(A.b("L\u2019appel n\u2019a pas pu aboutir."))
w=9
break
case 6:w=2
break
case 9:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$K4,v)},
TA(){var w=0,v=A.k(x.H),u,t=this,s,r
var $async$TA=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:if(t.x){w=1
break}s=t.cy
if(s!=null)s.X(0)
s=t.fr
s===$&&A.d()
s.h9()
t.k(new B.buJ(t,!1))
s=$.ip()
s.br7()
r=t.Q
s.a9K(t.as,r)
B.cj1()
case 1:return A.i(u,v)}})
return A.j($async$TA,v)},
yk(d,e,f){return this.aRG(d,e,f)},
a2o(d,e){return this.yk(d,e,!0)},
aRG(d,e,f){var w=0,v=A.k(x.H),u=1,t,s=this,r,q,p
var $async$yk=A.f(function(g,h){if(g===1){t=h
w=u}while(true)switch(w){case 0:u=3
s.a.toString
r=$.K()
w=6
return A.e(r.atb(s.r,e,d),$async$yk)
case 6:u=1
w=5
break
case 3:u=2
p=t
if(f&&s.c!=null&&!s.y)s.mG(A.b("L\u2019appel n\u2019a pas pu aboutir."))
w=5
break
case 2:w=1
break
case 5:return A.i(null,v)
case 1:return A.h(t,v)}})
return A.j($async$yk,v)},
JX(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n
var $async$JX=A.f(function(d,e){if(d===1){s=e
w=t}while(true)switch(w){case 0:if(r.y){w=1
break}r.y=!0
q=r.cy
if(q!=null)q.X(0)
q=r.fr
q===$&&A.d()
q.h9()
t=4
q=r.r
w=q.length!==0?7:8
break
case 7:r.a.toString
p=$.K()
w=9
return A.e(p.Mf(q,"termine"),$async$JX)
case 9:case 8:t=2
w=6
break
case 4:t=3
n=s
w=6
break
case 3:w=2
break
case 6:B.c8Z()
$.ip().Of()
q=r.c
if(q!=null)A.a1(q,!1).bH()
case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$JX,v)},
amv(){var w=this
if(!w.x||w.y)return
$.ip().bsr()
w.k(new B.buK(w))
$.aQ.aD$.push(new B.buL(w))},
mG(d){var w,v,u=this,t=null
if(u.y)return
u.y=!0
w=u.cy
if(w!=null)w.X(0)
w=u.fr
w===$&&A.d()
w.h9()
w=u.r
if(w.length!==0){u.a.toString
v=$.K()
v.Mf(w,"termine").fT(new B.buW())}if(d!=null&&u.c!=null)u.c.q(x.q).f.v(A.z(t,t,t,t,t,C.h,t,A.c(d,t,t,t,t,t,t,t,t),t,C.l,t,t,t,t,t,t,t,t,t))
B.c8Z()
$.ip().Of()
w=u.c
if(w!=null)A.a1(w,!1).bH()},
Qy(){var w=0,v=A.k(x.H),u=this,t,s
var $async$Qy=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:t=!u.Q
s=u.d
s===$&&A.d()
w=2
return A.e(s.a02(t),$async$Qy)
case 2:if(u.c!=null)u.k(new B.buo(u,t))
$.ip().a9K(u.as,t)
return A.i(null,v)}})
return A.j($async$Qy,v)},
Qx(){var w=0,v=A.k(x.H),u=this,t,s
var $async$Qx=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:u.ax=!1
w=2
return A.e(u.Qp(!u.as),$async$Qx)
case 2:t=$.ip()
s=u.Q
t.a9K(u.as,s)
return A.i(null,v)}})
return A.j($async$Qx,v)},
Qp(d){return this.aJM(d)},
aJM(d){var w=0,v=A.k(x.H),u=1,t,s=this,r,q,p,o,n
var $async$Qp=A.f(function(e,f){if(e===1){t=f
w=u}while(true)switch(w){case 0:u=3
q=s.d
q===$&&A.d()
w=6
return A.e(q.GW(d),$async$Qp)
case 6:u=1
w=5
break
case 3:u=2
n=t
r=A.M(n)
A.mx().$1("Appel : haut-parleur impossible : "+A.aCp(A.u(r)))
w=5
break
case 2:w=1
break
case 5:q=s.d
q===$&&A.d()
o=q.CW
if(s.c!=null&&o!==s.as)s.k(new B.bum(s,o))
return A.i(null,v)
case 1:return A.h(t,v)}})
return A.j($async$Qp,v)},
Qv(){var w=0,v=A.k(x.H),u=this,t,s
var $async$Qv=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:t=!u.ay
s=u.d
s===$&&A.d()
w=2
return A.e(s.a0_(t),$async$Qv)
case 2:if(u.c!=null)u.k(new B.bun(u,t))
$.ip().bps(t)
return A.i(null,v)}})
return A.j($async$Qv,v)},
HI(){var w=0,v=A.k(x.H),u=this,t
var $async$HI=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:t=u.d
t===$&&A.d()
w=2
return A.e(t.VE(),$async$HI)
case 2:return A.i(null,v)}})
return A.j($async$HI,v)},
aoh(){var w,v=this,u="Appel en cours\u2026",t=v.fy
if(t!=null)return t
$.ip()
if(v.x){t=A.b(u)
w=C.c.af(v.CW.a,1e6)
return t+" "+(C.d.aU(C.c.l(C.c.af(w,60)),2,"0")+":"+C.d.aU(C.c.l(C.c.a_(w,60)),2,"0"))}if(v.z)return v.a.f?A.b("\xc7a sonne\u2026"):A.b(u)
return A.b("Connexion\u2026")},
Qz(){var w=0,v=A.k(x.H),u,t=this,s,r,q
var $async$Qz=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:if(t.a.d==="video"||t.at||t.y){w=1
break}if(!t.x){s=t.c
s.toString
r=A.b("D\xe9croche d\u2019abord pour passer en vid\xe9o.")
s.q(x.q).f.v(A.z(null,null,null,null,null,C.h,null,A.c(r,null,null,null,null,null,null,null,null),null,C.l,null,null,null,null,null,null,null,null,null))
w=1
break}s=t.d
s===$&&A.d()
w=3
return A.e(s.L1(),$async$Qz)
case 3:q=e
if(q==null){s=t.c
if(s!=null){r=A.b("La cam\xe9ra n\u2019a pas pu s\u2019ouvrir.")
s.q(x.q).f.v(A.z(null,null,null,null,null,C.h,null,A.c(r,null,null,null,null,null,null,null,null),null,C.l,null,null,null,null,null,null,null,null,null))}w=1
break}if(t.c==null||t.y){w=1
break}t.k(new B.bur(t))
$.ip().avn("video")
t.a2o("offre",q)
case 1:return A.i(u,v)}})
return A.j($async$Qz,v)},
Hx(){var w=0,v=A.k(x.H),u,t=this,s,r,q
var $async$Hx=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:if(t.y||t.c==null){w=1
break}s=t.d
s===$&&A.d()
w=3
return A.e(s.PH(),$async$Hx)
case 3:r=e
if(t.c==null||t.y){w=1
break}q=J.c0(r)?A.b("Statistiques indisponibles pour cet appel."):B.cvY(r)
s=t.c
s.toString
w=4
return A.e(A.bL(null,null,!0,null,new B.bul(q),s,null,!0,!0,x.H),$async$Hx)
case 4:case 1:return A.i(u,v)}})
return A.j($async$Hx,v)},
HJ(){var w=0,v=A.k(x.H),u,t=this,s,r
var $async$HJ=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:if(!(t.a.d==="video"||t.at)||t.y){w=1
break}s=t.d
s===$&&A.d()
w=s.ay?3:4
break
case 3:w=5
return A.e(s.DQ(),$async$HJ)
case 5:if(t.c!=null)t.k(new B.bup())
w=1
break
case 4:w=6
return A.e(s.AC(),$async$HJ)
case 6:if(!e){s=t.c
if(s!=null){r=A.b("Le partage d\u2019\xe9cran n\u2019est pas disponible sur cet appareil.")
s.q(x.q).f.v(A.z(null,null,null,null,null,C.h,null,A.c(r,null,null,null,null,null,null,null,null),null,C.l,null,null,null,null,null,null,null,null,null))}w=1
break}if(t.c!=null)t.k(new B.buq())
case 1:return A.i(u,v)}})
return A.j($async$HJ,v)},
b3j(){var w,v,u=this,t=null,s=A.a([],x.p)
if(u.a.d==="video"||u.at){s.push(A.bN(!1,t,t,t,!0,t,t,!0,!1,D.a6C,t,t,t,new B.buE(u),!1,t,t,t,t,t,A.c(A.b("Basculer"),t,t,t,t,C.cX,t,t,t),t,t))
w=u.d
w===$&&A.d()
w=w.ay
v=A.c1(w?D.a4j:D.a4g,C.m,t,t)
s.push(A.bN(!1,t,t,t,!0,t,t,!0,!1,v,t,t,t,new B.buF(u),!1,t,t,t,t,t,A.c(w?A.b("Arr\xeater le partage"):A.b("Partager l\u2019\xe9cran"),t,t,t,t,C.cX,t,t,t),t,t))}if(u.x){s.push(A.bN(!1,t,t,t,!0,t,t,!0,!1,D.a6x,t,t,t,new B.buG(u),!1,t,t,t,t,t,A.c(A.b("Statistiques"),t,t,t,t,C.cX,t,t,t),t,t))
s.push(A.bN(!1,t,t,t,!0,t,t,!0,!1,D.a6i,t,t,t,new B.buH(u),!1,t,t,t,t,t,A.c(A.b("R\xe9duire"),t,t,t,t,C.cX,t,t,t),t,t))}if(s.length===0)return
w=u.c
w.toString
A.j8(D.r_,new B.buI(s),w,!1,t,x.H)},
D(d){var w,v,u,t,s,r,q,p=this,o=null,n=p.d
n===$&&A.d()
w=n.c
w=w==null?o:w.rK(0).length!==0
v=p.id
u=p.a
if((u.d==="video"||p.at)&&p.z){if(w===!0)w=A.fR(o,B.ch_(n.e,!1,D.OO),C.x,!1,o,p.gaeW(),o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o)
else{w=u.e
u=u.r
t=p.go&&p.x
w=A.cu(A.I(A.a([new B.NC(w,u,t,56,o),C.q,B.cuB(w,22),C.k,A.c(p.aoh(),o,o,o,o,D.wp,o,o,o)],x.p),C.n,C.f,C.O),o,o)}n=A.a([A.yP(0,w),A.eZ(o,A.eF(A.N(12),B.ch_(n.d,!0,D.OO),C.ao),160,o,o,16,16,110),A.eZ(o,A.ab(A.aR(!1,D.a6B,C.j,o,C.p,o,o,o,o,p.gaeW(),o,A.di(C.Za,o,o,C.a_,C.cy,o)),36,36),o,o,o,20,20,o)],x.p)
if(p.x)n.push(A.eZ(o,new B.YU(p.gamu(),o),o,o,16,o,16,o))
w=p.Q
u=p.as
n.push(A.eZ(24,B.csB(p.ay,!0,u,w,p.gaf_(),p.gaeV(),p.gaeX(),p.gaeY(),p.galC(),p.gam9(),!0),o,o,0,0,o,o))
n=A.dX(C.aO,n,C.h,C.aG,o)}else{w=x.p
u=A.a([],w)
if(p.go)u.push(A.eZ(o,A.r4(B.ch_(n.e,!1,D.va),0),1,o,0,o,0,1))
if(p.x)u.push(A.eZ(o,new B.YU(p.gamu(),o),o,o,16,o,16,o))
n=B.cuB(p.a.e,24)
t=A.c(p.aoh(),o,o,o,o,D.wp,C.V,o,o)
s=p.a
r=s.e
s=s.r
s=A.a8(A.cu(new B.NC(r,s,p.go&&p.x,88,o),o,o),1,o)
r=p.Q
q=p.as
u.push(A.I(A.a([C.q,n,C.k,new A.W(D.rH,t,o),s,B.csB(p.ay,!1,q,r,p.gaf_(),p.gaeV(),p.gaeX(),p.gaeY(),p.galC(),p.gam9(),p.x),C.q],w),C.n,C.f,C.i))
u=A.dX(C.aO,u,C.h,C.aG,o)
n=u}return A.cgJ(v,A.dU(o,C.o,A.fs(!0,n,!0,C.a_,!0,!0),o,o,o),new B.bv0(p),x.K)}}
B.ako.prototype={
D(d){var w,v,u=this,t=null,s=A.N(28),r=A.a8(new B.zT(D.a4l,u.e,A.b("Haut-parleur"),u.x,t,t),1,t),q=u.f?D.Bu:D.a4k,p=A.b("Appel vid\xe9o")
q=A.a8(new B.zT(q,!1,p,u.c?u.y:u.z,t,t),1,t)
p=u.d
w=p?D.a4f:D.a4e
v=x.p
p=A.O(A.a([r,q,A.a8(new B.zT(w,p,A.b("Muet"),u.w,t,t),1,t)],v),C.n,C.f,C.i,t)
w=A.b("Plus")
return A.S(t,A.I(A.a([p,C.q,A.O(A.a([A.a8(new B.zT(C.Bq,!1,w,u.r?u.Q:t,t,t),1,t),A.a8(new B.zT(D.Bj,!1,A.b("Terminer"),u.as,C.aH,t),1,t),D.a37],v),C.n,C.f,C.i,t)],v),C.n,C.f,C.O),C.j,t,t,new A.a4(D.r_,t,t,s,t,t,C.u),t,t,t,C.Ay,D.a2V,t,t,t)}}
B.YU.prototype={
D(d){var w=null
return A.I(A.a([A.ab(A.aR(!1,D.a6h,C.j,w,C.p,w,w,w,w,this.c,w,A.di(C.kK,w,w,C.a_,C.cy,w)),48,48),C.I,A.c(A.b("R\xe9duire"),w,w,w,w,C.R9,w,w,w)],x.p),C.n,C.f,C.O)}}
B.zT.prototype={
D(d){var w,v,u,t=this,s=null,r=t.r,q=r==null
if(q)r=t.d?C.m:C.kK
if(!q)w=C.m
else w=t.d?C.o:C.m
q=t.f
v=q==null?0.4:1
u=A.di(r,s,s,C.a_,C.cy,s)
return A.r4(A.I(A.a([A.ab(A.aR(!1,A.c1(t.c,w,s,30),C.j,s,C.p,s,s,s,s,q,s,u),72,72),C.k,A.c(t.e,s,s,s,s,C.wr,C.V,s,s)],x.p),C.n,C.f,C.O),v)}}
B.NC.prototype={
O(){return new B.ap_(null,null)}}
B.ap_.prototype={
S(){var w,v=this
v.W()
w=A.cr(null,A.cU(0,0,v.a.e?1100:2400,0,0),null,1,null,v)
w.aaC(0,!0)
v.d!==$&&A.aN()
v.d=w},
aV(d){var w,v
this.bg(d)
w=this.a.e
if(d.e!==w){v=this.d
v===$&&A.d()
v.e=A.cU(0,0,w?1100:2400,0,0)
v.aaC(0,!0)}},
m(){var w=this.d
w===$&&A.d()
w.m()
this.aGg()},
D(d){var w,v=this,u=null,t=v.a,s=t.f,r=s*2,q=r+24,p=v.d
p===$&&A.d()
w=t.d
t=w!=null?A.jG(u,w,u,u,s):A.jG(C.t,u,A.c(B.cbT(t.c),u,u,u,u,A.be(u,u,C.o,u,u,u,u,u,u,u,u,v.a.f*0.7,u,u,C.A,u,u,!0,u,u,u,u,u,u,u,u),u,u,u),u,s)
return A.ab(A.i7(p,new B.bRf(v,r),t),q,q)}}
B.a5G.prototype={
m(){var w=this,v=w.bS$
if(v!=null)v.T(0,w.ghM())
w.bS$=null
w.a2()},
ce(){this.dc()
this.d0()
this.hN()}}
B.b36.prototype={
FC(d){return this.bqX(d)},
bqX(d){var w=0,v=A.k(x.H),u,t=this,s,r,q,p,o
var $async$FC=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:if(t.b!=null){w=1
break}s=t.d
w=3
return A.e(s.jU(0),$async$FC)
case 3:$.ax0()
r=x.N
q=A.a2(["echoCancellation",!0,"noiseSuppression",!0,"autoGainControl",!0],r,x.y)
if(d){p=x.S
p=A.a2(["facingMode","user","width",A.a2(["ideal",640],r,p),"height",A.a2(["ideal",480],r,p),"frameRate",A.a2(["ideal",24],r,p)],r,x.K)}else p=!1
w=4
return A.e(new B.Tl().B8(0,A.a2(["audio",q,"video",p],r,x.z)),$async$FC)
case 4:o=f
t.b=o
s.sBk(0,o)
case 1:return A.i(u,v)}})
return A.j($async$FC,v)},
xe(d,e){return this.brI(d,e)},
brI(d,e){var w=0,v=A.k(x.H),u=this,t,s,r,q,p,o,n
var $async$xe=A.f(function(f,g){if(f===1)return A.h(g,v)
while(true)switch(w){case 0:w=2
return A.e(u.e.jU(0),$async$xe)
case 2:w=u.b==null?3:4
break
case 3:w=5
return A.e(u.FC(e),$async$xe)
case 5:case 4:t=u.b
t.toString
w=6
return A.e($.ax0().a7H(d,A.C(x.N,x.z)),$async$xe)
case 6:s=u.a=g
r=t.GJ(0),q=r.length,p=0
case 7:if(!(p<r.length)){w=9
break}o=r[p]
w=10
return A.e(s.Vo(0,o,t),$async$xe)
case 10:n=g
if(o.d.kind==="video")u.as=n
case 8:r.length===q||(0,A.R)(r),++p
w=7
break
case 9:w=11
return A.e(u.CQ(),$async$xe)
case 11:s.e=new B.b38(u)
s.Q=new B.b39(u)
s.d=new B.b3a(u)
return A.i(null,v)}})
return A.j($async$xe,v)},
aPw(d){var w,v,u,t=this
t.c=d
w=d.rK(0)
v=w.length!==0?C.b.gU(w).d.id:null
if(!t.x){t.x=!0
t.z=v
t.e.sBk(0,d)
t.HC()
u=t.r
if(u!=null)u.$0()}else{u=t.z
if(v!=null&&v!==u){t.z=v
t.e.sBk(0,d)
u=t.r
if(u!=null)u.$0()}}},
HC(){var w=0,v=A.k(x.H),u=1,t,s=this,r,q,p,o,n,m,l,k
var $async$HC=A.f(function(d,e){if(d===1){t=e
w=u}while(true)switch(w){case 0:m=s.CW?0.8:1
l=s.c
l=l==null?null:l.OU(0)
if(l==null)l=C.cs
p=l.length
o=0
case 2:if(!(o<l.length)){w=4
break}r=l[o]
u=6
w=9
return A.e(B.aVu(m,r),$async$HC)
case 9:u=1
w=8
break
case 6:u=5
k=t
q=A.M(k)
A.mx().$1("Appel : volume distant impossible : "+A.aCp(A.u(q)))
w=8
break
case 5:w=1
break
case 8:case 3:l.length===p||(0,A.R)(l),++o
w=2
break
case 4:return A.i(null,v)
case 1:return A.h(t,v)}})
return A.j($async$HC,v)},
CQ(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m,l,k,j,i,h,g
var $async$CQ=A.f(function(d,e){if(d===1){s=e
w=t}while(true)switch(w){case 0:h=r.as
if(h==null){w=1
break}t=4
n=h.a.getParameters()
m=n.transactionId
if((m==null?null:m)!=null){l=n.rtcp
k=x.z
k=A.a2(["cname",l.cname,"reducedSize",l.reducedSize],k,k)
k.h(0,"cname")
k.h(0,"reducedSize")}B.cLq(n)
l=B.cLp(n)
B.cLo(n)
q=new B.aYW(l)
p=q.d
if(p==null||J.a7(p)===0){w=1
break}for(l=p,k=l.length,j=0;j<k;++j){o=l[j]
o.c=5e5
o.e=24}w=7
return A.e(h.GZ(q),$async$CQ)
case 7:t=2
w=6
break
case 4:t=3
g=s
w=6
break
case 3:w=2
break
case 6:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$CQ,v)},
Ei(){var w=0,v=A.k(x.P),u,t=this,s,r
var $async$Ei=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:r=t.a
if(r==null)throw A.p(A.am("Connexion non pr\xe9par\xe9e."))
w=3
return A.e(r.Wf(0),$async$Ei)
case 3:s=e
w=4
return A.e(r.GX(0,s),$async$Ei)
case 4:u=A.a2(["sdp",s.a,"type",s.b],x.N,x.z)
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$Ei,v)},
Ej(d){return this.bir(d)},
bir(d){var w=0,v=A.k(x.P),u,t=this,s,r
var $async$Ej=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:r=t.a
if(r==null)throw A.p(A.am("Connexion non pr\xe9par\xe9e."))
w=3
return A.e(r.H_(0,new B.Eg(d.h(0,"sdp"),d.h(0,"type"))),$async$Ej)
case 3:w=4
return A.e(r.Wc(0),$async$Ej)
case 4:s=f
w=5
return A.e(r.GX(0,s),$async$Ej)
case 5:u=A.a2(["sdp",s.a,"type",s.b],x.N,x.z)
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$Ej,v)},
Vx(d){return this.bfg(d)},
bfg(d){var w=0,v=A.k(x.H),u=this,t
var $async$Vx=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:t=u.a
if(t==null)throw A.p(A.am("Connexion non pr\xe9par\xe9e."))
w=2
return A.e(t.H_(0,new B.Eg(d.h(0,"sdp"),d.h(0,"type"))),$async$Vx)
case 2:return A.i(null,v)}})
return A.j($async$Vx,v)},
Vr(d){return this.bf1(d)},
bf1(d){var w=0,v=A.k(x.H),u,t=this,s
var $async$Vr=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:s=t.a
if(s==null){w=1
break}w=3
return A.e(s.Vd(new B.Kt(A.ay(d.h(0,"candidate")),A.ay(d.h(0,"sdpMid")),A.eN(d.h(0,"sdpMLineIndex")))),$async$Vr)
case 3:case 1:return A.i(u,v)}})
return A.j($async$Vr,v)},
a02(d){return this.aAA(d)},
aAA(d){var w=0,v=A.k(x.H),u=this,t,s,r,q
var $async$a02=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:q=u.b
q=q==null?null:q.OU(0)
if(q==null)q=C.cs
t=q.length
s=!d
r=0
for(;r<q.length;q.length===t||(0,A.R)(q),++r)q[r].slX(0,s)
return A.i(null,v)}})
return A.j($async$a02,v)},
GW(d){return this.aAq(d)},
aAq(d){var w=0,v=A.k(x.H),u=this
var $async$GW=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:w=2
return A.e(B.adr(d),$async$GW)
case 2:u.CW=d
w=3
return A.e(u.HC(),$async$GW)
case 3:return A.i(null,v)}})
return A.j($async$GW,v)},
a0_(d){return this.aAg(d)},
aAg(d){var w=0,v=A.k(x.H),u=this,t,s,r
var $async$a0_=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:r=u.b
r=r==null?null:r.rK(0)
if(r==null)r=C.cs
t=r.length
s=0
for(;s<r.length;r.length===t||(0,A.R)(r),++s)r[s].slX(0,d)
return A.i(null,v)}})
return A.j($async$a0_,v)},
VE(){var w=0,v=A.k(x.H),u,t=this,s,r
var $async$VE=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:s=t.b
r=s==null?null:s.rK(0)
if(r==null)r=D.En
if(r.length===0){w=1
break}w=3
return A.e(B.cfV(C.b.gU(r)),$async$VE)
case 3:case 1:return A.i(u,v)}})
return A.j($async$VE,v)},
tG(){var w=0,v=A.k(x.y),u,t=2,s,r=this,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0,a1
var $async$tG=A.f(function(a2,a3){if(a2===1){s=a3
w=t}while(true)switch(w){case 0:d=r.a
if(d==null||r.y){u=!1
w=1
break}l=r.b
l=l==null?null:l.rK(0).length!==0
if(l===!0){u=!0
w=1
break}q=null
t=4
$.ax0()
l=x.N
k=x.S
w=7
return A.e(new B.Tl().B8(0,A.a2(["audio",!1,"video",A.a2(["facingMode","user","width",A.a2(["ideal",640],l,k),"height",A.a2(["ideal",480],l,k),"frameRate",A.a2(["ideal",24],l,k)],l,x.K)],l,x.z)),$async$tG)
case 7:q=a3
p=J.clB(q)
if(J.a7(p)===0){u=!1
w=1
break}o=J.fc(p)
l=r.b
if(l==null)l=null
else{l=l.e
k=o.d
l.addTrack(k)
l=A.d9(null,x.H)}w=8
return A.e(x.x.b(l)?l:A.dM(l,x.H),$async$tG)
case 8:r.d.sBk(0,r.b)
l=r.b
l.toString
w=9
return A.e(J.cDe(d,o,l),$async$tG)
case 9:n=a3
r.as=n
w=10
return A.e(r.CQ(),$async$tG)
case 10:u=!0
w=1
break
t=2
w=6
break
case 4:t=3
a0=s
l=q
l=l==null?null:J.clA(l)
if(l==null)l=C.cs
k=l.length
i=x.c
h=x._
g=0
case 11:if(!(g<l.length)){w=13
break}m=l[g]
t=15
f=J.a71(m)
if(!h.b(f)){e=new A.aB($.aI,i)
e.a=8
e.c=f
f=e}w=18
return A.e(f,$async$tG)
case 18:t=3
w=17
break
case 15:t=14
a1=s
w=17
break
case 14:w=3
break
case 17:case 12:l.length===k||(0,A.R)(l),++g
w=11
break
case 13:u=!1
w=1
break
w=6
break
case 3:w=2
break
case 6:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$tG,v)},
L1(){var w=0,v=A.k(x.cO),u,t=2,s,r=this,q,p,o
var $async$L1=A.f(function(d,e){if(d===1){s=e
w=t}while(true)switch(w){case 0:w=3
return A.e(r.tG(),$async$L1)
case 3:if(!e){u=null
w=1
break}t=5
w=8
return A.e(r.Ei(),$async$L1)
case 8:q=e
u=q
w=1
break
t=2
w=7
break
case 5:t=4
o=s
u=null
w=1
break
w=7
break
case 4:w=2
break
case 7:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$L1,v)},
AC(){var w=0,v=A.k(x.y),u,t=2,s,r=this,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0,a1,a2
var $async$AC=A.f(function(a3,a4){if(a3===1){s=a4
w=t}while(true)switch(w){case 0:if(r.a==null||r.y){u=!1
w=1
break}if(r.ay){u=!0
w=1
break}if(A.ca()===C.aS){u=!1
w=1
break}q=r.as
if(q==null){u=!1
w=1
break}p=null
t=4
$.ax0()
w=7
return A.e(new B.Tl().Gu(A.a2(["video",!0,"audio",!1],x.N,x.z)),$async$AC)
case 7:p=a4
o=J.clB(p)
if(J.a7(o)===0){u=!1
w=1
break}n=J.fc(o)
k=r.b
j=k==null?null:k.rK(0)
m=j==null?D.En:j
r.ax=J.a7(m)!==0?J.fc(m):null
w=8
return A.e(q.ZI(n),$async$AC)
case 8:r.at=p
r.ay=!0
r.d.sBk(0,p)
w=9
return A.e(r.CQ(),$async$AC)
case 9:n.c=new B.b37(r)
u=!0
w=1
break
t=2
w=6
break
case 4:t=3
a1=s
k=p
k=k==null?null:J.clA(k)
if(k==null)k=C.cs
h=k.length
g=x.c
f=x._
e=0
case 10:if(!(e<k.length)){w=12
break}l=k[e]
t=14
d=J.a71(l)
if(!f.b(d)){a0=new A.aB($.aI,g)
a0.a=8
a0.c=d
d=a0}w=17
return A.e(d,$async$AC)
case 17:t=3
w=16
break
case 14:t=13
a2=s
w=16
break
case 13:w=3
break
case 16:case 11:k.length===h||(0,A.R)(k),++e
w=10
break
case 12:u=!1
w=1
break
w=6
break
case 3:w=2
break
case 6:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$AC,v)},
DQ(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$DQ=A.f(function(d,a0){if(d===1){s=a0
w=t}while(true)switch(w){case 0:if(!r.ay){w=1
break}n=r.ay=!1
t=4
q=r.as
p=r.ax
w=(q!=null?p!=null:n)?7:8
break
case 7:w=9
return A.e(q.ZI(p),$async$DQ)
case 9:case 8:t=2
w=6
break
case 4:t=3
f=s
w=6
break
case 3:w=2
break
case 6:n=r.at
n=n==null?null:n.GJ(0)
if(n==null)n=C.cs
l=n.length
k=x.c
j=x._
i=0
case 10:if(!(i<n.length)){w=12
break}o=n[i]
t=14
h=J.a71(o)
if(!j.b(h)){g=new A.aB($.aI,k)
g.a=8
g.c=h
h=g}w=17
return A.e(h,$async$DQ)
case 17:t=2
w=16
break
case 14:t=13
e=s
w=16
break
case 13:w=2
break
case 16:case 11:n.length===l||(0,A.R)(n),++i
w=10
break
case 12:r.ax=r.at=null
r.d.sBk(0,r.b)
case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$DQ,v)},
PH(){var w=0,v=A.k(x.P),u,t=2,s,r=this,q,p,o,n,m
var $async$PH=A.f(function(d,e){if(d===1){s=e
w=t}while(true)switch(w){case 0:n=r.a
if(n==null||r.y){u=C.bc
w=1
break}t=4
w=7
return A.e(J.cDG(n),$async$PH)
case 7:q=e
p=B.cZG(q,r.Q)
r.Q=p
A.mx().$1("Appel : statistiques : "+B.cvY(p))
u=p
w=1
break
t=2
w=6
break
case 4:t=3
m=s
u=C.bc
w=1
break
w=6
break
case 3:w=2
break
case 6:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$PH,v)},
hc(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0,a1
var $async$hc=A.f(function(a2,a3){if(a2===1){s=a3
w=t}while(true)switch(w){case 0:if(r.y){w=1
break}r.y=!0
r.ay=!1
o=r.at
o=o==null?null:o.GJ(0)
if(o==null)o=C.cs
n=o.length
m=x.c
l=x._
k=0
case 3:if(!(k<o.length)){w=5
break}q=o[k]
t=7
j=J.a71(q)
if(!l.b(j)){i=new A.aB($.aI,m)
i.a=8
i.c=j
j=i}w=10
return A.e(j,$async$hc)
case 10:t=2
w=9
break
case 7:t=6
g=s
w=9
break
case 6:w=2
break
case 9:case 4:o.length===n||(0,A.R)(o),++k
w=3
break
case 5:r.ch=r.as=r.ax=r.at=null
t=12
w=15
return A.e(B.adr(!1),$async$hc)
case 15:t=2
w=14
break
case 12:t=11
f=s
w=14
break
case 11:w=2
break
case 14:t=17
o=r.a
o=o==null?null:o.aa(0)
w=20
return A.e(x.x.b(o)?o:A.dM(o,x.H),$async$hc)
case 20:t=2
w=19
break
case 17:t=16
e=s
w=19
break
case 16:w=2
break
case 19:r.a=null
o=r.b
o=o==null?null:o.GJ(0)
if(o==null)o=C.cs
n=o.length
k=0
case 21:if(!(k<o.length)){w=23
break}p=o[k]
t=25
j=J.a71(p)
if(!l.b(j)){i=new A.aB($.aI,m)
i.a=8
i.c=j
j=i}w=28
return A.e(j,$async$hc)
case 28:t=2
w=27
break
case 25:t=24
d=s
w=27
break
case 24:w=2
break
case 27:case 22:o.length===n||(0,A.R)(o),++k
w=21
break
case 23:r.b=null
t=30
w=33
return A.e(r.d.m(),$async$hc)
case 33:t=2
w=32
break
case 30:t=29
a0=s
w=32
break
case 29:w=2
break
case 32:t=35
w=38
return A.e(r.e.m(),$async$hc)
case 38:t=2
w=37
break
case 35:t=34
a1=s
w=37
break
case 34:w=2
break
case 37:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$hc,v)}}
B.a8K.prototype={
gbgJ(){return this.b!=null&&!this.e},
W_(d,e){return this.bgK(d,e)},
bgK(d,e){var w=0,v=A.k(x.H),u=this
var $async$W_=A.f(function(f,g){if(f===1)return A.h(g,v)
while(true)switch(w){case 0:u.x=d
u.y=e
u.e=!1
u.f=0
w=2
return A.e(u.HA(),$async$W_)
case 2:return A.i(null,v)}})
return A.j($async$W_,v)},
HA(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m,l
var $async$HA=A.f(function(d,e){if(d===1){s=e
w=t}while(true)switch(w){case 0:if(r.e){w=1
break}q=r.x
if(q==null||J.a7(q)===0){w=1
break}t=4
p=B.cE2(B.ceQ(A.cD(q,0,null),null))
r.b=p
w=7
return A.e(p.f.a,$async$HA)
case 7:r.f=0
o=r.y
if(o!=null&&J.a7(o)!==0)try{n=x.N
p.gkL().a.E(0,C.Y.dv(A.a2(["type","auth","jeton",o],n,n),null))}catch(k){}n=p.r.b
n===$&&A.d()
n=n.b
n===$&&A.d()
r.c=new A.cZ(n,A.x(n).i("cZ<1>")).b7(r.gb6g(),!0,r.gb4H(),new B.aDL(r))
t=2
w=6
break
case 4:t=3
l=s
r.a4t()
w=6
break
case 3:w=2
break
case 6:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$HA,v)},
b6h(d){var w,v,u,t
try{w=C.Y.cE(0,J.l(d),null)
u=x.P
if(!u.b(w))return
if(!J.r(J.m(w,"type"),"signal_appel"))return
v=J.m(w,"signal")
if(!u.b(v))return
u=this.r
if((u.c&4)===0)u.E(0,B.cha(v))}catch(t){}},
a4t(){var w,v=this,u=v.c
if(u!=null)u.X(0)
v.b=v.c=null
if(v.e)return
u=v.f
if(u>=5){u=v.w
if((u.c&4)===0)u.E(0,null)
return}w=D.afY[u]
v.f=u+1
u=v.d
if(u!=null)u.X(0)
v.d=A.dl(A.cU(0,0,0,0,w),new B.aDM(v))},
LU(){var w=0,v=A.k(x.H),u=1,t,s=this,r,q,p
var $async$LU=A.f(function(d,e){if(d===1){t=e
w=u}while(true)switch(w){case 0:s.e=!0
r=s.d
if(r!=null)r.X(0)
r=s.c
r=r==null?null:r.X(0)
w=2
return A.e(x.x.b(r)?r:A.dM(r,x.H),$async$LU)
case 2:s.c=null
u=4
r=s.b
r=r==null?null:r.gkL().aa(0)
w=7
return A.e(x._.b(r)?r:A.dM(r,x.z),$async$LU)
case 7:u=1
w=6
break
case 4:u=3
p=t
w=6
break
case 3:w=1
break
case 6:s.b=null
return A.i(null,v)
case 1:return A.h(t,v)}})
return A.j($async$LU,v)}}
B.acE.prototype={
uh(d){return this.bos(d)},
bos(d){var w=0,v=A.k(x.H),u=1,t,s=this,r,q,p,o
var $async$uh=A.f(function(e,f){if(e===1){t=f
w=u}while(true)switch(w){case 0:u=3
q=s.a
w=6
return A.e((q==null?s.a=A.B4():q).b2(0),$async$uh)
case 6:w=7
return A.e(s.a.a_Z(d),$async$uh)
case 7:w=8
return A.e(s.a.jk(C.JI),$async$uh)
case 8:w=9
return A.e(s.a.io(1),$async$uh)
case 9:w=10
return A.e(s.a.cV(0),$async$uh)
case 10:u=1
w=5
break
case 3:u=2
o=t
r=A.M(o)
A.mx().$1("Sonnerie appel : lecture impossible ("+d+") : "+A.u(r))
w=5
break
case 2:w=1
break
case 5:return A.i(null,v)
case 1:return A.h(t,v)}})
return A.j($async$uh,v)},
h9(){var w=0,v=A.k(x.H),u=1,t,s=this,r,q,p
var $async$h9=A.f(function(d,e){if(d===1){t=e
w=u}while(true)switch(w){case 0:u=3
r=s.a
r=r==null?null:r.b2(0)
w=6
return A.e(x.x.b(r)?r:A.dM(r,x.H),$async$h9)
case 6:u=1
w=5
break
case 3:u=2
p=t
w=5
break
case 2:w=1
break
case 5:return A.i(null,v)
case 1:return A.h(t,v)}})
return A.j($async$h9,v)},
hc(){var w=0,v=A.k(x.H),u=1,t,s=this,r,q,p
var $async$hc=A.f(function(d,e){if(d===1){t=e
w=u}while(true)switch(w){case 0:u=3
r=s.a
r=r==null?null:r.m()
w=6
return A.e(x.x.b(r)?r:A.dM(r,x.H),$async$hc)
case 6:u=1
w=5
break
case 3:u=2
p=t
w=5
break
case 2:w=1
break
case 5:s.a=null
return A.i(null,v)
case 1:return A.h(t,v)}})
return A.j($async$hc,v)}}
B.aYL.prototype={
a7H(d,e){return this.bif(d,e)},
bif(d,e){var w=0,v=A.k(x.Y),u,t,s,r,q
var $async$a7H=A.f(function(f,g){if(f===1)return A.h(g,v)
while(true)switch(w){case 0:q=e.a
if(q!==0)t=e
else{q=x.z
s=x.N
t=A.a2(["mandatory",A.C(q,q),"optional",A.a([A.a2(["DtlsSrtpKeyAgreement",!0],s,x.y)],x.T)],s,x.K)}q=self.RTCPeerConnection
s=A.fJ(t,x.N,x.z)
s.t(0,d)
r=new q(x.m.a(A.c7(s)))
s=J.l(r)
u=B.cLn(C.bX.giU().bd(new A.eG(s)),r)
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$a7H,v)}}
B.pi.prototype={
OU(d){var w=A.a([],x.Q),v=this.e.getAudioTracks()
v=x.l.b(v)?v:new A.dB(v,A.Y(v).i("dB<1,aF>"))
J.hw(v,new B.aTG(w))
return w},
rK(d){var w=A.a([],x.Q),v=this.e.getVideoTracks()
v=x.l.b(v)?v:new A.dB(v,A.Y(v).i("dB<1,aF>"))
J.hw(v,new B.aTH(w))
return w},
GJ(d){var w=A.G(this.OU(0),!0,x.G)
C.b.t(w,this.rK(0))
return w}}
B.ad6.prototype={
aHC(d){var w=this,v=w.d
v.addEventListener("ended",A.c6(new B.aTD(w)))
v.addEventListener("mute",A.c6(new B.aTE(w)))
v.addEventListener("unmute",A.c6(new B.aTF(w)))},
slX(d,e){this.d.enabled=e},
Vy(d,e){return this.bfj(0,e)},
bfj(d,e){var w=0,v=A.k(x.H),u=this
var $async$Vy=A.f(function(f,g){if(f===1)return A.h(g,v)
while(true)switch(w){case 0:w=2
return A.e(A.dN(u.d.applyConstraints(x.m.a(A.c7(e))),x.X),$async$Vy)
case 2:return A.i(null,v)}})
return A.j($async$Vy,v)},
b2(d){var w=0,v=A.k(x.H),u=this
var $async$b2=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:u.d.stop()
return A.i(null,v)}})
return A.j($async$b2,v)}}
B.Tl.prototype={
B8(d,e){return this.azo(0,e)},
azo(d,a0){var w=0,v=A.k(x.E),u,t=2,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$B8=A.f(function(a2,a3){if(a2===1){s=a3
w=t}while(true)switch(w){case 0:t=4
try{if(!B.cYp())if(x.f.b(a0.h(0,"video"))&&J.m(a0.h(0,"video"),"facingMode")!=null)J.iM(a0.h(0,"video"),"facingMode")
a0.cQ(0,"video",new B.aTs())
a0.cQ(0,"audio",new B.aTt())}catch(a1){A.t2("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(x.P.b(a0.h(0,"audio"))){h=x.z
h=A.ha(a0.h(0,"audio"),h,h).aC(0,"optional")&&x.F.b(J.m(a0.h(0,"audio"),"optional"))}else h=!1
if(h){r=J.m(a0.h(0,"audio"),"optional")
q=A.C(x.N,x.z)
J.hw(r,new B.aTu(q))
J.iM(a0.h(0,"audio"),"optional")
J.jA(a0.h(0,"audio"),q)}}catch(a1){p=A.M(a1)
o=A.bx(a1)
A.t2("[getUserMedia] failed to translate optional audio constraints, "+A.u(p)+", "+A.u(o))}h=self
n=h.window.navigator.mediaDevices
g=x.m
w=n.getUserMedia!=null?7:9
break
case 7:m=A.c7(a0)
w=10
return A.e(A.dN(n.getUserMedia(g.a(m)),g),$async$B8)
case 10:l=a3
u=new B.pi(l,"local")
w=1
break
w=8
break
case 9:h=h.window.navigator.mediaDevices
f=a0.h(0,"audio")
w=11
return A.e(A.dN(h.getUserMedia({video:a0.h(0,"video"),audio:f}),g),$async$B8)
case 11:k=a3
u=new B.pi(k,"local")
w=1
break
case 8:t=2
w=6
break
case 4:t=3
e=s
j=A.M(e)
h=J.l(j)
throw A.p("Unable to getUserMedia: "+h)
w=6
break
case 3:w=2
break
case 6:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$B8,v)},
Gu(d){return this.ayT(d)},
ayT(d){var w=0,v=A.k(x.E),u,t=2,s,r,q,p,o,n,m,l,k,j,i
var $async$Gu=A.f(function(e,f){if(e===1){s=f
w=t}while(true)switch(w){case 0:t=4
m=self
r=m.window.navigator.mediaDevices
w=r.getDisplayMedia!=null?7:9
break
case 7:q=A.c7(d)
m=x.m
w=10
return A.e(A.dN(r.getDisplayMedia(m.a(q)),m),$async$Gu)
case 10:p=f
u=new B.pi(p,"local")
w=1
break
w=8
break
case 9:m=m.window.navigator.mediaDevices
l=x.N
l=A.c7(A.a2(["mediaSource","screen"],l,l))
l.toString
k=d.h(0,"audio")
if(k==null)k=!1
w=11
return A.e(A.dN(m.getUserMedia({video:l,audio:k}),x.m),$async$Gu)
case 11:o=f
u=new B.pi(o,"local")
w=1
break
case 8:t=2
w=6
break
case 4:t=3
i=s
n=A.M(i)
m=J.l(n)
throw A.p("Unable to getDisplayMedia: "+m)
w=6
break
case 3:w=2
break
case 6:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$Gu,v)}}
B.aeX.prototype={
aHM(d,e){var w=this,v=w.at
v===$&&A.d()
v.addEventListener("datachannel",A.c6(new B.aYN(w)))
v.addEventListener("icecandidate",A.c6(new B.aYO(w)))
v.addEventListener("iceconnectionstatechange",A.c6(new B.aYP(w)))
v.onicegatheringstatechange=A.c6(new B.aYQ(w))
v.addEventListener("signalingstatechange",A.c6(new B.aYR(w)))
if(!$.ck_())v.addEventListener("connectionstatechange",A.c6(new B.aYS(w)))
v.addEventListener("negotiationneeded",A.c6(new B.aYT(w)))
v.addEventListener("track",A.c6(new B.aYU(w)))},
Wf(d){var w=0,v=A.k(x.v),u,t=this,s,r
var $async$Wf=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:r=t.at
r===$&&A.d()
w=3
return A.e(A.dN(r.createOffer(x.m.a(A.c7(A.C(x.N,x.z)))),x.A),$async$Wf)
case 3:s=f
u=new B.Eg(s.sdp,s.type)
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$Wf,v)},
Wc(d){var w=0,v=A.k(x.v),u,t=this,s,r
var $async$Wc=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:r=t.at
r===$&&A.d()
w=3
return A.e(A.dN(r.createAnswer(x.m.a(A.c7(A.C(x.N,x.z)))),x.A),$async$Wc)
case 3:s=f
u=new B.Eg(s.sdp,s.type)
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$Wc,v)},
GX(d,e){return this.aAu(0,e)},
aAu(d,e){var w=0,v=A.k(x.H),u=this,t
var $async$GX=A.f(function(f,g){if(f===1)return A.h(g,v)
while(true)switch(w){case 0:t=u.at
t===$&&A.d()
w=2
return A.e(A.dN(t.setLocalDescription({type:e.b,sdp:e.a}),x.X),$async$GX)
case 2:return A.i(null,v)}})
return A.j($async$GX,v)},
H_(d,e){return this.aAL(0,e)},
aAL(d,e){var w=0,v=A.k(x.H),u=this,t
var $async$H_=A.f(function(f,g){if(f===1)return A.h(g,v)
while(true)switch(w){case 0:t=u.at
t===$&&A.d()
w=2
return A.e(A.dN(t.setRemoteDescription({type:e.b,sdp:e.a}),x.X),$async$H_)
case 2:return A.i(null,v)}})
return A.j($async$H_,v)},
Vd(d){return this.beG(d)},
beG(d){var w=0,v=A.k(x.H),u=this,t,s
var $async$Vd=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:s=u.at
s===$&&A.d()
t=d.b
t.toString
w=2
return A.e(A.dN(s.addIceCandidate({candidate:d.a,sdpMid:t,sdpMLineIndex:d.c}),x.X),$async$Vd)
case 2:return A.i(null,v)}})
return A.j($async$Vd,v)},
P3(d){var w=0,v=A.k(x.J),u,t=this,s,r,q
var $async$P3=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:q=t.at
q===$&&A.d()
w=3
return A.e(A.dN(q.getStats(),x.m),$async$P3)
case 3:s=f
r=A.a([],x.o)
s.forEach.apply(s,[A.aw_(new B.aYV(r))])
u=r
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$P3,v)},
aa(d){var w=0,v=A.k(x.H),u,t=this,s
var $async$aa=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:s=t.at
s===$&&A.d()
s.close()
u=A.d9(null,x.H)
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$aa,v)},
Vo(d,e,f){return this.beV(0,e,f)},
beV(d,e,f){var w=0,v=A.k(x.e),u,t=this,s
var $async$Vo=A.f(function(g,h){if(g===1)return A.h(h,v)
while(true)switch(w){case 0:s=t.at
s===$&&A.d()
u=new B.aeZ(s.addTrack(e.d,f.e))
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$Vo,v)}}
B.aeZ.prototype={
ZI(d){return this.bsU(d)},
bsU(d){var w=0,v=A.k(x.H),u=this,t,s,r,q
var $async$ZI=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:try{t=d
r=t.d
u.a.replaceTrack(r)}catch(p){r=A.M(p)
if(x.L.b(r)){s=r
throw A.p("Unable to RTCRtpSender::replaceTrack: "+J.l(s))}else throw p}return A.i(null,v)}})
return A.j($async$ZI,v)},
GZ(d){return this.aAC(d)},
aAC(d){var w=0,v=A.k(x.y),u,t=2,s,r=this,q,p,o,n,m,l,k
var $async$GZ=A.f(function(e,f){if(e===1){s=f
w=t}while(true)switch(w){case 0:t=4
o=r.a
q=o.getParameters()
n=d.d
m=A.Y(n).i("af<1,ah<o,@>>")
m=A.c7(A.G(new A.af(n,new B.aZ_(),m),!0,m.i("aD.E")))
n=m==null?A.c7([]):m
q.encodings=x.r.a(n)
w=7
return A.e(A.dN(o.setParameters(q),x.X),$async$GZ)
case 7:w=8
return A.e(A.d9(!0,x.y),$async$GZ)
case 8:o=f
u=o
w=1
break
t=2
w=6
break
case 4:t=3
k=s
o=A.M(k)
if(x.L.b(o)){p=o
throw A.p("Unable to RTCRtpSender::setParameters: "+J.l(p))}else throw k
w=6
break
case 3:w=2
break
case 6:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$GZ,v)}}
B.cgZ.prototype={
b2(d){var w=0,v=A.k(x.H),u=this,t,s,r
var $async$b2=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:try{u.a.stop()}catch(q){r=A.M(q)
if(x.L.b(r)){t=r
r=t
J.l(r)
throw A.p("Unable to RTCRtpTransceiver::stop: "+A.u(r))}else throw q}return A.i(null,v)}})
return A.j($async$b2,v)}}
B.UW.prototype={
savz(d,e){var w
if(this.ax===e)return
this.ax=e
w=this.F1()
if(w!=null)w.style.objectFit=e},
apf(){var w=this,v=w.F1(),u=w.a,t=v==null,s=t?null:v.videoWidth
if(s==null)s=0
t=t?null:v.videoHeight
if(t==null)t=0
w.sn(0,u.asd(t,w.z!=null,0,s))},
sBk(d,e){var w,v,u,t,s=this
if(e==null){w=s.F1()
if(w!=null)w.srcObject=null
w=s.w
if(w!=null)w.srcObject=null
s.z=null
return}s.z=e
if(e.rK(0).length!==0){s.x=new self.MediaStream()
w=s.z.e.getVideoTracks()
w=J.ap(x.l.b(w)?w:new A.dB(w,A.Y(w).i("dB<1,aF>")))
for(;w.B();){v=w.gJ(w)
s.x.addTrack(v)}}if(e.OU(0).length!==0){s.y=new self.MediaStream()
w=s.z.e.getAudioTracks()
w=J.ap(x.l.b(w)?w:new A.dB(w,A.Y(w).i("dB<1,aF>")))
for(;w.B();){v=w.gJ(w)
s.y.addTrack(v)}}if(s.y!=null){if(s.w==null){u=self.document.createElement("audio")
u.id="audio_"+("RTCVideoRenderer-"+s.Q)
u.muted=e.b==="local"
u.autoplay=!0
s.w=u
w=s.aRq()
v=s.w
v.toString
w.append(v)}w=s.w
if(w!=null)w.srcObject=s.y}t=s.F1()
if(t!=null){t.srcObject=s.x
w=s.F1()
w.toString
s.aeH(w)}s.sn(0,s.a.bh8(s.z!=null))},
aRq(){var w,v=self,u=v.document.getElementById("html_webrtc_audio_manager_list")
if(u!=null)return u
w=v.document.createElement("div")
w.id="html_webrtc_audio_manager_list"
w.style.display="none"
v=v.document.body
if(v!=null)v.append(w)
return w},
F1(){var w=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(w!=null)return w
return null},
m(){var w=0,v=A.k(x.H),u,t=this,s,r,q,p,o
var $async$m=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:t.z=null
for(s=t.at,r=s.length,q=0;q<s.length;s.length===r||(0,A.R)(s),++q)s[q].X(0)
p=t.F1()
s=p==null
if(!s)p.removeAttribute("src")
if(!s)p.load()
s=t.w
if(s!=null)s.remove()
o=self.document.getElementById("html_webrtc_audio_manager_list")
if(o!=null&&!o.hasChildNodes())o.remove()
u=t.eY()
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$m,v)},
jU(d){var w=0,v=A.k(x.H),u=this
var $async$jU=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:$.OS()
$.t4().xi("RTCVideoRenderer-"+u.Q,new B.aZ5(u),!0)
return A.i(null,v)}})
return A.j($async$jU,v)},
aeH(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.UY.prototype={
O(){return new B.UZ()}}
B.UZ.prototype={
S(){var w,v,u=this
u.W()
u.a.c.aj(0,u.gb2p())
w=u.a
v=w.c
v.as=w.e
v.savz(0,w.d===D.va?"contain":"cover")},
b2q(){if(this.c!=null)this.k(new B.aZ6())},
m(){if(this.c!=null)this.a2()},
aV(d){var w,v
this.bg(d)
A.dl(A.cU(0,0,10,0,0),new B.aZ8(this))
w=this.a
v=w.c
v.savz(0,w.d===D.va?"contain":"cover")},
D(d){return new A.iV(new B.aZ7(this),null)}}
B.abg.prototype={
aHj(d,e,f,g){var w=this,v=$.aI
w.a!==$&&A.aN()
w.a=new B.a0l(d,w,new A.bg(new A.aB(v,x.c),x.u),e,g.i("a0l<0>"))
if(f.a.gje())f.a=new B.WB(g.i("@<0>").cc(g).i("WB<1,2>")).hO(f.a)
v=A.hd(null,new B.aMo(f,w),null,!0,g)
w.b!==$&&A.aN()
w.b=v},
alr(){var w,v
this.d=!0
w=this.c
if(w!=null)w.X(0)
v=this.b
v===$&&A.d()
v.aa(0)}}
B.a0l.prototype={
E(d,e){if(this.e)throw A.p(A.am("Cannot add event after closing."))
if(this.d)return
this.a.a.E(0,e)},
dC(d,e){if(this.e)throw A.p(A.am("Cannot add event after closing."))
if(this.d)return
this.aUr(d,e)},
ia(d){return this.dC(d,null)},
aUr(d,e){var w=this
if(w.w){w.a.a.dC(d,e)
return}w.c.hn(d,e)
w.als()
w.b.alr()
w.a.a.aa(0).fT(new B.bAl())},
aa(d){var w=this
if(w.e)return w.c.a
w.e=!0
if(!w.d){w.b.alr()
w.c.cJ(0,w.a.a.aa(0))}return w.c.a},
als(){this.d=!0
var w=this.c
if((w.a.a&30)===0)w.dW(0)
return},
$ie6:1}
B.ahl.prototype={}
B.ahm.prototype={}
B.Ba.prototype={
agg(d,e){var w=this.b
if((w.b&4)!==0)return
w.E(0,new B.Ht(d,e))
w.aa(0)},
acj(d){var w
if((this.b.b&4)!==0)throw A.p(B.chE())
w=A.c7(d)
w.toString
this.a.send(w)},
zl(d,e,f){return this.bgq(0,e,f)},
bgq(d,e,f){var w=0,v=A.k(x.H),u=this,t
var $async$zl=A.f(function(g,h){if(g===1)return A.h(h,v)
while(true)switch(w){case 0:t=u.b
if((t.b&4)!==0)throw A.p(B.chE())
t.aa(0)
u.a.close()
return A.i(null,v)}})
return A.j($async$zl,v)},
$ichD:1}
B.v5.prototype={}
B.LO.prototype={
p(d,e){if(e==null)return!1
return e instanceof B.LO&&e.a===this.a},
gI(d){return C.d.gI(this.a)}}
B.H2.prototype={
p(d,e){var w,v,u,t
if(e==null)return!1
if(e instanceof B.H2&&e.a.length===this.a.length){for(w=this.a,v=w.length,u=e.a,t=0;t<v;++t)if(u[t]!==w[t])return!1
return!0}return!1},
gI(d){return A.hD(this.a)},
l(d){return"BinaryDataReceived("+A.u(this.a)+")"}}
B.Ht.prototype={
p(d,e){if(e==null)return!1
return e instanceof B.Ht&&e.a===this.a&&e.b===this.b},
gI(d){return A.hD([this.a,this.b])},
l(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.Mn.prototype={
l(d){var w=this.a
if(w.length===0)return"WebSocketException"
else return"WebSocketException: "+w},
$ibT:1}
B.Mm.prototype={
l(d){var w=this.a
if(w.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+w}}
B.axO.prototype={
gkL(){var w,v=this,u=v.w
if(u===$){w=v.r.b
w===$&&A.d()
w=w.a
w===$&&A.d()
u!==$&&A.b4()
u=v.w=new B.auf(v,w)}return u},
aH1(d){d.ft(0,new B.axS(this),new B.axT(this),x.a)}}
B.auf.prototype={
aa(d){var w=this.b
w.e=w.d=null
return this.aCr(0)}}
B.aiG.prototype={
l(d){return"WebSocketChannelException: "+this.a},
$ibT:1}
B.yV.prototype={
P(){return"RTCSignalingState."+this.b}}
B.US.prototype={
P(){return"RTCIceGatheringState."+this.b}}
B.yT.prototype={
P(){return"RTCPeerConnectionState."+this.b}}
B.oe.prototype={
P(){return"RTCIceConnectionState."+this.b}}
B.af_.prototype={
P(){return"RTCVideoViewObjectFit."+this.b}}
B.yU.prototype={
P(){return"RTCPriorityType."+this.b}}
B.aYK.prototype={}
B.Tm.prototype={}
B.JC.prototype={
l(d){var w=this.d
return"Track(id: "+A.u(w.id)+", kind: "+A.u(w.kind)+", label: "+A.u(w.label)+", enabled: "+A.u(w.enabled)+", muted: "+A.u(w.muted)+")"}}
B.aTq.prototype={}
B.Kt.prototype={}
B.UT.prototype={}
B.cgY.prototype={}
B.aeY.prototype={}
B.Ku.prototype={}
B.Ks.prototype={}
B.aYW.prototype={}
B.UU.prototype={}
B.aZ0.prototype={}
B.Eg.prototype={}
B.X_.prototype={}
B.UV.prototype={}
B.UX.prototype={
asd(d,e,f,g){var w=g==null?this.a:g,v=d==null?this.b:d,u=f==null?this.c:f
return new B.UX(w,v,u)},
bh8(d){return this.asd(null,d,null,null)},
l(d){var w=this
return A.ad(w).l(0)+"(width: "+A.u(w.a)+", height: "+A.u(w.b)+", rotation: "+w.c+")"}}
var z=a.updateTypes(["av<~>()","~()","~(Ln)","bA(Kt)","bA(UV)","bA(oe)","~(@)","pi(@)","Ks(aF)","ah<o,@>(Ku)","bA(chD)","~(v5)"])
B.b3J.prototype={
$0(){return J.cDh(this.a.bl())},
$S:1}
B.b3K.prototype={
$1(d){var w,v,u,t
try{this.b.E(0,this.a.$ti.y[1].a(d))}catch(u){t=A.M(u)
if(x.i.b(t)){w=t
v=A.bx(u)
this.b.dC(w,v)}else throw u}},
$S(){return this.a.$ti.i("~(1)")}}
B.caQ.prototype={
$1(d){var w,v,u,t=$.K().b
if(t==null||t.length===0)return
w=self
v=new w.Headers()
v.set("Authorization","Bearer "+A.u(t))
v.set("Content-Type","application/json")
u=x.N
w.window.fetch("https://connexion-prophetique.onrender.com/messagerie/appels/"+this.a+"/signaux",{method:"POST",headers:v,body:C.Y.dv(A.a2(["type","termine","contenu",A.C(u,x.z)],u,x.K),null),keepalive:!0})},
$S:23}
B.caP.prototype={
$0(){return self.window.removeEventListener("beforeunload",this.a)},
$S:0}
B.aA4.prototype={
$1(d){if(d==null)return null
return A.bS(J.l(d))},
$S:117}
B.bvc.prototype={
$0(){var w=this.a
if(w.c!=null&&!w.e)w.K1(!0)},
$S:0}
B.bvd.prototype={
$1(d){return this.a.V1()},
$S:27}
B.bv9.prototype={
$0(){var w=this.a.c
if(w!=null)A.a1(w,!1).bH()},
$S:0}
B.bva.prototype={
$0(){return this.a.e=!0},
$S:0}
B.bv6.prototype={
$0(){var w=this.a
w.d=!1
w.e=!0},
$S:0}
B.bv7.prototype={
$0(){return this.a.d=!1},
$S:0}
B.bv8.prototype={
$0(){var w=this.a
w.d=!1
w.e=!0},
$S:0}
B.bv3.prototype={
$0(){return this.a.f=!0},
$S:0}
B.bv4.prototype={
$0(){return this.a.f=!1},
$S:0}
B.bv5.prototype={
$1(d){var w=null,v=this.a.a,u=v.c,t=v.e,s=v.d
return B.cfu(v.w,w,u,v.y,s,w,w,w,!1,t)},
$S:1203}
B.bvb.prototype={
$0(){return this.a.b6z()},
$S:0}
B.bv2.prototype={
$0(){var w=this.a
if(w.c!=null)w.k(new B.bv1())},
$S:0}
B.bv1.prototype={
$0(){},
$S:0}
B.buP.prototype={
$1(d){this.a.yk("candidat_ice",d,!1)},
$S:240}
B.buQ.prototype={
$0(){var w=this.a
if(w.c!=null)w.k(new B.buO(w))},
$S:0}
B.buO.prototype={
$0(){return this.a.go=!0},
$S:0}
B.buR.prototype={
$0(){this.a.mG(A.b("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.buS.prototype={
$0(){},
$S:0}
B.buT.prototype={
$1(d){var w=this.a,v=w.ch
if(w.c!=null&&v!=null&&w.x)w.k(new B.buN(w,v))},
$S:27}
B.buN.prototype={
$0(){return this.a.CW=new A.au(Date.now(),0,!1).ev(this.b)},
$S:0}
B.buU.prototype={
$1(d){},
$S:126}
B.buV.prototype={
$1(d){this.a.yv()},
$S:27}
B.bus.prototype={
$0(){var w=this.a
if(w.c!=null&&!w.x&&!w.y){if(w.a.f)w.yk("annule",C.bc,!1)
w.mG(A.b("Pas de r\xe9ponse"))}},
$S:0}
B.buv.prototype={
$0(){var w=this.a
w.fy=w.a.d==="video"||w.at?A.b(y.c):A.b(y.d)},
$S:0}
B.buw.prototype={
$1(d){this.a.yk("candidat_ice",d,!1)},
$S:240}
B.bux.prototype={
$0(){var w=this.a
if(w.c!=null)w.k(new B.buu(w))},
$S:0}
B.buu.prototype={
$0(){return this.a.go=!0},
$S:0}
B.buy.prototype={
$0(){this.a.mG(A.b("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.buz.prototype={
$0(){return this.a.z=!0},
$S:0}
B.buA.prototype={
$1(d){var w=this.a,v=w.ch
if(w.c!=null&&v!=null&&w.x)w.k(new B.but(w,v))},
$S:27}
B.but.prototype={
$0(){return this.a.CW=new A.au(Date.now(),0,!1).ev(this.b)},
$S:0}
B.buB.prototype={
$1(d){},
$S:126}
B.buC.prototype={
$1(d){this.a.yv()},
$S:27}
B.buX.prototype={
$1(d){var w=this.a
if(w.c!=null&&!w.y)w.TA()},
$S:32}
B.buY.prototype={
$1(d){this.a.mG(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.buZ.prototype={
$1(d){var w=this.a
if(w.c!=null&&!w.y)w.a2o("offre",d)},
$S:1205}
B.bv_.prototype={
$1(d){this.a.mG(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.buM.prototype={
$0(){return this.a.at=!0},
$S:0}
B.buJ.prototype={
$0(){var w=this.a
w.x=!0
w.ch=new A.au(Date.now(),0,!1)
w.CW=C.R},
$S:0}
B.buK.prototype={
$0(){return this.a.id=!0},
$S:0}
B.buL.prototype={
$1(d){var w=this.a.c
if(w!=null)A.a1(w,!1).bH()},
$S:5}
B.buW.prototype={
$1(d){return A.C(x.N,x.z)},
$S:113}
B.buo.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.bum.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.bun.prototype={
$0(){return this.a.ay=this.b},
$S:0}
B.bur.prototype={
$0(){return this.a.at=!0},
$S:0}
B.bul.prototype={
$1(d){var w=null,v=A.c(A.b("Statistiques de l\u2019appel"),w,w,w,w,C.cX,w,w,w),u=this.a,t=A.dc(A.c(u,w,w,w,w,C.cX,w,w,w),w,C.x,w,w,w,C.ah)
return A.bR(A.a([A.aM(!1,A.c(A.b("Fermer"),w,w,w,w,w,w,w,w),w,w,C.p,w,w,w,w,new B.buj(d),w,w),A.aM(!1,A.c(A.b("Copier"),w,w,w,w,w,w,w,w),w,w,C.p,w,w,w,w,new B.buk(u,d),w,w)],x.p),D.r_,t,v)},
$S:4}
B.buj.prototype={
$0(){return A.a1(this.a,!1).bH()},
$S:0}
B.buk.prototype={
$0(){var w,v,u=null
A.wm(new A.qz(this.a))
w=this.b
A.a1(w,!1).bH()
v=A.b("Statistiques copi\xe9es.")
w.q(x.q).f.v(A.z(u,u,u,u,u,C.h,u,A.c(v,u,u,u,u,u,u,u,u),u,C.l,u,u,u,u,u,u,u,u,u))},
$S:0}
B.bup.prototype={
$0(){},
$S:0}
B.buq.prototype={
$0(){},
$S:0}
B.buE.prototype={
$0(){var w=this.a,v=w.c
v.toString
A.a1(v,!1).bH()
w.HI()},
$S:0}
B.buF.prototype={
$0(){var w=this.a,v=w.c
v.toString
A.a1(v,!1).bH()
w.HJ()},
$S:0}
B.buG.prototype={
$0(){var w=this.a,v=w.c
v.toString
A.a1(v,!1).bH()
w.Hx()},
$S:0}
B.buH.prototype={
$0(){var w=this.a,v=w.c
v.toString
A.a1(v,!1).Yy().aN(0,new B.buD(w),x.H)},
$S:0}
B.buD.prototype={
$1(d){return this.a.amv()},
$S:9}
B.buI.prototype={
$1(d){return A.fs(!0,A.I(this.a,C.n,C.f,C.O),!0,C.a_,!0,!0)},
$S:134}
B.bv0.prototype={
$2(d,e){if(!d)this.a.JX()},
$S:1207}
B.bRf.prototype={
$2(d,e){var w,v,u,t=null,s=this.a,r=s.d
r===$&&A.d()
r=r.x
r===$&&A.d()
s=s.a.e
w=s?0.07:0.04
s=s?0.55:0.35
v=this.b
u=v+20
r=A.crW(A.S(t,t,C.j,t,t,new A.a4(t,t,A.bm(C.t.b3(s*(1-r)),3),t,t,t,C.aJ),t,u,t,t,t,t,t,u),1+w*r)
v+=8
v=A.S(t,t,C.j,t,t,new A.a4(t,t,A.bm(C.t,2),t,t,t,C.aJ),t,v,t,t,t,t,t,v)
e.toString
return A.dX(C.a6,A.a([r,v,e],x.p),C.h,C.aG,t)},
$S:1208}
B.cb6.prototype={
$3(d,e,f){if(e==null)return d+" : inconnu"
if(typeof e=="number")return d+" : "+C.e.aQ(e,1)+f
return d+" : "+A.u(e)+f},
$2(d,e){return this.$3(d,e,"")},
$S:1209}
B.b38.prototype={
$1(d){var w,v=d.a
if(v.length===0)return
w=this.a.f
if(w!=null)w.$1(A.a2(["candidate",v,"sdpMid",d.b,"sdpMLineIndex",d.c],x.N,x.z))},
$S:z+3}
B.b39.prototype={
$1(d){var w=d.b,v=w.length!==0?C.b.gU(w):null
if(v!=null)this.a.aPw(v)
if(d.c.d.kind==="video"){w=this.a.r
if(w!=null)w.$0()}},
$S:z+4}
B.b3a.prototype={
$1(d){var w
if(d===D.OC){w=this.a.w
if(w!=null)w.$0()}},
$S:z+5}
B.b37.prototype={
$0(){var w=this.a
if(w.ay){w.DQ()
w=w.ch
if(w!=null)w.$0()}},
$S:25}
B.aDL.prototype={
$1(d){return this.a.a4t()},
$S:20}
B.aDM.prototype={
$0(){var w=this.a
if(!w.e)w.HA()},
$S:0}
B.cbU.prototype={
$1(d){return d.length!==0},
$S:8}
B.aTG.prototype={
$1(d){return this.a.push(B.cgj(d))},
$S:20}
B.aTH.prototype={
$1(d){return this.a.push(B.cgj(d))},
$S:20}
B.aTD.prototype={
$1(d){var w=this.a.c
if(w!=null)w.$0()},
$S:28}
B.aTE.prototype={
$1(d){},
$S:28}
B.aTF.prototype={
$1(d){},
$S:28}
B.aTs.prototype={
$0(){return!1},
$S:50}
B.aTt.prototype={
$0(){return!1},
$S:50}
B.aTu.prototype={
$1(d){J.hw(d,new B.aTr(this.a))},
$S:240}
B.aTr.prototype={
$2(d,e){this.a.j(0,d,e)},
$S:53}
B.aYN.prototype={
$1(d){},
$S:28}
B.aYO.prototype={
$1(d){var w,v
if(d.candidate!=null){w=this.a.e
if(w!=null){v=d.candidate
w.$1(new B.Kt(v.candidate,v.sdpMid,v.sdpMLineIndex))}}},
$S:28}
B.aYP.prototype={
$1(d){var w,v=this.a,u=v.at
u===$&&A.d()
u=B.cXY(u.iceConnectionState)
v.cx=u
w=v.d
if(w!=null)w.$1(u)
if($.ck_())switch(v.cx.a){case 0:v.cy=D.OH
break
case 1:v.cy=D.OI
break
case 3:v.cy=D.OJ
break
case 5:v.cy=D.OF
break
case 6:v.cy=D.OG
break
case 7:v.cy=D.v8
break
default:break}},
$S:45}
B.aYQ.prototype={
$1(d){var w=this.a,v=w.at
v===$&&A.d()
w.CW=B.cXZ(v.iceGatheringState)},
$S:45}
B.aYR.prototype={
$1(d){var w=this.a,v=w.at
v===$&&A.d()
w.ch=B.d_a(v.signalingState)},
$S:45}
B.aYS.prototype={
$1(d){var w=this.a,v=w.at
v===$&&A.d()
w.cy=B.cZj(v.connectionState)},
$S:45}
B.aYT.prototype={
$1(d){},
$S:45}
B.aYU.prototype={
$1(d){var w,v,u=this.a,t=u.Q
if(t!=null){w=B.cgj(d.track)
v=d.streams
v=x.l.b(v)?v:new A.dB(v,A.Y(v).i("dB<1,aF>"))
u=J.dq(v,new B.aYM(u),x.h)
t.$1(new B.UV(A.G(u,!0,u.$ti.i("aD.E")),w))}},
$S:28}
B.aYM.prototype={
$1(d){return new B.pi(d,this.a.as)},
$S:z+7}
B.aYV.prototype={
$2(d,e){var w,v,u=x.M.a(A.Gw(d)),t=A.C(x.N,x.z)
for(w=u.ge6(u),w=w.gae(w);w.B();){v=w.gJ(w)
t.j(0,J.l(v.a),v.b)}this.a.push(new B.X_(d.type,t))},
$S:1210}
B.aYZ.prototype={
$1(d){var w="id",v=x.f.a(A.Gw(d)),u=J.dv(v)
if(u.aC(v,w))u.j(v,w,C.e.C(A.iH(u.h(v,w))))
u.h(v,"uri")
u.h(v,w)
u.h(v,"encrypted")
return new B.Ks()},
$S:z+8}
B.aYY.prototype={
$1(d){var w,v,u,t,s,r,q,p,o,n=null,m="numTemporalLayers",l="scaleResolutionDownBy",k=A.Gw(d.rid),j=d.active,i=d.maxBitrate
i=i==null?n:A.bp(i)
w=d.maxFramerate
w=w==null?n:A.bp(w)
v=d.minBitrate
v=v==null?n:A.bp(v)
u=d.numTemporalLayers
u=u==null?n:A.bp(u)
t=d.scaleResolutionDownBy
if(t==null)t=n
s=d.ssrc
s=s==null?n:A.bp(s)
r=d.priority
if(r==null)r=n
q=d.networkPriority
if(q==null)q=n
p=d.scalabilityMode
if(p==null)p=n
o=x.z
o=A.a2(["rid",k,"active",j,"maxBitrate",i,"maxFramerate",w,"minBitrate",v,m,u,l,t,"ssrc",s,"priority",r,"networkPriority",q,"scalabilityMode",p],o,o)
p=o.h(0,"rid")
q=o.h(0,"active")
r=o.h(0,"maxBitrate")
s=o.h(0,"maxFramerate")
t=o.h(0,"minBitrate")
u=o.h(0,m)
v=o.h(0,l)
w=o.h(0,"ssrc")
i=o.h(0,"scalabilityMode")
j=B.cx1(o.h(0,"priority"))
k=j==null?D.v9:j
this.a.push(new B.Ku(p,q,r,t,s,u,v,w,i,k,B.cx1(o.h(0,"networkPriority"))))},
$S:20}
B.aYX.prototype={
$1(d){var w,v,u,t,s,r=null,q=d.payloadType,p=d.name
if(p==null)p=r
w=d.kind
if(w==null)w=r
v=d.clockRate
u=d.numChannels
u=u==null?r:A.bp(u)
t=d.parameters
t=t==null?r:A.Gw(t)
s=x.z
s=A.a2(["payloadType",q,"name",p,"kind",w,"clockRate",v,"numChannels",u,"parameters",t],s,s)
s.h(0,"payloadType")
s.h(0,"name")
t=s.h(0,"kind")
s.h(0,"clockRate")
s.h(0,"numChannels")
s.h(0,"parameters")
this.a.push(new B.aeY(t))},
$S:20}
B.aZ_.prototype={
$1(d){var w,v,u=A.C(x.N,x.z)
u.j(0,"active",d.b)
w=d.a
if(w!=null)u.j(0,"rid",w)
w=d.c
if(w!=null)u.j(0,"maxBitrate",w)
w=d.e
if(w!=null)u.j(0,"maxFramerate",w)
w=d.d
if(w!=null)u.j(0,"minBitrate",w)
w=d.f
if(w!=null)u.j(0,"numTemporalLayers",w)
w=d.r
if(w!=null)u.j(0,"scaleResolutionDownBy",w)
w=d.x
if(w!=null)u.j(0,"scalabilityMode",w)
w=d.w
if(w!=null)u.j(0,"ssrc",w)
w=$.cD5()
u.j(0,"priority",w.h(0,d.y))
v=d.z
if(v!=null)u.j(0,"networkPriority",w.h(0,v))
return u},
$S:z+9}
B.cc2.prototype={
$1(d){return J.hI(self.window.navigator.userAgent,A.bE(d,!1,!1))},
$S:8}
B.aZ5.prototype={
$1(d){var w,v,u,t,s
for(w=this.a,v=w.at,u=v.length,t=0;t<v.length;v.length===u||(0,A.R)(v),++t)v[t].X(0)
C.b.a1(v)
s=self.document.createElement("video")
s.autoplay=!0
s.muted=!0
s.controls=!1
s.srcObject=w.x
s.id="video_"+("RTCVideoRenderer-"+w.Q)
s.setAttribute("playsinline","true")
w.aeH(s)
u=x.bU.c
v.push(A.i1(s,"canplay",new B.aZ1(w),!1,u))
v.push(A.i1(s,"resize",new B.aZ2(w),!1,u))
v.push(A.i1(s,"error",new B.aZ3(s),!1,u))
v.push(A.i1(s,"ended",new B.aZ4(),!1,u))
return s},
$S:183}
B.aZ1.prototype={
$1(d){this.a.apf()},
$S:20}
B.aZ2.prototype={
$1(d){this.a.apf()},
$S:20}
B.aZ3.prototype={
$1(d){var w,v,u=this.a.error
A.t2("RTCVideoRenderer: videoElement.onError, "+J.l(u))
u.toString
w=C.JO.h(0,A.ax(u,"code"))
w.toString
v=!J.r(A.ax(u,"message"),"")?A.ax(u,"message"):"No further diagnostic information can be determined or provided."
throw A.p(A.o9(w,C.JN.h(0,A.ax(u,"code")),v,null))},
$S:23}
B.aZ4.prototype={
$1(d){},
$S:20}
B.aZ6.prototype={
$0(){},
$S:0}
B.aZ8.prototype={
$0(){var w=this.a.a
return w.c.as=w.e},
$S:0}
B.aZ7.prototype={
$2(d,e){var w=null,v=this.a.a.c
if(v.z!=null)v=A.aNn("RTCVideoRenderer-"+v.Q)
else v=A.S(w,w,C.j,w,w,w,w,w,w,w,w,w,w,w)
return A.cu(A.S(w,v,C.j,w,w,w,w,e.d,w,w,w,w,w,e.b),w,w)},
$S:1211}
B.aMo.prototype={
$0(){var w,v,u=this.b
if(u.d)return
w=this.a.a
v=u.b
v===$&&A.d()
u.c=w.fM(v.git(v),new B.aMn(u),v.gpF())},
$S:0}
B.aMn.prototype={
$0(){var w=this.a,v=w.a
v===$&&A.d()
v.als()
w=w.b
w===$&&A.d()
w.aa(0)},
$S:0}
B.bAl.prototype={
$1(d){},
$S:17}
B.aCi.prototype={
$1(d){this.a.cJ(0,this.b)},
$S:28}
B.aCj.prototype={
$1(d){var w=this.a
if((w.a.a&30)===0)w.hQ(new B.Mn("Failed to connect WebSocket"))
else this.b.agg(1006,"error")},
$S:28}
B.aCk.prototype={
$1(d){var w,v,u=this.a.b
if((u.b&4)!==0)return
w=d.data
w.toString
v=A.cF("data")
if(typeof w==="string")v.b=new B.LO(A.br(w))
else if(typeof w==="object"&&A.coZ(x.m.a(w),"ArrayBuffer"))v.b=new B.H2(A.TN(x.R.a(w),0,null))
else throw A.p(A.am("unexpected message type: "+J.aL(w).l(0)))
u.E(0,v.bl())},
$S:23}
B.aCl.prototype={
$1(d){var w=this.a
if((w.a.a&30)===0)w.cJ(0,this.b)
this.b.agg(d.code,d.reason)},
$S:28}
B.axS.prototype={
$1(d){var w=d.b,v=this.a
new A.cZ(w,A.x(w).i("cZ<1>")).d3(new B.axP(v))
w=v.r.a
w===$&&A.d()
w=w.b
w===$&&A.d()
new A.cZ(w,A.x(w).i("cZ<1>")).boI(new B.axQ(d),new B.axR(v,d))
v.f.dW(0)},
$S:z+10}
B.axP.prototype={
$1(d){var w,v,u
$label0$0:{w=d instanceof B.LO
v=w?d.a:null
if(w){w=this.a.r.a
w===$&&A.d()
w=w.a
w===$&&A.d()
w.E(0,v)
break $label0$0}w=d instanceof B.H2
u=w?d.a:null
if(w){w=this.a.r.a
w===$&&A.d()
w=w.a
w===$&&A.d()
w.E(0,u)
break $label0$0}if(d instanceof B.Ht){w=this.a.r.a
w===$&&A.d()
w=w.a
w===$&&A.d()
w.aa(0)}}},
$S:z+11}
B.axQ.prototype={
$1(d){var w,v,u,t,s,r,q
try{$label1$1:{w=d
v=null
s=typeof w=="string"
if(s)v=w
if(s){s=this.a
r=v
if((s.b.b&4)!==0)A.aq(B.chE())
r=A.c7(r)
r.toString
s.a.send(r)
break $label1$1}u=null
s=x.k.b(w)
if(s)u=w
if(s){this.a.acj(u)
break $label1$1}t=null
s=x.I.b(w)
if(s)t=w
if(s){this.a.acj(new Uint8Array(A.bZ(t)))
break $label1$1}s=A.aV("Cannot send "+J.aL(d).l(0))
throw A.p(s)}}catch(q){if(!(A.M(q) instanceof B.Mm))throw q}},
$S:18}
B.axR.prototype={
$0(){var w=0,v=A.k(x.H),u=1,t,s=this,r,q,p
var $async$$0=A.f(function(d,e){if(d===1){t=e
w=u}while(true)switch(w){case 0:u=3
r=s.a
w=6
return A.e(s.b.zl(0,r.d,r.e),$async$$0)
case 6:u=1
w=5
break
case 3:u=2
p=t
if(!(A.M(p) instanceof B.Mm))throw p
w=5
break
case 2:w=1
break
case 5:return A.i(null,v)
case 1:return A.h(t,v)}})
return A.j($async$$0,v)},
$S:1}
B.axT.prototype={
$1(d){var w,v=d instanceof A.XF?d:new B.aiG(J.l(d)),u=this.a
u.f.hQ(v)
u=u.r.a
u===$&&A.d()
w=u.a
w===$&&A.d()
w.ia(v)
u=u.a
u===$&&A.d()
u.aa(0)},
$S:45};(function aliases(){var w=B.I4.prototype
w.aCr=w.aa
w=B.a5G.prototype
w.aGg=w.m})();(function installTearOffs(){var w=a._instance_0u,v=a._instance_1u
w(B.a_s.prototype,"gaIv","BJ",0)
var u
v(u=B.a_r.prototype,"gap6","ap7",2)
w(u,"gam9","JX",0)
w(u,"gamu","amv",1)
w(u,"gaeY","Qy",0)
w(u,"gaeX","Qx",0)
w(u,"gaeV","Qv",0)
w(u,"gaeW","HI",0)
w(u,"gaf_","Qz",0)
w(u,"galC","b3j",1)
v(u=B.a8K.prototype,"gb6g","b6h",6)
w(u,"gb4H","a4t",1)
w(B.UW.prototype,"gef","m",0)
w(B.UZ.prototype,"gb2p","b2q",1)})();(function inheritance(){var w=a.mixinHard,v=a.inheritMany,u=a.inherit
v(A.ai,[B.I4,B.aA3,B.Ln,B.a8Y,B.b36,B.a8K,B.acE,B.aYK,B.Tm,B.JC,B.aTq,B.UT,B.UU,B.aZ0,B.ahm,B.a0l,B.ahl,B.Ba,B.v5,B.Mn,B.aiG,B.Kt,B.cgY,B.aeY,B.Ku,B.Ks,B.aYW,B.Eg,B.X_,B.UV,B.UX])
u(B.WB,A.h3)
v(A.kh,[B.b3J,B.caP,B.bvc,B.bv9,B.bva,B.bv6,B.bv7,B.bv8,B.bv3,B.bv4,B.bvb,B.bv2,B.bv1,B.buQ,B.buO,B.buR,B.buS,B.buN,B.bus,B.buv,B.bux,B.buu,B.buy,B.buz,B.but,B.buM,B.buJ,B.buK,B.buo,B.bum,B.bun,B.bur,B.buj,B.buk,B.bup,B.buq,B.buE,B.buF,B.buG,B.buH,B.b37,B.aDM,B.aTs,B.aTt,B.aZ6,B.aZ8,B.aMo,B.aMn,B.axR])
v(A.jH,[B.b3K,B.caQ,B.aA4,B.bvd,B.bv5,B.buP,B.buT,B.buU,B.buV,B.buw,B.buA,B.buB,B.buC,B.buX,B.buY,B.buZ,B.bv_,B.buL,B.buW,B.bul,B.buD,B.buI,B.cb6,B.b38,B.b39,B.b3a,B.aDL,B.cbU,B.aTG,B.aTH,B.aTD,B.aTE,B.aTF,B.aTu,B.aYN,B.aYO,B.aYP,B.aYQ,B.aYR,B.aYS,B.aYT,B.aYU,B.aYM,B.aYZ,B.aYY,B.aYX,B.aZ_,B.cc2,B.aZ5,B.aZ1,B.aZ2,B.aZ3,B.aZ4,B.bAl,B.aCi,B.aCj,B.aCk,B.aCl,B.axS,B.axP,B.axQ,B.axT])
v(A.T,[B.qK,B.qJ,B.NC,B.UY])
v(A.Z,[B.a_s,B.a_r,B.a5G,B.UZ])
v(A.at,[B.YT,B.ako,B.YU,B.zT])
v(A.to,[B.bv0,B.bRf,B.aTr,B.aYV,B.aZ7])
u(B.ap_,B.a5G)
u(B.aYL,B.aYK)
u(B.pi,B.Tm)
u(B.ad6,B.JC)
u(B.Tl,B.aTq)
u(B.aeX,B.UT)
u(B.aeZ,B.UU)
u(B.cgZ,B.aZ0)
u(B.UW,A.dx)
v(B.ahm,[B.abg,B.axO])
v(B.v5,[B.LO,B.H2,B.Ht])
u(B.Mm,B.Mn)
u(B.auf,B.I4)
v(A.MV,[B.yV,B.US,B.yT,B.oe,B.af_,B.yU])
w(B.a5G,A.h2)})()
A.nj(b.typeUniverse,JSON.parse('{"I4":{"e6":["1"]},"WB":{"h3":["1","2"],"h3.S":"1","h3.T":"2"},"NC":{"T":[],"q":[]},"qK":{"T":[],"q":[]},"a_s":{"Z":["qK"]},"YT":{"at":[],"q":[]},"qJ":{"T":[],"q":[]},"a_r":{"Z":["qJ"]},"ako":{"at":[],"q":[]},"YU":{"at":[],"q":[]},"zT":{"at":[],"q":[]},"ap_":{"Z":["NC"]},"pi":{"Tm":[]},"ad6":{"JC":[]},"aeX":{"UT":[]},"aeZ":{"UU":[]},"UW":{"dx":["UX"],"b3":[]},"UY":{"T":[],"q":[]},"UZ":{"Z":["UY"]},"a0l":{"e6":["1"]},"Ba":{"chD":[]},"LO":{"v5":[]},"H2":{"v5":[]},"Ht":{"v5":[]},"Mn":{"bT":[]},"Mm":{"bT":[]},"auf":{"e6":["@"]},"aiG":{"bT":[]}}'))
A.ctk(b.typeUniverse,JSON.parse('{"I4":1,"ahm":1}'))
var y={c:"Micro ou cam\xe9ra refus\xe9 : autorise le micro et la cam\xe9ra dans les r\xe9glages pour appeler en vid\xe9o.",d:"Micro refus\xe9 : autorise le micro dans les r\xe9glages pour appeler."}
var x=(function rtii(){var w=A.aA
return{b:w("Ba"),L:w("bT"),_:w("av<@>"),x:w("av<~>"),T:w("H<ah<o,V>>"),t:w("H<ah<o,@>>"),Q:w("H<JC>"),B:w("H<aeY>"),O:w("H<Ku>"),o:w("H<X_>"),d:w("H<jp<@>>"),s:w("H<o>"),p:w("H<q>"),r:w("H<ai?>"),m:w("aF"),M:w("T_<ai?,ai?>"),l:w("E<aF>"),F:w("E<ah<o,@>>"),J:w("E<X_>"),j:w("E<@>"),I:w("E<v>"),P:w("ah<o,@>"),f:w("ah<@,@>"),E:w("Tm"),G:w("JC"),h:w("pi"),R:w("r0"),a:w("bA"),K:w("ai"),W:w("Ks"),Y:w("UT"),e:w("UU"),v:w("Eg"),Z:w("ahl<ai?>"),N:w("o"),i:w("rz"),k:w("eB"),D:w("v5"),U:w("X<o>"),g:w("du<Ln>"),n:w("du<~>"),V:w("bg<Ba>"),u:w("bg<@>"),w:w("bg<~>"),bU:w("a_C<aF>"),C:w("q1<aF>"),cF:w("aB<Ba>"),c:w("aB<@>"),d4:w("aB<~>"),q:w("kG"),y:w("V"),z:w("@"),S:w("v"),A:w("aF?"),cO:w("ah<o,@>?"),X:w("ai?"),H:w("~")}})();(function constants(){var w=a.makeConstList
D.r_=new A.a_(1,0.10588235294117647,0.17254901960784313,0.25098039215686274,C.w)
D.Zb=new B.a8Y(C.dI)
D.rH=new A.ak(32,0,32,0)
D.a2V=new A.ak(8,20,8,20)
D.a37=new A.cQ(1,C.ar,C.azp,null)
D.Bj=new A.ao(57639,"MaterialIcons",null,!1)
D.a4e=new A.ao(58337,"MaterialIcons",null,!1)
D.a4f=new A.ao(58341,"MaterialIcons",null,!1)
D.a4g=new A.ao(58721,"MaterialIcons",null,!0)
D.a4j=new A.ao(58888,"MaterialIcons",null,!1)
D.Bu=new A.ao(59048,"MaterialIcons",null,!1)
D.a4k=new A.ao(59049,"MaterialIcons",null,!1)
D.a4l=new A.ao(59077,"MaterialIcons",null,!1)
D.Bo=new A.ao(58195,"MaterialIcons",null,!1)
D.a6i=new A.a9(D.Bo,null,C.m,null,null)
D.a6h=new A.a9(D.Bo,28,C.m,null,null)
D.a4n=new A.ao(61044,"MaterialIcons",null,!1)
D.a6x=new A.a9(D.a4n,null,C.m,null,null)
D.Bt=new A.ao(58923,"MaterialIcons",null,!1)
D.a6C=new A.a9(D.Bt,null,C.m,null,null)
D.a6B=new A.a9(D.Bt,20,C.m,null,null)
D.afY=A.a(w([1,2,4,8,16]),A.aA("H<v>"))
D.En=A.a(w([]),x.Q)
D.K3=new A.fT("FlutterWebRTC.Method",C.bi,null)
D.avb=new B.oe(0,"RTCIceConnectionStateNew")
D.avc=new B.oe(1,"RTCIceConnectionStateChecking")
D.avd=new B.oe(2,"RTCIceConnectionStateCompleted")
D.ave=new B.oe(3,"RTCIceConnectionStateConnected")
D.avf=new B.oe(4,"RTCIceConnectionStateCount")
D.OC=new B.oe(5,"RTCIceConnectionStateFailed")
D.avg=new B.oe(6,"RTCIceConnectionStateDisconnected")
D.OD=new B.oe(7,"RTCIceConnectionStateClosed")
D.OE=new B.US(0,"RTCIceGatheringStateNew")
D.avh=new B.US(1,"RTCIceGatheringStateGathering")
D.avi=new B.US(2,"RTCIceGatheringStateComplete")
D.v8=new B.yT(0,"RTCPeerConnectionStateClosed")
D.OF=new B.yT(1,"RTCPeerConnectionStateFailed")
D.OG=new B.yT(2,"RTCPeerConnectionStateDisconnected")
D.OH=new B.yT(3,"RTCPeerConnectionStateNew")
D.OI=new B.yT(4,"RTCPeerConnectionStateConnecting")
D.OJ=new B.yT(5,"RTCPeerConnectionStateConnected")
D.OK=new B.yU(0,"veryLow")
D.v9=new B.yU(1,"low")
D.OL=new B.yU(2,"medium")
D.OM=new B.yU(3,"high")
D.avj=new B.yV(0,"RTCSignalingStateStable")
D.avk=new B.yV(1,"RTCSignalingStateHaveLocalOffer")
D.avl=new B.yV(2,"RTCSignalingStateHaveRemoteOffer")
D.avm=new B.yV(3,"RTCSignalingStateHaveLocalPrAnswer")
D.avn=new B.yV(4,"RTCSignalingStateHaveRemotePrAnswer")
D.ON=new B.yV(5,"RTCSignalingStateClosed")
D.avo=new B.UX(0,0,0)
D.va=new B.af_(0,"RTCVideoViewObjectFitContain")
D.OO=new B.af_(1,"RTCVideoViewObjectFitCover")
D.aza=new A.cj(48,null,null,null)
D.azn=new A.cj(null,64,null,null)
D.aCp=new A.D(!0,C.m,null,null,null,null,26,C.A,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.aCD=new A.D(!0,C.o,null,null,null,null,40,C.A,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.wp=new A.D(!0,C.al,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.ciC=null
$.csm=!1
$.cqt=1
$.d_D=A.a2(["very-low",D.OK,"low",D.v9,"medium",D.OL,"high",D.OM],x.N,A.aA("yU"))})();(function lazyInitializers(){var w=a.lazyFinal
w($,"d5d","ax0",()=>new B.aYL())
w($,"d1P","ck_",()=>C.d.u(A.ax(A.ax(A.ax(A.cjD(),"window"),"navigator"),"userAgent"),"Firefox"))
w($,"daX","cD5",()=>A.a2([D.OK,"very-low",D.v9,"low",D.OL,"medium",D.OM,"high"],A.aA("yU"),x.N))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_1",e:"endPart",h:b})})($__dart_deferred_initializers__,"niyW+zFX4eS41GV5qkZiR3Rz50w=");