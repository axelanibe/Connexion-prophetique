((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_2",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={DF:function DF(){},QD:function QD(d){this.$ti=d},aQh:function aQh(d){this.a=d},aQi:function aQi(d,e){this.a=d
this.b=e},
a00(d){var x,w,v,u,t,s=new B.apy(),r=J.O(d),q=r.h(d,"id")
q=J.l(q==null?"":q)
x=r.h(d,"conversation_id")
J.l(x==null?"":x)
x=r.h(d,"appelant_id")
x=J.l(x==null?"":x)
w=r.h(d,"appelant_nom")
w=J.l(w==null?"":w)
v=A.aO(r.h(d,"appele_id"))
A.aO(r.h(d,"appele_nom"))
u=r.h(d,"type")
u=J.l(u==null?"audio":u)
t=r.h(d,"statut")
t=J.l(t==null?"sonne":t)
s.$1(r.h(d,"cree_le"))
s.$1(r.h(d,"repondu_le"))
return new B.apx(q,x,w,v,u,t)},
bYb(d){var x,w,v,u=J.O(d),t=u.h(d,"contenu"),s=u.h(d,"id")
s=J.l(s==null?"":s)
x=u.h(d,"appel_id")
J.l(x==null?"":x)
x=u.h(d,"emetteur_id")
x=J.l(x==null?"":x)
w=u.h(d,"type")
w=J.l(w==null?"":w)
if(y.P.b(t))v=t
else v=y.f.b(t)?J.md(t,y.N,y.z):C.e1
if(u.h(d,"cree_le")!=null)A.c2(J.l(u.h(d,"cree_le")))
return new B.Gk(s,x,w,v)},
c8c(d){var x,w,v,u,t,s,r=J.O(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return D.TK
x=A.b([],y.t)
for(r=J.aq(q),w=y.f,v=y.P,u=y.N,t=y.z;r.A();){s=r.gL(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.md(s,u,t))}return new B.a1q(x)},
bKz(d){var x=C.h.b_(d.a,1e6)
return C.c.aZ(C.h.j(C.h.b_(x,60)),2,"0")+":"+C.c.aZ(C.h.j(C.h.aP(x,60)),2,"0")},
c22(d){var x=J.O(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.oC(v)
if(!x.m(v,"offer")&&!x.m(v,"answer"))return null
return new A.ah2(w,v)},
clK(d){var x,w,v=J.O(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.ah5(u,A.jG(w)?w:null,v)},
apx:function apx(d,e,f,g,h,i){var _=this
_.a=d
_.c=e
_.d=f
_.e=g
_.r=h
_.w=i},
apy:function apy(){},
Gk:function Gk(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a1q:function a1q(d){this.a=d},
bVj(d,e,f,g,h,i){return new B.p4(e,f,i,h,d,null)},
bVi(d,e,f,g,h){return new B.yw(e,h,f,g,d,null)},
bZt(d,e,f,g,h,i,j,k,l,m,n){return new B.abA(g,f,e,i,h,d,m,l,k,j,n,null)},
p4:function p4(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.r=g
_.w=h
_.a=i},
U0:function U0(){var _=this
_.d=!0
_.f=_.e=!1
_.c=_.a=_.x=_.w=_.r=null},
bbl:function bbl(d){this.a=d},
bbm:function bbm(d){this.a=d},
bbi:function bbi(d){this.a=d},
bbj:function bbj(d){this.a=d},
bbf:function bbf(d){this.a=d},
bbg:function bbg(d){this.a=d},
bbh:function bbh(d){this.a=d},
bbc:function bbc(d){this.a=d},
bbd:function bbd(d){this.a=d},
bbe:function bbe(d){this.a=d},
bbk:function bbk(d){this.a=d},
SF:function SF(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
yw:function yw(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
U_:function U_(d,e){var _=this
_.e=_.d=$
_.f=d
_.r=null
_.Q=_.z=_.y=_.x=_.w=!1
_.as=!0
_.at=null
_.ax=e
_.c=_.a=_.cy=_.cx=_.CW=_.ch=_.ay=null},
baX:function baX(d){this.a=d},
baY:function baY(d){this.a=d},
baW:function baW(){},
baZ:function baZ(d){this.a=d},
bb_:function bb_(d){this.a=d},
bb0:function bb0(d){this.a=d},
bb1:function bb1(d){this.a=d},
baV:function baV(d,e){this.a=d
this.b=e},
bb2:function bb2(){},
bb3:function bb3(d){this.a=d},
bb5:function bb5(d){this.a=d},
bb6:function bb6(d){this.a=d},
bb7:function bb7(d){this.a=d},
bb8:function bb8(d){this.a=d},
bb9:function bb9(d){this.a=d},
bba:function bba(d){this.a=d},
bb4:function bb4(d){this.a=d},
baU:function baU(d,e){this.a=d
this.b=e},
baT:function baT(d,e){this.a=d
this.b=e},
baS:function baS(d,e){this.a=d
this.b=e},
bbb:function bbb(d){this.a=d},
abA:function abA(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
wB:function wB(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
aPF:function aPF(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.y=_.x=!1},
aPG:function aPG(d){this.a=d},
aPH:function aPH(d){this.a=d},
aPI:function aPI(d){this.a=d},
a1c:function a1c(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.x=null},
asB:function asB(d){this.a=d},
asC:function asC(d){this.a=d},
amP(d){var x=y.U,w=A.H(new A.Z(A.b(d.split(" "),y.s),new B.bLt(),x),!0,x.i("t.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.p(C.b.gR(w),0).toUpperCase()
return(J.p(C.b.gR(w),0)+J.p(C.b.gaI(w),0)).toUpperCase()},
bLt:function bLt(){},
aKN:function aKN(){},
mG:function mG(d,e,f){this.e=d
this.a=e
this.b=f},
aGc:function aGc(d){this.a=d},
aGd:function aGd(d){this.a=d},
bP0(d){var x=new B.a5_(d)
x.aw3(d)
return x},
a5_:function a5_(d){this.d=d},
aG9:function aG9(d){this.a=d},
aGa:function aGa(d){this.a=d},
aGb:function aGb(d){this.a=d},
aFV:function aFV(){},
aFX:function aFX(){},
aFY:function aFY(){},
aFZ:function aFZ(d){this.a=d},
aFW:function aFW(d){this.a=d},
ccZ(d,e){var x=y.N
x=new B.a6E(d,e,A.C(x,y.E),A.C(x,y.z))
x.aw8(d,e)
return x},
a6E:function a6E(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aKQ:function aKQ(d){this.a=d},
aKR:function aKR(d){this.a=d},
aKS:function aKS(d){this.a=d},
aKT:function aKT(d){this.a=d},
aKU:function aKU(d){this.a=d},
aKV:function aKV(d){this.a=d},
aKW:function aKW(d){this.a=d},
aKX:function aKX(d){this.a=d},
aKO:function aKO(d){this.a=d},
aKP:function aKP(d,e){this.a=d
this.b=e},
bPy:function bPy(d){this.a=d},
cnH(){return C.b.m5(A.b(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.bLB())!==-1},
bLB:function bLB(){},
bXF(){var x=A.b([],y.d),w=$.bXG
$.bXG=w+1
return new B.P8(w,x,D.ait,$.af())},
P8:function P8(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.k2$=0
_.k3$=g
_.ok$=_.k4$=0},
aL2:function aL2(d){this.a=d},
aKZ:function aKZ(d){this.a=d},
aL_:function aL_(d){this.a=d},
aL0:function aL0(d){this.a=d},
aL1:function aL1(){},
bXH(d,e,f){return new B.Pa(d,f,e,null)},
Pa:function Pa(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
Pb:function Pb(){this.c=this.a=null},
aL3:function aL3(){},
aL5:function aL5(d){this.a=d},
aL4:function aL4(d){this.a=d},
bVS(d,e,f,g){var x,w={}
w.a=d
x=new B.a3u(g.i("a3u<0>"))
x.avV(e,f,w,g)
return x},
a3u:function a3u(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
azB:function azB(d,e){this.a=d
this.b=e},
azA:function azA(d){this.a=d},
UR:function UR(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bg0:function bg0(){},
a8R:function a8R(d){this.b=this.a=$
this.$ti=d},
a8S:function a8S(){},
bNL(d,e){return B.c7v(d,e)},
c7v(d,e){var x=0,w=A.k(y.b),v,u,t,s,r,q,p
var $async$bNL=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:if(!d.o0("ws")&&!d.o0("wss"))throw A.n(A.fh(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.j(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.xR(r,A.fz(null,null,null,!1,y.D))
u=new A.au($.aE,y.k)
p=new A.aZ(u,y.V)
if(J.q(r.readyState,1))p.ci(0,q)
else if(J.q(r.readyState,2)||J.q(r.readyState,3))p.fF(new B.Hc("Unexpected WebSocket state: "+A.r(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.oq(r,"open",!1,y.C).gR(0).az(new B.arw(p,q),y.H)
t=y.C
s=y.H
new A.oq(r,"error",!1,t).gR(0).az(new B.arx(p,q),s)
A.hQ(r,"message",new B.ary(q),!1,y.m)
new A.oq(r,"close",!1,t).gR(0).az(new B.arz(p,q),s)
v=u
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$bNL,w)},
xR:function xR(d,e){this.a=d
this.b=e},
arw:function arw(d,e){this.a=d
this.b=e},
arx:function arx(d,e){this.a=d
this.b=e},
ary:function ary(d){this.a=d},
arz:function arz(d,e){this.a=d
this.b=e},
bQa(){return new B.Hb("Connection Closed")},
ta:function ta(){},
GJ:function GJ(d){this.a=d},
CV:function CV(d){this.a=d},
Dj:function Dj(d,e){this.a=d
this.b=e},
Hc:function Hc(d){this.a=d},
Hb:function Hb(d){this.a=d},
c72(d){var x=null,w=$.aE,v=new B.a8R(y.Z),u=y.X,t=A.fz(x,x,x,!0,u),s=A.fz(x,x,x,!0,u),r=A.u(s),q=A.u(t)
v.a=B.bVS(new A.cs(s,r.i("cs<1>")),new A.C7(t,q.i("C7<1>")),!0,u)
v.b=B.bVS(new A.cs(t,q.i("cs<1>")),new A.C7(s,r.i("C7<1>")),!1,u)
v=new B.anL(new A.aZ(new A.au(w,y.W),y.R),v)
v.avM(d)
return v},
anL:function anL(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
anP:function anP(d){this.a=d},
anM:function anM(d){this.a=d},
anN:function anN(d){this.a=d},
anO:function anO(d,e){this.a=d
this.b=e},
anQ:function anQ(d){this.a=d},
akI:function akI(d,e){this.b=d
this.a=e},
a9Z:function a9Z(d){this.a=d},
cnh(d){switch(d){case"new":return D.aig
case"checking":return D.aih
case"connected":return D.aij
case"completed":return D.aii
case"failed":return D.Kk
case"disconnected":return D.ail
case"closed":return D.Kl
case"count":return D.aik}return D.Kl},
cni(d){switch(d){case"new":return D.Km
case"gathering":return D.aim
case"complete":return D.ain}return D.Km},
coP(d){switch(d){case"stable":return D.aio
case"have-local-offer":return D.aip
case"have-local-pranswer":return D.air
case"have-remote-offer":return D.aiq
case"have-remote-pranswer":return D.ais
case"closed":return D.Ks}return D.Ks},
coq(d){switch(d){case"new":return D.Kp
case"connecting":return D.Kq
case"connected":return D.Kr
case"closed":return D.rP
case"disconnected":return D.Ko
case"failed":return D.Kn}return D.rP},
vP:function vP(d,e){this.a=d
this.b=e},
P5:function P5(d,e){this.a=d
this.b=e},
vO:function vO(d,e){this.a=d
this.b=e},
mT:function mT(d,e){this.a=d
this.b=e},
a6F:function a6F(d,e){this.a=d
this.b=e},
aKM:function aKM(){},
NK:function NK(){},
EU:function EU(){},
aFU:function aFU(){},
FA:function FA(d,e,f){this.a=d
this.b=e
this.c=f},
P6:function P6(){},
aKY:function aKY(){},
Ao:function Ao(d,e){this.a=d
this.b=e},
P7:function P7(d){this.b=d},
P9:function P9(d,e,f){this.a=d
this.b=e
this.c=f},
bOI(d){var x=0,w=A.k(y.y)
var $async$bOI=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.n("The is not a video track => "+d.j(0))
throw A.n("You need to specify the deviceId")
return A.i(null,w)}})
return A.j($async$bOI,w)},
aIG(d){var x=0,w=A.k(y.H),v
var $async$aIG=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.d(B.aUz("enableSpeakerphone",A.a5(["enable",d],y.N,v),v,v),$async$aIG)
case 2:return A.i(null,w)}})
return A.j($async$aIG,w)},
aUz(d,e,f,g){return B.cfE(d,e,f,g,f.i("0?"))},
cfE(d,e,f,g,h){var x=0,w=A.k(h),v
var $async$aUz=A.f(function(i,j){if(i===1)return A.h(j,w)
while(true)switch(x){case 0:x=3
return A.d(B.aUy(),$async$aUz)
case 3:v=D.G_.c4(d,e,!1,f)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$aUz,w)},
aUy(){var x=0,w=A.k(y.H),v,u
var $async$aUy=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:x=!$.bZk?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.d(D.G_.c4("initialize",A.a5(["options",A.C(v,u)],v,u),!1,y.H),$async$aUy)
case 4:$.bZk=!0
case 3:return A.i(null,w)}})
return A.j($async$aUy,w)}},D,E
J=c[1]
A=c[0]
C=c[2]
B=a.updateHolder(c[5],B)
D=c[26]
E=c[18]
B.DF.prototype={
D(d,e){this.a.D(0,e)},
cY(d,e){this.a.cY(d,e)},
a5(d){return this.a.a5(0)},
$idH:1}
B.QD.prototype={
iJ(d){var x=A.cA("subscription"),w=A.fz(new B.aQh(x),null,null,!0,this.$ti.y[1])
x.b=d.eP(new B.aQi(this,w),w.gm0(w),w.glX())
return new A.cs(w,A.u(w).i("cs<1>"))}}
B.apx.prototype={}
B.Gk.prototype={}
B.a1q.prototype={}
B.p4.prototype={
N(){return new B.U0()}}
B.U0.prototype={
U(){var x=this
x.W()
x.KA()
x.r=A.dh(C.c0,new B.bbl(x))
x.w=A.ix(C.xo,new B.bbm(x))},
k(){var x=this,w=x.r
if(w!=null)w.V(0)
w=x.w
if(w!=null)w.V(0)
w=x.x
if(w!=null)w.V(0)
x.a4()},
Xp(){var x=this.x
if(x!=null)x.V(0)
this.x=A.dh(C.fS,new B.bbi(this))},
Of(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Of=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.e||s.f){x=1
break}u=4
p=s.a
p.toString
o=$.a8()
x=7
return A.d(o.AM(p.c),$async$Of)
case 7:r=e
q=B.a00(r)
if(s.c==null||s.e){x=1
break}if(q.w!=="sonne"){s.n(new B.bbj(s))
p=s.r
if(p!=null)p.V(0)
p=s.w
if(p!=null)p.V(0)
s.Xp()}u=2
x=6
break
case 4:u=3
m=t
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Of,w)},
KA(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$KA=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
o=s.a
o.toString
n=$.a8()
x=7
return A.d(n.AM(o.c),$async$KA)
case 7:r=e
q=B.a00(r)
if(s.c==null){x=1
break}m=s.a.r
if(m==null)m=n.gakO()
p=m
if(q.w!=="sonne"||q.c===p){s.n(new B.bbf(s))
s.Xp()
x=1
break}s.n(new B.bbg(s))
u=2
x=6
break
case 4:u=3
k=t
if(s.c==null){x=1
break}s.n(new B.bbh(s))
s.Xp()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$KA,w)},
Kq(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$Kq=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.f||s.e){x=1
break}s.n(new B.bbc(s))
u=4
q=s.a
q.toString
p=$.a8()
x=7
return A.d(p.a0a(q.c,"accepte"),$async$Kq)
case 7:u=2
x=6
break
case 4:u=3
n=t
r=A.N(n)
if(s.c==null){x=1
break}s.n(new B.bbd(s))
q=s.c
q.toString
p=J.l(r)
q.u(y.q).f.B(A.y(null,null,null,null,null,C.f,null,A.c(p,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
x=1
break
x=6
break
case 3:x=2
break
case 6:if(s.c==null){x=1
break}q=s.r
if(q!=null)q.V(0)
q=s.w
if(q!=null)q.V(0)
q=s.c
q.toString
A.aa(q,!1).xm(A.e4(new B.bbe(s),null,y.z))
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Kq,w)},
F0(d){return this.aQR(d)},
aQQ(){return this.F0(!1)},
aQR(d){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$F0=A.f(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:if(s.f){x=1
break}s.f=!0
r=s.r
if(r!=null)r.V(0)
r=s.w
if(r!=null)r.V(0)
u=4
r=s.a
r.toString
q=$.a8()
x=7
return A.d(q.a0a(r.c,"refuse"),$async$F0)
case 7:u=2
x=6
break
case 4:u=3
o=t
x=6
break
case 3:x=2
break
case 6:r=s.c
if(r!=null)A.aa(r,!1).bC()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$F0,w)},
C(d){var x,w,v,u,t=this,s=null,r=t.a,q=r.e
r=A.ky(C.o,s,A.c(B.amP(r.d),s,s,s,s,D.MK,s,s,s),s,56)
x=t.a.d
x=A.c(x.length===0?A.a("Un membre"):x,s,s,s,s,D.Mv,C.V,s,s)
if(t.d)q=A.a("Connexion\u2026")
else if(t.e)q=A.a("Appel termin\xe9")
else q=q==="video"?A.a("Appel vid\xe9o entrant"):A.a("Appel entrant")
w=y.p
q=A.b([r,C.au,new A.a_(D.xI,x,s),C.k,A.c(q,s,s,s,s,D.tX,s,s,s),D.LW],w)
if(!t.d&&!t.e){r=A.a("Refuser")
x=t.f?s:new B.bbk(t)
v=A.a("Accepter")
u=t.f?s:t.gawN()
q.push(A.W(A.b([new B.SF(D.yt,C.aB,r,x,s),D.alX,new B.SF(D.ys,C.cw,v,u,s)],w),C.p,C.bi,C.i,s))}if(t.d)q.push(C.w5)
return A.ex(s,C.n,A.fy(!0,A.cG(A.J(q,C.p,C.e,C.U),s,s),!0,C.aj,!0,!0),s,s)}}
B.SF.prototype={
C(d){var x=this,w=null,v=A.dj(x.d,w,w,C.aj,C.cg,w)
return A.J(A.b([A.ab(A.b5(!1,A.c5(x.c,C.l,w,32),C.j,w,C.r,w,w,w,w,x.f,w,v),72,72),C.k,A.c(x.e,w,w,w,w,C.e8,w,w,w)],y.p),C.p,C.e,C.U)}}
B.yw.prototype={
N(){return new B.U_(A.b0(y.N),C.R)}}
B.U_.prototype={
U(){var x,w,v=this,u=null
v.W()
v.a.toString
x=B.bXF()
w=B.bXF()
v.d!==$&&A.bj()
v.d=new B.aPF(x,w)
v.a.toString
x=new B.a1c(new A.dz(u,u,y.g),new A.dz(u,u,y.n))
v.e!==$&&A.bj()
v.e=x
v.v8()},
k(){var x=this,w=x.ay
if(w!=null)w.V(0)
w=x.ch
if(w!=null)w.V(0)
w=x.CW
if(w!=null)w.V(0)
w=x.cx
if(w!=null)w.V(0)
w=x.cy
if(w!=null)w.V(0)
w=x.d
w===$&&A.e()
w.iO()
w=x.e
w===$&&A.e()
w.GQ()
x.a4()},
v8(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i
var $async$v8=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
m=s.a
m.toString
l=$.a8()
x=7
return A.d(l.AM(m.c),$async$v8)
case 7:r=e
q=B.a00(r)
if(s.c==null){x=1
break}m=q.w
if(m==="termine"||m==="expire"){s.mC(A.a("Appel termin\xe9"))
x=1
break}s.r=s.a.f?q.c:q.e
x=8
return A.d(l.PQ(),$async$v8)
case 8:p=e
o=B.c8c(p)
x=9
return A.d(s.Un(),$async$v8)
case 9:if(!e){m=s.c
if(m!=null){l=s.a.d==="video"?A.a("Autorise le micro et la cam\xe9ra pour appeler en vid\xe9o."):A.a("Autorise le micro pour appeler.")
m.u(y.q).f.B(A.y(null,null,null,null,null,C.f,null,A.c(l,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))}s.mC(null)
x=1
break}m=s.d
m===$&&A.e()
k=s.a.d
x=10
return A.d(m.ui(A.a5(["iceServers",o.a],y.N,y.z),k==="video"),$async$v8)
case 10:m.f=new B.baX(s)
m.r=new B.baY(s)
m.w=new B.baZ(s)
if(s.c==null){x=1
break}s.n(new B.bb_(s))
s.ch=A.dh(C.c0,new B.bb0(s))
s.CW=A.ix(C.ch,new B.bb1(s))
m=s.e
m===$&&A.e()
k=m.r
s.cx=new A.cg(k,A.u(k).i("cg<1>")).cA(s.gaVQ())
k=m.w
s.cy=new A.cg(k,A.u(k).i("cg<1>")).cA(new B.bb2())
s.a.toString
n=l.b
if(n!=null&&J.a4(n)!==0){s.a.toString
m.P0(C.c.S9("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws?jeton="+A.f5(C.c9,n,C.ai,!0))}s.ay=A.ix(C.fS,new B.bb3(s))
s.Eq()
u=2
x=6
break
case 4:u=3
i=t
m=s.c
if(m==null){x=1
break}l=A.a("Impossible de d\xe9marrer l\u2019appel. V\xe9rifie ta connexion, puis r\xe9essaie.")
m.u(y.q).f.B(A.y(null,null,null,null,null,C.f,null,A.c(l,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
s.mC(null)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$v8,w)},
Un(){var x=0,w=A.k(y.y),v
var $async$Un=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v=!0
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Un,w)},
Eq(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Eq=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.x){x=1
break}u=4
p=s.a
p.toString
o=$.a8()
x=7
return A.d(o.bY("/messagerie/appels/"+p.c+"/signaux"),$async$Eq)
case 7:r=e
for(p=J.aq(r);p.A();){q=p.gL(p)
s.af2(B.bYb(q))}u=2
x=6
break
case 4:u=3
m=t
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Eq,w)},
af2(d){var x,w,v,u,t,s=this
if(s.c==null||s.x)return
x=s.f
w=d.a
if(x.q(0,w))return
x.D(0,w)
x=s.r
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(s.a.f)return
v=B.c22(d.e)
if(v==null)return
x=s.d
x===$&&A.e()
x.Ag(A.a5(["sdp",v.a,"type",v.b],y.N,y.z)).az(new B.bb5(s),y.a).fE(new B.bb6(s))
break
case"reponse":if(!s.a.f)return
u=B.c22(d.e)
if(u==null)return
x=s.d
x===$&&A.e()
x.OF(A.a5(["sdp",u.a,"type",u.b],y.N,y.z)).az(new B.bb7(s),y.a).fE(new B.bb8(s))
break
case"candidat_ice":t=B.clK(d.e)
if(t==null)return
x=s.d
x===$&&A.e()
x.OA(A.a5(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],y.N,y.z))
break
case"accepte":if(!s.a.f||s.w)return
x=s.d
x===$&&A.e()
x.GK().az(new B.bb9(s),y.a).fE(new B.bba(s))
break
case"refuse":s.mC(A.a("Appel refus\xe9"))
break
case"annule":s.mC(A.a("Appel annul\xe9"))
break
case"termine":s.mC(A.a("Appel termin\xe9"))
break}},
acb(){var x,w=this
if(w.w)return
x=w.ch
if(x!=null)x.V(0)
w.n(new B.bb4(w))},
yJ(d,e,f){return this.aDG(d,e,f)},
a8B(d,e){return this.yJ(d,e,!0)},
aDG(d,e,f){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p
var $async$yJ=A.f(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
s=t.a
s.toString
r=$.a8()
x=6
return A.d(r.aiT(s.c,e,d),$async$yJ)
case 6:v=1
x=5
break
case 3:v=2
p=u
if(f&&t.c!=null&&!t.x)t.mC(A.a("L\u2019appel n\u2019a pas pu aboutir."))
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$yJ,w)},
EX(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$EX=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.x){x=1
break}s.x=!0
r=s.ch
if(r!=null)r.V(0)
u=4
r=s.a
r.toString
q=$.a8()
x=7
return A.d(q.a0a(r.c,"termine"),$async$EX)
case 7:u=2
x=6
break
case 4:u=3
o=t
x=6
break
case 3:x=2
break
case 6:r=s.c
if(r!=null)A.aa(r,!1).bC()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$EX,w)},
mC(d){var x,w=this,v=null
if(w.x)return
w.x=!0
x=w.ch
if(x!=null)x.V(0)
if(d!=null&&w.c!=null)w.c.u(y.q).f.B(A.y(v,v,v,v,v,C.f,v,A.c(d,v,v,v,v,v,v,v,v),v,C.m,v,v,v,v,v,v,v,v,v))
x=w.c
if(x!=null)A.aa(x,!1).bC()},
KI(){var x=0,w=A.k(y.H),v=this,u,t
var $async$KI=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.z
t=v.d
t===$&&A.e()
x=2
return A.d(t.Tn(u),$async$KI)
case 2:if(v.c!=null)v.n(new B.baU(v,u))
return A.i(null,w)}})
return A.j($async$KI,w)},
KH(){var x=0,w=A.k(y.H),v=this,u,t
var $async$KH=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.e()
x=2
return A.d(t.JG(u),$async$KH)
case 2:if(v.c!=null)v.n(new B.baT(v,u))
return A.i(null,w)}})
return A.j($async$KH,w)},
KF(){var x=0,w=A.k(y.H),v=this,u,t
var $async$KF=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.as
t=v.d
t===$&&A.e()
x=2
return A.d(t.Tk(u),$async$KF)
case 2:if(v.c!=null)v.n(new B.baS(v,u))
return A.i(null,w)}})
return A.j($async$KF,w)},
KG(){var x=0,w=A.k(y.H),v=this,u
var $async$KG=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=v.d
u===$&&A.e()
x=2
return A.d(u.OI(),$async$KG)
case 2:return A.i(null,w)}})
return A.j($async$KG,w)},
C(d){var x,w,v,u,t,s,r=this,q=null,p="Connexion\u2026",o=r.d
o===$&&A.e()
x=o.c
w=r.a
if(w.d==="video"&&r.y){if(x!=null)x=B.bXH(o.e,!1,D.Ku)
else{x=A.ky(C.o,q,A.c(B.amP(w.e),q,q,q,q,D.aqn,q,q,q),q,48)
w=A.c(r.a.e,q,q,q,q,D.aoI,q,q,q)
x=A.cG(A.J(A.b([x,C.q,w,C.k,A.c(r.w?B.bKz(r.ax):A.a(p),q,q,q,q,D.tX,q,q,q)],y.p),C.p,C.e,C.U),q,q)}x=A.Fr(0,x)
o=A.i8(q,A.f8(A.Q(12),B.bXH(o.d,!0,D.Ku),C.aq),160,q,q,16,16,110)
w=r.w
v=B.bKz(r.ax)
u=r.z
t=r.Q
u=A.eN(C.b7,A.b([x,o,A.i8(24,B.bZt(r.as,v,w,!0,t,u,r.ga6d(),r.ga6c(),r.ga6e(),r.ga6f(),r.gacs()),q,q,0,0,q,q)],y.p),C.f,C.b6,q)
o=u}else{o=A.ky(C.o,q,A.c(B.amP(w.e),q,q,q,q,D.MK,q,q,q),q,56)
x=A.c(r.a.e,q,q,q,q,D.Mv,C.V,q,q)
if(r.w)w=B.bKz(r.ax)
else w=r.y?A.a("Appel en cours\u2026"):A.a(p)
w=A.c(w,q,q,q,q,D.tX,q,q,q)
v=r.w
u=B.bKz(r.ax)
t=r.z
s=r.Q
t=A.cG(A.J(A.b([o,C.au,new A.a_(D.xI,x,q),C.k,w,D.LW,B.bZt(r.as,u,v,!1,s,t,r.ga6d(),r.ga6c(),r.ga6e(),r.ga6f(),r.gacs())],y.p),C.p,C.e,C.U),q,q)
o=t}return A.bPs(!1,A.ex(q,C.n,A.fy(!0,o,!0,C.aj,!0,!0),q,q),new B.bbb(r),y.K)}}
B.abA.prototype={
C(d){var x,w,v=this,u=null,t=y.p,s=A.b([],t),r=v.d
if(r&&v.c)s.push(A.c(v.e,u,u,u,u,E.MC,u,u,u))
if(r&&v.c)s.push(C.q)
r=v.f
x=r?D.Zf:D.Ze
t=A.b([new B.wB(x,r,A.a("Muet"),v.x,u,u),D.nT,new B.wB(D.Zk,v.r,A.a("Haut-parleur"),v.y,u,u)],t)
r=v.c
if(r)t.push(D.nT)
if(r){x=v.w
w=x?D.yx:D.Zj
t.push(new B.wB(w,!x,A.a("Cam\xe9ra"),v.z,u,u))}if(r)t.push(D.nT)
if(r)t.push(new B.wB(D.Zi,!1,A.a("Basculer"),v.Q,u,u))
t.push(D.nT)
t.push(new B.wB(D.yt,!1,A.a("Raccrocher"),v.as,C.aB,u))
s.push(A.W(t,C.p,C.bi,C.i,u))
return A.J(s,C.p,C.e,C.U)}}
B.wB.prototype={
C(d){var x,w=this,v=null,u=w.r,t=u==null
if(t)u=w.d?C.l:C.lw
if(!t)x=C.l
else x=w.d?C.n:C.l
t=A.dj(u,v,v,C.aj,C.cg,v)
return A.J(A.b([A.ab(A.b5(!1,A.c5(w.c,x,v,26),C.j,v,C.r,v,v,v,v,w.f,v,t),56,56),C.b1,A.c(w.e,v,v,v,v,C.MD,v,v,v)],y.p),C.p,C.e,C.U)}}
B.aPF.prototype={
ui(d,e){return this.b8n(d,e)},
b8n(d,e){var x=0,w=A.k(y.H),v=this,u,t,s,r,q,p,o
var $async$ui=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:o=v.d
x=2
return A.d(o.io(0),$async$ui)
case 2:x=3
return A.d(v.e.io(0),$async$ui)
case 3:u=$.c3K()
if(e){t=y.N
t=A.a5(["facingMode","user"],t,t)}else t=!1
s=y.N
r=y.z
x=4
return A.d(new B.aFV().Cy(0,A.a5(["audio",!0,"video",t],s,r)),$async$ui)
case 4:q=v.b=g
o.sa4l(0,q)
x=5
return A.d(u.a_o(d,A.C(s,r)),$async$ui)
case 5:p=v.a=g
x=6
return A.d(p.kk(0,q),$async$ui)
case 6:p.e=new B.aPG(v)
p.Q=new B.aPH(v)
p.d=new B.aPI(v)
return A.i(null,w)}})
return A.j($async$ui,w)},
aC4(d){var x,w=this
w.c=d
if(!w.x){w.x=!0
w.e.sa4l(0,d)
x=w.r
if(x!=null)x.$0()}},
GK(){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$GK=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.am("Connexion non pr\xe9par\xe9e."))
x=3
return A.d(s.Pc(0),$async$GK)
case 3:t=e
x=4
return A.d(s.CM(0,t),$async$GK)
case 4:v=A.a5(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$GK,w)},
Ag(d){return this.b0_(d)},
b0_(d){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$Ag=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.am("Connexion non pr\xe9par\xe9e."))
x=3
return A.d(s.CO(0,new B.Ao(d.h(0,"sdp"),d.h(0,"type"))),$async$Ag)
case 3:x=4
return A.d(s.Pa(0),$async$Ag)
case 4:t=f
x=5
return A.d(s.CM(0,t),$async$Ag)
case 5:v=A.a5(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Ag,w)},
OF(d){return this.aY6(d)},
aY6(d){var x=0,w=A.k(y.H),v=this,u
var $async$OF=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.n(A.am("Connexion non pr\xe9par\xe9e."))
x=2
return A.d(u.CO(0,new B.Ao(d.h(0,"sdp"),d.h(0,"type"))),$async$OF)
case 2:return A.i(null,w)}})
return A.j($async$OF,w)},
OA(d){return this.aXT(d)},
aXT(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$OA=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.d(t.Oq(new B.FA(A.aO(d.h(0,"candidate")),A.aO(d.h(0,"sdpMid")),A.ee(d.h(0,"sdpMLineIndex")))),$async$OA)
case 3:case 1:return A.i(v,w)}})
return A.j($async$OA,w)},
Tn(d){return this.apB(d)},
apB(d){var x=0,w=A.k(y.H),v=this,u,t,s,r
var $async$Tn=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.SV(0)
if(r==null)r=C.dm
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.L)(r),++s)r[s].skp(0,t)
return A.i(null,w)}})
return A.j($async$Tn,w)},
JG(d){return this.aps(d)},
aps(d){var x=0,w=A.k(y.H)
var $async$JG=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:x=2
return A.d(B.aIG(d),$async$JG)
case 2:return A.i(null,w)}})
return A.j($async$JG,w)},
Tk(d){return this.apk(d)},
apk(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$Tk=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.Jp(0)
if(s==null)s=C.dm
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.L)(s),++t)s[t].skp(0,d)
return A.i(null,w)}})
return A.j($async$Tk,w)},
OI(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$OI=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.Jp(0)
if(s==null)s=D.aae
if(s.length===0){x=1
break}x=3
return A.d(B.bOI(C.b.gR(s)),$async$OI)
case 3:case 1:return A.i(v,w)}})
return A.j($async$OI,w)},
iO(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$iO=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
u=4
q=s.a
q=q==null?null:q.a5(0)
x=7
return A.d(y.x.b(q)?q:A.di(q,y.H),$async$iO)
case 7:u=2
x=6
break
case 4:u=3
i=t
x=6
break
case 3:x=2
break
case 6:s.a=null
q=s.b
if(q==null)q=null
else{o=A.H(q.SV(0),!0,y.G)
C.b.t(o,q.Jp(0))
q=o}if(q==null)q=C.dm
o=q.length
n=y.c
m=y._
l=0
case 8:if(!(l<q.length)){x=10
break}r=q[l]
u=12
k=J.c6X(r)
if(!m.b(k)){j=new A.au($.aE,n)
j.a=8
j.c=k
k=j}x=15
return A.d(k,$async$iO)
case 15:u=2
x=14
break
case 12:u=11
h=t
x=14
break
case 11:x=2
break
case 14:case 9:q.length===o||(0,A.L)(q),++l
x=8
break
case 10:s.b=null
u=17
x=20
return A.d(s.d.k(),$async$iO)
case 20:u=2
x=19
break
case 17:u=16
g=t
x=19
break
case 16:x=2
break
case 19:u=22
x=25
return A.d(s.e.k(),$async$iO)
case 25:u=2
x=24
break
case 22:u=21
f=t
x=24
break
case 21:x=2
break
case 24:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$iO,w)}}
B.a1c.prototype={
P0(d){return this.aZp(d)},
aZp(d){var x=0,w=A.k(y.H),v=this
var $async$P0=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.x=d
v.e=!1
v.f=0
x=2
return A.d(v.Dj(),$async$P0)
case 2:return A.i(null,w)}})
return A.j($async$P0,w)},
Dj(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$Dj=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.e){x=1
break}r=s.x
if(r==null||J.a4(r)===0){x=1
break}u=4
q=B.c72(B.bNL(A.cz(r,0,null),null))
s.b=q
x=7
return A.d(q.f.a,$async$Dj)
case 7:s.f=0
p=q.r.b
p===$&&A.e()
p=p.b
p===$&&A.e()
s.c=new A.cs(p,A.u(p).i("cs<1>")).aS(s.gaQz(),!0,s.gaPH(),new B.asB(s))
u=2
x=6
break
case 4:u=3
n=t
s.Xg()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Dj,w)},
aQA(d){var x,w,v,u
try{x=C.W.cJ(0,J.l(d),null)
v=y.P
if(!v.b(x))return
if(!J.q(J.p(x,"type"),"signal_appel"))return
w=J.p(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.D(0,B.bYb(w))}catch(u){}},
Xg(){var x,w=this,v=w.c
if(v!=null)v.V(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.D(0,null)
return}x=D.a6r[v]
w.f=v+1
v=w.d
if(v!=null)v.V(0)
w.d=A.dh(A.d5(0,0,0,0,x),new B.asC(w))},
GQ(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o
var $async$GQ=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.V(0)
s=t.c
s=s==null?null:s.V(0)
x=2
return A.d(y.x.b(s)?s:A.di(s,y.H),$async$GQ)
case 2:t.c=null
v=4
s=t.b
if(s==null)s=null
else{r=s.w
if(r===$){q=s.r.b
q===$&&A.e()
q=q.a
q===$&&A.e()
r!==$&&A.aV()
r=s.w=new B.akI(s,q)}s=r.a5(0)}x=7
return A.d(y._.b(s)?s:A.di(s,y.z),$async$GQ)
case 7:v=1
x=6
break
case 4:v=3
o=u
x=6
break
case 3:x=1
break
case 6:t.b=null
return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$GQ,w)}}
B.aKN.prototype={
a_o(d,e){return this.b_R(d,e)},
b_R(d,e){var x=0,w=A.k(y.J),v,u,t,s,r
var $async$a_o=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.a5(["mandatory",A.C(r,r),"optional",A.b([A.a5(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.S)],t,y.K)}r=self.RTCPeerConnection
t=A.fv(u,y.N,y.z)
t.t(0,d)
s=new r(y.m.a(A.bP(t)))
t=J.l(s)
v=B.ccZ(C.ct.gl8().bg(new A.eI(t)),s)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a_o,w)}}
B.mG.prototype={
SV(d){var x=A.b([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.cI(w,A.V(w).i("cI<1,av>"))
J.fK(w,new B.aGc(x))
return x},
Jp(d){var x=A.b([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.cI(w,A.V(w).i("cI<1,av>"))
J.fK(w,new B.aGd(x))
return x}}
B.a5_.prototype={
aw3(d){var x=this,w=x.d
w.addEventListener("ended",A.bF(new B.aG9(x)))
w.addEventListener("mute",A.bF(new B.aGa(x)))
w.addEventListener("unmute",A.bF(new B.aGb(x)))},
skp(d,e){this.d.enabled=e},
aF(d){var x=0,w=A.k(y.H),v=this
var $async$aF=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.i(null,w)}})
return A.j($async$aF,w)}}
B.aFV.prototype={
Cy(d,e){return this.aos(0,e)},
aos(d,e){var x=0,w=A.k(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$Cy=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.cnH())if(y.f.b(e.h(0,"video"))&&J.p(e.h(0,"video"),"facingMode")!=null)J.iE(e.h(0,"video"),"facingMode")
e.co(0,"video",new B.aFX())
e.co(0,"audio",new B.aFY())}catch(a0){A.nl("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.hM(e.h(0,"audio"),i,i).aR(0,"optional")&&y.F.b(J.p(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.p(e.h(0,"audio"),"optional")
r=A.C(y.N,y.z)
J.fK(s,new B.aFZ(r))
J.iE(e.h(0,"audio"),"optional")
J.j8(e.h(0,"audio"),r)}}catch(a0){q=A.N(a0)
p=A.bb(a0)
A.nl("[getUserMedia] failed to translate optional audio constraints, "+A.r(q)+", "+A.r(p))}i=self
o=i.window.navigator.mediaDevices
h=y.m
x=o.getUserMedia!=null?7:9
break
case 7:n=A.bP(e)
x=10
return A.d(A.dP(o.getUserMedia(h.a(n)),h),$async$Cy)
case 10:m=a2
i=m
h=i.id
v=new B.mG(i,h,"local")
x=1
break
x=8
break
case 9:i=i.window.navigator.mediaDevices
g=e.h(0,"audio")
x=11
return A.d(A.dP(i.getUserMedia({video:e.h(0,"video"),audio:g}),h),$async$Cy)
case 11:l=a2
h=l
g=h.id
v=new B.mG(h,g,"local")
x=1
break
case 8:u=2
x=6
break
case 4:u=3
f=t
k=A.N(f)
i=J.l(k)
throw A.n("Unable to getUserMedia: "+i)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Cy,w)}}
B.a6E.prototype={
aw8(d,e){var x=this,w=x.at
w===$&&A.e()
w.addEventListener("datachannel",A.bF(new B.aKQ(x)))
w.addEventListener("icecandidate",A.bF(new B.aKR(x)))
w.addEventListener("iceconnectionstatechange",A.bF(new B.aKS(x)))
w.onicegatheringstatechange=A.bF(new B.aKT(x))
w.addEventListener("signalingstatechange",A.bF(new B.aKU(x)))
if(!$.bS7())w.addEventListener("connectionstatechange",A.bF(new B.aKV(x)))
w.addEventListener("negotiationneeded",A.bF(new B.aKW(x)))
w.addEventListener("track",A.bF(new B.aKX(x)))},
Pc(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$Pc=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.e()
x=3
return A.d(A.dP(s.createOffer(y.m.a(A.bP(A.C(y.N,y.z)))),y.A),$async$Pc)
case 3:t=f
v=new B.Ao(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Pc,w)},
Pa(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$Pa=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.e()
x=3
return A.d(A.dP(s.createAnswer(y.m.a(A.bP(A.C(y.N,y.z)))),y.A),$async$Pa)
case 3:t=f
v=new B.Ao(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Pa,w)},
kk(d,e){var x
this.ax.co(0,e.a,new B.aKP(this,e))
x=this.at
x===$&&A.e()
x.addStream(e.e)
return A.cH(null,y.H)},
CM(d,e){return this.apw(0,e)},
apw(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$CM=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.e()
x=2
return A.d(A.dP(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$CM)
case 2:return A.i(null,w)}})
return A.j($async$CM,w)},
CO(d,e){return this.apM(0,e)},
apM(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$CO=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.e()
x=2
return A.d(A.dP(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$CO)
case 2:return A.i(null,w)}})
return A.j($async$CO,w)},
Oq(d){return this.aXy(d)},
aXy(d){var x=0,w=A.k(y.H),v=this,u,t
var $async$Oq=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.e()
u=d.b
u.toString
x=2
return A.d(A.dP(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$Oq)
case 2:return A.i(null,w)}})
return A.j($async$Oq,w)},
a5(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$a5=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.e()
t.close()
v=A.cH(null,y.H)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a5,w)}}
B.bPy.prototype={
aF(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$aF=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.N(r)
if(y.L.b(s)){u=s
s=u
J.l(s)
throw A.n("Unable to RTCRtpTransceiver::stop: "+A.r(s))}else throw r}return A.i(null,w)}})
return A.j($async$aF,w)}}
B.P8.prototype={
sal0(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.Hg()
if(x!=null)x.style.objectFit=e},
afb(){var x=this,w=x.Hg(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sl(0,v.ahX(u,x.z!=null,0,t))},
sa4l(d,e){var x,w,v,u,t=this
t.z=e
if(e.Jp(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.aq(y.l.b(x)?x:new A.cI(x,A.V(x).i("cI<1,av>")))
for(;x.A();){w=x.gL(x)
t.x.addTrack(w)}}if(e.SV(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.aq(y.l.b(x)?x:new A.cI(x,A.V(x).i("cI<1,av>")))
for(;x.A();){w=x.gL(x)
t.y.addTrack(w)}}if(t.y!=null){if(t.w==null){v=self.document.createElement("audio")
v.id="audio_"+("RTCVideoRenderer-"+t.Q)
v.muted=e.b==="local"
v.autoplay=!0
t.w=v
x=t.aDu()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.Hg()
if(u!=null){u.srcObject=t.x
x=t.Hg()
x.toString
t.a62(x)}t.sl(0,t.a.aZN(t.z!=null))},
aDu(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
if(v!=null)return v
x=w.document.createElement("div")
x.id="html_webrtc_audio_manager_list"
x.style.display="none"
w=w.document.body
if(w!=null)w.append(x)
return x},
Hg(){var x=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(x!=null)return x
return null},
k(){var x=0,w=A.k(y.H),v,u=this,t,s,r,q,p
var $async$k=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u.z=null
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.L)(t),++r)t[r].V(0)
q=u.Hg()
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
case 1:return A.i(v,w)}})
return A.j($async$k,w)},
io(d){var x=0,w=A.k(y.H),v=this
var $async$io=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:$.CA()
$.oF().r3("RTCVideoRenderer-"+v.Q,new B.aL2(v),!0)
return A.i(null,w)}})
return A.j($async$io,w)},
a62(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.Pa.prototype={
N(){return new B.Pb()}}
B.Pb.prototype={
U(){var x,w,v=this
v.W()
v.a.c.a7(0,v.gaNO())
x=v.a
w=x.c
w.as=x.e
w.sal0(0,x.d===D.Kt?"contain":"cover")},
aNP(){if(this.c!=null)this.n(new B.aL3())},
k(){if(this.c!=null)this.a4()},
aT(d){var x,w
this.b6(d)
A.dh(A.d5(0,0,10,0,0),new B.aL5(this))
x=this.a
w=x.c
w.sal0(0,x.d===D.Kt?"contain":"cover")},
C(d){return new A.jp(new B.aL4(this),null)}}
B.a3u.prototype={
avV(d,e,f,g){var x=this,w=$.aE
x.a!==$&&A.bj()
x.a=new B.UR(d,x,new A.aZ(new A.au(w,y.c),y.r),e,g.i("UR<0>"))
if(f.a.ghY())f.a=new B.QD(g.i("@<0>").bV(g).i("QD<1,2>")).iJ(f.a)
w=A.fz(null,new B.azB(f,x),null,!0,g)
x.b!==$&&A.bj()
x.b=w},
abQ(){var x,w
this.d=!0
x=this.c
if(x!=null)x.V(0)
w=this.b
w===$&&A.e()
w.a5(0)}}
B.UR.prototype={
D(d,e){if(this.e)throw A.n(A.am("Cannot add event after closing."))
if(this.d)return
this.a.a.D(0,e)},
cY(d,e){if(this.e)throw A.n(A.am("Cannot add event after closing."))
if(this.d)return
this.aFU(d,e)},
hl(d){return this.cY(d,null)},
aFU(d,e){var x=this
if(x.w){x.a.a.cY(d,e)
return}x.c.fk(d,e)
x.abR()
x.b.abQ()
x.a.a.a5(0).fE(new B.bg0())},
a5(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.abQ()
x.c.ci(0,x.a.a.a5(0))}return x.c.a},
abR(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.d9(0)
return},
$idH:1}
B.a8R.prototype={}
B.a8S.prototype={}
B.xR.prototype={
a7c(d,e){var x=this.b
if((x.b&4)!==0)return
x.D(0,new B.Dj(d,e))
x.a5(0)},
a3W(d){var x
if((this.b.b&4)!==0)throw A.n(B.bQa())
x=A.bP(d)
x.toString
this.a.send(x)},
w2(d,e,f){return this.aZa(0,e,f)},
aZa(d,e,f){var x=0,w=A.k(y.H),v=this,u
var $async$w2=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.n(B.bQa())
u.a5(0)
v.a.close()
return A.i(null,w)}})
return A.j($async$w2,w)},
$ibQ9:1}
B.ta.prototype={}
B.GJ.prototype={
m(d,e){if(e==null)return!1
return e instanceof B.GJ&&e.a===this.a},
gH(d){return C.c.gH(this.a)}}
B.CV.prototype={
m(d,e){var x,w,v,u
if(e==null)return!1
if(e instanceof B.CV&&e.a.length===this.a.length){for(x=this.a,w=x.length,v=e.a,u=0;u<w;++u)if(v[u]!==x[u])return!1
return!0}return!1},
gH(d){return A.fO(this.a)},
j(d){return"BinaryDataReceived("+A.r(this.a)+")"}}
B.Dj.prototype={
m(d,e){if(e==null)return!1
return e instanceof B.Dj&&e.a===this.a&&e.b===this.b},
gH(d){return A.fO([this.a,this.b])},
j(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.Hc.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketException"
else return"WebSocketException: "+x},
$ibM:1}
B.Hb.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+x}}
B.anL.prototype={
avM(d){d.eB(new B.anP(this),new B.anQ(this),y.a)}}
B.akI.prototype={
a5(d){var x=this.b
x.e=x.d=null
return this.arr(0)}}
B.a9Z.prototype={
j(d){return"WebSocketChannelException: "+this.a},
$ibM:1}
B.vP.prototype={
M(){return"RTCSignalingState."+this.b}}
B.P5.prototype={
M(){return"RTCIceGatheringState."+this.b}}
B.vO.prototype={
M(){return"RTCPeerConnectionState."+this.b}}
B.mT.prototype={
M(){return"RTCIceConnectionState."+this.b}}
B.a6F.prototype={
M(){return"RTCVideoViewObjectFit."+this.b}}
B.aKM.prototype={}
B.NK.prototype={}
B.EU.prototype={
j(d){var x=this.d
return"Track(id: "+A.r(x.id)+", kind: "+A.r(x.kind)+", label: "+A.r(x.label)+", enabled: "+A.r(x.enabled)+", muted: "+A.r(x.muted)+")"}}
B.aFU.prototype={}
B.FA.prototype={}
B.P6.prototype={}
B.aKY.prototype={}
B.Ao.prototype={}
B.P7.prototype={}
B.P9.prototype={
ahX(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.P9(x,w,v)},
aZN(d){return this.ahX(null,d,null,null)},
j(d){var x=this
return A.a2(x).j(0)+"(width: "+A.r(x.a)+", height: "+A.r(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["ar<~>()","~()","yw(E)","~(Gk)","bn(FA)","bn(P7)","bn(mT)","~(@)","mG(@)","mG()","bn(bQ9)","~(ta)"])
B.aQh.prototype={
$0(){return J.c6g(this.a.bn())},
$S:1}
B.aQi.prototype={
$1(d){var x,w,v,u
try{this.b.D(0,this.a.$ti.y[1].a(d))}catch(v){u=A.N(v)
if(y.e.b(u)){x=u
w=A.bb(v)
this.b.cY(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.apy.prototype={
$1(d){if(d==null)return null
return A.c2(J.l(d))},
$S:162}
B.bbl.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.e)x.F0(!0)},
$S:0}
B.bbm.prototype={
$1(d){return this.a.Of()},
$S:35}
B.bbi.prototype={
$0(){var x=this.a.c
if(x!=null)A.aa(x,!1).bC()},
$S:0}
B.bbj.prototype={
$0(){return this.a.e=!0},
$S:0}
B.bbf.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.bbg.prototype={
$0(){return this.a.d=!1},
$S:0}
B.bbh.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.bbc.prototype={
$0(){return this.a.f=!0},
$S:0}
B.bbd.prototype={
$0(){return this.a.f=!1},
$S:0}
B.bbe.prototype={
$1(d){var x=this.a.a,w=x.c,v=x.e,u=x.d
return B.bVi(x.w,w,u,!1,v)},
$S:z+2}
B.bbk.prototype={
$0(){return this.a.aQQ()},
$S:0}
B.baX.prototype={
$1(d){this.a.yJ("candidat_ice",d,!1)},
$S:350}
B.baY.prototype={
$0(){var x=this.a
if(x.c!=null)x.n(new B.baW())},
$S:0}
B.baW.prototype={
$0(){},
$S:0}
B.baZ.prototype={
$0(){this.a.mC(A.a("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.bb_.prototype={
$0(){return this.a.y=!0},
$S:0}
B.bb0.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.w&&!x.x){if(x.a.f)x.yJ("annule",C.e1,!1)
x.mC(A.a("Pas de r\xe9ponse"))}},
$S:0}
B.bb1.prototype={
$1(d){var x=this.a,w=x.at
if(x.c!=null&&w!=null&&x.w)x.n(new B.baV(x,w))},
$S:35}
B.baV.prototype={
$0(){return this.a.ax=new A.aw(Date.now(),0,!1).eJ(this.b)},
$S:0}
B.bb2.prototype={
$1(d){},
$S:160}
B.bb3.prototype={
$1(d){this.a.Eq()},
$S:35}
B.bb5.prototype={
$1(d){var x=this.a
if(x.c==null||x.x)return
x.acb()
x.a8B("reponse",d)},
$S:337}
B.bb6.prototype={
$1(d){this.a.mC(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.bb7.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.acb()},
$S:29}
B.bb8.prototype={
$1(d){this.a.mC(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.bb9.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.a8B("offre",d)},
$S:337}
B.bba.prototype={
$1(d){this.a.mC(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.bb4.prototype={
$0(){var x=this.a
x.w=!0
x.at=new A.aw(Date.now(),0,!1)
x.ax=C.R},
$S:0}
B.baU.prototype={
$0(){return this.a.z=this.b},
$S:0}
B.baT.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.baS.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.bbb.prototype={
$2(d,e){if(!d)this.a.EX()},
$S:967}
B.aPG.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.a5(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+4}
B.aPH.prototype={
$1(d){var x=d.b,w=x.length!==0?C.b.gR(x):null
if(w!=null)this.a.aC4(w)},
$S:z+5}
B.aPI.prototype={
$1(d){var x
if(d===D.Kk){x=this.a.w
if(x!=null)x.$0()}},
$S:z+6}
B.asB.prototype={
$1(d){return this.a.Xg()},
$S:21}
B.asC.prototype={
$0(){var x=this.a
if(!x.e)x.Dj()},
$S:0}
B.bLt.prototype={
$1(d){return d.length!==0},
$S:12}
B.aGc.prototype={
$1(d){return this.a.push(B.bP0(d))},
$S:21}
B.aGd.prototype={
$1(d){return this.a.push(B.bP0(d))},
$S:21}
B.aG9.prototype={
$1(d){},
$S:22}
B.aGa.prototype={
$1(d){},
$S:22}
B.aGb.prototype={
$1(d){},
$S:22}
B.aFX.prototype={
$0(){return!1},
$S:47}
B.aFY.prototype={
$0(){return!1},
$S:47}
B.aFZ.prototype={
$1(d){J.fK(d,new B.aFW(this.a))},
$S:350}
B.aFW.prototype={
$2(d,e){this.a.p(0,d,e)},
$S:45}
B.aKQ.prototype={
$1(d){},
$S:22}
B.aKR.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.FA(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:22}
B.aKS.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.e()
v=B.cnh(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.bS7())switch(w.cx.a){case 0:w.cy=D.Kp
break
case 1:w.cy=D.Kq
break
case 3:w.cy=D.Kr
break
case 5:w.cy=D.Kn
break
case 6:w.cy=D.Ko
break
case 7:w.cy=D.rP
break
default:break}},
$S:30}
B.aKT.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.e()
x.CW=B.cni(w.iceGatheringState)},
$S:30}
B.aKU.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.e()
x.ch=B.coP(w.signalingState)},
$S:30}
B.aKV.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.e()
x.cy=B.coq(w.connectionState)},
$S:30}
B.aKW.prototype={
$1(d){},
$S:30}
B.aKX.prototype={
$1(d){var x,w=this.a,v=w.Q
if(v!=null){B.bP0(d.track)
x=d.streams
x=y.l.b(x)?x:new A.cI(x,A.V(x).i("cI<1,av>"))
w=J.ey(x,new B.aKO(w),y.h)
v.$1(new B.P7(A.H(w,!0,w.$ti.i("aD.E"))))}},
$S:22}
B.aKO.prototype={
$1(d){return new B.mG(d,d.id,this.a.as)},
$S:z+8}
B.aKP.prototype={
$0(){var x=this.b.e
return new B.mG(x,x.id,this.a.as)},
$S:z+9}
B.bLB.prototype={
$1(d){return J.fS(self.window.navigator.userAgent,A.bK(d,!1,!1))},
$S:12}
B.aL2.prototype={
$1(d){var x,w,v,u,t
for(x=this.a,w=x.at,v=w.length,u=0;u<w.length;w.length===v||(0,A.L)(w),++u)w[u].V(0)
C.b.Y(w)
t=self.document.createElement("video")
t.autoplay=!0
t.muted=!0
t.controls=!1
t.srcObject=x.x
t.id="video_"+("RTCVideoRenderer-"+x.Q)
t.setAttribute("playsinline","true")
x.a62(t)
v=y.i.c
w.push(A.hQ(t,"canplay",new B.aKZ(x),!1,v))
w.push(A.hQ(t,"resize",new B.aL_(x),!1,v))
w.push(A.hQ(t,"error",new B.aL0(t),!1,v))
w.push(A.hQ(t,"ended",new B.aL1(),!1,v))
return t},
$S:159}
B.aKZ.prototype={
$1(d){this.a.afb()},
$S:21}
B.aL_.prototype={
$1(d){this.a.afb()},
$S:21}
B.aL0.prototype={
$1(d){var x,w,v=this.a.error
A.nl("RTCVideoRenderer: videoElement.onError, "+J.l(v))
v.toString
x=C.FO.h(0,A.an(v,"code"))
x.toString
w=!J.q(A.an(v,"message"),"")?A.an(v,"message"):"No further diagnostic information can be determined or provided."
throw A.n(A.nW(x,C.FN.h(0,A.an(v,"code")),w,null))},
$S:25}
B.aL1.prototype={
$1(d){},
$S:21}
B.aL3.prototype={
$0(){},
$S:0}
B.aL5.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aL4.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.a3K("RTCVideoRenderer-"+w.Q)
else w=A.R(x,x,C.j,x,x,x,x,x,x,x,x,x,x,x)
return A.cG(A.R(x,w,C.j,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:968}
B.azB.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.e()
v.c=x.eP(w.gh8(w),new B.azA(v),w.glX())},
$S:0}
B.azA.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.e()
w.abR()
x=x.b
x===$&&A.e()
x.a5(0)},
$S:0}
B.bg0.prototype={
$1(d){},
$S:17}
B.arw.prototype={
$1(d){this.a.ci(0,this.b)},
$S:22}
B.arx.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.fF(new B.Hc("Failed to connect WebSocket"))
else this.b.a7c(1006,"error")},
$S:22}
B.ary.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.cA("data")
if(typeof x==="string")w.b=new B.GJ(A.by(x))
else if(typeof x==="object"&&A.bWk(y.m.a(x),"ArrayBuffer"))w.b=new B.CV(A.Ob(y.o.a(x),0,null))
else throw A.n(A.am("unexpected message type: "+J.aA(x).j(0)))
v.D(0,w.bn())},
$S:25}
B.arz.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.ci(0,this.b)
this.b.a7c(d.code,d.reason)},
$S:22}
B.anP.prototype={
$1(d){var x=d.b,w=this.a
new A.cs(x,A.u(x).i("cs<1>")).cA(new B.anM(w))
x=w.r.a
x===$&&A.e()
x=x.b
x===$&&A.e()
new A.cs(x,A.u(x).i("cs<1>")).b5u(new B.anN(d),new B.anO(w,d))
w.f.d9(0)},
$S:z+10}
B.anM.prototype={
$1(d){var x,w,v
$label0$0:{x=d instanceof B.GJ
w=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.e()
x=x.a
x===$&&A.e()
x.D(0,w)
break $label0$0}x=d instanceof B.CV
v=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.e()
x=x.a
x===$&&A.e()
x.D(0,v)
break $label0$0}if(d instanceof B.Dj){x=this.a.r.a
x===$&&A.e()
x=x.a
x===$&&A.e()
x.a5(0)}}},
$S:z+11}
B.anN.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.ap(B.bQa())
s=A.bP(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.M.b(x)
if(t)v=x
if(t){this.a.a3W(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.a3W(new Uint8Array(A.cT(u)))
break $label1$1}t=A.aM("Cannot send "+J.aA(d).j(0))
throw A.n(t)}}catch(r){if(!(A.N(r) instanceof B.Hb))throw r}},
$S:18}
B.anO.prototype={
$0(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$$0=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
x=6
return A.d(t.b.w2(0,s.d,s.e),$async$$0)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(!(A.N(q) instanceof B.Hb))throw q
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$$0,w)},
$S:1}
B.anQ.prototype={
$1(d){var x,w=d instanceof A.RC?d:new B.a9Z(J.l(d)),v=this.a
v.f.fF(w)
v=v.r.a
v===$&&A.e()
x=v.a
x===$&&A.e()
x.hl(w)
v=v.a
v===$&&A.e()
v.a5(0)},
$S:30};(function aliases(){var x=B.DF.prototype
x.arr=x.a5})();(function installTearOffs(){var x=a._instance_0u,w=a._instance_1u
x(B.U0.prototype,"gawN","Kq",0)
var v
w(v=B.U_.prototype,"gaVQ","af2",3)
x(v,"gacs","EX",0)
x(v,"ga6f","KI",0)
x(v,"ga6e","KH",0)
x(v,"ga6c","KF",0)
x(v,"ga6d","KG",0)
w(v=B.a1c.prototype,"gaQz","aQA",7)
x(v,"gaPH","Xg",1)
x(B.P8.prototype,"gdI","k",0)
x(B.Pb.prototype,"gaNO","aNP",1)})();(function inheritance(){var x=a.inheritMany,w=a.inherit
x(A.a0,[B.DF,B.apx,B.Gk,B.a1q,B.aPF,B.a1c,B.aKM,B.NK,B.EU,B.aFU,B.P6,B.aKY,B.a8S,B.UR,B.a8R,B.xR,B.ta,B.Hc,B.a9Z,B.FA,B.Ao,B.P7,B.P9])
w(B.QD,A.fm)
x(A.jP,[B.aQh,B.bbl,B.bbi,B.bbj,B.bbf,B.bbg,B.bbh,B.bbc,B.bbd,B.bbk,B.baY,B.baW,B.baZ,B.bb_,B.bb0,B.baV,B.bb4,B.baU,B.baT,B.baS,B.asC,B.aFX,B.aFY,B.aKP,B.aL3,B.aL5,B.azB,B.azA,B.anO])
x(A.ip,[B.aQi,B.apy,B.bbm,B.bbe,B.baX,B.bb1,B.bb2,B.bb3,B.bb5,B.bb6,B.bb7,B.bb8,B.bb9,B.bba,B.aPG,B.aPH,B.aPI,B.asB,B.bLt,B.aGc,B.aGd,B.aG9,B.aGa,B.aGb,B.aFZ,B.aKQ,B.aKR,B.aKS,B.aKT,B.aKU,B.aKV,B.aKW,B.aKX,B.aKO,B.bLB,B.aL2,B.aKZ,B.aL_,B.aL0,B.aL1,B.bg0,B.arw,B.arx,B.ary,B.arz,B.anP,B.anM,B.anN,B.anQ])
x(A.M,[B.p4,B.yw,B.Pa])
x(A.P,[B.U0,B.U_,B.Pb])
x(A.at,[B.SF,B.abA,B.wB])
x(A.qG,[B.bbb,B.aFW,B.aL4])
w(B.aKN,B.aKM)
w(B.mG,B.NK)
w(B.a5_,B.EU)
w(B.aFV,B.aFU)
w(B.a6E,B.P6)
w(B.bPy,B.aKY)
w(B.P8,A.d4)
x(B.a8S,[B.a3u,B.anL])
x(B.ta,[B.GJ,B.CV,B.Dj])
w(B.Hb,B.Hc)
w(B.akI,B.DF)
x(A.HG,[B.vP,B.P5,B.vO,B.mT,B.a6F])})()
A.ox(b.typeUniverse,JSON.parse('{"DF":{"dH":["1"]},"QD":{"fm":["1","2"],"fm.S":"1","fm.T":"2"},"yw":{"M":[],"m":[]},"p4":{"M":[],"m":[]},"U0":{"P":["p4"]},"SF":{"at":[],"m":[]},"U_":{"P":["yw"]},"abA":{"at":[],"m":[]},"wB":{"at":[],"m":[]},"mG":{"NK":[]},"a5_":{"EU":[]},"a6E":{"P6":[]},"P8":{"d4":["P9"],"aX":[]},"Pa":{"M":[],"m":[]},"Pb":{"P":["Pa"]},"UR":{"dH":["1"]},"xR":{"bQ9":[]},"GJ":{"ta":[]},"CV":{"ta":[]},"Dj":{"ta":[]},"Hc":{"bM":[]},"Hb":{"bM":[]},"akI":{"dH":["@"]},"a9Z":{"bM":[]}}'))
A.bQC(b.typeUniverse,JSON.parse('{"DF":1,"a8S":1}'))
var y=(function rtii(){var x=A.ay
return{b:x("xR"),L:x("bM"),_:x("ar<@>"),x:x("ar<~>"),S:x("D<ac<o,K>>"),t:x("D<ac<o,@>>"),Q:x("D<EU>"),d:x("D<iv<@>>"),s:x("D<o>"),p:x("D<m>"),m:x("av"),l:x("I<av>"),F:x("I<ac<o,@>>"),j:x("I<@>"),I:x("I<v>"),P:x("ac<o,@>"),f:x("ac<@,@>"),E:x("NK"),G:x("EU"),h:x("mG"),o:x("ps"),a:x("bn"),K:x("a0"),J:x("P6"),v:x("Ao"),Z:x("a8R<a0?>"),N:x("o"),e:x("pW"),M:x("e_"),D:x("ta"),U:x("Z<o>"),g:x("dz<Gk>"),n:x("dz<~>"),V:x("aZ<xR>"),r:x("aZ<@>"),R:x("aZ<~>"),i:x("Ua<av>"),C:x("oq<av>"),k:x("au<xR>"),c:x("au<@>"),W:x("au<~>"),q:x("kq"),y:x("K"),z:x("@"),A:x("av?"),X:x("a0?"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.TK=new B.a1q(C.k1)
D.xI=new A.ao(32,0,32,0)
D.ys=new A.al(57638,!1)
D.yt=new A.al(57639,!1)
D.Ze=new A.al(58337,!1)
D.Zf=new A.al(58341,!1)
D.Zi=new A.al(58923,!1)
D.yx=new A.al(59048,!1)
D.Zj=new A.al(59049,!1)
D.Zk=new A.al(59077,!1)
D.a6r=A.b(x([1,2,4,8,16]),A.ay("D<v>"))
D.aae=A.b(x([]),y.Q)
D.G_=new A.fl("FlutterWebRTC.Method",C.b4,null)
D.aig=new B.mT(0,"RTCIceConnectionStateNew")
D.aih=new B.mT(1,"RTCIceConnectionStateChecking")
D.aii=new B.mT(2,"RTCIceConnectionStateCompleted")
D.aij=new B.mT(3,"RTCIceConnectionStateConnected")
D.aik=new B.mT(4,"RTCIceConnectionStateCount")
D.Kk=new B.mT(5,"RTCIceConnectionStateFailed")
D.ail=new B.mT(6,"RTCIceConnectionStateDisconnected")
D.Kl=new B.mT(7,"RTCIceConnectionStateClosed")
D.Km=new B.P5(0,"RTCIceGatheringStateNew")
D.aim=new B.P5(1,"RTCIceGatheringStateGathering")
D.ain=new B.P5(2,"RTCIceGatheringStateComplete")
D.rP=new B.vO(0,"RTCPeerConnectionStateClosed")
D.Kn=new B.vO(1,"RTCPeerConnectionStateFailed")
D.Ko=new B.vO(2,"RTCPeerConnectionStateDisconnected")
D.Kp=new B.vO(3,"RTCPeerConnectionStateNew")
D.Kq=new B.vO(4,"RTCPeerConnectionStateConnecting")
D.Kr=new B.vO(5,"RTCPeerConnectionStateConnected")
D.aio=new B.vP(0,"RTCSignalingStateStable")
D.aip=new B.vP(1,"RTCSignalingStateHaveLocalOffer")
D.aiq=new B.vP(2,"RTCSignalingStateHaveRemoteOffer")
D.air=new B.vP(3,"RTCSignalingStateHaveLocalPrAnswer")
D.ais=new B.vP(4,"RTCSignalingStateHaveRemotePrAnswer")
D.Ks=new B.vP(5,"RTCSignalingStateClosed")
D.ait=new B.P9(0,0,0)
D.Kt=new B.a6F(0,"RTCVideoViewObjectFitContain")
D.Ku=new B.a6F(1,"RTCVideoViewObjectFitCover")
D.nT=new A.c3(20,null,null,null)
D.alX=new A.c3(48,null,null,null)
D.LW=new A.c3(null,64,null,null)
D.aoI=new A.z(!0,C.l,null,null,null,null,22,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.Mv=new A.z(!0,C.l,null,null,null,null,26,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.tX=new A.z(!0,C.ac,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.aqn=new A.z(!0,C.n,null,null,null,null,32,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.MK=new A.z(!0,C.n,null,null,null,null,40,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.bZk=!1
$.bXG=1})();(function lazyInitializers(){var x=a.lazyFinal
x($,"csd","c3K",()=>new B.aKN())
x($,"cqh","bS7",()=>C.c.q(A.an(A.an(A.an(A.bRO(),"window"),"navigator"),"userAgent"),"Firefox"))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_2",e:"endPart",h:b})})($__dart_deferred_initializers__,"DSEaDMSAAK+g3/t/mSc6hmUO+wk=");