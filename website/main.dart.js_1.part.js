((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_1",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={Ge:function Ge(){},U4:function U4(d){this.$ti=d},aYl:function aYl(d){this.a=d},aYm:function aYm(d,e){this.a=d
this.b=e},
cdf(d){var x
B.bTd()
if(d.length===0)return
x=A.bP(new B.bUT(d))
self.window.addEventListener("beforeunload",x)
$.c1_=new B.bUS(x)},
bTd(){var x=$.c1_
if(x!=null)x.$0()
$.c1_=null},
bUT:function bUT(d){this.a=d},
bUS:function bUS(d){this.a=d},
a3K(d){var x,w,v,u,t=new B.auF(),s=J.N(d),r=s.h(d,"id")
r=J.m(r==null?"":r)
x=s.h(d,"conversation_id")
J.m(x==null?"":x)
x=s.h(d,"appelant_id")
x=J.m(x==null?"":x)
w=s.h(d,"appelant_nom")
w=J.m(w==null?"":w)
A.al(s.h(d,"appele_id"))
A.al(s.h(d,"appele_nom"))
v=s.h(d,"type")
v=J.m(v==null?"audio":v)
u=s.h(d,"statut")
u=J.m(u==null?"sonne":u)
t.$1(s.h(d,"cree_le"))
t.$1(s.h(d,"repondu_le"))
return new B.auE(r,x,w,v,u)},
c_A(d){var x,w,v,u=J.N(d),t=u.h(d,"contenu"),s=u.h(d,"id")
s=J.m(s==null?"":s)
x=u.h(d,"appel_id")
J.m(x==null?"":x)
x=u.h(d,"emetteur_id")
x=J.m(x==null?"":x)
w=u.h(d,"type")
w=J.m(w==null?"":w)
if(y.P.b(t))v=t
else v=y.f.b(t)?J.m3(t,y.N,y.z):C.ej
if(u.h(d,"cree_le")!=null)A.ca(J.m(u.h(d,"cree_le")))
return new B.Ji(s,x,w,v)},
cmk(d){var x,w,v,u,t,s,r=J.N(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return D.Ve
x=A.a([],y.t)
for(r=J.au(q),w=y.f,v=y.P,u=y.N,t=y.z;r.A();){s=r.gK(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.m3(s,u,t))}return new B.a5k(x)},
bUP(d){var x=C.d.ap(d.a,1e6)
return C.c.aY(C.d.j(C.d.ap(x,60)),2,"0")+":"+C.c.aY(C.d.j(C.d.af(x,60)),2,"0")},
cdV(d){var x=J.N(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.pp(v)
if(!x.n(v,"offer")&&!x.n(v,"answer"))return null
return new A.alE(w,v)},
cBo(d){var x,w,v=J.N(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.alH(u,A.jF(w)?w:null,v)},
auE:function auE(d,e,f,g,h){var _=this
_.a=d
_.c=e
_.d=f
_.r=g
_.w=h},
auF:function auF(){},
Ji:function Ji(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a5k:function a5k(d){this.a=d},
c5N(d,e,f,g,h,i,j){return new B.pU(f,g,j,i,e,d,null)},
bZ2(d,e,f,g,h,i,j,k,l){return new B.pT(f,l,h,k,d,i,j,e,g,null)},
cad(d,e,f,g,h,i,j,k,l,m,n){return new B.ag6(g,f,e,i,h,d,m,l,k,j,n,null)},
pU:function pU(d,e,f,g,h,i,j){var _=this
_.c=d
_.d=e
_.e=f
_.r=g
_.w=h
_.y=i
_.a=j},
Xx:function Xx(){var _=this
_.d=!0
_.f=_.e=!1
_.x=_.w=_.r=null
_.y=$
_.Q=_.z=!1
_.c=_.a=null},
bjH:function bjH(d){this.a=d},
bjI:function bjI(d){this.a=d},
bjE:function bjE(d){this.a=d},
bjF:function bjF(d){this.a=d},
bjB:function bjB(d){this.a=d},
bjC:function bjC(d){this.a=d},
bjD:function bjD(d){this.a=d},
bjy:function bjy(d){this.a=d},
bjz:function bjz(d){this.a=d},
bjA:function bjA(d){this.a=d},
bjG:function bjG(d){this.a=d},
W9:function W9(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
pT:function pT(d,e,f,g,h,i,j,k,l,m){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.w=i
_.x=j
_.y=k
_.Q=l
_.a=m},
Xw:function Xw(d,e){var _=this
_.e=_.d=$
_.f=d
_.r=""
_.w=null
_.at=_.as=_.Q=_.z=_.y=_.x=!1
_.ax=!0
_.ay=null
_.ch=e
_.dx=_.db=_.cy=_.cx=_.CW=null
_.dy=$
_.fr=!1
_.fx=null
_.go=_.fy=!1
_.c=_.a=null},
bjj:function bjj(d){this.a=d},
bjk:function bjk(d){this.a=d},
bji:function bji(d){this.a=d},
bjl:function bjl(d){this.a=d},
bjm:function bjm(){},
bjn:function bjn(d){this.a=d},
bjh:function bjh(d,e){this.a=d
this.b=e},
bjo:function bjo(){},
bjp:function bjp(d){this.a=d},
bj5:function bj5(d){this.a=d},
bj6:function bj6(d){this.a=d},
bj7:function bj7(d){this.a=d},
bj8:function bj8(d){this.a=d},
bj4:function bj4(d){this.a=d},
bj9:function bj9(d){this.a=d},
bja:function bja(d){this.a=d},
bjb:function bjb(d){this.a=d},
bj3:function bj3(d,e){this.a=d
this.b=e},
bjc:function bjc(){},
bjd:function bjd(d){this.a=d},
bjr:function bjr(d){this.a=d},
bjs:function bjs(d){this.a=d},
bjt:function bjt(d){this.a=d},
bju:function bju(d){this.a=d},
bjv:function bjv(d){this.a=d},
bjw:function bjw(d){this.a=d},
bje:function bje(d,e){this.a=d
this.b=e},
bjf:function bjf(d){this.a=d},
bjg:function bjg(d){this.a=d},
bjq:function bjq(){},
bj2:function bj2(d,e){this.a=d
this.b=e},
bj1:function bj1(d,e){this.a=d
this.b=e},
bj0:function bj0(d,e){this.a=d
this.b=e},
bjx:function bjx(d){this.a=d},
ag6:function ag6(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
Wa:function Wa(d,e){this.c=d
this.a=e},
yG:function yG(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
aXI:function aXI(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.z=_.y=_.x=!1},
aXJ:function aXJ(d){this.a=d},
aXK:function aXK(d){this.a=d},
aXL:function aXL(d){this.a=d},
a56:function a56(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.x=null},
ayg:function ayg(d){this.a=d},
ayh:function ayh(d){this.a=d},
arD(d){var x=y.U,w=A.G(new A.Y(A.a(d.split(" "),y.s),new B.bVM(),x),!0,x.i("w.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.q(C.b.gR(w),0).toUpperCase()
return(J.q(C.b.gR(w),0)+J.q(C.b.gaO(w),0)).toUpperCase()},
bVM:function bVM(){},
a8G:function a8G(){this.a=null},
aSr:function aSr(){},
tp:function tp(d,e){this.e=d
this.b=e},
aNA:function aNA(d){this.a=d},
aNB:function aNB(d){this.a=d},
bZO(d){var x=new B.a9a(d)
x.aAj(d)
return x},
a9a:function a9a(d){this.d=d},
aNx:function aNx(d){this.a=d},
aNy:function aNy(d){this.a=d},
aNz:function aNz(d){this.a=d},
aNj:function aNj(){},
aNl:function aNl(){},
aNm:function aNm(){},
aNn:function aNn(d){this.a=d},
aNk:function aNk(d){this.a=d},
cs2(d,e){var x=y.N
x=new B.aaV(d,e,A.E(x,y.E),A.E(x,y.z))
x.aAp(d,e)
return x},
aaV:function aaV(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aSt:function aSt(d){this.a=d},
aSu:function aSu(d){this.a=d},
aSv:function aSv(d){this.a=d},
aSw:function aSw(d){this.a=d},
aSx:function aSx(d){this.a=d},
aSy:function aSy(d){this.a=d},
aSz:function aSz(d){this.a=d},
aSA:function aSA(d){this.a=d},
aSs:function aSs(d){this.a=d},
aaW:function aaW(){},
c_m:function c_m(d){this.a=d},
cDv(){return C.b.mV(A.a(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.bVU())!==-1},
bVU:function bVU(){},
c8c(){var x=A.a([],y.d),w=$.c8d
$.c8d=w+1
return new B.Sx(w,x,D.ala,$.ai())},
Sx:function Sx(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.db$=0
_.dx$=g
_.fr$=_.dy$=0},
aSG:function aSG(d){this.a=d},
aSC:function aSC(d){this.a=d},
aSD:function aSD(d){this.a=d},
aSE:function aSE(d){this.a=d},
aSF:function aSF(){},
c_n(d,e,f){return new B.Sz(d,f,e,null)},
Sz:function Sz(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
SA:function SA(){this.c=this.a=null},
aSH:function aSH(){},
aSJ:function aSJ(d){this.a=d},
aSI:function aSI(d){this.a=d},
c6o(d,e,f,g){var x,w={}
w.a=d
x=new B.a7w(g.i("a7w<0>"))
x.aA9(e,f,w,g)
return x},
a7w:function a7w(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
aGE:function aGE(d,e){this.a=d
this.b=e},
aGD:function aGD(d){this.a=d},
Yp:function Yp(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bok:function bok(){},
adg:function adg(d){this.b=this.a=$
this.$ti=d},
adh:function adh(){},
bYt(d,e){return B.clx(d,e)},
clx(d,e){var x=0,w=A.k(y.b),v,u,t,s,r,q,p
var $async$bYt=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:if(!d.oV("ws")&&!d.oV("wss"))throw A.n(A.fq(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.j(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.A_(r,A.fI(null,null,null,!1,y.D))
u=new A.az($.aI,y.u)
p=new A.b2(u,y.V)
if(J.t(r.readyState,1))p.co(0,q)
else if(J.t(r.readyState,2)||J.t(r.readyState,3))p.h_(new B.Ke("Unexpected WebSocket state: "+A.u(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.pe(r,"open",!1,y.C).gR(0).aB(new B.awO(p,q),y.H)
t=y.C
s=y.H
new A.pe(r,"error",!1,t).gR(0).aB(new B.awP(p,q),s)
A.ik(r,"message",new B.awQ(q),!1,y.m)
new A.pe(r,"close",!1,t).gR(0).aB(new B.awR(p,q),s)
v=u
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$bYt,w)},
A_:function A_(d,e){this.a=d
this.b=e},
awO:function awO(d,e){this.a=d
this.b=e},
awP:function awP(d,e){this.a=d
this.b=e},
awQ:function awQ(d){this.a=d},
awR:function awR(d,e){this.a=d
this.b=e},
c01(){return new B.Kd("Connection Closed")},
uf:function uf(){},
JI:function JI(d){this.a=d},
Fp:function Fp(d){this.a=d},
FQ:function FQ(d,e){this.a=d
this.b=e},
Ke:function Ke(d){this.a=d},
Kd:function Kd(d){this.a=d},
cl2(d){var x=null,w=$.aI,v=new B.adg(y.Z),u=y.X,t=A.fI(x,x,x,!0,u),s=A.fI(x,x,x,!0,u),r=A.x(s),q=A.x(t)
v.a=B.c6o(new A.cD(s,r.i("cD<1>")),new A.ED(t,q.i("ED<1>")),!0,u)
v.b=B.c6o(new A.cD(t,q.i("cD<1>")),new A.ED(s,r.i("ED<1>")),!1,u)
v=new B.asL(new A.b2(new A.az(w,y.W),y.R),v)
v.azY(d)
return v},
asL:function asL(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
asP:function asP(d){this.a=d},
asM:function asM(d){this.a=d},
asN:function asN(d){this.a=d},
asO:function asO(d,e){this.a=d
this.b=e},
asQ:function asQ(d){this.a=d},
apr:function apr(d,e){this.b=d
this.a=e},
aer:function aer(d){this.a=d},
cD4(d){switch(d){case"new":return D.akY
case"checking":return D.akZ
case"connected":return D.al0
case"completed":return D.al_
case"failed":return D.Lu
case"disconnected":return D.al2
case"closed":return D.Lv
case"count":return D.al1}return D.Lv},
cD5(d){switch(d){case"new":return D.Lw
case"gathering":return D.al3
case"complete":return D.al4}return D.Lw},
cF0(d){switch(d){case"stable":return D.al5
case"have-local-offer":return D.al6
case"have-local-pranswer":return D.al8
case"have-remote-offer":return D.al7
case"have-remote-pranswer":return D.al9
case"closed":return D.LC}return D.LC},
cEi(d){switch(d){case"new":return D.Lz
case"connecting":return D.LA
case"connected":return D.LB
case"closed":return D.to
case"disconnected":return D.Ly
case"failed":return D.Lx}return D.to},
xN:function xN(d,e){this.a=d
this.b=e},
St:function St(d,e){this.a=d
this.b=e},
xM:function xM(d,e){this.a=d
this.b=e},
nA:function nA(d,e){this.a=d
this.b=e},
aaX:function aaX(d,e){this.a=d
this.b=e},
aSq:function aSq(){},
R6:function R6(){},
HE:function HE(){},
aNi:function aNi(){},
Ir:function Ir(d,e,f){this.a=d
this.b=e
this.c=f},
Su:function Su(){},
Sv:function Sv(){},
aSB:function aSB(){},
CO:function CO(d,e){this.a=d
this.b=e},
Sw:function Sw(d){this.b=d},
Sy:function Sy(d,e,f){this.a=d
this.b=e
this.c=f},
bZq(d){var x=0,w=A.k(y.y)
var $async$bZq=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.n("The is not a video track => "+d.j(0))
throw A.n("You need to specify the deviceId")
return A.i(null,w)}})
return A.j($async$bZq,w)},
a9x(d){var x=0,w=A.k(y.H),v
var $async$a9x=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.e(B.b1K("enableSpeakerphone",A.a5(["enable",d],y.N,v),v,v),$async$a9x)
case 2:return A.i(null,w)}})
return A.j($async$a9x,w)},
aPB(d,e){var x=0,w=A.k(y.H),v,u,t
var $async$aPB=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:t=e.d
x=t.kind==="audio"?3:4
break
case 3:u=J.m3(y.f.a(A.bUE(t.getConstraints())),y.N,y.z)
u.k(0,"volume",d)
x=5
return A.e(e.Rb(0,u),$async$aPB)
case 5:case 4:v=A.cT(null,y.H)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$aPB,w)},
b1K(d,e,f,g){return B.cuN(d,e,f,g,f.i("0?"))},
cuN(d,e,f,g,h){var x=0,w=A.k(h),v
var $async$b1K=A.f(function(i,j){if(i===1)return A.h(j,w)
while(true)switch(x){case 0:x=3
return A.e(B.b1J(),$async$b1K)
case 3:v=D.H7.cc(d,e,!1,f)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$b1K,w)},
b1J(){var x=0,w=A.k(y.H),v,u
var $async$b1J=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:x=!$.c9Z?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.e(D.H7.cc("initialize",A.a5(["options",A.E(v,u)],v,u),!1,y.H),$async$b1J)
case 4:$.c9Z=!0
case 3:return A.i(null,w)}})
return A.j($async$b1J,w)}},D,E
J=c[1]
A=c[0]
C=c[2]
B=a.updateHolder(c[3],B)
D=c[29]
E=c[19]
B.Ge.prototype={
D(d,e){this.a.D(0,e)},
dd(d,e){this.a.dd(d,e)},
a0(d){return this.a.a0(0)},
$idV:1}
B.U4.prototype={
hc(d){var x=A.cs("subscription"),w=A.fI(new B.aYl(x),null,null,!0,this.$ti.y[1])
x.b=d.fe(new B.aYm(this,w),w.gmO(w),w.gov())
return new A.cD(w,A.x(w).i("cD<1>"))}}
B.auE.prototype={}
B.Ji.prototype={}
B.a5k.prototype={}
B.pU.prototype={
N(){return new B.Xx()}}
B.Xx.prototype={
U(){var x,w,v=this
v.X()
x=v.a
x.toString
v.z=!0
w=new B.a8G()
v.y!==$&&A.bi()
v.y=w
if(!x.y)w.rV(A.Ac(C.kk,$.uQ().a).c)
v.MO()
v.r=A.dl(C.bY,new B.bjH(v))
v.w=A.h1(C.yh,new B.bjI(v))},
l(){var x=this,w=x.r
if(w!=null)w.W(0)
w=x.w
if(w!=null)w.W(0)
w=x.x
if(w!=null)w.W(0)
w=x.y
w===$&&A.d()
w.i8()
if(x.z)w.h5()
x.a1()},
a_t(){var x=this.x
if(x!=null)x.W(0)
this.x=A.dl(C.fg,new B.bjE(this))},
QF(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$QF=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.e||s.f){x=1
break}u=4
p=s.a
p.toString
o=$.a8()
x=7
return A.e(o.Ck(p.c),$async$QF)
case 7:r=e
q=B.a3K(r)
if(s.c==null||s.e){x=1
break}if(q.w!=="sonne"){s.m(new B.bjF(s))
p=s.r
if(p!=null)p.W(0)
p=s.w
if(p!=null)p.W(0)
p=s.y
p===$&&A.d()
p.i8()
s.a_t()}u=2
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
return A.j($async$QF,w)},
MO(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$MO=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
o=s.a
o.toString
n=$.a8()
x=7
return A.e(n.Ck(o.c),$async$MO)
case 7:r=e
q=B.a3K(r)
if(s.c==null){x=1
break}m=s.a.r
if(m==null)m=n.gCZ()
p=m
if(q.w!=="sonne"||q.c===p){s.m(new B.bjB(s))
o=s.y
o===$&&A.d()
o.i8()
s.a_t()
x=1
break}s.m(new B.bjC(s))
if(s.a.y)s.EP()
u=2
x=6
break
case 4:u=3
k=t
if(s.c==null){x=1
break}s.m(new B.bjD(s))
o=s.y
o===$&&A.d()
o.i8()
s.a_t()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$MO,w)},
EP(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$EP=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.f||s.e){x=1
break}s.Q=!0
s.m(new B.bjy(s))
u=4
q=s.a
q.toString
p=$.a8()
x=7
return A.e(p.J2(q.c,"accepte"),$async$EP)
case 7:u=2
x=6
break
case 4:u=3
n=t
r=A.S(n)
if(s.c==null){x=1
break}s.m(new B.bjz(s))
q=s.c
q.toString
p=J.m(r)
q.u(y.q).f.B(A.A(null,null,null,null,null,C.h,null,A.c(p,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
x=1
break
x=6
break
case 3:x=2
break
case 6:if(s.c==null){x=1
break}q=s.r
if(q!=null)q.W(0)
q=s.w
if(q!=null)q.W(0)
q=s.y
q===$&&A.d()
q.i8()
q=s.c
q.toString
A.ab(q,!1).yH(A.ek(new B.bjA(s),null,y.z))
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$EP,w)},
GX(d){return this.aWp(d)},
aWo(){return this.GX(!1)},
aWp(d){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$GX=A.f(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:if(s.f){x=1
break}s.f=!0
r=s.r
if(r!=null)r.W(0)
r=s.w
if(r!=null)r.W(0)
r=s.y
r===$&&A.d()
r.i8()
u=4
r=s.a
r.toString
q=$.a8()
x=7
return A.e(q.J2(r.c,"refuse"),$async$GX)
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
if(r!=null)A.ab(r,!1).bF()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$GX,w)},
C(d){var x,w,v,u,t=this,s=null,r=t.a,q=r.e
r=A.ks(C.r,s,A.c(B.arD(r.d),s,s,s,s,D.NT,s,s,s),s,56)
x=t.a.d
x=A.c(x.length===0?A.b("Un membre"):x,s,s,s,s,D.NL,C.X,s,s)
if(t.d)q=A.b("Connexion\u2026")
else if(t.e)q=A.b("Appel termin\xe9")
else q=q==="video"?A.b("Appel vid\xe9o entrant"):A.b("Appel entrant")
w=y.p
q=A.a([r,C.aw,new A.a1(D.yG,x,s),C.k,A.c(q,s,s,s,s,D.uC,s,s,s),D.N7],w)
if(!t.d&&!t.e){r=A.b("Refuser")
x=t.f?s:new B.bjG(t)
v=A.b("Accepter")
u=t.f?s:t.gaB5()
q.push(A.U(A.a([new B.W9(D.zp,C.aE,r,x,s),D.aoG,new B.W9(C.mQ,C.cF,v,u,s)],w),C.o,C.bA,C.i,s))}if(t.d)q.push(C.wZ)
return A.eQ(s,C.n,A.fn(!0,A.cM(A.J(q,C.o,C.f,C.V),s,s),!0,C.a8,!0,!0),s,s,s)}}
B.W9.prototype={
C(d){var x=this,w=null,v=A.db(x.d,w,w,C.a8,C.cE,w)
return A.J(A.a([A.ae(A.b5(!1,A.cd(x.c,C.l,w,32),C.j,w,C.q,w,w,w,w,x.f,w,v),72,72),C.k,A.c(x.e,w,w,w,w,C.e2,w,w,w)],y.p),C.o,C.f,C.V)}}
B.pT.prototype={
N(){return new B.Xw(A.b3(y.N),C.S)}}
B.Xw.prototype={
U(){var x,w,v,u,t,s,r,q,p,o=this,n=null
o.X()
x=o.a
o.r=x.c
x=x.w
if(x==null)x=new B.aXI(B.c8c(),B.c8c())
o.d!==$&&A.bi()
o.d=x
w=o.a
v=w.x
if(v==null)v=new B.a56(new A.dI(n,n,y.g),new A.dI(n,n,y.n))
o.e!==$&&A.bi()
o.e=v
o.fr=!0
u=new B.a8G()
o.dy!==$&&A.bi()
o.dy=u
t=w.w
if(t!=null){s=$.ko()
r=s.a
q=r.length!==0&&s.z===t&&r===w.c&&s.w}else q=!1
t=$.ko()
s=o.r
r=w.e
p=w.d
t.b6X(s,r,x,v,w.f,p)
x=o.a
if(x.Q)t.as=!0
if(q){o.PN()
return}if(x.f)u.rV("assets/audio/tonalite-appel.wav")
o.qT()},
l(){var x=this,w=x.CW
if(w!=null)w.W(0)
w=x.cx
if(w!=null)w.W(0)
w=x.cy
if(w!=null)w.W(0)
w=x.db
if(w!=null)w.W(0)
w=x.dx
if(w!=null)w.W(0)
w=x.dy
w===$&&A.d()
w.i8()
if(x.fr)w.h5()
w=$.ko()
if(!(w.r&&w.a===x.r&&!x.y)){B.bTd()
w=x.d
w===$&&A.d()
w.h5()
w=x.e
w===$&&A.d()
w.IN()}x.a1()},
PN(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$PN=A.f(function(d,e){if(d===1){t=e
x=u}while(true)$async$outer:switch(x){case 0:s.a.toString
o=$.a8()
s.w=o.gCZ()
n=$.ko()
s.Q=n.x
s.as=n.y
s.x=n.e
n=n.f
s.ay=n
if(n!=null){n=Date.now()
m=s.ay
m.toString
s.ch=new A.ax(n,0,!1).en(m)}B.cdf(s.r)
u=4
s.a.toString
x=7
return A.e(o.bS("/messagerie/appels/"+s.r+"/signaux"),$async$PN)
case 7:r=e
for(o=J.au(r),n=s.f;o.A();){q=o.gK(o)
p=B.c_A(q)
n.D(0,p.a)
if(p.d==="termine"||p.d==="refuse"||p.d==="annule"){s.lQ(A.b("Appel termin\xe9"))
x=1
break $async$outer}}u=2
x=6
break
case 4:u=3
k=t
x=6
break
case 3:x=2
break
case 6:o=s.c!=null
if(!o||s.y){x=1
break}n=s.d
n===$&&A.d()
n.f=new B.bjj(s)
n.r=new B.bjk(s)
n.w=new B.bjl(s)
s.z=!0
if(o)s.m(new B.bjm())
s.cy=A.h1(C.cb,new B.bjn(s))
o=s.e
o===$&&A.d()
n=o.r
s.db=new A.bX(n,A.x(n).i("bX<1>")).cF(s.gaiJ())
o=o.w
s.dx=new A.bX(o,A.x(o).i("bX<1>")).cF(new B.bjo())
s.CW=A.h1(C.fg,new B.bjp(s))
s.wB()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$PN,w)},
qT(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0
var $async$qT=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:s.cx=A.dl(C.bY,new B.bj5(s))
r="appel"
u=4
q=null
h=s.a
g=h.y
x=g!=null?7:9
break
case 7:x=10
return A.e(g,$async$qT)
case 10:q=a2
h=s.r=B.a3K(q).a
x=8
break
case 9:g=$.a8()
x=11
return A.e(g.Ck(h.c),$async$qT)
case 11:q=a2
h=s.r=s.a.c
case 8:g=$.ko()
g.b6J(h)
B.cdf(s.r)
if(s.a.f)g.S4()
p=B.a3K(q)
if(s.c==null){x=1
break}h=p.w
if(h==="termine"||h==="expire"){s.lQ(A.b("Appel termin\xe9"))
x=1
break}s.a.toString
h=$.a8()
s.w=h.gCZ()
r="ice"
s.a.toString
o=h.Sy()
n=s.GH()
x=12
return A.e(o,$async$qT)
case 12:m=a2
l=B.cmk(m)
x=15
return A.e(n,$async$qT)
case 15:x=!a2?13:14
break
case 13:if(s.c==null){x=1
break}s.m(new B.bj6(s))
x=16
return A.e(A.jX(C.jN,null,y.z),$async$qT)
case 16:if(s.c==null){x=1
break}s.lQ(null)
x=1
break
case 14:r="webrtc"
f=s.d
f===$&&A.d()
e=s.a.d
x=17
return A.e(f.yF(A.a5(["iceServers",l.a],y.N,y.z),e==="video"),$async$qT)
case 17:f.f=new B.bj7(s)
f.r=new B.bj8(s)
f.w=new B.bj9(s)
if(s.c==null){x=1
break}s.m(new B.bja(s))
g.bcC()
s.cy=A.h1(C.cb,new B.bjb(s))
g=s.e
g===$&&A.d()
f=g.r
s.db=new A.bX(f,A.x(f).i("bX<1>")).cF(s.gaiJ())
f=g.w
s.dx=new A.bX(f,A.x(f).i("bX<1>")).cF(new B.bjc())
s.a.toString
k=h.b
if(k!=null&&J.a3(k)!==0){s.a.toString
g.RC(C.c.UW("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws?jeton="+A.eM(C.bO,k,C.ad,!0))}s.CW=A.h1(C.fg,new B.bjd(s))
s.wB()
u=2
x=6
break
case 4:u=3
a0=t
j=A.S(a0)
i=A.bh(a0)
if(s.c==null){x=1
break}A.rf().$1("Appel : \xe9chec \xe0 l\u2019\xe9tape "+A.u(r)+" : "+A.u(j)+"\n"+A.u(i))
h=s.c
h.toString
g=j instanceof A.df?j.a:s.aRv(r)
h.u(y.q).f.B(A.A(null,null,null,null,null,C.h,null,A.c(g,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
s.lQ(null)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$qT,w)},
aRv(d){if(d==="ice")return A.b("Configuration d\u2019appel indisponible. V\xe9rifie ta connexion, puis r\xe9essaie.")
if(d==="webrtc")return A.b("Ce navigateur ne peut pas d\xe9marrer l\u2019appel. Essaie depuis l\u2019application.")
return A.b("Appel introuvable ou d\xe9j\xe0 termin\xe9.")},
GH(){var x=0,w=A.k(y.y),v,u=2,t,s=this,r,q,p
var $async$GH=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
x=7
return A.e(s.Xi(),$async$GH)
case 7:if(!e){v=!1
x=1
break}r=s.d
r===$&&A.d()
x=8
return A.e(r.D8(s.a.d==="video"),$async$GH)
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
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$GH,w)},
Xi(){var x=0,w=A.k(y.y),v
var $async$Xi=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v=!0
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Xi,w)},
wB(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$wB=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.y){x=1
break}u=4
s.a.toString
p=$.a8()
x=7
return A.e(p.bS("/messagerie/appels/"+s.r+"/signaux"),$async$wB)
case 7:r=e
for(p=J.au(r);p.A();){q=p.gK(p)
s.aiK(B.c_A(q))}u=2
x=6
break
case 4:u=3
n=t
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$wB,w)},
aiK(d){var x,w,v,u,t,s=this
if(s.c==null||s.y)return
x=s.f
w=d.a
if(x.q(0,w))return
x.D(0,w)
x=s.w
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(s.a.f)return
v=B.cdV(d.e)
if(v==null)return
x=s.d
x===$&&A.d()
x.BP(A.a5(["sdp",v.a,"type",v.b],y.N,y.z)).aB(new B.bjr(s),y.a).f8(new B.bjs(s))
break
case"reponse":if(!s.a.f)return
u=B.cdV(d.e)
if(u==null)return
x=s.d
x===$&&A.d()
x.Ra(A.a5(["sdp",u.a,"type",u.b],y.N,y.z)).aB(new B.bjt(s),y.a).f8(new B.bju(s))
break
case"candidat_ice":t=B.cBo(d.e)
if(t==null)return
x=s.d
x===$&&A.d()
x.R2(A.a5(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],y.N,y.z))
break
case"accepte":if(!s.a.f||s.x)return
x=s.d
x===$&&A.d()
x.IH().aB(new B.bjv(s),y.a).f8(new B.bjw(s))
break
case"refuse":s.lQ(A.b("Appel refus\xe9"))
break
case"annule":s.lQ(A.b("Appel annul\xe9"))
break
case"termine":s.lQ(A.b("Appel termin\xe9"))
break}},
Po(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$Po=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:if(u.x){x=1
break}t=u.cx
if(t!=null)t.W(0)
t=u.dy
t===$&&A.d()
t.i8()
u.m(new B.bje(u,!1))
t=$.ko()
t.ber()
s=u.Q
t.a4x(u.as,s)
case 1:return A.i(v,w)}})
return A.j($async$Po,w)},
wv(d,e,f){return this.aIu(d,e,f)},
abX(d,e){return this.wv(d,e,!0)},
aIu(d,e,f){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$wv=A.f(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
t.a.toString
s=$.a8()
x=6
return A.e(s.amE(t.r,e,d),$async$wv)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(f&&t.c!=null&&!t.y)t.lQ(A.b("L\u2019appel n\u2019a pas pu aboutir."))
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$wv,w)},
GS(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$GS=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
r=s.cx
if(r!=null)r.W(0)
r=s.dy
r===$&&A.d()
r.i8()
u=4
r=s.r
x=r.length!==0?7:8
break
case 7:s.a.toString
q=$.a8()
x=9
return A.e(q.J2(r,"termine"),$async$GS)
case 9:case 8:u=2
x=6
break
case 4:u=3
o=t
x=6
break
case 3:x=2
break
case 6:B.bTd()
$.ko().KU()
r=s.c
if(r!=null)A.ab(r,!1).bF()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$GS,w)},
aWi(){var x=this
if(!x.x||x.y)return
$.ko().bfE()
x.m(new B.bjf(x))
$.aL.az$.push(new B.bjg(x))},
lQ(d){var x,w,v=this,u=null
if(v.y)return
v.y=!0
x=v.cx
if(x!=null)x.W(0)
x=v.dy
x===$&&A.d()
x.i8()
x=v.r
if(x.length!==0){v.a.toString
w=$.a8()
w.J2(x,"termine").f8(new B.bjq())}if(d!=null&&v.c!=null)v.c.u(y.q).f.B(A.A(u,u,u,u,u,C.h,u,A.c(d,u,u,u,u,u,u,u,u),u,C.m,u,u,u,u,u,u,u,u,u))
B.bTd()
$.ko().KU()
x=v.c
if(x!=null)A.ab(x,!1).bF()},
MY(){var x=0,w=A.k(y.H),v=this,u,t
var $async$MY=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.d()
x=2
return A.e(t.Wc(u),$async$MY)
case 2:if(v.c!=null)v.m(new B.bj2(v,u))
$.ko().a4x(v.as,u)
return A.i(null,w)}})
return A.j($async$MY,w)},
MX(){var x=0,w=A.k(y.H),v=this,u,t
var $async$MX=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v.at=!1
u=!v.as
t=v.d
t===$&&A.d()
x=2
return A.e(t.Eo(u),$async$MX)
case 2:if(v.c!=null)v.m(new B.bj1(v,u))
$.ko().a4x(u,v.Q)
return A.i(null,w)}})
return A.j($async$MX,w)},
MU(){var x=0,w=A.k(y.H),v=this,u,t
var $async$MU=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.ax
t=v.d
t===$&&A.d()
x=2
return A.e(t.W9(u),$async$MU)
case 2:if(v.c!=null)v.m(new B.bj0(v,u))
return A.i(null,w)}})
return A.j($async$MU,w)},
MV(){var x=0,w=A.k(y.H),v=this,u
var $async$MV=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=v.d
u===$&&A.d()
x=2
return A.e(u.Rg(),$async$MV)
case 2:return A.i(null,w)}})
return A.j($async$MV,w)},
C(d){var x,w,v,u,t,s,r,q,p,o=this,n=null,m="Appel en cours\u2026",l="\xc7a sonne\u2026",k="Connexion\u2026",j=o.d
j===$&&A.d()
x=j.c
w=o.go
v=o.a
if(v.d==="video"&&o.z){if(x!=null)x=B.c_n(j.e,!1,D.LD)
else{x=A.ks(C.r,n,A.c(B.arD(v.e),n,n,n,n,D.asa,n,n,n),n,48)
v=o.a
u=A.c(v.e,n,n,n,n,D.arP,n,n,n)
if(o.x)v=A.b(m)+" "+B.bUP(o.ch)
else v=v.f&&o.z?A.b(l):A.b(k)
v=A.cM(A.J(A.a([x,C.p,u,C.k,A.c(v,n,n,n,n,D.uC,n,n,n)],y.p),C.o,C.f,C.V),n,n)
x=v}j=A.a([A.Sb(0,x),A.f6(n,A.fb(A.P(12),B.c_n(j.d,!0,D.LD),C.ap),160,n,n,16,16,110)],y.p)
if(o.x)j.push(A.f6(n,new B.Wa(o.gagb(),n),n,n,16,n,16,n))
x=o.x
v=B.bUP(o.ch)
u=o.Q
t=o.as
j.push(A.f6(24,B.cad(o.ax,v,x,!0,t,u,o.ga9w(),o.ga9v(),o.ga9x(),o.ga9y(),o.gafV()),n,n,0,0,n,n))
j=A.en(C.aX,j,C.h,C.aW,n)}else{x=y.p
v=A.a([],x)
if(o.fy)v.push(A.f6(n,A.tu(B.c_n(j.e,!1,D.tp),0),1,n,0,n,0,1))
if(o.x)v.push(A.f6(n,new B.Wa(o.gagb(),n),n,n,16,n,16,n))
j=A.ks(C.r,n,A.c(B.arD(o.a.e),n,n,n,n,D.NT,n,n,n),n,56)
u=o.a
t=A.c(u.e,n,n,n,n,D.NL,C.X,n,n)
s=o.fx
if(s==null)if(o.x)u=A.b(m)+" "+B.bUP(o.ch)
else if(o.z)u=u.f?A.b(l):A.b(m)
else u=A.b(k)
else u=s
u=A.c(u,n,n,n,n,D.uC,C.X,n,n)
s=o.x
r=B.bUP(o.ch)
q=o.Q
p=o.as
v.push(A.cM(A.J(A.a([j,C.aw,new A.a1(D.yG,t,n),C.k,u,D.N7,B.cad(o.ax,r,s,!1,p,q,o.ga9w(),o.ga9v(),o.ga9x(),o.ga9y(),o.gafV())],x),C.o,C.f,C.V),n,n))
v=A.en(C.aX,v,C.h,C.aW,n)
j=v}return A.c_e(w,A.eQ(n,C.n,A.fn(!0,j,!0,C.a8,!0,!0),n,n,n),new B.bjx(o),y.K)}}
B.ag6.prototype={
C(d){var x,w,v=this,u=null,t=y.p,s=A.a([],t),r=v.d
if(r&&v.c)s.push(A.c(v.e,u,u,u,u,E.NX,u,u,u))
if(r&&v.c)s.push(C.p)
r=v.f
x=r?D.a0_:D.a_Z
t=A.a([new B.yG(x,r,A.b("Muet"),v.x,u,u),D.oa,new B.yG(D.a05,v.r,A.b("Haut-parleur"),v.y,u,u)],t)
r=v.c
if(r)t.push(D.oa)
if(r){x=v.w
w=x?D.zv:D.a04
t.push(new B.yG(w,!x,A.b("Cam\xe9ra"),v.z,u,u))}if(r)t.push(D.oa)
if(r)t.push(new B.yG(D.a03,!1,A.b("Basculer"),v.Q,u,u))
t.push(D.oa)
t.push(new B.yG(D.zp,!1,A.b("Raccrocher"),v.as,C.aE,u))
s.push(A.U(t,C.o,C.bA,C.i,u))
return A.J(s,C.o,C.f,C.V)}}
B.Wa.prototype={
C(d){var x=null
return A.J(A.a([A.ae(A.b5(!1,D.a1W,C.j,x,C.q,x,x,x,x,this.c,x,A.db(C.jG,x,x,C.a8,C.cE,x)),48,48),C.H,A.c(A.b("R\xe9duire"),x,x,x,x,C.uF,x,x,x)],y.p),C.o,C.f,C.V)}}
B.yG.prototype={
C(d){var x,w=this,v=null,u=w.r,t=u==null
if(t)u=w.d?C.l:C.jG
if(!t)x=C.l
else x=w.d?C.n:C.l
t=A.db(u,v,v,C.a8,C.cE,v)
return A.J(A.a([A.ae(A.b5(!1,A.cd(w.c,x,v,26),C.j,v,C.q,v,v,v,v,w.f,v,t),56,56),C.aV,A.c(w.e,v,v,v,v,C.uF,v,v,v)],y.p),C.o,C.f,C.V)}}
B.aXI.prototype={
D8(d){return this.beg(d)},
beg(d){var x=0,w=A.k(y.H),v,u=this,t,s,r,q
var $async$D8=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(u.b!=null){x=1
break}t=u.d
x=3
return A.e(t.iV(0),$async$D8)
case 3:$.c2o()
s=y.N
r=A.a5(["echoCancellation",!0,"noiseSuppression",!0,"autoGainControl",!0],s,y.y)
x=4
return A.e(new B.aNj().Eb(0,A.a5(["audio",r,"video",d&&A.a5(["facingMode","user"],s,s)],s,y.z)),$async$D8)
case 4:q=f
u.b=q
t.sa7y(0,q)
case 1:return A.i(v,w)}})
return A.j($async$D8,w)},
yF(d,e){return this.bf0(d,e)},
bf0(d,e){var x=0,w=A.k(y.H),v=this,u,t,s,r,q
var $async$yF=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:x=2
return A.e(v.e.iV(0),$async$yF)
case 2:x=v.b==null?3:4
break
case 3:x=5
return A.e(v.D8(e),$async$yF)
case 5:case 4:u=v.b
u.toString
x=6
return A.e($.c2o().a2q(d,A.E(y.N,y.z)),$async$yF)
case 6:t=v.a=g
s=u.a6N(0),r=s.length,q=0
case 7:if(!(q<s.length)){x=9
break}x=10
return A.e(t.a1h(0,s[q],u),$async$yF)
case 10:case 8:s.length===r||(0,A.Q)(s),++q
x=7
break
case 9:t.e=new B.aXJ(v)
t.Q=new B.aXK(v)
t.d=new B.aXL(v)
return A.i(null,w)}})
return A.j($async$yF,w)},
aGK(d){var x,w=this
w.c=d
if(!w.x){w.x=!0
w.e.sa7y(0,d)
w.F0()
x=w.r
if(x!=null)x.$0()}},
F0(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o,n,m,l
var $async$F0=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:n=t.z?0.8:1
m=t.c
m=m==null?null:m.Lt(0)
if(m==null)m=C.dg
q=m.length
p=0
case 2:if(!(p<m.length)){x=4
break}s=m[p]
v=6
x=9
return A.e(B.aPB(n,s),$async$F0)
case 9:v=1
x=8
break
case 6:v=5
l=u
r=A.S(l)
A.rf().$1("Appel : volume distant impossible : "+A.u(r))
x=8
break
case 5:x=1
break
case 8:case 3:m.length===q||(0,A.Q)(m),++p
x=2
break
case 4:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$F0,w)},
IH(){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$IH=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.ak("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.RR(0),$async$IH)
case 3:t=e
x=4
return A.e(s.Eq(0,t),$async$IH)
case 4:v=A.a5(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$IH,w)},
BP(d){return this.b6f(d)},
b6f(d){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$BP=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.ak("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.Es(0,new B.CO(d.h(0,"sdp"),d.h(0,"type"))),$async$BP)
case 3:x=4
return A.e(s.RO(0),$async$BP)
case 4:t=f
x=5
return A.e(s.Eq(0,t),$async$BP)
case 5:v=A.a5(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$BP,w)},
Ra(d){return this.b3a(d)},
b3a(d){var x=0,w=A.k(y.H),v=this,u
var $async$Ra=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.n(A.ak("Connexion non pr\xe9par\xe9e."))
x=2
return A.e(u.Es(0,new B.CO(d.h(0,"sdp"),d.h(0,"type"))),$async$Ra)
case 2:return A.i(null,w)}})
return A.j($async$Ra,w)},
R2(d){return this.b2W(d)},
b2W(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$R2=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.e(t.QQ(new B.Ir(A.al(d.h(0,"candidate")),A.al(d.h(0,"sdpMid")),A.dP(d.h(0,"sdpMLineIndex")))),$async$R2)
case 3:case 1:return A.i(v,w)}})
return A.j($async$R2,w)},
Wc(d){return this.atH(d)},
atH(d){var x=0,w=A.k(y.H),v=this,u,t,s,r
var $async$Wc=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.Lt(0)
if(r==null)r=C.dg
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.Q)(r),++s)r[s].sl6(0,t)
return A.i(null,w)}})
return A.j($async$Wc,w)},
Eo(d){return this.atx(d)},
atx(d){var x=0,w=A.k(y.H),v=this
var $async$Eo=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.z=d
x=2
return A.e(B.a9x(d),$async$Eo)
case 2:x=3
return A.e(v.F0(),$async$Eo)
case 3:return A.i(null,w)}})
return A.j($async$Eo,w)},
W9(d){return this.atp(d)},
atp(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$W9=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.LB(0)
if(s==null)s=C.dg
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.Q)(s),++t)s[t].sl6(0,d)
return A.i(null,w)}})
return A.j($async$W9,w)},
Rg(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$Rg=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.LB(0)
if(s==null)s=D.act
if(s.length===0){x=1
break}x=3
return A.e(B.bZq(C.b.gR(s)),$async$Rg)
case 3:case 1:return A.i(v,w)}})
return A.j($async$Rg,w)},
h5(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$h5=A.f(function(d,a0){if(d===1){t=a0
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
u=4
x=7
return A.e(B.a9x(!1),$async$h5)
case 7:u=2
x=6
break
case 4:u=3
i=t
x=6
break
case 3:x=2
break
case 6:u=9
p=s.a
p=p==null?null:p.a0(0)
x=12
return A.e(y.x.b(p)?p:A.dj(p,y.H),$async$h5)
case 12:u=2
x=11
break
case 9:u=8
h=t
x=11
break
case 8:x=2
break
case 11:s.a=null
p=s.b
p=p==null?null:p.a6N(0)
if(p==null)p=C.dg
o=p.length
n=y.c
m=y._
l=0
case 13:if(!(l<p.length)){x=15
break}r=p[l]
u=17
k=J.ckX(r)
if(!m.b(k)){j=new A.az($.aI,n)
j.a=8
j.c=k
k=j}x=20
return A.e(k,$async$h5)
case 20:u=2
x=19
break
case 17:u=16
g=t
x=19
break
case 16:x=2
break
case 19:case 14:p.length===o||(0,A.Q)(p),++l
x=13
break
case 15:s.b=null
u=22
x=25
return A.e(s.d.l(),$async$h5)
case 25:u=2
x=24
break
case 22:u=21
f=t
x=24
break
case 21:x=2
break
case 24:u=27
x=30
return A.e(s.e.l(),$async$h5)
case 30:u=2
x=29
break
case 27:u=26
e=t
x=29
break
case 26:x=2
break
case 29:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$h5,w)}}
B.a56.prototype={
RC(d){return this.b4y(d)},
b4y(d){var x=0,w=A.k(y.H),v=this
var $async$RC=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.x=d
v.e=!1
v.f=0
x=2
return A.e(v.F_(),$async$RC)
case 2:return A.i(null,w)}})
return A.j($async$RC,w)},
F_(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$F_=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.e){x=1
break}r=s.x
if(r==null||J.a3(r)===0){x=1
break}u=4
q=B.cl2(B.bYt(A.cF(r,0,null),null))
s.b=q
x=7
return A.e(q.f.a,$async$F_)
case 7:s.f=0
p=q.r.b
p===$&&A.d()
p=p.b
p===$&&A.d()
s.c=new A.cD(p,A.x(p).i("cD<1>")).aV(s.gaW6(),!0,s.gaV7(),new B.ayg(s))
u=2
x=6
break
case 4:u=3
n=t
s.a_h()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$F_,w)},
aW7(d){var x,w,v,u
try{x=C.W.cD(0,J.m(d),null)
v=y.P
if(!v.b(x))return
if(!J.t(J.q(x,"type"),"signal_appel"))return
w=J.q(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.D(0,B.c_A(w))}catch(u){}},
a_h(){var x,w=this,v=w.c
if(v!=null)v.W(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.D(0,null)
return}x=D.a8F[v]
w.f=v+1
v=w.d
if(v!=null)v.W(0)
w.d=A.dl(A.dg(0,0,0,0,x),new B.ayh(w))},
IN(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o
var $async$IN=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.W(0)
s=t.c
s=s==null?null:s.W(0)
x=2
return A.e(y.x.b(s)?s:A.dj(s,y.H),$async$IN)
case 2:t.c=null
v=4
s=t.b
if(s==null)s=null
else{r=s.w
if(r===$){q=s.r.b
q===$&&A.d()
q=q.a
q===$&&A.d()
r!==$&&A.b1()
r=s.w=new B.apr(s,q)}s=r.a0(0)}x=7
return A.e(y._.b(s)?s:A.dj(s,y.z),$async$IN)
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
return A.j($async$IN,w)}}
B.a8G.prototype={
rV(d){return this.bbN(d)},
bbN(d){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p
var $async$rV=A.f(function(e,f){if(e===1){u=f
x=v}while(true)switch(x){case 0:v=3
r=t.a
x=6
return A.e((r==null?t.a=A.Nk():r).aL(0),$async$rV)
case 6:x=7
return A.e(t.a.W8(d),$async$rV)
case 7:x=8
return A.e(t.a.iE(C.GQ),$async$rV)
case 8:x=9
return A.e(t.a.hJ(1),$async$rV)
case 9:x=10
return A.e(t.a.cX(0),$async$rV)
case 10:v=1
x=5
break
case 3:v=2
p=u
s=A.S(p)
A.rf().$1("Sonnerie appel : lecture impossible ("+d+") : "+A.u(s))
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$rV,w)},
i8(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$i8=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
s=s==null?null:s.aL(0)
x=6
return A.e(y.x.b(s)?s:A.dj(s,y.H),$async$i8)
case 6:v=1
x=5
break
case 3:v=2
q=u
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$i8,w)},
h5(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$h5=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
s=s==null?null:s.l()
x=6
return A.e(y.x.b(s)?s:A.dj(s,y.H),$async$h5)
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
return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$h5,w)}}
B.aSr.prototype={
a2q(d,e){return this.b65(d,e)},
b65(d,e){var x=0,w=A.k(y.J),v,u,t,s,r
var $async$a2q=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.a5(["mandatory",A.E(r,r),"optional",A.a([A.a5(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.S)],t,y.K)}r=self.RTCPeerConnection
t=A.fu(u,y.N,y.z)
t.t(0,d)
s=new r(y.m.a(A.c0(t)))
t=J.m(s)
v=B.cs2(C.c8.gjK().b5(new A.f2(t)),s)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a2q,w)}}
B.tp.prototype={
Lt(d){var x=A.a([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.cX(w,A.V(w).i("cX<1,aA>"))
J.h7(w,new B.aNA(x))
return x},
LB(d){var x=A.a([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.cX(w,A.V(w).i("cX<1,aA>"))
J.h7(w,new B.aNB(x))
return x},
a6N(d){var x=A.G(this.Lt(0),!0,y.G)
C.b.t(x,this.LB(0))
return x}}
B.a9a.prototype={
aAj(d){var x=this,w=x.d
w.addEventListener("ended",A.bP(new B.aNx(x)))
w.addEventListener("mute",A.bP(new B.aNy(x)))
w.addEventListener("unmute",A.bP(new B.aNz(x)))},
sl6(d,e){this.d.enabled=e},
Rb(d,e){return this.b3d(0,e)},
b3d(d,e){var x=0,w=A.k(y.H),v=this
var $async$Rb=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:x=2
return A.e(A.e_(v.d.applyConstraints(y.m.a(A.c0(e))),y.X),$async$Rb)
case 2:return A.i(null,w)}})
return A.j($async$Rb,w)},
aL(d){var x=0,w=A.k(y.H),v=this
var $async$aL=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.i(null,w)}})
return A.j($async$aL,w)}}
B.aNj.prototype={
Eb(d,e){return this.asv(0,e)},
asv(d,e){var x=0,w=A.k(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$Eb=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.cDv())if(y.f.b(e.h(0,"video"))&&J.q(e.h(0,"video"),"facingMode")!=null)J.ja(e.h(0,"video"),"facingMode")
e.cz(0,"video",new B.aNl())
e.cz(0,"audio",new B.aNm())}catch(a0){A.o6("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.ih(e.h(0,"audio"),i,i).aC(0,"optional")&&y.F.b(J.q(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.q(e.h(0,"audio"),"optional")
r=A.E(y.N,y.z)
J.h7(s,new B.aNn(r))
J.ja(e.h(0,"audio"),"optional")
J.j9(e.h(0,"audio"),r)}}catch(a0){q=A.S(a0)
p=A.bh(a0)
A.o6("[getUserMedia] failed to translate optional audio constraints, "+A.u(q)+", "+A.u(p))}i=self
o=i.window.navigator.mediaDevices
h=y.m
x=o.getUserMedia!=null?7:9
break
case 7:n=A.c0(e)
x=10
return A.e(A.e_(o.getUserMedia(h.a(n)),h),$async$Eb)
case 10:m=a2
v=new B.tp(m,"local")
x=1
break
x=8
break
case 9:i=i.window.navigator.mediaDevices
g=e.h(0,"audio")
x=11
return A.e(A.e_(i.getUserMedia({video:e.h(0,"video"),audio:g}),h),$async$Eb)
case 11:l=a2
v=new B.tp(l,"local")
x=1
break
case 8:u=2
x=6
break
case 4:u=3
f=t
k=A.S(f)
i=J.m(k)
throw A.n("Unable to getUserMedia: "+i)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Eb,w)}}
B.aaV.prototype={
aAp(d,e){var x=this,w=x.at
w===$&&A.d()
w.addEventListener("datachannel",A.bP(new B.aSt(x)))
w.addEventListener("icecandidate",A.bP(new B.aSu(x)))
w.addEventListener("iceconnectionstatechange",A.bP(new B.aSv(x)))
w.onicegatheringstatechange=A.bP(new B.aSw(x))
w.addEventListener("signalingstatechange",A.bP(new B.aSx(x)))
if(!$.c2a())w.addEventListener("connectionstatechange",A.bP(new B.aSy(x)))
w.addEventListener("negotiationneeded",A.bP(new B.aSz(x)))
w.addEventListener("track",A.bP(new B.aSA(x)))},
RR(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$RR=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.e_(s.createOffer(y.m.a(A.c0(A.E(y.N,y.z)))),y.A),$async$RR)
case 3:t=f
v=new B.CO(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$RR,w)},
RO(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$RO=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.e_(s.createAnswer(y.m.a(A.c0(A.E(y.N,y.z)))),y.A),$async$RO)
case 3:t=f
v=new B.CO(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$RO,w)},
Eq(d,e){return this.atB(0,e)},
atB(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$Eq=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.e_(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$Eq)
case 2:return A.i(null,w)}})
return A.j($async$Eq,w)},
Es(d,e){return this.atS(0,e)},
atS(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$Es=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.e_(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$Es)
case 2:return A.i(null,w)}})
return A.j($async$Es,w)},
QQ(d){return this.b2A(d)},
b2A(d){var x=0,w=A.k(y.H),v=this,u,t
var $async$QQ=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.d()
u=d.b
u.toString
x=2
return A.e(A.e_(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$QQ)
case 2:return A.i(null,w)}})
return A.j($async$QQ,w)},
a0(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$a0=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.d()
t.close()
v=A.cT(null,y.H)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a0,w)},
a1h(d,e,f){return this.b2Q(0,e,f)},
b2Q(d,e,f){var x=0,w=A.k(y.e),v,u=this,t
var $async$a1h=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.d()
t.addTrack(e.d,f.e)
v=new B.aaW()
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a1h,w)}}
B.aaW.prototype={}
B.c_m.prototype={
aL(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$aL=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.S(r)
if(y.L.b(s)){u=s
s=u
J.m(s)
throw A.n("Unable to RTCRtpTransceiver::stop: "+A.u(s))}else throw r}return A.i(null,w)}})
return A.j($async$aL,w)}}
B.Sx.prototype={
saoS(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.Jk()
if(x!=null)x.style.objectFit=e},
aiR(){var x=this,w=x.Jk(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sp(0,v.alK(u,x.z!=null,0,t))},
sa7y(d,e){var x,w,v,u,t=this
t.z=e
if(e.LB(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.au(y.l.b(x)?x:new A.cX(x,A.V(x).i("cX<1,aA>")))
for(;x.A();){w=x.gK(x)
t.x.addTrack(w)}}if(e.Lt(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.au(y.l.b(x)?x:new A.cX(x,A.V(x).i("cX<1,aA>")))
for(;x.A();){w=x.gK(x)
t.y.addTrack(w)}}if(t.y!=null){if(t.w==null){v=self.document.createElement("audio")
v.id="audio_"+("RTCVideoRenderer-"+t.Q)
v.muted=e.b==="local"
v.autoplay=!0
t.w=v
x=t.aIi()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.Jk()
if(u!=null){u.srcObject=t.x
x=t.Jk()
x.toString
t.a9l(x)}t.sp(0,t.a.b4W(t.z!=null))},
aIi(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
if(v!=null)return v
x=w.document.createElement("div")
x.id="html_webrtc_audio_manager_list"
x.style.display="none"
w=w.document.body
if(w!=null)w.append(x)
return x},
Jk(){var x=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(x!=null)return x
return null},
l(){var x=0,w=A.k(y.H),v,u=this,t,s,r,q,p
var $async$l=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u.z=null
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.Q)(t),++r)t[r].W(0)
q=u.Jk()
t=q==null
if(!t)q.removeAttribute("src")
if(!t)q.load()
t=u.w
if(t!=null)t.remove()
p=self.document.getElementById("html_webrtc_audio_manager_list")
if(p!=null&&!p.hasChildNodes())p.remove()
v=u.eH()
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$l,w)},
iV(d){var x=0,w=A.k(y.H),v=this
var $async$iV=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:$.F3()
$.pr().t6("RTCVideoRenderer-"+v.Q,new B.aSG(v),!0)
return A.i(null,w)}})
return A.j($async$iV,w)},
a9l(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.Sz.prototype={
N(){return new B.SA()}}
B.SA.prototype={
U(){var x,w,v=this
v.X()
v.a.c.a9(0,v.gaT8())
x=v.a
w=x.c
w.as=x.e
w.saoS(0,x.d===D.tp?"contain":"cover")},
aT9(){if(this.c!=null)this.m(new B.aSH())},
l(){if(this.c!=null)this.a1()},
aX(d){var x,w
this.be(d)
A.dl(A.dg(0,0,10,0,0),new B.aSJ(this))
x=this.a
w=x.c
w.saoS(0,x.d===D.tp?"contain":"cover")},
C(d){return new A.iy(new B.aSI(this),null)}}
B.a7w.prototype={
aA9(d,e,f,g){var x=this,w=$.aI
x.a!==$&&A.bi()
x.a=new B.Yp(d,x,new A.b2(new A.az(w,y.c),y.r),e,g.i("Yp<0>"))
if(f.a.giv())f.a=new B.U4(g.i("@<0>").c1(g).i("U4<1,2>")).hc(f.a)
w=A.fI(null,new B.aGE(f,x),null,!0,g)
x.b!==$&&A.bi()
x.b=w},
afg(){var x,w
this.d=!0
x=this.c
if(x!=null)x.W(0)
w=this.b
w===$&&A.d()
w.a0(0)}}
B.Yp.prototype={
D(d,e){if(this.e)throw A.n(A.ak("Cannot add event after closing."))
if(this.d)return
this.a.a.D(0,e)},
dd(d,e){if(this.e)throw A.n(A.ak("Cannot add event after closing."))
if(this.d)return
this.aKR(d,e)},
hx(d){return this.dd(d,null)},
aKR(d,e){var x=this
if(x.w){x.a.a.dd(d,e)
return}x.c.fM(d,e)
x.afh()
x.b.afg()
x.a.a.a0(0).f8(new B.bok())},
a0(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.afg()
x.c.co(0,x.a.a.a0(0))}return x.c.a},
afh(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.ds(0)
return},
$idV:1}
B.adg.prototype={}
B.adh.prototype={}
B.A_.prototype={
aaD(d,e){var x=this.b
if((x.b&4)!==0)return
x.D(0,new B.FQ(d,e))
x.a0(0)},
a74(d){var x
if((this.b.b&4)!==0)throw A.n(B.c01())
x=A.c0(d)
x.toString
this.a.send(x)},
xs(d,e,f){return this.b4j(0,e,f)},
b4j(d,e,f){var x=0,w=A.k(y.H),v=this,u
var $async$xs=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.n(B.c01())
u.a0(0)
v.a.close()
return A.i(null,w)}})
return A.j($async$xs,w)},
$ic00:1}
B.uf.prototype={}
B.JI.prototype={
n(d,e){if(e==null)return!1
return e instanceof B.JI&&e.a===this.a},
gH(d){return C.c.gH(this.a)}}
B.Fp.prototype={
n(d,e){var x,w,v,u
if(e==null)return!1
if(e instanceof B.Fp&&e.a.length===this.a.length){for(x=this.a,w=x.length,v=e.a,u=0;u<w;++u)if(v[u]!==x[u])return!1
return!0}return!1},
gH(d){return A.hi(this.a)},
j(d){return"BinaryDataReceived("+A.u(this.a)+")"}}
B.FQ.prototype={
n(d,e){if(e==null)return!1
return e instanceof B.FQ&&e.a===this.a&&e.b===this.b},
gH(d){return A.hi([this.a,this.b])},
j(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.Ke.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketException"
else return"WebSocketException: "+x},
$ibL:1}
B.Kd.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+x}}
B.asL.prototype={
azY(d){d.eZ(new B.asP(this),new B.asQ(this),y.a)}}
B.apr.prototype={
a0(d){var x=this.b
x.e=x.d=null
return this.avB(0)}}
B.aer.prototype={
j(d){return"WebSocketChannelException: "+this.a},
$ibL:1}
B.xN.prototype={
M(){return"RTCSignalingState."+this.b}}
B.St.prototype={
M(){return"RTCIceGatheringState."+this.b}}
B.xM.prototype={
M(){return"RTCPeerConnectionState."+this.b}}
B.nA.prototype={
M(){return"RTCIceConnectionState."+this.b}}
B.aaX.prototype={
M(){return"RTCVideoViewObjectFit."+this.b}}
B.aSq.prototype={}
B.R6.prototype={}
B.HE.prototype={
j(d){var x=this.d
return"Track(id: "+A.u(x.id)+", kind: "+A.u(x.kind)+", label: "+A.u(x.label)+", enabled: "+A.u(x.enabled)+", muted: "+A.u(x.muted)+")"}}
B.aNi.prototype={}
B.Ir.prototype={}
B.Su.prototype={}
B.Sv.prototype={}
B.aSB.prototype={}
B.CO.prototype={}
B.Sw.prototype={}
B.Sy.prototype={
alK(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.Sy(x,w,v)},
b4W(d){return this.alK(null,d,null,null)},
j(d){var x=this
return A.a7(x).j(0)+"(width: "+A.u(x.a)+", height: "+A.u(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["av<~>()","~()","~(Ji)","bt(Ir)","bt(Sw)","bt(nA)","~(@)","tp(@)","bt(c00)","~(uf)"])
B.aYl.prototype={
$0(){return J.ckg(this.a.b8())},
$S:1}
B.aYm.prototype={
$1(d){var x,w,v,u
try{this.b.D(0,this.a.$ti.y[1].a(d))}catch(v){u=A.S(v)
if(y.i.b(u)){x=u
w=A.bh(v)
this.b.dd(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.bUT.prototype={
$1(d){var x,w,v,u=$.a8().b
if(u==null||u.length===0)return
x=self
w=new x.Headers()
w.set("Authorization","Bearer "+A.u(u))
w.set("Content-Type","application/json")
v=y.N
x.window.fetch("https://connexion-prophetique.onrender.com/messagerie/appels/"+this.a+"/signaux",{method:"POST",headers:w,body:C.W.dN(A.a5(["type","termine","contenu",A.E(v,y.z)],v,y.K),null),keepalive:!0})},
$S:23}
B.bUS.prototype={
$0(){return self.window.removeEventListener("beforeunload",this.a)},
$S:0}
B.auF.prototype={
$1(d){if(d==null)return null
return A.ca(J.m(d))},
$S:115}
B.bjH.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.e)x.GX(!0)},
$S:0}
B.bjI.prototype={
$1(d){return this.a.QF()},
$S:26}
B.bjE.prototype={
$0(){var x=this.a.c
if(x!=null)A.ab(x,!1).bF()},
$S:0}
B.bjF.prototype={
$0(){return this.a.e=!0},
$S:0}
B.bjB.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.bjC.prototype={
$0(){return this.a.d=!1},
$S:0}
B.bjD.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.bjy.prototype={
$0(){return this.a.f=!0},
$S:0}
B.bjz.prototype={
$0(){return this.a.f=!1},
$S:0}
B.bjA.prototype={
$1(d){var x=this.a.a,w=x.c,v=x.e,u=x.d
return B.bZ2(x.w,null,w,x.y,u,null,null,!1,v)},
$S:1154}
B.bjG.prototype={
$0(){return this.a.aWo()},
$S:0}
B.bjj.prototype={
$1(d){this.a.wv("candidat_ice",d,!1)},
$S:235}
B.bjk.prototype={
$0(){var x=this.a
if(x.c!=null)x.m(new B.bji(x))},
$S:0}
B.bji.prototype={
$0(){return this.a.fy=!0},
$S:0}
B.bjl.prototype={
$0(){this.a.lQ(A.b("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.bjm.prototype={
$0(){},
$S:0}
B.bjn.prototype={
$1(d){var x=this.a,w=x.ay
if(x.c!=null&&w!=null&&x.x)x.m(new B.bjh(x,w))},
$S:26}
B.bjh.prototype={
$0(){return this.a.ch=new A.ax(Date.now(),0,!1).en(this.b)},
$S:0}
B.bjo.prototype={
$1(d){},
$S:129}
B.bjp.prototype={
$1(d){this.a.wB()},
$S:26}
B.bj5.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.x&&!x.y){if(x.a.f)x.wv("annule",C.ej,!1)
x.lQ(A.b("Pas de r\xe9ponse"))}},
$S:0}
B.bj6.prototype={
$0(){var x=this.a
x.fx=x.a.d==="video"?A.b("Micro ou cam\xe9ra refus\xe9 : autorise le micro et la cam\xe9ra dans les r\xe9glages pour appeler en vid\xe9o."):A.b("Micro refus\xe9 : autorise le micro dans les r\xe9glages pour appeler.")},
$S:0}
B.bj7.prototype={
$1(d){this.a.wv("candidat_ice",d,!1)},
$S:235}
B.bj8.prototype={
$0(){var x=this.a
if(x.c!=null)x.m(new B.bj4(x))},
$S:0}
B.bj4.prototype={
$0(){return this.a.fy=!0},
$S:0}
B.bj9.prototype={
$0(){this.a.lQ(A.b("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.bja.prototype={
$0(){return this.a.z=!0},
$S:0}
B.bjb.prototype={
$1(d){var x=this.a,w=x.ay
if(x.c!=null&&w!=null&&x.x)x.m(new B.bj3(x,w))},
$S:26}
B.bj3.prototype={
$0(){return this.a.ch=new A.ax(Date.now(),0,!1).en(this.b)},
$S:0}
B.bjc.prototype={
$1(d){},
$S:129}
B.bjd.prototype={
$1(d){this.a.wB()},
$S:26}
B.bjr.prototype={
$1(d){var x=this.a
if(x.c==null||x.y)return
x.Po()
x.abX("reponse",d)},
$S:387}
B.bjs.prototype={
$1(d){this.a.lQ(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:15}
B.bjt.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.Po()},
$S:30}
B.bju.prototype={
$1(d){this.a.lQ(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:15}
B.bjv.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.abX("offre",d)},
$S:387}
B.bjw.prototype={
$1(d){this.a.lQ(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:15}
B.bje.prototype={
$0(){var x=this.a
x.x=!0
x.ay=new A.ax(Date.now(),0,!1)
x.ch=C.S},
$S:0}
B.bjf.prototype={
$0(){return this.a.go=!0},
$S:0}
B.bjg.prototype={
$1(d){var x=this.a.c
if(x!=null)A.ab(x,!1).bF()},
$S:4}
B.bjq.prototype={
$1(d){return A.E(y.N,y.z)},
$S:133}
B.bj2.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.bj1.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.bj0.prototype={
$0(){return this.a.ax=this.b},
$S:0}
B.bjx.prototype={
$2(d,e){if(!d)this.a.GS()},
$S:1158}
B.aXJ.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.a5(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+3}
B.aXK.prototype={
$1(d){var x=d.b,w=x.length!==0?C.b.gR(x):null
if(w!=null)this.a.aGK(w)},
$S:z+4}
B.aXL.prototype={
$1(d){var x
if(d===D.Lu){x=this.a.w
if(x!=null)x.$0()}},
$S:z+5}
B.ayg.prototype={
$1(d){return this.a.a_h()},
$S:21}
B.ayh.prototype={
$0(){var x=this.a
if(!x.e)x.F_()},
$S:0}
B.bVM.prototype={
$1(d){return d.length!==0},
$S:11}
B.aNA.prototype={
$1(d){return this.a.push(B.bZO(d))},
$S:21}
B.aNB.prototype={
$1(d){return this.a.push(B.bZO(d))},
$S:21}
B.aNx.prototype={
$1(d){},
$S:22}
B.aNy.prototype={
$1(d){},
$S:22}
B.aNz.prototype={
$1(d){},
$S:22}
B.aNl.prototype={
$0(){return!1},
$S:51}
B.aNm.prototype={
$0(){return!1},
$S:51}
B.aNn.prototype={
$1(d){J.h7(d,new B.aNk(this.a))},
$S:235}
B.aNk.prototype={
$2(d,e){this.a.k(0,d,e)},
$S:45}
B.aSt.prototype={
$1(d){},
$S:22}
B.aSu.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.Ir(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:22}
B.aSv.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.d()
v=B.cD4(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.c2a())switch(w.cx.a){case 0:w.cy=D.Lz
break
case 1:w.cy=D.LA
break
case 3:w.cy=D.LB
break
case 5:w.cy=D.Lx
break
case 6:w.cy=D.Ly
break
case 7:w.cy=D.to
break
default:break}},
$S:32}
B.aSw.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.CW=B.cD5(w.iceGatheringState)},
$S:32}
B.aSx.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.ch=B.cF0(w.signalingState)},
$S:32}
B.aSy.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.cy=B.cEi(w.connectionState)},
$S:32}
B.aSz.prototype={
$1(d){},
$S:32}
B.aSA.prototype={
$1(d){var x,w=this.a,v=w.Q
if(v!=null){B.bZO(d.track)
x=d.streams
x=y.l.b(x)?x:new A.cX(x,A.V(x).i("cX<1,aA>"))
w=J.dx(x,new B.aSs(w),y.h)
v.$1(new B.Sw(A.G(w,!0,w.$ti.i("aE.E"))))}},
$S:22}
B.aSs.prototype={
$1(d){return new B.tp(d,this.a.as)},
$S:z+7}
B.bVU.prototype={
$1(d){return J.fP(self.window.navigator.userAgent,A.bE(d,!1,!1))},
$S:11}
B.aSG.prototype={
$1(d){var x,w,v,u,t
for(x=this.a,w=x.at,v=w.length,u=0;u<w.length;w.length===v||(0,A.Q)(w),++u)w[u].W(0)
C.b.Y(w)
t=self.document.createElement("video")
t.autoplay=!0
t.muted=!0
t.controls=!1
t.srcObject=x.x
t.id="video_"+("RTCVideoRenderer-"+x.Q)
t.setAttribute("playsinline","true")
x.a9l(t)
v=y.k.c
w.push(A.ik(t,"canplay",new B.aSC(x),!1,v))
w.push(A.ik(t,"resize",new B.aSD(x),!1,v))
w.push(A.ik(t,"error",new B.aSE(t),!1,v))
w.push(A.ik(t,"ended",new B.aSF(),!1,v))
return t},
$S:160}
B.aSC.prototype={
$1(d){this.a.aiR()},
$S:21}
B.aSD.prototype={
$1(d){this.a.aiR()},
$S:21}
B.aSE.prototype={
$1(d){var x,w,v=this.a.error
A.o6("RTCVideoRenderer: videoElement.onError, "+J.m(v))
v.toString
x=C.GW.h(0,A.at(v,"code"))
x.toString
w=!J.t(A.at(v,"message"),"")?A.at(v,"message"):"No further diagnostic information can be determined or provided."
throw A.n(A.nv(x,C.GV.h(0,A.at(v,"code")),w,null))},
$S:23}
B.aSF.prototype={
$1(d){},
$S:21}
B.aSH.prototype={
$0(){},
$S:0}
B.aSJ.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aSI.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.a7N("RTCVideoRenderer-"+w.Q)
else w=A.R(x,x,C.j,x,x,x,x,x,x,x,x,x,x,x)
return A.cM(A.R(x,w,C.j,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:1159}
B.aGE.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.d()
v.c=x.fe(w.ghO(w),new B.aGD(v),w.gov())},
$S:0}
B.aGD.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.d()
w.afh()
x=x.b
x===$&&A.d()
x.a0(0)},
$S:0}
B.bok.prototype={
$1(d){},
$S:15}
B.awO.prototype={
$1(d){this.a.co(0,this.b)},
$S:22}
B.awP.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.h_(new B.Ke("Failed to connect WebSocket"))
else this.b.aaD(1006,"error")},
$S:22}
B.awQ.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.cs("data")
if(typeof x==="string")w.b=new B.JI(A.bk(x))
else if(typeof x==="object"&&A.c6P(y.m.a(x),"ArrayBuffer"))w.b=new B.Fp(A.Rw(y.o.a(x),0,null))
else throw A.n(A.ak("unexpected message type: "+J.aF(x).j(0)))
v.D(0,w.b8())},
$S:23}
B.awR.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.co(0,this.b)
this.b.aaD(d.code,d.reason)},
$S:22}
B.asP.prototype={
$1(d){var x=d.b,w=this.a
new A.cD(x,A.x(x).i("cD<1>")).cF(new B.asM(w))
x=w.r.a
x===$&&A.d()
x=x.b
x===$&&A.d()
new A.cD(x,A.x(x).i("cD<1>")).bc3(new B.asN(d),new B.asO(w,d))
w.f.ds(0)},
$S:z+8}
B.asM.prototype={
$1(d){var x,w,v
$label0$0:{x=d instanceof B.JI
w=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.D(0,w)
break $label0$0}x=d instanceof B.Fp
v=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.D(0,v)
break $label0$0}if(d instanceof B.FQ){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.a0(0)}}},
$S:z+9}
B.asN.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.ao(B.c01())
s=A.c0(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.M.b(x)
if(t)v=x
if(t){this.a.a74(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.a74(new Uint8Array(A.cv(u)))
break $label1$1}t=A.aR("Cannot send "+J.aF(d).j(0))
throw A.n(t)}}catch(r){if(!(A.S(r) instanceof B.Kd))throw r}},
$S:18}
B.asO.prototype={
$0(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$$0=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
x=6
return A.e(t.b.xs(0,s.d,s.e),$async$$0)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(!(A.S(q) instanceof B.Kd))throw q
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$$0,w)},
$S:1}
B.asQ.prototype={
$1(d){var x,w=d instanceof A.V4?d:new B.aer(J.m(d)),v=this.a
v.f.h_(w)
v=v.r.a
v===$&&A.d()
x=v.a
x===$&&A.d()
x.hx(w)
v=v.a
v===$&&A.d()
v.a0(0)},
$S:32};(function aliases(){var x=B.Ge.prototype
x.avB=x.a0})();(function installTearOffs(){var x=a._instance_0u,w=a._instance_1u
x(B.Xx.prototype,"gaB5","EP",0)
var v
w(v=B.Xw.prototype,"gaiJ","aiK",2)
x(v,"gafV","GS",0)
x(v,"gagb","aWi",1)
x(v,"ga9y","MY",0)
x(v,"ga9x","MX",0)
x(v,"ga9v","MU",0)
x(v,"ga9w","MV",0)
w(v=B.a56.prototype,"gaW6","aW7",6)
x(v,"gaV7","a_h",1)
x(B.Sx.prototype,"ge_","l",0)
x(B.SA.prototype,"gaT8","aT9",1)})();(function inheritance(){var x=a.inheritMany,w=a.inherit
x(A.a6,[B.Ge,B.auE,B.Ji,B.a5k,B.aXI,B.a56,B.a8G,B.aSq,B.R6,B.HE,B.aNi,B.Su,B.Sv,B.aSB,B.adh,B.Yp,B.adg,B.A_,B.uf,B.Ke,B.aer,B.Ir,B.CO,B.Sw,B.Sy])
w(B.U4,A.fJ)
x(A.jM,[B.aYl,B.bUS,B.bjH,B.bjE,B.bjF,B.bjB,B.bjC,B.bjD,B.bjy,B.bjz,B.bjG,B.bjk,B.bji,B.bjl,B.bjm,B.bjh,B.bj5,B.bj6,B.bj8,B.bj4,B.bj9,B.bja,B.bj3,B.bje,B.bjf,B.bj2,B.bj1,B.bj0,B.ayh,B.aNl,B.aNm,B.aSH,B.aSJ,B.aGE,B.aGD,B.asO])
x(A.jg,[B.aYm,B.bUT,B.auF,B.bjI,B.bjA,B.bjj,B.bjn,B.bjo,B.bjp,B.bj7,B.bjb,B.bjc,B.bjd,B.bjr,B.bjs,B.bjt,B.bju,B.bjv,B.bjw,B.bjg,B.bjq,B.aXJ,B.aXK,B.aXL,B.ayg,B.bVM,B.aNA,B.aNB,B.aNx,B.aNy,B.aNz,B.aNn,B.aSt,B.aSu,B.aSv,B.aSw,B.aSx,B.aSy,B.aSz,B.aSA,B.aSs,B.bVU,B.aSG,B.aSC,B.aSD,B.aSE,B.aSF,B.bok,B.awO,B.awP,B.awQ,B.awR,B.asP,B.asM,B.asN,B.asQ])
x(A.O,[B.pU,B.pT,B.Sz])
x(A.W,[B.Xx,B.Xw,B.SA])
x(A.aw,[B.W9,B.ag6,B.Wa,B.yG])
x(A.rD,[B.bjx,B.aNk,B.aSI])
w(B.aSr,B.aSq)
w(B.tp,B.R6)
w(B.a9a,B.HE)
w(B.aNj,B.aNi)
w(B.aaV,B.Su)
w(B.aaW,B.Sv)
w(B.c_m,B.aSB)
w(B.Sx,A.di)
x(B.adh,[B.a7w,B.asL])
x(B.uf,[B.JI,B.Fp,B.FQ])
w(B.Kd,B.Ke)
w(B.apr,B.Ge)
x(A.KK,[B.xN,B.St,B.xM,B.nA,B.aaX])})()
A.nZ(b.typeUniverse,JSON.parse('{"Ge":{"dV":["1"]},"U4":{"fJ":["1","2"],"fJ.S":"1","fJ.T":"2"},"pU":{"O":[],"p":[]},"Xx":{"W":["pU"]},"W9":{"aw":[],"p":[]},"pT":{"O":[],"p":[]},"Xw":{"W":["pT"]},"ag6":{"aw":[],"p":[]},"Wa":{"aw":[],"p":[]},"yG":{"aw":[],"p":[]},"tp":{"R6":[]},"a9a":{"HE":[]},"aaV":{"Su":[]},"aaW":{"Sv":[]},"Sx":{"di":["Sy"],"aY":[]},"Sz":{"O":[],"p":[]},"SA":{"W":["Sz"]},"Yp":{"dV":["1"]},"A_":{"c00":[]},"JI":{"uf":[]},"Fp":{"uf":[]},"FQ":{"uf":[]},"Ke":{"bL":[]},"Kd":{"bL":[]},"apr":{"dV":["@"]},"aer":{"bL":[]}}'))
A.caU(b.typeUniverse,JSON.parse('{"Ge":1,"adh":1}'))
var y=(function rtii(){var x=A.aB
return{b:x("A_"),L:x("bL"),_:x("av<@>"),x:x("av<~>"),S:x("H<ah<o,M>>"),t:x("H<ah<o,@>>"),Q:x("H<HE>"),d:x("H<j_<@>>"),s:x("H<o>"),p:x("H<p>"),m:x("aA"),l:x("D<aA>"),F:x("D<ah<o,@>>"),j:x("D<@>"),I:x("D<v>"),P:x("ah<o,@>"),f:x("ah<@,@>"),E:x("R6"),G:x("HE"),h:x("tp"),o:x("qf"),a:x("bt"),K:x("a6"),J:x("Su"),e:x("Sv"),v:x("CO"),Z:x("adg<a6?>"),N:x("o"),i:x("qL"),M:x("e9"),D:x("uf"),U:x("Y<o>"),g:x("dI<Ji>"),n:x("dI<~>"),V:x("b2<A_>"),r:x("b2<@>"),R:x("b2<~>"),k:x("XH<aA>"),C:x("pe<aA>"),u:x("az<A_>"),c:x("az<@>"),W:x("az<~>"),q:x("kf"),y:x("M"),z:x("@"),A:x("aA?"),X:x("a6?"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.Ve=new B.a5k(C.kn)
D.yG=new A.aq(32,0,32,0)
D.zp=new A.ar(57639,"MaterialIcons",null,!1)
D.a_Z=new A.ar(58337,"MaterialIcons",null,!1)
D.a0_=new A.ar(58341,"MaterialIcons",null,!1)
D.a03=new A.ar(58923,"MaterialIcons",null,!1)
D.zv=new A.ar(59048,"MaterialIcons",null,!1)
D.a04=new A.ar(59049,"MaterialIcons",null,!1)
D.a05=new A.ar(59077,"MaterialIcons",null,!1)
D.a_X=new A.ar(58195,"MaterialIcons",null,!1)
D.a1W=new A.ac(D.a_X,28,C.l,null,null)
D.a8F=A.a(x([1,2,4,8,16]),A.aB("H<v>"))
D.act=A.a(x([]),y.Q)
D.H7=new A.fH("FlutterWebRTC.Method",C.bc,null)
D.akY=new B.nA(0,"RTCIceConnectionStateNew")
D.akZ=new B.nA(1,"RTCIceConnectionStateChecking")
D.al_=new B.nA(2,"RTCIceConnectionStateCompleted")
D.al0=new B.nA(3,"RTCIceConnectionStateConnected")
D.al1=new B.nA(4,"RTCIceConnectionStateCount")
D.Lu=new B.nA(5,"RTCIceConnectionStateFailed")
D.al2=new B.nA(6,"RTCIceConnectionStateDisconnected")
D.Lv=new B.nA(7,"RTCIceConnectionStateClosed")
D.Lw=new B.St(0,"RTCIceGatheringStateNew")
D.al3=new B.St(1,"RTCIceGatheringStateGathering")
D.al4=new B.St(2,"RTCIceGatheringStateComplete")
D.to=new B.xM(0,"RTCPeerConnectionStateClosed")
D.Lx=new B.xM(1,"RTCPeerConnectionStateFailed")
D.Ly=new B.xM(2,"RTCPeerConnectionStateDisconnected")
D.Lz=new B.xM(3,"RTCPeerConnectionStateNew")
D.LA=new B.xM(4,"RTCPeerConnectionStateConnecting")
D.LB=new B.xM(5,"RTCPeerConnectionStateConnected")
D.al5=new B.xN(0,"RTCSignalingStateStable")
D.al6=new B.xN(1,"RTCSignalingStateHaveLocalOffer")
D.al7=new B.xN(2,"RTCSignalingStateHaveRemoteOffer")
D.al8=new B.xN(3,"RTCSignalingStateHaveLocalPrAnswer")
D.al9=new B.xN(4,"RTCSignalingStateHaveRemotePrAnswer")
D.LC=new B.xN(5,"RTCSignalingStateClosed")
D.ala=new B.Sy(0,0,0)
D.tp=new B.aaX(0,"RTCVideoViewObjectFitContain")
D.LD=new B.aaX(1,"RTCVideoViewObjectFitCover")
D.oa=new A.c9(20,null,null,null)
D.aoG=new A.c9(48,null,null,null)
D.N7=new A.c9(null,64,null,null)
D.arP=new A.B(!0,C.l,null,null,null,null,22,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.NL=new A.B(!0,C.l,null,null,null,null,26,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.asa=new A.B(!0,C.n,null,null,null,null,32,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.NT=new A.B(!0,C.n,null,null,null,null,40,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.uC=new A.B(!0,C.ak,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.c1_=null
$.c9Z=!1
$.c8d=1})();(function lazyInitializers(){var x=a.lazyFinal
x($,"cKf","c2o",()=>new B.aSr())
x($,"cGT","c2a",()=>C.c.q(A.at(A.at(A.at(A.c1Q(),"window"),"navigator"),"userAgent"),"Firefox"))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_1",e:"endPart",h:b})})($__dart_deferred_initializers__,"YSyV4OutMGGEhbWnjgKsrmvPsB4=");