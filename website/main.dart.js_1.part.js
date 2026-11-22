((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_1",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={HS:function HS(){},Wb:function Wb(d){this.$ti=d},b1L:function b1L(d){this.a=d},b1M:function b1M(d,e){this.a=d
this.b=e},
cnH(d){var x
B.c17()
if(d.length===0)return
x=A.bS(new B.c2R(d))
self.window.addEventListener("beforeunload",x)
$.caA=new B.c2Q(x)},
c17(){var x=$.caA
if(x!=null)x.$0()
$.caA=null},
c2R:function c2R(d){this.a=d},
c2Q:function c2Q(d){this.a=d},
a6i(d){var x,w,v,u,t=new B.ayb(),s=J.M(d),r=s.h(d,"id")
r=J.n(r==null?"":r)
x=s.h(d,"conversation_id")
J.n(x==null?"":x)
x=s.h(d,"appelant_id")
x=J.n(x==null?"":x)
w=s.h(d,"appelant_nom")
w=J.n(w==null?"":w)
A.al(s.h(d,"appele_id"))
A.al(s.h(d,"appele_nom"))
v=s.h(d,"type")
v=J.n(v==null?"audio":v)
u=s.h(d,"statut")
u=J.n(u==null?"sonne":u)
t.$1(s.h(d,"cree_le"))
t.$1(s.h(d,"repondu_le"))
return new B.aya(r,x,w,v,u)},
c95(d){var x,w,v,u=J.M(d),t=u.h(d,"contenu"),s=u.h(d,"id")
s=J.n(s==null?"":s)
x=u.h(d,"appel_id")
J.n(x==null?"":x)
x=u.h(d,"emetteur_id")
x=J.n(x==null?"":x)
w=u.h(d,"type")
w=J.n(w==null?"":w)
if(y.P.b(t))v=t
else v=y.f.b(t)?J.mz(t,y.N,y.z):C.c0
if(u.h(d,"cree_le")!=null)A.c0(J.n(u.h(d,"cree_le")))
return new B.L8(s,x,w,v)},
cx5(d){var x,w,v,u,t,s,r=J.M(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return D.XU
x=A.a([],y.t)
for(r=J.at(q),w=y.f,v=y.P,u=y.N,t=y.z;r.C();){s=r.gJ(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.mz(s,u,t))}return new B.a7V(x)},
c2M(d){var x=C.c.ac(d.a,1e6)
return C.d.b3(C.c.k(C.c.ac(x,60)),2,"0")+":"+C.d.b3(C.c.k(C.c.a4(x,60)),2,"0")},
cos(d){var x=J.M(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.q5(v)
if(!x.n(v,"offer")&&!x.n(v,"answer"))return null
return new A.aoW(w,v)},
cNF(d){var x,w,v=J.M(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.aoZ(u,A.hY(w)?w:null,v)},
aya:function aya(d,e,f,g,h){var _=this
_.a=d
_.c=e
_.d=f
_.r=g
_.w=h},
ayb:function ayb(){},
L8:function L8(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a7V:function a7V(d){this.a=d},
cfG(d,e,f,g,h,i,j){return new B.qB(f,g,j,i,e,d,null)},
c7n(d,e,f,g,h,i,j,k,l){return new B.qA(f,l,h,k,d,i,j,e,g,null)},
cku(d,e,f,g,h,i,j,k,l,m,n){return new B.ajf(g,f,e,i,h,d,m,l,k,j,n,null)},
qB:function qB(d,e,f,g,h,i,j){var _=this
_.c=d
_.d=e
_.e=f
_.r=g
_.w=h
_.y=i
_.a=j},
ZQ:function ZQ(){var _=this
_.d=!0
_.f=_.e=!1
_.x=_.w=_.r=null
_.y=$
_.Q=_.z=!1
_.c=_.a=null},
bqx:function bqx(d){this.a=d},
bqy:function bqy(d){this.a=d},
bqu:function bqu(d){this.a=d},
bqv:function bqv(d){this.a=d},
bqr:function bqr(d){this.a=d},
bqs:function bqs(d){this.a=d},
bqt:function bqt(d){this.a=d},
bqo:function bqo(d){this.a=d},
bqp:function bqp(d){this.a=d},
bqq:function bqq(d){this.a=d},
bqw:function bqw(d){this.a=d},
Yn:function Yn(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
qA:function qA(d,e,f,g,h,i,j,k,l,m){var _=this
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
ZP:function ZP(d,e){var _=this
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
bq9:function bq9(d){this.a=d},
bqa:function bqa(d){this.a=d},
bq8:function bq8(d){this.a=d},
bqb:function bqb(d){this.a=d},
bqc:function bqc(){},
bqd:function bqd(d){this.a=d},
bq7:function bq7(d,e){this.a=d
this.b=e},
bqe:function bqe(){},
bqf:function bqf(d){this.a=d},
bpW:function bpW(d){this.a=d},
bpX:function bpX(d){this.a=d},
bpY:function bpY(d){this.a=d},
bpZ:function bpZ(d){this.a=d},
bpV:function bpV(d){this.a=d},
bq_:function bq_(d){this.a=d},
bq0:function bq0(d){this.a=d},
bq1:function bq1(d){this.a=d},
bpU:function bpU(d,e){this.a=d
this.b=e},
bq2:function bq2(){},
bq3:function bq3(d){this.a=d},
bqh:function bqh(d){this.a=d},
bqi:function bqi(d){this.a=d},
bqj:function bqj(d){this.a=d},
bqk:function bqk(d){this.a=d},
bql:function bql(d){this.a=d},
bqm:function bqm(d){this.a=d},
bq4:function bq4(d,e){this.a=d
this.b=e},
bq5:function bq5(d){this.a=d},
bq6:function bq6(d){this.a=d},
bqg:function bqg(){},
bpT:function bpT(d,e){this.a=d
this.b=e},
bpS:function bpS(d,e){this.a=d
this.b=e},
bpR:function bpR(d,e){this.a=d
this.b=e},
bqn:function bqn(d){this.a=d},
ajf:function ajf(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
Yo:function Yo(d,e){this.c=d
this.a=e},
zD:function zD(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
b19:function b19(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.z=_.y=_.x=!1},
b1a:function b1a(d){this.a=d},
b1b:function b1b(d){this.a=d},
b1c:function b1c(d){this.a=d},
a7G:function a7G(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.x=null},
aBS:function aBS(d){this.a=d},
aBT:function aBT(d){this.a=d},
av1(d){var x=y.U,w=A.I(new A.X(A.a(d.split(" "),y.s),new B.c3P(),x),!0,x.i("w.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.m(C.b.gS(w),0).toUpperCase()
return(J.m(C.b.gS(w),0)+J.m(C.b.gaW(w),0)).toUpperCase()},
c3P:function c3P(){},
aby:function aby(){this.a=null},
aWT:function aWT(){},
uc:function uc(d,e){this.e=d
this.b=e},
aRK:function aRK(d){this.a=d},
aRL:function aRL(d){this.a=d},
c8a(d){var x=new B.ac0(d)
x.aEW(d)
return x},
ac0:function ac0(d){this.d=d},
aRH:function aRH(d){this.a=d},
aRI:function aRI(d){this.a=d},
aRJ:function aRJ(d){this.a=d},
aRt:function aRt(){},
aRv:function aRv(){},
aRw:function aRw(){},
aRx:function aRx(d){this.a=d},
aRu:function aRu(d){this.a=d},
cDb(d,e){var x=y.N
x=new B.adU(d,e,A.D(x,y.E),A.D(x,y.z))
x.aF4(d,e)
return x},
adU:function adU(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aWV:function aWV(d){this.a=d},
aWW:function aWW(d){this.a=d},
aWX:function aWX(d){this.a=d},
aWY:function aWY(d){this.a=d},
aWZ:function aWZ(d){this.a=d},
aX_:function aX_(d){this.a=d},
aX0:function aX0(d){this.a=d},
aX1:function aX1(d){this.a=d},
aWU:function aWU(d){this.a=d},
adV:function adV(){},
c8S:function c8S(d){this.a=d},
cQ0(){return C.b.nz(A.a(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.c3Y())!==-1},
c3Y:function c3Y(){},
cin(){var x=A.a([],y.d),w=$.cio
$.cio=w+1
return new B.UC(w,x,D.au1,$.ai())},
UC:function UC(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.db$=0
_.dx$=g
_.fr$=_.dy$=0},
aX7:function aX7(d){this.a=d},
aX3:function aX3(d){this.a=d},
aX4:function aX4(d){this.a=d},
aX5:function aX5(d){this.a=d},
aX6:function aX6(){},
c8T(d,e,f){return new B.UE(d,f,e,null)},
UE:function UE(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
UF:function UF(){this.c=this.a=null},
aX8:function aX8(){},
aXa:function aXa(d){this.a=d},
aX9:function aX9(d){this.a=d},
cgj(d,e,f,g){var x,w={}
w.a=d
x=new B.aaa(g.i("aaa<0>"))
x.aED(e,f,w,g)
return x},
aaa:function aaa(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
aKu:function aKu(d,e){this.a=d
this.b=e},
aKt:function aKt(d){this.a=d},
a_J:function a_J(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bvw:function bvw(){},
agd:function agd(d){this.b=this.a=$
this.$ti=d},
age:function age(){},
c6K(d,e){return B.cwh(d,e)},
cwh(d,e){var x=0,w=A.k(y.b),v,u,t,s,r,q,p
var $async$c6K=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:if(!d.pJ("ws")&&!d.pJ("wss"))throw A.o(A.fG(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.k(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.B1(r,A.fW(null,null,null,!1,y.D))
u=new A.aB($.aI,y.u)
p=new A.b9(u,y.V)
if(J.t(r.readyState,1))p.cD(0,q)
else if(J.t(r.readyState,2)||J.t(r.readyState,3))p.hs(new B.M7("Unexpected WebSocket state: "+A.u(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.pW(r,"open",!1,y.C).gS(0).aI(new B.aAp(p,q),y.H)
t=y.C
s=y.H
new A.pW(r,"error",!1,t).gS(0).aI(new B.aAq(p,q),s)
A.iD(r,"message",new B.aAr(q),!1,y.m)
new A.pW(r,"close",!1,t).gS(0).aI(new B.aAs(p,q),s)
v=u
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$c6K,w)},
B1:function B1(d,e){this.a=d
this.b=e},
aAp:function aAp(d,e){this.a=d
this.b=e},
aAq:function aAq(d,e){this.a=d
this.b=e},
aAr:function aAr(d){this.a=d},
aAs:function aAs(d,e){this.a=d
this.b=e},
c9B(){return new B.M6("Connection Closed")},
v4:function v4(){},
Lz:function Lz(d){this.a=d},
GS:function GS(d){this.a=d},
Hi:function Hi(d,e){this.a=d
this.b=e},
M7:function M7(d){this.a=d},
M6:function M6(d){this.a=d},
cvK(d){var x=null,w=$.aI,v=new B.agd(y.Z),u=y.X,t=A.fW(x,x,x,!0,u),s=A.fW(x,x,x,!0,u),r=A.y(s),q=A.y(t)
v.a=B.cgj(new A.cI(s,r.i("cI<1>")),new A.G5(t,q.i("G5<1>")),!0,u)
v.b=B.cgj(new A.cI(t,q.i("cI<1>")),new A.G5(s,r.i("G5<1>")),!1,u)
v=new B.awe(new A.b9(new A.aB(w,y.W),y.R),v)
v.aEm(d)
return v},
awe:function awe(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
awi:function awi(d){this.a=d},
awf:function awf(d){this.a=d},
awg:function awg(d){this.a=d},
awh:function awh(d,e){this.a=d
this.b=e},
awj:function awj(d){this.a=d},
asP:function asP(d,e){this.b=d
this.a=e},
ahz:function ahz(d){this.a=d},
cPA(d){switch(d){case"new":return D.atP
case"checking":return D.atQ
case"connected":return D.atS
case"completed":return D.atR
case"failed":return D.ND
case"disconnected":return D.atU
case"closed":return D.NE
case"count":return D.atT}return D.NE},
cPB(d){switch(d){case"new":return D.NF
case"gathering":return D.atV
case"complete":return D.atW}return D.NF},
cRI(d){switch(d){case"stable":return D.atX
case"have-local-offer":return D.atY
case"have-local-pranswer":return D.au_
case"have-remote-offer":return D.atZ
case"have-remote-pranswer":return D.au0
case"closed":return D.NL}return D.NL},
cQT(d){switch(d){case"new":return D.NI
case"connecting":return D.NJ
case"connected":return D.NK
case"closed":return D.uy
case"disconnected":return D.NH
case"failed":return D.NG}return D.uy},
yH:function yH(d,e){this.a=d
this.b=e},
Uy:function Uy(d,e){this.a=d
this.b=e},
yG:function yG(d,e){this.a=d
this.b=e},
o9:function o9(d,e){this.a=d
this.b=e},
adW:function adW(d,e){this.a=d
this.b=e},
aWS:function aWS(){},
T3:function T3(){},
Jq:function Jq(){},
aRs:function aRs(){},
Kg:function Kg(d,e,f){this.a=d
this.b=e
this.c=f},
Uz:function Uz(){},
UA:function UA(){},
aX2:function aX2(){},
E9:function E9(d,e){this.a=d
this.b=e},
UB:function UB(d){this.b=d},
UD:function UD(d,e,f){this.a=d
this.b=e
this.c=f},
c7N(d){var x=0,w=A.k(y.y)
var $async$c7N=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.o("The is not a video track => "+d.k(0))
throw A.o("You need to specify the deviceId")
return A.i(null,w)}})
return A.j($async$c7N,w)},
aco(d){var x=0,w=A.k(y.H),v
var $async$aco=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.e(B.b6H("enableSpeakerphone",A.a4(["enable",d],y.N,v),v,v),$async$aco)
case 2:return A.i(null,w)}})
return A.j($async$aco,w)},
aTK(d,e){var x=0,w=A.k(y.H),v,u,t
var $async$aTK=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:t=e.d
x=t.kind==="audio"?3:4
break
case 3:u=J.mz(y.f.a(A.c2A(t.getConstraints())),y.N,y.z)
u.j(0,"volume",d)
x=5
return A.e(e.TO(0,u),$async$aTK)
case 5:case 4:v=A.cW(null,y.H)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$aTK,w)},
b6H(d,e,f,g){return B.cGK(d,e,f,g,f.i("0?"))},
cGK(d,e,f,g,h){var x=0,w=A.k(h),v
var $async$b6H=A.f(function(i,j){if(i===1)return A.h(j,w)
while(true)switch(x){case 0:x=3
return A.e(B.b6G(),$async$b6H)
case 3:v=D.J7.cl(d,e,!1,f)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$b6H,w)},
b6G(){var x=0,w=A.k(y.H),v,u
var $async$b6G=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:x=!$.ckf?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.e(D.J7.cl("initialize",A.a4(["options",A.D(v,u)],v,u),!1,y.H),$async$b6G)
case 4:$.ckf=!0
case 3:return A.i(null,w)}})
return A.j($async$b6G,w)}},D,E
J=c[1]
A=c[0]
C=c[2]
B=a.updateHolder(c[3],B)
D=c[28]
E=c[18]
B.HS.prototype={
E(d,e){this.a.E(0,e)},
dv(d,e){this.a.dv(d,e)},
a7(d){return this.a.a7(0)},
$ie2:1}
B.Wb.prototype={
hB(d){var x=A.cw("subscription"),w=A.fW(new B.b1L(x),null,null,!0,this.$ti.y[1])
x.b=d.fC(new B.b1M(this,w),w.gnt(w),w.gpi())
return new A.cI(w,A.y(w).i("cI<1>"))}}
B.aya.prototype={}
B.L8.prototype={}
B.a7V.prototype={}
B.qB.prototype={
P(){return new B.ZQ()}}
B.ZQ.prototype={
T(){var x,w,v=this
v.X()
x=v.a
x.toString
v.z=!0
w=new B.aby()
v.y!==$&&A.aJ()
v.y=w
if(!x.y)w.tR(A.Be(C.kU,$.vE().a).c)
v.P3()
v.r=A.du(C.c5,new B.bqx(v))
v.w=A.hj(C.zE,new B.bqy(v))},
m(){var x=this,w=x.r
if(w!=null)w.Y(0)
w=x.w
if(w!=null)w.Y(0)
w=x.x
if(w!=null)w.Y(0)
w=x.y
w===$&&A.d()
w.ik()
if(x.z)w.hh()
x.a5()},
a2z(){var x=this.x
if(x!=null)x.Y(0)
this.x=A.du(C.fI,new B.bqu(this))},
Tj(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Tj=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.e||s.f){x=1
break}u=4
p=s.a
p.toString
o=$.a1()
x=7
return A.e(o.DQ(p.c),$async$Tj)
case 7:r=e
q=B.a6i(r)
if(s.c==null||s.e){x=1
break}if(q.w!=="sonne"){s.l(new B.bqv(s))
p=s.r
if(p!=null)p.Y(0)
p=s.w
if(p!=null)p.Y(0)
p=s.y
p===$&&A.d()
p.ik()
s.a2z()}u=2
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
return A.j($async$Tj,w)},
P3(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$P3=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
o=s.a
o.toString
n=$.a1()
x=7
return A.e(n.DQ(o.c),$async$P3)
case 7:r=e
q=B.a6i(r)
if(s.c==null){x=1
break}m=s.a.r
if(m==null)m=n.gzQ()
p=m
if(q.w!=="sonne"||q.c===p){s.l(new B.bqr(s))
o=s.y
o===$&&A.d()
o.ik()
s.a2z()
x=1
break}s.l(new B.bqs(s))
if(s.a.y)s.Ge()
u=2
x=6
break
case 4:u=3
k=t
if(s.c==null){x=1
break}s.l(new B.bqt(s))
o=s.y
o===$&&A.d()
o.ik()
s.a2z()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$P3,w)},
Ge(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$Ge=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.f||s.e){x=1
break}s.Q=!0
s.l(new B.bqo(s))
u=4
q=s.a
q.toString
p=$.a1()
x=7
return A.e(p.KX(q.c,"accepte"),$async$Ge)
case 7:u=2
x=6
break
case 4:u=3
n=t
r=A.N(n)
if(s.c==null){x=1
break}s.l(new B.bqp(s))
q=s.c
q.toString
p=J.n(r)
q.t(y.q).f.B(A.z(null,null,null,null,null,C.h,null,A.c(p,null,null,null,null,null,null,null,null),null,C.k,null,null,null,null,null,null,null,null,null))
x=1
break
x=6
break
case 3:x=2
break
case 6:if(s.c==null){x=1
break}q=s.r
if(q!=null)q.Y(0)
q=s.w
if(q!=null)q.Y(0)
q=s.y
q===$&&A.d()
q.ik()
q=s.c
q.toString
A.a5(q,!1).A3(A.e8(new B.bqq(s),null,y.z))
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Ge,w)},
II(d){return this.b2D(d)},
b2C(){return this.II(!1)},
b2D(d){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$II=A.f(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:if(s.f){x=1
break}s.f=!0
r=s.r
if(r!=null)r.Y(0)
r=s.w
if(r!=null)r.Y(0)
r=s.y
r===$&&A.d()
r.ik()
u=4
r=s.a
r.toString
q=$.a1()
x=7
return A.e(q.KX(r.c,"refuse"),$async$II)
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
if(r!=null)A.a5(r,!1).bO()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$II,w)},
D(d){var x,w,v,u,t=this,s=null,r=t.a,q=r.e
r=A.jB(C.r,s,A.c(B.av1(r.d),s,s,s,s,D.Q2,s,s,s),s,56)
x=t.a.d
x=A.c(x.length===0?A.b("Un membre"):x,s,s,s,s,D.Q_,C.X,s,s)
if(t.d)q=A.b("Connexion\u2026")
else if(t.e)q=A.b("Appel termin\xe9")
else q=q==="video"?A.b("Appel vid\xe9o entrant"):A.b("Appel entrant")
w=y.p
q=A.a([r,C.aw,new A.Y(D.zY,x,s),C.l,A.c(q,s,s,s,s,D.vR,s,s,s),D.Pi],w)
if(!t.d&&!t.e){r=A.b("Refuser")
x=t.f?s:new B.bqw(t)
v=A.b("Accepter")
u=t.f?s:t.gaFO()
q.push(A.U(A.a([new B.Yn(D.AK,C.aF,r,x,s),D.axv,new B.Yn(C.nn,C.cQ,v,u,s)],w),C.n,C.bw,C.i,s))}if(t.d)q.push(C.yi)
return A.ef(s,C.o,A.fy(!0,A.cF(A.J(q,C.n,C.f,C.T),s,s),!0,C.a1,!0,!0),s,s,s)}}
B.Yn.prototype={
D(d){var x=this,w=null,v=A.di(x.d,w,w,C.a1,C.cC,w)
return A.J(A.a([A.ad(A.b8(!1,A.c_(x.c,C.m,w,32),C.j,w,C.q,w,w,w,w,x.f,w,v),72,72),C.l,A.c(x.e,w,w,w,w,C.eh,w,w,w)],y.p),C.n,C.f,C.T)}}
B.qA.prototype={
P(){return new B.ZP(A.b4(y.N),C.S)}}
B.ZP.prototype={
T(){var x,w,v,u,t,s,r,q,p,o=this,n=null
o.X()
x=o.a
o.r=x.c
x=x.w
if(x==null)x=new B.b19(B.cin(),B.cin())
o.d!==$&&A.aJ()
o.d=x
w=o.a
v=w.x
if(v==null)v=new B.a7G(new A.dQ(n,n,y.g),new A.dQ(n,n,y.n))
o.e!==$&&A.aJ()
o.e=v
o.fr=!0
u=new B.aby()
o.dy!==$&&A.aJ()
o.dy=u
t=w.w
if(t!=null){s=$.kL()
r=s.a
q=r.length!==0&&s.z===t&&r===w.c&&s.w}else q=!1
t=$.kL()
s=o.r
r=w.e
p=w.d
t.beP(s,r,x,v,w.f,p)
x=o.a
if(x.Q)t.as=!0
if(q){o.So()
return}if(x.f)u.tR("assets/audio/tonalite-appel.wav")
o.rO()},
m(){var x=this,w=x.CW
if(w!=null)w.Y(0)
w=x.cx
if(w!=null)w.Y(0)
w=x.cy
if(w!=null)w.Y(0)
w=x.db
if(w!=null)w.Y(0)
w=x.dx
if(w!=null)w.Y(0)
w=x.dy
w===$&&A.d()
w.ik()
if(x.fr)w.hh()
w=$.kL()
if(!(w.r&&w.a===x.r&&!x.y)){B.c17()
w=x.d
w===$&&A.d()
w.hh()
w=x.e
w===$&&A.d()
w.KG()}x.a5()},
So(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$So=A.f(function(d,e){if(d===1){t=e
x=u}while(true)$async$outer:switch(x){case 0:s.a.toString
o=$.a1()
s.w=o.gzQ()
n=$.kL()
s.Q=n.x
s.as=n.y
s.x=n.e
n=n.f
s.ay=n
if(n!=null){n=Date.now()
m=s.ay
m.toString
s.ch=new A.ax(n,0,!1).eo(m)}B.cnH(s.r)
u=4
s.a.toString
x=7
return A.e(o.bU("/messagerie/appels/"+s.r+"/signaux"),$async$So)
case 7:r=e
for(o=J.at(r),n=s.f;o.C();){q=o.gJ(o)
p=B.c95(q)
n.E(0,p.a)
if(p.d==="termine"||p.d==="refuse"||p.d==="annule"){s.mu(A.b("Appel termin\xe9"))
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
n.f=new B.bq9(s)
n.r=new B.bqa(s)
n.w=new B.bqb(s)
s.z=!0
if(o)s.l(new B.bqc())
s.cy=A.hj(C.ch,new B.bqd(s))
o=s.e
o===$&&A.d()
n=o.r
s.db=new A.c1(n,A.y(n).i("c1<1>")).cK(s.gamF())
o=o.w
s.dx=new A.c1(o,A.y(o).i("c1<1>")).cK(new B.bqe())
s.CW=A.hj(C.fI,new B.bqf(s))
s.xU()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$So,w)},
rO(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0
var $async$rO=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:s.cx=A.du(C.c5,new B.bpW(s))
r="appel"
u=4
q=null
h=s.a
g=h.y
x=g!=null?7:9
break
case 7:x=10
return A.e(g,$async$rO)
case 10:q=a2
h=s.r=B.a6i(q).a
x=8
break
case 9:g=$.a1()
x=11
return A.e(g.DQ(h.c),$async$rO)
case 11:q=a2
h=s.r=s.a.c
case 8:g=$.kL()
g.beB(h)
B.cnH(s.r)
if(s.a.f)g.UI()
p=B.a6i(q)
if(s.c==null){x=1
break}h=p.w
if(h==="termine"||h==="expire"){s.mu(A.b("Appel termin\xe9"))
x=1
break}s.a.toString
h=$.a1()
s.w=h.gzQ()
r="ice"
s.a.toString
o=h.Vf()
n=s.Ir()
x=12
return A.e(o,$async$rO)
case 12:m=a2
l=B.cx5(m)
x=15
return A.e(n,$async$rO)
case 15:x=!a2?13:14
break
case 13:if(s.c==null){x=1
break}s.l(new B.bpX(s))
x=16
return A.e(A.kk(C.ks,null,y.z),$async$rO)
case 16:if(s.c==null){x=1
break}s.mu(null)
x=1
break
case 14:r="webrtc"
f=s.d
f===$&&A.d()
e=s.a.d
x=17
return A.e(f.A1(A.a4(["iceServers",l.a],y.N,y.z),e==="video"),$async$rO)
case 17:f.f=new B.bpY(s)
f.r=new B.bpZ(s)
f.w=new B.bq_(s)
if(s.c==null){x=1
break}s.l(new B.bq0(s))
g.bkA()
s.cy=A.hj(C.ch,new B.bq1(s))
g=s.e
g===$&&A.d()
f=g.r
s.db=new A.c1(f,A.y(f).i("c1<1>")).cK(s.gamF())
f=g.w
s.dx=new A.c1(f,A.y(f).i("c1<1>")).cK(new B.bq2())
s.a.toString
k=h.b
if(k!=null&&J.a6(k)!==0){s.a.toString
g.Uf(C.d.XM("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws?jeton="+A.eo(C.bN,k,C.a9,!0))}s.CW=A.hj(C.fI,new B.bq3(s))
s.xU()
u=2
x=6
break
case 4:u=3
a0=t
j=A.N(a0)
i=A.bn(a0)
if(s.c==null){x=1
break}A.rZ().$1("Appel : \xe9chec \xe0 l\u2019\xe9tape "+A.u(r)+" : "+A.u(j)+"\n"+A.u(i))
h=s.c
h.toString
g=j instanceof A.dp?j.a:s.aXV(r)
h.t(y.q).f.B(A.z(null,null,null,null,null,C.h,null,A.c(g,null,null,null,null,null,null,null,null),null,C.k,null,null,null,null,null,null,null,null,null))
s.mu(null)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$rO,w)},
aXV(d){if(d==="ice")return A.b("Configuration d\u2019appel indisponible. V\xe9rifie ta connexion, puis r\xe9essaie.")
if(d==="webrtc")return A.b("Ce navigateur ne peut pas d\xe9marrer l\u2019appel. Essaie depuis l\u2019application.")
return A.b("Appel introuvable ou d\xe9j\xe0 termin\xe9.")},
Ir(){var x=0,w=A.k(y.y),v,u=2,t,s=this,r,q,p
var $async$Ir=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
x=7
return A.e(s.a_c(),$async$Ir)
case 7:if(!e){v=!1
x=1
break}r=s.d
r===$&&A.d()
x=8
return A.e(r.Ez(s.a.d==="video"),$async$Ir)
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
return A.j($async$Ir,w)},
a_c(){var x=0,w=A.k(y.y),v
var $async$a_c=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v=!0
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a_c,w)},
xU(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$xU=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.y){x=1
break}u=4
s.a.toString
p=$.a1()
x=7
return A.e(p.bU("/messagerie/appels/"+s.r+"/signaux"),$async$xU)
case 7:r=e
for(p=J.at(r);p.C();){q=p.gJ(p)
s.amG(B.c95(q))}u=2
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
return A.j($async$xU,w)},
amG(d){var x,w,v,u,t,s=this
if(s.c==null||s.y)return
x=s.f
w=d.a
if(x.q(0,w))return
x.E(0,w)
x=s.w
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(s.a.f)return
v=B.cos(d.e)
if(v==null)return
x=s.d
x===$&&A.d()
x.Dk(A.a4(["sdp",v.a,"type",v.b],y.N,y.z)).aI(new B.bqh(s),y.a).fw(new B.bqi(s))
break
case"reponse":if(!s.a.f)return
u=B.cos(d.e)
if(u==null)return
x=s.d
x===$&&A.d()
x.TN(A.a4(["sdp",u.a,"type",u.b],y.N,y.z)).aI(new B.bqj(s),y.a).fw(new B.bqk(s))
break
case"candidat_ice":t=B.cNF(d.e)
if(t==null)return
x=s.d
x===$&&A.d()
x.TI(A.a4(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],y.N,y.z))
break
case"accepte":if(!s.a.f||s.x)return
x=s.d
x===$&&A.d()
x.Kz().aI(new B.bql(s),y.a).fw(new B.bqm(s))
break
case"refuse":s.mu(A.b("Appel refus\xe9"))
break
case"annule":s.mu(A.b("Appel annul\xe9"))
break
case"termine":s.mu(A.b("Appel termin\xe9"))
break}},
RX(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$RX=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:if(u.x){x=1
break}t=u.cx
if(t!=null)t.Y(0)
t=u.dy
t===$&&A.d()
t.ik()
u.l(new B.bq4(u,!1))
t=$.kL()
t.bmr()
s=u.Q
t.a7B(u.as,s)
case 1:return A.i(v,w)}})
return A.j($async$RX,w)},
xN(d,e,f){return this.aOu(d,e,f)},
aft(d,e){return this.xN(d,e,!0)},
aOu(d,e,f){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$xN=A.f(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
t.a.toString
s=$.a1()
x=6
return A.e(s.aqH(t.r,e,d),$async$xN)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(f&&t.c!=null&&!t.y)t.mu(A.b("L\u2019appel n\u2019a pas pu aboutir."))
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$xN,w)},
IC(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$IC=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
r=s.cx
if(r!=null)r.Y(0)
r=s.dy
r===$&&A.d()
r.ik()
u=4
r=s.r
x=r.length!==0?7:8
break
case 7:s.a.toString
q=$.a1()
x=9
return A.e(q.KX(r,"termine"),$async$IC)
case 9:case 8:u=2
x=6
break
case 4:u=3
o=t
x=6
break
case 3:x=2
break
case 6:B.c17()
$.kL().MY()
r=s.c
if(r!=null)A.a5(r,!1).bO()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$IC,w)},
b2w(){var x=this
if(!x.x||x.y)return
$.kL().bnK()
x.l(new B.bq5(x))
$.aM.aF$.push(new B.bq6(x))},
mu(d){var x,w,v=this,u=null
if(v.y)return
v.y=!0
x=v.cx
if(x!=null)x.Y(0)
x=v.dy
x===$&&A.d()
x.ik()
x=v.r
if(x.length!==0){v.a.toString
w=$.a1()
w.KX(x,"termine").fw(new B.bqg())}if(d!=null&&v.c!=null)v.c.t(y.q).f.B(A.z(u,u,u,u,u,C.h,u,A.c(d,u,u,u,u,u,u,u,u),u,C.k,u,u,u,u,u,u,u,u,u))
B.c17()
$.kL().MY()
x=v.c
if(x!=null)A.a5(x,!1).bO()},
Pe(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Pe=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.d()
x=2
return A.e(t.Z4(u),$async$Pe)
case 2:if(v.c!=null)v.l(new B.bpT(v,u))
$.kL().a7B(v.as,u)
return A.i(null,w)}})
return A.j($async$Pe,w)},
Pd(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Pd=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v.at=!1
u=!v.as
t=v.d
t===$&&A.d()
x=2
return A.e(t.FO(u),$async$Pd)
case 2:if(v.c!=null)v.l(new B.bpS(v,u))
$.kL().a7B(u,v.Q)
return A.i(null,w)}})
return A.j($async$Pd,w)},
Pa(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Pa=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.ax
t=v.d
t===$&&A.d()
x=2
return A.e(t.Z1(u),$async$Pa)
case 2:if(v.c!=null)v.l(new B.bpR(v,u))
return A.i(null,w)}})
return A.j($async$Pa,w)},
Pb(){var x=0,w=A.k(y.H),v=this,u
var $async$Pb=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=v.d
u===$&&A.d()
x=2
return A.e(u.TU(),$async$Pb)
case 2:return A.i(null,w)}})
return A.j($async$Pb,w)},
D(d){var x,w,v,u,t,s,r,q,p,o=this,n=null,m="Appel en cours\u2026",l="\xc7a sonne\u2026",k="Connexion\u2026",j=o.d
j===$&&A.d()
x=j.c
w=o.go
v=o.a
if(v.d==="video"&&o.z){if(x!=null)x=B.c8T(j.e,!1,D.NM)
else{x=A.jB(C.r,n,A.c(B.av1(v.e),n,n,n,n,D.aAQ,n,n,n),n,48)
v=o.a
u=A.c(v.e,n,n,n,n,D.aAD,n,n,n)
if(o.x)v=A.b(m)+" "+B.c2M(o.ch)
else v=v.f&&o.z?A.b(l):A.b(k)
v=A.cF(A.J(A.a([x,C.p,u,C.l,A.c(v,n,n,n,n,D.vR,n,n,n)],y.p),C.n,C.f,C.T),n,n)
x=v}j=A.a([A.E1(0,x),A.fd(n,A.eV(A.P(12),B.c8T(j.d,!0,D.NM),C.ap),160,n,n,16,16,110)],y.p)
if(o.x)j.push(A.fd(n,new B.Yo(o.gak1(),n),n,n,16,n,16,n))
x=o.x
v=B.c2M(o.ch)
u=o.Q
t=o.as
j.push(A.fd(24,B.cku(o.ax,v,x,!0,t,u,o.gacJ(),o.gacI(),o.gacK(),o.gacL(),o.gajH()),n,n,0,0,n,n))
j=A.et(C.aR,j,C.h,C.aU,n)}else{x=y.p
v=A.a([],x)
if(o.fy)v.push(A.fd(n,A.ug(B.c8T(j.e,!1,D.uz),0),1,n,0,n,0,1))
if(o.x)v.push(A.fd(n,new B.Yo(o.gak1(),n),n,n,16,n,16,n))
j=A.jB(C.r,n,A.c(B.av1(o.a.e),n,n,n,n,D.Q2,n,n,n),n,56)
u=o.a
t=A.c(u.e,n,n,n,n,D.Q_,C.X,n,n)
s=o.fx
if(s==null)if(o.x)u=A.b(m)+" "+B.c2M(o.ch)
else if(o.z)u=u.f?A.b(l):A.b(m)
else u=A.b(k)
else u=s
u=A.c(u,n,n,n,n,D.vR,C.X,n,n)
s=o.x
r=B.c2M(o.ch)
q=o.Q
p=o.as
v.push(A.cF(A.J(A.a([j,C.aw,new A.Y(D.zY,t,n),C.l,u,D.Pi,B.cku(o.ax,r,s,!1,p,q,o.gacJ(),o.gacI(),o.gacK(),o.gacL(),o.gajH())],x),C.n,C.f,C.T),n,n))
v=A.et(C.aR,v,C.h,C.aU,n)
j=v}return A.c8C(w,A.ef(n,C.o,A.fy(!0,j,!0,C.a1,!0,!0),n,n,n),new B.bqn(o),y.K)}}
B.ajf.prototype={
D(d){var x,w,v=this,u=null,t=y.p,s=A.a([],t),r=v.d
if(r&&v.c)s.push(A.c(v.e,u,u,u,u,E.Qa,u,u,u))
if(r&&v.c)s.push(C.p)
r=v.f
x=r?D.a2U:D.a2T
t=A.a([new B.zD(x,r,A.b("Muet"),v.x,u,u),D.oS,new B.zD(D.a3_,v.r,A.b("Haut-parleur"),v.y,u,u)],t)
r=v.c
if(r)t.push(D.oS)
if(r){x=v.w
w=x?D.AQ:D.a2Z
t.push(new B.zD(w,!x,A.b("Cam\xe9ra"),v.z,u,u))}if(r)t.push(D.oS)
if(r)t.push(new B.zD(D.a2Y,!1,A.b("Basculer"),v.Q,u,u))
t.push(D.oS)
t.push(new B.zD(D.AK,!1,A.b("Raccrocher"),v.as,C.aF,u))
s.push(A.U(t,C.n,C.bw,C.i,u))
return A.J(s,C.n,C.f,C.T)}}
B.Yo.prototype={
D(d){var x=null
return A.J(A.a([A.ad(A.b8(!1,D.a4T,C.j,x,C.q,x,x,x,x,this.c,x,A.di(C.kk,x,x,C.a1,C.cC,x)),48,48),C.I,A.c(A.b("R\xe9duire"),x,x,x,x,C.vU,x,x,x)],y.p),C.n,C.f,C.T)}}
B.zD.prototype={
D(d){var x,w=this,v=null,u=w.r,t=u==null
if(t)u=w.d?C.m:C.kk
if(!t)x=C.m
else x=w.d?C.o:C.m
t=A.di(u,v,v,C.a1,C.cC,v)
return A.J(A.a([A.ad(A.b8(!1,A.c_(w.c,x,v,26),C.j,v,C.q,v,v,v,v,w.f,v,t),56,56),C.aT,A.c(w.e,v,v,v,v,C.vU,v,v,v)],y.p),C.n,C.f,C.T)}}
B.b19.prototype={
Ez(d){return this.bmg(d)},
bmg(d){var x=0,w=A.k(y.H),v,u=this,t,s,r,q
var $async$Ez=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(u.b!=null){x=1
break}t=u.d
x=3
return A.e(t.jq(0),$async$Ez)
case 3:$.cc8()
s=y.N
r=A.a4(["echoCancellation",!0,"noiseSuppression",!0,"autoGainControl",!0],s,y.y)
x=4
return A.e(new B.aRt().FB(0,A.a4(["audio",r,"video",d&&A.a4(["facingMode","user"],s,s)],s,y.z)),$async$Ez)
case 4:q=f
u.b=q
t.saaH(0,q)
case 1:return A.i(v,w)}})
return A.j($async$Ez,w)},
A1(d,e){return this.bn1(d,e)},
bn1(d,e){var x=0,w=A.k(y.H),v=this,u,t,s,r,q
var $async$A1=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:x=2
return A.e(v.e.jq(0),$async$A1)
case 2:x=v.b==null?3:4
break
case 3:x=5
return A.e(v.Ez(e),$async$A1)
case 5:case 4:u=v.b
u.toString
x=6
return A.e($.cc8().a5z(d,A.D(y.N,y.z)),$async$A1)
case 6:t=v.a=g
s=u.a9T(0),r=s.length,q=0
case 7:if(!(q<s.length)){x=9
break}x=10
return A.e(t.a4q(0,s[q],u),$async$A1)
case 10:case 8:s.length===r||(0,A.Q)(s),++q
x=7
break
case 9:t.e=new B.b1a(v)
t.Q=new B.b1b(v)
t.d=new B.b1c(v)
return A.i(null,w)}})
return A.j($async$A1,w)},
aMw(d){var x,w=this
w.c=d
if(!w.x){w.x=!0
w.e.saaH(0,d)
w.Gr()
x=w.r
if(x!=null)x.$0()}},
Gr(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o,n,m,l
var $async$Gr=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:n=t.z?0.8:1
m=t.c
m=m==null?null:m.NA(0)
if(m==null)m=C.dt
q=m.length
p=0
case 2:if(!(p<m.length)){x=4
break}s=m[p]
v=6
x=9
return A.e(B.aTK(n,s),$async$Gr)
case 9:v=1
x=8
break
case 6:v=5
l=u
r=A.N(l)
A.rZ().$1("Appel : volume distant impossible : "+A.u(r))
x=8
break
case 5:x=1
break
case 8:case 3:m.length===q||(0,A.Q)(m),++p
x=2
break
case 4:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$Gr,w)},
Kz(){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$Kz=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.o(A.ak("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.Uu(0),$async$Kz)
case 3:t=e
x=4
return A.e(s.FP(0,t),$async$Kz)
case 4:v=A.a4(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Kz,w)},
Dk(d){return this.be3(d)},
be3(d){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$Dk=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.o(A.ak("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.FR(0,new B.E9(d.h(0,"sdp"),d.h(0,"type"))),$async$Dk)
case 3:x=4
return A.e(s.Ur(0),$async$Dk)
case 4:t=f
x=5
return A.e(s.FP(0,t),$async$Dk)
case 5:v=A.a4(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Dk,w)},
TN(d){return this.baU(d)},
baU(d){var x=0,w=A.k(y.H),v=this,u
var $async$TN=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.o(A.ak("Connexion non pr\xe9par\xe9e."))
x=2
return A.e(u.FR(0,new B.E9(d.h(0,"sdp"),d.h(0,"type"))),$async$TN)
case 2:return A.i(null,w)}})
return A.j($async$TN,w)},
TI(d){return this.baF(d)},
baF(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$TI=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.e(t.Tw(new B.Kg(A.al(d.h(0,"candidate")),A.al(d.h(0,"sdpMid")),A.dT(d.h(0,"sdpMLineIndex")))),$async$TI)
case 3:case 1:return A.i(v,w)}})
return A.j($async$TI,w)},
Z4(d){return this.ay3(d)},
ay3(d){var x=0,w=A.k(y.H),v=this,u,t,s,r
var $async$Z4=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.NA(0)
if(r==null)r=C.dt
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.Q)(r),++s)r[s].slG(0,t)
return A.i(null,w)}})
return A.j($async$Z4,w)},
FO(d){return this.axU(d)},
axU(d){var x=0,w=A.k(y.H),v=this
var $async$FO=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.z=d
x=2
return A.e(B.aco(d),$async$FO)
case 2:x=3
return A.e(v.Gr(),$async$FO)
case 3:return A.i(null,w)}})
return A.j($async$FO,w)},
Z1(d){return this.axL(d)},
axL(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$Z1=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.NN(0)
if(s==null)s=C.dt
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.Q)(s),++t)s[t].slG(0,d)
return A.i(null,w)}})
return A.j($async$Z1,w)},
TU(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$TU=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.NN(0)
if(s==null)s=D.ajW
if(s.length===0){x=1
break}x=3
return A.e(B.c7N(C.b.gS(s)),$async$TU)
case 3:case 1:return A.i(v,w)}})
return A.j($async$TU,w)},
hh(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$hh=A.f(function(d,a0){if(d===1){t=a0
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
u=4
x=7
return A.e(B.aco(!1),$async$hh)
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
p=p==null?null:p.a7(0)
x=12
return A.e(y.x.b(p)?p:A.ds(p,y.H),$async$hh)
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
p=p==null?null:p.a9T(0)
if(p==null)p=C.dt
o=p.length
n=y.c
m=y._
l=0
case 13:if(!(l<p.length)){x=15
break}r=p[l]
u=17
k=J.cvE(r)
if(!m.b(k)){j=new A.aB($.aI,n)
j.a=8
j.c=k
k=j}x=20
return A.e(k,$async$hh)
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
return A.e(s.d.m(),$async$hh)
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
return A.e(s.e.m(),$async$hh)
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
return A.j($async$hh,w)}}
B.a7G.prototype={
Uf(d){return this.bck(d)},
bck(d){var x=0,w=A.k(y.H),v=this
var $async$Uf=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.x=d
v.e=!1
v.f=0
x=2
return A.e(v.Gq(),$async$Uf)
case 2:return A.i(null,w)}})
return A.j($async$Uf,w)},
Gq(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$Gq=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.e){x=1
break}r=s.x
if(r==null||J.a6(r)===0){x=1
break}u=4
q=B.cvK(B.c6K(A.cC(r,0,null),null))
s.b=q
x=7
return A.e(q.f.a,$async$Gq)
case 7:s.f=0
p=q.r.b
p===$&&A.d()
p=p.b
p===$&&A.d()
s.c=new A.cI(p,A.y(p).i("cI<1>")).b4(s.gb2j(),!0,s.gb0M(),new B.aBS(s))
u=2
x=6
break
case 4:u=3
n=t
s.a2n()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Gq,w)},
b2k(d){var x,w,v,u
try{x=C.Z.cV(0,J.n(d),null)
v=y.P
if(!v.b(x))return
if(!J.t(J.m(x,"type"),"signal_appel"))return
w=J.m(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.E(0,B.c95(w))}catch(u){}},
a2n(){var x,w=this,v=w.c
if(v!=null)v.Y(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.E(0,null)
return}x=D.aep[v]
w.f=v+1
v=w.d
if(v!=null)v.Y(0)
w.d=A.du(A.dc(0,0,0,0,x),new B.aBT(w))},
KG(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o
var $async$KG=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.Y(0)
s=t.c
s=s==null?null:s.Y(0)
x=2
return A.e(y.x.b(s)?s:A.ds(s,y.H),$async$KG)
case 2:t.c=null
v=4
s=t.b
if(s==null)s=null
else{r=s.w
if(r===$){q=s.r.b
q===$&&A.d()
q=q.a
q===$&&A.d()
r!==$&&A.b_()
r=s.w=new B.asP(s,q)}s=r.a7(0)}x=7
return A.e(y._.b(s)?s:A.ds(s,y.z),$async$KG)
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
return A.j($async$KG,w)}}
B.aby.prototype={
tR(d){return this.bjL(d)},
bjL(d){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p
var $async$tR=A.f(function(e,f){if(e===1){u=f
x=v}while(true)switch(x){case 0:v=3
r=t.a
x=6
return A.e((r==null?t.a=A.AV():r).aT(0),$async$tR)
case 6:x=7
return A.e(t.a.Z0(d),$async$tR)
case 7:x=8
return A.e(t.a.jc(C.IP),$async$tR)
case 8:x=9
return A.e(t.a.i9(1),$async$tR)
case 9:x=10
return A.e(t.a.cT(0),$async$tR)
case 10:v=1
x=5
break
case 3:v=2
p=u
s=A.N(p)
A.rZ().$1("Sonnerie appel : lecture impossible ("+d+") : "+A.u(s))
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$tR,w)},
ik(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$ik=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
s=s==null?null:s.aT(0)
x=6
return A.e(y.x.b(s)?s:A.ds(s,y.H),$async$ik)
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
return A.j($async$ik,w)},
hh(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$hh=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
s=s==null?null:s.m()
x=6
return A.e(y.x.b(s)?s:A.ds(s,y.H),$async$hh)
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
return A.j($async$hh,w)}}
B.aWT.prototype={
a5z(d,e){return this.bdT(d,e)},
bdT(d,e){var x=0,w=A.k(y.J),v,u,t,s,r
var $async$a5z=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.a4(["mandatory",A.D(r,r),"optional",A.a([A.a4(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.S)],t,y.K)}r=self.RTCPeerConnection
t=A.fL(u,y.N,y.z)
t.u(0,d)
s=new r(y.m.a(A.c7(t)))
t=J.n(s)
v=B.cDb(C.ce.gki().bf(new A.eG(t)),s)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a5z,w)}}
B.uc.prototype={
NA(d){var x=A.a([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.d3(w,A.W(w).i("d3<1,aC>"))
J.hp(w,new B.aRK(x))
return x},
NN(d){var x=A.a([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.d3(w,A.W(w).i("d3<1,aC>"))
J.hp(w,new B.aRL(x))
return x},
a9T(d){var x=A.I(this.NA(0),!0,y.G)
C.b.u(x,this.NN(0))
return x}}
B.ac0.prototype={
aEW(d){var x=this,w=x.d
w.addEventListener("ended",A.bS(new B.aRH(x)))
w.addEventListener("mute",A.bS(new B.aRI(x)))
w.addEventListener("unmute",A.bS(new B.aRJ(x)))},
slG(d,e){this.d.enabled=e},
TO(d,e){return this.baX(0,e)},
baX(d,e){var x=0,w=A.k(y.H),v=this
var $async$TO=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:x=2
return A.e(A.eb(v.d.applyConstraints(y.m.a(A.c7(e))),y.X),$async$TO)
case 2:return A.i(null,w)}})
return A.j($async$TO,w)},
aT(d){var x=0,w=A.k(y.H),v=this
var $async$aT=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.i(null,w)}})
return A.j($async$aT,w)}}
B.aRt.prototype={
FB(d,e){return this.awR(0,e)},
awR(d,e){var x=0,w=A.k(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$FB=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.cQ0())if(y.f.b(e.h(0,"video"))&&J.m(e.h(0,"video"),"facingMode")!=null)J.ja(e.h(0,"video"),"facingMode")
e.cP(0,"video",new B.aRv())
e.cP(0,"audio",new B.aRw())}catch(a0){A.oI("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.hO(e.h(0,"audio"),i,i).aB(0,"optional")&&y.F.b(J.m(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.m(e.h(0,"audio"),"optional")
r=A.D(y.N,y.z)
J.hp(s,new B.aRx(r))
J.ja(e.h(0,"audio"),"optional")
J.jv(e.h(0,"audio"),r)}}catch(a0){q=A.N(a0)
p=A.bn(a0)
A.oI("[getUserMedia] failed to translate optional audio constraints, "+A.u(q)+", "+A.u(p))}i=self
o=i.window.navigator.mediaDevices
h=y.m
x=o.getUserMedia!=null?7:9
break
case 7:n=A.c7(e)
x=10
return A.e(A.eb(o.getUserMedia(h.a(n)),h),$async$FB)
case 10:m=a2
v=new B.uc(m,"local")
x=1
break
x=8
break
case 9:i=i.window.navigator.mediaDevices
g=e.h(0,"audio")
x=11
return A.e(A.eb(i.getUserMedia({video:e.h(0,"video"),audio:g}),h),$async$FB)
case 11:l=a2
v=new B.uc(l,"local")
x=1
break
case 8:u=2
x=6
break
case 4:u=3
f=t
k=A.N(f)
i=J.n(k)
throw A.o("Unable to getUserMedia: "+i)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$FB,w)}}
B.adU.prototype={
aF4(d,e){var x=this,w=x.at
w===$&&A.d()
w.addEventListener("datachannel",A.bS(new B.aWV(x)))
w.addEventListener("icecandidate",A.bS(new B.aWW(x)))
w.addEventListener("iceconnectionstatechange",A.bS(new B.aWX(x)))
w.onicegatheringstatechange=A.bS(new B.aWY(x))
w.addEventListener("signalingstatechange",A.bS(new B.aWZ(x)))
if(!$.cbU())w.addEventListener("connectionstatechange",A.bS(new B.aX_(x)))
w.addEventListener("negotiationneeded",A.bS(new B.aX0(x)))
w.addEventListener("track",A.bS(new B.aX1(x)))},
Uu(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$Uu=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.eb(s.createOffer(y.m.a(A.c7(A.D(y.N,y.z)))),y.A),$async$Uu)
case 3:t=f
v=new B.E9(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Uu,w)},
Ur(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$Ur=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.eb(s.createAnswer(y.m.a(A.c7(A.D(y.N,y.z)))),y.A),$async$Ur)
case 3:t=f
v=new B.E9(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Ur,w)},
FP(d,e){return this.axY(0,e)},
axY(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$FP=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.eb(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$FP)
case 2:return A.i(null,w)}})
return A.j($async$FP,w)},
FR(d,e){return this.ayd(0,e)},
ayd(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$FR=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.eb(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$FR)
case 2:return A.i(null,w)}})
return A.j($async$FR,w)},
Tw(d){return this.bai(d)},
bai(d){var x=0,w=A.k(y.H),v=this,u,t
var $async$Tw=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.d()
u=d.b
u.toString
x=2
return A.e(A.eb(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$Tw)
case 2:return A.i(null,w)}})
return A.j($async$Tw,w)},
a7(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$a7=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.d()
t.close()
v=A.cW(null,y.H)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a7,w)},
a4q(d,e,f){return this.baz(0,e,f)},
baz(d,e,f){var x=0,w=A.k(y.e),v,u=this,t
var $async$a4q=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.d()
t.addTrack(e.d,f.e)
v=new B.adV()
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a4q,w)}}
B.adV.prototype={}
B.c8S.prototype={
aT(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$aT=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.N(r)
if(y.L.b(s)){u=s
s=u
J.n(s)
throw A.o("Unable to RTCRtpTransceiver::stop: "+A.u(s))}else throw r}return A.i(null,w)}})
return A.j($async$aT,w)}}
B.UC.prototype={
sat1(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.Lh()
if(x!=null)x.style.objectFit=e},
amN(){var x=this,w=x.Lh(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sp(0,v.apK(u,x.z!=null,0,t))},
saaH(d,e){var x,w,v,u,t=this
t.z=e
if(e.NN(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.at(y.l.b(x)?x:new A.d3(x,A.W(x).i("d3<1,aC>")))
for(;x.C();){w=x.gJ(x)
t.x.addTrack(w)}}if(e.NA(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.at(y.l.b(x)?x:new A.d3(x,A.W(x).i("d3<1,aC>")))
for(;x.C();){w=x.gJ(x)
t.y.addTrack(w)}}if(t.y!=null){if(t.w==null){v=self.document.createElement("audio")
v.id="audio_"+("RTCVideoRenderer-"+t.Q)
v.muted=e.b==="local"
v.autoplay=!0
t.w=v
x=t.aOi()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.Lh()
if(u!=null){u.srcObject=t.x
x=t.Lh()
x.toString
t.acx(x)}t.sp(0,t.a.bcI(t.z!=null))},
aOi(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
if(v!=null)return v
x=w.document.createElement("div")
x.id="html_webrtc_audio_manager_list"
x.style.display="none"
w=w.document.body
if(w!=null)w.append(x)
return x},
Lh(){var x=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(x!=null)return x
return null},
m(){var x=0,w=A.k(y.H),v,u=this,t,s,r,q,p
var $async$m=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u.z=null
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.Q)(t),++r)t[r].Y(0)
q=u.Lh()
t=q==null
if(!t)q.removeAttribute("src")
if(!t)q.load()
t=u.w
if(t!=null)t.remove()
p=self.document.getElementById("html_webrtc_audio_manager_list")
if(p!=null&&!p.hasChildNodes())p.remove()
v=u.eR()
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$m,w)},
jq(d){var x=0,w=A.k(y.H),v=this
var $async$jq=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:$.Gx()
$.q9().u4("RTCVideoRenderer-"+v.Q,new B.aX7(v),!0)
return A.i(null,w)}})
return A.j($async$jq,w)},
acx(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.UE.prototype={
P(){return new B.UF()}}
B.UF.prototype={
T(){var x,w,v=this
v.X()
v.a.c.ak(0,v.gaZC())
x=v.a
w=x.c
w.as=x.e
w.sat1(0,x.d===D.uz?"contain":"cover")},
aZD(){if(this.c!=null)this.l(new B.aX8())},
m(){if(this.c!=null)this.a5()},
b_(d){var x,w
this.bi(d)
A.du(A.dc(0,0,10,0,0),new B.aXa(this))
x=this.a
w=x.c
w.sat1(0,x.d===D.uz?"contain":"cover")},
D(d){return new A.iR(new B.aX9(this),null)}}
B.aaa.prototype={
aED(d,e,f,g){var x=this,w=$.aI
x.a!==$&&A.aJ()
x.a=new B.a_J(d,x,new A.b9(new A.aB(w,y.c),y.r),e,g.i("a_J<0>"))
if(f.a.gj3())f.a=new B.Wb(g.i("@<0>").cb(g).i("Wb<1,2>")).hB(f.a)
w=A.fW(null,new B.aKu(f,x),null,!0,g)
x.b!==$&&A.aJ()
x.b=w},
aj1(){var x,w
this.d=!0
x=this.c
if(x!=null)x.Y(0)
w=this.b
w===$&&A.d()
w.a7(0)}}
B.a_J.prototype={
E(d,e){if(this.e)throw A.o(A.ak("Cannot add event after closing."))
if(this.d)return
this.a.a.E(0,e)},
dv(d,e){if(this.e)throw A.o(A.ak("Cannot add event after closing."))
if(this.d)return
this.aR4(d,e)},
hY(d){return this.dv(d,null)},
aR4(d,e){var x=this
if(x.w){x.a.a.dv(d,e)
return}x.c.hb(d,e)
x.aj2()
x.b.aj1()
x.a.a.a7(0).fw(new B.bvw())},
a7(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.aj1()
x.c.cD(0,x.a.a.a7(0))}return x.c.a},
aj2(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.dL(0)
return},
$ie2:1}
B.agd.prototype={}
B.age.prototype={}
B.B1.prototype={
adY(d,e){var x=this.b
if((x.b&4)!==0)return
x.E(0,new B.Hi(d,e))
x.a7(0)},
aaa(d){var x
if((this.b.b&4)!==0)throw A.o(B.c9B())
x=A.c7(d)
x.toString
this.a.send(x)},
yO(d,e,f){return this.bc3(0,e,f)},
bc3(d,e,f){var x=0,w=A.k(y.H),v=this,u
var $async$yO=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.o(B.c9B())
u.a7(0)
v.a.close()
return A.i(null,w)}})
return A.j($async$yO,w)},
$ic9A:1}
B.v4.prototype={}
B.Lz.prototype={
n(d,e){if(e==null)return!1
return e instanceof B.Lz&&e.a===this.a},
gH(d){return C.d.gH(this.a)}}
B.GS.prototype={
n(d,e){var x,w,v,u
if(e==null)return!1
if(e instanceof B.GS&&e.a.length===this.a.length){for(x=this.a,w=x.length,v=e.a,u=0;u<w;++u)if(v[u]!==x[u])return!1
return!0}return!1},
gH(d){return A.hD(this.a)},
k(d){return"BinaryDataReceived("+A.u(this.a)+")"}}
B.Hi.prototype={
n(d,e){if(e==null)return!1
return e instanceof B.Hi&&e.a===this.a&&e.b===this.b},
gH(d){return A.hD([this.a,this.b])},
k(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.M7.prototype={
k(d){var x=this.a
if(x.length===0)return"WebSocketException"
else return"WebSocketException: "+x},
$ibO:1}
B.M6.prototype={
k(d){var x=this.a
if(x.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+x}}
B.awe.prototype={
aEm(d){d.fi(new B.awi(this),new B.awj(this),y.a)}}
B.asP.prototype={
a7(d){var x=this.b
x.e=x.d=null
return this.azW(0)}}
B.ahz.prototype={
k(d){return"WebSocketChannelException: "+this.a},
$ibO:1}
B.yH.prototype={
O(){return"RTCSignalingState."+this.b}}
B.Uy.prototype={
O(){return"RTCIceGatheringState."+this.b}}
B.yG.prototype={
O(){return"RTCPeerConnectionState."+this.b}}
B.o9.prototype={
O(){return"RTCIceConnectionState."+this.b}}
B.adW.prototype={
O(){return"RTCVideoViewObjectFit."+this.b}}
B.aWS.prototype={}
B.T3.prototype={}
B.Jq.prototype={
k(d){var x=this.d
return"Track(id: "+A.u(x.id)+", kind: "+A.u(x.kind)+", label: "+A.u(x.label)+", enabled: "+A.u(x.enabled)+", muted: "+A.u(x.muted)+")"}}
B.aRs.prototype={}
B.Kg.prototype={}
B.Uz.prototype={}
B.UA.prototype={}
B.aX2.prototype={}
B.E9.prototype={}
B.UB.prototype={}
B.UD.prototype={
apK(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.UD(x,w,v)},
bcI(d){return this.apK(null,d,null,null)},
k(d){var x=this
return A.ab(x).k(0)+"(width: "+A.u(x.a)+", height: "+A.u(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["au<~>()","~()","~(L8)","bv(Kg)","bv(UB)","bv(o9)","~(@)","uc(@)","bv(c9A)","~(v4)"])
B.b1L.prototype={
$0(){return J.cuZ(this.a.bk())},
$S:1}
B.b1M.prototype={
$1(d){var x,w,v,u
try{this.b.E(0,this.a.$ti.y[1].a(d))}catch(v){u=A.N(v)
if(y.i.b(u)){x=u
w=A.bn(v)
this.b.dv(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.c2R.prototype={
$1(d){var x,w,v,u=$.a1().b
if(u==null||u.length===0)return
x=self
w=new x.Headers()
w.set("Authorization","Bearer "+A.u(u))
w.set("Content-Type","application/json")
v=y.N
x.window.fetch("https://connexion-prophetique.onrender.com/messagerie/appels/"+this.a+"/signaux",{method:"POST",headers:w,body:C.Z.e2(A.a4(["type","termine","contenu",A.D(v,y.z)],v,y.K),null),keepalive:!0})},
$S:24}
B.c2Q.prototype={
$0(){return self.window.removeEventListener("beforeunload",this.a)},
$S:0}
B.ayb.prototype={
$1(d){if(d==null)return null
return A.c0(J.n(d))},
$S:99}
B.bqx.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.e)x.II(!0)},
$S:0}
B.bqy.prototype={
$1(d){return this.a.Tj()},
$S:27}
B.bqu.prototype={
$0(){var x=this.a.c
if(x!=null)A.a5(x,!1).bO()},
$S:0}
B.bqv.prototype={
$0(){return this.a.e=!0},
$S:0}
B.bqr.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.bqs.prototype={
$0(){return this.a.d=!1},
$S:0}
B.bqt.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.bqo.prototype={
$0(){return this.a.f=!0},
$S:0}
B.bqp.prototype={
$0(){return this.a.f=!1},
$S:0}
B.bqq.prototype={
$1(d){var x=this.a.a,w=x.c,v=x.e,u=x.d
return B.c7n(x.w,null,w,x.y,u,null,null,!1,v)},
$S:1181}
B.bqw.prototype={
$0(){return this.a.b2C()},
$S:0}
B.bq9.prototype={
$1(d){this.a.xN("candidat_ice",d,!1)},
$S:208}
B.bqa.prototype={
$0(){var x=this.a
if(x.c!=null)x.l(new B.bq8(x))},
$S:0}
B.bq8.prototype={
$0(){return this.a.fy=!0},
$S:0}
B.bqb.prototype={
$0(){this.a.mu(A.b("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.bqc.prototype={
$0(){},
$S:0}
B.bqd.prototype={
$1(d){var x=this.a,w=x.ay
if(x.c!=null&&w!=null&&x.x)x.l(new B.bq7(x,w))},
$S:27}
B.bq7.prototype={
$0(){return this.a.ch=new A.ax(Date.now(),0,!1).eo(this.b)},
$S:0}
B.bqe.prototype={
$1(d){},
$S:133}
B.bqf.prototype={
$1(d){this.a.xU()},
$S:27}
B.bpW.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.x&&!x.y){if(x.a.f)x.xN("annule",C.c0,!1)
x.mu(A.b("Pas de r\xe9ponse"))}},
$S:0}
B.bpX.prototype={
$0(){var x=this.a
x.fx=x.a.d==="video"?A.b("Micro ou cam\xe9ra refus\xe9 : autorise le micro et la cam\xe9ra dans les r\xe9glages pour appeler en vid\xe9o."):A.b("Micro refus\xe9 : autorise le micro dans les r\xe9glages pour appeler.")},
$S:0}
B.bpY.prototype={
$1(d){this.a.xN("candidat_ice",d,!1)},
$S:208}
B.bpZ.prototype={
$0(){var x=this.a
if(x.c!=null)x.l(new B.bpV(x))},
$S:0}
B.bpV.prototype={
$0(){return this.a.fy=!0},
$S:0}
B.bq_.prototype={
$0(){this.a.mu(A.b("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.bq0.prototype={
$0(){return this.a.z=!0},
$S:0}
B.bq1.prototype={
$1(d){var x=this.a,w=x.ay
if(x.c!=null&&w!=null&&x.x)x.l(new B.bpU(x,w))},
$S:27}
B.bpU.prototype={
$0(){return this.a.ch=new A.ax(Date.now(),0,!1).eo(this.b)},
$S:0}
B.bq2.prototype={
$1(d){},
$S:133}
B.bq3.prototype={
$1(d){this.a.xU()},
$S:27}
B.bqh.prototype={
$1(d){var x=this.a
if(x.c==null||x.y)return
x.RX()
x.aft("reponse",d)},
$S:401}
B.bqi.prototype={
$1(d){this.a.mu(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:16}
B.bqj.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.RX()},
$S:30}
B.bqk.prototype={
$1(d){this.a.mu(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:16}
B.bql.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.aft("offre",d)},
$S:401}
B.bqm.prototype={
$1(d){this.a.mu(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:16}
B.bq4.prototype={
$0(){var x=this.a
x.x=!0
x.ay=new A.ax(Date.now(),0,!1)
x.ch=C.S},
$S:0}
B.bq5.prototype={
$0(){return this.a.go=!0},
$S:0}
B.bq6.prototype={
$1(d){var x=this.a.c
if(x!=null)A.a5(x,!1).bO()},
$S:4}
B.bqg.prototype={
$1(d){return A.D(y.N,y.z)},
$S:139}
B.bpT.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.bpS.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.bpR.prototype={
$0(){return this.a.ax=this.b},
$S:0}
B.bqn.prototype={
$2(d,e){if(!d)this.a.IC()},
$S:1185}
B.b1a.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.a4(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+3}
B.b1b.prototype={
$1(d){var x=d.b,w=x.length!==0?C.b.gS(x):null
if(w!=null)this.a.aMw(w)},
$S:z+4}
B.b1c.prototype={
$1(d){var x
if(d===D.ND){x=this.a.w
if(x!=null)x.$0()}},
$S:z+5}
B.aBS.prototype={
$1(d){return this.a.a2n()},
$S:21}
B.aBT.prototype={
$0(){var x=this.a
if(!x.e)x.Gq()},
$S:0}
B.c3P.prototype={
$1(d){return d.length!==0},
$S:8}
B.aRK.prototype={
$1(d){return this.a.push(B.c8a(d))},
$S:21}
B.aRL.prototype={
$1(d){return this.a.push(B.c8a(d))},
$S:21}
B.aRH.prototype={
$1(d){},
$S:23}
B.aRI.prototype={
$1(d){},
$S:23}
B.aRJ.prototype={
$1(d){},
$S:23}
B.aRv.prototype={
$0(){return!1},
$S:49}
B.aRw.prototype={
$0(){return!1},
$S:49}
B.aRx.prototype={
$1(d){J.hp(d,new B.aRu(this.a))},
$S:208}
B.aRu.prototype={
$2(d,e){this.a.j(0,d,e)},
$S:53}
B.aWV.prototype={
$1(d){},
$S:23}
B.aWW.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.Kg(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:23}
B.aWX.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.d()
v=B.cPA(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.cbU())switch(w.cx.a){case 0:w.cy=D.NI
break
case 1:w.cy=D.NJ
break
case 3:w.cy=D.NK
break
case 5:w.cy=D.NG
break
case 6:w.cy=D.NH
break
case 7:w.cy=D.uy
break
default:break}},
$S:35}
B.aWY.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.CW=B.cPB(w.iceGatheringState)},
$S:35}
B.aWZ.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.ch=B.cRI(w.signalingState)},
$S:35}
B.aX_.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.cy=B.cQT(w.connectionState)},
$S:35}
B.aX0.prototype={
$1(d){},
$S:35}
B.aX1.prototype={
$1(d){var x,w=this.a,v=w.Q
if(v!=null){B.c8a(d.track)
x=d.streams
x=y.l.b(x)?x:new A.d3(x,A.W(x).i("d3<1,aC>"))
w=J.dC(x,new B.aWU(w),y.h)
v.$1(new B.UB(A.I(w,!0,w.$ti.i("aD.E"))))}},
$S:23}
B.aWU.prototype={
$1(d){return new B.uc(d,this.a.as)},
$S:z+7}
B.c3Y.prototype={
$1(d){return J.h2(self.window.navigator.userAgent,A.bG(d,!1,!1))},
$S:8}
B.aX7.prototype={
$1(d){var x,w,v,u,t
for(x=this.a,w=x.at,v=w.length,u=0;u<w.length;w.length===v||(0,A.Q)(w),++u)w[u].Y(0)
C.b.a_(w)
t=self.document.createElement("video")
t.autoplay=!0
t.muted=!0
t.controls=!1
t.srcObject=x.x
t.id="video_"+("RTCVideoRenderer-"+x.Q)
t.setAttribute("playsinline","true")
x.acx(t)
v=y.k.c
w.push(A.iD(t,"canplay",new B.aX3(x),!1,v))
w.push(A.iD(t,"resize",new B.aX4(x),!1,v))
w.push(A.iD(t,"error",new B.aX5(t),!1,v))
w.push(A.iD(t,"ended",new B.aX6(),!1,v))
return t},
$S:174}
B.aX3.prototype={
$1(d){this.a.amN()},
$S:21}
B.aX4.prototype={
$1(d){this.a.amN()},
$S:21}
B.aX5.prototype={
$1(d){var x,w,v=this.a.error
A.oI("RTCVideoRenderer: videoElement.onError, "+J.n(v))
v.toString
x=C.IV.h(0,A.av(v,"code"))
x.toString
w=!J.t(A.av(v,"message"),"")?A.av(v,"message"):"No further diagnostic information can be determined or provided."
throw A.o(A.o3(x,C.IU.h(0,A.av(v,"code")),w,null))},
$S:24}
B.aX6.prototype={
$1(d){},
$S:21}
B.aX8.prototype={
$0(){},
$S:0}
B.aXa.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aX9.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.aar("RTCVideoRenderer-"+w.Q)
else w=A.T(x,x,C.j,x,x,x,x,x,x,x,x,x,x,x)
return A.cF(A.T(x,w,C.j,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:1186}
B.aKu.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.d()
v.c=x.fC(w.gii(w),new B.aKt(v),w.gpi())},
$S:0}
B.aKt.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.d()
w.aj2()
x=x.b
x===$&&A.d()
x.a7(0)},
$S:0}
B.bvw.prototype={
$1(d){},
$S:16}
B.aAp.prototype={
$1(d){this.a.cD(0,this.b)},
$S:23}
B.aAq.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.hs(new B.M7("Failed to connect WebSocket"))
else this.b.adY(1006,"error")},
$S:23}
B.aAr.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.cw("data")
if(typeof x==="string")w.b=new B.Lz(A.bp(x))
else if(typeof x==="object"&&A.cgT(y.m.a(x),"ArrayBuffer"))w.b=new B.GS(A.Tu(y.o.a(x),0,null))
else throw A.o(A.ak("unexpected message type: "+J.aG(x).k(0)))
v.E(0,w.bk())},
$S:24}
B.aAs.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.cD(0,this.b)
this.b.adY(d.code,d.reason)},
$S:23}
B.awi.prototype={
$1(d){var x=d.b,w=this.a
new A.cI(x,A.y(x).i("cI<1>")).cK(new B.awf(w))
x=w.r.a
x===$&&A.d()
x=x.b
x===$&&A.d()
new A.cI(x,A.y(x).i("cI<1>")).bk1(new B.awg(d),new B.awh(w,d))
w.f.dL(0)},
$S:z+8}
B.awf.prototype={
$1(d){var x,w,v
$label0$0:{x=d instanceof B.Lz
w=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.E(0,w)
break $label0$0}x=d instanceof B.GS
v=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.E(0,v)
break $label0$0}if(d instanceof B.Hi){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.a7(0)}}},
$S:z+9}
B.awg.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.an(B.c9B())
s=A.c7(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.M.b(x)
if(t)v=x
if(t){this.a.aaa(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.aaa(new Uint8Array(A.bT(u)))
break $label1$1}t=A.aS("Cannot send "+J.aG(d).k(0))
throw A.o(t)}}catch(r){if(!(A.N(r) instanceof B.M6))throw r}},
$S:18}
B.awh.prototype={
$0(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$$0=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
x=6
return A.e(t.b.yO(0,s.d,s.e),$async$$0)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(!(A.N(q) instanceof B.M6))throw q
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$$0,w)},
$S:1}
B.awj.prototype={
$1(d){var x,w=d instanceof A.Xa?d:new B.ahz(J.n(d)),v=this.a
v.f.hs(w)
v=v.r.a
v===$&&A.d()
x=v.a
x===$&&A.d()
x.hY(w)
v=v.a
v===$&&A.d()
v.a7(0)},
$S:35};(function aliases(){var x=B.HS.prototype
x.azW=x.a7})();(function installTearOffs(){var x=a._instance_0u,w=a._instance_1u
x(B.ZQ.prototype,"gaFO","Ge",0)
var v
w(v=B.ZP.prototype,"gamF","amG",2)
x(v,"gajH","IC",0)
x(v,"gak1","b2w",1)
x(v,"gacL","Pe",0)
x(v,"gacK","Pd",0)
x(v,"gacI","Pa",0)
x(v,"gacJ","Pb",0)
w(v=B.a7G.prototype,"gb2j","b2k",6)
x(v,"gb0M","a2n",1)
x(B.UC.prototype,"gea","m",0)
x(B.UF.prototype,"gaZC","aZD",1)})();(function inheritance(){var x=a.inheritMany,w=a.inherit
x(A.a9,[B.HS,B.aya,B.L8,B.a7V,B.b19,B.a7G,B.aby,B.aWS,B.T3,B.Jq,B.aRs,B.Uz,B.UA,B.aX2,B.age,B.a_J,B.agd,B.B1,B.v4,B.M7,B.ahz,B.Kg,B.E9,B.UB,B.UD])
w(B.Wb,A.fX)
x(A.k9,[B.b1L,B.c2Q,B.bqx,B.bqu,B.bqv,B.bqr,B.bqs,B.bqt,B.bqo,B.bqp,B.bqw,B.bqa,B.bq8,B.bqb,B.bqc,B.bq7,B.bpW,B.bpX,B.bpZ,B.bpV,B.bq_,B.bq0,B.bpU,B.bq4,B.bq5,B.bpT,B.bpS,B.bpR,B.aBT,B.aRv,B.aRw,B.aX8,B.aXa,B.aKu,B.aKt,B.awh])
x(A.jD,[B.b1M,B.c2R,B.ayb,B.bqy,B.bqq,B.bq9,B.bqd,B.bqe,B.bqf,B.bpY,B.bq1,B.bq2,B.bq3,B.bqh,B.bqi,B.bqj,B.bqk,B.bql,B.bqm,B.bq6,B.bqg,B.b1a,B.b1b,B.b1c,B.aBS,B.c3P,B.aRK,B.aRL,B.aRH,B.aRI,B.aRJ,B.aRx,B.aWV,B.aWW,B.aWX,B.aWY,B.aWZ,B.aX_,B.aX0,B.aX1,B.aWU,B.c3Y,B.aX7,B.aX3,B.aX4,B.aX5,B.aX6,B.bvw,B.aAp,B.aAq,B.aAr,B.aAs,B.awi,B.awf,B.awg,B.awj])
x(A.R,[B.qB,B.qA,B.UE])
x(A.V,[B.ZQ,B.ZP,B.UF])
x(A.aw,[B.Yn,B.ajf,B.Yo,B.zD])
x(A.to,[B.bqn,B.aRu,B.aX9])
w(B.aWT,B.aWS)
w(B.uc,B.T3)
w(B.ac0,B.Jq)
w(B.aRt,B.aRs)
w(B.adU,B.Uz)
w(B.adV,B.UA)
w(B.c8S,B.aX2)
w(B.UC,A.dr)
x(B.age,[B.aaa,B.awe])
x(B.v4,[B.Lz,B.GS,B.Hi])
w(B.M6,B.M7)
w(B.asP,B.HS)
x(A.ME,[B.yH,B.Uy,B.yG,B.o9,B.adW])})()
A.oB(b.typeUniverse,JSON.parse('{"HS":{"e2":["1"]},"Wb":{"fX":["1","2"],"fX.S":"1","fX.T":"2"},"qB":{"R":[],"q":[]},"ZQ":{"V":["qB"]},"Yn":{"aw":[],"q":[]},"qA":{"R":[],"q":[]},"ZP":{"V":["qA"]},"ajf":{"aw":[],"q":[]},"Yo":{"aw":[],"q":[]},"zD":{"aw":[],"q":[]},"uc":{"T3":[]},"ac0":{"Jq":[]},"adU":{"Uz":[]},"adV":{"UA":[]},"UC":{"dr":["UD"],"aY":[]},"UE":{"R":[],"q":[]},"UF":{"V":["UE"]},"a_J":{"e2":["1"]},"B1":{"c9A":[]},"Lz":{"v4":[]},"GS":{"v4":[]},"Hi":{"v4":[]},"M7":{"bO":[]},"M6":{"bO":[]},"asP":{"e2":["@"]},"ahz":{"bO":[]}}'))
A.clb(b.typeUniverse,JSON.parse('{"HS":1,"age":1}'))
var y=(function rtii(){var x=A.ay
return{b:x("B1"),L:x("bO"),_:x("au<@>"),x:x("au<~>"),S:x("H<ae<p,S>>"),t:x("H<ae<p,@>>"),Q:x("H<Jq>"),d:x("H<jl<@>>"),s:x("H<p>"),p:x("H<q>"),m:x("aC"),l:x("E<aC>"),F:x("E<ae<p,@>>"),j:x("E<@>"),I:x("E<v>"),P:x("ae<p,@>"),f:x("ae<@,@>"),E:x("T3"),G:x("Jq"),h:x("uc"),o:x("qX"),a:x("bv"),K:x("a9"),J:x("Uz"),e:x("UA"),v:x("E9"),Z:x("agd<a9?>"),N:x("p"),i:x("rw"),M:x("e_"),D:x("v4"),U:x("X<p>"),g:x("dQ<L8>"),n:x("dQ<~>"),V:x("b9<B1>"),r:x("b9<@>"),R:x("b9<~>"),k:x("a__<aC>"),C:x("pW<aC>"),u:x("aB<B1>"),c:x("aB<@>"),W:x("aB<~>"),q:x("kB"),y:x("S"),z:x("@"),A:x("aC?"),X:x("a9?"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.XU=new B.a7V(C.hQ)
D.zY=new A.ap(32,0,32,0)
D.AK=new A.aq(57639,"MaterialIcons",null,!1)
D.a2T=new A.aq(58337,"MaterialIcons",null,!1)
D.a2U=new A.aq(58341,"MaterialIcons",null,!1)
D.a2Y=new A.aq(58923,"MaterialIcons",null,!1)
D.AQ=new A.aq(59048,"MaterialIcons",null,!1)
D.a2Z=new A.aq(59049,"MaterialIcons",null,!1)
D.a3_=new A.aq(59077,"MaterialIcons",null,!1)
D.a2R=new A.aq(58195,"MaterialIcons",null,!1)
D.a4T=new A.ac(D.a2R,28,C.m,null,null)
D.aep=A.a(x([1,2,4,8,16]),A.ay("H<v>"))
D.ajW=A.a(x([]),y.Q)
D.J7=new A.fV("FlutterWebRTC.Method",C.bf,null)
D.atP=new B.o9(0,"RTCIceConnectionStateNew")
D.atQ=new B.o9(1,"RTCIceConnectionStateChecking")
D.atR=new B.o9(2,"RTCIceConnectionStateCompleted")
D.atS=new B.o9(3,"RTCIceConnectionStateConnected")
D.atT=new B.o9(4,"RTCIceConnectionStateCount")
D.ND=new B.o9(5,"RTCIceConnectionStateFailed")
D.atU=new B.o9(6,"RTCIceConnectionStateDisconnected")
D.NE=new B.o9(7,"RTCIceConnectionStateClosed")
D.NF=new B.Uy(0,"RTCIceGatheringStateNew")
D.atV=new B.Uy(1,"RTCIceGatheringStateGathering")
D.atW=new B.Uy(2,"RTCIceGatheringStateComplete")
D.uy=new B.yG(0,"RTCPeerConnectionStateClosed")
D.NG=new B.yG(1,"RTCPeerConnectionStateFailed")
D.NH=new B.yG(2,"RTCPeerConnectionStateDisconnected")
D.NI=new B.yG(3,"RTCPeerConnectionStateNew")
D.NJ=new B.yG(4,"RTCPeerConnectionStateConnecting")
D.NK=new B.yG(5,"RTCPeerConnectionStateConnected")
D.atX=new B.yH(0,"RTCSignalingStateStable")
D.atY=new B.yH(1,"RTCSignalingStateHaveLocalOffer")
D.atZ=new B.yH(2,"RTCSignalingStateHaveRemoteOffer")
D.au_=new B.yH(3,"RTCSignalingStateHaveLocalPrAnswer")
D.au0=new B.yH(4,"RTCSignalingStateHaveRemotePrAnswer")
D.NL=new B.yH(5,"RTCSignalingStateClosed")
D.au1=new B.UD(0,0,0)
D.uz=new B.adW(0,"RTCVideoViewObjectFitContain")
D.NM=new B.adW(1,"RTCVideoViewObjectFitCover")
D.oS=new A.cl(20,null,null,null)
D.axv=new A.cl(48,null,null,null)
D.Pi=new A.cl(null,64,null,null)
D.aAD=new A.C(!0,C.m,null,null,null,null,22,C.A,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.Q_=new A.C(!0,C.m,null,null,null,null,26,C.A,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.aAQ=new A.C(!0,C.o,null,null,null,null,32,C.A,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.Q2=new A.C(!0,C.o,null,null,null,null,40,C.A,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.vR=new A.C(!0,C.ak,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.caA=null
$.ckf=!1
$.cio=1})();(function lazyInitializers(){var x=a.lazyFinal
x($,"cXE","cc8",()=>new B.aWT())
x($,"cUg","cbU",()=>C.d.q(A.av(A.av(A.av(A.cby(),"window"),"navigator"),"userAgent"),"Firefox"))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_1",e:"endPart",h:b})})($__dart_deferred_initializers__,"g+UJcIdW+VkUxELnRymnRSUDFno=");