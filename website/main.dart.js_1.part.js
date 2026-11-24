((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_1",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={I0:function I0(){},Wy:function Wy(d){this.$ti=d},b3B:function b3B(d){this.a=d},b3C:function b3C(d,e){this.a=d
this.b=e},
cvp(d){var w
B.c8y()
if(d.length===0)return
w=A.c6(new B.cap(d))
self.window.addEventListener("beforeunload",w)
$.cia=new B.cao(w)},
c8y(){var w=$.cia
if(w!=null)w.$0()
$.cia=null},
cap:function cap(d){this.a=d},
cao:function cao(d){this.a=d},
a7f(d){var w,v,u,t,s=new B.azW(),r=J.Q(d),q=r.h(d,"id")
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
return new B.azV(q,w,v,u,t)},
cgJ(d){var w,v,u,t=J.Q(d),s=t.h(d,"contenu"),r=t.h(d,"id")
r=J.l(r==null?"":r)
w=t.h(d,"appel_id")
J.l(w==null?"":w)
w=t.h(d,"emetteur_id")
w=J.l(w==null?"":w)
v=t.h(d,"type")
v=J.l(v==null?"":v)
if(x.P.b(s))u=s
else u=x.f.b(s)?J.mz(s,x.N,x.z):C.bg
if(t.h(d,"cree_le")!=null)A.bU(J.l(t.h(d,"cree_le")))
return new B.Lk(r,w,v,u)},
cET(d){var w,v,u,t,s,r,q=J.Q(d),p=q.h(d,"iceServers")
if(p==null)p=q.h(d,"ice_servers")
if(!x.j.b(p))return D.Z2
w=A.a([],x.t)
for(q=J.ap(p),v=x.f,u=x.P,t=x.N,s=x.z;q.B();){r=q.gJ(q)
if(u.b(r))w.push(r)
else if(v.b(r))w.push(J.mz(r,t,s))}return new B.a8S(w)},
cwg(d){var w=J.Q(d),v=w.h(d,"sdp"),u=w.h(d,"type")
if(typeof v!="string"||v.length===0)return null
w=J.oL(u)
if(!w.p(u,"offer")&&!w.p(u,"answer"))return null
return new A.aq3(v,u)},
cVs(d){var w,v,u=J.Q(d),t=u.h(d,"candidate")
if(typeof t!="string")return null
w=u.h(d,"sdpMid")
v=u.h(d,"sdpMLineIndex")
u=typeof w=="string"?w:null
return new A.aq6(t,A.i0(v)?v:null,u)},
azV:function azV(d,e,f,g,h){var _=this
_.a=d
_.c=e
_.d=f
_.r=g
_.w=h},
azW:function azW(){},
Lk:function Lk(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a8S:function a8S(d){this.a=d},
awd(d){return B.cWq(d)},
cWq(d){var w=0,v=A.k(x.y),u
var $async$awd=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:u=!0
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$awd,v)},
cnm(d,e,f,g,h,i,j){return new B.qI(f,g,j,i,e,d,null)},
cf2(d,e,f,g,h,i,j,k,l,m){return new B.qH(f,m,h,l,i,d,j,k,e,g,null)},
cs9(d,e,f,g,h,i,j,k,l,m,n){return new B.akf(e,g,f,d,n,k,j,i,h,l,m,null)},
cu9(d,e){var w=null
return new A.W(D.rF,A.c(d.toUpperCase(),2,C.a5,w,w,A.be(w,w,C.m,w,w,w,w,w,"Cinzel",w,w,e,w,w,C.A,w,w,!0,w,1.2,w,w,w,w,w,w),C.X,w,w),w)},
qI:function qI(d,e,f,g,h,i,j){var _=this
_.c=d
_.d=e
_.e=f
_.r=g
_.w=h
_.y=i
_.a=j},
a_p:function a_p(){var _=this
_.d=!0
_.f=_.e=!1
_.x=_.w=_.r=null
_.y=$
_.Q=_.z=!1
_.c=_.a=null},
bv2:function bv2(d){this.a=d},
bv3:function bv3(d){this.a=d},
bv_:function bv_(d){this.a=d},
bv0:function bv0(d){this.a=d},
buX:function buX(d){this.a=d},
buY:function buY(d){this.a=d},
buZ:function buZ(d){this.a=d},
buU:function buU(d){this.a=d},
buV:function buV(d){this.a=d},
buW:function buW(d){this.a=d},
bv1:function bv1(d){this.a=d},
YQ:function YQ(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
qH:function qH(d,e,f,g,h,i,j,k,l,m,n){var _=this
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
a_o:function a_o(d,e){var _=this
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
buT:function buT(d){this.a=d},
buS:function buS(){},
buF:function buF(d){this.a=d},
buG:function buG(d){this.a=d},
buE:function buE(d){this.a=d},
buH:function buH(d){this.a=d},
buI:function buI(){},
buJ:function buJ(d){this.a=d},
buD:function buD(d,e){this.a=d
this.b=e},
buK:function buK(){},
buL:function buL(d){this.a=d},
bui:function bui(d){this.a=d},
bul:function bul(d){this.a=d},
bum:function bum(d){this.a=d},
bun:function bun(d){this.a=d},
buk:function buk(d){this.a=d},
buo:function buo(d){this.a=d},
bup:function bup(d){this.a=d},
buq:function buq(d){this.a=d},
buj:function buj(d,e){this.a=d
this.b=e},
bur:function bur(){},
bus:function bus(d){this.a=d},
buN:function buN(d){this.a=d},
buO:function buO(d){this.a=d},
buP:function buP(d){this.a=d},
buQ:function buQ(d){this.a=d},
buC:function buC(d){this.a=d},
buz:function buz(d,e){this.a=d
this.b=e},
buA:function buA(d){this.a=d},
buB:function buB(d){this.a=d},
buM:function buM(){},
bue:function bue(d,e){this.a=d
this.b=e},
buc:function buc(d,e){this.a=d
this.b=e},
bud:function bud(d,e){this.a=d
this.b=e},
buh:function buh(d){this.a=d},
bub:function bub(d){this.a=d},
bu9:function bu9(d){this.a=d},
bua:function bua(d,e){this.a=d
this.b=e},
buf:function buf(){},
bug:function bug(){},
buu:function buu(d){this.a=d},
buv:function buv(d){this.a=d},
buw:function buw(d){this.a=d},
bux:function bux(d){this.a=d},
but:function but(d){this.a=d},
buy:function buy(d){this.a=d},
buR:function buR(d){this.a=d},
akf:function akf(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
YR:function YR(d,e){this.c=d
this.a=e},
zP:function zP(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
Nz:function Nz(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
aoR:function aoR(d,e){var _=this
_.d=$
_.eJ$=d
_.bS$=e
_.c=_.a=null},
bQP:function bQP(d,e){this.a=d
this.b=e},
a5B:function a5B(){},
cZb(a4,a5){var w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0=null,a1="kind",a2="video",a3="packetsLost"
for(w=J.ap(a4),v=a0,u=v,t=u,s=t,r=s,q=r,p=q,o=p,n=o,m=n,l=m;w.B();){k=w.gJ(w)
j=k.d
k=k.b
if(k==="codec"){k=j.h(0,"mimeType")
i=J.l(k==null?"":k)
if(C.d.bQ(i,"video/"))l=C.d.cj(i,6)}else if(k==="outbound-rtp"&&J.r(j.h(0,a1),a2)){k=A.bh(j.h(0,"bytesSent"))
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
cvw(d){var w=new B.caG(),v=J.Q(d),u=v.h(d,"largeur")!=null&&v.h(d,"hauteur")!=null?A.u(v.h(d,"largeur"))+"x"+A.u(v.h(d,"hauteur")):null
return C.b.az(A.a([w.$2("Codec vid\xe9o",v.h(d,"codecVideo")),w.$3("D\xe9bit sortant",v.h(d,"debitSortantKbitS")," kbit/s"),w.$2("Paquets envoy\xe9s",v.h(d,"paquetsEnvoyes")),w.$2("Paquets perdus (envoi)",v.h(d,"paquetsPerdusEnvoi")),w.$2("Paquets perdus (r\xe9ception)",v.h(d,"paquetsPerdusReception")),w.$3("Gigue (envoi)",v.h(d,"gigueEnvoiMs")," ms"),w.$3("Gigue (r\xe9ception)",v.h(d,"gigueReceptionMs")," ms"),w.$3("Aller-retour",v.h(d,"allerRetourMs")," ms"),w.$2("Images par seconde",v.h(d,"imagesParSeconde")),w.$2("R\xe9solution envoy\xe9e",u)],x.s),"\n")},
caG:function caG(){},
b2Y:function b2Y(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.y=_.x=!1
_.ax=_.at=_.as=_.Q=_.z=null
_.ay=!1
_.ch=null
_.CW=!1},
b3_:function b3_(d){this.a=d},
b30:function b30(d){this.a=d},
b31:function b31(d){this.a=d},
b2Z:function b2Z(d){this.a=d},
a8E:function a8E(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.y=_.x=null},
aDC:function aDC(d){this.a=d},
aDD:function aDD(d){this.a=d},
cbs(d){var w=x.U,v=A.G(new A.X(A.a(d.split(" "),x.s),new B.cbt(),w),!0,w.i("w.E"))
w=v.length
if(w===0)return"?"
if(w===1)return J.m(C.b.gU(v),0).toUpperCase()
return(J.m(C.b.gU(v),0)+J.m(C.b.gaY(v),0)).toUpperCase()},
cbt:function cbt(){},
acy:function acy(){this.a=null},
aYC:function aYC(){},
ph:function ph(d,e){this.e=d
this.b=e},
aTx:function aTx(d){this.a=d},
aTy:function aTy(d){this.a=d},
cfS(d){var w=new B.ad0(d)
w.aHv(d)
return w},
ad0:function ad0(d){this.d=d
this.c=null},
aTu:function aTu(d){this.a=d},
aTv:function aTv(d){this.a=d},
aTw:function aTw(d){this.a=d},
Tj:function Tj(){},
aTj:function aTj(){},
aTk:function aTk(){},
aTl:function aTl(d){this.a=d},
aTi:function aTi(d){this.a=d},
cKW(d,e){var w=x.N
w=new B.aeR(d,e,A.C(w,x.E),A.C(w,x.z))
w.aHF(d,e)
return w},
aeR:function aeR(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aYE:function aYE(d){this.a=d},
aYF:function aYF(d){this.a=d},
aYG:function aYG(d){this.a=d},
aYH:function aYH(d){this.a=d},
aYI:function aYI(d){this.a=d},
aYJ:function aYJ(d){this.a=d},
aYK:function aYK(d){this.a=d},
aYL:function aYL(d){this.a=d},
aYD:function aYD(d){this.a=d},
aYM:function aYM(d){this.a=d},
cKZ(d){var w=d.headerExtensions
w=x.l.b(w)?w:new A.dB(w,A.Y(w).i("dB<1,aF>"))
w=J.dq(w,new B.aYQ(),x.W)
return A.G(w,!0,w.$ti.i("aD.E"))},
cKY(d){var w,v
if("encodings" in d)w=d.encodings
else w=[]
v=A.a([],x.O)
C.b.aG(w,new B.aYP(v))
return v},
cKX(d){var w,v
if("codecs" in d)w=d.codecs
else w=[]
v=A.a([],x.B)
C.b.aG(w,new B.aYO(v))
return v},
aYQ:function aYQ(){},
aYP:function aYP(d){this.a=d},
aYO:function aYO(d){this.a=d},
aeT:function aeT(d){this.a=d},
aYR:function aYR(){},
cgx:function cgx(d){this.a=d},
cXX(){return C.b.nQ(A.a(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],x.s),new B.cbC())!==-1},
cbC:function cbC(){},
cq0(){var w=A.a([],x.d),v=$.cq1
$.cq1=v+1
return new B.UT(v,w,D.avi,$.ae())},
UT:function UT(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.db$=0
_.dx$=g
_.fr$=_.dy$=0},
aYX:function aYX(d){this.a=d},
aYT:function aYT(d){this.a=d},
aYU:function aYU(d){this.a=d},
aYV:function aYV(d){this.a=d},
aYW:function aYW(){},
cgy(d,e,f){return new B.UV(d,f,e,null)},
UV:function UV(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
UW:function UW(){this.c=this.a=null},
aYY:function aYY(){},
aZ_:function aZ_(d){this.a=d},
aYZ:function aYZ(d){this.a=d},
co_(d,e,f,g){var w,v={}
v.a=d
w=new B.aba(g.i("aba<0>"))
w.aHc(e,f,v,g)
return w},
aba:function aba(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
aMf:function aMf(d,e){this.a=d
this.b=e},
aMe:function aMe(d){this.a=d},
a0i:function a0i(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bAb:function bAb(){},
ahe:function ahe(d){this.b=this.a=$
this.$ti=d},
ahf:function ahf(){},
ceo(d,e){return B.cE5(d,e)},
cE5(d,e){var w=0,v=A.k(x.b),u,t,s,r,q,p,o
var $async$ceo=A.f(function(f,g){if(f===1)return A.h(g,v)
while(true)switch(w){case 0:if(!d.q4("ws")&&!d.q4("wss"))throw A.p(A.hg(d,"url","only ws: and wss: schemes are supported"))
t=self
s=t.WebSocket
r=d.l(0)
t=new t.Array()
q=new s(r,t)
q.binaryType="arraybuffer"
p=new B.B7(q,A.hd(null,null,null,!1,x.D))
t=new A.aB($.aI,x.cF)
o=new A.bg(t,x.V)
if(J.r(q.readyState,1))o.cJ(0,p)
else if(J.r(q.readyState,2)||J.r(q.readyState,3))o.hQ(new B.Mk("Unexpected WebSocket state: "+A.u(q.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.q0(q,"open",!1,x.C).gU(0).aN(0,new B.aC9(o,p),x.H)
s=x.C
r=x.H
new A.q0(q,"error",!1,s).gU(0).aN(0,new B.aCa(o,p),r)
A.i_(q,"message",new B.aCb(p),!1,x.m)
new A.q0(q,"close",!1,s).gU(0).aN(0,new B.aCc(o,p),r)
u=t
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$ceo,v)},
B7:function B7(d,e){this.a=d
this.b=e},
aC9:function aC9(d,e){this.a=d
this.b=e},
aCa:function aCa(d,e){this.a=d
this.b=e},
aCb:function aCb(d){this.a=d},
aCc:function aCc(d,e){this.a=d
this.b=e},
chc(){return new B.Mj("Connection Closed")},
v5:function v5(){},
LL:function LL(d){this.a=d},
GZ:function GZ(d){this.a=d},
Hp:function Hp(d,e){this.a=d
this.b=e},
Mk:function Mk(d){this.a=d},
Mj:function Mj(d){this.a=d},
cDC(d){var w=null,v=$.aI,u=new B.ahe(x.Z),t=x.X,s=A.hd(w,w,w,!0,t),r=A.hd(w,w,w,!0,t),q=A.x(r),p=A.x(s)
u.a=B.co_(new A.cZ(r,q.i("cZ<1>")),new A.G8(s,p.i("G8<1>")),!0,t)
u.b=B.co_(new A.cZ(s,p.i("cZ<1>")),new A.G8(r,q.i("G8<1>")),!1,t)
u=new B.axF(new A.bg(new A.aB(v,x.d4),x.w),u)
u.aGV(d)
return u},
axF:function axF(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
axJ:function axJ(d){this.a=d},
axG:function axG(d){this.a=d},
axH:function axH(d){this.a=d},
axI:function axI(d,e){this.a=d
this.b=e},
axK:function axK(d){this.a=d},
au5:function au5(d,e){this.b=d
this.a=e},
aiz:function aiz(d){this.a=d},
cXv(d){switch(d){case"new":return D.av5
case"checking":return D.av6
case"connected":return D.av8
case"completed":return D.av7
case"failed":return D.Ou
case"disconnected":return D.ava
case"closed":return D.Ov
case"count":return D.av9}return D.Ov},
cXw(d){switch(d){case"new":return D.Ow
case"gathering":return D.avb
case"complete":return D.avc}return D.Ow},
cZG(d){switch(d){case"stable":return D.avd
case"have-local-offer":return D.ave
case"have-local-pranswer":return D.avg
case"have-remote-offer":return D.avf
case"have-remote-pranswer":return D.avh
case"closed":return D.OF}return D.OF},
cYP(d){switch(d){case"new":return D.Oz
case"connecting":return D.OA
case"connected":return D.OB
case"closed":return D.v6
case"disconnected":return D.Oy
case"failed":return D.Ox}return D.v6},
cwA(d){if(d==null)return null
return $.d_8.h(0,d)},
yR:function yR(d,e){this.a=d
this.b=e},
UP:function UP(d,e){this.a=d
this.b=e},
yP:function yP(d,e){this.a=d
this.b=e},
oe:function oe(d,e){this.a=d
this.b=e},
aeU:function aeU(d,e){this.a=d
this.b=e},
yQ:function yQ(d,e){this.a=d
this.b=e},
aYB:function aYB(){},
Tk:function Tk(){},
Jz:function Jz(){},
aTh:function aTh(){},
Kq:function Kq(d,e,f){this.a=d
this.b=e
this.c=f},
UQ:function UQ(){},
cgw:function cgw(){},
aeS:function aeS(d){this.c=d},
Kr:function Kr(d,e,f,g,h,i,j,k,l,m,n){var _=this
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
Kp:function Kp(){},
aYN:function aYN(d){this.d=d},
UR:function UR(){},
aYS:function aYS(){},
Ed:function Ed(d,e){this.a=d
this.b=e},
WX:function WX(d,e){this.b=d
this.d=e},
US:function US(d,e){this.b=d
this.c=e},
UU:function UU(d,e,f){this.a=d
this.b=e
this.c=f},
ciA(){var w=0,v=A.k(x.H),u
var $async$ciA=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:w=1
break
case 1:return A.i(u,v)}})
return A.j($async$ciA,v)},
cft(d){var w=0,v=A.k(x.y)
var $async$cft=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:if(d.d.kind!=="video")throw A.p("The is not a video track => "+d.l(0))
throw A.p("You need to specify the deviceId")
return A.i(null,v)}})
return A.j($async$cft,v)},
adl(d){var w=0,v=A.k(x.H),u
var $async$adl=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:u=x.z
w=2
return A.e(B.b8y("enableSpeakerphone",A.a2(["enable",d],x.N,u),u,u),$async$adl)
case 2:return A.i(null,v)}})
return A.j($async$adl,v)},
aVl(d,e){var w=0,v=A.k(x.H),u,t,s
var $async$aVl=A.f(function(f,g){if(f===1)return A.h(g,v)
while(true)switch(w){case 0:s=e.d
w=s.kind==="audio"?3:4
break
case 3:t=J.mz(x.f.a(A.Gt(s.getConstraints())),x.N,x.z)
t.j(0,"volume",d)
w=5
return A.e(e.Vs(0,t),$async$aVl)
case 5:case 4:u=A.d9(null,x.H)
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$aVl,v)},
b8y(d,e,f,g){return B.cOA(d,e,f,g,f.i("0?"))},
cOA(d,e,f,g,h){var w=0,v=A.k(h),u
var $async$b8y=A.f(function(i,j){if(i===1)return A.h(j,v)
while(true)switch(w){case 0:w=3
return A.e(B.b8x(),$async$b8y)
case 3:u=D.JX.cm(d,e,!1,f)
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$b8y,v)},
b8x(){var w=0,v=A.k(x.H),u,t
var $async$b8x=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:w=!$.crV?2:3
break
case 2:u=x.N
t=x.z
w=4
return A.e(D.JX.cm("initialize",A.a2(["options",A.C(u,t)],u,t),!1,x.H),$async$b8x)
case 4:$.crV=!0
case 3:return A.i(null,v)}})
return A.j($async$b8x,v)}},D
J=c[1]
A=c[0]
C=c[2]
B=a.updateHolder(c[3],B)
D=c[28]
B.I0.prototype={
E(d,e){this.a.E(0,e)},
dC(d,e){this.a.dC(d,e)},
aa(d){return this.a.aa(0)},
$ie6:1}
B.Wy.prototype={
hO(d){var w=A.cF("subscription"),v=A.hd(new B.b3B(w),null,null,!0,this.$ti.y[1])
w.b=d.fL(new B.b3C(this,v),v.gnH(v),v.gpE())
return new A.cZ(v,A.x(v).i("cZ<1>"))}}
B.azV.prototype={}
B.Lk.prototype={}
B.a8S.prototype={}
B.qI.prototype={
P(){return new B.a_p()}}
B.a_p.prototype={
S(){var w,v,u=this
u.W()
w=u.a
w.toString
u.z=!0
v=new B.acy()
u.y!==$&&A.aM()
u.y=v
if(!w.y)v.uh(A.Bl(C.le,$.vG().a).c)
u.Qi()
u.r=A.dl(C.c9,new B.bv2(u))
u.w=A.he(C.rt,new B.bv3(u))},
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
a4y(){var w=this.x
if(w!=null)w.X(0)
this.x=A.dl(C.fb,new B.bv_(this))},
UW(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m,l
var $async$UW=A.f(function(d,e){if(d===1){s=e
w=t}while(true)switch(w){case 0:if(r.c==null||r.e||r.f){w=1
break}t=4
o=r.a
o.toString
n=$.K()
w=7
return A.e(n.EM(o.c),$async$UW)
case 7:q=e
p=B.a7f(q)
if(r.c==null||r.e){w=1
break}if(p.w!=="sonne"){r.k(new B.bv0(r))
o=r.r
if(o!=null)o.X(0)
o=r.w
if(o!=null)o.X(0)
o=r.y
o===$&&A.d()
o.h9()
r.a4y()}t=2
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
return A.j($async$UW,v)},
Qi(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m,l,k,j
var $async$Qi=A.f(function(d,e){if(d===1){s=e
w=t}while(true)switch(w){case 0:t=4
n=r.a
n.toString
m=$.K()
w=7
return A.e(m.EM(n.c),$async$Qi)
case 7:q=e
p=B.a7f(q)
if(r.c==null){w=1
break}l=r.a.r
if(l==null){n=$.K()
l=n.gx3()}o=l
if(p.w!=="sonne"||p.c===o){r.k(new B.buX(r))
n=r.y
n===$&&A.d()
n.h9()
r.a4y()
w=1
break}r.k(new B.buY(r))
if(r.a.y)r.BH()
t=2
w=6
break
case 4:t=3
j=s
if(r.c==null){w=1
break}r.k(new B.buZ(r))
n=r.y
n===$&&A.d()
n.h9()
r.a4y()
w=6
break
case 3:w=2
break
case 6:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$Qi,v)},
BH(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m
var $async$BH=A.f(function(d,e){if(d===1){s=e
w=t}while(true)switch(w){case 0:if(r.f||r.e){w=1
break}w=3
return A.e(B.awd(r.a.e==="video"),$async$BH)
case 3:if(!e){p=r.c
if(p==null){w=1
break}o=r.a.e==="video"?A.b(y.c):A.b(y.d)
p.q(x.q).f.v(A.z(null,null,null,null,null,C.h,null,A.c(o,null,null,null,null,null,null,null,null),null,C.l,null,null,null,null,null,null,null,null,null))
w=1
break}r.Q=!0
r.k(new B.buU(r))
t=5
p=r.a
p.toString
o=$.K()
w=8
return A.e(o.M9(p.c,"accepte"),$async$BH)
case 8:t=2
w=7
break
case 5:t=4
m=s
q=A.M(m)
if(r.c==null){w=1
break}r.k(new B.buV(r))
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
A.a1(p,!1).uw(A.e0(new B.buW(r),null,x.z))
case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$BH,v)},
JV(d){return this.b6p(d)},
b6o(){return this.JV(!1)},
b6p(d){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n
var $async$JV=A.f(function(e,f){if(e===1){s=f
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
return A.e(p.M9(q.c,"refuse"),$async$JV)
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
return A.j($async$JV,v)},
D(d){var w,v,u,t,s=this,r=null,q=s.a,p=q.e
q=A.jF(C.t,r,A.c(B.cbs(q.d),r,r,r,r,D.aCx,r,r,r),r,56)
w=s.a.d
w=A.c(w.length===0?A.b("Un membre"):w,r,r,r,r,D.aCj,C.X,r,r)
if(s.d)p=A.b("Connexion\u2026")
else if(s.e)p=A.b("Appel termin\xe9")
else p=p==="video"?A.b("Appel vid\xe9o entrant"):A.b("Appel entrant")
v=x.p
p=A.a([q,C.aw,new A.W(D.rF,w,r),C.k,A.c(p,r,r,r,r,D.wo,r,r,r),D.azh],v)
if(!s.d&&!s.e){q=A.b("Refuser")
w=s.f?r:new B.bv1(s)
u=A.b("Accepter")
t=s.f?r:s.gaIo()
p.push(A.P(A.a([new B.YQ(D.Bg,C.aG,q,w,r),D.az4,new B.YQ(C.nD,C.d3,u,t,r)],v),C.n,C.by,C.i,r))}if(s.d)p.push(C.yK)
return A.dU(r,C.o,A.fr(!0,A.cx(A.I(p,C.n,C.f,C.O),r,r),!0,C.a_,!0,!0),r,r,r)}}
B.YQ.prototype={
D(d){var w=this,v=null,u=A.di(w.d,v,v,C.a_,C.cv,v)
return A.I(A.a([A.ab(A.aT(!1,A.c0(w.c,C.m,v,32),C.j,v,C.p,v,v,v,v,w.f,v,u),72,72),C.k,A.c(w.e,v,v,v,v,C.cW,v,v,v)],x.p),C.n,C.f,C.O)}}
B.qH.prototype={
P(){return new B.a_o(A.b7(x.N),C.R)}}
B.a_o.prototype={
S(){var w,v,u,t,s,r,q,p,o,n=this,m=null
n.W()
w=n.a
n.r=w.c
w=w.x
if(w==null)w=new B.b2Y(B.cq0(),B.cq0())
n.d!==$&&A.aM()
n.d=w
v=n.a
u=v.y
if(u==null)u=new B.a8E(new A.du(m,m,x.g),new A.du(m,m,x.n))
n.e!==$&&A.aM()
n.e=u
w.ch=new B.buT(n)
n.fx=!0
t=new B.acy()
n.fr!==$&&A.aM()
n.fr=t
s=v.x
if(s!=null){r=$.io()
q=r.a
p=q.length!==0&&r.as===s&&q===v.c&&r.w}else p=!1
s=$.io()
r=n.r
q=v.e
o=v.d
s.bj5(r,q,w,u,v.f,o)
w=n.a
if(w.as)s.ax=!0
if(p){n.TY()
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
v=$.io()
if(!(v.r&&v.a===w.r&&!w.y)){B.c8y()
v=w.d
v===$&&A.d()
v.hc()
v=w.e
v===$&&A.d()
v.LO()}w.a2()},
TY(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m,l,k
var $async$TY=A.f(function(d,e){if(d===1){s=e
w=t}while(true)$async$outer:switch(w){case 0:r.a.toString
n=$.K()
r.w=n.gx3()
n=$.io()
r.Q=n.x
r.as=n.y
r.ay=n.Q
r.x=n.e
n=n.f
r.ch=n
if(n!=null){n=Date.now()
m=r.ch
m.toString
r.CW=new A.at(n,0,!1).ev(m)}B.cvp(r.r)
t=4
r.a.toString
n=$.K()
w=7
return A.e(n.c2("/messagerie/appels/"+r.r+"/signaux"),$async$TY)
case 7:q=e
for(n=J.ap(q),m=r.f;n.B();){p=n.gJ(n)
o=B.cgJ(p)
m.E(0,o.a)
if(o.d==="termine"||o.d==="refuse"||o.d==="annule"){r.mF(A.b("Appel termin\xe9"))
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
m.f=new B.buF(r)
m.r=new B.buG(r)
m.w=new B.buH(r)
r.z=!0
if(n)r.k(new B.buI())
r.db=A.he(C.ce,new B.buJ(r))
n=r.e
n===$&&A.d()
m=n.r
r.dx=new A.co(m,A.x(m).i("co<1>")).d2(r.gap_())
n=n.w
r.dy=new A.co(n,A.x(n).i("co<1>")).d2(new B.buK())
r.cx=A.he(C.fb,new B.buL(r))
r.yu()
case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$TY,v)},
aPB(){var w=this.cy
if(w!=null)w.X(0)
this.cy=A.dl(C.c9,new B.bui(this))},
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
i=r.r=B.a7f(q).a
w=8
break
case 9:h=$.K()
w=11
return A.e(h.EM(i.c),$async$t7)
case 11:q=a1
i=r.r=r.a.c
case 8:h=$.io()
h.biQ(i)
B.cvp(r.r)
if(r.a.f)h.Wq()
p=B.a7f(q)
if(r.c==null){w=1
break}i=p.w
if(i==="termine"||i==="expire"){r.mF(A.b("Appel termin\xe9"))
w=1
break}r.a.toString
i=$.K()
r.w=i.gx3()
e="ice"
r.a.toString
i=$.K()
o=i.X2()
n=r.JE()
w=12
return A.e(o,$async$t7)
case 12:m=a1
l=B.cET(m)
w=15
return A.e(n,$async$t7)
case 15:w=!a1?13:14
break
case 13:if(r.c==null){w=1
break}r.k(new B.bul(r))
w=16
return A.e(A.jK(C.nc,null,x.z),$async$t7)
case 16:if(r.c==null){w=1
break}r.mF(null)
w=1
break
case 14:r.aPB()
e="webrtc"
i=r.d
i===$&&A.d()
g=r.a.d==="video"||r.at
w=17
return A.e(i.xe(A.a2(["iceServers",l.a],x.N,x.z),g),$async$t7)
case 17:i.f=new B.bum(r)
i.r=new B.bun(r)
i.w=new B.buo(r)
if(r.c==null){w=1
break}r.k(new B.bup(r))
h.bp3()
r.db=A.he(C.ce,new B.buq(r))
i=r.e
i===$&&A.d()
h=i.r
r.dx=new A.co(h,A.x(h).i("co<1>")).d2(r.gap_())
h=i.w
r.dy=new A.co(h,A.x(h).i("co<1>")).d2(new B.bur())
r.a.toString
h=$.K()
k=h.b
if(k!=null&&J.a7(k)!==0){r.a.toString
$.K()
i.VU(C.d.jD("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws",k)}r.cx=A.he(C.fb,new B.bus(r))
r.yu()
t=2
w=6
break
case 4:t=3
d=s
j=A.M(d)
if(r.c==null){w=1
break}A.mx().$1("Appel : \xe9chec \xe0 l\u2019\xe9tape "+A.u(e)+" : "+A.aCg(A.u(j)))
i=r.c
i.toString
h=j instanceof A.cS?j.a:r.b0u(e)
i.q(x.q).f.v(A.z(null,null,null,null,null,C.h,null,A.c(h,null,null,null,null,null,null,null,null),null,C.l,null,null,null,null,null,null,null,null,null))
r.mF(null)
w=6
break
case 3:w=2
break
case 6:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$t7,v)},
b0u(d){if(d==="ice")return A.b("Configuration d\u2019appel indisponible. V\xe9rifie ta connexion, puis r\xe9essaie.")
if(d==="webrtc")return A.b("Ce navigateur ne peut pas d\xe9marrer l\u2019appel. Essaie depuis l\u2019application.")
return A.b("Appel introuvable ou d\xe9j\xe0 termin\xe9.")},
JE(){var w=0,v=A.k(x.y),u,t=2,s,r=this,q,p,o
var $async$JE=A.f(function(d,e){if(d===1){s=e
w=t}while(true)switch(w){case 0:t=4
w=7
return A.e(r.a15(),$async$JE)
case 7:if(!e){u=!1
w=1
break}q=r.d
q===$&&A.d()
w=8
return A.e(q.FA(r.a.d==="video"||r.at),$async$JE)
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
return A.j($async$JE,v)},
a15(){var w=0,v=A.k(x.y),u,t=this
var $async$a15=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:u=B.awd(t.a.d==="video"||t.at)
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$a15,v)},
yu(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m
var $async$yu=A.f(function(d,e){if(d===1){s=e
w=t}while(true)switch(w){case 0:if(r.c==null||r.y){w=1
break}t=4
r.a.toString
o=$.K()
w=7
return A.e(o.c2("/messagerie/appels/"+r.r+"/signaux"),$async$yu)
case 7:q=e
for(o=J.ap(q);o.B();){p=o.gJ(o)
r.ap0(B.cgJ(p))}t=2
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
return A.j($async$yu,v)},
ap0(d){var w,v,u,t,s=this
if(s.c==null||s.y)return
w=s.f
v=d.a
if(w.u(0,v))return
w.E(0,v)
w=s.w
if(w!=null&&d.c===w)return
switch(d.d){case"offre":if(s.a.f)return
s.JY(d)
break
case"reponse":if(!s.a.f)return
u=B.cwg(d.e)
if(u==null)return
w=s.d
w===$&&A.d()
w.Vr(A.a2(["sdp",u.a,"type",u.b],x.N,x.z)).aN(0,new B.buN(s),x.a).fS(new B.buO(s))
break
case"candidat_ice":t=B.cVs(d.e)
if(t==null)return
w=s.d
w===$&&A.d()
w.Vl(A.a2(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],x.N,x.z))
break
case"accepte":if(!s.a.f||s.x)return
w=s.d
w===$&&A.d()
w.Ef().aN(0,new B.buP(s),x.a).fS(new B.buQ(s))
break
case"refuse":s.mF(A.b("Appel refus\xe9"))
break
case"annule":s.mF(A.b("Appel annul\xe9"))
break
case"termine":s.mF(A.b("Appel termin\xe9"))
break}},
JY(d){return this.b6N(d)},
b6N(d){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m
var $async$JY=A.f(function(e,f){if(e===1){s=f
w=t}while(true)switch(w){case 0:n=B.cwg(d.e)
if(n==null){w=1
break}w=!(r.a.d==="video"||r.at)&&C.d.u(n.a,"m=video")?3:4
break
case 3:p=r.d
p===$&&A.d()
w=5
return A.e(p.tG(),$async$JY)
case 5:if(f&&r.c!=null&&!r.y){r.k(new B.buC(r))
$.io().avg("video")}case 4:t=7
p=r.d
p===$&&A.d()
w=10
return A.e(p.Eg(A.a2(["sdp",n.a,"type",n.b],x.N,x.z)),$async$JY)
case 10:q=f
if(r.c==null||r.y){w=1
break}r.Tv()
r.a2h("reponse",q)
t=2
w=9
break
case 7:t=6
m=s
r.mF(A.b("L\u2019appel n\u2019a pas pu aboutir."))
w=9
break
case 6:w=2
break
case 9:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$JY,v)},
Tv(){var w=0,v=A.k(x.H),u,t=this,s,r
var $async$Tv=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:if(t.x){w=1
break}s=t.cy
if(s!=null)s.X(0)
s=t.fr
s===$&&A.d()
s.h9()
t.k(new B.buz(t,!1))
s=$.io()
s.bqW()
r=t.Q
s.a9E(t.as,r)
B.ciA()
case 1:return A.i(u,v)}})
return A.j($async$Tv,v)},
yj(d,e,f){return this.aRy(d,e,f)},
a2h(d,e){return this.yj(d,e,!0)},
aRy(d,e,f){var w=0,v=A.k(x.H),u=1,t,s=this,r,q,p
var $async$yj=A.f(function(g,h){if(g===1){t=h
w=u}while(true)switch(w){case 0:u=3
s.a.toString
r=$.K()
w=6
return A.e(r.at4(s.r,e,d),$async$yj)
case 6:u=1
w=5
break
case 3:u=2
p=t
if(f&&s.c!=null&&!s.y)s.mF(A.b("L\u2019appel n\u2019a pas pu aboutir."))
w=5
break
case 2:w=1
break
case 5:return A.i(null,v)
case 1:return A.h(t,v)}})
return A.j($async$yj,v)},
JQ(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n
var $async$JQ=A.f(function(d,e){if(d===1){s=e
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
return A.e(p.M9(q,"termine"),$async$JQ)
case 9:case 8:t=2
w=6
break
case 4:t=3
n=s
w=6
break
case 3:w=2
break
case 6:B.c8y()
$.io().Oa()
q=r.c
if(q!=null)A.a1(q,!1).bH()
case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$JQ,v)},
amo(){var w=this
if(!w.x||w.y)return
$.io().bsf()
w.k(new B.buA(w))
$.aP.aD$.push(new B.buB(w))},
mF(d){var w,v,u=this,t=null
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
v.M9(w,"termine").fS(new B.buM())}if(d!=null&&u.c!=null)u.c.q(x.q).f.v(A.z(t,t,t,t,t,C.h,t,A.c(d,t,t,t,t,t,t,t,t),t,C.l,t,t,t,t,t,t,t,t,t))
B.c8y()
$.io().Oa()
w=u.c
if(w!=null)A.a1(w,!1).bH()},
Qt(){var w=0,v=A.k(x.H),u=this,t,s
var $async$Qt=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:t=!u.Q
s=u.d
s===$&&A.d()
w=2
return A.e(s.a_W(t),$async$Qt)
case 2:if(u.c!=null)u.k(new B.bue(u,t))
$.io().a9E(u.as,t)
return A.i(null,v)}})
return A.j($async$Qt,v)},
Qs(){var w=0,v=A.k(x.H),u=this,t,s
var $async$Qs=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:u.ax=!1
w=2
return A.e(u.Qk(!u.as),$async$Qs)
case 2:t=$.io()
s=u.Q
t.a9E(u.as,s)
return A.i(null,v)}})
return A.j($async$Qs,v)},
Qk(d){return this.aJF(d)},
aJF(d){var w=0,v=A.k(x.H),u=1,t,s=this,r,q,p,o,n
var $async$Qk=A.f(function(e,f){if(e===1){t=f
w=u}while(true)switch(w){case 0:u=3
q=s.d
q===$&&A.d()
w=6
return A.e(q.GS(d),$async$Qk)
case 6:u=1
w=5
break
case 3:u=2
n=t
r=A.M(n)
A.mx().$1("Appel : haut-parleur impossible : "+A.aCg(A.u(r)))
w=5
break
case 2:w=1
break
case 5:q=s.d
q===$&&A.d()
o=q.CW
if(s.c!=null&&o!==s.as)s.k(new B.buc(s,o))
return A.i(null,v)
case 1:return A.h(t,v)}})
return A.j($async$Qk,v)},
Qq(){var w=0,v=A.k(x.H),u=this,t,s
var $async$Qq=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:t=!u.ay
s=u.d
s===$&&A.d()
w=2
return A.e(s.a_T(t),$async$Qq)
case 2:if(u.c!=null)u.k(new B.bud(u,t))
$.io().bpg(t)
return A.i(null,v)}})
return A.j($async$Qq,v)},
HE(){var w=0,v=A.k(x.H),u=this,t
var $async$HE=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:t=u.d
t===$&&A.d()
w=2
return A.e(t.Vy(),$async$HE)
case 2:return A.i(null,v)}})
return A.j($async$HE,v)},
aoa(){var w,v=this,u="Appel en cours\u2026",t=v.fy
if(t!=null)return t
$.io()
if(v.x){t=A.b(u)
w=C.c.af(v.CW.a,1e6)
return t+" "+(C.d.aV(C.c.l(C.c.af(w,60)),2,"0")+":"+C.d.aV(C.c.l(C.c.a_(w,60)),2,"0"))}if(v.z)return v.a.f?A.b("\xc7a sonne\u2026"):A.b(u)
return A.b("Connexion\u2026")},
Qu(){var w=0,v=A.k(x.H),u,t=this,s,r,q
var $async$Qu=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:if(t.a.d==="video"||t.at||t.y){w=1
break}if(!t.x){s=t.c
s.toString
r=A.b("D\xe9croche d\u2019abord pour passer en vid\xe9o.")
s.q(x.q).f.v(A.z(null,null,null,null,null,C.h,null,A.c(r,null,null,null,null,null,null,null,null),null,C.l,null,null,null,null,null,null,null,null,null))
w=1
break}s=t.d
s===$&&A.d()
w=3
return A.e(s.KW(),$async$Qu)
case 3:q=e
if(q==null){s=t.c
if(s!=null){r=A.b("La cam\xe9ra n\u2019a pas pu s\u2019ouvrir.")
s.q(x.q).f.v(A.z(null,null,null,null,null,C.h,null,A.c(r,null,null,null,null,null,null,null,null),null,C.l,null,null,null,null,null,null,null,null,null))}w=1
break}if(t.c==null||t.y){w=1
break}t.k(new B.buh(t))
$.io().avg("video")
t.a2h("offre",q)
case 1:return A.i(u,v)}})
return A.j($async$Qu,v)},
Ht(){var w=0,v=A.k(x.H),u,t=this,s,r,q
var $async$Ht=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:if(t.y||t.c==null){w=1
break}s=t.d
s===$&&A.d()
w=3
return A.e(s.PC(),$async$Ht)
case 3:r=e
if(t.c==null||t.y){w=1
break}q=J.bZ(r)?A.b("Statistiques indisponibles pour cet appel."):B.cvw(r)
s=t.c
s.toString
w=4
return A.e(A.bM(null,null,!0,null,new B.bub(q),s,null,!0,!0,x.H),$async$Ht)
case 4:case 1:return A.i(u,v)}})
return A.j($async$Ht,v)},
HF(){var w=0,v=A.k(x.H),u,t=this,s,r
var $async$HF=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:if(!(t.a.d==="video"||t.at)||t.y){w=1
break}s=t.d
s===$&&A.d()
w=s.ay?3:4
break
case 3:w=5
return A.e(s.DN(),$async$HF)
case 5:if(t.c!=null)t.k(new B.buf())
w=1
break
case 4:w=6
return A.e(s.AA(),$async$HF)
case 6:if(!e){s=t.c
if(s!=null){r=A.b("Le partage d\u2019\xe9cran n\u2019est pas disponible sur cet appareil.")
s.q(x.q).f.v(A.z(null,null,null,null,null,C.h,null,A.c(r,null,null,null,null,null,null,null,null),null,C.l,null,null,null,null,null,null,null,null,null))}w=1
break}if(t.c!=null)t.k(new B.bug())
case 1:return A.i(u,v)}})
return A.j($async$HF,v)},
b3a(){var w,v,u=this,t=null,s=A.a([],x.p)
if(u.a.d==="video"||u.at){s.push(A.bN(!1,t,t,t,!0,t,t,!0,!1,D.a6t,t,t,t,new B.buu(u),!1,t,t,t,t,t,A.c(A.b("Basculer"),t,t,t,t,C.cW,t,t,t),t,t))
w=u.d
w===$&&A.d()
w=w.ay
v=A.c0(w?D.a4a:D.a47,C.m,t,t)
s.push(A.bN(!1,t,t,t,!0,t,t,!0,!1,v,t,t,t,new B.buv(u),!1,t,t,t,t,t,A.c(w?A.b("Arr\xeater le partage"):A.b("Partager l\u2019\xe9cran"),t,t,t,t,C.cW,t,t,t),t,t))}if(u.x){s.push(A.bN(!1,t,t,t,!0,t,t,!0,!1,D.a6o,t,t,t,new B.buw(u),!1,t,t,t,t,t,A.c(A.b("Statistiques"),t,t,t,t,C.cW,t,t,t),t,t))
s.push(A.bN(!1,t,t,t,!0,t,t,!0,!1,D.a6a,t,t,t,new B.bux(u),!1,t,t,t,t,t,A.c(A.b("R\xe9duire"),t,t,t,t,C.cW,t,t,t),t,t))}if(s.length===0)return
w=u.c
w.toString
A.j8(D.qY,new B.buy(s),w,!1,t,x.H)},
D(d){var w,v,u,t,s,r,q,p=this,o=null,n=p.d
n===$&&A.d()
w=n.c
w=w==null?o:w.rK(0).length!==0
v=p.id
u=p.a
if((u.d==="video"||p.at)&&p.z){if(w===!0)w=A.fQ(o,B.cgy(n.e,!1,D.OG),C.x,!1,o,p.gaeR(),o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o)
else{w=u.e
u=u.r
t=p.go&&p.x
w=A.cx(A.I(A.a([new B.Nz(w,u,t,56,o),C.q,B.cu9(w,22),C.k,A.c(p.aoa(),o,o,o,o,D.wo,o,o,o)],x.p),C.n,C.f,C.O),o,o)}n=A.a([A.E6(0,w),A.eY(o,A.eT(A.N(12),B.cgy(n.d,!0,D.OG),C.aq),160,o,o,16,16,110),A.eY(o,A.ab(A.aT(!1,D.a6s,C.j,o,C.p,o,o,o,o,p.gaeR(),o,A.di(C.Z1,o,o,C.a_,C.cv,o)),36,36),o,o,o,20,20,o)],x.p)
if(p.x)n.push(A.eY(o,new B.YR(p.gamn(),o),o,o,16,o,16,o))
w=p.Q
u=p.as
n.push(A.eY(24,B.cs9(p.ay,!0,u,w,p.gaeV(),p.gaeQ(),p.gaeS(),p.gaeT(),p.galu(),p.gam2(),!0),o,o,0,0,o,o))
n=A.e2(C.aP,n,C.h,C.aI,o)}else{w=x.p
u=A.a([],w)
if(p.go)u.push(A.eY(o,A.r3(B.cgy(n.e,!1,D.v8),0),1,o,0,o,0,1))
if(p.x)u.push(A.eY(o,new B.YR(p.gamn(),o),o,o,16,o,16,o))
n=B.cu9(p.a.e,24)
t=A.c(p.aoa(),o,o,o,o,D.wo,C.X,o,o)
s=p.a
r=s.e
s=s.r
s=A.a8(A.cx(new B.Nz(r,s,p.go&&p.x,88,o),o,o),1,o)
r=p.Q
q=p.as
u.push(A.I(A.a([C.q,n,C.k,new A.W(D.rF,t,o),s,B.cs9(p.ay,!1,q,r,p.gaeV(),p.gaeQ(),p.gaeS(),p.gaeT(),p.galu(),p.gam2(),p.x),C.q],w),C.n,C.f,C.i))
u=A.e2(C.aP,u,C.h,C.aI,o)
n=u}return A.cgh(v,A.dU(o,C.o,A.fr(!0,n,!0,C.a_,!0,!0),o,o,o),new B.buR(p),x.K)}}
B.akf.prototype={
D(d){var w,v,u=this,t=null,s=A.N(28),r=A.a8(new B.zP(D.a4c,u.e,A.b("Haut-parleur"),u.x,t,t),1,t),q=u.f?D.Br:D.a4b,p=A.b("Appel vid\xe9o")
q=A.a8(new B.zP(q,!1,p,u.c?u.y:u.z,t,t),1,t)
p=u.d
w=p?D.a46:D.a45
v=x.p
p=A.P(A.a([r,q,A.a8(new B.zP(w,p,A.b("Muet"),u.w,t,t),1,t)],v),C.n,C.f,C.i,t)
w=A.b("Plus")
return A.S(t,A.I(A.a([p,C.q,A.P(A.a([A.a8(new B.zP(C.Bn,!1,w,u.r?u.Q:t,t,t),1,t),A.a8(new B.zP(D.Bg,!1,A.b("Terminer"),u.as,C.aG,t),1,t),D.a2Z],v),C.n,C.f,C.i,t)],v),C.n,C.f,C.O),C.j,t,t,new A.a4(D.qY,t,t,s,t,t,C.u),t,t,t,C.Av,D.a2M,t,t,t)}}
B.YR.prototype={
D(d){var w=null
return A.I(A.a([A.ab(A.aT(!1,D.a69,C.j,w,C.p,w,w,w,w,this.c,w,A.di(C.kK,w,w,C.a_,C.cv,w)),48,48),C.I,A.c(A.b("R\xe9duire"),w,w,w,w,C.R1,w,w,w)],x.p),C.n,C.f,C.O)}}
B.zP.prototype={
D(d){var w,v,u,t=this,s=null,r=t.r,q=r==null
if(q)r=t.d?C.m:C.kK
if(!q)w=C.m
else w=t.d?C.o:C.m
q=t.f
v=q==null?0.4:1
u=A.di(r,s,s,C.a_,C.cv,s)
return A.r3(A.I(A.a([A.ab(A.aT(!1,A.c0(t.c,w,s,30),C.j,s,C.p,s,s,s,s,q,s,u),72,72),C.k,A.c(t.e,s,s,s,s,C.wq,C.X,s,s)],x.p),C.n,C.f,C.O),v)}}
B.Nz.prototype={
P(){return new B.aoR(null,null)}}
B.aoR.prototype={
S(){var w,v=this
v.W()
w=A.cr(null,A.cU(0,0,v.a.e?1100:2400,0,0),null,1,null,v)
w.aaw(0,!0)
v.d!==$&&A.aM()
v.d=w},
aU(d){var w,v
this.bg(d)
w=this.a.e
if(d.e!==w){v=this.d
v===$&&A.d()
v.e=A.cU(0,0,w?1100:2400,0,0)
v.aaw(0,!0)}},
m(){var w=this.d
w===$&&A.d()
w.m()
this.aG9()},
D(d){var w,v=this,u=null,t=v.a,s=t.f,r=s*2,q=r+24,p=v.d
p===$&&A.d()
w=t.d
t=w!=null?A.jF(u,w,u,u,s):A.jF(C.t,u,A.c(B.cbs(t.c),u,u,u,u,A.be(u,u,C.o,u,u,u,u,u,u,u,u,v.a.f*0.7,u,u,C.A,u,u,!0,u,u,u,u,u,u,u,u),u,u,u),u,s)
return A.ab(A.i7(p,new B.bQP(v,r),t),q,q)}}
B.a5B.prototype={
m(){var w=this,v=w.bS$
if(v!=null)v.T(0,w.ghM())
w.bS$=null
w.a2()},
ce(){this.da()
this.d_()
this.hN()}}
B.b2Y.prototype={
FA(d){return this.bqL(d)},
bqL(d){var w=0,v=A.k(x.H),u,t=this,s,r,q,p,o
var $async$FA=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:if(t.b!=null){w=1
break}s=t.d
w=3
return A.e(s.jT(0),$async$FA)
case 3:$.awR()
r=x.N
q=A.a2(["echoCancellation",!0,"noiseSuppression",!0,"autoGainControl",!0],r,x.y)
if(d){p=x.S
p=A.a2(["facingMode","user","width",A.a2(["ideal",640],r,p),"height",A.a2(["ideal",480],r,p),"frameRate",A.a2(["ideal",24],r,p)],r,x.K)}else p=!1
w=4
return A.e(new B.Tj().B6(0,A.a2(["audio",q,"video",p],r,x.z)),$async$FA)
case 4:o=f
t.b=o
s.sBi(0,o)
case 1:return A.i(u,v)}})
return A.j($async$FA,v)},
xe(d,e){return this.brw(d,e)},
brw(d,e){var w=0,v=A.k(x.H),u=this,t,s,r,q,p,o,n
var $async$xe=A.f(function(f,g){if(f===1)return A.h(g,v)
while(true)switch(w){case 0:w=2
return A.e(u.e.jT(0),$async$xe)
case 2:w=u.b==null?3:4
break
case 3:w=5
return A.e(u.FA(e),$async$xe)
case 5:case 4:t=u.b
t.toString
w=6
return A.e($.awR().a7B(d,A.C(x.N,x.z)),$async$xe)
case 6:s=u.a=g
r=t.GF(0),q=r.length,p=0
case 7:if(!(p<r.length)){w=9
break}o=r[p]
w=10
return A.e(s.Vi(0,o,t),$async$xe)
case 10:n=g
if(o.d.kind==="video")u.as=n
case 8:r.length===q||(0,A.R)(r),++p
w=7
break
case 9:w=11
return A.e(u.CO(),$async$xe)
case 11:s.e=new B.b3_(u)
s.Q=new B.b30(u)
s.d=new B.b31(u)
return A.i(null,v)}})
return A.j($async$xe,v)},
aPp(d){var w,v,u,t=this
t.c=d
w=d.rK(0)
v=w.length!==0?C.b.gU(w).d.id:null
if(!t.x){t.x=!0
t.z=v
t.e.sBi(0,d)
t.Hy()
u=t.r
if(u!=null)u.$0()}else{u=t.z
if(v!=null&&v!==u){t.z=v
t.e.sBi(0,d)
u=t.r
if(u!=null)u.$0()}}},
Hy(){var w=0,v=A.k(x.H),u=1,t,s=this,r,q,p,o,n,m,l,k
var $async$Hy=A.f(function(d,e){if(d===1){t=e
w=u}while(true)switch(w){case 0:m=s.CW?0.8:1
l=s.c
l=l==null?null:l.OP(0)
if(l==null)l=C.cp
p=l.length
o=0
case 2:if(!(o<l.length)){w=4
break}r=l[o]
u=6
w=9
return A.e(B.aVl(m,r),$async$Hy)
case 9:u=1
w=8
break
case 6:u=5
k=t
q=A.M(k)
A.mx().$1("Appel : volume distant impossible : "+A.aCg(A.u(q)))
w=8
break
case 5:w=1
break
case 8:case 3:l.length===p||(0,A.R)(l),++o
w=2
break
case 4:return A.i(null,v)
case 1:return A.h(t,v)}})
return A.j($async$Hy,v)},
CO(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m,l,k,j,i,h,g
var $async$CO=A.f(function(d,e){if(d===1){s=e
w=t}while(true)switch(w){case 0:h=r.as
if(h==null){w=1
break}t=4
n=h.a.getParameters()
m=n.transactionId
if((m==null?null:m)!=null){l=n.rtcp
k=x.z
k=A.a2(["cname",l.cname,"reducedSize",l.reducedSize],k,k)
k.h(0,"cname")
k.h(0,"reducedSize")}B.cKZ(n)
l=B.cKY(n)
B.cKX(n)
q=new B.aYN(l)
p=q.d
if(p==null||J.a7(p)===0){w=1
break}for(l=p,k=l.length,j=0;j<k;++j){o=l[j]
o.c=5e5
o.e=24}w=7
return A.e(h.GV(q),$async$CO)
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
return A.j($async$CO,v)},
Ef(){var w=0,v=A.k(x.P),u,t=this,s,r
var $async$Ef=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:r=t.a
if(r==null)throw A.p(A.am("Connexion non pr\xe9par\xe9e."))
w=3
return A.e(r.W8(0),$async$Ef)
case 3:s=e
w=4
return A.e(r.GT(0,s),$async$Ef)
case 4:u=A.a2(["sdp",s.a,"type",s.b],x.N,x.z)
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$Ef,v)},
Eg(d){return this.bie(d)},
bie(d){var w=0,v=A.k(x.P),u,t=this,s,r
var $async$Eg=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:r=t.a
if(r==null)throw A.p(A.am("Connexion non pr\xe9par\xe9e."))
w=3
return A.e(r.GW(0,new B.Ed(d.h(0,"sdp"),d.h(0,"type"))),$async$Eg)
case 3:w=4
return A.e(r.W5(0),$async$Eg)
case 4:s=f
w=5
return A.e(r.GT(0,s),$async$Eg)
case 5:u=A.a2(["sdp",s.a,"type",s.b],x.N,x.z)
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$Eg,v)},
Vr(d){return this.bf4(d)},
bf4(d){var w=0,v=A.k(x.H),u=this,t
var $async$Vr=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:t=u.a
if(t==null)throw A.p(A.am("Connexion non pr\xe9par\xe9e."))
w=2
return A.e(t.GW(0,new B.Ed(d.h(0,"sdp"),d.h(0,"type"))),$async$Vr)
case 2:return A.i(null,v)}})
return A.j($async$Vr,v)},
Vl(d){return this.beQ(d)},
beQ(d){var w=0,v=A.k(x.H),u,t=this,s
var $async$Vl=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:s=t.a
if(s==null){w=1
break}w=3
return A.e(s.V7(new B.Kq(A.ay(d.h(0,"candidate")),A.ay(d.h(0,"sdpMid")),A.eM(d.h(0,"sdpMLineIndex")))),$async$Vl)
case 3:case 1:return A.i(u,v)}})
return A.j($async$Vl,v)},
a_W(d){return this.aAt(d)},
aAt(d){var w=0,v=A.k(x.H),u=this,t,s,r,q
var $async$a_W=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:q=u.b
q=q==null?null:q.OP(0)
if(q==null)q=C.cp
t=q.length
s=!d
r=0
for(;r<q.length;q.length===t||(0,A.R)(q),++r)q[r].slW(0,s)
return A.i(null,v)}})
return A.j($async$a_W,v)},
GS(d){return this.aAj(d)},
aAj(d){var w=0,v=A.k(x.H),u=this
var $async$GS=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:w=2
return A.e(B.adl(d),$async$GS)
case 2:u.CW=d
w=3
return A.e(u.Hy(),$async$GS)
case 3:return A.i(null,v)}})
return A.j($async$GS,v)},
a_T(d){return this.aA9(d)},
aA9(d){var w=0,v=A.k(x.H),u=this,t,s,r
var $async$a_T=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:r=u.b
r=r==null?null:r.rK(0)
if(r==null)r=C.cp
t=r.length
s=0
for(;s<r.length;r.length===t||(0,A.R)(r),++s)r[s].slW(0,d)
return A.i(null,v)}})
return A.j($async$a_T,v)},
Vy(){var w=0,v=A.k(x.H),u,t=this,s,r
var $async$Vy=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:s=t.b
r=s==null?null:s.rK(0)
if(r==null)r=D.Ef
if(r.length===0){w=1
break}w=3
return A.e(B.cft(C.b.gU(r)),$async$Vy)
case 3:case 1:return A.i(u,v)}})
return A.j($async$Vy,v)},
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
$.awR()
l=x.N
k=x.S
w=7
return A.e(new B.Tj().B6(0,A.a2(["audio",!1,"video",A.a2(["facingMode","user","width",A.a2(["ideal",640],l,k),"height",A.a2(["ideal",480],l,k),"frameRate",A.a2(["ideal",24],l,k)],l,x.K)],l,x.z)),$async$tG)
case 7:q=a3
p=J.cla(q)
if(J.a7(p)===0){u=!1
w=1
break}o=J.fb(p)
l=r.b
if(l==null)l=null
else{l=l.e
k=o.d
l.addTrack(k)
l=A.d9(null,x.H)}w=8
return A.e(x.x.b(l)?l:A.dM(l,x.H),$async$tG)
case 8:r.d.sBi(0,r.b)
l=r.b
l.toString
w=9
return A.e(J.cCN(d,o,l),$async$tG)
case 9:n=a3
r.as=n
w=10
return A.e(r.CO(),$async$tG)
case 10:u=!0
w=1
break
t=2
w=6
break
case 4:t=3
a0=s
l=q
l=l==null?null:J.cl9(l)
if(l==null)l=C.cp
k=l.length
i=x.c
h=x._
g=0
case 11:if(!(g<l.length)){w=13
break}m=l[g]
t=15
f=J.a6W(m)
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
KW(){var w=0,v=A.k(x.cO),u,t=2,s,r=this,q,p,o
var $async$KW=A.f(function(d,e){if(d===1){s=e
w=t}while(true)switch(w){case 0:w=3
return A.e(r.tG(),$async$KW)
case 3:if(!e){u=null
w=1
break}t=5
w=8
return A.e(r.Ef(),$async$KW)
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
return A.j($async$KW,v)},
AA(){var w=0,v=A.k(x.y),u,t=2,s,r=this,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0,a1,a2
var $async$AA=A.f(function(a3,a4){if(a3===1){s=a4
w=t}while(true)switch(w){case 0:if(r.a==null||r.y){u=!1
w=1
break}if(r.ay){u=!0
w=1
break}if(A.ca()===C.aR){u=!1
w=1
break}q=r.as
if(q==null){u=!1
w=1
break}p=null
t=4
$.awR()
w=7
return A.e(new B.Tj().Gq(A.a2(["video",!0,"audio",!1],x.N,x.z)),$async$AA)
case 7:p=a4
o=J.cla(p)
if(J.a7(o)===0){u=!1
w=1
break}n=J.fb(o)
k=r.b
j=k==null?null:k.rK(0)
m=j==null?D.Ef:j
r.ax=J.a7(m)!==0?J.fb(m):null
w=8
return A.e(q.ZB(n),$async$AA)
case 8:r.at=p
r.ay=!0
r.d.sBi(0,p)
w=9
return A.e(r.CO(),$async$AA)
case 9:n.c=new B.b2Z(r)
u=!0
w=1
break
t=2
w=6
break
case 4:t=3
a1=s
k=p
k=k==null?null:J.cl9(k)
if(k==null)k=C.cp
h=k.length
g=x.c
f=x._
e=0
case 10:if(!(e<k.length)){w=12
break}l=k[e]
t=14
d=J.a6W(l)
if(!f.b(d)){a0=new A.aB($.aI,g)
a0.a=8
a0.c=d
d=a0}w=17
return A.e(d,$async$AA)
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
return A.j($async$AA,v)},
DN(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$DN=A.f(function(d,a0){if(d===1){s=a0
w=t}while(true)switch(w){case 0:if(!r.ay){w=1
break}n=r.ay=!1
t=4
q=r.as
p=r.ax
w=(q!=null?p!=null:n)?7:8
break
case 7:w=9
return A.e(q.ZB(p),$async$DN)
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
n=n==null?null:n.GF(0)
if(n==null)n=C.cp
l=n.length
k=x.c
j=x._
i=0
case 10:if(!(i<n.length)){w=12
break}o=n[i]
t=14
h=J.a6W(o)
if(!j.b(h)){g=new A.aB($.aI,k)
g.a=8
g.c=h
h=g}w=17
return A.e(h,$async$DN)
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
r.d.sBi(0,r.b)
case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$DN,v)},
PC(){var w=0,v=A.k(x.P),u,t=2,s,r=this,q,p,o,n,m
var $async$PC=A.f(function(d,e){if(d===1){s=e
w=t}while(true)switch(w){case 0:n=r.a
if(n==null||r.y){u=C.bg
w=1
break}t=4
w=7
return A.e(J.cDe(n),$async$PC)
case 7:q=e
p=B.cZb(q,r.Q)
r.Q=p
A.mx().$1("Appel : statistiques : "+B.cvw(p))
u=p
w=1
break
t=2
w=6
break
case 4:t=3
m=s
u=C.bg
w=1
break
w=6
break
case 3:w=2
break
case 6:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$PC,v)},
hc(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0,a1
var $async$hc=A.f(function(a2,a3){if(a2===1){s=a3
w=t}while(true)switch(w){case 0:if(r.y){w=1
break}r.y=!0
r.ay=!1
o=r.at
o=o==null?null:o.GF(0)
if(o==null)o=C.cp
n=o.length
m=x.c
l=x._
k=0
case 3:if(!(k<o.length)){w=5
break}q=o[k]
t=7
j=J.a6W(q)
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
return A.e(B.adl(!1),$async$hc)
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
o=o==null?null:o.GF(0)
if(o==null)o=C.cp
n=o.length
k=0
case 21:if(!(k<o.length)){w=23
break}p=o[k]
t=25
j=J.a6W(p)
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
B.a8E.prototype={
gbgx(){return this.b!=null&&!this.e},
VU(d,e){return this.bgy(d,e)},
bgy(d,e){var w=0,v=A.k(x.H),u=this
var $async$VU=A.f(function(f,g){if(f===1)return A.h(g,v)
while(true)switch(w){case 0:u.x=d
u.y=e
u.e=!1
u.f=0
w=2
return A.e(u.Hw(),$async$VU)
case 2:return A.i(null,v)}})
return A.j($async$VU,v)},
Hw(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m,l
var $async$Hw=A.f(function(d,e){if(d===1){s=e
w=t}while(true)switch(w){case 0:if(r.e){w=1
break}q=r.x
if(q==null||J.a7(q)===0){w=1
break}t=4
p=B.cDC(B.ceo(A.cD(q,0,null),null))
r.b=p
w=7
return A.e(p.f.a,$async$Hw)
case 7:r.f=0
o=r.y
if(o!=null&&J.a7(o)!==0)try{n=x.N
p.gkL().a.E(0,C.Y.dv(A.a2(["type","auth","jeton",o],n,n),null))}catch(k){}n=p.r.b
n===$&&A.d()
n=n.b
n===$&&A.d()
r.c=new A.cZ(n,A.x(n).i("cZ<1>")).b7(r.gb65(),!0,r.gb4x(),new B.aDC(r))
t=2
w=6
break
case 4:t=3
l=s
r.a4m()
w=6
break
case 3:w=2
break
case 6:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$Hw,v)},
b66(d){var w,v,u,t
try{w=C.Y.cE(0,J.l(d),null)
u=x.P
if(!u.b(w))return
if(!J.r(J.m(w,"type"),"signal_appel"))return
v=J.m(w,"signal")
if(!u.b(v))return
u=this.r
if((u.c&4)===0)u.E(0,B.cgJ(v))}catch(t){}},
a4m(){var w,v=this,u=v.c
if(u!=null)u.X(0)
v.b=v.c=null
if(v.e)return
u=v.f
if(u>=5){u=v.w
if((u.c&4)===0)u.E(0,null)
return}w=D.afT[u]
v.f=u+1
u=v.d
if(u!=null)u.X(0)
v.d=A.dl(A.cU(0,0,0,0,w),new B.aDD(v))},
LO(){var w=0,v=A.k(x.H),u=1,t,s=this,r,q,p
var $async$LO=A.f(function(d,e){if(d===1){t=e
w=u}while(true)switch(w){case 0:s.e=!0
r=s.d
if(r!=null)r.X(0)
r=s.c
r=r==null?null:r.X(0)
w=2
return A.e(x.x.b(r)?r:A.dM(r,x.H),$async$LO)
case 2:s.c=null
u=4
r=s.b
r=r==null?null:r.gkL().aa(0)
w=7
return A.e(x._.b(r)?r:A.dM(r,x.z),$async$LO)
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
return A.j($async$LO,v)}}
B.acy.prototype={
uh(d){return this.bog(d)},
bog(d){var w=0,v=A.k(x.H),u=1,t,s=this,r,q,p,o
var $async$uh=A.f(function(e,f){if(e===1){t=f
w=u}while(true)switch(w){case 0:u=3
q=s.a
w=6
return A.e((q==null?s.a=A.B1():q).b1(0),$async$uh)
case 6:w=7
return A.e(s.a.a_S(d),$async$uh)
case 7:w=8
return A.e(s.a.jk(C.JB),$async$uh)
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
r=r==null?null:r.b1(0)
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
B.aYC.prototype={
a7B(d,e){return this.bi3(d,e)},
bi3(d,e){var w=0,v=A.k(x.Y),u,t,s,r,q
var $async$a7B=A.f(function(f,g){if(f===1)return A.h(g,v)
while(true)switch(w){case 0:q=e.a
if(q!==0)t=e
else{q=x.z
s=x.N
t=A.a2(["mandatory",A.C(q,q),"optional",A.a([A.a2(["DtlsSrtpKeyAgreement",!0],s,x.y)],x.T)],s,x.K)}q=self.RTCPeerConnection
s=A.fI(t,x.N,x.z)
s.t(0,d)
r=new q(x.m.a(A.c7(s)))
s=J.l(r)
u=B.cKW(C.c1.gj7().be(new A.eF(s)),r)
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$a7B,v)}}
B.ph.prototype={
OP(d){var w=A.a([],x.Q),v=this.e.getAudioTracks()
v=x.l.b(v)?v:new A.dB(v,A.Y(v).i("dB<1,aF>"))
J.hv(v,new B.aTx(w))
return w},
rK(d){var w=A.a([],x.Q),v=this.e.getVideoTracks()
v=x.l.b(v)?v:new A.dB(v,A.Y(v).i("dB<1,aF>"))
J.hv(v,new B.aTy(w))
return w},
GF(d){var w=A.G(this.OP(0),!0,x.G)
C.b.t(w,this.rK(0))
return w}}
B.ad0.prototype={
aHv(d){var w=this,v=w.d
v.addEventListener("ended",A.c6(new B.aTu(w)))
v.addEventListener("mute",A.c6(new B.aTv(w)))
v.addEventListener("unmute",A.c6(new B.aTw(w)))},
slW(d,e){this.d.enabled=e},
Vs(d,e){return this.bf7(0,e)},
bf7(d,e){var w=0,v=A.k(x.H),u=this
var $async$Vs=A.f(function(f,g){if(f===1)return A.h(g,v)
while(true)switch(w){case 0:w=2
return A.e(A.dN(u.d.applyConstraints(x.m.a(A.c7(e))),x.X),$async$Vs)
case 2:return A.i(null,v)}})
return A.j($async$Vs,v)},
b1(d){var w=0,v=A.k(x.H),u=this
var $async$b1=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:u.d.stop()
return A.i(null,v)}})
return A.j($async$b1,v)}}
B.Tj.prototype={
B6(d,e){return this.azh(0,e)},
azh(d,a0){var w=0,v=A.k(x.E),u,t=2,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$B6=A.f(function(a2,a3){if(a2===1){s=a3
w=t}while(true)switch(w){case 0:t=4
try{if(!B.cXX())if(x.f.b(a0.h(0,"video"))&&J.m(a0.h(0,"video"),"facingMode")!=null)J.iM(a0.h(0,"video"),"facingMode")
a0.cP(0,"video",new B.aTj())
a0.cP(0,"audio",new B.aTk())}catch(a1){A.t1("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(x.P.b(a0.h(0,"audio"))){h=x.z
h=A.ha(a0.h(0,"audio"),h,h).aC(0,"optional")&&x.F.b(J.m(a0.h(0,"audio"),"optional"))}else h=!1
if(h){r=J.m(a0.h(0,"audio"),"optional")
q=A.C(x.N,x.z)
J.hv(r,new B.aTl(q))
J.iM(a0.h(0,"audio"),"optional")
J.jz(a0.h(0,"audio"),q)}}catch(a1){p=A.M(a1)
o=A.bx(a1)
A.t1("[getUserMedia] failed to translate optional audio constraints, "+A.u(p)+", "+A.u(o))}h=self
n=h.window.navigator.mediaDevices
g=x.m
w=n.getUserMedia!=null?7:9
break
case 7:m=A.c7(a0)
w=10
return A.e(A.dN(n.getUserMedia(g.a(m)),g),$async$B6)
case 10:l=a3
u=new B.ph(l,"local")
w=1
break
w=8
break
case 9:h=h.window.navigator.mediaDevices
f=a0.h(0,"audio")
w=11
return A.e(A.dN(h.getUserMedia({video:a0.h(0,"video"),audio:f}),g),$async$B6)
case 11:k=a3
u=new B.ph(k,"local")
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
return A.j($async$B6,v)},
Gq(d){return this.ayM(d)},
ayM(d){var w=0,v=A.k(x.E),u,t=2,s,r,q,p,o,n,m,l,k,j,i
var $async$Gq=A.f(function(e,f){if(e===1){s=f
w=t}while(true)switch(w){case 0:t=4
m=self
r=m.window.navigator.mediaDevices
w=r.getDisplayMedia!=null?7:9
break
case 7:q=A.c7(d)
m=x.m
w=10
return A.e(A.dN(r.getDisplayMedia(m.a(q)),m),$async$Gq)
case 10:p=f
u=new B.ph(p,"local")
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
return A.e(A.dN(m.getUserMedia({video:l,audio:k}),x.m),$async$Gq)
case 11:o=f
u=new B.ph(o,"local")
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
return A.j($async$Gq,v)}}
B.aeR.prototype={
aHF(d,e){var w=this,v=w.at
v===$&&A.d()
v.addEventListener("datachannel",A.c6(new B.aYE(w)))
v.addEventListener("icecandidate",A.c6(new B.aYF(w)))
v.addEventListener("iceconnectionstatechange",A.c6(new B.aYG(w)))
v.onicegatheringstatechange=A.c6(new B.aYH(w))
v.addEventListener("signalingstatechange",A.c6(new B.aYI(w)))
if(!$.cjz())v.addEventListener("connectionstatechange",A.c6(new B.aYJ(w)))
v.addEventListener("negotiationneeded",A.c6(new B.aYK(w)))
v.addEventListener("track",A.c6(new B.aYL(w)))},
W8(d){var w=0,v=A.k(x.v),u,t=this,s,r
var $async$W8=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:r=t.at
r===$&&A.d()
w=3
return A.e(A.dN(r.createOffer(x.m.a(A.c7(A.C(x.N,x.z)))),x.A),$async$W8)
case 3:s=f
u=new B.Ed(s.sdp,s.type)
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$W8,v)},
W5(d){var w=0,v=A.k(x.v),u,t=this,s,r
var $async$W5=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:r=t.at
r===$&&A.d()
w=3
return A.e(A.dN(r.createAnswer(x.m.a(A.c7(A.C(x.N,x.z)))),x.A),$async$W5)
case 3:s=f
u=new B.Ed(s.sdp,s.type)
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$W5,v)},
GT(d,e){return this.aAn(0,e)},
aAn(d,e){var w=0,v=A.k(x.H),u=this,t
var $async$GT=A.f(function(f,g){if(f===1)return A.h(g,v)
while(true)switch(w){case 0:t=u.at
t===$&&A.d()
w=2
return A.e(A.dN(t.setLocalDescription({type:e.b,sdp:e.a}),x.X),$async$GT)
case 2:return A.i(null,v)}})
return A.j($async$GT,v)},
GW(d,e){return this.aAE(0,e)},
aAE(d,e){var w=0,v=A.k(x.H),u=this,t
var $async$GW=A.f(function(f,g){if(f===1)return A.h(g,v)
while(true)switch(w){case 0:t=u.at
t===$&&A.d()
w=2
return A.e(A.dN(t.setRemoteDescription({type:e.b,sdp:e.a}),x.X),$async$GW)
case 2:return A.i(null,v)}})
return A.j($async$GW,v)},
V7(d){return this.beu(d)},
beu(d){var w=0,v=A.k(x.H),u=this,t,s
var $async$V7=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:s=u.at
s===$&&A.d()
t=d.b
t.toString
w=2
return A.e(A.dN(s.addIceCandidate({candidate:d.a,sdpMid:t,sdpMLineIndex:d.c}),x.X),$async$V7)
case 2:return A.i(null,v)}})
return A.j($async$V7,v)},
OZ(d){var w=0,v=A.k(x.J),u,t=this,s,r,q
var $async$OZ=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:q=t.at
q===$&&A.d()
w=3
return A.e(A.dN(q.getStats(),x.m),$async$OZ)
case 3:s=f
r=A.a([],x.o)
s.forEach.apply(s,[A.avQ(new B.aYM(r))])
u=r
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$OZ,v)},
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
Vi(d,e,f){return this.beJ(0,e,f)},
beJ(d,e,f){var w=0,v=A.k(x.e),u,t=this,s
var $async$Vi=A.f(function(g,h){if(g===1)return A.h(h,v)
while(true)switch(w){case 0:s=t.at
s===$&&A.d()
u=new B.aeT(s.addTrack(e.d,f.e))
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$Vi,v)}}
B.aeT.prototype={
ZB(d){return this.bsI(d)},
bsI(d){var w=0,v=A.k(x.H),u=this,t,s,r,q
var $async$ZB=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:try{t=d
r=t.d
u.a.replaceTrack(r)}catch(p){r=A.M(p)
if(x.L.b(r)){s=r
throw A.p("Unable to RTCRtpSender::replaceTrack: "+J.l(s))}else throw p}return A.i(null,v)}})
return A.j($async$ZB,v)},
GV(d){return this.aAv(d)},
aAv(d){var w=0,v=A.k(x.y),u,t=2,s,r=this,q,p,o,n,m,l,k
var $async$GV=A.f(function(e,f){if(e===1){s=f
w=t}while(true)switch(w){case 0:t=4
o=r.a
q=o.getParameters()
n=d.d
m=A.Y(n).i("af<1,ah<o,@>>")
m=A.c7(A.G(new A.af(n,new B.aYR(),m),!0,m.i("aD.E")))
n=m==null?A.c7([]):m
q.encodings=x.r.a(n)
w=7
return A.e(A.dN(o.setParameters(q),x.X),$async$GV)
case 7:w=8
return A.e(A.d9(!0,x.y),$async$GV)
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
return A.j($async$GV,v)}}
B.cgx.prototype={
b1(d){var w=0,v=A.k(x.H),u=this,t,s,r
var $async$b1=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:try{u.a.stop()}catch(q){r=A.M(q)
if(x.L.b(r)){t=r
r=t
J.l(r)
throw A.p("Unable to RTCRtpTransceiver::stop: "+A.u(r))}else throw q}return A.i(null,v)}})
return A.j($async$b1,v)}}
B.UT.prototype={
savs(d,e){var w
if(this.ax===e)return
this.ax=e
w=this.EZ()
if(w!=null)w.style.objectFit=e},
ap8(){var w=this,v=w.EZ(),u=w.a,t=v==null,s=t?null:v.videoWidth
if(s==null)s=0
t=t?null:v.videoHeight
if(t==null)t=0
w.sn(0,u.as6(t,w.z!=null,0,s))},
sBi(d,e){var w,v,u,t,s=this
if(e==null){w=s.EZ()
if(w!=null)w.srcObject=null
w=s.w
if(w!=null)w.srcObject=null
s.z=null
return}s.z=e
if(e.rK(0).length!==0){s.x=new self.MediaStream()
w=s.z.e.getVideoTracks()
w=J.ap(x.l.b(w)?w:new A.dB(w,A.Y(w).i("dB<1,aF>")))
for(;w.B();){v=w.gJ(w)
s.x.addTrack(v)}}if(e.OP(0).length!==0){s.y=new self.MediaStream()
w=s.z.e.getAudioTracks()
w=J.ap(x.l.b(w)?w:new A.dB(w,A.Y(w).i("dB<1,aF>")))
for(;w.B();){v=w.gJ(w)
s.y.addTrack(v)}}if(s.y!=null){if(s.w==null){u=self.document.createElement("audio")
u.id="audio_"+("RTCVideoRenderer-"+s.Q)
u.muted=e.b==="local"
u.autoplay=!0
s.w=u
w=s.aRl()
v=s.w
v.toString
w.append(v)}w=s.w
if(w!=null)w.srcObject=s.y}t=s.EZ()
if(t!=null){t.srcObject=s.x
w=s.EZ()
w.toString
s.aeC(w)}s.sn(0,s.a.bgX(s.z!=null))},
aRl(){var w,v=self,u=v.document.getElementById("html_webrtc_audio_manager_list")
if(u!=null)return u
w=v.document.createElement("div")
w.id="html_webrtc_audio_manager_list"
w.style.display="none"
v=v.document.body
if(v!=null)v.append(w)
return w},
EZ(){var w=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(w!=null)return w
return null},
m(){var w=0,v=A.k(x.H),u,t=this,s,r,q,p,o
var $async$m=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:t.z=null
for(s=t.at,r=s.length,q=0;q<s.length;s.length===r||(0,A.R)(s),++q)s[q].X(0)
p=t.EZ()
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
jT(d){var w=0,v=A.k(x.H),u=this
var $async$jT=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:$.OQ()
$.t3().xi("RTCVideoRenderer-"+u.Q,new B.aYX(u),!0)
return A.i(null,v)}})
return A.j($async$jT,v)},
aeC(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.UV.prototype={
P(){return new B.UW()}}
B.UW.prototype={
S(){var w,v,u=this
u.W()
u.a.c.aj(0,u.gb2g())
w=u.a
v=w.c
v.as=w.e
v.savs(0,w.d===D.v8?"contain":"cover")},
b2h(){if(this.c!=null)this.k(new B.aYY())},
m(){if(this.c!=null)this.a2()},
aU(d){var w,v
this.bg(d)
A.dl(A.cU(0,0,10,0,0),new B.aZ_(this))
w=this.a
v=w.c
v.savs(0,w.d===D.v8?"contain":"cover")},
D(d){return new A.iV(new B.aYZ(this),null)}}
B.aba.prototype={
aHc(d,e,f,g){var w=this,v=$.aI
w.a!==$&&A.aM()
w.a=new B.a0i(d,w,new A.bg(new A.aB(v,x.c),x.u),e,g.i("a0i<0>"))
if(f.a.gjd())f.a=new B.Wy(g.i("@<0>").cc(g).i("Wy<1,2>")).hO(f.a)
v=A.hd(null,new B.aMf(f,w),null,!0,g)
w.b!==$&&A.aM()
w.b=v},
ali(){var w,v
this.d=!0
w=this.c
if(w!=null)w.X(0)
v=this.b
v===$&&A.d()
v.aa(0)}}
B.a0i.prototype={
E(d,e){if(this.e)throw A.p(A.am("Cannot add event after closing."))
if(this.d)return
this.a.a.E(0,e)},
dC(d,e){if(this.e)throw A.p(A.am("Cannot add event after closing."))
if(this.d)return
this.aUj(d,e)},
ia(d){return this.dC(d,null)},
aUj(d,e){var w=this
if(w.w){w.a.a.dC(d,e)
return}w.c.hn(d,e)
w.alj()
w.b.ali()
w.a.a.aa(0).fS(new B.bAb())},
aa(d){var w=this
if(w.e)return w.c.a
w.e=!0
if(!w.d){w.b.ali()
w.c.cJ(0,w.a.a.aa(0))}return w.c.a},
alj(){this.d=!0
var w=this.c
if((w.a.a&30)===0)w.dW(0)
return},
$ie6:1}
B.ahe.prototype={}
B.ahf.prototype={}
B.B7.prototype={
aga(d,e){var w=this.b
if((w.b&4)!==0)return
w.E(0,new B.Hp(d,e))
w.aa(0)},
acd(d){var w
if((this.b.b&4)!==0)throw A.p(B.chc())
w=A.c7(d)
w.toString
this.a.send(w)},
zk(d,e,f){return this.bge(0,e,f)},
bge(d,e,f){var w=0,v=A.k(x.H),u=this,t
var $async$zk=A.f(function(g,h){if(g===1)return A.h(h,v)
while(true)switch(w){case 0:t=u.b
if((t.b&4)!==0)throw A.p(B.chc())
t.aa(0)
u.a.close()
return A.i(null,v)}})
return A.j($async$zk,v)},
$ichb:1}
B.v5.prototype={}
B.LL.prototype={
p(d,e){if(e==null)return!1
return e instanceof B.LL&&e.a===this.a},
gI(d){return C.d.gI(this.a)}}
B.GZ.prototype={
p(d,e){var w,v,u,t
if(e==null)return!1
if(e instanceof B.GZ&&e.a.length===this.a.length){for(w=this.a,v=w.length,u=e.a,t=0;t<v;++t)if(u[t]!==w[t])return!1
return!0}return!1},
gI(d){return A.hC(this.a)},
l(d){return"BinaryDataReceived("+A.u(this.a)+")"}}
B.Hp.prototype={
p(d,e){if(e==null)return!1
return e instanceof B.Hp&&e.a===this.a&&e.b===this.b},
gI(d){return A.hC([this.a,this.b])},
l(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.Mk.prototype={
l(d){var w=this.a
if(w.length===0)return"WebSocketException"
else return"WebSocketException: "+w},
$ibR:1}
B.Mj.prototype={
l(d){var w=this.a
if(w.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+w}}
B.axF.prototype={
gkL(){var w,v=this,u=v.w
if(u===$){w=v.r.b
w===$&&A.d()
w=w.a
w===$&&A.d()
u!==$&&A.b3()
u=v.w=new B.au5(v,w)}return u},
aGV(d){d.ft(0,new B.axJ(this),new B.axK(this),x.a)}}
B.au5.prototype={
aa(d){var w=this.b
w.e=w.d=null
return this.aCk(0)}}
B.aiz.prototype={
l(d){return"WebSocketChannelException: "+this.a},
$ibR:1}
B.yR.prototype={
O(){return"RTCSignalingState."+this.b}}
B.UP.prototype={
O(){return"RTCIceGatheringState."+this.b}}
B.yP.prototype={
O(){return"RTCPeerConnectionState."+this.b}}
B.oe.prototype={
O(){return"RTCIceConnectionState."+this.b}}
B.aeU.prototype={
O(){return"RTCVideoViewObjectFit."+this.b}}
B.yQ.prototype={
O(){return"RTCPriorityType."+this.b}}
B.aYB.prototype={}
B.Tk.prototype={}
B.Jz.prototype={
l(d){var w=this.d
return"Track(id: "+A.u(w.id)+", kind: "+A.u(w.kind)+", label: "+A.u(w.label)+", enabled: "+A.u(w.enabled)+", muted: "+A.u(w.muted)+")"}}
B.aTh.prototype={}
B.Kq.prototype={}
B.UQ.prototype={}
B.cgw.prototype={}
B.aeS.prototype={}
B.Kr.prototype={}
B.Kp.prototype={}
B.aYN.prototype={}
B.UR.prototype={}
B.aYS.prototype={}
B.Ed.prototype={}
B.WX.prototype={}
B.US.prototype={}
B.UU.prototype={
as6(d,e,f,g){var w=g==null?this.a:g,v=d==null?this.b:d,u=f==null?this.c:f
return new B.UU(w,v,u)},
bgX(d){return this.as6(null,d,null,null)},
l(d){var w=this
return A.ad(w).l(0)+"(width: "+A.u(w.a)+", height: "+A.u(w.b)+", rotation: "+w.c+")"}}
var z=a.updateTypes(["av<~>()","~()","~(Lk)","bA(Kq)","bA(US)","bA(oe)","~(@)","ph(@)","Kp(aF)","ah<o,@>(Kr)","bA(chb)","~(v5)"])
B.b3B.prototype={
$0(){return J.cCQ(this.a.bl())},
$S:1}
B.b3C.prototype={
$1(d){var w,v,u,t
try{this.b.E(0,this.a.$ti.y[1].a(d))}catch(u){t=A.M(u)
if(x.i.b(t)){w=t
v=A.bx(u)
this.b.dC(w,v)}else throw u}},
$S(){return this.a.$ti.i("~(1)")}}
B.cap.prototype={
$1(d){var w,v,u,t=$.K().b
if(t==null||t.length===0)return
w=self
v=new w.Headers()
v.set("Authorization","Bearer "+A.u(t))
v.set("Content-Type","application/json")
u=x.N
w.window.fetch("https://connexion-prophetique.onrender.com/messagerie/appels/"+this.a+"/signaux",{method:"POST",headers:v,body:C.Y.dv(A.a2(["type","termine","contenu",A.C(u,x.z)],u,x.K),null),keepalive:!0})},
$S:24}
B.cao.prototype={
$0(){return self.window.removeEventListener("beforeunload",this.a)},
$S:0}
B.azW.prototype={
$1(d){if(d==null)return null
return A.bU(J.l(d))},
$S:105}
B.bv2.prototype={
$0(){var w=this.a
if(w.c!=null&&!w.e)w.JV(!0)},
$S:0}
B.bv3.prototype={
$1(d){return this.a.UW()},
$S:27}
B.bv_.prototype={
$0(){var w=this.a.c
if(w!=null)A.a1(w,!1).bH()},
$S:0}
B.bv0.prototype={
$0(){return this.a.e=!0},
$S:0}
B.buX.prototype={
$0(){var w=this.a
w.d=!1
w.e=!0},
$S:0}
B.buY.prototype={
$0(){return this.a.d=!1},
$S:0}
B.buZ.prototype={
$0(){var w=this.a
w.d=!1
w.e=!0},
$S:0}
B.buU.prototype={
$0(){return this.a.f=!0},
$S:0}
B.buV.prototype={
$0(){return this.a.f=!1},
$S:0}
B.buW.prototype={
$1(d){var w=null,v=this.a.a,u=v.c,t=v.e,s=v.d
return B.cf2(v.w,w,u,v.y,s,w,w,w,!1,t)},
$S:1203}
B.bv1.prototype={
$0(){return this.a.b6o()},
$S:0}
B.buT.prototype={
$0(){var w=this.a
if(w.c!=null)w.k(new B.buS())},
$S:0}
B.buS.prototype={
$0(){},
$S:0}
B.buF.prototype={
$1(d){this.a.yj("candidat_ice",d,!1)},
$S:212}
B.buG.prototype={
$0(){var w=this.a
if(w.c!=null)w.k(new B.buE(w))},
$S:0}
B.buE.prototype={
$0(){return this.a.go=!0},
$S:0}
B.buH.prototype={
$0(){this.a.mF(A.b("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.buI.prototype={
$0(){},
$S:0}
B.buJ.prototype={
$1(d){var w=this.a,v=w.ch
if(w.c!=null&&v!=null&&w.x)w.k(new B.buD(w,v))},
$S:27}
B.buD.prototype={
$0(){return this.a.CW=new A.at(Date.now(),0,!1).ev(this.b)},
$S:0}
B.buK.prototype={
$1(d){},
$S:130}
B.buL.prototype={
$1(d){this.a.yu()},
$S:27}
B.bui.prototype={
$0(){var w=this.a
if(w.c!=null&&!w.x&&!w.y){if(w.a.f)w.yj("annule",C.bg,!1)
w.mF(A.b("Pas de r\xe9ponse"))}},
$S:0}
B.bul.prototype={
$0(){var w=this.a
w.fy=w.a.d==="video"||w.at?A.b(y.c):A.b(y.d)},
$S:0}
B.bum.prototype={
$1(d){this.a.yj("candidat_ice",d,!1)},
$S:212}
B.bun.prototype={
$0(){var w=this.a
if(w.c!=null)w.k(new B.buk(w))},
$S:0}
B.buk.prototype={
$0(){return this.a.go=!0},
$S:0}
B.buo.prototype={
$0(){this.a.mF(A.b("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.bup.prototype={
$0(){return this.a.z=!0},
$S:0}
B.buq.prototype={
$1(d){var w=this.a,v=w.ch
if(w.c!=null&&v!=null&&w.x)w.k(new B.buj(w,v))},
$S:27}
B.buj.prototype={
$0(){return this.a.CW=new A.at(Date.now(),0,!1).ev(this.b)},
$S:0}
B.bur.prototype={
$1(d){},
$S:130}
B.bus.prototype={
$1(d){this.a.yu()},
$S:27}
B.buN.prototype={
$1(d){var w=this.a
if(w.c!=null&&!w.y)w.Tv()},
$S:32}
B.buO.prototype={
$1(d){this.a.mF(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.buP.prototype={
$1(d){var w=this.a
if(w.c!=null&&!w.y)w.a2h("offre",d)},
$S:1205}
B.buQ.prototype={
$1(d){this.a.mF(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.buC.prototype={
$0(){return this.a.at=!0},
$S:0}
B.buz.prototype={
$0(){var w=this.a
w.x=!0
w.ch=new A.at(Date.now(),0,!1)
w.CW=C.R},
$S:0}
B.buA.prototype={
$0(){return this.a.id=!0},
$S:0}
B.buB.prototype={
$1(d){var w=this.a.c
if(w!=null)A.a1(w,!1).bH()},
$S:5}
B.buM.prototype={
$1(d){return A.C(x.N,x.z)},
$S:101}
B.bue.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.buc.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.bud.prototype={
$0(){return this.a.ay=this.b},
$S:0}
B.buh.prototype={
$0(){return this.a.at=!0},
$S:0}
B.bub.prototype={
$1(d){var w=null,v=A.c(A.b("Statistiques de l\u2019appel"),w,w,w,w,C.cW,w,w,w),u=this.a,t=A.dc(A.c(u,w,w,w,w,C.cW,w,w,w),w,C.x,w,w,w,C.ah)
return A.bT(A.a([A.aN(!1,A.c(A.b("Fermer"),w,w,w,w,w,w,w,w),w,w,C.p,w,w,w,w,new B.bu9(d),w,w),A.aN(!1,A.c(A.b("Copier"),w,w,w,w,w,w,w,w),w,w,C.p,w,w,w,w,new B.bua(u,d),w,w)],x.p),D.qY,t,v)},
$S:4}
B.bu9.prototype={
$0(){return A.a1(this.a,!1).bH()},
$S:0}
B.bua.prototype={
$0(){var w,v,u=null
A.wk(new A.qx(this.a))
w=this.b
A.a1(w,!1).bH()
v=A.b("Statistiques copi\xe9es.")
w.q(x.q).f.v(A.z(u,u,u,u,u,C.h,u,A.c(v,u,u,u,u,u,u,u,u),u,C.l,u,u,u,u,u,u,u,u,u))},
$S:0}
B.buf.prototype={
$0(){},
$S:0}
B.bug.prototype={
$0(){},
$S:0}
B.buu.prototype={
$0(){var w=this.a,v=w.c
v.toString
A.a1(v,!1).bH()
w.HE()},
$S:0}
B.buv.prototype={
$0(){var w=this.a,v=w.c
v.toString
A.a1(v,!1).bH()
w.HF()},
$S:0}
B.buw.prototype={
$0(){var w=this.a,v=w.c
v.toString
A.a1(v,!1).bH()
w.Ht()},
$S:0}
B.bux.prototype={
$0(){var w=this.a,v=w.c
v.toString
A.a1(v,!1).Yq().aN(0,new B.but(w),x.H)},
$S:0}
B.but.prototype={
$1(d){return this.a.amo()},
$S:9}
B.buy.prototype={
$1(d){return A.fr(!0,A.I(this.a,C.n,C.f,C.O),!0,C.a_,!0,!0)},
$S:128}
B.buR.prototype={
$2(d,e){if(!d)this.a.JQ()},
$S:1207}
B.bQP.prototype={
$2(d,e){var w,v,u,t=null,s=this.a,r=s.d
r===$&&A.d()
r=r.x
r===$&&A.d()
s=s.a.e
w=s?0.07:0.04
s=s?0.55:0.35
v=this.b
u=v+20
r=A.cru(A.S(t,t,C.j,t,t,new A.a4(t,t,A.bn(C.t.b3(s*(1-r)),3),t,t,t,C.aJ),t,u,t,t,t,t,t,u),1+w*r)
v+=8
v=A.S(t,t,C.j,t,t,new A.a4(t,t,A.bn(C.t,2),t,t,t,C.aJ),t,v,t,t,t,t,t,v)
e.toString
return A.e2(C.a6,A.a([r,v,e],x.p),C.h,C.aI,t)},
$S:1208}
B.caG.prototype={
$3(d,e,f){if(e==null)return d+" : inconnu"
if(typeof e=="number")return d+" : "+C.e.aQ(e,1)+f
return d+" : "+A.u(e)+f},
$2(d,e){return this.$3(d,e,"")},
$S:1209}
B.b3_.prototype={
$1(d){var w,v=d.a
if(v.length===0)return
w=this.a.f
if(w!=null)w.$1(A.a2(["candidate",v,"sdpMid",d.b,"sdpMLineIndex",d.c],x.N,x.z))},
$S:z+3}
B.b30.prototype={
$1(d){var w=d.b,v=w.length!==0?C.b.gU(w):null
if(v!=null)this.a.aPp(v)
if(d.c.d.kind==="video"){w=this.a.r
if(w!=null)w.$0()}},
$S:z+4}
B.b31.prototype={
$1(d){var w
if(d===D.Ou){w=this.a.w
if(w!=null)w.$0()}},
$S:z+5}
B.b2Z.prototype={
$0(){var w=this.a
if(w.ay){w.DN()
w=w.ch
if(w!=null)w.$0()}},
$S:22}
B.aDC.prototype={
$1(d){return this.a.a4m()},
$S:20}
B.aDD.prototype={
$0(){var w=this.a
if(!w.e)w.Hw()},
$S:0}
B.cbt.prototype={
$1(d){return d.length!==0},
$S:8}
B.aTx.prototype={
$1(d){return this.a.push(B.cfS(d))},
$S:20}
B.aTy.prototype={
$1(d){return this.a.push(B.cfS(d))},
$S:20}
B.aTu.prototype={
$1(d){var w=this.a.c
if(w!=null)w.$0()},
$S:28}
B.aTv.prototype={
$1(d){},
$S:28}
B.aTw.prototype={
$1(d){},
$S:28}
B.aTj.prototype={
$0(){return!1},
$S:52}
B.aTk.prototype={
$0(){return!1},
$S:52}
B.aTl.prototype={
$1(d){J.hv(d,new B.aTi(this.a))},
$S:212}
B.aTi.prototype={
$2(d,e){this.a.j(0,d,e)},
$S:53}
B.aYE.prototype={
$1(d){},
$S:28}
B.aYF.prototype={
$1(d){var w,v
if(d.candidate!=null){w=this.a.e
if(w!=null){v=d.candidate
w.$1(new B.Kq(v.candidate,v.sdpMid,v.sdpMLineIndex))}}},
$S:28}
B.aYG.prototype={
$1(d){var w,v=this.a,u=v.at
u===$&&A.d()
u=B.cXv(u.iceConnectionState)
v.cx=u
w=v.d
if(w!=null)w.$1(u)
if($.cjz())switch(v.cx.a){case 0:v.cy=D.Oz
break
case 1:v.cy=D.OA
break
case 3:v.cy=D.OB
break
case 5:v.cy=D.Ox
break
case 6:v.cy=D.Oy
break
case 7:v.cy=D.v6
break
default:break}},
$S:46}
B.aYH.prototype={
$1(d){var w=this.a,v=w.at
v===$&&A.d()
w.CW=B.cXw(v.iceGatheringState)},
$S:46}
B.aYI.prototype={
$1(d){var w=this.a,v=w.at
v===$&&A.d()
w.ch=B.cZG(v.signalingState)},
$S:46}
B.aYJ.prototype={
$1(d){var w=this.a,v=w.at
v===$&&A.d()
w.cy=B.cYP(v.connectionState)},
$S:46}
B.aYK.prototype={
$1(d){},
$S:46}
B.aYL.prototype={
$1(d){var w,v,u=this.a,t=u.Q
if(t!=null){w=B.cfS(d.track)
v=d.streams
v=x.l.b(v)?v:new A.dB(v,A.Y(v).i("dB<1,aF>"))
u=J.dq(v,new B.aYD(u),x.h)
t.$1(new B.US(A.G(u,!0,u.$ti.i("aD.E")),w))}},
$S:28}
B.aYD.prototype={
$1(d){return new B.ph(d,this.a.as)},
$S:z+7}
B.aYM.prototype={
$2(d,e){var w,v,u=x.M.a(A.Gt(d)),t=A.C(x.N,x.z)
for(w=u.ge6(u),w=w.gae(w);w.B();){v=w.gJ(w)
t.j(0,J.l(v.a),v.b)}this.a.push(new B.WX(d.type,t))},
$S:1210}
B.aYQ.prototype={
$1(d){var w="id",v=x.f.a(A.Gt(d)),u=J.dv(v)
if(u.aC(v,w))u.j(v,w,C.e.C(A.iH(u.h(v,w))))
u.h(v,"uri")
u.h(v,w)
u.h(v,"encrypted")
return new B.Kp()},
$S:z+8}
B.aYP.prototype={
$1(d){var w,v,u,t,s,r,q,p,o,n=null,m="numTemporalLayers",l="scaleResolutionDownBy",k=A.Gt(d.rid),j=d.active,i=d.maxBitrate
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
j=B.cwA(o.h(0,"priority"))
k=j==null?D.v7:j
this.a.push(new B.Kr(p,q,r,t,s,u,v,w,i,k,B.cwA(o.h(0,"networkPriority"))))},
$S:20}
B.aYO.prototype={
$1(d){var w,v,u,t,s,r=null,q=d.payloadType,p=d.name
if(p==null)p=r
w=d.kind
if(w==null)w=r
v=d.clockRate
u=d.numChannels
u=u==null?r:A.bp(u)
t=d.parameters
t=t==null?r:A.Gt(t)
s=x.z
s=A.a2(["payloadType",q,"name",p,"kind",w,"clockRate",v,"numChannels",u,"parameters",t],s,s)
s.h(0,"payloadType")
s.h(0,"name")
t=s.h(0,"kind")
s.h(0,"clockRate")
s.h(0,"numChannels")
s.h(0,"parameters")
this.a.push(new B.aeS(t))},
$S:20}
B.aYR.prototype={
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
w=$.cCE()
u.j(0,"priority",w.h(0,d.y))
v=d.z
if(v!=null)u.j(0,"networkPriority",w.h(0,v))
return u},
$S:z+9}
B.cbC.prototype={
$1(d){return J.hH(self.window.navigator.userAgent,A.bE(d,!1,!1))},
$S:8}
B.aYX.prototype={
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
w.aeC(s)
u=x.bU.c
v.push(A.i_(s,"canplay",new B.aYT(w),!1,u))
v.push(A.i_(s,"resize",new B.aYU(w),!1,u))
v.push(A.i_(s,"error",new B.aYV(s),!1,u))
v.push(A.i_(s,"ended",new B.aYW(),!1,u))
return s},
$S:173}
B.aYT.prototype={
$1(d){this.a.ap8()},
$S:20}
B.aYU.prototype={
$1(d){this.a.ap8()},
$S:20}
B.aYV.prototype={
$1(d){var w,v,u=this.a.error
A.t1("RTCVideoRenderer: videoElement.onError, "+J.l(u))
u.toString
w=C.JH.h(0,A.aw(u,"code"))
w.toString
v=!J.r(A.aw(u,"message"),"")?A.aw(u,"message"):"No further diagnostic information can be determined or provided."
throw A.p(A.o9(w,C.JG.h(0,A.aw(u,"code")),v,null))},
$S:24}
B.aYW.prototype={
$1(d){},
$S:20}
B.aYY.prototype={
$0(){},
$S:0}
B.aZ_.prototype={
$0(){var w=this.a.a
return w.c.as=w.e},
$S:0}
B.aYZ.prototype={
$2(d,e){var w=null,v=this.a.a.c
if(v.z!=null)v=A.aNe("RTCVideoRenderer-"+v.Q)
else v=A.S(w,w,C.j,w,w,w,w,w,w,w,w,w,w,w)
return A.cx(A.S(w,v,C.j,w,w,w,w,e.d,w,w,w,w,w,e.b),w,w)},
$S:1211}
B.aMf.prototype={
$0(){var w,v,u=this.b
if(u.d)return
w=this.a.a
v=u.b
v===$&&A.d()
u.c=w.fL(v.git(v),new B.aMe(u),v.gpE())},
$S:0}
B.aMe.prototype={
$0(){var w=this.a,v=w.a
v===$&&A.d()
v.alj()
w=w.b
w===$&&A.d()
w.aa(0)},
$S:0}
B.bAb.prototype={
$1(d){},
$S:17}
B.aC9.prototype={
$1(d){this.a.cJ(0,this.b)},
$S:28}
B.aCa.prototype={
$1(d){var w=this.a
if((w.a.a&30)===0)w.hQ(new B.Mk("Failed to connect WebSocket"))
else this.b.aga(1006,"error")},
$S:28}
B.aCb.prototype={
$1(d){var w,v,u=this.a.b
if((u.b&4)!==0)return
w=d.data
w.toString
v=A.cF("data")
if(typeof w==="string")v.b=new B.LL(A.br(w))
else if(typeof w==="object"&&A.cox(x.m.a(w),"ArrayBuffer"))v.b=new B.GZ(A.TK(x.R.a(w),0,null))
else throw A.p(A.am("unexpected message type: "+J.aL(w).l(0)))
u.E(0,v.bl())},
$S:24}
B.aCc.prototype={
$1(d){var w=this.a
if((w.a.a&30)===0)w.cJ(0,this.b)
this.b.aga(d.code,d.reason)},
$S:28}
B.axJ.prototype={
$1(d){var w=d.b,v=this.a
new A.cZ(w,A.x(w).i("cZ<1>")).d2(new B.axG(v))
w=v.r.a
w===$&&A.d()
w=w.b
w===$&&A.d()
new A.cZ(w,A.x(w).i("cZ<1>")).bow(new B.axH(d),new B.axI(v,d))
v.f.dW(0)},
$S:z+10}
B.axG.prototype={
$1(d){var w,v,u
$label0$0:{w=d instanceof B.LL
v=w?d.a:null
if(w){w=this.a.r.a
w===$&&A.d()
w=w.a
w===$&&A.d()
w.E(0,v)
break $label0$0}w=d instanceof B.GZ
u=w?d.a:null
if(w){w=this.a.r.a
w===$&&A.d()
w=w.a
w===$&&A.d()
w.E(0,u)
break $label0$0}if(d instanceof B.Hp){w=this.a.r.a
w===$&&A.d()
w=w.a
w===$&&A.d()
w.aa(0)}}},
$S:z+11}
B.axH.prototype={
$1(d){var w,v,u,t,s,r,q
try{$label1$1:{w=d
v=null
s=typeof w=="string"
if(s)v=w
if(s){s=this.a
r=v
if((s.b.b&4)!==0)A.aq(B.chc())
r=A.c7(r)
r.toString
s.a.send(r)
break $label1$1}u=null
s=x.k.b(w)
if(s)u=w
if(s){this.a.acd(u)
break $label1$1}t=null
s=x.I.b(w)
if(s)t=w
if(s){this.a.acd(new Uint8Array(A.bX(t)))
break $label1$1}s=A.aV("Cannot send "+J.aL(d).l(0))
throw A.p(s)}}catch(q){if(!(A.M(q) instanceof B.Mj))throw q}},
$S:18}
B.axI.prototype={
$0(){var w=0,v=A.k(x.H),u=1,t,s=this,r,q,p
var $async$$0=A.f(function(d,e){if(d===1){t=e
w=u}while(true)switch(w){case 0:u=3
r=s.a
w=6
return A.e(s.b.zk(0,r.d,r.e),$async$$0)
case 6:u=1
w=5
break
case 3:u=2
p=t
if(!(A.M(p) instanceof B.Mj))throw p
w=5
break
case 2:w=1
break
case 5:return A.i(null,v)
case 1:return A.h(t,v)}})
return A.j($async$$0,v)},
$S:1}
B.axK.prototype={
$1(d){var w,v=d instanceof A.XC?d:new B.aiz(J.l(d)),u=this.a
u.f.hQ(v)
u=u.r.a
u===$&&A.d()
w=u.a
w===$&&A.d()
w.ia(v)
u=u.a
u===$&&A.d()
u.aa(0)},
$S:46};(function aliases(){var w=B.I0.prototype
w.aCk=w.aa
w=B.a5B.prototype
w.aG9=w.m})();(function installTearOffs(){var w=a._instance_0u,v=a._instance_1u
w(B.a_p.prototype,"gaIo","BH",0)
var u
v(u=B.a_o.prototype,"gap_","ap0",2)
w(u,"gam2","JQ",0)
w(u,"gamn","amo",1)
w(u,"gaeT","Qt",0)
w(u,"gaeS","Qs",0)
w(u,"gaeQ","Qq",0)
w(u,"gaeR","HE",0)
w(u,"gaeV","Qu",0)
w(u,"galu","b3a",1)
v(u=B.a8E.prototype,"gb65","b66",6)
w(u,"gb4x","a4m",1)
w(B.UT.prototype,"gee","m",0)
w(B.UW.prototype,"gb2g","b2h",1)})();(function inheritance(){var w=a.mixinHard,v=a.inheritMany,u=a.inherit
v(A.ai,[B.I0,B.azV,B.Lk,B.a8S,B.b2Y,B.a8E,B.acy,B.aYB,B.Tk,B.Jz,B.aTh,B.UQ,B.UR,B.aYS,B.ahf,B.a0i,B.ahe,B.B7,B.v5,B.Mk,B.aiz,B.Kq,B.cgw,B.aeS,B.Kr,B.Kp,B.aYN,B.Ed,B.WX,B.US,B.UU])
u(B.Wy,A.h3)
v(A.kh,[B.b3B,B.cao,B.bv2,B.bv_,B.bv0,B.buX,B.buY,B.buZ,B.buU,B.buV,B.bv1,B.buT,B.buS,B.buG,B.buE,B.buH,B.buI,B.buD,B.bui,B.bul,B.bun,B.buk,B.buo,B.bup,B.buj,B.buC,B.buz,B.buA,B.bue,B.buc,B.bud,B.buh,B.bu9,B.bua,B.buf,B.bug,B.buu,B.buv,B.buw,B.bux,B.b2Z,B.aDD,B.aTj,B.aTk,B.aYY,B.aZ_,B.aMf,B.aMe,B.axI])
v(A.jG,[B.b3C,B.cap,B.azW,B.bv3,B.buW,B.buF,B.buJ,B.buK,B.buL,B.bum,B.buq,B.bur,B.bus,B.buN,B.buO,B.buP,B.buQ,B.buB,B.buM,B.bub,B.but,B.buy,B.caG,B.b3_,B.b30,B.b31,B.aDC,B.cbt,B.aTx,B.aTy,B.aTu,B.aTv,B.aTw,B.aTl,B.aYE,B.aYF,B.aYG,B.aYH,B.aYI,B.aYJ,B.aYK,B.aYL,B.aYD,B.aYQ,B.aYP,B.aYO,B.aYR,B.cbC,B.aYX,B.aYT,B.aYU,B.aYV,B.aYW,B.bAb,B.aC9,B.aCa,B.aCb,B.aCc,B.axJ,B.axG,B.axH,B.axK])
v(A.T,[B.qI,B.qH,B.Nz,B.UV])
v(A.Z,[B.a_p,B.a_o,B.a5B,B.UW])
v(A.au,[B.YQ,B.akf,B.YR,B.zP])
v(A.to,[B.buR,B.bQP,B.aTi,B.aYM,B.aYZ])
u(B.aoR,B.a5B)
u(B.aYC,B.aYB)
u(B.ph,B.Tk)
u(B.ad0,B.Jz)
u(B.Tj,B.aTh)
u(B.aeR,B.UQ)
u(B.aeT,B.UR)
u(B.cgx,B.aYS)
u(B.UT,A.dx)
v(B.ahf,[B.aba,B.axF])
v(B.v5,[B.LL,B.GZ,B.Hp])
u(B.Mj,B.Mk)
u(B.au5,B.I0)
v(A.MS,[B.yR,B.UP,B.yP,B.oe,B.aeU,B.yQ])
w(B.a5B,A.h2)})()
A.nj(b.typeUniverse,JSON.parse('{"I0":{"e6":["1"]},"Wy":{"h3":["1","2"],"h3.S":"1","h3.T":"2"},"Nz":{"T":[],"q":[]},"qI":{"T":[],"q":[]},"a_p":{"Z":["qI"]},"YQ":{"au":[],"q":[]},"qH":{"T":[],"q":[]},"a_o":{"Z":["qH"]},"akf":{"au":[],"q":[]},"YR":{"au":[],"q":[]},"zP":{"au":[],"q":[]},"aoR":{"Z":["Nz"]},"ph":{"Tk":[]},"ad0":{"Jz":[]},"aeR":{"UQ":[]},"aeT":{"UR":[]},"UT":{"dx":["UU"],"b1":[]},"UV":{"T":[],"q":[]},"UW":{"Z":["UV"]},"a0i":{"e6":["1"]},"B7":{"chb":[]},"LL":{"v5":[]},"GZ":{"v5":[]},"Hp":{"v5":[]},"Mk":{"bR":[]},"Mj":{"bR":[]},"au5":{"e6":["@"]},"aiz":{"bR":[]}}'))
A.csT(b.typeUniverse,JSON.parse('{"I0":1,"ahf":1}'))
var y={c:"Micro ou cam\xe9ra refus\xe9 : autorise le micro et la cam\xe9ra dans les r\xe9glages pour appeler en vid\xe9o.",d:"Micro refus\xe9 : autorise le micro dans les r\xe9glages pour appeler."}
var x=(function rtii(){var w=A.aA
return{b:w("B7"),L:w("bR"),_:w("av<@>"),x:w("av<~>"),T:w("H<ah<o,V>>"),t:w("H<ah<o,@>>"),Q:w("H<Jz>"),B:w("H<aeS>"),O:w("H<Kr>"),o:w("H<WX>"),d:w("H<jo<@>>"),s:w("H<o>"),p:w("H<q>"),r:w("H<ai?>"),m:w("aF"),M:w("SY<ai?,ai?>"),l:w("E<aF>"),F:w("E<ah<o,@>>"),J:w("E<WX>"),j:w("E<@>"),I:w("E<v>"),P:w("ah<o,@>"),f:w("ah<@,@>"),E:w("Tk"),G:w("Jz"),h:w("ph"),R:w("r_"),a:w("bA"),K:w("ai"),W:w("Kp"),Y:w("UQ"),e:w("UR"),v:w("Ed"),Z:w("ahe<ai?>"),N:w("o"),i:w("ry"),k:w("eB"),D:w("v5"),U:w("X<o>"),g:w("du<Lk>"),n:w("du<~>"),V:w("bg<B7>"),u:w("bg<@>"),w:w("bg<~>"),bU:w("a_z<aF>"),C:w("q0<aF>"),cF:w("aB<B7>"),c:w("aB<@>"),d4:w("aB<~>"),q:w("kH"),y:w("V"),z:w("@"),S:w("v"),A:w("aF?"),cO:w("ah<o,@>?"),X:w("ai?"),H:w("~")}})();(function constants(){var w=a.makeConstList
D.qY=new A.a_(1,0.10588235294117647,0.17254901960784313,0.25098039215686274,C.w)
D.Z2=new B.a8S(C.dG)
D.rF=new A.ak(32,0,32,0)
D.a2M=new A.ak(8,20,8,20)
D.a2Z=new A.cQ(1,C.ar,C.azj,null)
D.Bg=new A.an(57639,"MaterialIcons",null,!1)
D.a45=new A.an(58337,"MaterialIcons",null,!1)
D.a46=new A.an(58341,"MaterialIcons",null,!1)
D.a47=new A.an(58721,"MaterialIcons",null,!0)
D.a4a=new A.an(58888,"MaterialIcons",null,!1)
D.Br=new A.an(59048,"MaterialIcons",null,!1)
D.a4b=new A.an(59049,"MaterialIcons",null,!1)
D.a4c=new A.an(59077,"MaterialIcons",null,!1)
D.Bl=new A.an(58195,"MaterialIcons",null,!1)
D.a6a=new A.a9(D.Bl,null,C.m,null,null)
D.a69=new A.a9(D.Bl,28,C.m,null,null)
D.a4e=new A.an(61044,"MaterialIcons",null,!1)
D.a6o=new A.a9(D.a4e,null,C.m,null,null)
D.Bq=new A.an(58923,"MaterialIcons",null,!1)
D.a6t=new A.a9(D.Bq,null,C.m,null,null)
D.a6s=new A.a9(D.Bq,20,C.m,null,null)
D.afT=A.a(w([1,2,4,8,16]),A.aA("H<v>"))
D.Ef=A.a(w([]),x.Q)
D.JX=new A.fT("FlutterWebRTC.Method",C.bi,null)
D.av5=new B.oe(0,"RTCIceConnectionStateNew")
D.av6=new B.oe(1,"RTCIceConnectionStateChecking")
D.av7=new B.oe(2,"RTCIceConnectionStateCompleted")
D.av8=new B.oe(3,"RTCIceConnectionStateConnected")
D.av9=new B.oe(4,"RTCIceConnectionStateCount")
D.Ou=new B.oe(5,"RTCIceConnectionStateFailed")
D.ava=new B.oe(6,"RTCIceConnectionStateDisconnected")
D.Ov=new B.oe(7,"RTCIceConnectionStateClosed")
D.Ow=new B.UP(0,"RTCIceGatheringStateNew")
D.avb=new B.UP(1,"RTCIceGatheringStateGathering")
D.avc=new B.UP(2,"RTCIceGatheringStateComplete")
D.v6=new B.yP(0,"RTCPeerConnectionStateClosed")
D.Ox=new B.yP(1,"RTCPeerConnectionStateFailed")
D.Oy=new B.yP(2,"RTCPeerConnectionStateDisconnected")
D.Oz=new B.yP(3,"RTCPeerConnectionStateNew")
D.OA=new B.yP(4,"RTCPeerConnectionStateConnecting")
D.OB=new B.yP(5,"RTCPeerConnectionStateConnected")
D.OC=new B.yQ(0,"veryLow")
D.v7=new B.yQ(1,"low")
D.OD=new B.yQ(2,"medium")
D.OE=new B.yQ(3,"high")
D.avd=new B.yR(0,"RTCSignalingStateStable")
D.ave=new B.yR(1,"RTCSignalingStateHaveLocalOffer")
D.avf=new B.yR(2,"RTCSignalingStateHaveRemoteOffer")
D.avg=new B.yR(3,"RTCSignalingStateHaveLocalPrAnswer")
D.avh=new B.yR(4,"RTCSignalingStateHaveRemotePrAnswer")
D.OF=new B.yR(5,"RTCSignalingStateClosed")
D.avi=new B.UU(0,0,0)
D.v8=new B.aeU(0,"RTCVideoViewObjectFitContain")
D.OG=new B.aeU(1,"RTCVideoViewObjectFitCover")
D.az4=new A.ci(48,null,null,null)
D.azh=new A.ci(null,64,null,null)
D.aCj=new A.D(!0,C.m,null,null,null,null,26,C.A,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.aCx=new A.D(!0,C.o,null,null,null,null,40,C.A,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.wo=new A.D(!0,C.al,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.cia=null
$.crV=!1
$.cq1=1
$.d_8=A.a2(["very-low",D.OC,"low",D.v7,"medium",D.OD,"high",D.OE],x.N,A.aA("yQ"))})();(function lazyInitializers(){var w=a.lazyFinal
w($,"d4J","awR",()=>new B.aYC())
w($,"d1k","cjz",()=>C.d.u(A.aw(A.aw(A.aw(A.cjc(),"window"),"navigator"),"userAgent"),"Firefox"))
w($,"das","cCE",()=>A.a2([D.OC,"very-low",D.v7,"low",D.OD,"medium",D.OE,"high"],A.aA("yQ"),x.N))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_1",e:"endPart",h:b})})($__dart_deferred_initializers__,"mLJ0VfipSWXrLrJNU3s+MlqN8Pg=");